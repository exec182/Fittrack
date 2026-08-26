<?php
declare(strict_types=1);
require_once dirname(__DIR__) . '/bootstrap.php';
require_once dirname(__DIR__) . '/invitation_helpers.php';

$config = require dirname(__DIR__) . '/app_config.php';
$configuredPassword = (string)($config['fitadmin_password'] ?? '');
$csrf = ensureCsrfToken();
$dbConfig = databaseConfig();
$db = new PDO("mysql:host={$dbConfig['host']};dbname={$dbConfig['name']};charset=utf8mb4", $dbConfig['user'], $dbConfig['pass'], [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
ensureRegistrationInviteSchema($db);
$message = '';
$error = '';
$shareRoot = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'share_pictures';
$baseUrl = sprintf('%s://%s', requestIsHttps() ? 'https' : 'http', $_SERVER['HTTP_HOST'] ?? 'localhost');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!validCsrfToken((string)($_POST['csrf_token'] ?? ''))) {
        $error = 'Sicherheitsprüfung fehlgeschlagen.';
    } elseif (($_POST['action'] ?? '') === 'admin_login') {
        $given = (string)($_POST['password'] ?? '');
        if ($configuredPassword !== '' && hash_equals($configuredPassword, $given)) {
            session_regenerate_id(true);
            $_SESSION['fitadmin_authenticated'] = true;
            $_SESSION['fitadmin_authenticated_at'] = time();
            header('Location: /fitadmin/'); exit;
        }
        usleep(400000);
        $error = 'Admin-Passwort ist ungültig.';
    } elseif (($_POST['action'] ?? '') === 'admin_logout') {
        unset($_SESSION['fitadmin_authenticated'], $_SESSION['fitadmin_authenticated_at']);
        header('Location: /fitadmin/'); exit;
    }
}

$authenticated = !empty($_SESSION['fitadmin_authenticated']);
if ($authenticated && $_SERVER['REQUEST_METHOD'] === 'POST' && $error === '') {
    $action = (string)($_POST['action'] ?? '');
    try {
        if ($action === 'reset_password') {
            $new = (string)($_POST['new_password'] ?? '');
            if (strlen($new) < 12) throw new InvalidArgumentException('Das neue Passwort braucht mindestens 12 Zeichen.');
            $stmt = $db->prepare('UPDATE `user` SET password = ? WHERE id = ?');
            $stmt->execute([password_hash($new, PASSWORD_ARGON2ID), (int)$_POST['user_id']]);
            $message = 'Passwort wurde zurückgesetzt.';
        } elseif ($action === 'delete_user') {
            $userId = (int)($_POST['user_id'] ?? 0);
            $nickStmt = $db->prepare('SELECT nick FROM `user` WHERE id = ?'); $nickStmt->execute([$userId]);
            $nick = (string)($nickStmt->fetchColumn() ?: '');
            if ($nick === '' || !hash_equals('DELETE ' . $nick, (string)($_POST['delete_confirmation'] ?? ''))) throw new InvalidArgumentException('Doppelte Löschbestätigung fehlt.');
            $db->beginTransaction();
            $db->prepare('DELETE mv FROM `messurevalue` mv JOIN `messure` m ON m.id = mv.`messure-id` WHERE m.`user-id` = ?')->execute([$userId]);
            $db->prepare('DELETE FROM `messure` WHERE `user-id` = ?')->execute([$userId]);
            $db->prepare('DELETE FROM `goals` WHERE `user-id` = ?')->execute([$userId]);
            foreach (['training_exception','training_entry','training_plan_entry','deeplink_access'] as $table) $db->prepare("DELETE FROM `$table` WHERE user_id = ?")->execute([$userId]);
            $db->prepare('UPDATE `registration_invite` SET created_by_user_id = NULL WHERE created_by_user_id = ?')->execute([$userId]);
            $db->prepare('UPDATE `registration_invite` SET used_by_user_id = NULL WHERE used_by_user_id = ?')->execute([$userId]);
            $db->prepare('DELETE FROM `user` WHERE id = ?')->execute([$userId]);
            $db->commit(); $message = 'User wurde endgültig gelöscht.';
        } elseif ($action === 'create_invite') {
            $invite = createRegistrationInvite($db, null, (string)($_POST['note'] ?? ''), (string)($_POST['expires_at'] ?? ''));
            $message = 'Einladungslink: ' . sprintf('%s://%s/index.php?invite=%s', requestIsHttps() ? 'https' : 'http', $_SERVER['HTTP_HOST'] ?? 'localhost', $invite['token']);
        } elseif ($action === 'delete_invite') {
            $db->prepare('DELETE FROM `registration_invite` WHERE id = ?')->execute([(int)$_POST['invite_id']]);
            $message = 'Einladungslink wurde gelöscht.';
        } elseif ($action === 'delete_share_picture') {
            $relativePath = str_replace('\\', '/', trim((string)($_POST['picture_path'] ?? '')));
            if (!preg_match('#^user_[1-9][0-9]*/[0-9]{4}-[0-9]{2}-[0-9]{2}_[a-z0-9_-]+\.png$#', $relativePath)) throw new InvalidArgumentException('Ungültiger Bildpfad.');
            $resolvedRoot = realpath($shareRoot);
            $resolvedFile = realpath($shareRoot . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $relativePath));
            if ($resolvedRoot === false || $resolvedFile === false || !str_starts_with($resolvedFile, $resolvedRoot . DIRECTORY_SEPARATOR) || !is_file($resolvedFile)) throw new InvalidArgumentException('Sharebild wurde nicht gefunden.');
            if (!unlink($resolvedFile)) throw new RuntimeException('Sharebild konnte nicht gelöscht werden.');
            $message = 'Sharebild wurde gelöscht.';
        } elseif ($action === 'delete_old_share_pictures') {
            $deletedCount = 0;
            $cutoff = time() - (30 * 86400);
            if (is_dir($shareRoot)) {
                $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($shareRoot, FilesystemIterator::SKIP_DOTS));
                foreach ($iterator as $file) {
                    if (!$file->isFile() || $file->getMTime() >= $cutoff) continue;
                    $relative = str_replace('\\', '/', substr($file->getPathname(), strlen($shareRoot) + 1));
                    if (!preg_match('#^user_[1-9][0-9]*/[0-9]{4}-[0-9]{2}-[0-9]{2}_[a-z0-9_-]+\.png$#', $relative)) continue;
                    if (unlink($file->getPathname())) $deletedCount++;
                }
            }
            $message = $deletedCount === 1 ? 'Ein Sharebild älter als 30 Tage wurde gelöscht.' : $deletedCount . ' Sharebilder älter als 30 Tage wurden gelöscht.';
        }
    } catch (Throwable $e) {
        if ($db->inTransaction()) $db->rollBack();
        $error = $e instanceof InvalidArgumentException ? $e->getMessage() : 'Aktion konnte nicht ausgeführt werden.';
    }
}

$users = $authenticated ? $db->query('SELECT id, nick, goalweight, height, onboarding_completed_at FROM `user` ORDER BY nick')->fetchAll() : [];
$invites = $authenticated ? $db->query('SELECT ri.*, cu.nick creator_nick, uu.nick used_nick FROM registration_invite ri LEFT JOIN `user` cu ON cu.id=ri.created_by_user_id LEFT JOIN `user` uu ON uu.id=ri.used_by_user_id ORDER BY ri.created_at DESC')->fetchAll() : [];
$userNamesById = [];
foreach ($users as $user) $userNamesById[(int)$user['id']] = (string)$user['nick'];
$sharePictures = [];
$databaseStats = ['bytes' => 0, 'rows' => 0, 'tables' => []];
if ($authenticated) {
    if (is_dir($shareRoot)) {
        $iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($shareRoot, FilesystemIterator::SKIP_DOTS));
        foreach ($iterator as $file) {
            if (!$file->isFile() || strtolower($file->getExtension()) !== 'png') continue;
            $relative = str_replace('\\', '/', substr($file->getPathname(), strlen($shareRoot) + 1));
            if (!preg_match('#^user_([1-9][0-9]*)/(.+\.png)$#', $relative, $matches)) continue;
            $sharePictures[] = ['path' => $relative, 'userId' => (int)$matches[1], 'name' => $matches[2], 'bytes' => $file->getSize(), 'modifiedAt' => $file->getMTime()];
        }
        usort($sharePictures, static fn(array $a, array $b): int => $b['modifiedAt'] <=> $a['modifiedAt']);
    }
    foreach ($db->query("SELECT TABLE_NAME AS stat_name, TABLE_ROWS AS stat_rows, (DATA_LENGTH + INDEX_LENGTH) AS stat_bytes FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() ORDER BY stat_bytes DESC, stat_name")->fetchAll() as $row) {
        $bytes = (int)$row['stat_bytes'];
        $databaseStats['bytes'] += $bytes;
        $databaseStats['rows'] += (int)$row['stat_rows'];
        $databaseStats['tables'][] = ['name' => (string)$row['stat_name'], 'rows' => (int)$row['stat_rows'], 'bytes' => $bytes];
    }
}
$formatBytes = static function (int $bytes): string {
    if ($bytes < 1024) return $bytes . ' B';
    if ($bytes < 1048576) return number_format($bytes / 1024, 1, ',', '.') . ' KiB';
    if ($bytes < 1073741824) return number_format($bytes / 1048576, 1, ',', '.') . ' MiB';
    return number_format($bytes / 1073741824, 2, ',', '.') . ' GiB';
};
?>
<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FITTRACK Admin</title>
<style>body{margin:0;background:#0f172a;color:#e5eefc;font:15px system-ui}.wrap{max-width:1250px;margin:auto;padding:24px}.card{background:#1e293b;border:1px solid #3b4a61;border-radius:12px;padding:18px;margin:16px 0}h1,h2{margin-top:0}input,button{padding:9px;border-radius:7px;border:1px solid #52627a;background:#111827;color:#fff}button,a.btn{cursor:pointer;background:#2563eb;border:0;text-decoration:none;color:#fff;padding:9px;border-radius:7px}.danger{background:#dc2626}.muted{color:#a9bad2}.link{color:#78b2ff;overflow-wrap:anywhere}.picture-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}.picture-card{border:1px solid #405068;border-radius:9px;padding:10px;background:#111827}.picture-card img{display:block;width:100%;height:180px;object-fit:contain;background:#fff;border-radius:5px;margin-bottom:9px}.stat-summary{display:flex;gap:12px;flex-wrap:wrap}.stat-box{background:#111827;border-radius:8px;padding:12px;min-width:150px}table{width:100%;border-collapse:collapse}th,td{text-align:left;padding:10px;border-bottom:1px solid #405068;vertical-align:top}.row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}.notice{white-space:pre-wrap;overflow-wrap:anywhere;background:#123c2c;padding:12px}.error{background:#521e2a;padding:12px}@media(max-width:800px){table,tbody,tr,td{display:block}thead{display:none}td{border:0;padding:5px}}</style><script src="/fitadmin/admin.js" defer></script></head><body><main class="wrap">
<h1>FITTRACK Admin</h1>
<?php if ($message): ?><div class="notice"><?=htmlspecialchars($message)?></div><?php endif; ?><?php if ($error): ?><div class="error"><?=htmlspecialchars($error)?></div><?php endif; ?>
<?php if (!$authenticated): ?><section class="card"><form method="post"><input type="hidden" name="action" value="admin_login"><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><label>Admin-Passwort <input name="password" type="password" required autofocus></label> <button>Anmelden</button></form></section>
<?php else: ?><form method="post"><input type="hidden" name="action" value="admin_logout"><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><button>Admin abmelden</button></form>
<section class="card"><h2>User</h2><table><thead><tr><th>User</th><th>Profil</th><th>Dashboard</th><th>Passwortreset</th><th>Löschen</th></tr></thead><tbody>
<?php foreach($users as $u): ?><tr><td>#<?=$u['id']?> <strong><?=htmlspecialchars($u['nick'])?></strong></td><td>Ziel: <?=htmlspecialchars((string)$u['goalweight'])?> kg<br>Größe: <?=htmlspecialchars((string)$u['height'])?> m</td><td><a class="btn" href="/index.php?admin_view_user=<?=$u['id']?>">Anzeigen</a></td><td><form class="row" method="post"><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><input type="hidden" name="action" value="reset_password"><input type="hidden" name="user_id" value="<?=$u['id']?>"><input name="new_password" type="password" minlength="12" placeholder="Neues Passwort" required><button>Zurücksetzen</button></form></td><td><form method="post" data-delete-user="<?=htmlspecialchars($u['nick'],ENT_QUOTES)?>"><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><input type="hidden" name="action" value="delete_user"><input type="hidden" name="user_id" value="<?=$u['id']?>"><input type="hidden" name="delete_confirmation"><button class="danger">Löschen</button></form></td></tr><?php endforeach; ?></tbody></table></section>
<section class="card"><h2>Einladungslinks</h2><form method="post" class="row"><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><input type="hidden" name="action" value="create_invite"><input name="note" maxlength="255" placeholder="Notiz (optional)"><input name="expires_at" type="datetime-local"><button>Einladung erstellen</button></form><table><thead><tr><th>Status</th><th>Notiz / Einladungslink</th><th>Erstellt</th><th></th></tr></thead><tbody><?php foreach($invites as $i): $status=$i['used_at']?'Verwendet':($i['expires_at']&&$i['expires_at']<=date('Y-m-d H:i:s')?'Abgelaufen':'Aktiv'); $inviteUrl=$baseUrl.'/index.php?invite='.rawurlencode($i['token']); ?><tr><td><?=$status?></td><td><?=htmlspecialchars((string)$i['note_text'])?><br><a class="link" href="<?=htmlspecialchars($inviteUrl)?>" target="_blank" rel="noopener"><?=htmlspecialchars($inviteUrl)?></a><br><button type="button" data-copy-text="<?=htmlspecialchars($inviteUrl,ENT_QUOTES)?>">Link kopieren</button> <span class="copy-status muted" aria-live="polite"></span></td><td><?=htmlspecialchars($i['created_at'])?><br>von <?=htmlspecialchars($i['creator_nick']??'Admin')?></td><td><form method="post" data-confirm="Einladungslink endgültig löschen?"><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><input type="hidden" name="action" value="delete_invite"><input type="hidden" name="invite_id" value="<?=$i['id']?>"><button class="danger">Löschen</button></form></td></tr><?php endforeach; ?></tbody></table></section>
<section class="card"><h2>Sharebilder</h2><?php if (!$sharePictures): ?><p class="muted">Noch keine Sharebilder gespeichert.</p><?php else: ?><div class="picture-grid"><?php foreach($sharePictures as $picture): $pictureUrl=$baseUrl.'/share_pictures/'.str_replace('%2F','/',rawurlencode($picture['path'])); $pictureUserName=$userNamesById[$picture['userId']]??'Gelöschter User'; ?><article class="picture-card"><a href="<?=htmlspecialchars($pictureUrl)?>" target="_blank" rel="noopener"><img src="<?=htmlspecialchars($pictureUrl)?>" alt="Sharebild <?=htmlspecialchars($picture['name'])?>"></a><strong><?=htmlspecialchars($picture['name'])?></strong><div class="muted">User #<?=$picture['userId']?> · <strong><?=htmlspecialchars($pictureUserName)?></strong> · <?=$formatBytes($picture['bytes'])?> · <?=date('d.m.Y H:i',$picture['modifiedAt'])?></div><p><a class="link" href="<?=htmlspecialchars($pictureUrl)?>" target="_blank" rel="noopener"><?=htmlspecialchars($pictureUrl)?></a></p><div class="row"><button type="button" data-copy-text="<?=htmlspecialchars($pictureUrl,ENT_QUOTES)?>">Link kopieren</button><span class="copy-status muted" aria-live="polite"></span><form method="post" data-confirm="Dieses Sharebild endgültig löschen?"><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><input type="hidden" name="action" value="delete_share_picture"><input type="hidden" name="picture_path" value="<?=htmlspecialchars($picture['path'],ENT_QUOTES)?>"><button class="danger">Löschen</button></form></div></article><?php endforeach; ?></div><?php endif; ?><hr><form method="post" data-confirm="Wirklich ALLE Sharebilder löschen, die älter als 30 Tage sind? Diese Aktion kann nicht rückgängig gemacht werden."><input type="hidden" name="csrf_token" value="<?=htmlspecialchars($csrf)?>"><input type="hidden" name="action" value="delete_old_share_pictures"><button class="danger">Alle Sharebilder älter als 30 Tage löschen</button></form></section>
<section class="card"><h2>Datenbankstatistik</h2><div class="stat-summary"><div class="stat-box"><div class="muted">Datenbankgröße</div><strong><?=$formatBytes($databaseStats['bytes'])?></strong></div><div class="stat-box"><div class="muted">Tabellen</div><strong><?=count($databaseStats['tables'])?></strong></div><div class="stat-box"><div class="muted">Datensätze (ca.)</div><strong><?=number_format($databaseStats['rows'],0,',','.')?></strong></div><div class="stat-box"><div class="muted">Sharebilder</div><strong><?=count($sharePictures)?> · <?=$formatBytes(array_sum(array_column($sharePictures,'bytes')))?></strong></div></div><table><thead><tr><th>Tabelle</th><th>Datensätze (ca.)</th><th>Speicher</th></tr></thead><tbody><?php foreach($databaseStats['tables'] as $stat): ?><tr><td><?=htmlspecialchars($stat['name'])?></td><td><?=number_format($stat['rows'],0,',','.')?></td><td><?=$formatBytes($stat['bytes'])?></td></tr><?php endforeach; ?></tbody></table><p class="muted">Zeilenangaben von InnoDB sind Schätzwerte; die Speicherwerte enthalten Daten und Indizes.</p></section>
<?php endif; ?></main></body></html>
