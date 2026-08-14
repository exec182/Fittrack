<?php
declare(strict_types=1);

const SESSION_LIFETIME_SECONDS = 604800; // 7 days

function requestIsHttps(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (getenv('TRUST_PROXY_HTTPS') === '1'
            && strtolower((string)($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '')) === 'https');
}

function startSecureSession(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) return;
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.gc_maxlifetime', (string)SESSION_LIFETIME_SECONDS);
    session_set_cookie_params([
        'lifetime' => SESSION_LIFETIME_SECONDS, 'path' => '/', 'domain' => '',
        'secure' => requestIsHttps(), 'httponly' => true, 'samesite' => 'Lax',
    ]);
    session_start();

    if (isset($_SESSION['user_id'])) {
        $expiresAt = (int)($_SESSION['expires_at'] ?? 0);
        if ($expiresAt > 0 && $expiresAt <= time()) {
            unset($_SESSION['user_id'], $_SESSION['nick'], $_SESSION['expires_at']);
            $_SESSION['session_expired'] = true;
        } else {
            $_SESSION['expires_at'] = time() + SESSION_LIFETIME_SECONDS;
            header('X-Session-Expires-At: ' . (string)$_SESSION['expires_at']);
        }
    }
}

function establishAuthenticatedSession(int $userId, string $nick): void
{
    session_regenerate_id(true);
    $_SESSION['user_id'] = $userId;
    $_SESSION['nick'] = $nick;
    $_SESSION['expires_at'] = time() + SESSION_LIFETIME_SECONDS;
    unset($_SESSION['session_expired']);
}

function sendSecurityHeaders(): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: no-referrer');
    header('Permissions-Policy: camera=(), microphone=(), geolocation=()');
    header("Content-Security-Policy: default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'");
    if (requestIsHttps()) header('Strict-Transport-Security: max-age=31536000; includeSubDomains');
}

function databaseConfig(): array
{
    return [
        'host' => getenv('MYSQL_HOST') ?: (getenv('DB_HOST') ?: 'mysql'),
        'user' => getenv('MYSQL_USER') ?: (getenv('DB_USER') ?: 'diattool_user'),
        'pass' => getenv('MYSQL_PASSWORD') ?: (getenv('DB_PASS') ?: ''),
        'name' => getenv('MYSQL_DATABASE') ?: (getenv('DB_NAME') ?: 'diattool_db'),
    ];
}

function ensureCsrfToken(): string
{
    if (empty($_SESSION['csrf_token'])) $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    return (string)$_SESSION['csrf_token'];
}

function validCsrfToken(string $token): bool
{
    return isset($_SESSION['csrf_token']) && hash_equals((string)$_SESSION['csrf_token'], $token);
}

function loginRateLimitPath(): string
{
    return sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'diettool_login_' . hash('sha256', (string)($_SERVER['REMOTE_ADDR'] ?? 'unknown')) . '.json';
}

function loginRateLimitState(): array
{
    $now = time();
    $stored = json_decode((string)@file_get_contents(loginRateLimitPath()), true);
    $attempts = is_array($stored['attempts'] ?? null) ? $stored['attempts'] : [];
    return [
        'attempts' => array_values(array_filter($attempts, static fn($ts): bool => is_int($ts) && $ts > $now - 900)),
        'blockedUntil' => (int)($stored['blockedUntil'] ?? 0),
    ];
}

function recordLoginFailure(): void
{
    $state = loginRateLimitState();
    $state['attempts'][] = time();
    if (count($state['attempts']) >= 5) $state['blockedUntil'] = time() + 900;
    @file_put_contents(loginRateLimitPath(), json_encode($state), LOCK_EX);
}

function clearLoginFailures(): void
{
    $path = loginRateLimitPath();
    if (is_file($path)) @unlink($path);
}

startSecureSession();
sendSecurityHeaders();
