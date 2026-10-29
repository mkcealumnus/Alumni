-- ALUMNUX portable manual setup schema
--
-- Compatibility: MySQL 8.0+ or MariaDB 10.4+; InnoDB, utf8mb4, and
-- utf8mb4_unicode_ci are required. Uses MySQL/MariaDB syntax only.
-- Import only into a newly created, empty database named `alumnux`.
-- phpMyAdmin: create/select database `alumnux`, open Import, choose this file,
-- keep SQL format, then click Import. Do not use this file to upgrade an
-- existing installation; take a backup and use a separately reviewed upgrade.
--
-- API migration ledger names match apps/api/src/db/migrator.ts exactly.
-- Physical columns intentionally retain canonical snake_case names because
-- API repositories issue SQL against those names. API responses map them to
-- camelCase. The previous mentorship names map semantically as:
--   mentorship_requests.student_id -> requester_id
--   mentorship_requests.alumni_id  -> recipient_id
-- This fresh schema stores each relationship once under the canonical API
-- names. Existing legacy rows need an explicit data-preserving upgrade that
-- copies/renames those values; importing this fresh-install file is not that
-- upgrade and will not operate on legacy databases.

USE `alumnux`;

SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci;
SET time_zone = '+00:00';

-- 001_create_auth_tables.sql: identity, profiles, and refresh-token sessions.
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('STUDENT', 'ALUMNI', 'ADMIN') NOT NULL,
  `status` ENUM('ACTIVE', 'PENDING_VERIFICATION', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_email` (`email`),
  KEY `idx_users_role` (`role`),
  KEY `idx_users_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `profiles` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `avatar_url` VARCHAR(500) NULL,
  `headline` VARCHAR(200) NULL,
  `bio` TEXT NULL,
  `department_code` VARCHAR(20) NOT NULL,
  `graduation_year` INT NOT NULL,
  `roll_number` VARCHAR(50) NULL,
  `current_company` VARCHAR(150) NULL,
  `current_role` VARCHAR(150) NULL,
  `experience_years` INT NOT NULL DEFAULT 0,
  `location_city` VARCHAR(100) NULL,
  `location_country` VARCHAR(100) NULL DEFAULT 'India',
  `linkedin_url` VARCHAR(500) NULL,
  `github_url` VARCHAR(500) NULL,
  `portfolio_url` VARCHAR(500) NULL,
  `skills_json` JSON NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_profiles_user_id` (`user_id`),
  KEY `idx_profiles_grad_year` (`graduation_year`),
  KEY `idx_profiles_company` (`current_company`),
  CONSTRAINT `fk_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `auth_sessions` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `refresh_token_hash` VARCHAR(64) NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `revoked_at` TIMESTAMP NULL DEFAULT NULL,
  `replaced_by_session_id` VARCHAR(36) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `last_used_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_auth_sessions_refresh_token_hash` (`refresh_token_hash`),
  KEY `idx_sessions_user` (`user_id`),
  KEY `idx_sessions_expires` (`expires_at`),
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 002_create_mentorship_tables.sql: canonical API relationship columns.
CREATE TABLE IF NOT EXISTS `mentorship_requests` (
  `id` VARCHAR(36) NOT NULL,
  `requester_id` VARCHAR(36) NOT NULL,
  `recipient_id` VARCHAR(36) NOT NULL,
  `topic_id` VARCHAR(36) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_mentorship_requester` (`requester_id`),
  KEY `idx_mentorship_recipient` (`recipient_id`),
  KEY `idx_mentorship_status` (`status`),
  CONSTRAINT `fk_mentorship_req_requester` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mentorship_req_recipient` FOREIGN KEY (`recipient_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 005_mysql_api_schema_alignment.sql: direct 1:1 conversations and messages.
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` VARCHAR(36) NOT NULL,
  `student_id` VARCHAR(36) NOT NULL,
  `alumni_id` VARCHAR(36) NOT NULL,
  `mentorship_request_id` VARCHAR(36) NULL,
  `topic` VARCHAR(255) NULL,
  `status` ENUM('active', 'completed', 'closed') NOT NULL DEFAULT 'active',
  `last_message_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_message_preview` TEXT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_conv_student` (`student_id`),
  KEY `idx_conv_alumni` (`alumni_id`),
  KEY `idx_conv_last_msg` (`last_message_at`),
  CONSTRAINT `fk_conversation_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_conversation_alumni` FOREIGN KEY (`alumni_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `messages` (
  `id` VARCHAR(36) NOT NULL,
  `conversation_id` VARCHAR(36) NOT NULL,
  `sender_id` VARCHAR(36) NOT NULL,
  `sender_name` VARCHAR(150) NOT NULL,
  `sender_role` VARCHAR(20) NOT NULL,
  `content` TEXT NOT NULL,
  `status` ENUM('sent', 'delivered', 'read') NOT NULL DEFAULT 'sent',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_msg_conversation` (`conversation_id`),
  KEY `idx_msg_created` (`created_at`),
  CONSTRAINT `fk_message_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- The application runner uses these exact names to avoid reapplying DDL.
-- This ledger is valid for a fresh import of this complete schema only.
CREATE TABLE IF NOT EXISTS `schema_migrations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `applied_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_schema_migrations_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO `schema_migrations` (`name`) VALUES
  ('001_create_auth_tables.sql'),
  ('002_create_mentorship_tables.sql'),
  ('005_mysql_api_schema_alignment.sql'),
  ('006_add_profile_avatar_url.sql');
