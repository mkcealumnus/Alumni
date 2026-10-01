<div align="center">

  <h1>🌱 Sowberry Academy</h1>
  <p><b>An Enterprise-Grade Multi-Role Learning Management System & EdTech Ecosystem</b></p>

  <img src="https://github-repo-readme-stats.vercel.app/api?username=jayanthansenthilkumar&repo=Sowberry&theme=dark" alt="Sowberry Repo Stats" />

  <p>
    <a href="https://sowberry.prisoltech.app"><b>Live Application</b></a> •
    <a href="#-getting-started"><b>Quick Start</b></a> •
    <a href="#-role-based-permissions--workflows"><b>Role Permissions</b></a> •
    <a href="#-api-documentation"><b>API Reference</b></a>
  </p>

</div>

---

## 📌 Overview

**Sowberry Academy** is an all-in-one, multi-role **Learning Management System (LMS)** designed to deliver high-quality technical education, interactive coding assessments, gamified learning, and institutional management. Built on modern web technologies (**React 19**, **Node.js**, **Express**, **MySQL**, **CodeMirror 6**, and **Three.js**), Sowberry provides an end-to-end platform for students, mentors, content creators, academic managers, observers, and administrators.

---

## 🛠️ Technology Stack

### Frontend Architecture
- **Framework & Core**: [React 19](https://react.dev/), [React Router DOM v7](https://reactrouter.com/), [Vite 7](https://vite.dev/)
- **Styling & UI Tokens**: Tailwind CSS v4, Vanilla CSS variables, Remix Icons, SweetAlert2
- **Code Editor & Syntax Highlighting**: [CodeMirror 6](https://codemirror.net/) (JavaScript, Python, C++, Java, Go, PHP, Rust, SQL, HTML, CSS, XML, JSON, Markdown) with OneDark theme, autocomplete, and search
- **Interactive 3D Graphics**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Document & Export Utilities**: `jspdf` & `jspdf-autotable` (Vector Certificate & Transcript Generation), `xlsx` (Excel Export), `file-saver`
- **Media & Crop Tools**: `react-easy-crop` (Avatar cropping)

### Backend Architecture
- **Runtime & API Framework**: Node.js (ES Modules), Express.js
- **Database Engine**: MySQL 8.0 with `mysql2` connection pooling & raw SQL execution
- **Authentication & Security**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs` password hashing, CORS credentials validation
- **File Management & Mailers**: `multer` (Upload handling), `nodemailer` (SMTP OTP verification & transactional emails), `archiver`

---

## 👥 Role-Based Permissions & Workflows

Sowberry features a granular **7-Role Permission Model** to ensure distinct access levels across educational and administrative workflows:

| Role | Primary Purpose | Key Accessible Modules |
| :--- | :--- | :--- |
| **🛡️ Admin** | Platform Governance & Revenue | User Management, Requests, System Reports, Revenue Analytics, Course Approvals, Settings |
| **👩‍🏫 Instructor / Mentor** | Course Delivery & Student Guidance | Course Creation, Assignments, Doubt Resolution, Problem Solving, Aptitude Tests, Events, Discussions |
| **🎨 Content Creator** | Curriculum Development | Creator Dashboard, Course Design, Problem Bank, Aptitude Builder, Study Materials |
| **📊 Manager** | Institutional Supervision | Cohort Progress, Program Analytics, Curriculum Audit, System Reports |
| **🔍 Observer** | Audit & Preview Mode | Read-Only Catalog, Preview Aptitude Tests, Learning Games Preview, Study Materials |
| **🎓 Student** | Active Learning & Assessment | Enrolled Courses, Code Editor, Timed Aptitude Tests, Learning Games, Doubt Ticketing, Certificate Download |

---

## ✨ Key Feature Modules

### 🎓 1. Interactive Student Learning Suite
- **Multi-Language Code Editor**: Embedded CodeMirror editor supporting 13+ programming languages with live execution sandbox, test case validation, and syntax highlighting.
- **Aptitude & Quiz Engine**: Timed MCQ assessments with question navigation, instant scoring, auto-grading, and detailed answer explanations.
- **Gamified Learning**: Progressive game unlocks tied to coding challenges and algorithmic puzzles.
- **Doubt Ticketing & Mentorship**: Raise structured doubts with code snippets/images and receive real-time answers from assigned mentors.
- **Automated Certificate & Transcript Generator**: One-click generation of official, high-resolution PDF course completion certificates (`jspdf`) and verified grade transcripts (`jspdf-autotable`).
- **Billing & Subscriptions**: View tier access (Starter Pass, Pro Scholar, Campus Elite Pass), purchase history, and transaction receipts.

### 👩‍🏫 2. Mentor & Instructor Tools
- **Curriculum Builder**: Design courses structured into **Subjects/Units** and **Topics** with support for Video streaming, PDFs, and Markdown notes.
- **Assignment Evaluator**: Set deadlines, review student submissions, provide custom text feedback, and award scores.
- **Coding Problem Bank**: Create custom algorithmic challenges with input/output format specifications, constraints, boilerplate code, and JSON test cases.
- **Live Webinars & Events**: Schedule and manage interactive workshops, webinars, and hackathons with attendance tracking.

### 🛡️ 3. Administrative Governance & Revenue
- **Student & Mentor Management**: Verify accounts, toggle active/inactive statuses, and assign custom roles.
- **Request Approval Queue**: Review and approve student profile update or account deletion requests.
- **System & Revenue Analytics**: Monitor platform user growth, enrollment metrics, active course counts, and transaction revenues.

---

## 📂 Project Structure

```
Sowberry/
├── public/                     # Static assets and site icons
├── schema/                     # Production MySQL Schema Dump
│   └── sowberry.sql            # Full SQL schema & seed script (6.5MB)
├── server/                     # Backend Node.js Express Application
│   ├── config/                 # Database connection & setup scripts
│   │   ├── db.js               # MySQL pool configuration
│   │   └── dbSetup.js          # Table creation & seed runner
│   ├── data/                   # Pre-seeded problem sets & question generators
│   ├── middleware/             # Auth & Role-based Access Control (auth.js)
│   ├── routes/                 # Express API routes
│   │   ├── admin.js            # Admin management endpoints
│   │   ├── auth.js             # Authentication & OTP routes
│   │   ├── mentor.js           # Instructor management endpoints
│   │   ├── public.js           # Unauthenticated catalog & contact endpoints
│   │   └── student.js          # Student learning & progress endpoints
│   ├── uploads/                # Uploaded media assets and student files
│   ├── views/                  # Server-rendered API Status Dashboard
│   └── server.js               # Backend entry point
├── src/                        # Frontend React Application
│   ├── components/             # Reusable UI components & layouts
│   │   ├── layout/             # AdminLayout, DashboardLayout, Sidebar
│   │   └── ui/                 # DataTable, SecurityGuard, SessionManager, ThemeToggle
│   ├── context/                # React Context Providers (AuthContext)
│   ├── pages/                  # Role-segmented Page Views
│   │   ├── admin/              # Admin pages (Dashboard, Revenue, Reports, Users)
│   │   ├── auth/               # Unified Auth Page (Login, Signup, OTP, Password Reset)
│   │   ├── creator/            # Creator pages (Course/Problem/Aptitude management)
│   │   ├── manager/            # Manager pages (Analytics, Cohorts, Curriculum)
│   │   ├── mentor/             # Mentor pages (Doubts, Progress, Problems, Events)
│   │   ├── observer/           # Observer pages (Read-only catalog & previews)
│   │   └── student/            # Student pages (Dashboard, CodeEditor, Aptitude, Games)
│   ├── utils/                  # Core client utilities
│   │   ├── api.js              # Centralized Axios/Fetch API client with JWT handlers
│   │   ├── certificateGenerator.js # Vector PDF certificate generator
│   │   ├── exportData.js       # Excel & PDF grade sheet export handlers
│   │   └── swal.js             # SweetAlert notification wrapper
│   ├── App.jsx                 # Client-side routes & Protected Route guards
│   ├── index.css               # Global CSS & Tailwind design tokens
│   └── main.jsx                # React DOM entry point
├── eslint.config.js            # ESLint code quality rules
├── jsconfig.json               # Path alias mapping (@ -> ./src)
├── package.json                # Project dependencies and root scripts
└── vite.config.js              # Vite build configuration
```

---

## 🗄️ Database Schema Summary

The MySQL database consists of **32 interconnected tables**:

1. `users` — Stores all platform users across the 7 user roles.
2. `otpCodes` — Tracks email OTP verification tokens and expiration.
3. `courses` — Core course definitions, status approvals, pricing, and regulation attributes.
4. `courseEnrollments` — Tracks student course enrollments, completion %, and JSON completed topics.
5. `courseSubjects` — Units/Modules contained within a course.
6. `courseTopics` — Sub-topics within course subjects.
7. `courseContent` — Video URLs, PDF paths, and markdown content per topic.
8. `courseMaterials` — Downloadable reference attachments.
9. `assignments` — Assignment tasks created by mentors.
10. `assignmentSubmissions` — Student submissions, scores, and mentor feedback.
11. `aptitudeTests` — Test metadata (duration, categories, difficulty, total marks).
12. `aptitudeQuestions` — MCQ options, correct answers, and explanations.
13. `aptitudeTestAttempts` — Student test sessions and total scores.
14. `aptitudeAnswers` — Detailed per-question option selections by students.
15. `codingProblems` — Coding problem bank with boilerplate, constraints, and test cases.
16. `gameChallenges` — Algorithmic challenges tied to learning mini-games.
17. `gameUnlocks` — Unlocked game progress per student.
18. `codingSubmissions` — Code execution history, memory/time usage, and evaluation statuses.
19. `events` — Webinars, workshops, and hackathons.
20. `eventRegistrations` — Student event attendance records.
21. `discussions` & `discussionReplies` — Platform discussion forums.
22. `studyMaterials` — Global cheat sheets and reference guides.
23. `grades` — Consolidated academic grade book.
24. `notifications` — In-app notification queue.
25. `systemSettings` & `activityLogs` — System configurations and audit logs.
26. `profileRequests` — Student profile edit/delete approval workflows.
27. `contactMessages` — Messages submitted from the public homepage.
28. `doubts` & `doubtReplies` — Doubt resolution ticketing workflow.
29. `subscriptionPlans`, `userSubscriptions`, `coursePurchases`, `transactions` — Billing, plans, and transaction receipts.

---

## ⚡ Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MySQL**: v8.0 or higher (Running locally or on remote host)

---

### Installation & Environment Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/jayanthansenthilkumar/Sowberry.git
   cd Sowberry
   ```

2. **Install Root & Backend Dependencies**
   ```bash
   npm install
   ```
   *(Note: The `postinstall` hook automatically runs `npm install` inside the `server/` directory).*

3. **Configure Backend Environment Variables**
   Create a `.env` file in the `server/` directory:

   ```env
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=sowberry

   # Authentication Secret
   JWT_SECRET=sowberry_super_secret_jwt_key_2026

   # CORS Client URL
   CLIENT_URL=http://localhost:5173

   # Nodemailer SMTP Configuration (Optional for email OTPs)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

4. **Initialize Database & Seed Data**
   Run the database automated setup script:
   ```bash
   npm run dev:backend
   # Or run directly:
   cd server && npm run db:setup
   ```
   *Alternatively, import `schema/sowberry.sql` directly into your MySQL server using MySQL Workbench or CLI.*

5. **Start Development Environment**
   Launch both frontend and backend concurrently from the root directory:
   ```bash
   npm run dev
   ```

   - **Frontend App**: `http://localhost:5173`
   - **Backend API Server**: `http://localhost:5000`
   - **Interactive API Dashboard**: `http://localhost:5000/api`

---

## 🔐 Default Test Credentials

The database setup script automatically seeds default users for testing each role:

| Role | Email | Password | Username |
| :--- | :--- | :--- | :--- |
| **🛡️ Admin** | `jayanthan@sowberry.com` | `Vishu@2008` | `jayanthan` |
| **👩‍🏫 Instructor / Mentor** | `janasruthi@sowberry.com` | `Vishu@2008` | `janasruthi` |
| **🎓 Student** | `vishalini@sowberry.com` | `Vishu@2008` | `vishalini` |
| **🎨 Creator** | `creator@sowberry.com` | `Vishu@2008` | `creator_sow` |
| **📊 Manager** | `manager@sowberry.com` | `Vishu@2008` | `manager_sow` |
| **🔍 Observer** | `observer@sowberry.com` | `Vishu@2008` | `observer_sow` |

---

## 📡 API Endpoint Reference

All backend API endpoints are routed under `/api`:

| Module | Route Base | Key Capabilities |
| :--- | :--- | :--- |
| **Auth** | `/api/auth` | `/login`, `/register`, `/verify-otp`, `/forgot-password`, `/reset-password`, `/me`, `/profile` |
| **Student** | `/api/student` | `/dashboard`, `/courses`, `/enroll`, `/coding-problems`, `/submit-code`, `/aptitude-tests`, `/submit-test`, `/doubts`, `/billing` |
| **Mentor** | `/api/mentor` | `/dashboard`, `/courses` (CRUD), `/assignments` (CRUD), `/doubts` (Resolve), `/problem-solving` (CRUD), `/aptitude` (CRUD) |
| **Admin** | `/api/admin` | `/dashboard`, `/students`, `/mentors`, `/courses-overview`, `/revenue`, `/requests`, `/reports`, `/settings` |
| **Public** | `/api/public` | `/courses`, `/contact`, `/newsletter` |

---

## 📦 Production Deployment

### Building Frontend Bundle
To build the production bundle:
```bash
npm run build
```
The optimized production build files will be placed in the `dist/` folder.

### Running Backend in Production
```bash
cd server
NODE_ENV=production npm start
```

---

## 📄 License

This repository is proprietary software of **Sowberry Academy**. All rights reserved.

