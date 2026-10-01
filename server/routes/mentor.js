import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

// All mentor/creator/manager routes require authentication + mentor, instructor, admin, creator, or manager role
router.use(authenticate, authorize('mentor', 'admin', 'instructor', 'creator', 'manager'));

// ──────────────── DASHBOARD ────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const mentorId = req.user.id;

    const [totalCourses] = await pool.query('SELECT COUNT(*) as count FROM courses WHERE mentorId = ?', [mentorId]);
    const [totalStudents] = await pool.query(`
      SELECT COUNT(DISTINCT ce.studentId) as count
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      WHERE c.mentorId = ?
    `, [mentorId]);
    const [totalAssignments] = await pool.query('SELECT COUNT(*) as count FROM assignments WHERE mentorId = ?', [mentorId]);
    const [pendingSubmissions] = await pool.query(`
      SELECT COUNT(*) as count FROM assignmentSubmissions asub
      JOIN assignments a ON asub.assignmentId = a.id
      WHERE a.mentorId = ? AND asub.score IS NULL
    `, [mentorId]);
    const [totalEvents] = await pool.query('SELECT COUNT(*) as count FROM events WHERE mentorId = ?', [mentorId]);
    const [avgCompletion] = await pool.query(`
      SELECT COALESCE(AVG(ce.completionPercentage), 0) as avg
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      WHERE c.mentorId = ?
    `, [mentorId]);

    // Recent submissions
    const [recentSubmissions] = await pool.query(`
      SELECT asub.*, a.title as assignmentTitle, u.fullName as studentName
      FROM assignmentSubmissions asub
      JOIN assignments a ON asub.assignmentId = a.id
      JOIN users u ON asub.studentId = u.id
      WHERE a.mentorId = ?
      ORDER BY asub.submittedAt DESC LIMIT 5
    `, [mentorId]);

    // Upcoming events
    const [upcomingEvents] = await pool.query(`
      SELECT e.*, (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as registrationCount
      FROM events e
      WHERE e.mentorId = ? AND e.startDate > NOW()
      ORDER BY e.startDate ASC LIMIT 5
    `, [mentorId]);

    res.json({
      success: true,
      data: {
        stats: {
          totalCourses: totalCourses[0].count,
          totalStudents: totalStudents[0].count,
          totalAssignments: totalAssignments[0].count,
          pendingSubmissions: pendingSubmissions[0].count,
          totalEvents: totalEvents[0].count,
          avgCompletion: Math.round(avgCompletion[0].avg)
        },
        recentSubmissions,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Mentor dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── COURSES (CRUD + Subjects + Topics + Content) ────────────────
router.get('/courses', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as enrollmentCount,
        (SELECT COALESCE(AVG(completionPercentage), 0) FROM courseEnrollments WHERE courseId = c.id) as avgCompletion,
        (SELECT COUNT(*) FROM courseSubjects WHERE courseId = c.id) as subjectCount,
        (SELECT COUNT(*) FROM courseContent WHERE courseId = c.id AND status = 'active') as contentCount
      FROM courses c
      WHERE c.mentorId = ?
      ORDER BY c.createdAt DESC
    `, [req.user.id]);

    res.json({ success: true, data: { courses } });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/courses', async (req, res) => {
  try {
    const { title, courseCode, description, image, duration, category, courseType, difficulty, semester, regulation, academicYear, maxStudents, status, subjects } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Course title is required.' });
    }

    // Mentors create as pending (admin approval needed) unless admin is creating
    const courseStatus = req.user.role === 'admin' ? (status || 'active') : 'pending';
    const isPublished = courseStatus === 'active' ? 1 : 0;

    const [result] = await pool.query(
      `INSERT INTO courses (title, courseCode, description, image, duration, mentorId, category, courseType, difficulty, semester, regulation, academicYear, maxStudents, isPublished, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, courseCode, description, image, duration, req.user.id, category, courseType || 'theory', difficulty || 'beginner', semester, regulation, academicYear, maxStudents || 100, isPublished, courseStatus]
    );

    // Add subjects/units if provided
    if (subjects && Array.isArray(subjects)) {
      for (let i = 0; i < subjects.length; i++) {
        if (subjects[i].title) {
          await pool.query(
            'INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, ?, ?, ?, ?)',
            [result.insertId, subjects[i].title, subjects[i].code || null, subjects[i].description || null, i + 1]
          );
        }
      }
    }

    res.status(201).json({ success: true, message: 'Course created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/courses/:id', async (req, res) => {
  try {
    const { title, courseCode, description, image, duration, category, courseType, difficulty, semester, regulation, academicYear, maxStudents, isPublished, status } = req.body;

    // Build dynamic update
    const updates = [];
    const params = [];
    const fields = { title, courseCode, description, image, duration, category, courseType, difficulty, semester, regulation, academicYear, maxStudents, isPublished, status };

    for (const [key, val] of Object.entries(fields)) {
      if (val !== undefined) {
        updates.push(`${key} = ?`);
        params.push(val);
      }
    }

    if (updates.length === 0) return res.status(400).json({ success: false, message: 'No fields to update.' });

    params.push(req.params.id, req.user.id);
    await pool.query(`UPDATE courses SET ${updates.join(', ')} WHERE id = ? AND mentorId = ?`, params);

    res.json({ success: true, message: 'Course updated successfully.' });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/courses/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courses WHERE id = ? AND mentorId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Course deleted successfully.' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get course detail with subjects, topics, and content counts
router.get('/courses/:id/detail', async (req, res) => {
  try {
    const [courses] = await pool.query(`
      SELECT c.*, u.fullName as mentorName,
        (SELECT COUNT(*) FROM courseEnrollments WHERE courseId = c.id) as enrollmentCount,
        (SELECT COUNT(*) FROM courseContent WHERE courseId = c.id AND status = 'active') as contentCount
      FROM courses c
      JOIN users u ON c.mentorId = u.id
      WHERE c.id = ? AND c.mentorId = ?
    `, [req.params.id, req.user.id]);

    if (courses.length === 0) return res.status(404).json({ success: false, message: 'Course not found.' });

    const course = courses[0];

    // Get subjects with topic counts
    const [subjects] = await pool.query(`
      SELECT cs.*,
        (SELECT COUNT(*) FROM courseTopics WHERE subjectId = cs.id) as topicCount,
        (SELECT COUNT(*) FROM courseContent WHERE subjectId = cs.id AND status = 'active') as contentCount
      FROM courseSubjects cs WHERE cs.courseId = ? ORDER BY cs.sortOrder ASC, cs.createdAt ASC
    `, [req.params.id]);

    // Get topics for each subject
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

// ──────────────── SUBJECTS (Units within a Course) ────────────────
router.get('/courses/:courseId/subjects', async (req, res) => {
  try {
    const [subjects] = await pool.query(`
      SELECT cs.*, (SELECT COUNT(*) FROM courseTopics WHERE subjectId = cs.id) as topicCount
      FROM courseSubjects cs WHERE cs.courseId = ? ORDER BY cs.sortOrder ASC, cs.createdAt ASC
    `, [req.params.courseId]);
    res.json({ success: true, data: { subjects } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/courses/:courseId/subjects', async (req, res) => {
  try {
    const { title, code, description } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Subject title is required.' });

    // Get max sortOrder
    const [maxOrder] = await pool.query('SELECT COALESCE(MAX(sortOrder), 0) + 1 as next FROM courseSubjects WHERE courseId = ?', [req.params.courseId]);

    const [result] = await pool.query(
      'INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, ?, ?, ?, ?)',
      [req.params.courseId, title, code || null, description || null, maxOrder[0].next]
    );
    res.status(201).json({ success: true, message: 'Subject added.', data: { id: result.insertId } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/subjects/:id', async (req, res) => {
  try {
    const { title, code, description } = req.body;
    await pool.query(
      'UPDATE courseSubjects SET title = COALESCE(?, title), code = COALESCE(?, code), description = COALESCE(?, description) WHERE id = ?',
      [title, code, description, req.params.id]
    );
    res.json({ success: true, message: 'Subject updated.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/subjects/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courseSubjects WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Subject deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── TOPICS (within Subjects) ────────────────
router.get('/subjects/:subjectId/topics', async (req, res) => {
  try {
    const [topics] = await pool.query('SELECT * FROM courseTopics WHERE subjectId = ? ORDER BY sortOrder ASC, createdAt ASC', [req.params.subjectId]);
    res.json({ success: true, data: { topics } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/subjects/:subjectId/topics', async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Topic title is required.' });

    const [maxOrder] = await pool.query('SELECT COALESCE(MAX(sortOrder), 0) + 1 as next FROM courseTopics WHERE subjectId = ?', [req.params.subjectId]);

    const [result] = await pool.query(
      'INSERT INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, ?, ?, ?)',
      [req.params.subjectId, title, description || null, maxOrder[0].next]
    );
    res.status(201).json({ success: true, message: 'Topic added.', data: { id: result.insertId } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/topics/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courseTopics WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Topic deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── COURSE CONTENT (Video / PDF / Text) ────────────────
router.get('/courses/:courseId/content', async (req, res) => {
  try {
    const [content] = await pool.query(`
      SELECT cc.*, u.fullName as uploaderName, cs.title as subjectTitle
      FROM courseContent cc
      LEFT JOIN users u ON cc.uploadedBy = u.id
      LEFT JOIN courseSubjects cs ON cc.subjectId = cs.id
      WHERE cc.courseId = ? ORDER BY cc.sortOrder ASC, cc.createdAt ASC
    `, [req.params.courseId]);
    res.json({ success: true, data: { content } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/courses/:courseId/content', async (req, res) => {
  try {
    const { subjectId, title, description, contentType, contentData, sortOrder } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Content title is required.' });

    const [result] = await pool.query(
      'INSERT INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy) VALUES (?, NULLIF(?, 0), ?, ?, ?, ?, ?, ?, ?)',
      [req.params.courseId, subjectId || 0, title, description || null, contentType || 'text', contentData || null, sortOrder || 0, 'active', req.user.id]
    );
    res.status(201).json({ success: true, message: 'Content added.', data: { id: result.insertId } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/content/:id', async (req, res) => {
  try {
    const { title, description, contentType, contentData, sortOrder, status, subjectId } = req.body;
    await pool.query(
      `UPDATE courseContent SET title = COALESCE(?, title), description = COALESCE(?, description),
       contentType = COALESCE(?, contentType), contentData = COALESCE(?, contentData),
       sortOrder = COALESCE(?, sortOrder), status = COALESCE(?, status),
       subjectId = COALESCE(NULLIF(?, 0), subjectId) WHERE id = ?`,
      [title, description, contentType, contentData, sortOrder, status, subjectId || 0, req.params.id]
    );
    res.json({ success: true, message: 'Content updated.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/content/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM courseContent WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Content deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── ASSIGNMENTS (CRUD) ────────────────
router.get('/assignments', async (req, res) => {
  try {
    const [assignments] = await pool.query(`
      SELECT a.*, c.title as courseTitle,
        (SELECT COUNT(*) FROM assignmentSubmissions WHERE assignmentId = a.id) as submissionCount,
        (SELECT COUNT(*) FROM assignmentSubmissions WHERE assignmentId = a.id AND score IS NOT NULL) as gradedCount
      FROM assignments a
      JOIN courses c ON a.courseId = c.id
      WHERE a.mentorId = ?
      ORDER BY a.createdAt DESC
    `, [req.user.id]);

    res.json({ success: true, data: { assignments } });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/assignments', async (req, res) => {
  try {
    const { courseId, title, description, dueDate, maxScore } = req.body;

    if (!courseId || !title || !dueDate) {
      return res.status(400).json({ success: false, message: 'Course, title, and due date are required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO assignments (courseId, mentorId, title, description, dueDate, maxScore, isPublished) VALUES (?, ?, ?, ?, ?, ?, 1)',
      [courseId, req.user.id, title, description, dueDate, maxScore || 100]
    );

    res.status(201).json({ success: true, message: 'Assignment created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/assignments/:id', async (req, res) => {
  try {
    const { title, description, dueDate, maxScore, isPublished } = req.body;

    await pool.query(
      `UPDATE assignments SET title = COALESCE(?, title), description = COALESCE(?, description),
       dueDate = COALESCE(?, dueDate), maxScore = COALESCE(?, maxScore), isPublished = COALESCE(?, isPublished)
       WHERE id = ? AND mentorId = ?`,
      [title, description, dueDate, maxScore, isPublished, req.params.id, req.user.id]
    );

    res.json({ success: true, message: 'Assignment updated successfully.' });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/assignments/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM assignments WHERE id = ? AND mentorId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Assignment deleted successfully.' });
  } catch (error) {
    console.error('Delete assignment error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Grade a submission
router.put('/submissions/:id/grade', async (req, res) => {
  try {
    const { score, feedback } = req.body;

    await pool.query(
      'UPDATE assignmentSubmissions SET score = ?, feedback = ?, gradedAt = NOW(), gradedBy = ? WHERE id = ?',
      [score, feedback, req.user.id, req.params.id]
    );

    // Also insert to grades table
    const [submission] = await pool.query(`
      SELECT asub.*, a.courseId, a.maxScore FROM assignmentSubmissions asub
      JOIN assignments a ON asub.assignmentId = a.id WHERE asub.id = ?
    `, [req.params.id]);

    if (submission.length > 0) {
      const s = submission[0];
      const percentage = (score / s.maxScore) * 100;
      await pool.query(
        'INSERT INTO grades (studentId, courseId, assignmentId, gradeType, score, maxScore, percentage) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [s.studentId, s.courseId, s.assignmentId, 'assignment', score, s.maxScore, percentage]
      );
    }

    res.json({ success: true, message: 'Submission graded successfully.' });
  } catch (error) {
    console.error('Grade submission error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get submissions for an assignment
router.get('/assignments/:id/submissions', async (req, res) => {
  try {
    const [submissions] = await pool.query(`
      SELECT asub.*, u.fullName as studentName, u.email as studentEmail
      FROM assignmentSubmissions asub
      JOIN users u ON asub.studentId = u.id
      WHERE asub.assignmentId = ?
      ORDER BY asub.submittedAt DESC
    `, [req.params.id]);

    res.json({ success: true, data: { submissions } });
  } catch (error) {
    console.error('Get submissions error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── STUDENT PROGRESS ────────────────
router.get('/students-progress', async (req, res) => {
  try {
    const [students] = await pool.query(`
      SELECT DISTINCT u.id, u.fullName, u.email, u.profileImage,
        COALESCE(AVG(ce.completionPercentage), 0) as avgCompletion,
        COUNT(DISTINCT ce.courseId) as enrolledCourses,
        (SELECT COUNT(*) FROM assignmentSubmissions asub
         JOIN assignments a ON asub.assignmentId = a.id
         WHERE asub.studentId = u.id AND a.mentorId = ?) as totalSubmissions
      FROM users u
      JOIN courseEnrollments ce ON u.id = ce.studentId
      JOIN courses c ON ce.courseId = c.id
      WHERE c.mentorId = ? AND u.role = 'student'
      GROUP BY u.id
      ORDER BY avgCompletion DESC
    `, [req.user.id, req.user.id]);

    res.json({ success: true, data: { students } });
  } catch (error) {
    console.error('Students progress error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── CODING PROBLEMS ────────────────
router.get('/problems', async (req, res) => {
  try {
    const ownOnly = req.query.ownOnly === 'true';
    let sql = `
      SELECT cp.*,
        (SELECT COUNT(*) FROM codingSubmissions WHERE problemId = cp.id) as submissionCount,
        (SELECT COUNT(*) FROM codingSubmissions WHERE problemId = cp.id AND status = 'accepted') as acceptedCount
      FROM codingProblems cp
    `;
    const params = [];

    if (ownOnly && req.user.role !== 'admin') {
      sql += ` WHERE cp.mentorId = ?`;
      params.push(req.user.id);
    }

    sql += ` ORDER BY cp.id ASC`;

    const [problems] = await pool.query(sql, params);

    res.json({ success: true, data: { problems } });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/problems', async (req, res) => {
  try {
    const { title, description, difficulty, category, inputFormat, outputFormat, constraints, sampleInput, sampleOutput, testCases } = req.body;

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required.' });
    }

    const [result] = await pool.query(
      `INSERT INTO codingProblems (mentorId, title, description, difficulty, category, inputFormat, outputFormat, constraints, sampleInput, sampleOutput, testCases)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, title, description, difficulty || 'easy', category, inputFormat, outputFormat, constraints, sampleInput, sampleOutput, JSON.stringify(testCases || [])]
    );

    res.status(201).json({ success: true, message: 'Problem created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create problem error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/problems/:id', async (req, res) => {
  try {
    const { title, description, difficulty, category, inputFormat, outputFormat, constraints, sampleInput, sampleOutput, testCases } = req.body;

    let sql = `UPDATE codingProblems SET title = COALESCE(?, title), description = COALESCE(?, description),
       difficulty = COALESCE(?, difficulty), category = COALESCE(?, category),
       inputFormat = COALESCE(?, inputFormat), outputFormat = COALESCE(?, outputFormat),
       constraints = COALESCE(?, constraints), sampleInput = COALESCE(?, sampleInput),
       sampleOutput = COALESCE(?, sampleOutput), testCases = COALESCE(?, testCases)
       WHERE id = ?`;
    const params = [title, description, difficulty, category, inputFormat, outputFormat, constraints, sampleInput, sampleOutput,
       testCases ? JSON.stringify(testCases) : null, req.params.id];

    if (req.user.role !== 'admin') {
      sql += ` AND mentorId = ?`;
      params.push(req.user.id);
    }

    await pool.query(sql, params);

    res.json({ success: true, message: 'Problem updated successfully.' });
  } catch (error) {
    console.error('Update problem error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/problems/:id', async (req, res) => {
  try {
    let sql = 'DELETE FROM codingProblems WHERE id = ?';
    const params = [req.params.id];
    if (req.user.role !== 'admin') {
      sql += ' AND mentorId = ?';
      params.push(req.user.id);
    }
    await pool.query(sql, params);
    res.json({ success: true, message: 'Problem deleted successfully.' });
  } catch (error) {
    console.error('Delete problem error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── APTITUDE TESTS ────────────────
router.get('/aptitude-tests', async (req, res) => {
  try {
    const ownOnly = req.query.ownOnly === 'true';
    let sql = `
      SELECT at.*,
        (SELECT COUNT(*) FROM aptitudeQuestions WHERE testId = at.id) as questionCount,
        (SELECT COUNT(*) FROM aptitudeTestAttempts WHERE testId = at.id) as attemptCount
      FROM aptitudeTests at
    `;
    const params = [];

    if (ownOnly && req.user.role !== 'admin') {
      sql += ` WHERE at.mentorId = ?`;
      params.push(req.user.id);
    }

    sql += ` ORDER BY at.id ASC`;

    const [tests] = await pool.query(sql, params);

    res.json({ success: true, data: { tests } });
  } catch (error) {
    console.error('Get aptitude tests error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/aptitude-tests', async (req, res) => {
  try {
    const { title, description, duration, questions } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Test title is required.' });
    }

    const totalQuestions = questions ? questions.length : 0;
    const totalMarks = questions ? questions.reduce((sum, q) => sum + (q.marks || 1), 0) : 0;

    const [result] = await pool.query(
      'INSERT INTO aptitudeTests (mentorId, title, description, duration, totalQuestions, totalMarks, isPublished) VALUES (?, ?, ?, ?, ?, ?, 1)',
      [req.user.id, title, description, duration || 30, totalQuestions, totalMarks]
    );

    // Insert questions
    if (questions && questions.length > 0) {
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        await pool.query(
          'INSERT INTO aptitudeQuestions (testId, question, optionA, optionB, optionC, optionD, correctOption, marks, explanation, orderIndex) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [result.insertId, q.question, q.optionA, q.optionB, q.optionC, q.optionD, q.correctOption, q.marks || 1, q.explanation, i + 1]
        );
      }
    }

    res.status(201).json({ success: true, message: 'Aptitude test created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create aptitude test error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/aptitude-tests/:id', async (req, res) => {
  try {
    const [tests] = await pool.query('SELECT * FROM aptitudeTests WHERE id = ? AND mentorId = ?', [req.params.id, req.user.id]);
    if (tests.length === 0) return res.status(404).json({ success: false, message: 'Test not found.' });

    const [questions] = await pool.query('SELECT * FROM aptitudeQuestions WHERE testId = ? ORDER BY orderIndex', [req.params.id]);
    const [attempts] = await pool.query(`
      SELECT ata.*, u.fullName as studentName
      FROM aptitudeTestAttempts ata
      JOIN users u ON ata.studentId = u.id
      WHERE ata.testId = ?
      ORDER BY ata.startedAt DESC
    `, [req.params.id]);

    res.json({ success: true, data: { test: tests[0], questions, attempts } });
  } catch (error) {
    console.error('Get aptitude test error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/aptitude-tests/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM aptitudeTests WHERE id = ? AND mentorId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Aptitude test deleted successfully.' });
  } catch (error) {
    console.error('Delete aptitude test error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── EVENTS ────────────────
router.get('/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*,
        DATE_FORMAT(e.startDate, '%Y-%m-%d') as eventDate,
        DATE_FORMAT(e.startDate, '%H:%i') as eventTime,
        TIMESTAMPDIFF(MINUTE, e.startDate, e.endDate) as duration,
        (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as registrationCount
      FROM events e
      WHERE e.mentorId = ?
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
    let { title, description, eventType, startDate, endDate, location, maxParticipants, eventDate, eventTime, duration } = req.body;

    // Support frontend format: eventDate + eventTime + duration → startDate + endDate
    if (!startDate && eventDate) {
      startDate = eventTime ? `${eventDate}T${eventTime}` : `${eventDate}T00:00:00`;
      const durationMs = (duration || 60) * 60 * 1000;
      endDate = new Date(new Date(startDate).getTime() + durationMs).toISOString();
    }

    if (!title || !startDate) {
      return res.status(400).json({ success: false, message: 'Title and date are required.' });
    }
    if (!endDate) endDate = startDate;

    const [result] = await pool.query(
      'INSERT INTO events (mentorId, title, description, eventType, startDate, endDate, location, maxParticipants, isPublished) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)',
      [req.user.id, title, description, eventType || 'webinar', startDate, endDate, location, maxParticipants || 100]
    );

    res.status(201).json({ success: true, message: 'Event created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.put('/events/:id', async (req, res) => {
  try {
    let { title, description, eventType, startDate, endDate, location, maxParticipants, isPublished, eventDate, eventTime, duration } = req.body;

    // Support frontend format
    if (!startDate && eventDate) {
      startDate = eventTime ? `${eventDate}T${eventTime}` : `${eventDate}T00:00:00`;
      const durationMs = (duration || 60) * 60 * 1000;
      endDate = new Date(new Date(startDate).getTime() + durationMs).toISOString();
    }

    await pool.query(
      `UPDATE events SET title = COALESCE(?, title), description = COALESCE(?, description),
       eventType = COALESCE(?, eventType), startDate = COALESCE(?, startDate), endDate = COALESCE(?, endDate),
       location = COALESCE(?, location), maxParticipants = COALESCE(?, maxParticipants),
       isPublished = COALESCE(?, isPublished) WHERE id = ? AND mentorId = ?`,
      [title, description, eventType, startDate, endDate, location, maxParticipants, isPublished, req.params.id, req.user.id]
    );

    res.json({ success: true, message: 'Event updated successfully.' });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/events/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM events WHERE id = ? AND mentorId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Event deleted successfully.' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── DISCUSSIONS ────────────────
router.get('/discussions', async (req, res) => {
  try {
    const [discussions] = await pool.query(`
      SELECT d.*, c.title as courseTitle, u.fullName as authorName,
        (SELECT COUNT(*) FROM discussionReplies WHERE discussionId = d.id) as replyCount
      FROM discussions d
      LEFT JOIN courses c ON d.courseId = c.id
      JOIN users u ON d.userId = u.id
      WHERE d.courseId IN (SELECT id FROM courses WHERE mentorId = ?) OR d.userId = ?
      ORDER BY d.createdAt DESC
    `, [req.user.id, req.user.id]);

    res.json({ success: true, data: { discussions } });
  } catch (error) {
    console.error('Get discussions error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/discussions', async (req, res) => {
  try {
    const { courseId, title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required.' });
    }

    const [result] = await pool.query(
      'INSERT INTO discussions (courseId, userId, title, content) VALUES (?, ?, ?, ?)',
      [courseId || null, req.user.id, title, content]
    );

    res.status(201).json({ success: true, message: 'Discussion created successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create discussion error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/discussions/:id', async (req, res) => {
  try {
    const [discussions] = await pool.query(`
      SELECT d.*, c.title as courseTitle, u.fullName as authorName
      FROM discussions d
      LEFT JOIN courses c ON d.courseId = c.id
      JOIN users u ON d.userId = u.id
      WHERE d.id = ?
    `, [req.params.id]);

    if (discussions.length === 0) return res.status(404).json({ success: false, message: 'Discussion not found.' });

    const [replies] = await pool.query(`
      SELECT dr.*, u.fullName as authorName, u.role as authorRole, u.profileImage
      FROM discussionReplies dr
      JOIN users u ON dr.userId = u.id
      WHERE dr.discussionId = ?
      ORDER BY dr.createdAt ASC
    `, [req.params.id]);

    res.json({ success: true, data: { discussion: discussions[0], replies } });
  } catch (error) {
    console.error('Get discussion error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/discussions/:id/reply', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Content is required.' });

    await pool.query(
      'INSERT INTO discussionReplies (discussionId, userId, content) VALUES (?, ?, ?)',
      [req.params.id, req.user.id, content]
    );

    res.status(201).json({ success: true, message: 'Reply posted successfully.' });
  } catch (error) {
    console.error('Reply error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── STUDY MATERIALS ────────────────
router.get('/study-materials', async (req, res) => {
  try {
    const [materials] = await pool.query(`
      SELECT sm.*, c.title as courseTitle
      FROM studyMaterials sm
      LEFT JOIN courses c ON sm.courseId = c.id
      WHERE sm.mentorId = ?
      ORDER BY sm.createdAt DESC
    `, [req.user.id]);

    res.json({ success: true, data: { materials } });
  } catch (error) {
    console.error('Get materials error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.post('/study-materials', async (req, res) => {
  try {
    const { courseId, title, description, fileUrl, fileType, category } = req.body;

    if (!title) return res.status(400).json({ success: false, message: 'Title is required.' });

    const [result] = await pool.query(
      'INSERT INTO studyMaterials (courseId, mentorId, title, description, fileUrl, fileType, category) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [courseId || null, req.user.id, title, description, fileUrl, fileType, category]
    );

    res.status(201).json({ success: true, message: 'Material uploaded successfully.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Create material error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.delete('/study-materials/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM studyMaterials WHERE id = ? AND mentorId = ?', [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Material deleted successfully.' });
  } catch (error) {
    console.error('Delete material error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── DOUBTS (Mentor) ────────────────

// List all open doubts + doubts assigned to me
router.get('/doubts', async (req, res) => {
  try {
    const [doubts] = await pool.query(`
      SELECT d.*, u.fullName as studentName, c.title as courseTitle, m.fullName as mentorName,
        (SELECT COUNT(*) FROM doubtReplies WHERE doubtId = d.id) as replyCount
      FROM doubts d
      JOIN users u ON d.studentId = u.id
      LEFT JOIN courses c ON d.courseId = c.id
      LEFT JOIN users m ON d.assignedMentorId = m.id
      WHERE d.status = 'open' OR d.assignedMentorId = ?
      ORDER BY FIELD(d.status, 'open', 'in-progress', 'resolved', 'closed'), d.createdAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { doubts } });
  } catch (error) {
    console.error('Mentor get doubts error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get doubt detail with replies
router.get('/doubts/:id', async (req, res) => {
  try {
    const [doubts] = await pool.query(`
      SELECT d.*, u.fullName as studentName, u.email as studentEmail, c.title as courseTitle, m.fullName as mentorName
      FROM doubts d
      JOIN users u ON d.studentId = u.id
      LEFT JOIN courses c ON d.courseId = c.id
      LEFT JOIN users m ON d.assignedMentorId = m.id
      WHERE d.id = ?
    `, [req.params.id]);
    if (doubts.length === 0) return res.status(404).json({ success: false, message: 'Doubt not found.' });
    const [replies] = await pool.query(`
      SELECT dr.*, u.fullName as authorName, u.role as authorRole
      FROM doubtReplies dr JOIN users u ON dr.userId = u.id
      WHERE dr.doubtId = ? ORDER BY dr.createdAt ASC
    `, [req.params.id]);
    res.json({ success: true, data: { doubt: doubts[0], replies } });
  } catch (error) {
    console.error('Mentor get doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Reply to a doubt — first mentor to reply gets auto-assigned
router.post('/doubts/:id/reply', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Reply content is required.' });
    const [doubts] = await pool.query('SELECT * FROM doubts WHERE id = ?', [req.params.id]);
    if (doubts.length === 0) return res.status(404).json({ success: false, message: 'Doubt not found.' });
    const doubt = doubts[0];
    // Auto-assign: if no mentor assigned yet, assign this mentor
    if (!doubt.assignedMentorId) {
      await pool.query("UPDATE doubts SET assignedMentorId = ?, status = 'in-progress' WHERE id = ? AND assignedMentorId IS NULL", [req.user.id, req.params.id]);
    }
    await pool.query('INSERT INTO doubtReplies (doubtId, userId, content) VALUES (?, ?, ?)', [req.params.id, req.user.id, content]);
    res.status(201).json({ success: true, message: 'Reply posted. You are now assigned to this doubt.' });
  } catch (error) {
    console.error('Mentor reply doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Resolve a doubt
router.put('/doubts/:id/resolve', async (req, res) => {
  try {
    await pool.query("UPDATE doubts SET status = 'resolved' WHERE id = ? AND assignedMentorId = ?", [req.params.id, req.user.id]);
    res.json({ success: true, message: 'Doubt resolved.' });
  } catch (error) {
    console.error('Resolve doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

export default router;
