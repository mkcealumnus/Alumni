import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
dotenv.config();

// Route imports
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import studentRoutes from './routes/student.js';
import publicRoutes from './routes/public.js';
import { renderApiDashboard } from './views/apiDashboard.js';

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ──────────────── MIDDLEWARE ────────────────
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Request logger (development)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });
}

// ──────────────── ROUTES ────────────────
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/public', publicRoutes);

// ──────────────── API UI TEMPLATE ────────────────
// ──────────────── API UI DASHBOARD ────────────────
const getDashboardHTML = () => {
  return renderApiDashboard({
    uptimeSeconds: process.uptime(),
    port: PORT,
    env: process.env.NODE_ENV || 'development'
  });
};

// Root route
app.get('/', (req, res) => {
  if (req.headers.accept?.includes('application/json') || req.query.format === 'json' || req.query.accept === 'json') {
    return res.json({
      success: true,
      message: 'NextStep API Server',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: { health: '/api/health', auth: '/api/auth', admin: '/api/admin', student: '/api/student', public: '/api/public' }
    });
  }
  res.send(getDashboardHTML());
});

// API root route
app.get('/api', (req, res) => {
  if (req.headers.accept?.includes('application/json') || req.query.format === 'json' || req.query.accept === 'json') {
    return res.json({
      success: true,
      message: 'NextStep API is running!',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: 'GET /api/health',
        auth: '/api/auth (login, register, forgot-password, verify-otp, reset-password, me, profile, change-password)',
        admin: '/api/admin (dashboard, students, alumni, analytics, reports, settings, notifications)',
        student: '/api/student (dashboard, courses, assignments, grades, progress, coding-problems, aptitude-tests, study-materials, events, discussions, notifications)',
        public: '/api/public (courses, contact, newsletter)'
      }
    });
  }
  res.send(getDashboardHTML());
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'NextStep API is running!', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  console.warn(`404 Not Found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
});

// ──────────────── START SERVER ────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('🌱 ─────────────────────────────────────');
  console.log(`   NextStep API Server`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   API:  http://localhost:${PORT}/api`);
  console.log('🌱 ─────────────────────────────────────');
  console.log('');
});

export default app;
