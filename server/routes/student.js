import { Router } from 'express';
import pool from '../config/db.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import all150CodingProblems from '../data/all150CodingProblems.js';

const router = Router();

// All student routes require authentication + student role
router.use(authenticate, authorize('student'));

// ──────────────── DASHBOARD ────────────────
router.get('/dashboard', async (req, res) => {
  try {
    const studentId = req.user.id;

    const [enrolledCourses] = await pool.query('SELECT COUNT(*) as count FROM courseEnrollments WHERE studentId = ?', [studentId]);
    const [completedCourses] = await pool.query("SELECT COUNT(*) as count FROM courseEnrollments WHERE studentId = ? AND status = 'completed'", [studentId]);
    const [avgCompletion] = await pool.query('SELECT COALESCE(AVG(completionPercentage), 0) as avg FROM courseEnrollments WHERE studentId = ?', [studentId]);
    const [pendingAssignments] = await pool.query(`
      SELECT COUNT(*) as count FROM assignments a
      JOIN courses c ON a.courseId = c.id
      JOIN courseEnrollments ce ON ce.courseId = c.id
      WHERE ce.studentId = ? AND a.isPublished = 1
      AND a.id NOT IN (SELECT assignmentId FROM assignmentSubmissions WHERE studentId = ?)
    `, [studentId, studentId]);
    const [avgGrade] = await pool.query('SELECT COALESCE(AVG(percentage), 0) as avg FROM grades WHERE studentId = ?', [studentId]);

    // Current courses with progress
    const [currentCourses] = await pool.query(`
      SELECT c.title, c.category, c.image, ce.completionPercentage, ce.status, u.fullName as mentorName
      FROM courseEnrollments ce
      JOIN courses c ON ce.courseId = c.id
      JOIN users u ON c.mentorId = u.id
      WHERE ce.studentId = ?
      ORDER BY ce.enrolledAt DESC LIMIT 5
    `, [studentId]);

    // Upcoming assignments
    const [upcomingAssignments] = await pool.query(`
      SELECT a.id, a.title, a.dueDate, a.maxScore, c.title as courseTitle
      FROM assignments a
      JOIN courses c ON a.courseId = c.id
      JOIN courseEnrollments ce ON ce.courseId = c.id
      WHERE ce.studentId = ? AND a.isPublished = 1 AND a.dueDate > NOW()
      AND a.id NOT IN (SELECT assignmentId FROM assignmentSubmissions WHERE studentId = ?)
      ORDER BY a.dueDate ASC LIMIT 5
    `, [studentId, studentId]);

    // Upcoming events
    const [upcomingEvents] = await pool.query(`
      SELECT e.id, e.title, e.eventType, e.startDate, e.location, u.fullName as mentorName
      FROM events e
      JOIN users u ON e.mentorId = u.id
      WHERE e.isPublished = 1 AND e.startDate > NOW()
      ORDER BY e.startDate ASC LIMIT 5
    `, [studentId]);

    res.json({
      success: true,
      data: {
        stats: {
          enrolledCourses: enrolledCourses[0].count,
          completedCourses: completedCourses[0].count,
          avgCompletion: Math.round(avgCompletion[0].avg),
          pendingAssignments: pendingAssignments[0].count,
          avgGrade: Math.round(avgGrade[0].avg)
        },
        currentCourses,
        upcomingAssignments,
        upcomingEvents
      }
    });
  } catch (error) {
    console.error('Student dashboard error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── CODING PRACTICE ────────────────
router.get('/coding-problems', async (req, res) => {
  try {
    const { difficulty, category } = req.query;

    let query = 'SELECT * FROM codingProblems WHERE 1=1';
    const params = [];

    if (difficulty && difficulty !== 'all') {
      query += ' AND difficulty = ?';
      params.push(difficulty);
    }
    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY id ASC';

    let problemsList = [];
    try {
      const [rows] = await pool.query(query, params);
      problemsList = rows;
    } catch (dbErr) {
      console.error('Error fetching coding problems from DB:', dbErr);
    }

    // Fallback to static dataset if database table returns no rows
    if (!problemsList || problemsList.length === 0) {
      problemsList = [...all150CodingProblems];
      if (difficulty && difficulty !== 'all') {
        problemsList = problemsList.filter(p => p.difficulty === difficulty);
      }
      if (category && category !== 'all') {
        problemsList = problemsList.filter(p => p.category === category);
      }
    }

    // Try querying user submission statuses from DB to enrich response
    let submissionStatuses = {};
    try {
      const [subRows] = await pool.query(
        `SELECT problemId, COUNT(*) as mySubmissions, 
                (SELECT status FROM codingSubmissions WHERE problemId = cs.problemId AND studentId = ? ORDER BY submittedAt DESC LIMIT 1) as lastStatus
         FROM codingSubmissions cs
         WHERE studentId = ?
         GROUP BY problemId`,
        [req.user.id, req.user.id]
      );
      subRows.forEach(row => {
        submissionStatuses[row.problemId] = row;
      });
    } catch (e) {}

    // Standardize problem objects with test cases breakdown
    const formattedProblems = problemsList.map(p => {
      let cases = [];
      try {
        cases = typeof p.testCases === 'string' ? JSON.parse(p.testCases) : (p.testCases || []);
      } catch (err) {
        cases = [];
      }
      const openCount = Array.isArray(cases) ? cases.filter(c => !c.isHidden).length : 3;
      const hiddenCount = Array.isArray(cases) ? cases.filter(c => c.isHidden).length : 15;
      const subInfo = submissionStatuses[p.id] || {};

      return {
        ...p,
        testCases: cases,
        mySubmissions: subInfo.mySubmissions || 0,
        lastStatus: subInfo.lastStatus || null,
        openTestCasesCount: openCount || 3,
        hiddenTestCasesCount: hiddenCount || 15,
        totalTestCasesCount: (openCount || 3) + (hiddenCount || 15)
      };
    });

    res.json({ success: true, data: { problems: formattedProblems } });
  } catch (error) {
    console.error('Get problems error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

router.get('/coding-problems/:id', async (req, res) => {
  try {
    const problemIdStr = String(req.params.id);
    let problem = null;

    try {
      const [rows] = await pool.query('SELECT * FROM codingProblems WHERE id = ?', [req.params.id]);
      if (rows.length > 0) problem = rows[0];
    } catch (err) {}

    if (!problem) {
      problem = all150CodingProblems.find(p => String(p.id) === problemIdStr);
    }

    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found.' });
    }

    let parsedCases = [];
    try {
      parsedCases = typeof problem.testCases === 'string' ? JSON.parse(problem.testCases) : (problem.testCases || []);
    } catch (e) { parsedCases = []; }

    const formattedProblem = {
      ...problem,
      testCases: parsedCases,
      openTestCases: parsedCases.filter(c => !c.isHidden),
      hiddenTestCases: parsedCases.filter(c => c.isHidden)
    };

    let submissions = [];
    try {
      const [subRows] = await pool.query(
        'SELECT id, language, status, executionTime, memory, submittedAt FROM codingSubmissions WHERE problemId = ? AND studentId = ? ORDER BY submittedAt DESC',
        [req.params.id, req.user.id]
      );
      submissions = subRows;
    } catch (subErr) {}

    res.json({ success: true, data: { problem: formattedProblem, submissions } });
  } catch (error) {
    console.error('Get problem error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ── Local Code Execution Engine (child_process) ──
const EXEC_TIMEOUT = 15000; // 15 seconds
const MAX_OUTPUT = 100 * 1024; // 100KB

// Check if a command is available on this system
function commandExists(cmd) {
  try {
    execSync(process.platform === 'win32' ? `where ${cmd}` : `which ${cmd}`, { stdio: 'ignore' });
    return true;
  } catch { return false; }
}

// Resolve the best available command from a list of candidates
function resolveCmd(candidates) {
  for (const cmd of candidates) {
    if (commandExists(cmd)) return cmd;
  }
  return null;
}

// Language configuration for local execution
const LANG_CONFIG = {
  python:     { candidates: ['python', 'python3', 'py'], ext: 'py', type: 'interpreted' },
  javascript: { candidates: ['node'], ext: 'js', type: 'interpreted' },
  typescript: { candidates: ['npx'], ext: 'ts', type: 'interpreted', args: ['tsx'] },
  java:       { candidates: ['javac'], ext: 'java', type: 'compiled', runCmd: 'java' },
  cpp:        { candidates: ['g++'], ext: 'cpp', type: 'compiled' },
  c:          { candidates: ['gcc'], ext: 'c', type: 'compiled' },
  go:         { candidates: ['go'], ext: 'go', type: 'run', runArgs: ['run'] },
  rust:       { candidates: ['rustc'], ext: 'rs', type: 'compiled' },
  php:        { candidates: ['php'], ext: 'php', type: 'interpreted' },
  ruby:       { candidates: ['ruby'], ext: 'rb', type: 'interpreted' },
  bash:       { candidates: ['bash', 'sh'], ext: 'sh', type: 'interpreted' },
  perl:       { candidates: ['perl'], ext: 'pl', type: 'interpreted' },
  lua:        { candidates: ['lua'], ext: 'lua', type: 'interpreted' },
  r:          { candidates: ['Rscript'], ext: 'r', type: 'interpreted' },
  kotlin:     { candidates: ['kotlinc'], ext: 'kt', type: 'compiled-kt' },
  dart:       { candidates: ['dart'], ext: 'dart', type: 'run', runArgs: ['run'] },
  swift:      { candidates: ['swift'], ext: 'swift', type: 'interpreted' },
  scala:      { candidates: ['scala'], ext: 'scala', type: 'interpreted' },
};

// Cache resolved commands at startup
const resolvedCmds = {};
for (const [lang, cfg] of Object.entries(LANG_CONFIG)) {
  resolvedCmds[lang] = resolveCmd(cfg.candidates);
}
console.log('Available execution languages:', Object.entries(resolvedCmds).filter(([, v]) => v).map(([k, v]) => `${k}(${v})`).join(', '));

// Run a process and capture output
function runProcess(cmd, args, cwd, stdin, timeout) {
  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let killed = false;

    const proc = spawn(cmd, args, {
      cwd,
      timeout,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: process.platform === 'win32',
    });

    proc.stdout.on('data', (data) => {
      stdout += data.toString();
      if (stdout.length > MAX_OUTPUT) {
        stdout = stdout.slice(0, MAX_OUTPUT) + '\n[Output truncated]';
        proc.kill('SIGKILL');
        killed = true;
      }
    });

    proc.stderr.on('data', (data) => {
      stderr += data.toString();
      if (stderr.length > MAX_OUTPUT) {
        stderr = stderr.slice(0, MAX_OUTPUT) + '\n[Output truncated]';
      }
    });

    proc.on('error', (err) => {
      resolve({ stdout, stderr: stderr || err.message, code: -1, signal: null, killed });
    });

    proc.on('close', (code, signal) => {
      resolve({ stdout, stderr, code, signal, killed });
    });

    // Write stdin if provided
    if (stdin) {
      proc.stdin.write(stdin);
    }
    proc.stdin.end();

    // Fallback timeout (in case spawn timeout doesn't work on all platforms)
    setTimeout(() => {
      if (!proc.killed) {
        proc.kill('SIGKILL');
        killed = true;
      }
    }, timeout + 1000);
  });
}

// Execute code via OneCompiler API (if ONECOMPILER_ACCESS_TOKEN or ONECOMPILER_API_KEY is defined)
async function executeViaOneCompiler(language, code, stdin = '') {
  const token = process.env.ONECOMPILER_ACCESS_TOKEN || process.env.ONECOMPILER_API_KEY;
  if (!token) return null;

  const langMap = {
    python: 'python',
    javascript: 'javascript',
    typescript: 'typescript',
    java: 'java',
    cpp: 'cpp',
    c: 'c',
    csharp: 'csharp',
    go: 'go',
    rust: 'rust',
    php: 'php',
    ruby: 'ruby',
    swift: 'swift',
    kotlin: 'kotlin',
    bash: 'bash',
  };

  const oneCompilerLang = langMap[language] || language;

  try {
    const ext = LANG_CONFIG[language]?.ext || 'txt';
    const fileName = language === 'java' ? 'Main.java' : `index.${ext}`;

    const response = await fetch(`https://onecompiler.com/api/v1/run?access_token=${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: oneCompilerLang,
        stdin: stdin || '',
        files: [
          {
            name: fileName,
            content: code,
          }
        ]
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && (data.stdout !== undefined || data.stderr !== undefined || data.exception !== undefined)) {
        let output = data.stdout || '';
        let status = 'success';
        if (data.stderr || data.exception) {
          output += (output ? '\n' : '') + `[Error]\n${data.stderr || data.exception}`;
          if (!data.stdout) status = 'error';
        }
        return {
          output: (output || '').trim() || '(No output)',
          status,
          language,
          executionTime: data.executionTime ? `${data.executionTime}ms` : 'N/A',
        };
      }
    }
  } catch (err) {
    console.warn('OneCompiler API execution warning:', err.message);
  }
  return null;
}

// Unified Code Runner (OneCompiler API -> Local Process Fallback)
async function executeCodeRunner(language, code, stdin = '') {
  const oneCompilerRes = await executeViaOneCompiler(language, code, stdin);
  if (oneCompilerRes) return oneCompilerRes;
  return await executeLocally(language, code, stdin);
}

// Execute code locally
async function executeLocally(language, code, stdin = '') {
  const lang = language || 'python';
  const cfg = LANG_CONFIG[lang];

  if (!cfg) {
    return { output: `Language "${lang}" is not supported.`, status: 'error' };
  }

  const cmd = resolvedCmds[lang];
  if (!cmd) {
    return { output: `Language "${lang}" is not available on this server. Install the runtime and restart the server.`, status: 'error' };
  }

  // Create temp directory
  const execId = Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  const execDir = path.join(os.tmpdir(), 'nextstep-exec', execId);
  fs.mkdirSync(execDir, { recursive: true });

  try {
    const startTime = Date.now();
    let fileName;
    let output = '';
    let status = 'success';

    // For Java, extract public class name or use Main
    if (lang === 'java') {
      const classMatch = code.match(/public\s+class\s+(\w+)/);
      const className = classMatch ? classMatch[1] : 'Main';
      fileName = `${className}.java`;
    } else {
      fileName = `code.${cfg.ext}`;
    }

    const filePath = path.join(execDir, fileName);
    fs.writeFileSync(filePath, code, 'utf8');

    if (cfg.type === 'interpreted') {
      // Interpreted: run directly
      const args = cfg.args ? [...cfg.args, filePath] : [filePath];
      const result = await runProcess(cmd, args, execDir, stdin, EXEC_TIMEOUT);

      if (result.stdout) output += result.stdout;
      if (result.stderr) {
        output += (output ? '\n' : '') + `[Error]\n${result.stderr}`;
        if (!result.stdout) status = 'error';
      }
      if (result.killed || result.signal === 'SIGKILL') {
        output += '\n[Time Limit Exceeded]';
        status = 'error';
      }
    } else if (cfg.type === 'compiled') {
      // Compiled: compile then run
      const outName = process.platform === 'win32' ? 'program.exe' : 'program';
      const outPath = path.join(execDir, outName);
      let compileArgs;

      if (lang === 'java') {
        compileArgs = [filePath];
      } else {
        // C/C++/Rust: compile to binary
        compileArgs = [filePath, '-o', outPath];
      }

      const compResult = await runProcess(cmd, compileArgs, execDir, '', EXEC_TIMEOUT);

      if (compResult.code !== 0) {
        output = `[Compilation Error]\n${compResult.stderr || compResult.stdout}`;
        status = 'error';
      } else {
        // Run the compiled program
        let runCmd, runArgs;
        if (lang === 'java') {
          const classMatch = code.match(/public\s+class\s+(\w+)/);
          const className = classMatch ? classMatch[1] : 'Main';
          runCmd = cfg.runCmd || 'java';
          runArgs = ['-cp', execDir, className];
        } else {
          runCmd = outPath;
          runArgs = [];
        }

        const runResult = await runProcess(runCmd, runArgs, execDir, stdin, EXEC_TIMEOUT);

        if (runResult.stdout) output += runResult.stdout;
        if (runResult.stderr) {
          output += (output ? '\n' : '') + `[Error]\n${runResult.stderr}`;
          if (!runResult.stdout) status = 'error';
        }
        if (runResult.killed || runResult.signal === 'SIGKILL') {
          output += '\n[Time Limit Exceeded]';
          status = 'error';
        }
      }
    } else if (cfg.type === 'run') {
      // Languages with `run` subcommand (go run, dart run)
      const args = [...(cfg.runArgs || []), filePath];
      const result = await runProcess(cmd, args, execDir, stdin, EXEC_TIMEOUT);

      if (result.stdout) output += result.stdout;
      if (result.stderr) {
        output += (output ? '\n' : '') + `[Error]\n${result.stderr}`;
        if (!result.stdout) status = 'error';
      }
      if (result.killed || result.signal === 'SIGKILL') {
        output += '\n[Time Limit Exceeded]';
        status = 'error';
      }
    }

    const elapsed = Date.now() - startTime;

    return {
      output: (output || '').trim() || '(No output)',
      status,
      language: lang,
      executionTime: `${elapsed}ms`,
    };
  } finally {
    // Clean up temp files
    try {
      fs.rmSync(execDir, { recursive: true, force: true });
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

// ── Execute code endpoint ──
router.post('/execute', async (req, res) => {
  try {
    const { code, language, stdin } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: 'Code is required.' });
    }

    const result = await executeCodeRunner(language, code, stdin || '');

    res.json({
      success: true,
      data: {
        output: result.output,
        status: result.status,
        language: result.language,
        executionTime: result.executionTime,
      }
    });
  } catch (error) {
    console.error('Execute code error:', error);
    res.status(500).json({ success: false, message: 'Failed to execute code. Please try again.' });
  }
});

function compareOutputs(actual, expected) {
  if (actual === undefined || actual === null || expected === undefined || expected === null) return false;
  const normA = String(actual).trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
  const normE = String(expected).trim().replace(/\r\n/g, '\n').replace(/\s+$/gm, '');
  if (normA === normE) return true;
  
  try {
    const jsonA = JSON.stringify(JSON.parse(normA));
    const jsonE = JSON.stringify(JSON.parse(normE));
    if (jsonA === jsonE) return true;
  } catch {}

  const numA = parseFloat(normA);
  const numE = parseFloat(normE);
  if (!isNaN(numA) && !isNaN(numE) && Math.abs(numA - numE) < 1e-4) {
    return true;
  }

  return false;
}

// Submit code (verify ALL open & hidden test cases before accepting submission)
router.post('/coding-problems/:id/submit', async (req, res) => {
  try {
    const { code, language, stdin } = req.body;

    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: 'Code is required.' });
    }

    const lang = language || 'python';
    const problemIdStr = String(req.params.id);

    // Fetch problem definition from database first
    let problem = null;
    try {
      const [rows] = await pool.query('SELECT * FROM codingProblems WHERE id = ?', [req.params.id]);
      if (rows.length > 0) {
        problem = rows[0];
        if (typeof problem.testCases === 'string') {
          try { problem.testCases = JSON.parse(problem.testCases); } catch {}
        }
      }
    } catch (err) {}

    if (!problem) {
      problem = all150CodingProblems.find(p => String(p.id) === problemIdStr);
    }

    let testCases = problem?.testCases || [];
    if (!Array.isArray(testCases) || testCases.length === 0) {
      testCases = [{
        id: 1,
        input: stdin || problem?.sampleInput || '',
        output: problem?.sampleOutput || '',
        isHidden: false,
        label: 'Sample Test Case'
      }];
    }

    const testResults = [];
    let passedCount = 0;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      let actualOutput = '';
      let execStatus = 'error';

      try {
        const result = await executeCodeRunner(lang, code, tc.input || '');
        actualOutput = result.output || '';
        execStatus = result.status;
      } catch (execErr) {
        actualOutput = execErr.message || 'Execution Error';
      }

      const passed = (execStatus !== 'error') && compareOutputs(actualOutput, tc.output);
      if (passed) passedCount++;

      testResults.push({
        id: tc.id || (i + 1),
        label: tc.label || (tc.isHidden ? `Hidden Test Case ${i - 2}` : `Open Test Case ${i + 1}`),
        isHidden: !!tc.isHidden,
        passed: passed,
        input: tc.isHidden ? undefined : tc.input,
        expectedOutput: tc.isHidden ? undefined : tc.output,
        actualOutput: tc.isHidden ? undefined : actualOutput
      });
    }

    const totalCount = testCases.length;
    const allPassed = passedCount === totalCount && totalCount > 0;
    const status = allPassed ? 'accepted' : 'wrong_answer';

    // Store submission record in database
    let insertId = null;
    try {
      const [dbRes] = await pool.query(
        'INSERT INTO codingSubmissions (problemId, studentId, code, language, status) VALUES (?, ?, ?, ?, ?)',
        [req.params.id, req.user.id, code, lang, status]
      );
      insertId = dbRes.insertId;
    } catch (dbErr) {
      console.error('Failed to log submission in DB:', dbErr);
    }

    if (allPassed) {
      return res.json({
        success: true,
        message: `🎉 All ${totalCount}/${totalCount} test cases passed! Solution Accepted.`,
        data: {
          id: insertId,
          status: 'accepted',
          passedCount,
          totalCount,
          testResults
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: `Submission Failed: ${passedCount}/${totalCount} test cases passed (${totalCount - passedCount} failed). You must pass ALL ${totalCount} test cases (including hidden) to submit successfully.`,
        data: {
          id: insertId,
          status: 'wrong_answer',
          passedCount,
          totalCount,
          testResults
        }
      });
    }
  } catch (error) {
    console.error('Submit code error:', error);
    res.status(500).json({ success: false, message: 'Server error during submission evaluation.' });
  }
});

// ──────────────── GAME CHALLENGES ────────────────

// GET all game challenges with unlock status
router.get('/game-challenges', async (req, res) => {
  try {
    const [challenges] = await pool.query(
      `SELECT gc.*, 
        (SELECT COUNT(*) FROM gameUnlocks WHERE challengeSlug = gc.slug AND studentId = ?) > 0 as unlocked
       FROM gameChallenges gc ORDER BY gc.sortOrder`,
      [req.user.id]
    );
    res.json({ success: true, data: challenges });
  } catch (error) {
    console.error('Get game challenges error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET single game challenge by slug
router.get('/game-challenges/:slug', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM gameChallenges WHERE slug = ?', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Challenge not found.' });
    const challenge = rows[0];
    // Parse testCases JSON
    challenge.testCases = typeof challenge.testCases === 'string' ? JSON.parse(challenge.testCases) : challenge.testCases;
    const [unlockRows] = await pool.query('SELECT id FROM gameUnlocks WHERE challengeSlug = ? AND studentId = ?', [req.params.slug, req.user.id]);
    challenge.unlocked = unlockRows.length > 0;
    res.json({ success: true, data: challenge });
  } catch (error) {
    console.error('Get game challenge error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// POST submit code for a game challenge – validates using server-side Python execution
router.post('/game-challenges/:slug/submit', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || !code.trim()) {
      return res.status(400).json({ success: false, message: 'Code is required.' });
    }

    // Fetch challenge
    const [rows] = await pool.query('SELECT * FROM gameChallenges WHERE slug = ?', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Challenge not found.' });
    const challenge = rows[0];
    const testCases = typeof challenge.testCases === 'string' ? JSON.parse(challenge.testCases) : challenge.testCases;

    // Extract the function name from the boilerplate
    const fnMatch = challenge.boilerplate.match(/def\s+(\w+)\s*\(/);
    const funcName = fnMatch ? fnMatch[1] : null;
    if (!funcName) {
      return res.status(400).json({ success: false, message: 'Could not determine function name from challenge.' });
    }

    // Build a test runner that executes the user's code and runs assertions
    let testRunner = code + '\n\n# === AUTO-GENERATED TEST RUNNER ===\n_all_passed = True\n_results = []\n';

    testCases.forEach((tc, i) => {
      testRunner += `\ntry:\n    _result_${i} = ${funcName}(${tc.input})\n`;
      testRunner += `    _expected_${i} = ${tc.expected}\n`;
      testRunner += `    if str(_result_${i}) != str(_expected_${i}):\n        _all_passed = False\n        _results.append(f"Test ${i + 1}: FAILED (got {_result_${i}}, expected {_expected_${i}})")\n    else:\n        _results.append(f"Test ${i + 1}: PASSED")\n`;
      testRunner += `except Exception as e:\n    _all_passed = False\n    _results.append(f"Test ${i + 1}: ERROR - {e}")\n`;
    });

    testRunner += '\nfor r in _results:\n    print(r)\nif _all_passed:\n    print("ALL_TESTS_PASSED")\n';

    // Execute using the server-side Python runner
    const result = await executeLocally('python', testRunner, '');

    const passed = result.output && result.output.includes('ALL_TESTS_PASSED');

    // If passed, unlock the game
    if (passed) {
      await pool.query(
        'INSERT IGNORE INTO gameUnlocks (studentId, challengeSlug) VALUES (?, ?)',
        [req.user.id, req.params.slug]
      );
    }

    res.json({
      success: true,
      passed,
      output: result.output || '',
      message: passed ? 'All tests passed! Game unlocked!' : 'Some tests failed. Check your output.'
    });
  } catch (error) {
    console.error('Submit game challenge error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// GET unlocked games list
router.get('/game-unlocks', async (req, res) => {
  try {
    const [unlocks] = await pool.query(
      'SELECT challengeSlug FROM gameUnlocks WHERE studentId = ?',
      [req.user.id]
    );
    res.json({ success: true, data: unlocks.map(u => u.challengeSlug) });
  } catch (error) {
    console.error('Get game unlocks error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── APTITUDE TESTS ────────────────
router.get('/aptitude-tests', async (req, res) => {
  try {
    const [tests] = await pool.query(`
      SELECT at.id, at.title, at.description, at.category, at.difficulty, at.icon,
             at.duration, at.totalQuestions, at.totalMarks, at.createdAt,
             u.fullName as mentorName,
        (SELECT COUNT(*) FROM aptitudeTestAttempts WHERE testId = at.id AND studentId = ?) as myAttempts,
        (SELECT score FROM aptitudeTestAttempts WHERE testId = at.id AND studentId = ? ORDER BY startedAt DESC LIMIT 1) as lastScore,
        (SELECT MAX(score) FROM aptitudeTestAttempts WHERE testId = at.id AND studentId = ? AND status = 'completed') as bestScore
      FROM aptitudeTests at
      JOIN users u ON at.mentorId = u.id
      WHERE at.isPublished = 1
      ORDER BY at.category, at.difficulty, at.createdAt DESC
    `, [req.user.id, req.user.id, req.user.id]);

    res.json({ success: true, tests });
  } catch (error) {
    console.error('Get tests error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Start an aptitude test attempt
router.post('/aptitude-tests/:id/start', async (req, res) => {
  try {
    const testId = req.params.id;

    const [test] = await pool.query('SELECT * FROM aptitudeTests WHERE id = ? AND isPublished = 1', [testId]);
    if (test.length === 0) {
      return res.status(404).json({ success: false, message: 'Test not found.' });
    }

    const [result] = await pool.query(
      "INSERT INTO aptitudeTestAttempts (testId, studentId, totalMarks, status) VALUES (?, ?, ?, 'inProgress')",
      [testId, req.user.id, test[0].totalMarks]
    );

    const [questions] = await pool.query(
      'SELECT id, question, optionA, optionB, optionC, optionD, marks, explanation, orderIndex FROM aptitudeQuestions WHERE testId = ? ORDER BY orderIndex',
      [testId]
    );

    res.status(201).json({
      success: true,
      attemptId: result.insertId,
      test: { title: test[0].title, duration: test[0].duration, totalMarks: test[0].totalMarks, category: test[0].category },
      questions
    });
  } catch (error) {
    console.error('Start test error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Submit aptitude test answers
router.post('/aptitude-tests/:attemptId/submit', async (req, res) => {
  try {
    const { answers } = req.body; // [{questionId, selectedOption}]

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, message: 'Answers are required.' });
    }

    let totalScore = 0;
    const results = [];

    for (const answer of answers) {
      const [question] = await pool.query(
        'SELECT id, question, optionA, optionB, optionC, optionD, correctOption, marks, explanation FROM aptitudeQuestions WHERE id = ?',
        [answer.questionId]
      );

      const isCorrect = question.length > 0 && question[0].correctOption === answer.selectedOption;
      if (isCorrect) totalScore += question[0].marks;

      await pool.query(
        'INSERT INTO aptitudeAnswers (attemptId, questionId, selectedOption, isCorrect) VALUES (?, ?, ?, ?)',
        [req.params.attemptId, answer.questionId, answer.selectedOption, isCorrect ? 1 : 0]
      );

      if (question.length > 0) {
        results.push({
          questionId: question[0].id,
          question: question[0].question,
          optionA: question[0].optionA,
          optionB: question[0].optionB,
          optionC: question[0].optionC,
          optionD: question[0].optionD,
          correctOption: question[0].correctOption,
          selectedOption: answer.selectedOption,
          isCorrect,
          explanation: question[0].explanation,
          marks: question[0].marks
        });
      }
    }

    // Update attempt
    await pool.query(
      "UPDATE aptitudeTestAttempts SET score = ?, completedAt = NOW(), status = 'completed' WHERE id = ? AND studentId = ?",
      [totalScore, req.params.attemptId, req.user.id]
    );

    // Get attempt details for grade record
    const [attempt] = await pool.query('SELECT testId, totalMarks FROM aptitudeTestAttempts WHERE id = ?', [req.params.attemptId]);
    if (attempt.length > 0) {
      const percentage = (totalScore / attempt[0].totalMarks) * 100;
      await pool.query(
        'INSERT INTO grades (studentId, testId, gradeType, score, maxScore, percentage) VALUES (?, ?, ?, ?, ?, ?)',
        [req.user.id, attempt[0].testId, 'aptitude', totalScore, attempt[0].totalMarks, percentage]
      );
    }

    res.json({
      success: true,
      message: 'Test submitted successfully!',
      score: totalScore,
      totalMarks: attempt[0]?.totalMarks || 0,
      results
    });
  } catch (error) {
    console.error('Submit test error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get aptitude test attempt result
router.get('/aptitude-tests/attempts/:id', async (req, res) => {
  try {
    const attemptId = req.params.id;

    let [attempt] = await pool.query(`
      SELECT ata.*, at.title, at.totalQuestions, at.duration, at.totalMarks as maxMarks
      FROM aptitudeTestAttempts ata
      JOIN aptitudeTests at ON ata.testId = at.id
      WHERE ata.id = ? AND ata.studentId = ?
    `, [attemptId, req.user.id]);

    if (attempt.length === 0) {
      const [fallbackAttempt] = await pool.query(`
        SELECT ata.*, at.title, at.totalQuestions, at.duration, at.totalMarks as maxMarks
        FROM aptitudeTestAttempts ata
        JOIN aptitudeTests at ON ata.testId = at.id
        WHERE ata.id = ?
      `, [attemptId]);
      attempt = fallbackAttempt;
    }

    if (attempt.length === 0) {
      return res.status(404).json({ success: false, message: 'Attempt not found.' });
    }

    const [questionsWithAnswers] = await pool.query(`
      SELECT aq.id as questionId, aq.question, aq.optionA, aq.optionB, aq.optionC, aq.optionD, 
             aq.correctOption, aq.explanation, aq.marks,
             aa.selectedOption, aa.isCorrect
      FROM aptitudeQuestions aq
      LEFT JOIN aptitudeAnswers aa ON aq.id = aa.questionId AND aa.attemptId = ?
      WHERE aq.testId = ?
      ORDER BY aq.orderIndex, aq.id
    `, [attemptId, attempt[0].testId]);

    // Calculate stats
    const answered = questionsWithAnswers.filter(q => q.selectedOption !== null && q.selectedOption !== undefined).length;
    let computedScore = 0;
    questionsWithAnswers.forEach(q => { if (q.isCorrect) computedScore += (q.marks || 1); });
    const finalScore = attempt[0].score !== null && attempt[0].score !== undefined ? attempt[0].score : computedScore;

    res.json({
      success: true,
      data: {
        attempt: attempt[0],
        results: questionsWithAnswers,
        score: finalScore,
        total: attempt[0].maxMarks || attempt[0].totalMarks || questionsWithAnswers.length || 1,
        answered,
        questions: attempt[0].totalQuestions || questionsWithAnswers.length
      }
    });

  } catch (error) {
    console.error('Get attempt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── EVENTS ────────────────
router.get('/events', async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, u.fullName as mentorName,
        (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id) as registrationCount,
        (SELECT COUNT(*) FROM eventRegistrations WHERE eventId = e.id AND studentId = ?) as isRegistered
      FROM events e
      JOIN users u ON e.mentorId = u.id
      WHERE e.isPublished = 1
      ORDER BY e.startDate ASC
    `, [req.user.id]);

    res.json({ success: true, data: { events } });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Register for an event
router.post('/events/:id/register', async (req, res) => {
  try {
    const [existing] = await pool.query(
      'SELECT id FROM eventRegistrations WHERE eventId = ? AND studentId = ?',
      [req.params.id, req.user.id]
    );

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: 'Already registered for this event.' });
    }

    await pool.query(
      'INSERT INTO eventRegistrations (eventId, studentId) VALUES (?, ?)',
      [req.params.id, req.user.id]
    );

    res.status(201).json({ success: true, message: 'Registered for event successfully!' });
  } catch (error) {
    console.error('Register event error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── DISCUSSIONS ────────────────
router.get('/discussions', async (req, res) => {
  try {
    const [discussions] = await pool.query(`
      SELECT d.*, c.title as courseTitle, u.fullName as authorName, u.role as authorRole,
        (SELECT COUNT(*) FROM discussionReplies WHERE discussionId = d.id) as replyCount
      FROM discussions d
      LEFT JOIN courses c ON d.courseId = c.id
      JOIN users u ON d.userId = u.id
      WHERE d.courseId IN (SELECT courseId FROM courseEnrollments WHERE studentId = ?)
         OR d.courseId IS NULL
      ORDER BY d.createdAt DESC
    `, [req.user.id]);

    res.json({ success: true, data: { discussions } });
  } catch (error) {
    console.error('Get discussions error:', error);
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

// ──────────────── DOUBTS (Student) ────────────────

// List my doubts
router.get('/doubts', async (req, res) => {
  try {
    const [doubts] = await pool.query(`
      SELECT d.*, c.title as courseTitle, m.fullName as mentorName,
        (SELECT COUNT(*) FROM doubtReplies WHERE doubtId = d.id) as replyCount
      FROM doubts d
      LEFT JOIN courses c ON d.courseId = c.id
      LEFT JOIN users m ON d.assignedMentorId = m.id
      WHERE d.studentId = ?
      ORDER BY d.createdAt DESC
    `, [req.user.id]);
    res.json({ success: true, data: { doubts } });
  } catch (error) {
    console.error('Student get doubts error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Create a doubt
router.post('/doubts', async (req, res) => {
  try {
    const { courseId, title, description, priority } = req.body;
    if (!title) return res.status(400).json({ success: false, message: 'Doubt title is required.' });
    const [result] = await pool.query(
      'INSERT INTO doubts (studentId, courseId, title, description, priority) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, courseId || null, title, description || null, priority || 'medium']
    );
    res.status(201).json({ success: true, message: 'Doubt posted successfully. A mentor will respond soon.', data: { id: result.insertId } });
  } catch (error) {
    console.error('Student create doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get doubt detail with replies
router.get('/doubts/:id', async (req, res) => {
  try {
    const [doubts] = await pool.query(`
      SELECT d.*, c.title as courseTitle, m.fullName as mentorName
      FROM doubts d
      LEFT JOIN courses c ON d.courseId = c.id
      LEFT JOIN users m ON d.assignedMentorId = m.id
      WHERE d.id = ? AND d.studentId = ?
    `, [req.params.id, req.user.id]);
    if (doubts.length === 0) return res.status(404).json({ success: false, message: 'Doubt not found.' });
    const [replies] = await pool.query(`
      SELECT dr.*, u.fullName as authorName, u.role as authorRole
      FROM doubtReplies dr JOIN users u ON dr.userId = u.id
      WHERE dr.doubtId = ? ORDER BY dr.createdAt ASC
    `, [req.params.id]);
    res.json({ success: true, data: { doubt: doubts[0], replies } });
  } catch (error) {
    console.error('Student get doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Student reply to own doubt (follow-up)
router.post('/doubts/:id/reply', async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ success: false, message: 'Reply content is required.' });
    const [doubts] = await pool.query('SELECT id FROM doubts WHERE id = ? AND studentId = ?', [req.params.id, req.user.id]);
    if (doubts.length === 0) return res.status(404).json({ success: false, message: 'Doubt not found.' });
    await pool.query('INSERT INTO doubtReplies (doubtId, userId, content) VALUES (?, ?, ?)', [req.params.id, req.user.id, content]);
    res.status(201).json({ success: true, message: 'Reply posted.' });
  } catch (error) {
    console.error('Student reply doubt error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// ──────────────── PROFILE REQUESTS ────────────────

// Create a profile edit or account deletion request
router.post('/profile-requests', async (req, res) => {
  try {
    const { type, requestData, reason } = req.body;

    if (!type || !['edit', 'delete'].includes(type)) {
      return res.status(400).json({ success: false, message: 'Invalid request type. Must be "edit" or "delete".' });
    }

    if (type === 'edit' && (!requestData || Object.keys(requestData).length === 0)) {
      return res.status(400).json({ success: false, message: 'Please provide the fields you want to edit.' });
    }

    if (!reason || reason.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Please provide a reason for your request.' });
    }

    // Check for existing pending request of same type
    const [existing] = await pool.query(
      "SELECT id FROM profileRequests WHERE studentId = ? AND type = ? AND status = 'pending'",
      [req.user.id, type]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: `You already have a pending ${type} request. Please wait for admin to review it.` });
    }

    await pool.query(
      'INSERT INTO profileRequests (studentId, type, requestData, reason) VALUES (?, ?, ?, ?)',
      [req.user.id, type, type === 'edit' ? JSON.stringify(requestData) : null, reason.trim()]
    );

    res.status(201).json({ success: true, message: `Your ${type} request has been submitted. You will be notified once admin reviews it.` });
  } catch (error) {
    console.error('Create profile request error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Get own profile requests
router.get('/profile-requests', async (req, res) => {
  try {
    const [requests] = await pool.query(
      `SELECT pr.*, u.fullName as reviewerName
       FROM profileRequests pr
       LEFT JOIN users u ON pr.reviewedBy = u.id
       WHERE pr.studentId = ?
       ORDER BY pr.createdAt DESC`,
      [req.user.id]
    );

    res.json({ success: true, data: { requests } });
  } catch (error) {
    console.error('Get profile requests error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

// Cancel a pending request
router.delete('/profile-requests/:id', async (req, res) => {
  try {
    const [requests] = await pool.query(
      "SELECT id FROM profileRequests WHERE id = ? AND studentId = ? AND status = 'pending'",
      [req.params.id, req.user.id]
    );

    if (requests.length === 0) {
      return res.status(404).json({ success: false, message: 'Request not found or already processed.' });
    }

    await pool.query('DELETE FROM profileRequests WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: 'Request cancelled successfully.' });
  } catch (error) {
    console.error('Cancel profile request error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});


export default router;
