/**
 * Seed script for HTML5 Complete Masterclass course
 * Usage: node server/data/seedHtmlCourse.js
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { htmlCourse } from './htmlCourseData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env relative to server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const DB_NAME = process.env.DB_NAME || 'nextstep';

export async function seedHtmlCourse(existingConn = null) {
  let connection = existingConn;
  let closeConn = false;

  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: DB_NAME
    });
    closeConn = true;
  }

  try {
    console.log('🌱 Seeding HTML5 Masterclass Course into DB...');

    // Find mentor or admin user to set as mentorId
    const [mentors] = await connection.query(`SELECT id FROM users WHERE role IN ('mentor', 'instructor', 'admin') LIMIT 1`);
    if (mentors.length === 0) {
      console.warn('⚠️ No mentor user found in DB. Skipping HTML course seeding until users exist.');
      if (closeConn) await connection.end();
      return;
    }

    const mentorId = mentors[0].id;

    // Check if HTML-101 course exists
    const [existingCourse] = await connection.query(`SELECT id FROM courses WHERE courseCode = ? OR title = ?`, [htmlCourse.courseCode, htmlCourse.title]);

    let courseId;

    if (existingCourse.length > 0) {
      courseId = existingCourse[0].id;
      await connection.query(
        `UPDATE courses SET 
          title = ?, description = ?, image = ?, thumbnail = ?, duration = ?, mentorId = ?, 
          category = ?, courseType = ?, difficulty = ?, semester = ?, regulation = ?, 
          academicYear = ?, maxStudents = ?, isPublished = 1, status = 'active', rating = ?
         WHERE id = ?`,
        [
          htmlCourse.title, htmlCourse.description, htmlCourse.image, htmlCourse.thumbnail,
          htmlCourse.duration, mentorId, htmlCourse.category, htmlCourse.courseType,
          htmlCourse.difficulty, htmlCourse.semester, htmlCourse.regulation,
          htmlCourse.academicYear, htmlCourse.maxStudents, htmlCourse.rating,
          courseId
        ]
      );
      console.log(`  ✅ Updated HTML course record (ID: ${courseId})`);
    } else {
      const [result] = await connection.query(
        `INSERT INTO courses (
          title, courseCode, description, image, thumbnail, duration, mentorId, category, 
          courseType, difficulty, semester, regulation, academicYear, maxStudents, isPublished, status, rating
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 'active', ?)`,
        [
          htmlCourse.title, htmlCourse.courseCode, htmlCourse.description, htmlCourse.image,
          htmlCourse.thumbnail, htmlCourse.duration, mentorId, htmlCourse.category,
          htmlCourse.courseType, htmlCourse.difficulty, htmlCourse.semester,
          htmlCourse.regulation, htmlCourse.academicYear, htmlCourse.maxStudents, htmlCourse.rating
        ]
      );
      courseId = result.insertId;
      console.log(`  ✅ Inserted new HTML course (ID: ${courseId})`);
    }

    // Clean existing subjects, topics, and content for this course to ensure a clean sync
    const [oldSubjects] = await connection.query(`SELECT id FROM courseSubjects WHERE courseId = ?`, [courseId]);
    for (const sub of oldSubjects) {
      await connection.query(`DELETE FROM courseTopics WHERE subjectId = ?`, [sub.id]);
    }
    await connection.query(`DELETE FROM courseSubjects WHERE courseId = ?`, [courseId]);
    await connection.query(`DELETE FROM courseContent WHERE courseId = ?`, [courseId]);

    // Insert Subjects, Topics, and Course Content
    let contentSortOrder = 1;

    for (const subjectData of htmlCourse.subjects) {
      const [subResult] = await connection.query(
        `INSERT INTO courseSubjects (courseId, title, code, description, sortOrder) VALUES (?, ?, ?, ?, ?)`,
        [courseId, subjectData.title, subjectData.code, subjectData.description, subjectData.sortOrder]
      );
      const subjectId = subResult.insertId;

      for (const topicData of subjectData.topics) {
        // Insert topic
        const [topResult] = await connection.query(
          `INSERT INTO courseTopics (subjectId, title, description, sortOrder) VALUES (?, ?, ?, ?)`,
          [subjectId, topicData.title, topicData.description, topicData.sortOrder]
        );

        // Insert text reading content into courseContent
        await connection.query(
          `INSERT INTO courseContent (courseId, subjectId, title, description, contentType, contentData, sortOrder, status, uploadedBy)
           VALUES (?, ?, ?, ?, ?, ?, ?, 'active', ?)`,
          [
            courseId, subjectId, topicData.title, topicData.description,
            topicData.contentType, topicData.contentData, contentSortOrder++, mentorId
          ]
        );
      }
    }

    console.log(`  ✅ Seeded ${htmlCourse.subjects.length} Units and ${contentSortOrder - 1} Lesson Content items into DB`);

    // Auto-enroll all active students so the course is immediately available in "Enrolled" & "Browse"
    const [students] = await connection.query(`SELECT id FROM users WHERE role = 'student'`);
    for (const st of students) {
      await connection.query(
        `INSERT IGNORE INTO courseEnrollments (courseId, studentId, completedTopics) VALUES (?, ?, '[]')`,
        [courseId, st.id]
      );
    }
    console.log(`  ✅ Auto-enrolled ${students.length} students into HTML5 Masterclass Course`);

  } catch (error) {
    console.error('❌ Error seeding HTML course:', error);
    throw error;
  } finally {
    if (closeConn && connection) {
      await connection.end();
    }
  }
}

// Run standalone if executed directly
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seedHtmlCourse()
    .then(() => {
      console.log('🎉 HTML Course seeding complete!');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Failed:', err);
      process.exit(1);
    });
}
