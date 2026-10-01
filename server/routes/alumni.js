import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// All alumni routes require authentication + alumni role (admin can also access)
router.use(authenticate, authorize('alumni', 'admin'));

// ──────────────── DASHBOARD ────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const alumniId = req.user.id;

    // Pending mentorship requests
    const [pendingMentorships] = await pool.query(`
      SELECT m.*, u.fullName as studentName, u.department, u.graduationYear
      FROM mentorshipSessions m
      JOIN users u ON m.studentId = u.id
      WHERE m.alumniId = ? AND m.status = 'pending'
      ORDER BY m.createdAt DESC LIMIT 5
    `, [alumniId]);

    // Active Jobs Posted
    const [activeJobs] = await pool.query(`
      SELECT j.*, (SELECT COUNT(*) FROM jobs WHERE alumniId = ?) as totalJobs
      FROM jobs j
      WHERE j.alumniId = ? AND j.status = 'open'
      ORDER BY j.createdAt DESC LIMIT 5
    `, [alumniId, alumniId]);

    // Upcoming Events
    const [upcomingEvents] = await pool.query(`
      SELECT e.*, (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as participantsCount
      FROM events e
      WHERE e.alumniId = ? AND e.startDate > NOW()
      ORDER BY e.startDate ASC LIMIT 5
    `, [alumniId]);

    // Groups created by alumni
    const [myGroups] = await pool.query(`
      SELECT g.*, (SELECT COUNT(*) FROM groupMembers WHERE groupId = g.id) as memberCount
      FROM groups g
      WHERE g.createdBy = ?
      ORDER BY g.createdAt DESC LIMIT 5
    `, [alumniId]);

    res.json({
      success: true,
      data: {
        pendingMentorships,
        activeJobs,
        upcomingEvents,
        myGroups
      }
    });
  } catch (error) {
    console.error('Alumni dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── MENTORSHIP SESSIONS ────────────────
router.get('/mentorships', async (req, res) => {
  try {
    const [sessions] = await pool.query(`
      SELECT m.*, u.fullName as studentName, u.department, u.graduationYear, u.profileImage
      FROM mentorshipSessions m
      JOIN users u ON m.studentId = u.id
      WHERE m.alumniId = ?
      ORDER BY m.scheduledAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { sessions } });
  } catch (error) {
    console.error('Get mentorships error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/mentorships/:id', async (req, res) => {
  try {
    const { status, meetingLink, notes } = req.body;
    
    await pool.query(`
      UPDATE mentorshipSessions 
      SET status = COALESCE(?, status), 
          meetingLink = COALESCE(?, meetingLink), 
          notes = COALESCE(?, notes)
      WHERE id = ? AND alumniId = ?
    `, [status, meetingLink, notes, req.params.id, req.user.id]);

    res.json({ success: true, message: 'Mentorship session updated.' });
  } catch (error) {
    console.error('Update mentorship error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── ROADMAPS ────────────────
router.get('/roadmaps', async (req, res) => {
  try {
    const [roadmaps] = await pool.query(`
      SELECT r.*, 
      (SELECT COUNT(*) FROM roadmapDiscussions WHERE roadmapId = r.id) as discussionCount
      FROM roadmaps r
      WHERE r.alumniId = ?
      ORDER BY r.createdAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { roadmaps } });
  } catch (error) {
    console.error('Get roadmaps error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/roadmaps', async (req, res) => {
  try {
    const { title, description, domain, isPublished } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });

    const [result] = await pool.query(`
      INSERT INTO roadmaps (alumniId, title, description, domain, isPublished)
      VALUES (?, ?, ?, ?, ?)
    `, [req.user.id, title, description, domain, isPublished || 0]);
    
    res.status(201).json({ success: true, message: 'Roadmap created.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create roadmap error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/roadmaps/:id', async (req, res) => {
  try {
    const { title, description, domain, isPublished } = req.body;
    await pool.query(`
      UPDATE roadmaps 
      SET title = COALESCE(?, title), description = COALESCE(?, description),
          domain = COALESCE(?, domain), isPublished = COALESCE(?, isPublished)
      WHERE id = ? AND alumniId = ?
    `, [title, description, domain, isPublished, req.params.id, req.user.id]);
    res.json({ success: true, message: 'Roadmap updated.' });
  } catch (error) {
    console.error('Update roadmap error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/roadmaps/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM roadmaps WHERE id = ? AND alumniId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Roadmap deleted.' });
  } catch (error) {
    console.error('Delete roadmap error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── GROUPS ────────────────
router.get('/groups', async (req, res) => {
  try {
    const [groups] = await pool.query(`
      SELECT g.*, 
      (SELECT COUNT(*) FROM groupMembers WHERE groupId = g.id) as memberCount
      FROM groups g
      WHERE g.createdBy = ?
      ORDER BY g.createdAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { groups } });
  } catch (error) {
    console.error('Get groups error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/groups', async (req, res) => {
  try {
    const { name, description, domain } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Group name is required.' });

    const [result] = await pool.query(`
      INSERT INTO groups (name, description, createdBy, domain)
      VALUES (?, ?, ?, ?)
    `, [name, description, req.user.id, domain]);

    // Add alumni to their own group
    await pool.query('INSERT INTO groupMembers (groupId, userId) VALUES (?, ?)', [result.insertId, req.user.id]);

    res.status(201).json({ success: true, message: 'Group created.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create group error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/groups/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM groups WHERE id = ? AND createdBy = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Group deleted.' });
  } catch (error) {
    console.error('Delete group error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── JOBS ────────────────
router.get('/jobs', async (req, res) => {
  try {
    const [jobs] = await pool.query(`
      SELECT * FROM jobs
      WHERE alumniId = ?
      ORDER BY createdAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { jobs } });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/jobs', async (req, res) => {
  try {
    const { title, company, location, type, description, requirements, applyLink, isReferral } = req.body;
    if (!title || !company || !description) return res.status(400).json({ success: false, message: 'Title, company, and description are required.' });

    const [result] = await pool.query(`
      INSERT INTO jobs (alumniId, title, company, location, type, description, requirements, applyLink, isReferral)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [req.user.id, title, company, location, type || 'full-time', description, requirements, applyLink, isReferral || 0]);
    
    res.status(201).json({ success: true, message: 'Job posted.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/jobs/:id', async (req, res) => {
  try {
    const { title, company, location, type, description, requirements, applyLink, isReferral, status } = req.body;
    await pool.query(`
      UPDATE jobs 
      SET title = COALESCE(?, title), company = COALESCE(?, company), location = COALESCE(?, location),
          type = COALESCE(?, type), description = COALESCE(?, description), requirements = COALESCE(?, requirements),
          applyLink = COALESCE(?, applyLink), isReferral = COALESCE(?, isReferral), status = COALESCE(?, status)
      WHERE id = ? AND alumniId = ?
    `, [title, company, location, type, description, requirements, applyLink, isReferral, status, req.params.id, req.user.id]);
    res.json({ success: true, message: 'Job updated.' });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/jobs/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM jobs WHERE id = ? AND alumniId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Job deleted.' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── EVENTS ────────────────
router.get('/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*,
        (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as registrationCount
      FROM events e
      WHERE e.alumniId = ?
      ORDER BY e.startDate DESC
    `, [req.user.id]);
    res.json({ success: true, data: { events } });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/events', async (req, res) => {
  try {
    const { title, description, eventType, startDate, endDate, meetingLink, maxParticipants } = req.body;
    if (!title || !startDate || !endDate) return res.status(400).json({ success: false, message: 'Title, start date, and end date are required.' });

    const [result] = await pool.query(`
      INSERT INTO events (alumniId, title, description, eventType, startDate, endDate, meetingLink, maxParticipants)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [req.user.id, title, description, eventType || 'workshop', startDate, endDate, meetingLink, maxParticipants || 100]);
    
    res.status(201).json({ success: true, message: 'Event created.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    const { title, description, eventType, startDate, endDate, meetingLink, maxParticipants } = req.body;
    await pool.query(`
      UPDATE events 
      SET title = COALESCE(?, title), description = COALESCE(?, description), eventType = COALESCE(?, eventType),
          startDate = COALESCE(?, startDate), endDate = COALESCE(?, endDate), meetingLink = COALESCE(?, meetingLink),
          maxParticipants = COALESCE(?, maxParticipants)
      WHERE id = ? AND alumniId = ?
    `, [title, description, eventType, startDate, endDate, meetingLink, maxParticipants, req.params.id, req.user.id]);
    res.json({ success: true, message: 'Event updated.' });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = ? AND alumniId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Event deleted.' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
