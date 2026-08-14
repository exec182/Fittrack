<?php
declare(strict_types=1);
require_once __DIR__ . '/bootstrap.php';
ini_set('display_errors', '0');
ini_set('html_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Pragma: no-cache');

$defaultData = [
    'heightM' => 1.82,
    'goalWeight' => null,
    'goals' => [],
    'weights' => [118.0, 117.6, 115.7, 115.6, 115.5, 115.3, 115.2, 114.9, 114.6, 114.0, 113.3, 113.0, 112.7, 112.8, 112.5, 112.4, 111.7, 111.4, 110.7, 110.9, 111.8, 110.8, 110.4, 110.2, 109.4, 109.3, 108.9, 109.2, 109.2, 109.0, 107.9, 107.7, 107.7, 108.1, 107.9, 107.2, 106.8, 106.4, 106.1, 105.8, 105.5, 105.8, 105.8, 105.7, 105.0, 104.5],
    'dates' => ['2026-06-14', '2026-06-16', '2026-06-18', '2026-06-19', '2026-06-20', '2026-06-21', '2026-06-22', '2026-06-23', '2026-06-24', '2026-06-25', '2026-06-26', '2026-06-27', '2026-06-28', '2026-06-29', '2026-06-30', '2026-07-01', '2026-07-02', '2026-07-03', '2026-07-04', '2026-07-05', '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10', '2026-07-11', '2026-07-12', '2026-07-13', '2026-07-14', '2026-07-15', '2026-07-16', '2026-07-17', '2026-07-18', '2026-07-19', '2026-07-20', '2026-07-21', '2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30', '2026-07-31'],
    'measurements' => [
        ['title' => 'Brustumfang', 'value' => '107,0 cm', 'note' => 'Letzte Messung am 2026-07-31'],
        ['title' => 'Bauchumfang', 'value' => '103,0 cm', 'note' => 'Letzte Messung am 2026-07-31'],
        ['title' => 'Bundumfang', 'value' => '104,2 cm', 'note' => 'Letzte Messung am 2026-07-31'],
        ['title' => 'Poumfang', 'value' => '108,9 cm', 'note' => 'Letzte Messung am 2026-07-31']
    ],
    'measurementTypes' => [
        ['id' => 1, 'name' => 'Gewicht', 'unit' => 'kg'],
        ['id' => 2, 'name' => 'Brustumfang', 'unit' => 'cm'],
        ['id' => 3, 'name' => 'Bauchumfang', 'unit' => 'cm'],
        ['id' => 4, 'name' => 'Bundumfang', 'unit' => 'cm'],
        ['id' => 5, 'name' => 'Poumfang', 'unit' => 'cm']
    ],
    'latestMeasurementEntries' => [
        ['typeId' => 1, 'typeName' => 'Gewicht', 'unit' => 'kg', 'value' => 104.5],
        ['typeId' => 2, 'typeName' => 'Brustumfang', 'unit' => 'cm', 'value' => 107.0],
        ['typeId' => 3, 'typeName' => 'Bauchumfang', 'unit' => 'cm', 'value' => 103.0],
        ['typeId' => 4, 'typeName' => 'Bundumfang', 'unit' => 'cm', 'value' => 104.2],
        ['typeId' => 5, 'typeName' => 'Poumfang', 'unit' => 'cm', 'value' => 108.9]
    ],
    'trainingPlan' => [
        ['day' => 'Montag', 'focus' => 'Krafttraining + Spaziergang', 'duration' => '60 Min.', 'note' => '30 Min Ganzkoerper (3x10 Kniebeugen, 3x10 erhoehte Liegestuetz, 3x12 Rudern, 3x15 Hueftheben, 3x30s Plank), danach 30 Min zuegiges Gehen'],
        ['day' => 'Dienstag', 'focus' => 'Cardio', 'duration' => '55-70 Min.', 'note' => '45-60 Min schnelles Gehen oder Radfahren, danach 10 Min Dehnen'],
        ['day' => 'Mittwoch', 'focus' => 'Krafttraining', 'duration' => '50-60 Min.', 'note' => '30-40 Min Kraft (3x12 Kniebeugen, 3x10 Ausfallschritte/Bein, 3x12 Schulterdruecken, 3x12 Rudern, 3x30s Plank), danach 20 Min Spaziergang'],
        ['day' => 'Donnerstag', 'focus' => 'Aktive Erholung', 'duration' => '75 Min.', 'note' => '60 Min lockeres Gehen plus 15 Min Mobilitaet und Dehnen'],
        ['day' => 'Freitag', 'focus' => 'Krafttraining', 'duration' => '50-70 Min.', 'note' => '30-40 Min Kraft (3x12 Kniebeugen, 3x12 Liegestuetz an der Wand, 3x15 Hueftheben, 3x12 Rudern, 3x40s Plank), danach 20-30 Min lockeres Gehen'],
        ['day' => 'Samstag', 'focus' => 'Laengere Cardioeinheit', 'duration' => '60-90 Min.', 'note' => 'Spaziergang, Radfahren oder Schwimmen; Intensitaet so, dass Unterhaltung moeglich bleibt'],
        ['day' => 'Sonntag', 'focus' => 'Erholung', 'duration' => '30-45 Min.', 'note' => 'Lockerer Spaziergang, dazu Dehnen oder leichtes Mobilitaetstraining']
    ],
    'recentTrainingEntries' => [
        ['id' => 1, 'date' => '2026-07-31', 'trainingText' => 'Ganzkoerperzirkel und lockerer Spaziergang', 'duration' => '55 Min.', 'limitation' => '', 'loadLevel' => 3, 'painLevel' => 1, 'sourceDay' => 'Freitag', 'createdAt' => '2026-07-31 18:20:00'],
        ['id' => 2, 'date' => '2026-07-29', 'trainingText' => '45 Min Cardio auf dem Rad', 'duration' => '45 Min.', 'limitation' => 'Kein Sprinten', 'loadLevel' => 2, 'painLevel' => 1, 'sourceDay' => 'Mittwoch', 'createdAt' => '2026-07-29 17:05:00']
    ],
    'source' => 'fallback'
];

function outputJson(array $payload): void {
    echo json_encode($payload, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
}

function isValidDate(string $value): bool {
    $date = DateTimeImmutable::createFromFormat('!Y-m-d', $value);
    return $date !== false && $date->format('Y-m-d') === $value;
}

function isValidTime(string $value): bool {
    $time = DateTimeImmutable::createFromFormat('!H:i', $value);
    return $time !== false && $time->format('H:i') === $value;
}

function parsePositiveFloat(mixed $raw, float $maximum = 1000.0): ?float {
    $normalized = str_replace(',', '.', trim((string)$raw));
    if ($normalized === '' || !is_numeric($normalized)) return null;
    $value = (float)$normalized;
    return is_finite($value) && $value > 0 && $value <= $maximum ? $value : null;
}

function isAllowedWeekday(string $value): bool {
    return in_array($value, ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'], true);
}

function buildUserSharePictureDir(int $userId): string {
    return __DIR__
        . DIRECTORY_SEPARATOR . 'share_pictures'
        . DIRECTORY_SEPARATOR . 'user_' . $userId;
}

function requireAuthenticatedUserId(): int {
    if (!isset($_SESSION['user_id']) || !is_numeric($_SESSION['user_id'])) {
        http_response_code(401);
        outputJson([
            'ok' => false,
            'error' => !empty($_SESSION['session_expired']) ? 'Sitzung abgelaufen' : 'Nicht angemeldet',
            'code' => !empty($_SESSION['session_expired']) ? 'session_expired' : 'not_authenticated',
        ]);
        exit;
    }

    return (int)$_SESSION['user_id'];
}

function normalizeDeeplinkToken(string $rawToken): string {
    $token = trim($rawToken);
    if (!preg_match('/^[A-Za-z0-9_-]{24,128}$/', $token)) {
        return '';
    }
    return $token;
}

function findActiveDeeplinkOwner(mysqli $mysqli, string $token): ?array {
    $stmt = $mysqli->prepare(
        "SELECT dl.user_id, u.nick
         FROM `deeplink_access` dl
         JOIN `user` u ON u.id = dl.user_id
         WHERE dl.token = ?
           AND dl.disabled_at IS NULL
           AND (dl.expires_at IS NULL OR dl.expires_at > NOW())
         LIMIT 1"
    );
    if (!$stmt) {
        return null;
    }

    $stmt->bind_param('s', $token);
    $stmt->execute();
    $result = $stmt->get_result();
    if (!$result || $result->num_rows === 0) {
        return null;
    }

    $row = $result->fetch_assoc();
    return [
        'userId' => (int)$row['user_id'],
        'nick' => (string)$row['nick']
    ];
}

function normalizeMeasurementKey(string $value): string {
    $normalized = strtolower(trim($value));
    $normalized = str_replace(['ä', 'ö', 'ü', 'ß'], ['ae', 'oe', 'ue', 'ss'], $normalized);
    $normalized = preg_replace('/[^a-z0-9]+/', '', $normalized);
    return $normalized;
}

function formatMeasurementValue(float $value): string {
    return number_format($value, 1, ',', '') . ' cm';
}

function doesColumnExist(mysqli $mysqli, string $tableName, string $columnName): bool {
    $stmt = $mysqli->prepare(
        'SELECT 1
         FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
           AND COLUMN_NAME = ?
         LIMIT 1'
    );
    if (!$stmt) {
        return false;
    }

    $stmt->bind_param('ss', $tableName, $columnName);
    $stmt->execute();
    $result = $stmt->get_result();
    return (bool)($result && $result->num_rows > 0);
}

function doesIndexExist(mysqli $mysqli, string $tableName, string $indexName): bool {
    $stmt = $mysqli->prepare(
        'SELECT 1
         FROM INFORMATION_SCHEMA.STATISTICS
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
           AND INDEX_NAME = ?
         LIMIT 1'
    );
    if (!$stmt) {
        return false;
    }

    $stmt->bind_param('ss', $tableName, $indexName);
    $stmt->execute();
    $result = $stmt->get_result();
    return (bool)($result && $result->num_rows > 0);
}

function doesConstraintExist(mysqli $mysqli, string $tableName, string $constraintName): bool {
    $stmt = $mysqli->prepare(
        'SELECT 1
         FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
         WHERE TABLE_SCHEMA = DATABASE()
           AND TABLE_NAME = ?
           AND CONSTRAINT_NAME = ?
         LIMIT 1'
    );
    if (!$stmt) {
        return false;
    }

    $stmt->bind_param('ss', $tableName, $constraintName);
    $stmt->execute();
    $result = $stmt->get_result();
    return (bool)($result && $result->num_rows > 0);
}

function ensureTrainingPlanEntryTable(mysqli $mysqli): void {
    $createTableSql = "CREATE TABLE IF NOT EXISTS `training_plan_entry` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `user_id` INT NOT NULL,
        `weekday_name` VARCHAR(20) NOT NULL,
        `focus_text` VARCHAR(160) NOT NULL,
        `duration_text` VARCHAR(50) NOT NULL,
        `note_text` TEXT NOT NULL,
        `valid_from` DATETIME NOT NULL,
        `deactivated_at` DATETIME NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        KEY `idx_plan_user_active` (`user_id`, `deactivated_at`, `valid_from`),
        KEY `idx_plan_user_day` (`user_id`, `weekday_name`, `deactivated_at`),
        CONSTRAINT `fk_training_plan_entry_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

    if (!$mysqli->query($createTableSql)) {
        throw new RuntimeException('Konnte training_plan_entry nicht vorbereiten: ' . $mysqli->error);
    }
}

function buildDefaultTrainingPlanEntries(array $defaultPlan, int $userId): array {
    $validFrom = date('Y-m-d 00:00:00');
    return array_values(array_filter(array_map(static function (array $entry, int $index) use ($userId, $validFrom): ?array {
        $day = trim((string)($entry['day'] ?? ''));
        $focus = trim((string)($entry['focus'] ?? ''));
        $duration = trim((string)($entry['duration'] ?? ''));
        $note = trim((string)($entry['note'] ?? ''));
        if ($day === '' || $focus === '' || $duration === '' || $note === '') {
            return null;
        }

        return [
            'id' => -($index + 1),
            'userId' => $userId,
            'day' => $day,
            'focus' => $focus,
            'duration' => $duration,
            'note' => $note,
            'validFrom' => $validFrom,
            'deactivatedAt' => null,
            'createdAt' => $validFrom,
            'isDefault' => true
        ];
    }, $defaultPlan, array_keys($defaultPlan))));
}

function ensureTrainingEntryTable(mysqli $mysqli): void {
    ensureTrainingPlanEntryTable($mysqli);

    $createTableSql = "CREATE TABLE IF NOT EXISTS `training_entry` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `user_id` INT NOT NULL,
        `training_date` DATE NOT NULL,
        `training_text` TEXT NOT NULL,
        `duration_text` VARCHAR(50) NOT NULL,
        `limitation_text` TEXT NULL,
        `load_level` TINYINT NOT NULL,
        `pain_level` TINYINT NOT NULL,
        `source_plan_day` VARCHAR(20) NULL,
        `source_plan_entry_id` INT NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        KEY `idx_training_user_date` (`user_id`, `training_date`),
        KEY `idx_training_source_plan_entry` (`source_plan_entry_id`),
        CONSTRAINT `fk_training_entry_plan` FOREIGN KEY (`source_plan_entry_id`) REFERENCES `training_plan_entry` (`id`) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";

    if (!$mysqli->query($createTableSql)) {
        throw new RuntimeException('Konnte training_entry nicht vorbereiten: ' . $mysqli->error);
    }

    if (!doesColumnExist($mysqli, 'training_entry', 'source_plan_entry_id')) {
        if (!$mysqli->query('ALTER TABLE `training_entry` ADD COLUMN `source_plan_entry_id` INT NULL AFTER `source_plan_day`')) {
            throw new RuntimeException('Konnte source_plan_entry_id nicht anlegen: ' . $mysqli->error);
        }
    }

    if (!doesColumnExist($mysqli, 'training_entry', 'duration_minutes')) {
        if (!$mysqli->query('ALTER TABLE `training_entry` ADD COLUMN `duration_minutes` SMALLINT UNSIGNED NULL AFTER `duration_text`')) {
            throw new RuntimeException('Konnte duration_minutes nicht anlegen: ' . $mysqli->error);
        }
    }

    if (!doesIndexExist($mysqli, 'training_entry', 'idx_training_source_plan_entry')) {
        if (!$mysqli->query('ALTER TABLE `training_entry` ADD KEY `idx_training_source_plan_entry` (`source_plan_entry_id`)')) {
            throw new RuntimeException('Konnte Index fuer source_plan_entry_id nicht anlegen: ' . $mysqli->error);
        }
    }

    if (!doesConstraintExist($mysqli, 'training_entry', 'fk_training_entry_plan')) {
        if (!$mysqli->query('ALTER TABLE `training_entry` ADD CONSTRAINT `fk_training_entry_plan` FOREIGN KEY (`source_plan_entry_id`) REFERENCES `training_plan_entry` (`id`) ON DELETE SET NULL')) {
            throw new RuntimeException('Konnte Fremdschluessel fuer training_entry nicht anlegen: ' . $mysqli->error);
        }
    }
}

function ensureAnalysisSchema(mysqli $mysqli): void {
    ensureTrainingEntryTable($mysqli);
    foreach (['birthdate' => 'DATE NULL', 'gender' => 'VARCHAR(20) NULL', 'onboarding_completed_at' => 'DATETIME NULL'] as $column => $definition) {
        if (!doesColumnExist($mysqli, 'user', $column) && !$mysqli->query("ALTER TABLE `user` ADD COLUMN `$column` $definition")) {
            throw new RuntimeException('Konnte Profilfeld nicht anlegen: ' . $mysqli->error);
        }
    }
    $sql = "CREATE TABLE IF NOT EXISTS `training_exception` (
        `id` INT NOT NULL AUTO_INCREMENT, `user_id` INT NOT NULL,
        `date_from` DATE NOT NULL, `date_to` DATE NOT NULL,
        `reason_code` VARCHAR(30) NOT NULL, `note_text` VARCHAR(255) NULL,
        `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`), KEY `idx_exception_user_dates` (`user_id`, `date_from`, `date_to`),
        CONSTRAINT `fk_training_exception_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci";
    if (!$mysqli->query($sql)) throw new RuntimeException('Konnte training_exception nicht vorbereiten: ' . $mysqli->error);
}

$dbConfig = databaseConfig();
$dbHost = $dbConfig['host'];
$dbUser = $dbConfig['user'];
$dbPass = $dbConfig['pass'];
$dbName = $dbConfig['name'];

$isReadOnlyShare = false;
$shareToken = normalizeDeeplinkToken((string)($_GET['share'] ?? ''));
$userId = null;
$viewerNick = isset($_SESSION['nick']) ? (string)$_SESSION['nick'] : '';

if ($shareToken !== '') {
    try {
        $shareMysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
        $shareMysqli->set_charset('utf8mb4');
        $owner = findActiveDeeplinkOwner($shareMysqli, $shareToken);
        if ($owner) {
            $userId = (int)$owner['userId'];
            $viewerNick = (string)$owner['nick'];
            $isReadOnlyShare = true;
        } else {
            http_response_code(404);
            outputJson(['ok' => false, 'error' => 'Deeplink nicht gueltig oder abgelaufen']);
            exit;
        }
    } catch (Throwable $e) {
        http_response_code(500);
        outputJson(['ok' => false, 'error' => 'Deeplink konnte nicht geprueft werden']);
        exit;
    }
} else {
    $userId = requireAuthenticatedUserId();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($isReadOnlyShare) {
        http_response_code(403);
        outputJson(['ok' => false, 'error' => 'Nur-Lese-Modus: Schreiben ist nicht erlaubt']);
        exit;
    }

    $csrfToken = (string)($_SERVER['HTTP_X_CSRF_TOKEN'] ?? '');
    if (!validCsrfToken($csrfToken)) {
        http_response_code(403);
        outputJson(['ok' => false, 'error' => 'Sicherheitspruefung fehlgeschlagen']);
        exit;
    }

    $rawBody = file_get_contents('php://input');
    $input = json_decode($rawBody, true);
    $action = is_array($input) ? ($input['action'] ?? '') : '';

    if (!is_array($input) || !in_array($action, ['save_training', 'save_training_plan', 'save_measurement', 'save_profile', 'save_goal_reward', 'create_goal', 'update_goal', 'delete_goal', 'create_deeplink', 'disable_deeplink', 'save_share_picture', 'save_training_exception', 'delete_training_exception'], true)) {
        http_response_code(400);
        outputJson(['ok' => false, 'error' => 'Ungueltige Anfrage']);
        exit;
    }

    if ($action === 'save_training_exception' || $action === 'delete_training_exception') {
        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');
            ensureAnalysisSchema($mysqli);

            if ($action === 'delete_training_exception') {
                $exceptionId = (int)($input['exceptionId'] ?? 0);
                if ($exceptionId <= 0) throw new InvalidArgumentException('Ungueltige Ausnahme');
                $stmt = $mysqli->prepare('DELETE FROM training_exception WHERE id = ? AND user_id = ?');
                $stmt->bind_param('ii', $exceptionId, $userId);
                $stmt->execute();
                outputJson(['ok' => true]);
                exit;
            }

            $dateFrom = trim((string)($input['dateFrom'] ?? ''));
            $dateTo = trim((string)($input['dateTo'] ?? ''));
            $reason = trim((string)($input['reason'] ?? ''));
            $note = trim((string)($input['note'] ?? ''));
            if (!isValidDate($dateFrom) || !isValidDate($dateTo) || $dateTo < $dateFrom
                || !in_array($reason, ['illness', 'pain_pause', 'vacation', 'other'], true) || strlen($note) > 255) {
                throw new InvalidArgumentException('Ausnahmezeitraum ist ungueltig');
            }
            $stmt = $mysqli->prepare("INSERT INTO training_exception (user_id, date_from, date_to, reason_code, note_text) VALUES (?, ?, ?, ?, NULLIF(?, ''))");
            $stmt->bind_param('issss', $userId, $dateFrom, $dateTo, $reason, $note);
            $stmt->execute();
            outputJson(['ok' => true, 'id' => $stmt->insert_id]);
            exit;
        } catch (InvalidArgumentException $e) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => $e->getMessage()]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson(['ok' => false, 'error' => 'Trainingsausnahme konnte nicht verarbeitet werden']);
            exit;
        }
    }

    if ($action === 'save_share_picture') {
        $filename = trim((string)($input['filename'] ?? ''));
        $imageData = (string)($input['imageData'] ?? '');

        if (!preg_match('/^\d{4}-\d{2}-\d{2}_[a-z0-9_-]+\.png$/', $filename)) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Ungueltiger Dateiname']);
            exit;
        }

        $prefix = 'data:image/png;base64,';
        if (strpos($imageData, $prefix) !== 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Ungueltiges Bildformat']);
            exit;
        }

        $encoded = substr($imageData, strlen($prefix));
        if (strlen($encoded) > 8_000_000) {
            http_response_code(413);
            outputJson(['ok' => false, 'error' => 'Bild ist zu gross']);
            exit;
        }
        $binary = base64_decode($encoded, true);
        $imageInfo = $binary === false ? false : @getimagesizefromstring($binary);
        if ($binary === false || strlen($binary) > 6_000_000 || $imageInfo === false || ($imageInfo['mime'] ?? '') !== 'image/png') {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bild konnte nicht decodiert werden']);
            exit;
        }

        $targetDir = buildUserSharePictureDir($userId);
        if (!is_dir($targetDir) && !@mkdir($targetDir, 0775, true)) {
            http_response_code(500);
            outputJson(['ok' => false, 'error' => 'Zielordner konnte nicht erstellt werden']);
            exit;
        }

        if (!is_writable($targetDir)) {
            http_response_code(500);
            outputJson(['ok' => false, 'error' => 'Zielordner ist nicht beschreibbar']);
            exit;
        }

        $filename = date('Y-m-d') . '_' . bin2hex(random_bytes(12)) . '.png';
        $targetPath = $targetDir . DIRECTORY_SEPARATOR . $filename;
        if (@file_put_contents($targetPath, $binary, LOCK_EX) === false) {
            http_response_code(500);
            outputJson(['ok' => false, 'error' => 'Bild konnte nicht gespeichert werden']);
            exit;
        }

        $publicPath = 'share_pictures/user_' . $userId . '/' . $filename;

        outputJson([
            'ok' => true,
            'file' => $publicPath,
            'message' => 'Bild gespeichert'
        ]);
        exit;
    }

    if ($action === 'create_goal') {
        $typeId = (int)($input['typeId'] ?? 0);
        $targetValueRaw = trim((string)($input['targetValue'] ?? ''));
        $goalText = trim((string)($input['goalText'] ?? ''));
        $targetValue = (float)str_replace(',', '.', $targetValueRaw);

        if ($typeId <= 0 || $goalText === '' || $targetValueRaw === '' || !is_finite($targetValue) || $targetValue <= 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bitte Messwerttyp, Zielwert und Zieltext korrekt angeben']);
            exit;
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $typeStmt = $mysqli->prepare('SELECT id FROM `messuretype` WHERE id = ? LIMIT 1');
            if (!$typeStmt) {
                throw new RuntimeException('Messwerttyp-Pruefung fehlgeschlagen: ' . $mysqli->error);
            }

            $typeStmt->bind_param('i', $typeId);
            $typeStmt->execute();
            $typeResult = $typeStmt->get_result();
            if (!$typeResult || $typeResult->num_rows === 0) {
                http_response_code(422);
                outputJson(['ok' => false, 'error' => 'Messwerttyp wurde nicht gefunden']);
                exit;
            }

            $latestStmt = $mysqli->prepare(
                "SELECT mv.value
                 FROM `messurevalue` mv
                 JOIN `messure` m ON m.id = mv.`messure-id`
                 WHERE m.`user-id` = ?
                   AND m.`official` = b'1'
                   AND mv.`type-id` = ?
                 ORDER BY m.`datetime` DESC
                 LIMIT 1"
            );
            if (!$latestStmt) {
                throw new RuntimeException('Aktuellen Messwert laden fehlgeschlagen: ' . $mysqli->error);
            }

            $latestStmt->bind_param('ii', $userId, $typeId);
            $latestStmt->execute();
            $latestResult = $latestStmt->get_result();
            $latestRow = $latestResult ? $latestResult->fetch_assoc() : null;
            $latestValue = $latestRow ? (float)$latestRow['value'] : null;
            $achievedAt = ($latestValue !== null && $targetValue >= $latestValue) ? date('Y-m-d H:i:s') : null;

            $insertStmt = $mysqli->prepare(
                'INSERT INTO `goals` (`user-id`, `messuretype_id`, `messure-value`, `goalname`, `createdat`, `achieved`, `rewardedat`, `rewardedwith`)
                 VALUES (?, ?, ?, ?, NOW(), ?, NULL, NULL)'
            );
            if (!$insertStmt) {
                throw new RuntimeException('Ziel-Insert fehlgeschlagen: ' . $mysqli->error);
            }

            $insertStmt->bind_param('iidss', $userId, $typeId, $targetValue, $goalText, $achievedAt);
            if (!$insertStmt->execute()) {
                throw new RuntimeException('Ziel speichern fehlgeschlagen: ' . $insertStmt->error);
            }

            outputJson([
                'ok' => true,
                'message' => 'Ziel erstellt'
            ]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Ziel konnte nicht erstellt werden'
            ]);
            exit;
        }
    }

    if ($action === 'update_goal') {
        $goalId = (int)($input['goalId'] ?? 0);
        $typeId = (int)($input['typeId'] ?? 0);
        $targetValueRaw = trim((string)($input['targetValue'] ?? ''));
        $goalText = trim((string)($input['goalText'] ?? ''));
        $targetValue = (float)str_replace(',', '.', $targetValueRaw);

        if ($goalId <= 0 || $typeId <= 0 || $goalText === '' || $targetValueRaw === '' || !is_finite($targetValue) || $targetValue <= 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bitte Ziel, Messwerttyp, Zielwert und Zieltext korrekt angeben']);
            exit;
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $goalStmt = $mysqli->prepare('SELECT id, achieved, rewardedat, rewardedwith FROM `goals` WHERE id = ? AND `user-id` = ? LIMIT 1');
            if (!$goalStmt) {
                throw new RuntimeException('Ziel-Pruefung fehlgeschlagen: ' . $mysqli->error);
            }

            $goalStmt->bind_param('ii', $goalId, $userId);
            $goalStmt->execute();
            $goalResult = $goalStmt->get_result();
            if (!$goalResult || $goalResult->num_rows === 0) {
                http_response_code(404);
                outputJson(['ok' => false, 'error' => 'Ziel nicht gefunden']);
                exit;
            }
            $existingGoal = $goalResult->fetch_assoc();

            $typeStmt = $mysqli->prepare('SELECT id FROM `messuretype` WHERE id = ? LIMIT 1');
            if (!$typeStmt) {
                throw new RuntimeException('Messwerttyp-Pruefung fehlgeschlagen: ' . $mysqli->error);
            }

            $typeStmt->bind_param('i', $typeId);
            $typeStmt->execute();
            $typeResult = $typeStmt->get_result();
            if (!$typeResult || $typeResult->num_rows === 0) {
                http_response_code(422);
                outputJson(['ok' => false, 'error' => 'Messwerttyp wurde nicht gefunden']);
                exit;
            }

            $latestStmt = $mysqli->prepare(
                "SELECT mv.value
                 FROM `messurevalue` mv
                 JOIN `messure` m ON m.id = mv.`messure-id`
                 WHERE m.`user-id` = ?
                   AND m.`official` = b'1'
                   AND mv.`type-id` = ?
                 ORDER BY m.`datetime` DESC
                 LIMIT 1"
            );
            if (!$latestStmt) {
                throw new RuntimeException('Aktuellen Messwert laden fehlgeschlagen: ' . $mysqli->error);
            }

            $latestStmt->bind_param('ii', $userId, $typeId);
            $latestStmt->execute();
            $latestResult = $latestStmt->get_result();
            $latestRow = $latestResult ? $latestResult->fetch_assoc() : null;
            $latestValue = $latestRow ? (float)$latestRow['value'] : null;

            $isAchievedNow = $latestValue !== null && $targetValue >= $latestValue;
            $achievedAt = $isAchievedNow
                ? (($existingGoal['achieved'] ?? null) !== null ? (string)$existingGoal['achieved'] : date('Y-m-d H:i:s'))
                : null;
            $rewardedAt = $isAchievedNow ? ($existingGoal['rewardedat'] ?? null) : null;
            $rewardedWith = $isAchievedNow ? ($existingGoal['rewardedwith'] ?? null) : null;

            $updateStmt = $mysqli->prepare(
                'UPDATE `goals`
                 SET `messuretype_id` = ?,
                     `messure-value` = ?,
                     `goalname` = ?,
                     `achieved` = ?,
                     `rewardedat` = ?,
                     `rewardedwith` = ?
                 WHERE id = ? AND `user-id` = ?'
            );
            if (!$updateStmt) {
                throw new RuntimeException('Ziel-Update vorbereiten fehlgeschlagen: ' . $mysqli->error);
            }

            $updateStmt->bind_param('idssssii', $typeId, $targetValue, $goalText, $achievedAt, $rewardedAt, $rewardedWith, $goalId, $userId);
            if (!$updateStmt->execute()) {
                throw new RuntimeException('Ziel aktualisieren fehlgeschlagen: ' . $updateStmt->error);
            }

            outputJson([
                'ok' => true,
                'message' => 'Ziel aktualisiert'
            ]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Ziel konnte nicht aktualisiert werden'
            ]);
            exit;
        }
    }

    if ($action === 'delete_goal') {
        $goalId = (int)($input['goalId'] ?? 0);
        if ($goalId <= 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bitte gueltiges Ziel waehlen']);
            exit;
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $deleteStmt = $mysqli->prepare('DELETE FROM `goals` WHERE id = ? AND `user-id` = ? LIMIT 1');
            if (!$deleteStmt) {
                throw new RuntimeException('Ziel-Loeschen fehlgeschlagen: ' . $mysqli->error);
            }

            $deleteStmt->bind_param('ii', $goalId, $userId);
            if (!$deleteStmt->execute()) {
                throw new RuntimeException('Ziel konnte nicht geloescht werden: ' . $deleteStmt->error);
            }

            if ($deleteStmt->affected_rows < 1) {
                http_response_code(404);
                outputJson(['ok' => false, 'error' => 'Ziel nicht gefunden']);
                exit;
            }

            outputJson([
                'ok' => true,
                'message' => 'Ziel geloescht'
            ]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Ziel konnte nicht geloescht werden'
            ]);
            exit;
        }
    }

    if ($action === 'save_training_plan') {
        $entries = $input['entries'] ?? [];
        $validFromInput = trim((string)($input['validFrom'] ?? ''));

        if (!is_array($entries) || count($entries) === 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bitte mindestens einen Trainingsplan-Eintrag uebermitteln']);
            exit;
        }

        $validFromTimestamp = $validFromInput !== '' ? strtotime($validFromInput) : false;
        $validFrom = $validFromTimestamp !== false ? date('Y-m-d H:i:s', $validFromTimestamp) : date('Y-m-d H:i:s');

        $normalizedEntries = [];
        foreach ($entries as $entry) {
            $weekdayName = trim((string)($entry['day'] ?? ''));
            $focusText = trim((string)($entry['focus'] ?? ''));
            $durationText = trim((string)($entry['duration'] ?? ''));
            $noteText = trim((string)($entry['note'] ?? ''));

            if (!isAllowedWeekday($weekdayName) || $focusText === '' || $durationText === '' || $noteText === ''
                || strlen($focusText) > 320 || strlen($durationText) > 100 || strlen($noteText) > 10000) {
                continue;
            }

            $normalizedEntries[] = [
                'day' => $weekdayName,
                'focus' => $focusText,
                'duration' => $durationText,
                'note' => $noteText
            ];
        }

        if (count($normalizedEntries) === 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Alle Trainingsplan-Eintraege brauchen Tag, Fokus, Dauer und Beschreibung']);
            exit;
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');
            ensureTrainingPlanEntryTable($mysqli);

            $mysqli->begin_transaction();

            $deactivateStmt = $mysqli->prepare(
                'UPDATE `training_plan_entry`
                 SET `deactivated_at` = ?
                 WHERE `user_id` = ?
                   AND `deactivated_at` IS NULL'
            );
            if (!$deactivateStmt) {
                throw new RuntimeException('Deaktivierung des alten Plans fehlgeschlagen: ' . $mysqli->error);
            }

            $deactivateStmt->bind_param('si', $validFrom, $userId);
            if (!$deactivateStmt->execute()) {
                throw new RuntimeException('Alten Plan deaktivieren fehlgeschlagen: ' . $deactivateStmt->error);
            }

            $insertPlanStmt = $mysqli->prepare(
                'INSERT INTO `training_plan_entry`
                 (`user_id`, `weekday_name`, `focus_text`, `duration_text`, `note_text`, `valid_from`, `deactivated_at`)
                 VALUES (?, ?, ?, ?, ?, ?, NULL)'
            );
            if (!$insertPlanStmt) {
                throw new RuntimeException('Plan-Insert vorbereiten fehlgeschlagen: ' . $mysqli->error);
            }

            foreach ($normalizedEntries as $entry) {
                $insertPlanStmt->bind_param(
                    'isssss',
                    $userId,
                    $entry['day'],
                    $entry['focus'],
                    $entry['duration'],
                    $entry['note'],
                    $validFrom
                );

                if (!$insertPlanStmt->execute()) {
                    throw new RuntimeException('Plan-Insert fehlgeschlagen: ' . $insertPlanStmt->error);
                }
            }

            $mysqli->commit();

            outputJson([
                'ok' => true,
                'message' => 'Trainingsplan gespeichert'
            ]);
            exit;
        } catch (InvalidArgumentException $e) {
            if (isset($mysqli) && $mysqli instanceof mysqli) $mysqli->rollback();
            http_response_code(422);
            outputJson(['ok' => false, 'error' => $e->getMessage()]);
            exit;
        } catch (Throwable $e) {
            if (isset($mysqli) && $mysqli instanceof mysqli) {
                $mysqli->rollback();
            }
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Trainingsplan konnte nicht gespeichert werden'
            ]);
            exit;
        }
    }

    if ($action === 'create_deeplink') {
        $expiresAtInput = trim((string)($input['expiresAt'] ?? ''));
        $expiresAt = null;

        if ($expiresAtInput !== '') {
            $timestamp = strtotime($expiresAtInput);
            if ($timestamp === false || $timestamp <= time()) {
                http_response_code(422);
                outputJson(['ok' => false, 'error' => 'Ablaufzeit muss in der Zukunft liegen']);
                exit;
            }

            $expiresAt = date('Y-m-d H:i:s', $timestamp);
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $token = rtrim(strtr(base64_encode(random_bytes(24)), '+/', '-_'), '=');
            $insertStmt = $mysqli->prepare(
                "INSERT INTO `deeplink_access` (`user_id`, `token`, `created_at`, `expires_at`, `disabled_at`)
                 VALUES (?, ?, NOW(), ?, NULL)"
            );

            if (!$insertStmt) {
                throw new RuntimeException('Deeplink-Insert nicht vorbereitet: ' . $mysqli->error);
            }

            $insertStmt->bind_param('iss', $userId, $token, $expiresAt);
            if (!$insertStmt->execute()) {
                throw new RuntimeException('Deeplink speichern fehlgeschlagen: ' . $insertStmt->error);
            }

            outputJson([
                'ok' => true,
                'message' => 'Deeplink erstellt'
            ]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Deeplink konnte nicht erstellt werden'
            ]);
            exit;
        }
    }

    if ($action === 'disable_deeplink') {
        $deeplinkId = (int)($input['deeplinkId'] ?? 0);
        if ($deeplinkId <= 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bitte gueltigen Deeplink auswaehlen']);
            exit;
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $updateStmt = $mysqli->prepare(
                "UPDATE `deeplink_access`
                 SET `disabled_at` = NOW()
                 WHERE `id` = ? AND `user_id` = ? AND `disabled_at` IS NULL"
            );
            if (!$updateStmt) {
                throw new RuntimeException('Deeplink-Deaktivierung nicht vorbereitet: ' . $mysqli->error);
            }

            $updateStmt->bind_param('ii', $deeplinkId, $userId);
            if (!$updateStmt->execute()) {
                throw new RuntimeException('Deeplink deaktivieren fehlgeschlagen: ' . $updateStmt->error);
            }

            if ($updateStmt->affected_rows < 1) {
                http_response_code(404);
                outputJson(['ok' => false, 'error' => 'Deeplink nicht gefunden oder bereits deaktiviert']);
                exit;
            }

            outputJson([
                'ok' => true,
                'message' => 'Deeplink deaktiviert'
            ]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Deeplink konnte nicht deaktiviert werden'
            ]);
            exit;
        }
    }

    if ($action === 'save_goal_reward') {
        $goalId = (int)($input['goalId'] ?? 0);
        $rewardText = trim((string)($input['rewardText'] ?? ''));

        if ($goalId <= 0 || $rewardText === '') {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bitte Ziel und Belohnungstext angeben']);
            exit;
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $checkStmt = $mysqli->prepare('SELECT id, achieved FROM `goals` WHERE id = ? AND `user-id` = ? LIMIT 1');
            if (!$checkStmt) {
                throw new RuntimeException('Ziel-Pruefung fehlgeschlagen: ' . $mysqli->error);
            }

            $checkStmt->bind_param('ii', $goalId, $userId);
            $checkStmt->execute();
            $goalResult = $checkStmt->get_result();
            if (!$goalResult || $goalResult->num_rows === 0) {
                http_response_code(404);
                outputJson(['ok' => false, 'error' => 'Ziel nicht gefunden']);
                exit;
            }

            $goalRow = $goalResult->fetch_assoc();
            if (!isset($goalRow['achieved']) || $goalRow['achieved'] === null) {
                http_response_code(422);
                outputJson(['ok' => false, 'error' => 'Belohnung erst nach erreichtem Ziel moeglich']);
                exit;
            }

            $rewardStmt = $mysqli->prepare('UPDATE `goals` SET `rewardedat` = NOW(), `rewardedwith` = ? WHERE id = ? AND `user-id` = ?');
            if (!$rewardStmt) {
                throw new RuntimeException('Belohnung-Update fehlgeschlagen: ' . $mysqli->error);
            }

            $rewardStmt->bind_param('sii', $rewardText, $goalId, $userId);
            if (!$rewardStmt->execute()) {
                throw new RuntimeException('Belohnung speichern fehlgeschlagen: ' . $rewardStmt->error);
            }

            outputJson([
                'ok' => true,
                'message' => 'Belohnung gespeichert'
            ]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Belohnung konnte nicht gespeichert werden'
            ]);
            exit;
        }
    }

    if ($action === 'save_profile') {
        $goalWeightInput = trim((string)($input['goalWeight'] ?? ''));
        $heightInput = trim((string)($input['heightM'] ?? ''));
        if ($heightInput === '' && isset($input['heightCm'])) {
            $heightInput = trim((string)$input['heightCm']);
        }

        $goalWeight = $goalWeightInput === '' ? null : (float)str_replace(',', '.', $goalWeightInput);
        $heightM = $heightInput === '' ? null : (float)str_replace(',', '.', $heightInput);

        // Legacy support: if cm values are sent, convert to meters.
        if ($heightM !== null && $heightM > 3) {
            $heightM = $heightM / 100;
        }

        if ($goalWeight !== null && $goalWeight <= 0) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Zielgewicht muss groesser als 0 sein']);
            exit;
        }

        if ($heightM !== null && ($heightM < 1 || $heightM > 2.6)) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Koerpergroesse muss zwischen 1,00 m und 2,60 m liegen']);
            exit;
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $updateStmt = $mysqli->prepare('UPDATE `user` SET `goalweight` = ?, `height` = ? WHERE `id` = ?');
            if (!$updateStmt) {
                throw new RuntimeException('Update vorbereiten fehlgeschlagen: ' . $mysqli->error);
            }

            $updateStmt->bind_param('ddi', $goalWeight, $heightM, $userId);
            if (!$updateStmt->execute()) {
                throw new RuntimeException('Update fehlgeschlagen: ' . $updateStmt->error);
            }

            outputJson([
                'ok' => true,
                'message' => 'Profilwerte gespeichert',
                'goalWeight' => $goalWeight,
                'heightM' => $heightM
            ]);
            exit;
        } catch (Throwable $e) {
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Profil konnte nicht gespeichert werden'
            ]);
            exit;
        }
    }

    if ($action === 'save_measurement') {
        $measurementDate = trim((string)($input['date'] ?? ''));
        $measurementTime = trim((string)($input['time'] ?? ''));
        $entries = $input['entries'] ?? [];

        if (!isValidDate($measurementDate) || !is_array($entries) || count($entries) === 0 || count($entries) > 50) {
            http_response_code(422);
            outputJson(['ok' => false, 'error' => 'Bitte Datum und mindestens einen Messwert ausfuellen']);
            exit;
        }

        if (!isValidTime($measurementTime)) {
            $measurementTime = date('H:i');
        }

        try {
            $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
            $mysqli->set_charset('utf8mb4');

            $measureDatetime = $measurementDate . ' ' . $measurementTime . ':00';
            $notes = 'Erfasst ueber Dashboard-Formular';

            $mysqli->begin_transaction();

            $insertMeasureStmt = $mysqli->prepare(
                "INSERT INTO `messure` (`user-id`, `datetime`, `notes`, `official`) VALUES (?, ?, ?, b'1')"
            );

            if (!$insertMeasureStmt) {
                throw new RuntimeException('Messung anlegen fehlgeschlagen: ' . $mysqli->error);
            }

            $insertMeasureStmt->bind_param('iss', $userId, $measureDatetime, $notes);
            if (!$insertMeasureStmt->execute()) {
                throw new RuntimeException('Messung speichern fehlgeschlagen: ' . $insertMeasureStmt->error);
            }

            $measureId = (int)$insertMeasureStmt->insert_id;

            $checkTypeStmt = $mysqli->prepare("SELECT id FROM `messuretype` WHERE id = ? LIMIT 1");
            $insertValueStmt = $mysqli->prepare(
                "INSERT INTO `messurevalue` (`messure-id`, `type-id`, `value`) VALUES (?, ?, ?)"
            );

            if (!$checkTypeStmt || !$insertValueStmt) {
                throw new RuntimeException('Messwert-Statements konnten nicht vorbereitet werden');
            }

            $savedEntries = [];

            $seenTypeIds = [];
            foreach ($entries as $entry) {
                $typeId = (int)($entry['typeId'] ?? 0);
                $value = parsePositiveFloat($entry['value'] ?? null);

                if ($typeId <= 0 || $value === null || isset($seenTypeIds[$typeId])) {
                    throw new InvalidArgumentException('Ungueltiger oder doppelter Messwert');
                }
                $seenTypeIds[$typeId] = true;

                $checkTypeStmt->bind_param('i', $typeId);
                $checkTypeStmt->execute();
                $typeResult = $checkTypeStmt->get_result();
                if (!$typeResult || $typeResult->num_rows === 0) {
                    throw new InvalidArgumentException('Unbekannter Messwerttyp');
                }

                $insertValueStmt->bind_param('iid', $measureId, $typeId, $value);
                if (!$insertValueStmt->execute()) {
                    throw new RuntimeException('Messwert speichern fehlgeschlagen: ' . $insertValueStmt->error);
                }

                $savedEntries[$typeId] = $value;
            }

            if (!empty($savedEntries)) {
                $goalAchieveStmt = $mysqli->prepare(
                    'UPDATE `goals`
                     SET `achieved` = ?
                     WHERE `user-id` = ?
                       AND `messuretype_id` = ?
                       AND `achieved` IS NULL
                       AND `messure-value` >= ?'
                );

                if (!$goalAchieveStmt) {
                    throw new RuntimeException('Ziel-Update konnte nicht vorbereitet werden: ' . $mysqli->error);
                }

                foreach ($savedEntries as $savedTypeId => $savedValue) {
                    $goalAchieveStmt->bind_param('siid', $measureDatetime, $userId, $savedTypeId, $savedValue);
                    if (!$goalAchieveStmt->execute()) {
                        throw new RuntimeException('Ziel-Update fehlgeschlagen: ' . $goalAchieveStmt->error);
                    }
                }
            }

            $mysqli->commit();

            outputJson([
                'ok' => true,
                'measureId' => $measureId,
                'message' => 'Messung gespeichert'
            ]);
            exit;
        } catch (InvalidArgumentException $e) {
            if (isset($mysqli) && $mysqli instanceof mysqli) $mysqli->rollback();
            http_response_code(422);
            outputJson(['ok' => false, 'error' => $e->getMessage()]);
            exit;
        } catch (Throwable $e) {
            if (isset($mysqli) && $mysqli instanceof mysqli) {
                $mysqli->rollback();
            }
            http_response_code(500);
            outputJson([
                'ok' => false,
                'error' => 'Speichern in DB fehlgeschlagen'
            ]);
            exit;
        }
    }

    $trainingDate = trim((string)($input['date'] ?? ''));
    $trainingText = trim((string)($input['trainingText'] ?? ''));
    $duration = trim((string)($input['duration'] ?? ''));
    $durationMinutes = (int)($input['durationMinutes'] ?? 0);
    if ($durationMinutes <= 0 && preg_match('/^(\d{1,2}):(\d{2})$/', $duration, $durationParts)) {
        $durationMinutes = ((int)$durationParts[1] * 60) + (int)$durationParts[2];
    }
    if ($durationMinutes <= 0 && preg_match('/(\d+)/', $duration, $durationNumber)) {
        $durationMinutes = (int)$durationNumber[1];
    }
    if ($durationMinutes > 0 && $durationMinutes < 1440) {
        $duration = sprintf('%02d:%02d', intdiv($durationMinutes, 60), $durationMinutes % 60);
    }
    $limitation = trim((string)($input['limitation'] ?? ''));
    $loadLevel = (int)($input['loadLevel'] ?? 3);
    $painLevel = (int)($input['painLevel'] ?? 1);
    $sourceDay = trim((string)($input['sourceDay'] ?? ''));
    $sourcePlanEntryId = (int)($input['sourcePlanEntryId'] ?? 0);

    if (!isValidDate($trainingDate) || $trainingText === '' || $duration === ''
        || strlen($trainingText) > 10000 || strlen($duration) > 100 || strlen($limitation) > 10000
        || $loadLevel < 1 || $loadLevel > 5 || $painLevel < 1 || $painLevel > 5
        || $durationMinutes < 1 || $durationMinutes >= 1440
        || ($sourceDay !== '' && !isAllowedWeekday($sourceDay))) {
        http_response_code(422);
        outputJson(['ok' => false, 'error' => 'Bitte Datum, Trainingstext und Dauer ausfuellen']);
        exit;
    }

    try {
        $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
        $mysqli->set_charset('utf8mb4');
        ensureTrainingEntryTable($mysqli);

        if ($sourcePlanEntryId > 0) {
            $ownerStmt = $mysqli->prepare('SELECT id, weekday_name FROM `training_plan_entry` WHERE id = ? AND user_id = ? LIMIT 1');
            $ownerStmt->bind_param('ii', $sourcePlanEntryId, $userId);
            $ownerStmt->execute();
            $ownerResult = $ownerStmt->get_result();
            $ownedPlan = $ownerResult ? $ownerResult->fetch_assoc() : null;
            if (!$ownedPlan) {
                http_response_code(422);
                outputJson(['ok' => false, 'error' => 'Trainingsplan-Eintrag ist ungueltig']);
                exit;
            }
            $sourceDay = (string)$ownedPlan['weekday_name'];
        }

        if ($sourcePlanEntryId <= 0 && $sourceDay !== '') {
            $planLookupStmt = $mysqli->prepare(
                "SELECT id
                 FROM `training_plan_entry`
                 WHERE user_id = ?
                   AND weekday_name = ?
                   AND valid_from <= CONCAT(?, ' 23:59:59')
                   AND (deactivated_at IS NULL OR deactivated_at > CONCAT(?, ' 23:59:59'))
                 ORDER BY valid_from DESC, id DESC
                 LIMIT 1"
            );
            if ($planLookupStmt) {
                $planLookupStmt->bind_param('isss', $userId, $sourceDay, $trainingDate, $trainingDate);
                $planLookupStmt->execute();
                $planLookupResult = $planLookupStmt->get_result();
                if ($planLookupResult && $planLookupResult->num_rows > 0) {
                    $planLookupRow = $planLookupResult->fetch_assoc();
                    $sourcePlanEntryId = (int)($planLookupRow['id'] ?? 0);
                }
            }
        }

        $insertStmt = $mysqli->prepare(
            "INSERT INTO `training_entry`
            (`user_id`, `training_date`, `training_text`, `duration_text`, `duration_minutes`, `limitation_text`, `load_level`, `pain_level`, `source_plan_day`, `source_plan_entry_id`)
            VALUES (?, ?, ?, ?, NULLIF(?, 0), ?, ?, ?, ?, NULLIF(?, 0))"
        );

        if (!$insertStmt) {
            throw new RuntimeException('Insert vorbereiten fehlgeschlagen: ' . $mysqli->error);
        }

        $insertStmt->bind_param(
            'isssisiisi',
            $userId,
            $trainingDate,
            $trainingText,
            $duration,
            $durationMinutes,
            $limitation,
            $loadLevel,
            $painLevel,
            $sourceDay,
            $sourcePlanEntryId
        );

        if (!$insertStmt->execute()) {
            throw new RuntimeException('Insert fehlgeschlagen: ' . $insertStmt->error);
        }

        outputJson([
            'ok' => true,
            'id' => $insertStmt->insert_id,
            'message' => 'Training gespeichert'
        ]);
        exit;
    } catch (Throwable $e) {
        http_response_code(500);
        outputJson([
            'ok' => false,
            'error' => 'Speichern in DB fehlgeschlagen'
        ]);
        exit;
    }
}

try {
    $mysqli = new mysqli($dbHost, $dbUser, $dbPass, $dbName);
    $mysqli->set_charset('utf8mb4');
    ensureAnalysisSchema($mysqli);

    $goalStmt = $mysqli->prepare("SELECT goalweight, height, birthdate, gender FROM `user` WHERE id = ? LIMIT 1");
    $goalStmt->bind_param('i', $userId);
    $goalStmt->execute();
    $goalResult = $goalStmt->get_result();
    $goalRow = $goalResult ? $goalResult->fetch_assoc() : null;

        $weightStmt = $mysqli->prepare(
                "SELECT mv.value, DATE_FORMAT(m.`datetime`, '%Y-%m-%dT%H:%i:%s') AS measure_date
         FROM `messurevalue` mv
         JOIN `messure` m ON m.id = mv.`messure-id`
         JOIN `messuretype` mt ON mt.id = mv.`type-id`
         WHERE m.`user-id` = ?
           AND m.`official` = b'1'
           AND LOWER(TRIM(mt.messurement)) IN ('gewicht', 'weight', 'bodyweight', 'body_weight', 'kg')
         ORDER BY m.`datetime` ASC"
    );
    $weightStmt->bind_param('i', $userId);
    $weightStmt->execute();
    $weightResult = $weightStmt->get_result();

        $measurementStmt = $mysqli->prepare(
                "SELECT mt.id AS type_id, mt.messurement, mt.unit, mv.value, DATE_FORMAT(m.`datetime`, '%Y-%m-%dT%H:%i:%s') AS measure_date
         FROM `messurevalue` mv
         JOIN `messure` m ON m.id = mv.`messure-id`
         JOIN `messuretype` mt ON mt.id = mv.`type-id`
         WHERE m.`user-id` = ?
           AND m.`official` = b'1'
         ORDER BY m.`datetime` ASC"
    );
    $measurementStmt->bind_param('i', $userId);
    $measurementStmt->execute();
    $measurementResult = $measurementStmt->get_result();

    $typesResult = $mysqli->query(
        "SELECT id, messurement, unit FROM `messuretype` ORDER BY messurement ASC"
    );

    $goalsStmt = $mysqli->prepare(
        "SELECT g.id, g.`messuretype_id` AS type_id, g.`messure-value` AS target_value,
                g.goalname, g.createdat, g.achieved, g.rewardedat, g.rewardedwith,
                mt.messurement AS type_name, mt.unit
         FROM `goals` g
         JOIN `messuretype` mt ON mt.id = g.`messuretype_id`
         WHERE g.`user-id` = ?
         ORDER BY g.`messuretype_id` ASC, g.`messure-value` DESC"
    );
    $goalsStmt->bind_param('i', $userId);
    $goalsStmt->execute();
    $goalsResult = $goalsStmt->get_result();

    $trainingPlanEntries = [];
    $planStmt = $mysqli->prepare(
        "SELECT id,
                weekday_name,
                focus_text,
                duration_text,
                note_text,
                valid_from,
                deactivated_at,
                created_at
         FROM `training_plan_entry`
         WHERE user_id = ?
           AND deactivated_at IS NULL
         ORDER BY FIELD(weekday_name, 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'), valid_from DESC, id DESC"
    );
    if ($planStmt) {
        $planStmt->bind_param('i', $userId);
        $planStmt->execute();
        $planResult = $planStmt->get_result();
        if ($planResult && $planResult->num_rows > 0) {
            while ($planRow = $planResult->fetch_assoc()) {
                $trainingPlanEntries[] = [
                    'id' => (int)$planRow['id'],
                    'day' => (string)$planRow['weekday_name'],
                    'focus' => (string)$planRow['focus_text'],
                    'duration' => (string)$planRow['duration_text'],
                    'note' => (string)$planRow['note_text'],
                    'validFrom' => (string)$planRow['valid_from'],
                    'deactivatedAt' => $planRow['deactivated_at'],
                    'createdAt' => (string)$planRow['created_at'],
                    'isDefault' => false
                ];
            }
        }
    }

    if (empty($trainingPlanEntries)) {
        $trainingPlanEntries = buildDefaultTrainingPlanEntries($defaultData['trainingPlan'], $userId);
    }

    $trainingPlanHistory = [];
    $historyPlanStmt = $mysqli->prepare(
        "SELECT id, weekday_name, focus_text, duration_text, note_text, valid_from, deactivated_at
         FROM training_plan_entry WHERE user_id = ? ORDER BY valid_from ASC, id ASC"
    );
    $historyPlanStmt->bind_param('i', $userId);
    $historyPlanStmt->execute();
    $historyPlanResult = $historyPlanStmt->get_result();
    while ($historyPlanResult && ($row = $historyPlanResult->fetch_assoc())) {
        $trainingPlanHistory[] = [
            'id' => (int)$row['id'], 'day' => (string)$row['weekday_name'],
            'focus' => (string)$row['focus_text'], 'duration' => (string)$row['duration_text'],
            'note' => (string)$row['note_text'], 'validFrom' => (string)$row['valid_from'],
            'deactivatedAt' => $row['deactivated_at']
        ];
    }

    $recentTrainingEntries = [];
    $trainingHistoryStmt = $mysqli->prepare(
        "SELECT te.id,
            DATE_FORMAT(te.training_date, '%Y-%m-%d') AS training_date,
            te.training_text,
            te.duration_text,
            te.duration_minutes,
            te.limitation_text,
            te.load_level,
            te.pain_level,
            te.source_plan_day,
            te.source_plan_entry_id,
            te.created_at,
                plan.weekday_name AS plan_day,
                plan.focus_text AS plan_focus,
                plan.duration_text AS plan_duration,
                plan.note_text AS plan_note,
                plan.valid_from AS plan_valid_from
         FROM `training_entry` te
         LEFT JOIN `training_plan_entry` plan
           ON plan.id = te.`source_plan_entry_id`
          AND plan.user_id = te.user_id
         WHERE te.user_id = ?
         ORDER BY te.training_date DESC, te.created_at DESC, te.id DESC"
    );
    if ($trainingHistoryStmt) {
        $trainingHistoryStmt->bind_param('i', $userId);
        $trainingHistoryStmt->execute();
        $trainingHistoryResult = $trainingHistoryStmt->get_result();
        if ($trainingHistoryResult && $trainingHistoryResult->num_rows > 0) {
            while ($trainingRow = $trainingHistoryResult->fetch_assoc()) {
                $recentTrainingEntries[] = [
                    'id' => (int)$trainingRow['id'],
                    'date' => (string)$trainingRow['training_date'],
                    'trainingText' => (string)$trainingRow['training_text'],
                    'duration' => (string)$trainingRow['duration_text'],
                    'durationMinutes' => isset($trainingRow['duration_minutes']) ? (int)$trainingRow['duration_minutes'] : 0,
                    'limitation' => trim((string)($trainingRow['limitation_text'] ?? '')),
                    'loadLevel' => (int)$trainingRow['load_level'],
                    'painLevel' => (int)$trainingRow['pain_level'],
                    'sourceDay' => trim((string)($trainingRow['source_plan_day'] ?? '')),
                    'sourcePlanEntryId' => isset($trainingRow['source_plan_entry_id']) ? (int)$trainingRow['source_plan_entry_id'] : 0,
                    'planDay' => trim((string)($trainingRow['plan_day'] ?? '')),
                    'planFocus' => trim((string)($trainingRow['plan_focus'] ?? '')),
                    'planDuration' => trim((string)($trainingRow['plan_duration'] ?? '')),
                    'planNote' => trim((string)($trainingRow['plan_note'] ?? '')),
                    'planValidFrom' => trim((string)($trainingRow['plan_valid_from'] ?? '')),
                    'createdAt' => (string)$trainingRow['created_at']
                ];
            }
        }
    }

    $trainingExceptions = [];
    $exceptionStmt = $mysqli->prepare(
        'SELECT id, date_from, date_to, reason_code, note_text, created_at
         FROM training_exception WHERE user_id = ? ORDER BY date_from DESC, id DESC'
    );
    $exceptionStmt->bind_param('i', $userId);
    $exceptionStmt->execute();
    $exceptionResult = $exceptionStmt->get_result();
    while ($exceptionResult && ($row = $exceptionResult->fetch_assoc())) {
        $trainingExceptions[] = [
            'id' => (int)$row['id'],
            'dateFrom' => (string)$row['date_from'],
            'dateTo' => (string)$row['date_to'],
            'reason' => (string)$row['reason_code'],
            'note' => trim((string)($row['note_text'] ?? '')),
            'createdAt' => (string)$row['created_at']
        ];
    }

    $deeplinkRows = [];
    if (!$isReadOnlyShare) {
        $deeplinkStmt = $mysqli->prepare(
            "SELECT id, token, created_at, expires_at, disabled_at
             FROM `deeplink_access`
             WHERE user_id = ?
             ORDER BY created_at DESC"
        );
        if ($deeplinkStmt) {
            $deeplinkStmt->bind_param('i', $userId);
            $deeplinkStmt->execute();
            $deeplinkResult = $deeplinkStmt->get_result();

            if ($deeplinkResult && $deeplinkResult->num_rows > 0) {
                while ($row = $deeplinkResult->fetch_assoc()) {
                    $isExpired = $row['expires_at'] !== null && strtotime((string)$row['expires_at']) <= time();
                    $isDisabled = $row['disabled_at'] !== null;
                    $status = 'active';
                    if ($isDisabled) {
                        $status = 'disabled';
                    } elseif ($isExpired) {
                        $status = 'expired';
                    }

                    $deeplinkRows[] = [
                        'id' => (int)$row['id'],
                        'token' => (string)$row['token'],
                        'createdAt' => $row['created_at'],
                        'expiresAt' => $row['expires_at'],
                        'disabledAt' => $row['disabled_at'],
                        'status' => $status
                    ];
                }
            }
        }
    }

    $latestMeasureStmt = $mysqli->prepare(
        "SELECT id, DATE_FORMAT(`datetime`, '%Y-%m-%d') AS measure_date
         FROM `messure`
         WHERE `user-id` = ? AND `official` = b'1'
         ORDER BY `datetime` DESC
         LIMIT 1"
    );
    $latestMeasureStmt->bind_param('i', $userId);
    $latestMeasureStmt->execute();
    $latestMeasureResult = $latestMeasureStmt->get_result();
    $latestMeasureRow = $latestMeasureResult ? $latestMeasureResult->fetch_assoc() : null;

    $latestEntries = [];
    if ($latestMeasureRow && isset($latestMeasureRow['id'])) {
        $latestValuesStmt = $mysqli->prepare(
            "SELECT mt.id AS type_id, mt.messurement, mt.unit, mv.value
             FROM `messurevalue` mv
             JOIN `messuretype` mt ON mt.id = mv.`type-id`
             WHERE mv.`messure-id` = ?
             ORDER BY mt.messurement ASC"
        );
        $latestMeasureId = (int)$latestMeasureRow['id'];
        $latestValuesStmt->bind_param('i', $latestMeasureId);
        $latestValuesStmt->execute();
        $latestValuesResult = $latestValuesStmt->get_result();

        if ($latestValuesResult && $latestValuesResult->num_rows > 0) {
            while ($row = $latestValuesResult->fetch_assoc()) {
                $latestEntries[] = [
                    'typeId' => (int)$row['type_id'],
                    'typeName' => $row['messurement'],
                    'unit' => $row['unit'],
                    'value' => (float)$row['value']
                ];
            }
        }
    }

    $weights = [];
    $dates = [];
    $measurementHistoryByType = [];
    $measurementSeries = [
        'Brustumfang' => ['values' => [], 'dates' => []],
        'Bauchumfang' => ['values' => [], 'dates' => []],
        'Bundumfang' => ['values' => [], 'dates' => []],
        'Poumfang' => ['values' => [], 'dates' => []]
    ];

    if ($weightResult && $weightResult->num_rows > 0) {
        while ($row = $weightResult->fetch_assoc()) {
            $weights[] = (float) $row['value'];
            $dates[] = $row['measure_date'];
        }
    }

    if ($measurementResult && $measurementResult->num_rows > 0) {
        while ($row = $measurementResult->fetch_assoc()) {
            $typeId = (int)($row['type_id'] ?? 0);
            $typeName = $row['messurement'] ?? '';
            $typeUnit = $row['unit'] ?? '';
            $measureDate = $row['measure_date'] ?? null;
            $measureValue = (float)$row['value'];

            if ($typeId > 0 && $measureDate !== null) {
                if (!isset($measurementHistoryByType[$typeId])) {
                    $measurementHistoryByType[$typeId] = [
                        'typeId' => $typeId,
                        'typeName' => $typeName,
                        'unit' => $typeUnit,
                        'values' => [],
                        'dates' => []
                    ];
                }

                $measurementHistoryByType[$typeId]['values'][] = $measureValue;
                $measurementHistoryByType[$typeId]['dates'][] = $measureDate;
            }

            $normalized = normalizeMeasurementKey($typeName);

            if (str_contains($normalized, 'brust') || str_contains($normalized, 'chest')) {
                $measurementSeries['Brustumfang']['values'][] = $measureValue;
                $measurementSeries['Brustumfang']['dates'][] = $measureDate;
            } elseif (str_contains($normalized, 'bauch') || str_contains($normalized, 'waist')) {
                $measurementSeries['Bauchumfang']['values'][] = $measureValue;
                $measurementSeries['Bauchumfang']['dates'][] = $measureDate;
            } elseif (str_contains($normalized, 'bund') || str_contains($normalized, 'po') || str_contains($normalized, 'hip')) {
                $measurementSeries['Bundumfang']['values'][] = $measureValue;
                $measurementSeries['Bundumfang']['dates'][] = $measureDate;
                if (str_contains($normalized, 'po') || str_contains($normalized, 'hip')) {
                    $measurementSeries['Poumfang']['values'][] = $measureValue;
                    $measurementSeries['Poumfang']['dates'][] = $measureDate;
                }
            }
        }
    }

    $measurements = [];
    foreach ($measurementSeries as $title => $series) {
        if (!empty($series['values'])) {
            $lastIndex = count($series['values']) - 1;
            $measurements[] = [
                'title' => $title,
                'value' => formatMeasurementValue((float) $series['values'][$lastIndex]),
                'note' => 'Letzte Messung am ' . $series['dates'][$lastIndex]
            ];
        }
    }

    $measurementTypes = [];
    if ($typesResult && $typesResult->num_rows > 0) {
        while ($typeRow = $typesResult->fetch_assoc()) {
            $measurementTypes[] = [
                'id' => (int)$typeRow['id'],
                'name' => $typeRow['messurement'],
                'unit' => $typeRow['unit']
            ];
        }
    }

    $goals = [];
    if ($goalsResult && $goalsResult->num_rows > 0) {
        while ($goalData = $goalsResult->fetch_assoc()) {
            $achievedAt = $goalData['achieved'] ?? null;
            $rewardedAt = $goalData['rewardedat'] ?? null;
            $rewardText = trim((string)($goalData['rewardedwith'] ?? ''));

            $goals[] = [
                'id' => (int)$goalData['id'],
                'typeId' => (int)$goalData['type_id'],
                'typeName' => $goalData['type_name'],
                'unit' => $goalData['unit'],
                'targetValue' => (float)$goalData['target_value'],
                'goalText' => $goalData['goalname'],
                'createdAt' => $goalData['createdat'],
                'achievedAt' => $achievedAt,
                'rewardedAt' => $rewardedAt,
                'rewardedWith' => $rewardText
            ];
        }
    }

    $resolvedHeight = isset($goalRow['height']) && $goalRow['height'] !== null
        ? (float)$goalRow['height']
        : (float)$defaultData['heightM'];

    if ($resolvedHeight > 3) {
        $resolvedHeight = $resolvedHeight / 100;
    }

    $measurementHistory = array_values($measurementHistoryByType);

    outputJson([
        'heightM' => $resolvedHeight,
        'goalWeight' => $goalRow['goalweight'] ?? null,
        'birthdate' => $goalRow['birthdate'] ?? null,
        'gender' => $goalRow['gender'] ?? null,
        'weights' => $weights,
        'dates' => $dates,
        'measurements' => $measurements,
        'measurementHistory' => $measurementHistory,
        'measurementTypes' => $measurementTypes,
        'latestMeasurementEntries' => $latestEntries,
        'goals' => $goals,
        'deeplinks' => $deeplinkRows,
        'readOnly' => $isReadOnlyShare,
        'viewerNick' => $viewerNick,
        'trainingPlan' => $trainingPlanEntries,
        'trainingPlanHistory' => $trainingPlanHistory,
        'recentTrainingEntries' => $recentTrainingEntries,
        'trainingExceptions' => $trainingExceptions,
        'source' => 'database'
    ]);
    exit;
} catch (Throwable $e) {
    error_log('Dashboard load failed: ' . $e->getMessage());
    http_response_code(500);
    outputJson(['ok' => false, 'error' => 'Daten konnten nicht geladen werden']);
}
