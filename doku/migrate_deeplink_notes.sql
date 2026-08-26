-- Deeplink-Notizen ergänzen; mehrfach ausführbar.
SET @deeplink_note_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'deeplink_access'
    AND COLUMN_NAME = 'note_text'
);

SET @deeplink_note_sql = IF(
  @deeplink_note_exists = 0,
  'ALTER TABLE `deeplink_access` ADD COLUMN `note_text` VARCHAR(255) NULL AFTER `token`',
  'SELECT ''note_text ist bereits vorhanden'' AS migration_info'
);

PREPARE deeplink_note_migration FROM @deeplink_note_sql;
EXECUTE deeplink_note_migration;
DEALLOCATE PREPARE deeplink_note_migration;

SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'deeplink_access'
  AND COLUMN_NAME = 'note_text';
