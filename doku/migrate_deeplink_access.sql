-- Fuegt die Deeplink-Tabelle fuer schreibgeschuetzte Freigaben hinzu.
CREATE TABLE IF NOT EXISTS `deeplink_access` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `token` VARCHAR(128) NOT NULL,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `expires_at` DATETIME NULL,
  `disabled_at` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_deeplink_token` (`token`),
  KEY `idx_deeplink_user_created` (`user_id`, `created_at`),
  CONSTRAINT `deeplink_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
