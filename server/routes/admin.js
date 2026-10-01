import { Router } from 'express';
import bcrypt from 'bcryptjs';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
import archiver from 'archiver';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = Router();

// All admin & manager routes require authentication + admin or manager role
router.use(authenticate, authorize('admin', 'manager'));

// ──────────────── DASHBOARD STATS ────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const [totalStudents] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const [totalMentors] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'mentor'");
    const [totalCourses] = await pool.query("SELECT COUNT(*) as count FROM courses");
    const [totalEnrollments] = await pool.query("SELECT COUNT(*) as count FROM courseEnrollments");
    const [avgCompletion] = await pool.query("SELECT COALESCE(AVG(completionPercentage), 0) as avg FROM courseEnrollments");
    const [pendingVerifications] = await pool.query("SELECT COUNT(*) as count FROM users WHERE isVerified = 0 AND role = 'student'");
    const [activeStudents] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student' AND isActive = 1");
    const [contactUnread] = await pool.query("SELECT COUNT(*) as count FROM contactMessages WHERE isRead = 0");

    // Monthly enrollment trends (last 6 months)
    const [enrollmentTrends] = await pool.query(`
      SELECT DATE_FORMAT(enrolledAt, '%Y-%m') as month, COUNT(*) as count
      FROM courseEnrollments
      WHERE enrolledAt >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
      GROUP BY month ORDER BY month
    `);

    // Recent activities
    const [recentActivities] = await pool.query(`
      SELECT al.*, u.fullName, u.role as userRole
      FROM activityLogs al
      LEFT JOIN users u ON al.userId = u.id
      ORDER BY al.createdAt DESC LIMIT 10
    `);

    // Recent registrations
    const [recentRegistrations] = await pool.query(`
      SELECT id, fullName, email, role, isVerified, createdAt
      FROM users
      ORDER BY createdAt DESC LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        stats: {
          totalStudents: totalStudents[0].count,
          totalMentors: totalMentors[0].count,
          totalCourses: totalCourses[0].count,
          totalEnrollments: totalEnrollments[0].count,
          avgCompletion: Math.round(avgCompletion[0].avg),
          pendingVerifications: pendingVerifications[0].count,
          activeStudents: activeStudents[0].count,
          unreadMessages: contactUnread[0].count
        },
        enrollmentTrends,
        recentActivities,
        recentRegistrations
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MANAGE STUDENTS ────────────────
// List all students
router.get('/students', async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT id, email, username, fullName, phone, countryCode, profileImage, college, department, year, rollNumber, gender, dateOfBirth, bio, github, linkedin, hackerrank, leetcode, isVerified, isActive, createdAt FROM users WHERE role = 'student'";
    const params = [];

    if (search) {
      query += ' AND (fullName LIKE ? OR email LIKE ? OR username LIKE ? OR college LIKE ? OR department LIKE ? OR rollNumber LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (status === 'active') { query += ' AND isActive = 1'; }
    if (status === 'inactive') { query += ' AND isActive = 0'; }
    if (status === 'unverified') { query += ' AND isVerified = 0'; }

    const [countResult] = await pool.query(query.replace('SELECT id, email, username, fullName, phone, countryCode, profileImage, college, department, year, rollNumber, gender, dateOfBirth, bio, github, linkedin, hackerrank, leetcode, isVerified, isActive, createdAt', 'SELECT COUNT(*) as total'), params);

    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [students] = await pool.query(query, params);

    // Get enrollment counts per student
    for (const student of students) {
      const [enrollments] = await pool.query(
        'SELECT COUNT(*) as count FROM courseEnrollments WHERE studentId = ?',
        [student.id]
      );
      student.enrolledCourses = enrollments[0].count;
    }

    res.json({
      success: true,
      data: { students, total: countResult[0].total, page: Number(page), limit: Number(limit) }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get single student
router.get('/students/:id', async (req, res) => {
  try {
    const [students] = await pool.query(
      "SELECT id, email, username, fullName, phone, countryCode, profileImage, isVerified, isActive, createdAt FROM users WHERE id = ? AND role = 'student'",
      [req.params.id]
    );

    if (students.length === 0) {
      return res.status(404).json({ success: false, message: 'Student not found.' });
    }

    // Get enrollments
    const [enrollments] = await pool.query(`
      SELECT ce.*, c.title as courseTitle, c.category
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      WHERE ce.studentId = ?
    `, [req.params.id]);

    // Get grades
    const [grades] = await pool.query(`
      SELECT g.*, c.title as courseTitle
      FROM grades g
      LEFT JOIN courses c ON g.courseId = c.id
      WHERE g.studentId = ?
      ORDER BY g.gradedAt DESC
    `, [req.params.id]);

    res.json({
      success: true,
      data: { student: students[0], enrollments, grades }
    });
  } catch (error) {
    console.error('Get student error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Create student (admin-created)
router.post('/students', async (req, res) => {
  try {
    const { email, username, fullName, password, phone, countryCode } = req.body;

    if (!email || !username || !fullName || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email.toLowerCase(), username.toLowerCase()]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email or username already exists.' });
    }

    const [result] = await pool.query(
      `INSERT INTO users (email, username, fullName, password, phone, countryCode, role, isVerified, isActive)
       VALUES (?, ?, ?, ?, ?, ?, 'student', 1, 1)`,
      [email.toLowerCase(), username.toLowerCase(), fullName, password, phone || null, countryCode || '+91']
    );

    await pool.query('INSERT INTO activityLogs (userId, action, description) VALUES (?, ?, ?)',
      [req.user.id, 'admin_create_student', `Admin created student: ${fullName}`]);

    res.status(201).json({ success: true, message: 'Student created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create student error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  try {
    const { fullName, email, username, password, phone, isActive, isVerified } = req.body;

    await pool.query(
      `UPDATE users SET
        fullName = COALESCE(?, fullName),
        email = COALESCE(?, email),
        username = COALESCE(?, username),
        password = COALESCE(?, password),
        phone = COALESCE(?, phone),
        isActive = COALESCE(?, isActive),
        isVerified = COALESCE(?, isVerified)
       WHERE id = ? AND role = 'student'`,
      [fullName || null, email ? email.toLowerCase() : null, username ? username.toLowerCase() : null, password || null, phone || null, isActive !== undefined ? isActive : null, isVerified !== undefined ? isVerified : null, req.params.id]
    );

    res.json({ success: true, message: 'Student updated successfully.' });
  } catch (error) {
    console.error('Update student error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ? AND role = 'student'", [req.params.id]);
    res.json({ success: true, message: 'Student deleted successfully.' });
  } catch (error) {
    console.error('Delete student error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MANAGE MENTORS ────────────────
router.get('/mentors', async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT id, email, username, fullName, phone, profileImage, isVerified, isActive, createdAt FROM users WHERE role = 'mentor'";
    const params = [];

    if (search) {
      query += ' AND (fullName LIKE ? OR email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    const [countResult] = await pool.query(query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) as total FROM'), params);

    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [mentors] = await pool.query(query, params);

    // Get course counts per mentor
    for (const mentor of mentors) {
      const [courses] = await pool.query('SELECT COUNT(*) as count FROM courses WHERE mentorId = ?', [mentor.id]);
      mentor.totalCourses = courses[0].count;

      const [students] = await pool.query(`
        SELECT COUNT(DISTINCT ce.studentId) as count
        FROM courseEnrollments ce
        JOIN courses c ON ce.courseId = c.id
        WHERE c.mentorId = ?
      `, [mentor.id]);
      mentor.totalStudents = students[0].count;
    }

    res.json({
      success: true,
      data: { mentors, total: countResult[0].total, page: Number(page), limit: Number(limit) }
    });
  } catch (error) {
    console.error('Get mentors error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/mentors/:id', async (req, res) => {
  try {
    const [mentors] = await pool.query(
      "SELECT id, email, username, fullName, phone, profileImage, isVerified, isActive, createdAt FROM users WHERE id = ? AND role = 'mentor'",
      [req.params.id]
    );

    if (mentors.length === 0) {
      return res.status(404).json({ success: false, message: 'Mentor not found.' });
    }

    const [courses] = await pool.query('SELECT * FROM courses WHERE mentorId = ?', [req.params.id]);

    res.json({ success: true, data: { mentor: mentors[0], courses } });
  } catch (error) {
    console.error('Get mentor error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/mentors', async (req, res) => {
  try {
    const { email, username, fullName, password, phone, countryCode } = req.body;

    if (!email || !username || !fullName || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email.toLowerCase(), username.toLowerCase()]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Email or username already exists.' });
    }

    const [result] = await pool.query(
      `INSERT INTO users (email, username, fullName, password, phone, countryCode, role, isVerified, isActive)
       VALUES (?, ?, ?, ?, ?, ?, 'mentor', 1, 1)`,
      [email.toLowerCase(), username.toLowerCase(), fullName, password, phone || null, countryCode || '+91']
    );

    await pool.query('INSERT INTO activityLogs (userId, action, description) VALUES (?, ?, ?)',
      [req.user.id, 'admin_create_mentor', `Admin created mentor: ${fullName}`]);

    res.status(201).json({ success: true, message: 'Mentor created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create mentor error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/mentors/:id', async (req, res) => {
  try {
    const { fullName, email, username, password, phone, isActive, isVerified } = req.body;
    await pool.query(
      `UPDATE users SET
        fullName = COALESCE(?, fullName),
        email = COALESCE(?, email),
        username = COALESCE(?, username),
        password = COALESCE(?, password),
        phone = COALESCE(?, phone),
        isActive = COALESCE(?, isActive),
        isVerified = COALESCE(?, isVerified)
       WHERE id = ? AND role = 'mentor'`,
      [fullName || null, email ? email.toLowerCase() : null, username ? username.toLowerCase() : null, password || null, phone || null, isActive !== undefined ? isActive : null, isVerified !== undefined ? isVerified : null, req.params.id]
    );
    res.json({ success: true, message: 'Mentor updated successfully.' });
  } catch (error) {
    console.error('Update mentor error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/mentors/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ? AND role = 'mentor'", [req.params.id]);
    res.json({ success: true, message: 'Mentor deleted successfully.' });
  } catch (error) {
    console.error('Delete mentor error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── COURSES OVERVIEW ────────────────
router.get('/courses', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, u.fullName as mentorName, ap.fullName as approverName,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as enrollmentCount,
        (SELECT COALESCE(AVG(completionPercentage), 0) FROM courseEnrollments WHERE courseId = c.id) as avgCompletion,
        (SELECT COUNT(*) FROM courseSubjects WHERE courseId = c.id) as subjectCount,
        (SELECT COUNT(*) FROM courseContent WHERE courseId = c.id AND status = 'active') as contentCount
      FROM courses c
      JOIN users u ON c.mentorId = u.id
      LEFT JOIN users ap ON c.approvedBy = ap.id
      ORDER BY c.createdAt DESC
    `);

    res.json({ success: true, data: { courses } });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get course detail (admin view)
router.get('/courses/:id', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, u.fullName as mentorName, ap.fullName as approverName,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as enrollmentCount,
        (SELECT COUNT(*) FROM courseContent WHERE courseId = c.id AND status = 'active') as contentCount
      FROM courses c
      JOIN users u ON c.mentorId = u.id
      LEFT JOIN users ap ON c.approvedBy = ap.id
      WHERE c.id = ?
    `, [req.params.id]);

    if (courses.length === 0) return res.status(404).json({ success: false, message: 'Course not found.' });

    const course = courses[0];
    const [subjects] = await pool.query(`
      SELECT cs.*, (SELECT COUNT(*) FROM courseTopics WHERE subjectId = cs.id) as topicCount
      FROM courseSubjects cs WHERE cs.courseId = ? ORDER BY cs.sortOrder ASC
    `, [req.params.id]);
    course.subjects = subjects;

    res.json({ success: true, data: { course } });
  } catch (error) {
    console.error('Get course detail error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Approve a course
router.put('/courses/:id/approve', async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE courses SET status = 'active', isPublished = 1, approvedBy = ?, approvedAt = NOW(), rejectionReason = NULL WHERE id = ? AND status = 'pending'",
      [req.user.id, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Course not found or not in pending status.' });
    }

    res.json({ success: true, message: 'Course approved and published.' });
  } catch (error) {
    console.error('Approve course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Reject a course
router.put('/courses/:id/reject', async (req, res) => {
  try {
    const { reason } = req.body;

    const [result] = await pool.query(
      "UPDATE courses SET status = 'rejected', isPublished = 0, approvedBy = ?, approvedAt = NOW(), rejectionReason = ? WHERE id = ? AND status = 'pending'",
      [req.user.id, reason || 'No reason provided', req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ success: false, message: 'Course not found or not in pending status.' });
    }

    res.json({ success: true, message: 'Course rejected.' });
  } catch (error) {
    console.error('Reject course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Delete a course (admin)
router.delete('/courses/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courses WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Course deleted.' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Update course status (admin can directly change status)
router.put('/courses/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['draft', 'pending', 'active', 'rejected', 'inactive'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status.' });
    }

    const isPublished = status === 'active' ? 1 : 0;
    await pool.query(
      'UPDATE courses SET status = ?, isPublished = ? WHERE id = ?',
      [status, isPublished, req.params.id]
    );

    res.json({ success: true, message: `Course status updated to ${status}.` });
  } catch (error) {
    console.error('Update course status error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── COURSE MANAGEMENT (Full CRUD for Admin) ────────────────

// Create a course (admin)
router.post('/courses', async (req, res) => {
  try {
    const { title, courseCode, description, image, duration, mentorId, category, courseType, difficulty, semester, regulation, academicYear, maxStudents, subjects } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Course title is required.' });
    const [result] = await pool.query(
      `INSERT INTO courses (title, courseCode, description, image, duration, mentorId, category, courseType, difficulty, semester, regulation, academicYear, maxStudents, isPublished, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'active')`,
      [title, courseCode, description, image, duration, mentorId || req.user.id, category, courseType || 'theory', difficulty || 'beginner', semester, regulation, academicYear, maxStudents || 100]
    );
    if (subjects && Array.isArray(subjects)) {
      for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].title) {
          await pool.query('INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, ?, ?, ?, ?)',
            [result.insertId, subjects[i].title, subjects[i].code || null, subjects[i].description || null, i + 1]);
        }
      }
    }
    res.status(201).json({ success: true, message: 'Course created.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Admin create course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Update a course (admin)
router.put('/courses/:id', async (req, res) => {
  try {
    const fields = ['title', 'courseCode', 'description', 'image', 'duration', 'category', 'courseType', 'difficulty', 'semester', 'regulation', 'academicYear', 'maxStudents', 'isPublished', 'status'];
    const updates = []; const params = [];
    for (const f of fields) {
      if (req.body[f] !== undefined) { updates.push(`${f} = ?`); params.push(req.body[f]); }
    }
    if (updates.length === 0) return res.status(400).json({ success: false, message: 'No fields to update.' });
    params.push(req.params.id);
    await pool.query(`UPDATE courses SET ${updates.join(', ')} WHERE id = ?`, params);
    res.json({ success: true, message: 'Course updated.' });
  } catch (error) {
    console.error('Admin update course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Full course detail with subjects + topics
router.get('/courses/:id/detail', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, u.fullName as mentorName,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as enrollmentCount,
        (SELECT COUNT(*) FROM courseContent WHERE courseId = c.id AND status = 'active') as contentCount
      FROM courses c JOIN users u ON c.mentorId = u.id WHERE c.id = ?
    `, [req.params.id]);
    if (courses.length === 0) return res.status(404).json({ success: false, message: 'Course not found.' });
    const course = courses[0];
    const [subjects] = await pool.query(`
      SELECT cs.*, (SELECT COUNT(*) FROM courseTopics WHERE subjectId = cs.id) as topicCount,
        (SELECT COUNT(*) FROM courseContent WHERE subjectId = cs.id AND status = 'active') as contentCount
      FROM courseSubjects cs WHERE cs.courseId = ? ORDER BY cs.sortOrder ASC, cs.createdAt ASC
    `, [req.params.id]);
    for (const sub of subjects) {
      const [topics] = await pool.query('SELECT * FROM courseTopics WHERE subjectId = ? ORDER BY sortOrder ASC, createdAt ASC', [sub.id]);
      sub.topics = topics;
    }
    course.subjects = subjects;
    res.json({ success: true, data: { course } });
  } catch (error) {
    console.error('Get course detail error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──── Subjects CRUD (Admin) ────
router.post('/courses/:courseId/subjects', async (req, res) => {
  try {
    const { title, code, description } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Subject title is required.' });
    const [maxOrder] = await pool.query('SELECT COALESCE(MAX(sortOrder), 0) + 1 as next FROM courseSubjects WHERE courseId = ?', [req.params.courseId]);
    const [result] = await pool.query('INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, ?, ?, ?, ?)',
      [req.params.courseId, title, code || null, description || null, maxOrder[0].next]);
    res.status(201).json({ success: true, message: 'Subject added.', data: { id: result.insertId } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

router.put('/subjects/:id', async (req, res) => {
  try {
    const { title, code, description } = req.body;
    await pool.query('UPDATE courseSubjects SET title = COALESCE(?, title), code = COALESCE(?, code), description = COALESCE(?, description) WHERE id = ?', [title, code, description, req.params.id]);
    res.json({ success: true, message: 'Subject updated.' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

router.delete('/subjects/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courseSubjects WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Subject deleted.' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

// ──── Topics CRUD (Admin) ────
router.post('/subjects/:subjectId/topics', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Topic title is required.' });
    const [maxOrder] = await pool.query('SELECT COALESCE(MAX(sortOrder), 0) + 1 as next FROM courseTopics WHERE subjectId = ?', [req.params.subjectId]);
    const [result] = await pool.query('INSERT INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, ?, ?, ?)',
      [req.params.subjectId, title, description || null, maxOrder[0].next]);
    res.status(201).json({ success: true, message: 'Topic added.', data: { id: result.insertId } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

router.delete('/topics/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courseTopics WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Topic deleted.' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

// ──── Content CRUD (Admin) ────
router.get('/courses/:courseId/content', async (req, res) => {
  try {
    const [content] = await pool.query(`
      SELECT cc.*, u.fullName as uploaderName, cs.title as subjectTitle
      FROM courseContent cc LEFT JOIN users u ON cc.uploadedBy = u.id LEFT JOIN courseSubjects cs ON cc.subjectId = cs.id
      WHERE cc.courseId = ? ORDER BY cc.sortOrder ASC, cc.createdAt ASC
    `, [req.params.courseId]);
    res.json({ success: true, data: { content } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

router.post('/courses/:courseId/content', async (req, res) => {
  try {
    const { subjectId, title, description, contentType, contentData, sortOrder } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Content title is required.' });
    const [result] = await pool.query(
      'INSERT INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy) VALUES (?, NULLIF(?, 0), ?, ?, ?, ?, ?, ?, ?)',
      [req.params.courseId, subjectId || 0, title, description || null, contentType || 'text', contentData || null, sortOrder || 0, 'active', req.user.id]);
    res.status(201).json({ success: true, message: 'Content added.', data: { id: result.insertId } });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

router.put('/content/:id', async (req, res) => {
  try {
    const { title, description, contentType, contentData, sortOrder, status, subjectId } = req.body;
    await pool.query(
      `UPDATE courseContent SET title = COALESCE(?, title), description = COALESCE(?, description),
       contentType = COALESCE(?, contentType), contentData = COALESCE(?, contentData),
       sortOrder = COALESCE(?, sortOrder), status = COALESCE(?, status),
       subjectId = COALESCE(NULLIF(?, 0), subjectId) WHERE id = ?`,
      [title, description, contentType, contentData, sortOrder, status, subjectId || 0, req.params.id]);
    res.json({ success: true, message: 'Content updated.' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

router.delete('/content/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courseContent WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Content deleted.' });
  } catch (error) { res.status(500).json({ success: false, message: 'Server error.' }); }
});

// ──────────────── DOUBTS (Admin view all) ────────────────
router.get('/doubts', async (req, res) => {
  try {
    const [doubts] = await pool.query(`
      SELECT d.*, u.fullName as studentName, c.title as courseTitle, m.fullName as mentorName,
        (SELECT COUNT(*) FROM doubtReplies WHERE doubtId = d.id) as replyCount
      FROM doubts d
      JOIN users u ON d.studentId = u.id
      LEFT JOIN courses c ON d.courseId = c.id
      LEFT JOIN users m ON d.assignedMentorId = m.id
      ORDER BY d.createdAt DESC
    `);
    res.json({ success: true, data: { doubts } });
  } catch (error) {
    console.error('Admin get doubts error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── PERFORMANCE ANALYTICS ────────────────
router.get('/analytics', async (req, res) => {
  try {
    // Summary counts
    const [totalStudents] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const [totalMentors] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'mentor'");
    const [totalCourses] = await pool.query("SELECT COUNT(*) as count FROM courses");
    const [avgCompletion] = await pool.query("SELECT COALESCE(AVG(completionPercentage), 0) as avg FROM courseEnrollments");

    // Course completion rates
    const [courseCompletion] = await pool.query(`
      SELECT c.title, c.category,
        COUNT(ce.id) as totalEnrolled,
        COUNT(ce.id) as enrollmentCount,
        SUM(CASE WHEN ce.status = 'completed' THEN 1 ELSE 0 END) as completedCount,
        COALESCE(AVG(ce.completionPercentage), 0) as avgCompletion
      FROM courses c
      LEFT JOIN courseEnrollments ce ON c.id = ce.courseId
      GROUP BY c.id
      ORDER BY avgCompletion DESC
    `);

    // Top performing students
    const [topStudents] = await pool.query(`
      SELECT u.fullName, u.email,
        COUNT(ce.id) as enrolledCourses,
        COALESCE(AVG(ce.completionPercentage), 0) as avgCompletion
      FROM users u
      LEFT JOIN courseEnrollments ce ON u.id = ce.studentId
      WHERE u.role = 'student'
      GROUP BY u.id
      ORDER BY avgCompletion DESC
      LIMIT 10
    `);

    // Mentor stats
    const [mentorStats] = await pool.query(`
      SELECT u.fullName,
        COUNT(DISTINCT c.id) as totalCourses,
        COUNT(DISTINCT ce.studentId) as totalStudents,
        COALESCE(AVG(c.rating), 0) as avgRating
      FROM users u
      LEFT JOIN courses c ON u.id = c.mentorId
      LEFT JOIN courseEnrollments ce ON c.id = ce.courseId
      WHERE u.role = 'mentor'
      GROUP BY u.id
      ORDER BY avgRating DESC
    `);

    // Monthly registration trends
    const [registrationTrends] = await pool.query(`
      SELECT DATE_FORMAT(createdAt, '%Y-%m') as month,
        SUM(CASE WHEN role = 'student' THEN 1 ELSE 0 END) as newStudents,
        SUM(CASE WHEN role = 'mentor' THEN 1 ELSE 0 END) as mentors,
        COUNT(*) as enrollments
      FROM users
      WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 12 MONTH)
      GROUP BY month ORDER BY month
    `);

    res.json({
      success: true,
      data: {
        totalStudents: totalStudents[0].count,
        totalMentors: totalMentors[0].count,
        totalCourses: totalCourses[0].count,
        completionRate: Math.round(avgCompletion[0].avg),
        courseCompletion,
        topStudents,
        mentorStats,
        registrationTrends
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── SYSTEM REPORTS ────────────────
router.get('/reports', async (req, res) => {
  try {
    const [activityLogs] = await pool.query(`
      SELECT al.*, u.fullName, u.role as userRole
      FROM activityLogs al
      LEFT JOIN users u ON al.userId = u.id
      ORDER BY al.createdAt DESC LIMIT 50
    `);

    const [userStats] = await pool.query(`
      SELECT role, COUNT(*) as count, SUM(isActive) as activeCount, SUM(isVerified) as verifiedCount
      FROM users GROUP BY role
    `);

    const [contactMessages] = await pool.query(`
      SELECT * FROM contactMessages ORDER BY createdAt DESC LIMIT 20
    `);

    // Summary stats for cards
    const [totalUsersResult] = await pool.query("SELECT COUNT(*) as count FROM users");
    const [totalSubmissions] = await pool.query("SELECT COUNT(*) as count FROM assignmentSubmissions");
    const [totalEnrollments] = await pool.query("SELECT COUNT(*) as count FROM courseEnrollments");

    res.json({
      success: true,
      data: {
        activityLogs,
        userStats,
        contactMessages,
        totalUsers: totalUsersResult[0].count,
        totalSubmissions: totalSubmissions[0].count,
        totalEnrollments: totalEnrollments[0].count,
        totalContactMessages: contactMessages.length
      }
    });
  } catch (error) {
    console.error('Reports error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── SETTINGS ────────────────
router.get('/settings', async (req, res) => {
  try {
    const [settings] = await pool.query('SELECT * FROM systemSettings');
    const settingsObj = {};
    settings.forEach(s => { settingsObj[s.settingKey] = s.settingValue; });
    res.json({ success: true, data: { settings: settingsObj } });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/settings', async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await pool.query(
        'INSERT INTO systemSettings (settingKey, settingValue) VALUES (?, ?) ON DUPLICATE KEY UPDATE settingValue = ?',
        [key, value, value]
      );
    }
    res.json({ success: true, message: 'Settings updated successfully.' });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── NOTIFICATIONS ────────────────
router.get('/notifications', async (req, res) => {
  try {
    const [notifications] = await pool.query(
      'SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC LIMIT 20',
      [req.user.id]
    );
    const [unreadCount] = await pool.query(
      'SELECT COUNT(*) as count FROM notifications WHERE userId = ? AND isRead = 0',
      [req.user.id]
    );
    res.json({ success: true, data: { notifications, unreadCount: unreadCount[0].count } });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/notifications/read-all', async (req, res) => {
  try {
    await pool.query('UPDATE notifications SET isRead = 1 WHERE userId = ?', [req.user.id]);
    res.json({ success: true, message: 'All notifications marked as read.' });
  } catch (error) {
    console.error('Mark notifications error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── CONTACT MESSAGES ────────────────
router.get('/contact-messages', async (req, res) => {
  try {
    const [messages] = await pool.query('SELECT * FROM contactMessages ORDER BY createdAt DESC');
    res.json({ success: true, data: { messages } });
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/contact-messages/:id/read', async (req, res) => {
  try {
    await pool.query('UPDATE contactMessages SET isRead = 1 WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Message marked as read.' });
  } catch (error) {
    console.error('Mark message error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── DOWNLOAD UPLOADS (Profile Photos) ────────────────
router.get('/download-uploads', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads', 'profiles');
    if (!fs.existsSync(uploadsDir)) {
      return res.status(404).json({ success: false, message: 'No uploads folder found.' });
    }

    const files = fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
    if (files.length === 0) {
      return res.status(404).json({ success: false, message: 'No profile photos found.' });
    }

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=profile-photos.zip');

    const archive = archiver('zip', { zlib: { level: 6 } });
    archive.on('error', (err) => { throw err; });
    archive.pipe(res);

    for (const file of files) {
      archive.file(path.join(uploadsDir, file), { name: file });
    }

    await archive.finalize();
  } catch (error) {
    console.error('Download uploads error:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Failed to create zip.' });
    }
  }
});

// ──────────────── PROFILE REQUESTS MANAGEMENT ────────────────

// Get all profile requests with student info
router.get('/profile-requests', async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT pr.*, 
        s.fullName as studentName, s.email as studentEmail, s.rollNumber, s.college, s.department, s.year, s.profileImage as studentImage,
        r.fullName as reviewerName
       FROM profileRequests pr
       JOIN users s ON pr.studentId = s.id
       LEFT JOIN users r ON pr.reviewedBy = r.id
       ORDER BY FIELD(pr.status, 'pending', 'approved', 'rejected'), pr.createdAt DESC`
    );

    const pendingCount = requests.filter(r => r.status === 'pending').length;
    res.json({ success: true, data: { requests, pendingCount } });
  } catch (error) {
    console.error('Get profile requests error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Approve a profile request
router.put('/profile-requests/:id/approve', async (req, res) => {
  try {
    const { adminNote } = req.body;
    const [requests] = await pool.query(
      "SELECT * FROM profileRequests WHERE id = ? AND status = 'pending'",
      [req.params.id]
    );

    if (requests.length === 0) {
      return res.status(404).json({ success: false, message: 'Request not found or already processed.' });
    }

    const request = requests[0];

    if (request.type === 'edit' && request.requestData) {
      // Apply the requested edits to the student's profile
      const data = typeof request.requestData === 'string' ? JSON.parse(request.requestData) : request.requestData;
      const allowedFields = ['fullName', 'phone', 'countryCode', 'college', 'department', 'year', 'gender', 'dateOfBirth', 'address', 'bio', 'github', 'linkedin', 'hackerrank', 'leetcode'];
      const updates = [];
      const values = [];

      for (const [key, value] of Object.entries(data)) {
        if (allowedFields.includes(key)) {
          updates.push(`${key} = ?`);
          values.push(value);
        }
      }

      if (updates.length > 0) {
        values.push(request.studentId);
        await pool.query(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`, values);
      }
    } else if (request.type === 'delete') {
      // Deactivate the student account
      await pool.query('UPDATE users SET isActive = 0 WHERE id = ?', [request.studentId]);
    }

    // Mark request as approved
    await pool.query(
      'UPDATE profileRequests SET status = ?, adminNote = ?, reviewedBy = ?, reviewedAt = NOW() WHERE id = ?',
      ['approved', adminNote || null, req.user.id, req.params.id]
    );

    res.json({ success: true, message: `Request approved successfully.${request.type === 'edit' ? ' Student profile has been updated.' : ' Student account has been deactivated.'}` });
  } catch (error) {
    console.error('Approve profile request error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Reject a profile request
router.put('/profile-requests/:id/reject', async (req, res) => {
  try {
    const { adminNote } = req.body;

    if (!adminNote || adminNote.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide a reason for rejection.' });
    }

    const [requests] = await pool.query(
      "SELECT id FROM profileRequests WHERE id = ? AND status = 'pending'",
      [req.params.id]
    );

    if (requests.length === 0) {
      return res.status(404).json({ success: false, message: 'Request not found or already processed.' });
    }

    await pool.query(
      'UPDATE profileRequests SET status = ?, adminNote = ?, reviewedBy = ?, reviewedAt = NOW() WHERE id = ?',
      ['rejected', adminNote.trim(), req.user.id, req.params.id]
    );

    res.json({ success: true, message: 'Request rejected.' });
  } catch (error) {
    console.error('Reject profile request error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── LIST UPLOADS (Profile Photos) ────────────────
router.get('/list-uploads', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '..', 'uploads', 'profiles');
    if (!fs.existsSync(uploadsDir)) {
      return res.json({ success: true, files: [], totalSize: 0 });
    }

    const fileNames = fs.readdirSync(uploadsDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
    const files = fileNames.map(f => {
      const stat = fs.statSync(path.join(uploadsDir, f));
      return { name: f, size: stat.size, modified: stat.mtime };
    });

    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    res.json({ success: true, files, totalSize, count: files.length });
  } catch (error) {
    console.error('List uploads error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── REVENUE & PRICING MANAGEMENT (Admin) ────────────────

// Get overall revenue stats and transaction history
router.get('/revenue-analytics', async (req, res) => {
  try {
    const [[totalRevRow]] = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) as totalRevenue, COUNT(*) as totalTransactions
      FROM transactions WHERE status = 'success'
    `);

    const [[subCountRow]] = await pool.query(`
      SELECT COUNT(*) as activeSubscribers
      FROM userSubscriptions WHERE status = 'active' AND endDate > NOW()
    `);

    const [[courseSalesRow]] = await pool.query(`
      SELECT COUNT(*) as totalCourseSales, COALESCE(SUM(amount), 0) as courseRevenue
      FROM coursePurchases
    `);

    const [recentTransactions] = await pool.query(`
      SELECT t.*, u.fullName, u.email, u.role
      FROM transactions t
      JOIN users u ON t.userId = u.id
      ORDER BY t.createdAt DESC
      LIMIT 20
    `);

    const [plans] = await pool.query(`
      SELECT sp.*, COUNT(us.id) as activeSubscribers
      FROM subscriptionPlans sp
      LEFT JOIN userSubscriptions us ON sp.id = us.planId AND us.status = 'active' AND us.endDate > NOW()
      GROUP BY sp.id
      ORDER BY sp.id ASC
    `);

    const formattedPlans = plans.map(p => ({
      ...p,
      features: typeof p.features === 'string' ? JSON.parse(p.features) : (p.features || [])
    }));

    res.json({
      success: true,
      data: {
        totalRevenue: Number(totalRevRow.totalRevenue),
        totalTransactions: Number(totalRevRow.totalTransactions),
        activeSubscribers: Number(subCountRow.activeSubscribers),
        courseSalesCount: Number(courseSalesRow.totalCourseSales),
        courseRevenue: Number(courseSalesRow.courseRevenue),
        recentTransactions,
        plans: formattedPlans
      }
    });
  } catch (error) {
    console.error('Revenue analytics error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Update pricing plan details
router.put('/pricing-plans/:id', async (req, res) => {
  try {
    const { title, monthlyPrice, yearlyPrice, description, features, isPopular } = req.body;

    await pool.query(`
      UPDATE subscriptionPlans SET
        title = COALESCE(?, title),
        monthlyPrice = COALESCE(?, monthlyPrice),
        yearlyPrice = COALESCE(?, yearlyPrice),
        description = COALESCE(?, description),
        features = COALESCE(?, features),
        isPopular = COALESCE(?, isPopular)
      WHERE id = ?
    `, [title, monthlyPrice, yearlyPrice, description, features ? JSON.stringify(features) : null, isPopular, req.params.id]);

    res.json({ success: true, message: 'Pricing plan updated successfully.' });
  } catch (error) {
    console.error('Update pricing plan error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
