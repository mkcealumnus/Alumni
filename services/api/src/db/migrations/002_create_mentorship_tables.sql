-- Migration 002: Mentorship Requests Table
-- Compatible with MySQL 8.0+ / MariaDB 10.4+ on cPanel Shared Hosting

CREATE TABLE IF NOT EXISTS `mentorship_requests` (
  `id` VARCHAR(36) NOT NULL,
  `requester_id` VARCHAR(36) NOT NULL,
  `recipient_id` VARCHAR(36) NOT NULL,
  `topic_id` VARCHAR(36) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_mentorship_req_requester` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mentorship_req_recipient` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_mentorship_requester` (`requester_id`),
  INDEX `idx_mentorship_recipient` (`recipient_id`),
  INDEX `idx_mentorship_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
