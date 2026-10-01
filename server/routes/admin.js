import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// All admin routes require authentication + admin role
router.use(authenticate, authorize('admin'));

// ──────────────── DASHBOARD STATS ────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const [totalStudents] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'student'");
    const [totalAlumni] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'alumni'");
    const [totalMentorships] = await pool.query("SELECT COUNT(*) as count FROM mentorshipSessions");
    const [totalJobs] = await pool.query("SELECT COUNT(*) as count FROM jobs");
    const [totalEvents] = await pool.query("SELECT COUNT(*) as count FROM events");
    const [totalRoadmaps] = await pool.query("SELECT COUNT(*) as count FROM roadmaps");
    
    // Recent Activities
    const [recentActivities] = await pool.query(`
      SELECT al.*, u.fullName, u.role as userRole
      FROM activityLogs al
      LEFT JOIN users u ON al.userId = u.id
      ORDER BY al.createdAt DESC LIMIT 10
    `);

    // Recent Registrations
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
          totalAlumni: totalAlumni[0].count,
          totalMentorships: totalMentorships[0].count,
          totalJobs: totalJobs[0].count,
          totalEvents: totalEvents[0].count,
          totalRoadmaps: totalRoadmaps[0].count,
        },
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
router.get('/students', async (req, res) => {
  try {
    const { search, status, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT id, email, username, fullName, phone, department, graduationYear, profileImage, isVerified, isActive, createdAt FROM users WHERE role = 'student'";
    const params = [];

    if (search) {
      query += ' AND (fullName LIKE ? OR email LIKE ? OR username LIKE ? OR department LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
    }
    if (status === 'active') { query += ' AND isActive = 1'; }
    if (status === 'inactive') { query += ' AND isActive = 0'; }

    const [countResult] = await pool.query(query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) as total FROM'), params);
    
    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [students] = await pool.query(query, params);

    res.json({
      success: true,
      data: { students, total: countResult[0].total, page: Number(page), limit: Number(limit) }
    });
  } catch (error) {
    console.error('Get students error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/students', async (req, res) => {
  try {
    const { email, username, fullName, password, phone, department, graduationYear } = req.body;
    if (!email || !username || !fullName || !password) return res.status(400).json({ success: false, message: 'Missing fields.' });

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email.toLowerCase(), username.toLowerCase()]);
    if (existing.length > 0) return res.status(409).json({ success: false, message: 'User exists.' });

    const [result] = await pool.query(`
      INSERT INTO users (email, username, fullName, password, phone, department, graduationYear, role, isVerified, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'student', 1, 1)
    `, [email.toLowerCase(), username.toLowerCase(), fullName, password, phone, department, graduationYear]);

    await pool.query('INSERT INTO activityLogs (userId, action, description) VALUES (?, ?, ?)',
      [req.user.id, 'admin_create_student', `Admin created student: ${fullName}`]);

    res.status(201).json({ success: true, message: 'Student created.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/students/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ? AND role = 'student'", [req.params.id]);
    res.json({ success: true, message: 'Student deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MANAGE ALUMNI ────────────────
router.get('/alumni', async (req, res) => {
  try {
    const { search, page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;

    let query = "SELECT id, email, username, fullName, phone, company, designation, graduationYear, department, profileImage, isVerified, isActive, createdAt FROM users WHERE role = 'alumni'";
    const params = [];

    if (search) {
      query += ' AND (fullName LIKE ? OR email LIKE ? OR company LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [countResult] = await pool.query(query.replace(/SELECT.*FROM/, 'SELECT COUNT(*) as total FROM'), params);
    
    query += ' ORDER BY createdAt DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    const [alumni] = await pool.query(query, params);

    res.json({
      success: true,
      data: { alumni, total: countResult[0].total, page: Number(page), limit: Number(limit) }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/alumni', async (req, res) => {
  try {
    const { email, username, fullName, password, company, designation, department, graduationYear } = req.body;
    if (!email || !username || !fullName || !password) return res.status(400).json({ success: false, message: 'Missing fields.' });

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ? OR username = ?', [email.toLowerCase(), username.toLowerCase()]);
    if (existing.length > 0) return res.status(409).json({ success: false, message: 'User exists.' });

    await pool.query(`
      INSERT INTO users (email, username, fullName, password, company, designation, department, graduationYear, role, isVerified, isActive)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'alumni', 1, 1)
    `, [email.toLowerCase(), username.toLowerCase(), fullName, password, company, designation, department, graduationYear]);

    res.status(201).json({ success: true, message: 'Alumni created.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/alumni/:id', async (req, res) => {
  try {
    await pool.query("DELETE FROM users WHERE id = ? AND role = 'alumni'", [req.params.id]);
    res.json({ success: true, message: 'Alumni deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── ANALYTICS ────────────────
router.get('/analytics', async (req, res) => {
  try {
    const [mentorshipStats] = await pool.query(`
      SELECT status, COUNT(*) as count FROM mentorshipSessions GROUP BY status
    `);
    const [jobStats] = await pool.query(`
      SELECT status, COUNT(*) as count FROM jobs GROUP BY status
    `);
    const [eventStats] = await pool.query(`
      SELECT e.title, (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as registrations
      FROM events e ORDER BY registrations DESC LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        mentorshipStats,
        jobStats,
        eventStats
      }
    });
  } catch (error) {
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
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
