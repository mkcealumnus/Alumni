# Software Requirements Specification (SRS v1.1)
## Project: ALUMNUX — Student Career Guidance & Alumni Networking Platform

**Document Version:** 1.1  
**Status:** Approved for Phase 1 Baseline  
**Date:** October 2026  
**Operating Model:** Independent Senior Alumni Administration (3 Designated Senior Alumni Trustees)  
**Governance:** Non-Institutional, Self-Governed Community Platform  

---

### 1. Executive Summary & Product Vision

**Alumnux** (*"Your Network. Your Next Chapter."*) is an independently developed, privacy-focused student career guidance and professional networking platform. It directly connects current college students with verified alumni across industries for career mentorship, portfolio/resume reviews, mock interviews, referral sharing, and internship opportunities.

#### 1.1 Independence & Governance Statement
Alumnux is conceived, built, and administered entirely by three designated senior alumni members acting as Platform Trustees. The platform is not owned, operated, funded, or controlled by college management or faculty. No institutional administrators or faculty approval hierarchies exist within the system. All operational decisions, verification queues, moderation interventions, and data custodian duties remain exclusively within the remit of the three designated alumni administrators.

#### 1.2 Core Value Proposition
- **For Students:** Immediate access to authentic industry guidance, genuine interview preparation, and job referrals from alumni who walked the same academic paths, unencumbered by institutional bureaucracy.
- **For Alumni:** A streamlined, trustworthy avenue to give back directly to junior peers, source high-caliber candidates, and expand their own professional circle without institutional solicitation.
- **For the Community:** A verified, high-trust network where every participant's identity is authenticated through rigorous manual verification of academic credentials.

---

### 2. User Personas & Operating Model

#### 2.1 Persona 1: The Aspiring Student ("Priya", 3rd Year B.Tech)
- **Background:** Preparing for off-campus internships and competitive tech placements; lacks direct connections to Tier-1 product companies.
- **Goals:** Find alumni working in software engineering and cloud infrastructure, request resume feedback, understand interview loops, and discover vetted opportunities.
- **Pain Points:** Cold outreach on general social media has low response rates; college placement cell focuses primarily on mass recruiters; uncertainty about whether profiles on public sites are authentic alumni.
- **Verification Requirement:** Upload of current College ID Card (Front & Back) with visible student registration number, department, and validity.

#### 2.2 Persona 2: The Established Alum ("Karthik", Class of 2018, Staff Engineer)
- **Background:** 8 years of industry experience; eager to mentor motivated students and identify promising candidates for company referrals.
- **Goals:** Offer 1-on-1 mentorship slots on weekends, share job openings from his company, and filter mentorship inquiries by department and specific technical skills.
- **Pain Points:** Inundated with low-effort spam on LinkedIn; concerns over privacy and unsolicited phone calls; lack of a structured platform specifically dedicated to their alma mater community.
- **Verification Requirement:** Upload of official Anna University Degree Certificate / Provisional Certificate demonstrating graduation.

#### 2.3 Persona 3: Senior Alumni Administrator (3 Designated Trustees)
- **Background:** Three founding senior alumni holding equal administrative responsibilities.
- **Mandate:** Custodians of platform integrity, data privacy, user verification, dispute resolution, and community guidelines.
- **Account Model:** Separate, named, non-shared accounts secured by Multi-Factor Authentication (MFA). No master "super-admin" shared credential.
- **Responsibilities:**
  1. Reviewing pending verification requests and evidence.
  2. Moderating reported content, jobs, and community interactions.
  3. Auditing access logs and system health.
  4. Infrastructure management and security reviews.

---

### 3. MVP Scope Boundaries (Phase 1 Baseline vs Deferred)

| Functional Domain | Phase 1 Scope (Current) | Phase 2 Scope (Next) | Phase 3+ (Future Backlog) |
|---|---|---|---|
| **Design System** | Complete Refined Nano-Brutalism system, design tokens, responsive UI components. | Dark mode option, theme token export. | Custom themes, high-contrast accessibility modes. |
| **Authentication** | Google Sign-in entry points, session state modeling, post-auth role routing. | Production Supabase OAuth, session refresh, MFA for admins. | WebAuthn / Passkeys. |
| **Onboarding & Verification** | Student ID upload (front/back) & Alumni Anna University degree upload workflows, validation boundaries, review status displays. | Supabase Private Storage upload with AES encryption, signed URLs, admin review tooling. | OCR pre-validation, automated student ID watermarking. |
| **Alumni Directory** | Search bar, multi-attribute filtering (dept, year, skills, role, company, location), privacy-masked profile cards. | Paginated backend querying, saved searches, connection requests. | Vector semantic search, alumni map visualization. |
| **Student Dashboard** | Responsive dashboard concept with verification progress, mentorship teasers, jobs preview, and events. | Dynamic live data feeds, personalized recommendations. | Career readiness score, milestone tracker. |
| **Admin Dashboard** | Three-trustee moderation interface concept, verification queues, moderation controls, audit log viewer. | Production reviewer workflow, rejection reason templates, automated audit event capture. | Automated abuse detection, administrative succession protocol. |
| **Messaging** | Schema definition and data model only. | 1-on-1 direct messaging via Supabase Realtime. | Group channels, voice notes, attachments. |
| **Mentorship** | Schema definition and request state machine. | Session scheduling, request accept/decline flows, calendar sync. | Video call integration, feedback loops. |
| **Jobs & Events** | Schema definition and moderation overview UI. | Job posting by verified alumni, event creation and registration. | Application tracking, external ATS links. |

---

### 4. Functional Requirements

#### 4.1 Identity, Authentication & Role Management
- **FR-AUTH-01:** System shall support OAuth 2.0 / OpenID Connect authentication via Google.
- **FR-AUTH-02:** Upon initial login, users without an established role must be directed to the Account Type Selection screen (`student` vs `alumni`).
- **FR-AUTH-03:** The platform shall support exactly four system roles: `guest` (unauthenticated), `student` (verified or pending), `alumni` (verified or pending), and `admin` (restricted to the three designated trustees).
- **FR-AUTH-04:** Unverified accounts shall have restricted permissions (cannot message alumni, cannot view full alumni contact details, cannot post jobs).

#### 4.2 Onboarding & Verification Subsystem
- **FR-VER-01 (Student Evidence):** Students must submit:
  1. Department (from approved Anna University department roster).
  2. Batch / Expected Graduation Year.
  3. College Roll / Register Number.
  4. College ID Card Front image.
  5. College ID Card Back image.
- **FR-VER-02 (Alumni Evidence):** Alumni must submit:
  1. Department and Graduation Year.
  2. Anna University Degree / Provisional Certificate scan or high-resolution photo.
  3. Current Employer, Job Title, Industry, and Work City.
  4. Professional profile link (e.g. LinkedIn or personal portfolio).
- **FR-VER-03 (Verification Workflow):** Verification requests transition through:
  `pending` -> `needs_review` (if document is blurry or missing details) -> `verified` OR `rejected`.
- **FR-VER-04 (Evidence Isolation):** All uploaded verification evidence must reside in private, non-public storage accessible only via short-lived signed URLs generated for authenticated administrators.

#### 4.3 Alumni Directory & Privacy Protection
- **FR-DIR-01:** Verified alumni profiles shall be discoverable via search query and filtered by Department, Graduation Year, Technical Skills, Current Company, Job Title, and Location.
- **FR-DIR-02 (Privacy-Preserving Display):** For public and student views, alumni email addresses and phone numbers are hidden. Only professional headline, department, graduation year, verified badge, and mentorship topic tags are visible.
- **FR-DIR-03:** Contact requests must proceed through an in-platform connection or mentorship request mechanism to prevent harvesting of alumni contact details.

#### 4.4 Senior Alumni Admin Console
- **FR-ADM-01:** Exclusive access granted only to the three designated alumni email addresses verified in the `user_roles` database table.
- **FR-ADM-02:** Administrators can review pending verification queues, inspect uploaded credentials via signed ephemeral viewers, and approve, reject, or request clarification with pre-set explanatory notes.
- **FR-ADM-03:** Every administrative action (status change, moderation action, role check) must emit an immutable `audit_logs` record containing timestamp, administrator user ID, target entity, and reason.

---

### 5. Non-Functional Requirements

#### 5.1 Security & Compliance
- **NFR-SEC-01:** Row Level Security (RLS) must be enabled on 100% of PostgreSQL tables. No table shall rely solely on application-level filtering.
- **NFR-SEC-02:** Identity documents must be treated as Restricted Personal Information under the Digital Personal Data Protection (DPDP) Act 2023 of India.
- **NFR-SEC-03:** Session tokens must be stored in HTTP-only, Secure, SameSite cookies.
- **NFR-SEC-04:** Zero hardcoded credentials or API keys in source control; all sensitive variables must be injected through validated environment configurations.

#### 5.2 Performance & Responsiveness
- **NFR-PERF-01:** Initial page load (FCP) under 1.2s on standard 4G connections.
- **NFR-PERF-02:** Client-side interaction response under 100ms.
- **NFR-PERF-03:** Fully responsive across mobile (320px+), tablet (768px+), desktop (1024px+), and ultra-wide screens.

#### 5.3 Usability & Accessibility
- **NFR-A11Y-01:** WCAG 2.1 Level AA compliance across color contrast, keyboard navigability, and screen reader labels.
- **NFR-A11Y-02:** Respect user `prefers-reduced-motion` settings for all UI transitions.
- **NFR-A11Y-03:** Clear visual feedback for every interactive state: hover, active, focus-visible, disabled, and loading.

---

### 6. Acceptance Criteria for Phase 1 Sign-Off
1. Complete document suite committed to repository (`SRS-v1.1.md`, `architecture.md`, `database-design.md`, `security-and-rls.md`, `verification-policy.md`, `phase-1-plan.md`, `open-decisions.md`).
2. Nano-Brutalist design tokens centralized and implemented in CSS and Tailwind configurations.
3. Functional, interactive prototype covering: Landing Page, Authentication entry, Student Verification, Alumni Verification, Verification Status tracker, Student Dashboard, Alumni Directory, and Admin Console.
4. Complete SQL migration schema defining all 17 tables with indexes, foreign keys, constraints, and RLS policies.
5. Unit tests validating schema integrity and verification state transitions.
6. Clean build, lint, and typecheck passes with strict TypeScript enabled.
