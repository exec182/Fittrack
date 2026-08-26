<?php
declare(strict_types=1);

function ensureRegistrationInviteSchema(PDO $db): void
{
    $db->exec("CREATE TABLE IF NOT EXISTS `registration_invite` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `token` VARCHAR(128) NOT NULL,
        `note_text` VARCHAR(255) NULL,
        `created_by_user_id` INT NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        `expires_at` DATETIME NULL,
        `used_at` DATETIME NULL,
        `used_by_user_id` INT NULL,
        PRIMARY KEY (`id`),
        UNIQUE KEY `uniq_registration_invite_token` (`token`),
        KEY `idx_registration_invite_status` (`used_at`, `expires_at`),
        KEY `idx_registration_invite_creator` (`created_by_user_id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci");
}

function createRegistrationInvite(PDO $db, ?int $creatorUserId, string $note = '', ?string $expiresAt = null): array
{
    ensureRegistrationInviteSchema($db);
    $note = trim($note);
    if (mb_strlen($note) > 255) throw new InvalidArgumentException('Die Notiz darf höchstens 255 Zeichen lang sein.');
    if ($expiresAt !== null && $expiresAt !== '') {
        $parsed = DateTimeImmutable::createFromFormat('!Y-m-d\TH:i', $expiresAt);
        if (!$parsed || $parsed <= new DateTimeImmutable()) throw new InvalidArgumentException('Das Ablaufdatum muss in der Zukunft liegen.');
        $expiresAt = $parsed->format('Y-m-d H:i:s');
    } else $expiresAt = null;
    $token = bin2hex(random_bytes(32));
    $stmt = $db->prepare('INSERT INTO `registration_invite` (`token`, `note_text`, `created_by_user_id`, `expires_at`) VALUES (?, ?, ?, ?)');
    $stmt->execute([$token, $note !== '' ? $note : null, $creatorUserId, $expiresAt]);
    return ['id' => (int)$db->lastInsertId(), 'token' => $token, 'expiresAt' => $expiresAt];
}

function findValidRegistrationInvite(PDO $db, string $token, bool $forUpdate = false): ?array
{
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) return null;
    ensureRegistrationInviteSchema($db);
    $sql = 'SELECT * FROM `registration_invite` WHERE token = ? AND used_at IS NULL AND (expires_at IS NULL OR expires_at > NOW()) LIMIT 1';
    if ($forUpdate) $sql .= ' FOR UPDATE';
    $stmt = $db->prepare($sql);
    $stmt->execute([$token]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return $row ?: null;
}
