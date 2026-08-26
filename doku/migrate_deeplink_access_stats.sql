-- Deeplink-Zugriffsstatistik ergaenzen; mehrfach ausfuehrbar.
SET @deeplink_access_count_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'deeplink_access'
    AND COLUMN_NAME = 'access_count'
);
SET @deeplink_access_count_sql = IF(
  @deeplink_access_count_exists = 0,
  'ALTER TABLE `deeplink_access` ADD COLUMN `access_count` BIGINT UNSIGNED NOT NULL DEFAULT 0 AFTER `disabled_at`',
  'SELECT 1'
);
PREPARE deeplink_access_count_migration FROM @deeplink_access_count_sql;
EXECUTE deeplink_access_count_migration;
DEALLOCATE PREPARE deeplink_access_count_migration;

SET @deeplink_last_access_exists = (
  SELECT COUNT(*)
  FROM INFORMATION_SCHEMA.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'deeplink_access'
    AND COLUMN_NAME = 'last_accessed_at'
);
SET @deeplink_last_access_sql = IF(
  @deeplink_last_access_exists = 0,
  'ALTER TABLE `deeplink_access` ADD COLUMN `last_accessed_at` DATETIME NULL AFTER `access_count`',
  'SELECT 1'
);
PREPARE deeplink_last_access_migration FROM @deeplink_last_access_sql;
EXECUTE deeplink_last_access_migration;
DEALLOCATE PREPARE deeplink_last_access_migration;
