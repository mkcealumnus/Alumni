import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// All student routes require authentication + student role
router.use(authenticate, authorize('student'));

// ──────────────── DASHBOARD ────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const studentId = req.user.id;

    // Upcoming mentorships
    const [upcomingMentorships] = await pool.query(`
      SELECT m.*, u.fullName as alumniName, u.profileImage
      FROM mentorshipSessions m
      JOIN users u ON m.alumniId = u.id
      WHERE m.studentId = ? AND m.scheduledAt > NOW() AND m.status = 'approved'
      ORDER BY m.scheduledAt ASC LIMIT 5
    `, [studentId]);

    // Upcoming events
    const [upcomingEvents] = await pool.query(`
      SELECT e.*, u.fullName as alumniName
      FROM eventRegistrations er
      JOIN events e ON er.eventId = e.id
      JOIN users u ON e.alumniId = u.id
      WHERE er.studentId = ? AND e.startDate > NOW()
      ORDER BY e.startDate ASC LIMIT 5
    `, [studentId]);

    // Joined groups
    const [joinedGroups] = await pool.query(`
      SELECT g.*, u.fullName as creatorName
      FROM groupMembers gm
      JOIN groups g ON gm.groupId = g.id
      JOIN users u ON g.createdBy = u.id
      WHERE gm.userId = ?
      ORDER BY gm.joinedAt DESC LIMIT 5
    `, [studentId]);

    // Latest Jobs/Referrals
    const [latestJobs] = await pool.query(`
      SELECT j.*, u.fullName as alumniName
      FROM jobs j
      JOIN users u ON j.alumniId = u.id
      WHERE j.status = 'open'
      ORDER BY j.createdAt DESC LIMIT 5
    `);

    res.json({
      success: true,
      data: {
        upcomingMentorships,
        upcomingEvents,
        joinedGroups,
        latestJobs
      }
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MENTORSHIP ────────────────
router.get('/mentorships', async (req, res) => {
  try {
    const [sessions] = await pool.query(`
      SELECT m.*, u.fullName as alumniName, u.company, u.designation, u.profileImage
      FROM mentorshipSessions m
      JOIN users u ON m.alumniId = u.id
      WHERE m.studentId = ?
      ORDER BY m.scheduledAt DESC
    `, [req.user.id]);

    res.json({ success: true, data: { sessions } });
  } catch (error) {
    console.error('Get mentorships error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/mentorships/book', async (req, res) => {
  try {
    const { alumniId, topic, scheduledAt, duration, notes } = req.body;
    
    if (!alumniId || !topic || !scheduledAt) {
      return res.status(400).json({ success: false, message: 'Required fields missing.' });
    }

    await pool.query(`
      INSERT INTO mentorshipSessions (alumniId, studentId, topic, scheduledAt, duration, notes, status)
      VALUES (?, ?, ?, ?, ?, ?, 'pending')
    `, [alumniId, req.user.id, topic, scheduledAt, duration || 30, notes || null]);

    res.status(201).json({ success: true, message: 'Mentorship session requested successfully!' });
  } catch (error) {
    console.error('Book mentorship error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── ROADMAPS ────────────────
router.get('/roadmaps', async (req, res) => {
  try {
    const [roadmaps] = await pool.query(`
      SELECT r.*, u.fullName as alumniName, u.company
      FROM roadmaps r
      JOIN users u ON r.alumniId = u.id
      WHERE r.isPublished = 1
      ORDER BY r.createdAt DESC
    `);
    res.json({ success: true, data: { roadmaps } });
  } catch (error) {
    console.error('Get roadmaps error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/roadmaps/:id', async (req, res) => {
  try {
    const [roadmaps] = await pool.query(`
      SELECT r.*, u.fullName as alumniName, u.company
      FROM roadmaps r
      JOIN users u ON r.alumniId = u.id
      WHERE r.id = ? AND r.isPublished = 1
    `, [req.params.id]);

    if (roadmaps.length === 0) return res.status(404).json({ success: false, message: 'Roadmap not found.' });

    const [discussions] = await pool.query(`
      SELECT rd.*, u.fullName, u.role, u.profileImage
      FROM roadmapDiscussions rd
      JOIN users u ON rd.userId = u.id
      WHERE rd.roadmapId = ?
      ORDER BY rd.createdAt ASC
    `, [req.params.id]);

    res.json({ success: true, data: { roadmap: roadmaps[0], discussions } });
  } catch (error) {
    console.error('Get roadmap details error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/roadmaps/:id/discuss', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content is required.' });

    await pool.query(`
      INSERT INTO roadmapDiscussions (roadmapId, userId, content)
      VALUES (?, ?, ?)
    `, [req.params.id, req.user.id, content]);

    res.status(201).json({ success: true, message: 'Message posted.' });
  } catch (error) {
    console.error('Post discussion error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── GROUPS ────────────────
router.get('/groups', async (req, res) => {
  try {
    const [groups] = await pool.query(`
      SELECT g.*, u.fullName as creatorName,
      (SELECT COUNT(*) FROM groupMembers WHERE groupId = g.id) as memberCount,
      EXISTS(SELECT 1 FROM groupMembers WHERE groupId = g.id AND userId = ?) as isMember
      FROM groups g
      JOIN users u ON g.createdBy = u.id
      ORDER BY g.createdAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { groups } });
  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/groups/:id/join', async (req, res) => {
  try {
    const groupId = req.params.id;
    await pool.query(`
      INSERT IGNORE INTO groupMembers (groupId, userId) VALUES (?, ?)
    `, [groupId, req.user.id]);
    res.json({ success: true, message: 'Joined group successfully.' });
  } catch (error) {
    console.error('Join group error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/groups/:id/messages', async (req, res) => {
  try {
    const groupId = req.params.id;
    // Check membership
    const [member] = await pool.query('SELECT * FROM groupMembers WHERE groupId = ? AND userId = ?', [groupId, req.user.id]);
    if (member.length === 0) return res.status(403).json({ success: false, message: 'You must join this group first.' });

    const [messages] = await pool.query(`
      SELECT gm.*, u.fullName, u.role, u.profileImage
      FROM groupMessages gm
      JOIN users u ON gm.userId = u.id
      WHERE gm.groupId = ?
      ORDER BY gm.createdAt ASC
    `, [groupId]);

    res.json({ success: true, data: { messages } });
  } catch (error) {
    console.error('Get group messages error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/groups/:id/messages', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Message content is required.' });

    const groupId = req.params.id;
    const [member] = await pool.query('SELECT * FROM groupMembers WHERE groupId = ? AND userId = ?', [groupId, req.user.id]);
    if (member.length === 0) return res.status(403).json({ success: false, message: 'You must join this group first.' });

    await pool.query(`
      INSERT INTO groupMessages (groupId, userId, content) VALUES (?, ?, ?)
    `, [groupId, req.user.id, content]);

    res.status(201).json({ success: true, message: 'Message sent.' });
  } catch (error) {
    console.error('Send group message error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── JOBS ────────────────
router.get('/jobs', async (req, res) => {
  try {
    const [jobs] = await pool.query(`
      SELECT j.*, u.fullName as alumniName, u.company as alumniCompany
      FROM jobs j
      JOIN users u ON j.alumniId = u.id
      ORDER BY j.createdAt DESC
    `);
    res.json({ success: true, data: { jobs } });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── EVENTS ────────────────
router.get('/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, u.fullName as alumniName,
      (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as participantsCount,
      EXISTS(SELECT 1 FROM eventRegistrations WHERE eventId = e.id AND studentId = ?) as isRegistered
      FROM events e
      JOIN users u ON e.alumniId = u.id
      ORDER BY e.startDate ASC
    `, [req.user.id]);
    res.json({ success: true, data: { events } });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/events/:id/register', async (req, res) => {
  try {
    const eventId = req.params.id;
    const [event] = await pool.query('SELECT * FROM events WHERE id = ?', [eventId]);
    if (event.length === 0) return res.status(404).json({ success: false, message: 'Event not found.' });

    const [participants] = await pool.query('SELECT COUNT(*) as count FROM eventRegistrations WHERE eventId = ?', [eventId]);
    if (participants[0].count >= event[0].maxParticipants) return res.status(400).json({ success: false, message: 'Event is full.' });

    await pool.query(`
      INSERT IGNORE INTO eventRegistrations (eventId, studentId) VALUES (?, ?)
    `, [eventId, req.user.id]);
    
    res.json({ success: true, message: 'Registered for event successfully.' });
  } catch (error) {
    console.error('Event registration error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
