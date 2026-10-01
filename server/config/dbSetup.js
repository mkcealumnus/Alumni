/*
  NextStep Database Setup Script
  Database: nextstep (MySQL)
  Naming: camelCase

  Run: node config/dbSetup.js
*/

import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import all150CodingProblems from '../data/all150CodingProblems.js';
import extra150CodingProblems from '../data/extra150CodingProblems.js';
import { generate25000AptitudeQuestions } from '../data/aptitude25000Generator.js';
import { seedHtmlCourse } from '../data/seedHtmlCourse.js';

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
      countryCode VARCHAR(10) DEFAULT '+91',
      role ENUM('admin', 'alumni', 'alumni', 'student', 'alumni', 'admin', 'alumni') NOT NULL DEFAULT 'student',
      profileImage VARCHAR(500) DEFAULT NULL,
      college VARCHAR(255) DEFAULT NULL,
      department VARCHAR(255) DEFAULT NULL,
      year VARCHAR(20) DEFAULT NULL,
      rollNumber VARCHAR(100) DEFAULT NULL,
      gender VARCHAR(20) DEFAULT NULL,
      dateOfBirth DATE DEFAULT NULL,
      address TEXT DEFAULT NULL,
      bio TEXT DEFAULT NULL,
      github VARCHAR(500) DEFAULT NULL,
      linkedin VARCHAR(500) DEFAULT NULL,
      hackerrank VARCHAR(500) DEFAULT NULL,
      leetcode VARCHAR(500) DEFAULT NULL,
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

  // 3. courses (enhanced with Azhagii-style fields)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      courseCode VARCHAR(50) DEFAULT NULL,
      description TEXT,
      image VARCHAR(500) DEFAULT NULL,
      thumbnail VARCHAR(500) DEFAULT NULL,
      syllabus VARCHAR(500) DEFAULT NULL,
      duration VARCHAR(50) DEFAULT NULL,
      alumniId INT NOT NULL,
      category VARCHAR(100) DEFAULT NULL,
      courseType ENUM('theory', 'practical', 'lab') DEFAULT 'theory',
      difficulty ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
      semester VARCHAR(20) DEFAULT NULL,
      regulation VARCHAR(50) DEFAULT NULL,
      academicYear VARCHAR(20) DEFAULT NULL,
      maxStudents INT DEFAULT 100,
      isPublished TINYINT(1) DEFAULT 0,
      status ENUM('draft', 'pending', 'active', 'rejected', 'inactive') DEFAULT 'draft',
      approvedBy INT DEFAULT NULL,
      approvedAt DATETIME DEFAULT NULL,
      rejectionReason TEXT DEFAULT NULL,
      rating DECIMAL(2,1) DEFAULT 0.0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (approvedBy) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_alumni (alumniId),
      INDEX idx_published (isPublished),
      INDEX idx_status (status)
    ) ENGINE=InnoDB
  `);

  // 4. courseEnrollments (enhanced with topic tracking)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseEnrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      studentId INT NOT NULL,
      enrolledAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completionPercentage DECIMAL(5,2) DEFAULT 0.00,
      status ENUM('active', 'completed', 'dropped') DEFAULT 'active',
      completedTopics JSON DEFAULT ('[]'),
      completedAt DATETIME DEFAULT NULL,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_enrollment (courseId, studentId),
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 4b. courseSubjects (Units within a course - from Azhagii)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseSubjects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      code VARCHAR(50) DEFAULT NULL,
      description TEXT,
      sortOrder INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 4c. courseTopics (Topics within subjects - from Azhagii)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseTopics (
      id INT AUTO_INCREMENT PRIMARY KEY,
      subjectId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      sortOrder INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (subjectId) REFERENCES courseSubjects(id) ON DELETE CASCADE,
      INDEX idx_subject (subjectId)
    ) ENGINE=InnoDB
  `);

  // 4d. courseContent (Video/PDF/Text content per course - from Azhagii)
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseContent (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      subjectId INT DEFAULT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      contentType ENUM('video', 'pdf', 'text') DEFAULT 'text',
      contentData TEXT COMMENT 'URL for video, file path for PDF, text content for text',
      sortOrder INT DEFAULT 0,
      status ENUM('active', 'inactive') DEFAULT 'active',
      uploadedBy INT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (subjectId) REFERENCES courseSubjects(id) ON DELETE SET NULL,
      FOREIGN KEY (uploadedBy) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId),
      INDEX idx_subject (subjectId)
    ) ENGINE=InnoDB
  `);

  // 5. courseMaterials
  await connection.query(`
    CREATE TABLE IF NOT EXISTS courseMaterials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      fileUrl VARCHAR(500) DEFAULT NULL,
      fileType VARCHAR(50) DEFAULT NULL,
      orderIndex INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 6. assignments
  await connection.query(`
    CREATE TABLE IF NOT EXISTS assignments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT NOT NULL,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      dueDate DATETIME NOT NULL,
      maxScore INT DEFAULT 100,
      isPublished TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId),
      INDEX idx_alumni (alumniId)
    ) ENGINE=InnoDB
  `);

  // 7. assignmentSubmissions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS assignmentSubmissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assignmentId INT NOT NULL,
      studentId INT NOT NULL,
      content TEXT,
      fileUrl VARCHAR(500) DEFAULT NULL,
      submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      score INT DEFAULT NULL,
      feedback TEXT,
      gradedAt DATETIME DEFAULT NULL,
      gradedBy INT DEFAULT NULL,
      FOREIGN KEY (assignmentId) REFERENCES assignments(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (gradedBy) REFERENCES users(id) ON DELETE SET NULL,
      UNIQUE KEY unique_submission (assignmentId, studentId),
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 8. aptitudeTests
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeTests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      category VARCHAR(100) DEFAULT 'Quantitative',
      difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
      icon VARCHAR(100) DEFAULT 'ri-question-answer-line',
      duration INT DEFAULT 15 COMMENT 'in minutes',
      totalQuestions INT DEFAULT 10,
      totalMarks INT DEFAULT 10,
      isPublished TINYINT(1) DEFAULT 1,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_alumni (alumniId),
      INDEX idx_category (category)
    ) ENGINE=InnoDB
  `);

  // 9. aptitudeQuestions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeQuestions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      testId INT NOT NULL,
      question TEXT NOT NULL,
      optionA VARCHAR(500) NOT NULL,
      optionB VARCHAR(500) NOT NULL,
      optionC VARCHAR(500) NOT NULL,
      optionD VARCHAR(500) NOT NULL,
      correctOption ENUM('A', 'B', 'C', 'D') NOT NULL,
      marks INT DEFAULT 1,
      explanation TEXT,
      orderIndex INT DEFAULT 0,
      FOREIGN KEY (testId) REFERENCES aptitudeTests(id) ON DELETE CASCADE,
      INDEX idx_test (testId)
    ) ENGINE=InnoDB
  `);

  // 10. aptitudeTestAttempts
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeTestAttempts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      testId INT NOT NULL,
      studentId INT NOT NULL,
      startedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completedAt DATETIME DEFAULT NULL,
      score INT DEFAULT 0,
      totalMarks INT DEFAULT 0,
      status ENUM('inProgress', 'completed', 'abandoned') DEFAULT 'inProgress',
      FOREIGN KEY (testId) REFERENCES aptitudeTests(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 11. aptitudeAnswers
  await connection.query(`
    CREATE TABLE IF NOT EXISTS aptitudeAnswers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      attemptId INT NOT NULL,
      questionId INT NOT NULL,
      selectedOption ENUM('A', 'B', 'C', 'D') DEFAULT NULL,
      isCorrect TINYINT(1) DEFAULT 0,
      FOREIGN KEY (attemptId) REFERENCES aptitudeTestAttempts(id) ON DELETE CASCADE,
      FOREIGN KEY (questionId) REFERENCES aptitudeQuestions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 12. codingProblems
  await connection.query(`
    CREATE TABLE IF NOT EXISTS codingProblems (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy',
      category VARCHAR(100) DEFAULT NULL,
      inputFormat TEXT,
      outputFormat TEXT,
      constraints TEXT,
      sampleInput TEXT,
      sampleOutput TEXT,
      boilerplate TEXT DEFAULT NULL,
      testCases JSON DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_alumni (alumniId),
      INDEX idx_difficulty (difficulty)
    ) ENGINE=InnoDB
  `);

  // 12b. gameChallenges — stores coding challenges + game card data for Learning Games
  await connection.query(`
    CREATE TABLE IF NOT EXISTS gameChallenges (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      boilerplate TEXT,
      hint TEXT,
      testCases JSON DEFAULT NULL,
      gameType VARCHAR(50) NOT NULL,
      gameTitle VARCHAR(255) NOT NULL,
      gameDescription VARCHAR(500),
      gameIcon VARCHAR(100),
      gameColor VARCHAR(100),
      gameAlgorithm VARCHAR(100),
      difficulty ENUM('Easy', 'Medium', 'Hard') DEFAULT 'Medium',
      sortOrder INT DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  // 12c. gameUnlocks — tracks which games a student has unlocked
  await connection.query(`
    CREATE TABLE IF NOT EXISTS gameUnlocks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      challengeSlug VARCHAR(100) NOT NULL,
      unlockedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uq_student_challenge (studentId, challengeSlug),
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 13. codingSubmissions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS codingSubmissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      problemId INT NOT NULL,
      studentId INT NOT NULL,
      code TEXT NOT NULL,
      language VARCHAR(50) DEFAULT 'javascript',
      status ENUM('pending', 'accepted', 'wrongAnswer', 'runtimeError', 'timeLimitExceeded') DEFAULT 'pending',
      executionTime INT DEFAULT NULL COMMENT 'in ms',
      memory INT DEFAULT NULL COMMENT 'in KB',
      submittedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (problemId) REFERENCES codingProblems(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_student (studentId),
      INDEX idx_problem (problemId)
    ) ENGINE=InnoDB
  `);

  // 14. events
  await connection.query(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      eventType ENUM('webinar', 'workshop', 'liveSession', 'hackathon', 'other') DEFAULT 'liveSession',
      startDate DATETIME NOT NULL,
      endDate DATETIME NOT NULL,
      location VARCHAR(500) DEFAULT NULL COMMENT 'URL or physical location',
      maxParticipants INT DEFAULT 100,
      isPublished TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_alumni (alumniId)
    ) ENGINE=InnoDB
  `);

  // 15. eventRegistrations
  await connection.query(`
    CREATE TABLE IF NOT EXISTS eventRegistrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      eventId INT NOT NULL,
      studentId INT NOT NULL,
      registeredAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('registered', 'attended', 'cancelled') DEFAULT 'registered',
      FOREIGN KEY (eventId) REFERENCES events(id) ON DELETE CASCADE,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE KEY unique_registration (eventId, studentId)
    ) ENGINE=InnoDB
  `);

  // 16. discussions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS discussions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT DEFAULT NULL,
      userId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 17. discussionReplies
  await connection.query(`
    CREATE TABLE IF NOT EXISTS discussionReplies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      discussionId INT NOT NULL,
      userId INT NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (discussionId) REFERENCES discussions(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 18. studyMaterials
  await connection.query(`
    CREATE TABLE IF NOT EXISTS studyMaterials (
      id INT AUTO_INCREMENT PRIMARY KEY,
      courseId INT DEFAULT NULL,
      alumniId INT NOT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      fileUrl VARCHAR(500) DEFAULT NULL,
      fileType VARCHAR(50) DEFAULT NULL,
      category VARCHAR(100) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE SET NULL,
      FOREIGN KEY (alumniId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_course (courseId)
    ) ENGINE=InnoDB
  `);

  // 19. grades
  await connection.query(`
    CREATE TABLE IF NOT EXISTS grades (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      courseId INT DEFAULT NULL,
      assignmentId INT DEFAULT NULL,
      testId INT DEFAULT NULL,
      gradeType ENUM('assignment', 'aptitude', 'course', 'overall') DEFAULT 'assignment',
      score DECIMAL(8,2) DEFAULT 0,
      maxScore DECIMAL(8,2) DEFAULT 100,
      percentage DECIMAL(5,2) DEFAULT 0,
      gradedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE SET NULL,
      FOREIGN KEY (assignmentId) REFERENCES assignments(id) ON DELETE SET NULL,
      FOREIGN KEY (testId) REFERENCES aptitudeTests(id) ON DELETE SET NULL,
      INDEX idx_student (studentId)
    ) ENGINE=InnoDB
  `);

  // 20. notifications
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
      INDEX idx_user (userId),
      INDEX idx_unread (userId, isRead)
    ) ENGINE=InnoDB
  `);

  // 21. systemSettings
  await connection.query(`
    CREATE TABLE IF NOT EXISTS systemSettings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      settingKey VARCHAR(100) NOT NULL UNIQUE,
      settingValue TEXT,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  // 22. activityLogs
  await connection.query(`
    CREATE TABLE IF NOT EXISTS activityLogs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT DEFAULT NULL,
      action VARCHAR(100) NOT NULL,
      description TEXT,
      ipAddress VARCHAR(45) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_user (userId),
      INDEX idx_created (createdAt)
    ) ENGINE=InnoDB
  `);

  // 23. profileRequests — student edit/delete account requests
  await connection.query(`
    CREATE TABLE IF NOT EXISTS profileRequests (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      type ENUM('edit', 'delete') NOT NULL,
      requestData JSON DEFAULT NULL,
      reason TEXT DEFAULT NULL,
      status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
      adminNote TEXT DEFAULT NULL,
      reviewedBy INT DEFAULT NULL,
      reviewedAt DATETIME DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (reviewedBy) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_student (studentId),
      INDEX idx_status (status),
      INDEX idx_type (type)
    ) ENGINE=InnoDB
  `);

  // 24. contactMessages
  await connection.query(`
    CREATE TABLE IF NOT EXISTS contactMessages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) DEFAULT NULL,
      subject VARCHAR(255) DEFAULT NULL,
      message TEXT NOT NULL,
      isRead TINYINT(1) DEFAULT 0,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_unread (isRead)
    ) ENGINE=InnoDB
  `);

  // 27. doubts
  await connection.query(`
    CREATE TABLE IF NOT EXISTS doubts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      studentId INT NOT NULL,
      courseId INT DEFAULT NULL,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status ENUM('open', 'in-progress', 'resolved', 'closed') DEFAULT 'open',
      assignedAlumniId INT DEFAULT NULL,
      priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (studentId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE SET NULL,
      FOREIGN KEY (assignedAlumniId) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_student (studentId),
      INDEX idx_alumni (assignedAlumniId),
      INDEX idx_status (status)
    ) ENGINE=InnoDB
  `);

  // 28. doubtReplies
  await connection.query(`
    CREATE TABLE IF NOT EXISTS doubtReplies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      doubtId INT NOT NULL,
      userId INT NOT NULL,
      content TEXT NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (doubtId) REFERENCES doubts(id) ON DELETE CASCADE,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB
  `);

  // 29. subscriptionPlans
  await connection.query(`
    CREATE TABLE IF NOT EXISTS subscriptionPlans (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      slug VARCHAR(50) NOT NULL UNIQUE,
      monthlyPrice DECIMAL(10,2) NOT NULL,
      yearlyPrice DECIMAL(10,2) NOT NULL,
      description TEXT,
      features JSON DEFAULT ('[]'),
      isPopular TINYINT(1) DEFAULT 0,
      isActive TINYINT(1) DEFAULT 1,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB
  `);

  // 30. userSubscriptions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS userSubscriptions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      planId INT NOT NULL,
      billingCycle ENUM('monthly', 'yearly') NOT NULL DEFAULT 'monthly',
      amountPaid DECIMAL(10,2) NOT NULL,
      status ENUM('active', 'expired', 'cancelled') DEFAULT 'active',
      startDate DATETIME NOT NULL,
      endDate DATETIME NOT NULL,
      paymentMethod VARCHAR(50) DEFAULT 'Card',
      transactionId VARCHAR(100) NOT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (planId) REFERENCES subscriptionPlans(id) ON DELETE CASCADE,
      INDEX idx_user (userId),
      INDEX idx_status (status)
    ) ENGINE=InnoDB
  `);

  // 31. coursePurchases
  await connection.query(`
    CREATE TABLE IF NOT EXISTS coursePurchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      courseId INT NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      paymentMethod VARCHAR(50) DEFAULT 'Card',
      transactionId VARCHAR(100) NOT NULL,
      purchasedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (courseId) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE KEY user_course (userId, courseId)
    ) ENGINE=InnoDB
  `);

  // 32. transactions
  await connection.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      userId INT NOT NULL,
      type ENUM('subscription', 'course_purchase') NOT NULL,
      itemTitle VARCHAR(255) NOT NULL,
      amount DECIMAL(10,2) NOT NULL,
      paymentMethod VARCHAR(50) DEFAULT 'UPI',
      status ENUM('success', 'failed', 'pending') DEFAULT 'success',
      transactionId VARCHAR(100) NOT NULL UNIQUE,
      receiptUrl VARCHAR(500) DEFAULT NULL,
      createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user (userId)
    ) ENGINE=InnoDB
  `);

  console.log('✅ All 32 tables created successfully');

  // ──────────────── ALTER for existing databases ────────────────
  // These run safely even if columns already exist
  const alterQueries = [
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS courseCode VARCHAR(50) DEFAULT NULL AFTER title",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS thumbnail VARCHAR(500) DEFAULT NULL AFTER image",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS syllabus VARCHAR(500) DEFAULT NULL AFTER thumbnail",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS courseType ENUM('theory', 'practical', 'lab') DEFAULT 'theory' AFTER category",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS semester VARCHAR(20) DEFAULT NULL AFTER difficulty",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS regulation VARCHAR(50) DEFAULT NULL AFTER semester",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS academicYear VARCHAR(20) DEFAULT NULL AFTER regulation",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS status ENUM('draft', 'pending', 'active', 'rejected', 'inactive') DEFAULT 'draft' AFTER isPublished",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS approvedBy INT DEFAULT NULL AFTER status",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS approvedAt DATETIME DEFAULT NULL AFTER approvedBy",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS rejectionReason TEXT DEFAULT NULL AFTER approvedAt",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS price DECIMAL(10,2) DEFAULT 999.00 AFTER rating",
    "ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'alumni', 'alumni', 'student', 'alumni', 'admin', 'alumni') NOT NULL DEFAULT 'student'",
    "ALTER TABLE courses ADD COLUMN IF NOT EXISTS isPremium TINYINT(1) DEFAULT 1 AFTER price",
    "ALTER TABLE courseEnrollments ADD COLUMN IF NOT EXISTS completedTopics JSON DEFAULT ('[]') AFTER status",
  ];

  for (const q of alterQueries) {
    try { await connection.query(q); } catch (e) { /* column may already exist */ }
  }
  console.log('✅ Schema migrations applied');

  // ──────────────────── CLEAN MOCK DATA ────────────────────
  console.log('🧹 Cleaning mock data from database...');
  await connection.query('SET FOREIGN_KEY_CHECKS = 0');
  const tablesToTruncate = [
    'activitylogs', 'aptitudeanswers', 'aptitudetestattempts', 'assignments',
    'assignmentsubmissions', 'codingsubmissions', 'contactmessages', 'coursecontent',
    'courseenrollments', 'coursematerials', 'coursepurchases', 'courses',
    'coursesubjects', 'coursetopics', 'discussionreplies', 'discussions',
    'doubtreplies', 'doubts', 'eventregistrations', 'events',
    'gameunlocks', 'grades', 'notifications', 'otpcodes',
    'profilerequests', 'studymaterials', 'transactions', 'users',
    'usersubscriptions'
  ];
  for (const table of tablesToTruncate) {
    try {
      await connection.query(`TRUNCATE TABLE \`${table}\``);
    } catch (err) {
      /* ignore if table not present */
    }
  }
  await connection.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log('✅ Mock data cleaned');

  // ──────────────────── SEED DATA ────────────────────

  // Seed Initial 6 Users (1 for each role)
  const initialUsers = [
    ['jayanthan@nextstep.com', 'jayanthan', 'Jayanthan', 'Vishu@2008', '8825756388', '+91', 'admin'],
    ['janasruthi@nextstep.com', 'janasruthi', 'Jana Sruthi', 'Vishu@2008', '8825756381', '+91', 'alumni'],
    ['vishalini@nextstep.com', 'vishalini', 'Vishalini', 'Vishu@2008', '9442556781', '+91', 'student'],
    ['alumni@nextstep.com', 'alumni_sow', 'Course Creator', 'Vishu@2008', '9442556784', '+91', 'alumni'],
    ['admin@nextstep.com', 'admin_sow', 'Supervisor Manager', 'Vishu@2008', '9442556785', '+91', 'admin'],
    ['alumni@nextstep.com', 'alumni_sow', 'Guest Observer', 'Vishu@2008', '9442556786', '+91', 'alumni'],
  ];

  for (const u of initialUsers) {
    await connection.query(`
      INSERT IGNORE INTO users (email, username, fullName, password, phone, countryCode, role, isVerified, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, 1)
    `, u);
  }

  console.log('✅ Initial 6 seed users created');
  console.log('   Admin:      jayanthan@nextstep.com  / Vishu@2008 (Username: jayanthan)');
  console.log('   Instructor: janasruthi@nextstep.com / Vishu@2008 (Username: janasruthi)');
  console.log('   Student:    vishalini@nextstep.com  / Vishu@2008 (Username: vishalini)');
  console.log('   Creator:    alumni@nextstep.com    / Vishu@2008 (Username: alumni_sow)');
  console.log('   Manager:    admin@nextstep.com    / Vishu@2008 (Username: admin_sow)');
  console.log('   Observer:   alumni@nextstep.com   / Vishu@2008 (Username: alumni_sow)');

  // Seed Subscription Plans
  const plans = [
    [
      'Starter Pass', 'starter', 0.00, 0.00, 
      'Perfect for exploring basic content and introductory programming resources.',
      JSON.stringify([
        'Access to 1 free course preview',
        'Basic Coding Sandbox',
        'Community Doubts forum view',
        'Public Aptitude Practice'
      ]),
      0, 1
    ],
    [
      'Pro Scholar', 'pro', 499.00, 3999.00, 
      'Full access to all skill tracks, interactive code compilers, and 1-on-1 alumni guidance.',
      JSON.stringify([
        'Unlimited access to ALL courses',
        'Advanced Code Editor & Multi-language runner',
        'Unlimited Doubt Submissions & Priority Alumni Replies',
        'Full Learning Games & Skill Badges',
        'Downloadable Verified Course Certificates',
        'Full Mock Aptitude & Assessment Analytics'
      ]),
      1, 1
    ],
    [
      'Campus Elite Pass', 'campus', 1299.00, 9999.00, 
      'Designed for college students needing full curriculum coverage, lab tasks, and placement prep.',
      JSON.stringify([
        'Everything in Pro Scholar',
        'Custom College Syllabus & Department Tracks',
        'Placement Cell Mock Interviews & Resume Review',
        'Direct Alumni 1-on-1 Office Hours',
        'Verified Performance Transcript for HODs'
      ]),
      0, 1
    ]
  ];

  for (const p of plans) {
    await connection.query(`
      INSERT IGNORE INTO subscriptionPlans (title, slug, monthlyPrice, yearlyPrice, description, features, isPopular, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, p);
  }
  console.log('✅ Subscription plans seeded');

  const [alumniRows] = await connection.query(`SELECT id FROM users WHERE role = 'alumni' LIMIT 1`);

  if (alumniRows.length > 0) {
    // Seed Aptitude Tests & 10,000 Unique Questions
    console.log('  🌱 Seeding Aptitude Questions across Tests (25 Qs/set)...');
    const generatedTests = generate25000AptitudeQuestions();
    for (const tData of generatedTests) {
      const [existing] = await connection.query(
        `SELECT id FROM aptitudeTests WHERE title = ? AND alumniId = ?`,
        [tData.title, alumniRows[0].id]
      );
      let testId;
      if (existing.length > 0) {
        testId = existing[0].id;
        await connection.query(
          `UPDATE aptitudeTests SET description = ?, category = ?, difficulty = ?, icon = ?, duration = ?, totalQuestions = ?, totalMarks = ?, isPublished = 1 WHERE id = ?`,
          [tData.description, tData.category, tData.difficulty, tData.icon, tData.duration, tData.questions.length, tData.questions.length, testId]
        );
      } else {
        const [insertRes] = await connection.query(
          `INSERT INTO aptitudeTests (alumniId, title, description, category, difficulty, icon, duration, totalQuestions, totalMarks, isPublished)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
          [alumniRows[0].id, tData.title, tData.description, tData.category, tData.difficulty, tData.icon, tData.duration, tData.questions.length, tData.questions.length]
        );
        testId = insertRes.insertId;
      }

      await connection.query(`DELETE FROM aptitudeQuestions WHERE testId = ?`, [testId]);
      const questionValues = tData.questions.map(q => [
        testId,
        q.question,
        q.optionA,
        q.optionB,
        q.optionC,
        q.optionD,
        q.correctOption,
        q.marks || 1,
        q.explanation || '',
        q.orderIndex
      ]);
      await connection.query(
        `INSERT INTO aptitudeQuestions (testId, question, optionA, optionB, optionC, optionD, correctOption, marks, explanation, orderIndex)
         VALUES ?`,
        [questionValues]
      );
    }
    console.log(`  ✅ Seeded ${generatedTests.length} Aptitude Tests with ${generatedTests.length * 25} Questions into DB`);

    // Seed Coding Problems (All 300)
    try { await connection.query("ALTER TABLE codingProblems ADD COLUMN boilerplate TEXT DEFAULT NULL AFTER sampleOutput"); } catch {}
    const mid = alumniRows[0].id;
    const all300Problems = [...all150CodingProblems, ...extra150CodingProblems];
    for (const p of all300Problems) {
      await connection.query(
        `INSERT INTO codingProblems (id, alumniId, title, description, difficulty, category, inputFormat, outputFormat, \`constraints\`, sampleInput, sampleOutput, testCases, boilerplate) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE 
           title = VALUES(title), 
           description = VALUES(description), 
           difficulty = VALUES(difficulty), 
           category = VALUES(category), 
           testCases = VALUES(testCases), 
           boilerplate = VALUES(boilerplate)`,
        [p.id, mid, p.title, p.description, p.difficulty, p.category, p.inputFormat, p.outputFormat, p.constraints, p.sampleInput, p.sampleOutput, JSON.stringify(p.testCases), p.boilerplate || null]
      );
    }
    console.log(`  ✅ Seeded ${all300Problems.length} coding problems into DB`);
  }

  // Seed HTML5 Masterclass Course
  await seedHtmlCourse(connection);

  // Seed System Settings
  const settings = [
    ['siteName', 'NextStep'],
    ['siteEmail', 'berries@nextstep.com'],
    ['sitePhone', '+91 8825756388'],
    ['maxFileUploadSize', '10'],
    ['maintenanceMode', 'false'],
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
  console.log('Database: nextstep');
  console.log('Tables: 28');
  console.log('');
  console.log('Login Credentials:');
  console.log('  Admin:   jayanthan@nextstep.com  / Vishu@2008 (Username: jayanthan)');
  console.log('  Alumni:  janasruthi@nextstep.com / Vishu@2008 (Username: janasruthi)');
  console.log('  Student: vishalini@nextstep.com  / Vishu@2008 (Username: vishalini)');

  await connection.end();
  process.exit(0);
}

setup().catch(err => {
  console.error('❌ Setup failed:', err.message);
  process.exit(1);
});
