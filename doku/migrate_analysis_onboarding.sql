-- Onboarding, training exceptions and analysis support.
ALTER TABLE `user`
  ADD COLUMN `birthdate` DATE NULL AFTER `height`,
  ADD COLUMN `gender` VARCHAR(20) NULL AFTER `birthdate`,
  ADD COLUMN `onboarding_completed_at` DATETIME NULL AFTER `gender`;

ALTER TABLE `training_entry`
  ADD COLUMN `duration_minutes` SMALLINT UNSIGNED NULL AFTER `duration_text`;

CREATE TABLE IF NOT EXISTS `training_exception` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `date_from` DATE NOT NULL,
  `date_to` DATE NOT NULL,
  `reason_code` VARCHAR(30) NOT NULL,
  `note_text` VARCHAR(255) NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_exception_user_dates` (`user_id`, `date_from`, `date_to`),
  CONSTRAINT `fk_training_exception_user`
    FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
