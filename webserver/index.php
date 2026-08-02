<?php
$isHttps = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => $isHttps,
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

$appConfig = require __DIR__ . '/app_config.php';
$allowUserRegistration = !empty($appConfig['allow_user_registration']);

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$csrfToken = $_SESSION['csrf_token'];

function isValidCsrfToken(string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Datenbankzugang wie in data.php: erst ENV, dann Fallback.
$dbHost = getenv('MYSQL_HOST') ?: (getenv('DB_HOST') ?: 'mysql');
$dbUser = getenv('MYSQL_USER') ?: (getenv('DB_USER') ?: 'diattool_user');
$dbPass = getenv('MYSQL_PASSWORD') ?: (getenv('DB_PASS') ?: 'diattool_pass');
$dbName = getenv('MYSQL_DATABASE') ?: (getenv('DB_NAME') ?: 'diattool_db');

// Datenbank Verbindung
$dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
$db = new PDO($dsn, $dbUser, $dbPass, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);

$isSharedView = false;
$sharedUserId = null;
$sharedNick = null;
$shareToken = trim((string)($_GET['share'] ?? ''));

if ($shareToken !== '') {
    $shareStmt = $db->prepare(
        "SELECT dl.user_id, u.nick
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
        $isSharedView = true;
        $sharedUserId = (int)$shareRow['user_id'];
        $sharedNick = (string)$shareRow['nick'];
    }
}

$password_change_error = $_SESSION['password_change_error'] ?? '';
$password_change_success = $_SESSION['password_change_success'] ?? '';
unset($_SESSION['password_change_error'], $_SESSION['password_change_success']);

// Login verarbeiten
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action'])) {
    if ($isSharedView) {
        http_response_code(403);
        exit('Diese Aktion ist im Deeplink-Ansichtsmodus nicht erlaubt.');
    }

    $action = $_POST['action'];
    $csrfTokenInput = (string)($_POST['csrf_token'] ?? '');

    if (!isValidCsrfToken($csrfTokenInput)) {
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

        if (strlen($newPassword) < 6) {
            $_SESSION['password_change_error'] = 'Neues Passwort muss mindestens 6 Zeichen haben.';
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
        $nick = $_POST['nick'] ?? '';
        $password = $_POST['password'] ?? '';
        
        $stmt = $db->prepare('SELECT id, password FROM user WHERE nick = ?');
        $stmt->execute([$nick]);
        $user = $stmt->fetch();
        
        if ($user && password_verify($password, $user['password'])) {
            session_regenerate_id(true);
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['nick'] = $nick;
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
        } else {
            $login_error = 'Nick oder Passwort ungültig';
        }
    }
    elseif ($action === 'register') {
        if (!$allowUserRegistration) {
            http_response_code(403);
            $register_error = 'Registrierung ist deaktiviert.';
        } else {
        $nick = $_POST['reg_nick'] ?? '';
        $password = $_POST['reg_password'] ?? '';
        $password_confirm = $_POST['reg_password_confirm'] ?? '';
        
        if ($password !== $password_confirm) {
            $register_error = 'Passwörter stimmen nicht überein';
        } elseif (strlen($nick) < 3 || strlen($password) < 6) {
            $register_error = 'Nick min. 3 Zeichen, Passwort min. 6 Zeichen';
        } else {
            $hashed_password = password_hash($password, PASSWORD_ARGON2ID);
            
            try {
                $stmt = $db->prepare('INSERT INTO user (nick, password) VALUES (?, ?)');
                $stmt->execute([$nick, $hashed_password]);
                
                session_regenerate_id(true);
                $_SESSION['user_id'] = $db->lastInsertId();
                $_SESSION['nick'] = $nick;
                header('Location: ' . $_SERVER['PHP_SELF']);
                exit;
            } catch (PDOException $e) {
                $register_error = 'Nick existiert bereits';
            }
        }
        }
    }
    }
}

// Session prüfen
if (isset($_SESSION['user_id']) || $isSharedView) {
    $isReadOnlyView = $isSharedView;
    $currentViewUserNick = $isSharedView ? $sharedNick : ($_SESSION['nick'] ?? 'Unbekannt');
    $currentViewShareToken = $isSharedView ? $shareToken : '';
    include 'overview.html';
} else {
    include 'login.html';
}
?>