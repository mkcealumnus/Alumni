# ALUMNUX — Monorepo Architecture & Clean App Foundation

> **Platform Tagline:** Your Network. Your Next Chapter.  
> **Category:** Independent Student Career Guidance & Alumni Networking Platform  
> **Production Domain:** [https://mkcealumni.org](https://mkcealumni.org/)  
> **Monorepo Architecture:** pnpm Workspaces + Turborepo  
> **Backend Service:** Fastify 5 + TypeScript (Node.js)  
> **Target Database:** MySQL 8.0+ on cPanel Shared Hosting  
> **Client Applications:** Web (React 19 + Vite), Mobile (Expo React Native), Desktop (Tauri Foundation)

---

## 1. Project Overview & Governance

**Alumnux** is an independent career guidance and alumni networking ecosystem connecting ambitious students with industry-experienced alumni. The platform offers mentorship workflows, directory searches, job referrals, and structured institutional verification.

### Independent Governance Notice
Alumnux is independently maintained and governed by **three senior alumni trustees**. It is not an officially managed college platform, and institutional administration or faculty have no direct operational access or control over user verification.

---

## 2. Monorepo Architecture Summary

The repository is structured as a **pnpm monorepo** managed with **Turborepo** to ensure code reuse, contract consistency, and fast cached builds across all deployment targets:

```mermaid
graph TD
    subgraph Clients ["Applications (apps/)"]
        Web["@alumnux/web<br/>(React 19 + Vite)"]
        Mobile["@alumnux/mobile<br/>(Expo React Native)"]
        Desktop["@alumnux/desktop<br/>(Tauri Foundation)"]
    end

    subgraph Core ["Shared Core (packages/)"]
        Types["@alumnux/types"]
        Schemas["@alumnux/schemas"]
        Domain["@alumnux/domain"]
        Tokens["@alumnux/ui-tokens"]
        Client["@alumnux/api-client"]
        Config["@alumnux/config"]
    end

    subgraph Backend ["Services (services/)"]
        API["@alumnux/api<br/>(Fastify 5 Node REST)"]
    end

    subgraph Storage ["Database (database/)"]
        MySQL[("MySQL 8.0+<br/>(cPanel Hosted)")]
    end

    Web --> Core
    Mobile --> Core
    Desktop --> Core
    API --> Types
    API --> Schemas
    API --> Domain

    Web -.->|HTTP REST| API
    Mobile -.->|HTTP REST| API
    Desktop -.->|HTTP REST| API
    API -.->|mysql2| MySQL
```

---

## 3. Repository Directory Tree

```
Alumni/
├── apps/
│   ├── web/                     # Preserved web frontend (React 19, Vite, Tailwind CSS, React Router 7)
│   ├── mobile/                  # Minimal Expo React Native foundation for Android & iOS
│   └── desktop/                 # Lightweight Tauri desktop application foundation
├── services/
│   └── api/                     # Node.js Fastify REST API service with /health endpoint
├── packages/
│   ├── types/                   # @alumnux/types: Domain, user, verification, and API types
│   ├── schemas/                 # @alumnux/schemas: Shared Zod validation schemas
│   ├── domain/                  # @alumnux/domain: Pure business logic & lifecycle rules
│   ├── ui-tokens/               # @alumnux/ui-tokens: Cross-platform design tokens
│   ├── api-client/              # @alumnux/api-client: Typed HTTP client for all apps
│   └── config/                  # @alumnux/config: ESLint & TypeScript presets
├── database/
│   ├── schema/                  # Production MySQL DDL schema for cPanel / phpMyAdmin
│   └── migrations/              # Database migration history
├── docs/
│   ├── architecture/            # Monorepo architecture & request flow specs
│   ├── migration/               # Phase 1 migration logs & verification data
│   ├── development/             # Comprehensive local development workflows
│   └── deployment/              # cPanel shared hosting production deployment guide
├── .github/
│   └── workflows/ci.yml         # GitHub Actions CI workflow (Build, Lint, Typecheck, Test)
├── .env.example                 # Root environment template
├── .gitignore                   # Multi-workspace Git exclusion rules
├── .npmrc                       # pnpm configuration
├── package.json                 # Monorepo root manifest
├── pnpm-workspace.yaml          # Workspace package mapping & build script approvals
├── turbo.json                   # Turborepo task pipeline configuration
├── tsconfig.base.json           # Shared base TypeScript configuration
└── README.md                    # Project documentation
```

---

## 4. Workspace Packages

| Package / App | Version | Status | Purpose |
| :--- | :---: | :---: | :--- |
| **`@alumnux/web`** | `1.0.0` | Active | Full-featured responsive website preserving all pages, components, and tests |
| **`@alumnux/mobile`** | `1.0.0` | Foundation | Expo React Native app with API health check and role picker |
| **`@alumnux/desktop`** | `1.0.0` | Placeholder | Tauri v2 desktop client foundation with API client binding |
| **`@alumnux/api`** | `1.0.0` | Active | Fastify REST API with `/health`, CORS, error handling, and request logging |
| **`@alumnux/types`** | `1.0.0` | Core | Shared domain interfaces (`UserRole`, `UserProfile`, `VerificationStatus`) |
| **`@alumnux/schemas`** | `1.0.0` | Core | Shared Zod schemas (Student/Alumni verification, Admin decision, Auth) |
| **`@alumnux/domain`** | `1.0.0` | Core | Business rules (Department catalog, verification lifecycle, grad year rules) |
| **`@alumnux/ui-tokens`** | `1.0.0` | Core | Design system tokens (colors, radii, spacing, typography, motion) |
| **`@alumnux/api-client`** | `1.0.0` | Core | Universal typed fetch client with configurable base URL and error models |
| **`@alumnux/config`** | `1.0.0` | Core | Reusable TypeScript compiler options and ESLint configurations |

---

## 5. Prerequisites & Getting Started

### Prerequisites
- **Node.js:** `v20.x`, `v22.x`, or `v24.x` (Tested with `v24.15.0`)
- **pnpm:** `v10.x` or `v11.x` (Tested with `11.21.0`)

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/mkcealumnus/Alumni.git
cd Alumni

# 2. Checkout the migration branch
git checkout chore/monorepo-foundation

# 3. Install all workspace dependencies
pnpm install
```

### Environment Setup
Copy the environment template files:
```bash
# Windows PowerShell
Copy-Item .env.example .env
Copy-Item apps/web/.env.example apps/web/.env.local
Copy-Item services/api/.env.example services/api/.env
Copy-Item apps/mobile/.env.example apps/mobile/.env.local
```
```bash
# Unix / macOS
cp .env.example .env
cp apps/web/.env.example apps/web/.env.local
cp services/api/.env.example services/api/.env
cp apps/mobile/.env.example apps/mobile/.env.local
```

---

## 6. Development & Running Applications

### Run All Dev Tasks Concurrently
```bash
pnpm run dev
```

### Run Specific Workspaces
```bash
# Web application (http://localhost:3000)
pnpm --filter @alumnux/web dev

# API Backend (http://localhost:4000)
pnpm --filter @alumnux/api dev

# Mobile application (Expo Metro bundler)
pnpm --filter @alumnux/mobile start
```

---

## 7. Build, Test, Typecheck & Lint

Run repository-wide commands powered by Turborepo:

```bash
# Run typechecks across all 10 workspaces
pnpm run typecheck

# Run unit tests (Web vitest + API health check tests)
pnpm run test

# Run ESLint across codebases
pnpm run lint

# Build all packages, API, and web distribution bundle
pnpm run build
```

---

## 8. Current Limitations & Next Phases

### Current Phase 1 Status
- Monorepo restructuring complete with pnpm workspaces and Turborepo.
- The existing website is running from `apps/web` with all functionality preserved.
- Shared packages (`types`, `schemas`, `domain`, `ui-tokens`, `api-client`, `config`) are established.
- API foundation (`services/api`) is operational with `/health` endpoint and tests.
- Minimal mobile (`apps/mobile`) and desktop (`apps/desktop`) foundations established.
- Complete MySQL schema for cPanel phpMyAdmin created in `database/schema/`.

### Phase 2 Roadmap
1. **Server-Backed Authentication:** Transition from client-side mock auth in `apps/web` to JWT-based session management in `services/api`.
2. **Database Migrations:** Connect `services/api` to MySQL via `mysql2` or `knex` with automated migrations.
3. **Verification Pipeline:** Implement secure document upload handling on cPanel for student and degree credentials.
4. **Mobile Screens:** Build out native student and alumni screens in `apps/mobile` consuming the shared API.
5. **Redesigned Web Application:** Launch the next-generation web frontend using the shared design tokens and API client.
