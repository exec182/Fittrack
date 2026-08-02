-- Versionierter Trainingsplan pro User
-- Fuehrt neue Tabellen und Erweiterungen fuer training_entry ein.
-- Das Skript ist fuer bestehende Live-Datenbanken gedacht.

CREATE TABLE IF NOT EXISTS `training_plan_entry` (
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
  KEY `idx_plan_user_day` (`user_id`, `weekday_name`, `deactivated_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `training_entry` (
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
  KEY `idx_training_source_plan_entry` (`source_plan_entry_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

DELIMITER $$

DROP PROCEDURE IF EXISTS `migrate_training_plan_versioning`$$
CREATE PROCEDURE `migrate_training_plan_versioning`()
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'training_entry'
      AND COLUMN_NAME = 'source_plan_entry_id'
  ) THEN
    ALTER TABLE `training_entry`
      ADD COLUMN `source_plan_entry_id` INT NULL AFTER `source_plan_day`;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'training_entry'
      AND INDEX_NAME = 'idx_training_source_plan_entry'
  ) THEN
    ALTER TABLE `training_entry`
      ADD KEY `idx_training_source_plan_entry` (`source_plan_entry_id`);
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'training_plan_entry'
      AND CONSTRAINT_NAME = 'fk_training_plan_entry_user'
  ) THEN
    ALTER TABLE `training_plan_entry`
      ADD CONSTRAINT `fk_training_plan_entry_user`
      FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'training_entry'
      AND CONSTRAINT_NAME = 'fk_training_entry_user'
  ) THEN
    ALTER TABLE `training_entry`
      ADD CONSTRAINT `fk_training_entry_user`
      FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'training_entry'
      AND CONSTRAINT_NAME = 'fk_training_entry_plan'
  ) THEN
    ALTER TABLE `training_entry`
      ADD CONSTRAINT `fk_training_entry_plan`
      FOREIGN KEY (`source_plan_entry_id`) REFERENCES `training_plan_entry` (`id`) ON DELETE SET NULL;
  END IF;
END$$

CALL `migrate_training_plan_versioning`()$$
DROP PROCEDURE `migrate_training_plan_versioning`$$

DELIMITER ;