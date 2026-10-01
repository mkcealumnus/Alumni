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
    const [totalMentors] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'alumni'");
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
          totalAlumni: totalMentors[0].count, // using totalMentors var as proxy for now
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

// ──────────────── ADVANCE ACADEMIC YEAR ────────────────
router.put('/advance-academic-year', async (req, res) => {
  try {
    // 1. Move 'IV year' students to 'alumni' role
    await pool.query("UPDATE users SET role = 'alumni', year = 'Graduated' WHERE role = 'student' AND year = 'IV year'");
    
    // 2. Advance other years
    await pool.query("UPDATE users SET year = 'IV year' WHERE role = 'student' AND year = 'III year'");
    await pool.query("UPDATE users SET year = 'III year' WHERE role = 'student' AND year = 'II year'");
    await pool.query("UPDATE users SET year = 'II year' WHERE role = 'student' AND year = 'I year'");
    
    // Log the action
    await pool.query('INSERT INTO activityLogs (userId, action, description) VALUES (?, ?, ?)',
      [req.user.id, 'advance_academic_year', 'Admin advanced the academic year. Final year students became alumni.']);
    
    res.json({ success: true, message: 'Academic year advanced successfully. Final year students are now alumni.' });
  } catch (error) {
    console.error('Advance academic year error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
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


export default router;
