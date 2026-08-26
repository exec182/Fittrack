-- Einmalig auf dem Livesystem ausführen (bestehende Daten bleiben erhalten).
CREATE TABLE IF NOT EXISTS `registration_invite` (
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
