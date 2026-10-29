# Alumnux Stage 4A — Backend Functionality Audit

Audit date: 2026-10-29  
Branch: `monorepo`  
HEAD: `14a669ab3bb46a6382cd93d7fc1c5291a7061414`  
Working tree: contains uncommitted Stage 2/3 work, the manual SQL deliverable, and Stage 4A fixes. No changes were reset or committed.

## Architecture

- Fastify API (`apps/api`) registers health, authentication, directory, mentorship, and messaging route modules.
- Authentication logic lives in `AuthService` and `AuthRepository`; mentorship, directory, and messaging routes execute SQL directly through `IDatabaseClient`.
- `connection.ts` selects an in-memory seeded provider in `NODE_ENV=test`; otherwise it creates a `mysql2` pool.
- The shared `@alumnux/api-client` is used by web and mobile clients. Web and mobile also maintain token storage and API base URL configuration.
- `workers/queue-worker` is a placeholder. It logs that it is listening, but has no queue transport, polling, job handlers, or persistence.
- No API integration to email, file storage, or other external service is implemented.

## Environment and database access

- API database settings: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`.
- TCP check to `127.0.0.1:3306` returned `False` from this execution environment. XAMPP server version, selected database, actual schema, foreign keys, indexes, records, and migration ledger could not be inspected.
- No credentials or user data were printed. No database connection or write was attempted.
- All runtime persistence checks are **BLOCKED**. `pnpm --filter @alumnux/api test` exercises the mock provider and is not real MySQL verification.

## Complete endpoint inventory

`Auth` below means a valid bearer access token. Public endpoints do not require it. All endpoints use JSON success/error envelopes except `/health`, whose payload is the health response schema. Runtime status for every route is **BLOCKED** because local MySQL is unreachable; mock test coverage is shown separately.

| Method and route | Handler; auth and authorization | Request / response contract | Database work | Client and tests |
|---|---|---|---|---|
| `GET /health` | `routes/health.ts`; public | No request schema; `HealthCheckResponse` plus database state | `db.ping()` | health test (mock); runtime **BLOCKED** |
| `POST /v1/auth/signup` | `modules/auth/auth.routes.ts`; public | `signupSchema` → auth response | email lookup; transaction inserts user/profile; inserts session | shared API client; auth suite; runtime **BLOCKED** |
| `POST /v1/auth/login` | same; public | `loginSchema` → auth response | user/profile lookup; inserts session | shared API client; auth suite; runtime **BLOCKED** |
| `POST /v1/auth/refresh` | same; public, refresh token in body or cookie | optional `refreshSchema.refreshToken` → tokens | session/user lookup; revoke old session; insert replacement | shared API client; auth suite; runtime **BLOCKED** |
| `POST /v1/auth/logout` | same; public, token in body or cookie | optional unvalidated body `refreshToken`; success message | session lookup and revoke if active | shared API client; auth suite; runtime **BLOCKED** |
| `POST /v1/auth/logout-all` | same; Auth | no body schema; success and revoked count | revokes all active user sessions | shared API client; auth suite; runtime **BLOCKED** |
| `GET /v1/auth/me` | same; Auth | no request schema; user and profile | user/profile lookup | shared API client; auth suite; runtime **BLOCKED** |
| `PATCH /v1/auth/me` | same; Auth | `updateProfileSchema` → user and profile | dynamic update of validated profile fields | shared API client; auth suite; runtime **BLOCKED** |
| `GET /v1/directory` | `modules/directory/directory.routes.ts`; public | `directoryQuerySchema` → camelCase users and pagination metadata | users/profiles join; remaining filters/pagination in application | shared API client; directory suite; runtime **BLOCKED** |
| `GET /v1/mentorship/requests` | `modules/mentorship/mentorship.routes.ts`; Auth; results limited to requester/recipient | no body; camelCase mentorship requests | select by `requester_id` or `recipient_id` | shared API client; mentorship suite; runtime **BLOCKED** |
| `POST /v1/mentorship/requests` | same; Auth; student only, recipient must be alumni | `createMentorshipRequestSchema` → request | user-role lookup; insert `mentorship_requests` | shared API client; mentorship suite; runtime **BLOCKED** |
| `PATCH /v1/mentorship/requests/:id/status` | same; Auth; recipient may accept/decline, requester may cancel; only pending transition | `updateMentorshipStatusSchema` → request | transaction, row lock, guarded update | shared API client; mentorship suite; runtime **BLOCKED** |
| `GET /v1/conversations` | `modules/messages/messages.routes.ts`; Auth; participants only | no body; conversation list | conversation query, profile lookups, messages for unread counts | shared API client; messaging suite; runtime **BLOCKED** |
| `POST /v1/conversations` | same; Auth; student/alumni pair only after Stage 4A fix | `createConversationSchema` → conversation | participant role lookup; existing conversation lookup; insert if absent; profile/message hydration | shared API client; messaging suite; runtime **BLOCKED** |
| `GET /v1/conversations/:id` | same; Auth; participant or admin | no body; conversation | conversation, profile, message lookups | shared API client; messaging suite; runtime **BLOCKED** |
| `GET /v1/conversations/:id/messages` | same; Auth; participant or admin | no body; camelCase messages | conversation authorization; ordered message select | shared API client; messaging suite; runtime **BLOCKED** |
| `POST /v1/conversations/:id/messages` | same; Auth; participant only | `sendMessageSchema` → created message | conversation authorization; profile lookup; insert message; update preview | shared API client; messaging suite; runtime **BLOCKED** |
| `PATCH /v1/conversations/:id/read` | same; Auth; participant only | empty body; success | transaction/row lock; marks other participant’s messages read | shared API client; messaging suite; runtime **BLOCKED** |

Total registered HTTP endpoints: **18**. Route registration is in `apps/api/src/app.ts`. No other API route or worker endpoint is registered. The mobile screens for careers, events, verification/admin console are not backed by corresponding API routes.

## Database and contract compatibility

The migration runner’s ordered MySQL path is `001_create_auth_tables.sql`, `002_create_mentorship_tables.sql`, `005_mysql_api_schema_alignment.sql`, and now `006_add_profile_avatar_url.sql`. The PostgreSQL migration and duplicate historical migrations are not in that path.

The Stage 4A fix adds `profiles.avatar_url`, which the directory handler selects but migrations 001/005 previously did not create. The manual setup SQL already includes it and its ledger now records migration 006. The migration runner checks `information_schema` before `ADD COLUMN` and skips the column when it already exists.

The API directly expects physical snake_case columns. Route serializers map database fields to camelCase response properties; renaming columns would break SQL. The manual SQL schema follows this mapping. The API directory derives department display names from the domain package rather than a database `departments` table.

The legacy `apps/api/src/db/schema/alumnux_mysql_schema.sql` is incompatible with current mentorship SQL: it defines `student_id`/`alumni_id`, requires a topic and references `mentorship_topics`, and uses a status enum containing `COMPLETED`; current code expects `requester_id`/`recipient_id`, nullable `topic_id`, and `CANCELLED`. The fresh manual setup file defines only the current pair and documents the semantic mapping (`student_id` → `requester_id`; `alumni_id` → `recipient_id`). **There is no validated, record-preserving upgrade for a database already created from the legacy schema.** Do not point the current API at that legacy schema until a separate migration is prepared and tested.

Other API/schema notes:

- `conversations.mentorship_request_id` is not a foreign key and conversation creation does not validate that a supplied mentorship request exists, is accepted, or belongs to the two participants.
- `messages.sender_id` has no user foreign key in the canonical migration; conversation deletion cascades messages.
- `auth_sessions.last_used_at` exists but is not updated by the service.
- No uniqueness constraint prevents duplicate `(student_id, alumni_id)` conversations under concurrent requests.
- API serializers use camelCase for auth/profile, directory, mentorship, conversation, and message objects. Tests cover directory naming, but contract schemas are mostly TypeScript interfaces rather than runtime response validators.

## Feature verification matrix

| Feature | Classification | Evidence / limits |
|---|---|---|
| Authentication and profiles | **PARTIAL** | Mock tests cover signup/login/session flows and profile behavior. Passwords are bcrypt-hashed; refresh secrets are SHA-256 hashed in storage. JWT issuer/audience/expiry are checked. Real MySQL persistence is **BLOCKED**. Concurrent refresh rotation is not atomic (finding F3). |
| Directory | **PARTIAL** | Mock test covers record retrieval, department/query filtering, pagination metadata, and camelCase response keys. Real SQL execution is **BLOCKED**. Directory currently includes `PENDING_VERIFICATION` users; intended visibility policy needs confirmation and verification backend is absent. |
| Mentorship | **PARTIAL** | Mock tests cover create/list, role constraints, ownership, accept/decline/cancel, and invalid transitions. Update uses a transaction and `FOR UPDATE`. Real schema is **BLOCKED**; legacy schema is incompatible as detailed above. |
| Messaging | **PARTIAL** | Mock tests cover conversation list/create, duplicate sequential create, message send/list, participant checks, read state, and invalid IDs. F2 fixes invalid participant roles. Real persistence and concurrent duplicate creation are **BLOCKED**. |
| Worker and integrations | **MOCKED / MISSING** | Worker is a logging placeholder; no queue or email/document processing integration exists. |
| Trustee verification, careers/jobs, events, notifications | **MISSING** | UI/shared model/schema remnants exist, but no corresponding API endpoints and no canonical MySQL migration path implement these workflows. No tables were invented for them in the manual SQL deliverable. |

## Prioritized findings and fixes

### F1 — P1: Canonical fresh schema omitted a column used by the directory API

`GET /v1/directory` selects `p.avatar_url`, but canonical migrations 001 and 005 did not add that field. A fresh database created by the API migration runner would fail the query. Fixed with additive migration `006_add_profile_avatar_url.sql`; included in the migration allowlist, migration selection test, and manual setup ledger. Existing local DB state could not be inspected.

### F2 — P2: Conversation creation accepted same-role or nonexistent participants

The old handler inferred the peer role from the caller role without checking the peer record. Fixed with a participant lookup, explicit student/alumni-only caller check, 404 for a missing participant, and 400 unless the pair has opposite roles. Added a regression test for same-role and missing peers.

### F3 — P1: Refresh rotation is not atomic

`AuthService.refresh` reads an active session, then revokes it and inserts its replacement in separate repository calls. Concurrent refresh requests can both pass the active-session check and issue separate valid replacements. No MySQL concurrency test can be run here. A safe fix needs an atomic transaction with row locking and regression coverage against MySQL; deferred rather than claiming mock verification is sufficient.

### F4 — P1: Legacy mentorship schema cannot serve current API queries

The old MySQL dump uses `student_id`/`alumni_id` and an incompatible topic/status design. The current API selects/inserts `requester_id`/`recipient_id` and expects current status values. A data-preserving conversion has not been implemented or tested; database unavailability prevents inspecting whether it applies to the user's local DB.

### F5 — P2: Mentorship link on a new conversation is not validated

The API accepts `mentorshipRequestId` as an optional string and stores it without checking the request or its participants/status. The column has no FK in the canonical migration. This can create misleading or orphaned linkage; fix requires an API policy decision and schema migration.

### F6 — P2: Duplicate conversation creation can race

The handler performs a read-before-insert, but no unique pair constraint exists. Sequential mock coverage passes; concurrent MySQL callers can both insert. Adding the constraint safely requires checking existing duplicates and an isolated migration test, unavailable here.

### F7 — P2: Unverified account visibility is unclear

Signup assigns `PENDING_VERIFICATION`, while directory explicitly includes that status. Verification review endpoints do not exist. Confirm the intended policy before exposing pending profiles in the public directory; no privacy policy was inferred in this audit.

## Mock/demo behavior

- `NODE_ENV=test` always selects `MockDatabaseClient`; it is seeded with demo users, one conversation, and messages. A successful API test proves handler behavior against that mock only.
- Web/mobile have local demo data and local authentication/UI state paths. Their real API clients are configured separately; fallback behavior is client-specific and should not be mistaken for server persistence.
- Queue worker logs “listening” but has no actual job transport or processing.
- No database seed is part of the canonical MySQL migration sequence. The older schema dump contains department demo rows, but it is not the API migrator path.

## Tests run and changed files

- `pnpm --filter @alumnux/api test` — **passed**, 6 files / 30 tests after fixes. This uses the in-memory provider and does not verify SQL execution or persistence.
- TCP reachability — `Test-NetConnection 127.0.0.1 -Port 3306` returned `False`.
- No live API request, database query, migration, or persistence test was performed.
- Regression changes: migration 006 and allowlist test; conversation participant role validation and negative tests.
- Existing Stage 2/3 changes and `database/alumnux_manual_setup.sql` were preserved.

## Next steps / blockers

1. Start the local XAMPP MySQL/MariaDB server in an environment accessible to the API and verify the selected database/version without exposing credentials.
2. Inspect the actual schema and migration ledger read-only; determine whether it is fresh, manual setup, or legacy. Back up existing records before preparing any upgrade.
3. For legacy mentorship rows, test an explicit value-preserving rename/copy and enum/topic compatibility conversion on a disposable database before proposing any operation on `alumnux`.
4. Make refresh-token rotation transactional and test simultaneous use against MySQL.
5. Decide whether pending/unverified users may appear in the public directory; implement verification backend separately if required.

No production, local, or other database was modified. No commit, push, or deployment was performed.
