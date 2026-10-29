-- ==============================================================================
-- ALUMNUX PRODUCTION DATABASE SCHEMA (MySQL 8.0+ / MariaDB 10.4+)
-- Designed for cPanel Shared Hosting & phpMyAdmin Compatibility
-- Character Set: utf8mb4, Collation: utf8mb4_unicode_ci
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ------------------------------------------------------------------------------
-- 1. Academic Departments
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `departments` (
  `id` VARCHAR(36) NOT NULL,
  `code` VARCHAR(20) NOT NULL UNIQUE,
  `name` VARCHAR(150) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO `departments` (`id`, `code`, `name`) VALUES
('dept_cse', 'CSE', 'Computer Science and Engineering'),
('dept_it', 'IT', 'Information Technology'),
('dept_ece', 'ECE', 'Electronics and Communication Engineering'),
('dept_eee', 'EEE', 'Electrical and Electronics Engineering'),
('dept_mech', 'MECH', 'Mechanical Engineering'),
('dept_civil', 'CIVIL', 'Civil Engineering'),
('dept_aids', 'AIDS', 'Artificial Intelligence and Data Science');

-- ------------------------------------------------------------------------------
-- 2. Users (Core Identity)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(36) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('STUDENT', 'ALUMNI', 'ADMIN') NOT NULL,
  `is_verified` BOOLEAN NOT NULL DEFAULT FALSE,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. User Profiles
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `profiles` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL UNIQUE,
  `full_name` VARCHAR(150) NOT NULL,
  `avatar_url` VARCHAR(500) NULL,
  `headline` VARCHAR(200) NULL,
  `bio` TEXT NULL,
  `department_code` VARCHAR(20) NOT NULL,
  `graduation_year` INT NOT NULL,
  `roll_number` VARCHAR(50) NULL,
  `current_company` VARCHAR(150) NULL,
  `current_role` VARCHAR(150) NULL,
  `experience_years` INT DEFAULT 0,
  `location_city` VARCHAR(100) NULL,
  `location_country` VARCHAR(100) DEFAULT 'India',
  `linkedin_url` VARCHAR(500) NULL,
  `github_url` VARCHAR(500) NULL,
  `portfolio_url` VARCHAR(500) NULL,
  `skills_json` JSON NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_profiles_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_profiles_dept` FOREIGN KEY (`department_code`) REFERENCES `departments` (`code`),
  INDEX `idx_profiles_grad_year` (`graduation_year`),
  INDEX `idx_profiles_company` (`current_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Verification Requests
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `verification_requests` (
  `id` VARCHAR(36) NOT NULL,
  `user_id` VARCHAR(36) NOT NULL,
  `status` ENUM('PENDING', 'NEEDS_REVIEW', 'VERIFIED', 'REJECTED') NOT NULL DEFAULT 'PENDING',
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `reviewed_by` VARCHAR(36) NULL,
  `reviewed_at` TIMESTAMP NULL,
  `review_notes` TEXT NULL,
  `rejection_reason` VARCHAR(500) NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_verification_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_verification_reviewer` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  INDEX `idx_verification_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. Verification Evidence Items
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `verification_evidence` (
  `id` VARCHAR(36) NOT NULL,
  `request_id` VARCHAR(36) NOT NULL,
  `document_type` VARCHAR(50) NOT NULL,
  `file_path` VARCHAR(500) NOT NULL,
  `file_name` VARCHAR(255) NOT NULL,
  `file_size_bytes` INT NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `uploaded_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_evidence_request` FOREIGN KEY (`request_id`) REFERENCES `verification_requests` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. Mentorship Topics & Requests
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `mentorship_topics` (
  `id` VARCHAR(36) NOT NULL,
  `title` VARCHAR(150) NOT NULL,
  `description` TEXT NOT NULL,
  `icon_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `mentorship_requests` (
  `id` VARCHAR(36) NOT NULL,
  `student_id` VARCHAR(36) NOT NULL,
  `alumni_id` VARCHAR(36) NOT NULL,
  `topic_id` VARCHAR(36) NOT NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('PENDING', 'ACCEPTED', 'DECLINED', 'COMPLETED') DEFAULT 'PENDING',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_mentorship_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mentorship_alumni` FOREIGN KEY (`alumni_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_mentorship_topic` FOREIGN KEY (`topic_id`) REFERENCES `mentorship_topics` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. 1-on-1 Mentorship & Direct Conversations
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `conversations` (
  `id` VARCHAR(36) NOT NULL,
  `student_id` VARCHAR(36) NOT NULL,
  `alumni_id` VARCHAR(36) NOT NULL,
  `mentorship_request_id` VARCHAR(36) NULL,
  `topic` VARCHAR(255) NULL,
  `status` ENUM('active', 'completed', 'closed') DEFAULT 'active',
  `last_message_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_message_preview` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_conversation_student` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_conversation_alumni` FOREIGN KEY (`alumni_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  INDEX `idx_conv_student` (`student_id`),
  INDEX `idx_conv_alumni` (`alumni_id`),
  INDEX `idx_conv_last_msg` (`last_message_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. Messages
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `messages` (
  `id` VARCHAR(36) NOT NULL,
  `conversation_id` VARCHAR(36) NOT NULL,
  `sender_id` VARCHAR(36) NOT NULL,
  `sender_name` VARCHAR(150) NOT NULL,
  `sender_role` VARCHAR(20) NOT NULL,
  `content` TEXT NOT NULL,
  `status` ENUM('sent', 'delivered', 'read') DEFAULT 'sent',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_message_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  INDEX `idx_msg_conversation` (`conversation_id`),
  INDEX `idx_msg_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 9. Audit Log
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `audit_logs` (
  `id` VARCHAR(36) NOT NULL,
  `actor_id` VARCHAR(36) NULL,
  `actor_name` VARCHAR(150) NOT NULL,
  `action` VARCHAR(100) NOT NULL,
  `target_entity` VARCHAR(100) NOT NULL,
  `target_id` VARCHAR(100) NOT NULL,
  `summary` TEXT NOT NULL,
  `ip_address` VARCHAR(45) NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_audit_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
