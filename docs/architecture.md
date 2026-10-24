# Technical Architecture Specification
## Project: ALUMNUX — Phase 1 Technical Foundation

**System Overview:** Modern Single Page Application (SPA) architecture built on React 19, Vite, React Router v7, Supabase (PostgreSQL, Auth, Storage, Realtime), Tailwind CSS with Refined Nano-Brutalism design primitives, and strict TypeScript.

---

### 1. High-Level Architecture Diagram

```
+---------------------------------------------------------------------------------+
|                                 CLIENT CLIENTS                                  |
|   +-----------------------+ +-------------------------+ +---------------------+ |
|   | Student Browser       | | Verified Alum Browser   | | 3 Senior Alumni Adm | |
|   +-----------+-----------+ +------------+------------+ +----------+----------+ |
+---------------|--------------------------|-------------------------|------------+
                |                          |                         |
                v                          v                         v
+---------------------------------------------------------------------------------+
|                        REACT 19 + VITE SPA ARCHITECTURE                         |
|                                                                                 |
|   +-------------------------------------------------------------------------+   |
|   | Public Routes (React Router v7):                                        |   |
|   |   - / (Refined Nano-Brutalism Landing Page)                             |   |
|   |   - /privacy, /terms                                                    |   |
|   |   - /auth/login, /auth/register (Google OAuth entry)                    |   |
|   +-------------------------------------------------------------------------+   |
|                                                                                 |
|   +-------------------------------------------------------------------------+   |
|   | Protected Portal Routes (Client Guards + Supabase RLS Session Check):   |   |
|   |   - /onboarding/student & /onboarding/alumni (Verification Journeys)     |   |
|   |   - /onboarding/status (Live Review State Machine)                      |   |
|   |   - /portal/student (Student Dashboard Concept)                         |   |
|   |   - /directory (Alumni Search & Multi-Filter Catalog)                   |   |
|   |   - /admin (3 Senior Alumni Trustee Console)                            |   |
|   +-------------------------------------------------------------------------+   |
|                                                                                 |
|   +-------------------------------------------------------------------------+   |
|   | Shared Component & State Layer:                                         |   |
|   |   - Nano-Brutalist Design System (Tokens, Geometry, Accessible States)  |   |
|   |   - Validation Layer: Zod schemas & React Hook Form                     |   |
|   |   - Supabase Client SDK (Browser & Server Contexts)                     |   |
|   +-------------------------------------------------------------------------+   |
+----------------------------------------+----------------------------------------+
                                         |
                                         | HTTPS / WSS
                                         v
+---------------------------------------------------------------------------------+
|                           SUPABASE MANAGED BACKEND                              |
|                                                                                 |
|   +---------------------+   +-------------------------+   +-------------------+ |
|   | Supabase Auth       |   | PostgreSQL Engine       |   | Supabase Storage  | |
|   | - Google OAuth 2.0  |   | - 17 Relational Tables  |   | - Private Bucket  | |
|   | - JWT Sessions      |   | - Row Level Security    |   |   (Encrypted IDs) | |
|   | - MFA for 3 Admins  |   | - Indexes & Constraints |   | - Ephemeral URLs  | |
|   +---------------------+   +-------------------------+   +-------------------+ |
|                                                                                 |
|   +-------------------------------------------------------------------------+   |
|   | Realtime Engine (Phase 2):                                              |   |
|   | - WebSockets for 1-on-1 Messages & Live Notifications                   |   |
|   +-------------------------------------------------------------------------+   |
+---------------------------------------------------------------------------------+
```

---

### 2. Technology Stack & Decision Matrix

| Layer | Selected Technology | Justification & Architectural Alignment |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | High-performance React Server Components, hybrid SSR/SSG, built-in layout nesting, edge-ready middleware for route protection. |
| **Language** | TypeScript (Strict Mode) | Strong type-safety across database models, DTOs, API contracts, and component props. Prevents runtime regressions. |
| **Styling** | Tailwind CSS + CSS Variables | Direct token integration (`#F8F8F5`, `#171717`, `#3157D5`), zero runtime CSS penalty, precise geometry control for Nano-Brutalism. |
| **UI Primitives** | Custom Nano-Brutalism Primitives (inspired by shadcn/ui) | Unstyled accessible primitives (Radix) styled with 1px borders, restrained 4-8px radius, and high-contrast typography. |
| **Icons** | Lucide React | Clean, geometric, consistent line-weight icons matching the Nano-Brutalist aesthetic. |
| **Database** | PostgreSQL 15+ (via Supabase) | Enterprise-grade relational integrity, foreign key cascading, JSONB flexibility for metadata, and declarative Row Level Security. |
| **Authentication** | Supabase Auth | Native Google OAuth provider, robust JWT session management, RBAC linkage to PostgreSQL `user_roles`. |
| **Storage** | Supabase Storage (Private) | S3-compatible private bucket storage for sensitive student IDs and degree certificates with time-limited signed URLs (max 10-minute TTL). |
| **Validation** | Zod + React Hook Form | Declarative client and server validation sharing single source of truth for verification evidence and profile forms. |
| **Testing** | Vitest | Extremely fast, native TypeScript/ESM test runner for unit validation, state machines, and permission matrices. |
| **CI/CD** | GitHub Actions | Automated linting, type-checking, build verification, and test execution on every pull request. |

---

### 3. Application Structure

The application follows a clean feature-sliced architecture that separates concerns while maintaining high cohesion:

```
alumnux/
├── app/                        # Next.js App Router (Layouts, Pages, Route Handlers)
│   ├── (public)/               # Publicly accessible routes (Landing, About, Terms)
│   │   ├── page.tsx            # Nano-Brutalist Landing Page
│   │   ├── privacy/page.tsx    # DPDP-aligned Privacy Policy
│   │   └── terms/page.tsx      # Platform Terms of Service
│   ├── (auth)/                 # Authentication routes
│   │   ├── login/page.tsx      # Google OAuth login interface
│   │   └── register/page.tsx   # Account creation entry
│   ├── (portal)/               # Protected user application routes
│   │   ├── onboarding/         # Verification intake workflows
│   │   │   ├── student/        # Student ID front/back upload
│   │   │   ├── alumni/         # Anna Univ degree certificate upload
│   │   │   └── status/         # Live review status tracker
│   │   ├── portal/student/     # Student Career Hub & Mentorship
│   │   └── directory/          # Searchable, filterable alumni catalog
│   ├── (admin)/                # Restricted Senior Alumni Administration
│   │   └── admin/page.tsx      # 3-Trustee Verification Queue & Moderation
│   ├── layout.tsx              # Root HTML shell & Font definitions
│   └── globals.css             # Design tokens and base styles
├── components/                 # Reusable UI & Layout Components
│   ├── ui/                     # Nano-Brutalism design system primitives
│   │   ├── button.tsx          # Primary, secondary, outline, danger buttons
│   │   ├── card.tsx            # 1px border, flat surface cards
│   │   ├── badge.tsx           # Status indicators (pending, verified, etc.)
│   │   ├── input.tsx           # Accessible text inputs with focus rings
│   │   ├── select.tsx          # Custom select dropdown
│   │   ├── dialog.tsx          # Accessible modal dialogs
│   │   ├── table.tsx           # Clean tabular data layout
│   │   └── skeleton.tsx        # Loading skeleton primitives
│   ├── layout/                 # Site navigation, footers, role headers
│   │   ├── navbar.tsx          # Minimal header with brand & role switcher
│   │   └── footer.tsx          # Editorial footer with legal links
│   └── forms/                  # Form wrappers with error handling
├── features/                   # Domain-driven feature modules
│   ├── auth/                   # Authentication logic & state
│   ├── verification/           # Verification evidence models & helpers
│   ├── directory/              # Search filters, sorting, alumni data
│   └── admin/                  # Review queue logic & audit handlers
├── lib/                        # Core utilities & shared configurations
│   ├── supabase/               # Supabase browser & server clients
│   ├── validation/             # Zod validation schemas
│   └── tokens.ts               # Nano-Brutalist color & geometry tokens
├── supabase/                   # Database migrations & seed scripts
│   └── migrations/             # Version-controlled SQL scripts
├── tests/                      # Automated unit & integration tests
│   ├── validation.test.ts      # Zod schema test suites
│   └── verification.test.ts    # Review state machine tests
├── docs/                       # Architectural & policy documentation
└── .github/workflows/          # CI/CD pipeline definitions
```

---

### 4. Security Architecture

1. **Authentication:** Next.js middleware inspects session cookies. Unauthenticated requests targeting `/portal/*`, `/onboarding/*`, or `/admin/*` are bounced to `/login`.
2. **Authorization & RBAC:** Supabase PostgreSQL Row Level Security enforces that:
   - Users can only read and mutate their own profile and verification evidence.
   - Only records in `user_roles` with `role = 'admin'` can access the review queue and private verification storage buckets.
3. **Data Protection:** Identity documents are never exposed over public HTTP URLs. Ephemeral pre-signed URLs with a 600-second expiry are minted by server actions strictly for authenticated admins during active review.
