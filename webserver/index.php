<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/invitation_helpers.php';

$appConfig = require __DIR__ . '/app_config.php';
$allowUserRegistration = !empty($appConfig['allow_user_registration']);
$allowRegistrationInvites = !empty($appConfig['allow_registration_invites']);

$csrfToken = ensureCsrfToken();

// Datenbankzugang wie in data.php: erst ENV, dann Fallback.
$dbConfig = databaseConfig();
$dbHost = $dbConfig['host'];
$dbUser = $dbConfig['user'];
$dbPass = $dbConfig['pass'];
$dbName = $dbConfig['name'];

// Datenbank Verbindung
$dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
$db = new PDO($dsn, $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

// Keep existing installations compatible with the extended onboarding fields.
foreach (['height' => 'DOUBLE NULL', 'birthdate' => 'DATE NULL', 'gender' => 'VARCHAR(20) NULL', 'onboarding_completed_at' => 'DATETIME NULL'] as $column => $definition) {
    $columnStmt = $db->prepare(
        'SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = \'user\' AND COLUMN_NAME = ? LIMIT 1'
    );
    $columnStmt->execute([$column]);
    if (!$columnStmt->fetchColumn()) {
        $db->exec("ALTER TABLE `user` ADD COLUMN `$column` $definition");
    }
}

$registrationMeasurementTypes = $db->query(
    "SELECT id, messurement, unit FROM messuretype
     WHERE LOWER(TRIM(messurement)) NOT IN ('gewicht', 'weight', 'bodyweight', 'body_weight', 'kg')
     ORDER BY messurement"
)->fetchAll();

ensureRegistrationInviteSchema($db);
$inviteToken = strtolower(trim((string)($_GET['invite'] ?? $_POST['invite_token'] ?? '')));
$validRegistrationInvite = $inviteToken !== '' ? findValidRegistrationInvite($db, $inviteToken) : null;
$canRegister = $allowUserRegistration || $validRegistrationInvite !== null;

$isSharedView = false;
$isAdminView = false;
$sharedUserId = null;
$sharedNick = null;
$shareToken = trim((string)($_GET['share'] ?? ''));
$adminViewUserId = (int)($_GET['admin_view_user'] ?? 0);

if ($adminViewUserId > 0 && !empty($_SESSION['fitadmin_authenticated'])) {
    $adminUserStmt = $db->prepare('SELECT id, nick FROM `user` WHERE id = ? LIMIT 1');
    $adminUserStmt->execute([$adminViewUserId]);
    if ($adminUser = $adminUserStmt->fetch()) {
        $isSharedView = true;
        $isAdminView = true;
        $sharedUserId = (int)$adminUser['id'];
        $sharedNick = (string)$adminUser['nick'];
    }
}

if (!$isAdminView && $shareToken !== '') {
    $shareStmt = $db->prepare(
        "SELECT dl.id, dl.user_id, u.nick
         FROM `deeplink_access` dl
         JOIN `user` u ON u.id = dl.user_id
         WHERE dl.token = ?
           AND dl.disabled_at IS NULL
           AND (dl.expires_at IS NULL OR dl.expires_at > NOW())
         LIMIT 1"
    );
    $shareStmt->execute([$shareToken]);
    $shareRow = $shareStmt->fetch();

    if ($shareRow) {
        $shareAccessStmt = $db->prepare(
            'UPDATE `deeplink_access`
             SET access_count = access_count + 1, last_accessed_at = NOW()
             WHERE id = ?'
        );
        $shareAccessStmt->execute([(int)$shareRow['id']]);
        $isSharedView = true;
        $sharedUserId = (int)$shareRow['user_id'];
        $sharedNick = (string)$shareRow['nick'];
    }
}

$password_change_error = $_SESSION['password_change_error'] ?? '';
$password_change_success = $_SESSION['password_change_success'] ?? '';
unset($_SESSION['password_change_error'], $_SESSION['password_change_success']);
$login_error = !empty($_SESSION['session_expired']) ? 'Deine Sitzung ist abgelaufen. Bitte melde dich erneut an.' : '';
unset($_SESSION['session_expired']);

// Login verarbeiten
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($isSharedView) {
        http_response_code(403);
        exit('Diese Aktion ist im Deeplink-Ansichtsmodus nicht erlaubt.');
    }

    $action = $_POST['action'];
    $csrfTokenInput = (string)($_POST['csrf_token'] ?? '');

    if (!validCsrfToken($csrfTokenInput)) {
        http_response_code(403);
        $login_error = 'Sicherheitspruefung fehlgeschlagen. Bitte Seite neu laden.';
        $register_error = 'Sicherheitspruefung fehlgeschlagen. Bitte Seite neu laden.';
    } else {

    if ($action === 'logout') {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], (bool)$params['secure'], (bool)$params['httponly']);
        }
        session_destroy();
        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }

    if ($action === 'change_password') {
        if (!isset($_SESSION['user_id']) || !is_numeric($_SESSION['user_id'])) {
            $_SESSION['password_change_error'] = 'Nicht angemeldet.';
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
        }

        $currentPassword = $_POST['current_password'] ?? '';
        $newPassword = $_POST['new_password'] ?? '';
        $newPasswordConfirm = $_POST['new_password_confirm'] ?? '';

        if ($newPassword !== $newPasswordConfirm) {
            $_SESSION['password_change_error'] = 'Neue Passwoerter stimmen nicht ueberein.';
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
        }

        if (strlen($newPassword) < 12) {
            $_SESSION['password_change_error'] = 'Neues Passwort muss mindestens 12 Zeichen haben.';
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
        }

        try {
            $stmt = $db->prepare('SELECT password FROM user WHERE id = ? LIMIT 1');
            $stmt->execute([(int) $_SESSION['user_id']]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($currentPassword, $user['password'])) {
                $_SESSION['password_change_error'] = 'Aktuelles Passwort ist ungueltig.';
                header('Location: ' . $_SERVER['PHP_SELF']);
                exit;
            }

            $newHash = password_hash($newPassword, PASSWORD_ARGON2ID);
            $updateStmt = $db->prepare('UPDATE user SET password = ? WHERE id = ?');
            $updateStmt->execute([$newHash, (int) $_SESSION['user_id']]);

            $_SESSION['password_change_success'] = 'Passwort wurde erfolgreich geaendert.';
        } catch (Throwable $e) {
            $_SESSION['password_change_error'] = 'Passwort konnte nicht geaendert werden.';
        }

        header('Location: ' . $_SERVER['PHP_SELF']);
        exit;
    }

    if ($action === 'login') {
        $rateLimit = loginRateLimitState();
        if ($rateLimit['blockedUntil'] > time()) {
            http_response_code(429);
            $login_error = 'Zu viele Anmeldeversuche. Bitte in einigen Minuten erneut versuchen.';
        } else {
        $nick = $_POST['nick'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $stmt = $db->prepare('SELECT id, password FROM user WHERE nick = ?');
        $stmt->execute([$nick]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            clearLoginFailures();
            establishAuthenticatedSession((int)$user['id'], (string)$nick);
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
        } else {
            recordLoginFailure();
            $login_error = 'Nick oder Passwort ungültig';
        }
        }
    }
    elseif ($action === 'register') {
        if (!$canRegister) {
            http_response_code(403);
            $register_error = 'Registrierung ist deaktiviert.';
        } else {
        $nick = $_POST['reg_nick'] ?? '';
        $password = $_POST['reg_password'] ?? '';
        $password_confirm = $_POST['reg_password_confirm'] ?? '';
        $startWeight = filter_var(str_replace(',', '.', (string)($_POST['reg_start_weight'] ?? '')), FILTER_VALIDATE_FLOAT);
        $goalWeight = filter_var(str_replace(',', '.', (string)($_POST['reg_goal_weight'] ?? '')), FILTER_VALIDATE_FLOAT);
        $heightCm = filter_var(str_replace(',', '.', (string)($_POST['reg_height_cm'] ?? '')), FILTER_VALIDATE_FLOAT);
        $birthdate = trim((string)($_POST['reg_birthdate'] ?? ''));
        $gender = trim((string)($_POST['reg_gender'] ?? ''));
        $birthdateObject = DateTimeImmutable::createFromFormat('!Y-m-d', $birthdate);
        
        if ($password !== $password_confirm) {
            $register_error = 'Passwörter stimmen nicht überein';
        } elseif (strlen($nick) < 3 || strlen($password) < 12) {
            $register_error = 'Nick min. 3 Zeichen, Passwort min. 12 Zeichen';
        } elseif ($startWeight === false || $startWeight < 20 || $startWeight > 500) {
            $register_error = 'Bitte ein gültiges Startgewicht zwischen 20 und 500 kg angeben.';
        } elseif ($goalWeight === false || $goalWeight < 20 || $goalWeight >= $startWeight) {
            $register_error = 'Das Zielgewicht muss mindestens 20 kg und kleiner als das Startgewicht sein.';
        } elseif ($heightCm === false || $heightCm < 100 || $heightCm > 260) {
            $register_error = 'Bitte eine gültige Körpergröße zwischen 100 und 260 cm angeben.';
        } elseif (!$birthdateObject || $birthdateObject->format('Y-m-d') !== $birthdate || $birthdateObject > new DateTimeImmutable('today')) {
            $register_error = 'Bitte ein gültiges Geburtsdatum angeben.';
        } elseif (!in_array($gender, ['female', 'male', 'diverse', 'unspecified'], true)) {
            $register_error = 'Bitte eine gültige Geschlechtsangabe auswählen.';
        } else {
            $hashed_password = password_hash($password, PASSWORD_ARGON2ID);
            
            try {
                $db->beginTransaction();
                if (!$allowUserRegistration && !findValidRegistrationInvite($db, $inviteToken, true)) {
                    throw new RuntimeException('Der Einladungslink ist nicht mehr gültig.');
                }
                $heightM = ((float)$heightCm) / 100;
                $stmt = $db->prepare(
                    'INSERT INTO user (nick, password, goalweight, height, birthdate, gender, onboarding_completed_at)
                     VALUES (?, ?, ?, ?, ?, ?, NOW())'
                );
                $stmt->execute([$nick, $hashed_password, $goalWeight, $heightM, $birthdate, $gender]);
                $newUserId = (int)$db->lastInsertId();

                $weightTypeStmt = $db->query(
                    "SELECT id FROM messuretype WHERE LOWER(TRIM(messurement)) IN ('gewicht','weight','bodyweight','body_weight','kg') LIMIT 1"
                );
                $weightTypeId = (int)($weightTypeStmt->fetchColumn() ?: 0);
                if ($weightTypeId <= 0) {
                    throw new RuntimeException('Messwerttyp Gewicht fehlt.');
                }

                $measureStmt = $db->prepare('INSERT INTO messure (`user-id`, `datetime`, notes, official) VALUES (?, NOW(), ?, b\'1\')');
                $measureStmt->execute([$newUserId, 'Startmessung aus der Registrierung']);
                $measurementId = (int)$db->lastInsertId();
                $valueStmt = $db->prepare('INSERT INTO messurevalue (`messure-id`, `type-id`, value) VALUES (?, ?, ?)');
                $valueStmt->execute([$measurementId, $weightTypeId, $startWeight]);

                $automaticGoals = [];
                for ($value = floor(((float)$startWeight - 0.001) / 5) * 5; $value > (float)$goalWeight; $value -= 5) {
                    $automaticGoals[] = [(float)$value, 'Zwischenziel: ' . number_format((float)$value, 1, ',', '.') . ' kg'];
                }
                for ($boundary = floor(((float)$startWeight - 0.001) / 50) * 50; $boundary > (float)$goalWeight; $boundary -= 50) {
                    $automaticGoals[] = [$boundary - 0.1, 'Unter ' . number_format($boundary, 0, ',', '.') . ' kg'];
                }
                $automaticGoals[] = [(float)$goalWeight, 'Persönliches Wunschgewicht'];
                $age = $birthdateObject->diff(new DateTimeImmutable('today'))->y;
                $bmiOrientationWeight = round(24.9 * $heightM * $heightM, 1);
                if ($age >= 18 && $bmiOrientationWeight < (float)$startWeight) {
                    $automaticGoals[] = [$bmiOrientationWeight, 'BMI-Orientierungswert (keine medizinische Empfehlung)'];
                }

                usort($automaticGoals, static fn(array $a, array $b): int => $b[0] <=> $a[0]);
                $goalStmt = $db->prepare(
                    'INSERT INTO goals (`user-id`, messuretype_id, `messure-value`, goalname, createdat)
                     VALUES (?, ?, ?, ?, NOW())'
                );
                $seenWeightTargets = [];
                foreach ($automaticGoals as [$target, $label]) {
                    $key = number_format((float)$target, 1, '.', '');
                    if (isset($seenWeightTargets[$key])) continue;
                    $seenWeightTargets[$key] = true;
                    $goalStmt->execute([$newUserId, $weightTypeId, $target, mb_substr($label, 0, 50)]);
                }

                $selectedTypes = array_map('intval', (array)($_POST['reg_goal_type'] ?? []));
                $targetValues = (array)($_POST['reg_goal_value'] ?? []);
                $allowedTypes = array_column($registrationMeasurementTypes, null, 'id');
                foreach ($selectedTypes as $typeId) {
                    if (!isset($allowedTypes[$typeId])) continue;
                    $target = filter_var(str_replace(',', '.', (string)($targetValues[$typeId] ?? '')), FILTER_VALIDATE_FLOAT);
                    if ($target === false || $target <= 0 || $target > 1000) continue;
                    $type = $allowedTypes[$typeId];
                    $label = 'Ziel ' . (string)$type['messurement'];
                    $goalStmt->execute([$newUserId, $typeId, $target, mb_substr($label, 0, 50)]);
                }

                if ($validRegistrationInvite !== null) {
                    $inviteStmt = $db->prepare('UPDATE `registration_invite` SET used_at = NOW(), used_by_user_id = ? WHERE token = ? AND used_at IS NULL');
                    $inviteStmt->execute([$newUserId, $inviteToken]);
                    if ($inviteStmt->rowCount() !== 1) throw new RuntimeException('Der Einladungslink wurde bereits verwendet.');
                }

                $db->commit();
                
                establishAuthenticatedSession($newUserId, (string)$nick);
                header('Location: ' . $_SERVER['PHP_SELF']);
                exit;
            } catch (PDOException $e) {
                if ($db->inTransaction()) $db->rollBack();
                $register_error = 'Nick existiert bereits';
            } catch (Throwable $e) {
                if ($db->inTransaction()) $db->rollBack();
                $register_error = 'Registrierung konnte nicht abgeschlossen werden.';
            }
        }
        }
    }
    }
}

// Session prüfen
if (isset($_SESSION['user_id']) || $isSharedView) {
    $isReadOnlyView = $isSharedView;
    $currentPage = (!$isSharedView && ($_GET['page'] ?? '') === 'analysis') ? 'analysis' : 'overview';
    $currentViewUserNick = $isSharedView ? $sharedNick : ($_SESSION['nick'] ?? 'Unbekannt');
    $currentViewShareToken = $isSharedView ? $shareToken : '';
    include 'overview.html';
} else {
    include 'login.html';
}
?>
