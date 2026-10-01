/*
  NextStep Database Setup Script (MKCE Exclusive)
  Database: nextstep (MySQL)
  Naming: camelCase

  Run: node config/dbSetup.js
*/

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DB_NAME = process.env.DB_NAME || 'nextstep';

async function setup() {
  // Connect without database first to create it
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || ''
  });

  console.log('🌱 Connected to MySQL server');

  // Create database
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await connection.query(`USE \`${DB_NAME}\``);
  console.log(`✅ Database "${DB_NAME}" ready`);

  // ──────────────────── TABLES ────────────────────

  // 1. users
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      username VARCHAR(100) NOT NULL UNIQUE,
      fullName VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      phone VARCHAR(20) DEFAULT NULL,
      role ENUM('admin', 'alumni', 'student') NOT NULL DEFAULT 'student',
      profileImage VARCHAR(500) DEFAULT NULL,
      department VARCHAR(255) DEFAULT NULL,
      graduationYear VARCHAR(20) DEFAULT NULL,
      rollNumber VARCHAR(100) DEFAULT NULL,
      company VARCHAR(255) DEFAULT NULL COMMENT 'For Alumni',
      designation VARCHAR(255) DEFAULT NULL COMMENT 'For Alumni',
      bio TEXT DEFAULT NULL,
      linkedin VARCHAR(500) DEFAULT NULL,
      github VARCHAR(500) DEFAULT NULL,
      isVerified TINYINT(1) DEFAULT 0,
      isActive TINYINT(1) DEFAULT 1,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_role (role),
      INDEX idx_email (email)
    ) ENGINE=InnoDB
  `);

  // 2. otpCodes
  await connection.query(`
    CREATE TABLE IF NOT EXISTS otpCodes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT DEFAULT NULL,
      email VARCHAR(255) NOT NULL,
      code VARCHAR(10) NOT NULL,
      expiresAt DATETIME NOT NULL,
      isUsed TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_email_code (email, code)
    ) ENGINE=InnoDB
  `);

  // 3. roadmaps (Curated pathways by alumni)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS roadmaps (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      domain VARCHAR(100) DEFAULT NULL,
      isPublished TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_alumni (alumniId)
    ) ENGINE=InnoDB
  `);

  // 4. roadmapDiscussions / Noticeboard (For Roadmaps)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS roadmapDiscussions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      roadmapId INT NOT NULL,
      userId INT NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (roadmapId) REFERENCES roadmaps(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_roadmap (roadmapId)
    ) ENGINE=InnoDB
  `);

  // 5. mentorshipSessions (1-on-1 bookings)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS mentorshipSessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alumniId INT NOT NULL,
      studentId INT NOT NULL,
      topic VARCHAR(255) NOT NULL,
      scheduledAt DATETIME NOT NULL,
      duration INT DEFAULT 30 COMMENT 'minutes',
      meetingLink VARCHAR(500) DEFAULT NULL,
      status ENUM('pending', 'approved', 'rejected', 'completed', 'cancelled') DEFAULT 'pending',
      notes TEXT DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_alumni (alumniId),
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 6. groups (Alumni-Student Groups)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS groups (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      createdBy INT NOT NULL COMMENT 'Alumni ID',
      domain VARCHAR(100) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 7. groupMembers
  await connection.query(`
    CREATE TABLE IF NOT EXISTS groupMembers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      groupId INT NOT NULL,
      userId INT NOT NULL,
      joinedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_member (groupId, userId)
    ) ENGINE=InnoDB
  `);

  // 8. groupMessages
  await connection.query(`
    CREATE TABLE IF NOT EXISTS groupMessages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      groupId INT NOT NULL,
      userId INT NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (groupId) REFERENCES groups(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_group (groupId)
    ) ENGINE=InnoDB
  `);

  // 9. jobs (Job Portal / Referrals)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(255) DEFAULT NULL,
      type ENUM('full-time', 'internship', 'contract') DEFAULT 'full-time',
      description TEXT NOT NULL,
      requirements TEXT,
      applyLink VARCHAR(500) DEFAULT NULL,
      isReferral TINYINT(1) DEFAULT 0,
      status ENUM('open', 'closed') DEFAULT 'open',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_alumni (alumniId)
    ) ENGINE=InnoDB
  `);

  // 10. events (Workshops / Webinars)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      eventType ENUM('workshop', 'webinar', 'seminar', 'meetup') DEFAULT 'workshop',
      startDate DATETIME NOT NULL,
      endDate DATETIME NOT NULL,
      meetingLink VARCHAR(500) DEFAULT NULL,
      maxParticipants INT DEFAULT 100,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_alumni (alumniId)
    ) ENGINE=InnoDB
  `);

  // 11. eventRegistrations
  await connection.query(`
    CREATE TABLE IF NOT EXISTS eventRegistrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      eventId INT NOT NULL,
      studentId INT NOT NULL,
      registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_registration (eventId, studentId)
    ) ENGINE=InnoDB
  `);

  // 12. notifications
  await connection.query(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT,
      type ENUM('info', 'success', 'warning', 'error') DEFAULT 'info',
      isRead TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user (userId)
    ) ENGINE=InnoDB
  `);

  // 13. systemSettings
  await connection.query(`
    CREATE TABLE IF NOT EXISTS systemSettings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      settingKey VARCHAR(100) NOT NULL UNIQUE,
      settingValue TEXT,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  // 14. profileRequests (Admin verification queue)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS profileRequests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      type ENUM('verification', 'edit', 'delete') NOT NULL,
      requestData JSON DEFAULT NULL,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
      reviewedBy INT DEFAULT NULL,
      reviewedAt DATETIME DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (reviewedBy) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_status (status)
    ) ENGINE=InnoDB
  `);

  // 15. contactMessages
  await connection.query(`
    CREATE TABLE IF NOT EXISTS contactMessages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      isRead TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  // 16. activityLogs
  await connection.query(`
    CREATE TABLE IF NOT EXISTS activityLogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      action VARCHAR(100) NOT NULL,
      description TEXT,
      ipAddress VARCHAR(45) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_action (action)
    ) ENGINE=InnoDB
  `);

  console.log('✅ MKCE Alumni Portal schema created successfully');

  // ──────────────────── CLEAN MOCK DATA ────────────────────
  console.log('🧹 Cleaning legacy data from database...');
  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  
  // Drop legacy tables that are no longer used
  const legacyTablesToDrop = [
    'subscriptionPlans', 'userSubscriptions', 'coursePurchases', 'transactions',
    'courses', 'courseContent', 'courseSubjects', 'courseTopics', 'courseMaterials', 'courseEnrollments',
    'assignments', 'assignmentSubmissions', 'aptitudeTests', 'aptitudeQuestions',
    'aptitudeTestAttempts', 'aptitudeAnswers', 'codingProblems', 'codingSubmissions',
    'doubts', 'doubtReplies', 'gameChallenges', 'gameUnlocks', 'grades',
    'studymaterials', 'discussionreplies', 'discussions'
  ];
  
  for (const table of legacyTablesToDrop) {
    try {
      await connection.query(`DROP TABLE IF EXISTS \`${table}\``);
    } catch (err) {}
  }

  // Truncate existing valid tables for a fresh start
  const tablesToTruncate = [
    'users', 'otpCodes', 'roadmaps', 'roadmapDiscussions', 'mentorshipSessions',
    'groups', 'groupMembers', 'groupMessages', 'jobs', 'events', 'eventRegistrations',
    'notifications', 'systemSettings', 'profileRequests', 'contactMessages', 'activityLogs'
  ];

  for (const table of tablesToTruncate) {
    try {
      await connection.query(`TRUNCATE TABLE \`${table}\``);
    } catch (err) {}
  }
  
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log('✅ Legacy tables dropped and schema cleaned');

  // ──────────────────── SEED DATA ────────────────────

  // Seed Initial Users (Admin, Alumni, Student)
  const plainPass = 'MKCE@2026';
  
  const initialUsers = [
    ['admin@mkce.ac.in', 'admin', 'System Admin', plainPass, '9999999999', 'admin', 'CSE', null, null, null, null, 1],
    ['alumni@mkce.ac.in', 'alumni_tech', 'Senior Alumni', plainPass, '8888888888', 'alumni', 'CSE', '2019', null, 'Google', 'SDE II', 1],
    ['student@mkce.ac.in', 'student_demo', 'Demo Student', plainPass, '7777777777', 'student', 'IT', '2026', '22IT010', null, null, 1],
  ];

  for (const u of initialUsers) {
    await connection.query(`
      INSERT IGNORE INTO users (email, username, fullName, password, phone, role, department, graduationYear, rollNumber, company, designation, isVerified)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, u);
  }

  console.log('✅ Initial seed users created');
  console.log('   Admin:   admin@mkce.ac.in   / MKCE@2026');
  console.log('   Alumni:  alumni@mkce.ac.in  / MKCE@2026');
  console.log('   Student: student@mkce.ac.in / MKCE@2026');

  // Seed System Settings
  const settings = [
    ['siteName', 'NextStep MKCE'],
    ['siteEmail', 'admin@mkce.ac.in'],
    ['studentRegistration', 'true'],
    ['alumniRegistration', 'true'],
  ];

  for (const s of settings) {
    await connection.query(`
      INSERT IGNORE INTO systemSettings (settingKey, settingValue) VALUES (?, ?)
    `, s);
  }

  console.log('✅ Seed data inserted');
  console.log('');
  console.log('🌱 NextStep database setup complete!');
  console.log('─────────────────────────────────────');

  await connection.end();
  process.exit(0);
}

setup().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
