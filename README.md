# ALUMNUX

> **Your Network. Your Next Chapter.**  
> *Student Career Guidance and Alumni Networking Platform*  
> *Design System: Refined Nano-Brutalism &bull; Phase: 1 (Technical & Design Foundation)*

---

## 1. Project Overview & Governance

Alumnux is an independently developed, privacy-focused student career guidance platform that directly connects current undergraduate and postgraduate students with verified alumni for career mentorship, professional networking, mock technical interviews, off-campus placement guidance, and genuine job referrals.

### 1.1 Non-Institutional Governance Notice
Alumnux is founded, operated, and maintained exclusively by **three designated senior alumni trustees**:
1. **Trustee 1 (Infrastructure & Security Lead):** Arunachalam S. (Staff Infrastructure Engineer @ Tier-1 Cloud, Class of 2016)
2. **Trustee 2 (Product & User Experience Lead):** Deepika Sundaram (VP of Engineering @ Fintech Unicorn, Class of 2015)
3. **Trustee 3 (Governance & Privacy Custodian):** Venkatesh Raman (Principal Security Architect @ CyberDefense, Class of 2014)

**Independence Statement:** College management, college placement cells, and academic faculty have zero operational involvement, administrative credentials, or access to the verification queue or applicant identity records.

---

## 2. Refined Nano-Brutalist Design System

The platform strictly implements **Refined Nano-Brutalism** (not Neo-Brutalism):
- **Core Principles:** Editorial minimalism, precise geometry, restrained 1px borders, clean typography, functional layouts, purposeful whitespace.
- **Tokens:**
  - Page Background: `#F8F8F5`
  - Surface: `#FFFFFF`
  - Primary Text: `#171717`
  - Secondary Text: `#666660`
  - Border: `#D8D8D2`
  - Primary Accent: `#3157D5` (Hover: `#2647B8`, Subtle: `#EEF2FF`)
  - Semantic Feedback: Green (`#16A34A`), Amber (`#D97706`), Red (`#DC2626`)
- **Geometry:** 1px borders, restrained 4–8px corner radii, flat surfaces, zero cartoonish drop-shadows or floating scribbles. Micro-transitions capped at 150–200ms with full `prefers-reduced-motion` compliance.

---

## 3. Phase 1 Screen Deliverables

The Phase 1 interactive prototype includes:
1. **Public Landing Page (`/`):** Alumnux wordmark, career messaging, value proposition, 3-step verification workflow, live verified profile teaser, and governance charter.
2. **Authentication Screens (`/auth/login`, `/auth/register`):** Google sign-in entry point, loading state, error display, role selector, and post-login destination routing.
3. **Student Verification Journey (`/onboarding/student`):** 3-step intake for academic department, expected batch, roll number, and simulated upload of College ID Front & Back with DPDP declaration.
4. **Alumni Verification Journey (`/onboarding/alumni`):** 3-step intake for degree details, current company/designation, and Anna University Degree Certificate scan.
5. **Verification Status Tracker (`/onboarding/status`):** State machine allowing interactive inspection of `pending`, `needs_review`, `verified`, and `rejected` states.
6. **Student Career Hub (`/portal/student`):** Dashboard concept with verification status, profile completion progress, recommended alumni mentors, referral vacancies, and upcoming AMAs (clearly marked demo data).
7. **Verified Alumni Directory (`/directory`):** Search bar and multi-filter catalog (by department, graduation year, skills, and employer) with privacy-aware masked contact cards.
8. **Senior Alumni Admin Console (`/admin`):** Trustee control panel featuring verification queue, evidence inspection dialog, moderation actions, and immutable audit log viewer.

---

## 4. Technical Architecture & Database Design

- **Frontend & App Framework:** React 19 (`react@^19.0.0`, `react-dom@^19.0.0`), Vite (`vite@^5.4.11`), TypeScript (Strict Mode).
- **Routing:** React Router v7 (`react-router-dom@^7.0.0`) with client-side SPA routing and catch-all 404 handler.
- **Styling:** Tailwind CSS + Refined Nano-Brutalism Design Tokens (`src/lib/tokens.ts`).
- **Icons:** Lucide React.
- **Form & Validation:** React Hook Form, Zod declarative schemas (`src/lib/validation/index.ts`).
- **Backend / Database:** PostgreSQL 15+ (via Supabase) with **100% of tables protected by Row Level Security (RLS)**.
- **Client Integration:** `@supabase/supabase-js` using standard Vite environment variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
- **Database Migrations:**
  - `supabase/migrations/20261024000001_initial_schema.sql` (17 relational tables, custom triggers, indexes, and comprehensive RLS policies).
  - `supabase/migrations/20261024000002_seed_data.sql` (Canonical departments, skill taxonomies, and 3 senior alumni trustee account stubs).
- **Test Scaffolding:** Vitest for schema validation and 14-device responsive layout specifications.
- **CI/CD:** GitHub Actions workflow in `.github/workflows/ci.yml`.

---

## 5. Getting Started & Development Workflow

### Prerequisites
- Node.js 18+ (tested on Node.js v24.15.0)
- npm 9+

### Setup Instructions
```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Run typecheck
npm run typecheck

# 4. Run automated test suite
npm run test

# 5. Run linter
npm run lint

# 6. Start local development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to explore the prototype.

---

## 6. Phase 1 Acceptance Checklist

| Workstream | Acceptance Criteria | Status | Verified Outcome |
|---|---|:---:|---|
| **A. Product Discovery** | SRS v1.1 with independent 3-trustee model, user journeys, MVP boundaries | &check; | Complete in `docs/SRS-v1.1.md` |
| **B. Design System** | Refined Nano-Brutalism tokens, geometry rules, reusable component library | &check; | Implemented in `src/lib/tokens.ts`, `src/components/ui/*` |
| **C. Interface Screens** | 8 polished responsive screens (Landing, Auth, Student/Alum Onboarding, Status, Directory, Hub, Admin) | &check; | Fully responsive with interactive state toggles |
| **D. Database & Arch** | 17 relational tables with indexes, constraints, triggers, and full RLS policies | &check; | Verified in `supabase/migrations/*` & `docs/database-design.md` |
| **E. Privacy & Policy** | DPDP Act 2023 compliance, evidence isolation, ephemeral URLs, retention rules | &check; | Documented in `docs/verification-policy.md` & `src/pages/privacy-page.tsx` |
| **F. Engineering Quality** | React 19 + Vite, strict TypeScript, Vitest test suite, CI workflow, zero secrets committed | &check; | Passed typecheck, lint, test, and production build |

---

## 7. Phase 2 Backlog (Prioritized)

1. Provision production Supabase PostgreSQL and execute migration scripts.
2. Configure live Google OAuth credentials in Supabase Auth.
3. Connect Supabase Storage private bucket with time-limited signed URLs (TTL 600s).
4. Implement 1-on-1 direct messaging via Supabase Realtime channels.
5. Integrate 1-on-1 mentorship scheduling calendar and confirmation emails.
6. Enable verified alumni job posting intake form and application routing.
