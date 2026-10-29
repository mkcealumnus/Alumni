# Local Development Guide

This guide covers setup and daily development workflows for the **Alumnux** monorepo.

---

## 1. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js:** `v20.x`, `v22.x`, or `v24.x` (Recommended: LTS)
- **pnpm:** `v10.x` or `v11.x` (Tested with `11.21.0`)
- **Git:** Latest version

Verify your local environment:
```powershell
# Windows PowerShell
node --version
pnpm --version
git --version
```
```bash
# macOS / Linux / WSL
node --version
pnpm --version
git --version
```

---

## 2. Initial Setup

1. **Clone the repository and checkout the migration branch:**
   ```powershell
   git clone https://github.com/mkcealumnus/Alumni.git
   cd Alumni
   git checkout chore/monorepo-foundation
   ```

2. **Copy environment configuration:**
   ```powershell
   # Windows PowerShell
   Copy-Item .env.example .env
   Copy-Item apps/web/.env.example apps/web/.env.local
   Copy-Item services/api/.env.example services/api/.env
   Copy-Item apps/mobile/.env.example apps/mobile/.env.local
   ```
   ```bash
   # macOS / Linux / WSL
   cp .env.example .env
   cp apps/web/.env.example apps/web/.env.local
   cp services/api/.env.example services/api/.env
   cp apps/mobile/.env.example apps/mobile/.env.local
   ```

3. **Install workspace dependencies:**
   ```powershell
   pnpm install
   ```

---

## 3. Running Applications in Development

### 3.1 Start All Services Concurrently
Turborepo orchestrates all dev servers concurrently:
```powershell
pnpm run dev
```

### 3.2 Running Individual Applications

#### Web Application (`@alumnux/web`)
Starts Vite dev server on `http://localhost:3000`:
```powershell
pnpm --filter @alumnux/web dev
```

#### API Backend (`@alumnux/api`)
Starts Fastify API server with `tsx watch` on `http://localhost:4000`:
```powershell
pnpm --filter @alumnux/api dev
```
Before the first API start, initialize a **local or disposable MySQL database** with the current MySQL migration sequence:
```powershell
pnpm --filter @alumnux/api db:migrate
```
The API does not run schema changes automatically during startup. Do not point this command at production; inspect and back up any existing database before applying an upgrade.
For XAMPP, configure `DATABASE_HOST=127.0.0.1`, `DATABASE_PORT=3306`, and `DATABASE_NAME=alumnux` in the ignored `apps/api/.env` file. Set `DATABASE_USER` and `DATABASE_PASSWORD` to the values confirmed from your local XAMPP configuration; do not assume a blank password. The tracked `.env.example` uses placeholders only.
Test health check:
```powershell
# Windows PowerShell
Invoke-RestMethod -Uri http://localhost:4000/health
```
```bash
# cURL
curl http://localhost:4000/health
```

#### Mobile Application (`@alumnux/mobile`)
Starts the Expo Metro bundler:
```powershell
pnpm --filter @alumnux/mobile start
```
Options:
- Press `w` to open web preview in browser.
- Press `a` for Android Emulator.
- Press `i` for iOS Simulator.

#### Desktop Application (`@alumnux/desktop`)
Typecheck and validate the desktop package foundation:
```powershell
pnpm --filter @alumnux/desktop typecheck
```

---

## 4. Workspace Verification Commands

Run these commands from the monorepo root:

| Task | Command | Description |
| :--- | :--- | :--- |
| **Typecheck** | `pnpm run typecheck` | Runs `tsc --noEmit` across all workspace packages and apps. |
| **Lint** | `pnpm run lint` | Runs ESLint with zero-warning tolerance. |
| **Test** | `pnpm run test` | Runs Vitest suites for `@alumnux/web` and `@alumnux/api`. |
| **Build** | `pnpm run build` | Builds all packages, API, and the web production bundle. |
| **Clean** | `pnpm run clean` | Cleans build caches and output directories. |

---

## 5. Adding New Dependencies

Always add dependencies through pnpm workspace filters:

```powershell
# Add a production dependency to the web app
pnpm --filter @alumnux/web add <package-name>

# Add a development dependency to the API service
pnpm --filter @alumnux/api add -D <package-name>

# Add an internal workspace dependency
pnpm --filter @alumnux/web add @alumnux/types@workspace:*
```
