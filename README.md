# ALUMNUX — “Your Network. Your Next Chapter.”

> **Platform Tagline:** Your Network. Your Next Chapter.  
> **Category:** Independent Student Career Guidance & Alumni Networking Platform  
> **Design Philosophy:** Refined Nano-Brutalism  
> **Frontend Architecture:** React 19 + Vite 6 + TypeScript (Strict Mode) + React Router v7 + Tailwind CSS

---

## 1. Project Overview & Governance

Alumnux is an independent student and alumni career guidance platform designed to connect students with experienced alumni through career guidance, mentorship, professional networking, job opportunities, internships, and referrals.

### 1.1 Independent Platform Notice
Alumnux is independently developed and administered by **three senior alumni trustees**. It is **not** an officially managed college platform, and college administration or academic faculty have no operational involvement or administrative access.

---

## 2. Refined Nano-Brutalist Design System

The platform implements **Refined Nano-Brutalism** (distinct from cartoon Neo-Brutalism):
- **Core Principles:** Editorial minimalism, precise geometry, subtle 1px neutral borders, clear typography hierarchy, generous whitespace, crisp cards, purposeful grids, and subtle motion transitions.
- **Color Palette:**
  - Page Background: `#F8F8F5` (warm off-white)
  - Surface Neutral: `#FFFFFF` and `#F2F2EC`
  - Primary Typography: `#171717` (near-black)
  - Secondary Typography: `#666660`
  - Border System: `#E5E5DF` / `#D8D8D2` (restrained 1px line work)
  - Vivid Accent: `#2563EB` (Cobalt blue, used selectively)
  - Semantic Status: Emerald (`#16A34A`), Amber (`#D97706`), Crimson (`#DC2626`)
- **Responsive Coverage:** Built to scale cleanly from mobile devices (6.1" to 6.8") up through desktop monitors and 49" super ultrawide screens.

---

## 3. Implemented Routes & Screen Deliverables

### Part A — Public Website (5 Primary Pages)
1. **Home (`/`):**
   - **Hero Section:** Headline *"Your Network. Your Next Chapter."*, supporting message, *"Explore Careers"* primary CTA, *"Join Alumnux"* secondary CTA, live mentorship preview visual, and independent trust statement.
   - **What Alumnux Offers:** 4 concise feature cards (Career Guidance, Alumni Networking, Mentorship, Jobs & Internships) with Lucide icons and hover transitions.
   - **How It Works:** 3-step student journey (Create profile &rarr; Connect with alumni &rarr; Build skills & advance career).
   - **Career Opportunities Preview:** 3 realistic sample listings marked clearly as demo content, with quick link to the Career page.
   - **Final CTA Banner:** High-contrast conversion banner leading to registration and platform discovery.
2. **About (`/about`):**
   - Detailed platform introduction, the student guidance gap, mutual value creation for students and working alumni, 4 core values (Accessibility, Collaboration, Professional Growth, Responsible Networking), and independent platform statement.
3. **Our Goal (`/our-goal`):**
   - Mission and vision statements, 5 strategic goals, and a phased visual development roadmap (Phase 1 through Phase 4) without fabricated statistics.
4. **Career Discovery (`/career`):**
   - Interactive search input with multi-select filters for opportunity type (Full-time, Internship, Referral, Mentorship), work mode (Remote, Hybrid, Onsite), and locations.
   - Interactive save/bookmark toggle state persisted in local storage.
   - Opportunity detail modal with requirements, compensation bands, and referral notes.
   - Empty state handling with quick filter-reset.
   - Alumni CTA to share opportunities.
5. **Contact & Feedback (`/contact`):**
   - Validated inquiry form using React Hook Form + Zod across 4 inquiry categories (General Inquiry, Technical Support, Partnership Inquiry, Feedback).
   - Instant client-side validation, error messages, and simulated submission feedback.
   - Expandable FAQ accordion addressing common student/alumni questions.

### Part B — Header, Navigation & Footer
- **Sticky Shared Header (`Navbar`):**
  - Alumnux logo/wordmark, links to all 5 public pages, active route styling, accessible mobile responsive drawer.
  - Far-right actions: Login (secondary button) and Register (primary button).
  - When logged in: displays active dashboard button and instant logout.
- **Shared Footer (`Footer`):**
  - Brand wordmark, tagline, links to all 5 public pages, login/register links, dynamic copyright year (`new Date().getFullYear()`), and prominent non-institutional disclaimer.

### Part C — Demo Authentication & Role Guards
- **Dedicated Routes:** `/login`, `/register`, `/forgot-password`.
- **Zero-Dependency Demo Accounts:** Fully operational without Supabase credentials.
  - **Student Demo:**
    - Email: `student@alumnux.demo`
    - Password: `Student@123`
    - Destination: `/student/dashboard`
  - **Alumni Demo:**
    - Email: `alumni@alumnux.demo`
    - Password: `Alumni@123`
    - Destination: `/alumni/dashboard`
- **1-Click Demo Login:** Dedicated buttons on `/login` to instantly authenticate as either role.
- **Registration Flow:** Full name, email, password, confirm password, account type selector (Student/Alumni), terms acknowledgement, and demo success state.
- **Route Protection (`ProtectedRoute`):**
  - Unauthenticated access to `/student/*` or `/alumni/*` is blocked and redirected to `/login`.
  - Cross-role access is guarded (e.g. Students cannot view `/alumni/*` and vice versa).
  - Functional logout clears browser session and returns to login.

### Part D — Student Dashboard (`/student/*`)
- **Layout:** Fixed desktop sidebar + responsive mobile drawer, top header with user avatar (`AR`), display name (*Alex Rivera*), notifications popover, search, and profile dropdown.
- **Overview (`/student/dashboard`):** Personalized welcome greeting, 4 statistics cards (Alumni Connections: 12, Mentorship Requests: 3, Saved Opportunities: 8, Upcoming Events: 2), recommended alumni, featured opportunities, profile completion progress (85%), and activity feed.
- **Sub-pages:**
  - `/student/alumni` — Filterable alumni directory with direct mentorship request modal.
  - `/student/mentorship` — Scheduled mentorship sessions with video meeting links.
  - `/student/jobs` — Job & internship board with quick-apply demo application modal.
  - `/student/saved` — Bookmarked opportunities with removal actions.
  - `/student/messages` — Simulated live 1-on-1 chat interface with alumni mentor Jordan Vance.
  - `/student/events` — Upcoming webinars and technical AMAs with interactive RSVP toggle.
  - `/student/profile` — Student profile view with editable bio and skills manager.
  - `/student/settings` — Notification preferences, role switcher, and demo reset.

### Part E — Alumni Dashboard (`/alumni/*`)
- **Layout:** Alumni-optimized sidebar and header with avatar (`JV`), display name (*Jordan Vance*), and quick actions.
- **Overview (`/alumni/dashboard`):** Personalized welcome greeting, 4 statistics cards (Incoming Requests: 4, Active Mentees: 6, Opportunities Shared: 3, Student Connections: 28), pending mentorship requests with **functional Accept / Decline actions**, and recently shared opportunities.
- **Sub-pages:**
  - `/alumni/students` — Student directory to explore aspiring engineers and offer guidance.
  - `/alumni/mentorship` — Mentorship schedule and incoming request management.
  - `/alumni/opportunities` — Manage shared listings and **Post New Opportunity** modal form.
  - `/alumni/messages` — Direct message threads with student mentees.
  - `/alumni/events` — Host an AMA / workshop scheduling modal.
  - `/alumni/profile` — Alumni profile with current company (Stripe), role, and expertise editor.
  - `/alumni/settings` — Mentorship capacity limits (max mentees, monthly hours), role switcher, and reset.

---

## 4. Reusable Project Structure

```text
src/
├── components/
│   ├── auth/
│   │   └── protectedRoute.tsx       # Role-based route guard
│   ├── layout/
│   │   ├── footer.tsx               # Public shared footer with disclaimer
│   │   ├── navbar.tsx               # Public sticky header with mobile drawer
│   │   └── rootLayout.tsx           # Public page shell
│   └── ui/                          # Button, Input, Badge, Card, Dialog, Table, Tabs
├── context/
│   └── authContext.tsx              # Isolated demo authentication provider & local session
├── data/
│   └── demoData.ts                  # Typed centralized demo accounts, jobs, events, requests
├── layouts/
│   ├── alumniDashboardLayout.tsx    # Alumni sidebar, header, and navigation shell
│   └── studentDashboardLayout.tsx   # Student sidebar, header, and navigation shell
├── lib/
│   ├── mockData.ts                  # Seeded alumni profiles & verification records
│   ├── tokens.ts                    # Refined Nano-Brutalism design system tokens
│   ├── types.ts                     # Core TypeScript interfaces
│   ├── utils.ts                     # cn class merger utility
│   └── validation/                  # Zod validation schemas
├── pages/
│   ├── admin/
│   │   └── adminPage.tsx            # Senior Alumni Trustee Console
│   ├── alumni/                      # 7 Alumni dashboard views
│   ├── auth/
│   │   ├── forgotPasswordPage.tsx   # Password recovery simulation
│   │   ├── loginPage.tsx            # Sign in with 1-click student & alumni demo buttons
│   │   └── registerPage.tsx         # Account registration with role selection
│   ├── directory/
│   │   └── directoryPage.tsx        # Public directory catalog
│   ├── onboarding/                  # Academic verification intake workflows
│   ├── public/
│   │   ├── aboutPage.tsx            # About Alumnux page
│   │   ├── careerPage.tsx           # Searchable opportunity discovery page
│   │   ├── contactPage.tsx          # Validated inquiry form & FAQ accordion
│   │   └── ourGoalPage.tsx          # Mission, vision, goals & phased roadmap
│   ├── student/                     # 8 Student dashboard views
│   ├── landingPage.tsx              # 5-section refined Home landing page
│   ├── notFoundPage.tsx             # 404 handler
│   ├── privacyPage.tsx              # DPDP 2023 privacy policy
│   └── termsPage.tsx                # Terms of service
├── styles/
│   └── index.css                    # Tailwind directives & CSS variables
├── App.tsx                          # App routing tree & route guards
└── main.tsx                         # React 19 bootstrap
```

---

## 5. Technical Validation & Scripts

Every mandatory verification gate passes with zero errors and zero warnings:

| Command | Status | Description |
| :--- | :--- | :--- |
| `npm run typecheck` | **Passed (Exit 0)** | TypeScript compiler (`tsc --noEmit`) with strict mode enabled |
| `npm run test` | **Passed (Exit 0)** | 22 / 22 automated Vitest tests passing across 3 test suites |
| `npm run lint` | **Passed (Exit 0)** | ESLint passing with 0 warnings (`--max-warnings 0`) |
| `npm run build` | **Passed (Exit 0)** | Vite 6 production bundle generated in `dist/` in ~7.6s |
| `npx wrangler deploy --dry-run` | **Passed (Exit 0)** | Cloudflare SPA deployment verification |

### Running the Application Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local Vite development server
npm run dev

# 3. Open in browser: http://localhost:3000
```

### Reviewer Walkthrough Guide
1. **Public Exploration:** Browse through `/`, `/about`, `/our-goal`, `/career`, and `/contact`. Test the career search, filters, and bookmarking interactions.
2. **Student Demo:** Navigate to `/login`, click **"Student Demo"** (or use `student@alumnux.demo` / `Student@123`). Explore `/student/dashboard`, request guidance in `/student/alumni`, test job application in `/student/jobs`, and view chat in `/student/messages`.
3. **Alumni Demo:** Switch roles in Settings or log in as **"Alumni Demo"** (`alumni@alumnux.demo` / `Alumni@123`). Accept or decline pending student requests in `/alumni/dashboard`, open the **"Share an Opportunity"** modal, and view mentee milestones.
4. **Security & Guarding:** Attempt entering `/alumni/dashboard` while logged in as a student; notice the automatic redirection back to `/student/dashboard`. Log out to clear the session.
