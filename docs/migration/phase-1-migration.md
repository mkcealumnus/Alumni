# Phase 1 Monorepo Migration Record

## 1. Migration Overview

- **Migration Branch:** `chore/monorepo-foundation`
- **Source Repository:** `https://github.com/mkcealumnus/Alumni`
- **Objective:** Restructure the single-page application into a scalable pnpm workspace monorepo orchestrated by Turborepo, establishing shared contracts and foundations for Web, Mobile, Desktop, and Backend API.
- **Production Safety:** The `main` branch was left untouched. All migrations were executed on the dedicated `chore/monorepo-foundation` branch.

---

## 2. Pre-Migration Baseline

Before any file modifications, baseline verification was performed on the original single-app repository:
- **Node.js Version:** `v24.15.0`
- **pnpm Version:** `11.21.0`
- **Baseline Typecheck:** Passed (`tsc --noEmit`)
- **Baseline Tests:** 5 test files, 32 tests passed (`vitest run`)
- **Baseline Build:** Succeeded (`tsc --noEmit && vite build`, bundle size 854 kB JS / 45 kB CSS)

---

## 3. Structural Transformation

### 3.1 Original Structure
```
Alumni/
├── public/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── __tests__/
├── supabase/
│   └── migrations/
├── docs/
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
```

### 3.2 Target Monorepo Structure
```
Alumni/
├── apps/
│   ├── web/                     # Moved React 19 + Vite website
│   │   ├── public/
│   │   ├── src/
│   │   ├── index.html
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   └── wrangler.jsonc
│   ├── mobile/                  # Minimal Expo React Native foundation
│   │   ├── App.tsx
│   │   ├── app.json
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── desktop/                 # Lightweight Tauri desktop foundation
│       ├── package.json
│       ├── tsconfig.json
│       ├── README.md
│       └── src/index.ts
├── services/
│   └── api/                     # Node.js + Fastify 5 REST API foundation
│       ├── package.json
│       ├── tsconfig.json
│       ├── .env.example
│       ├── src/
│       │   ├── app.ts
│       │   ├── server.ts
│       │   ├── config/env.ts
│       │   └── routes/health.ts
│       └── tests/
│           └── health.test.ts
├── packages/
│   ├── types/                   # @alumnux/types
│   ├── schemas/                 # @alumnux/schemas (Zod)
│   ├── domain/                  # @alumnux/domain (Pure business logic)
│   ├── ui-tokens/               # @alumnux/ui-tokens (Framework-neutral tokens)
│   ├── api-client/              # @alumnux/api-client (Universal typed HTTP client)
│   └── config/                  # @alumnux/config (ESLint & TS presets)
├── database/
│   ├── schema/
│   │   └── alumnux_mysql_schema.sql
│   ├── migrations/
│   │   ├── 001_initial_schema.sql
│   │   └── 002_seed_data.sql
│   └── README.md
├── docs/
│   ├── architecture/monorepo-architecture.md
│   ├── migration/phase-1-migration.md
│   ├── development/local-development.md
│   └── deployment/cpanel-deployment.md
├── .github/
│   └── workflows/ci.yml
├── .env.example
├── .gitignore
├── .npmrc
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── turbo.json
├── tsconfig.base.json
└── README.md
```

---

## 4. Key Moves and Adjustments

1. **Git Preservation:**
   - Web application assets, components, pages, tests, and configuration files were relocated using `git mv` to preserve commit history.
2. **Workspaces Configuration:**
   - Configured `pnpm-workspace.yaml` with wildcard globbing `apps/*`, `services/*`, and `packages/*`.
   - Setup Turborepo pipelines in `turbo.json` with dependency caches for `build`, `test`, `typecheck`, `lint`, and `dev`.
3. **Database Relocation:**
   - Supabase legacy SQL files relocated to `database/migrations/` as baseline reference.
   - Authored complete, production-grade MySQL DDL in `database/schema/alumnux_mysql_schema.sql` tailored for cPanel phpMyAdmin.
4. **Tooling & Dependency Compatibility:**
   - Added `allowBuilds: esbuild: true` in `pnpm-workspace.yaml` to ensure non-interactive, deterministic pnpm v11 installations.
   - Refined Fastify 5 request logging configuration in `services/api/src/app.ts` to cleanly disable logging during unit tests without triggering deprecation warnings.
   - Typed Fastify error handler parameters as `FastifyError | Error` to satisfy TypeScript strict mode without type-suppressions.

---

## 5. Build and Test Validation Results

Validation was conducted from the monorepo root across all 10 workspace packages:

| Step | Command | Result |
| :--- | :--- | :--- |
| **Workspace Resolution** | `pnpm install` | **Passed** (All 10 packages resolved, single `pnpm-lock.yaml` created) |
| **Typecheck** | `pnpm run typecheck` | **Passed** (10 packages checked with 0 errors) |
| **Unit Testing** | `pnpm run test` | **Passed** (7 test suites, 34 total tests passed: 32 web tests + 2 API health tests) |
| **Linting** | `pnpm run lint` | **Passed** (0 errors, 0 warnings across web codebase) |
| **Production Build** | `pnpm run build` | **Passed** (All packages and web Vite bundle compiled successfully) |

---

## 6. Risks and Recommendations for Phase 2

1. **Legacy Frontend Mock Data:**
   - The current website in `apps/web` relies on client-side demo state (`src/data/demoData.ts` and `src/context/authContext.tsx`).
   - *Phase 2 Recommendation:* Gradually swap frontend mock authentication calls for the `@alumnux/api-client` endpoints once backend authentication routes are added.
2. **File Upload Handling on cPanel:**
   - Shared hosting may restrict long-running upload requests or multipart size limits in PHP/Node.
   - *Phase 2 Recommendation:* Implement chunked or size-limited upload handlers in `services/api` for student and alumni verification certificates.
3. **cPanel Node.js Process Management:**
   - Ensure CloudLinux Passenger / Node.js Application Manager restart commands are documented and integrated into the deployment pipeline.
