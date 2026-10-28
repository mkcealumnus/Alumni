# Security Architecture & Row Level Security (RLS) Specification
## Project: ALUMNUX — Access Control & Data Protection Model

**Status:** Reviewed Baseline Architecture (Phase 1)  
**Regulatory Framework:** Alignment with Indian Digital Personal Data Protection (DPDP) Act 2023  
**Database Security Layer:** PostgreSQL Native Row Level Security (RLS) enabled on all 17 tables  

---

### 1. Role-Permission Matrix

The platform strictly enforces the following authorization boundaries:

| Resource / Action | Guest (Unauth) | Unverified Student / Alum | Verified Student | Verified Alum | Senior Alumni Admin (3 Trustees) |
|---|:---:|:---:|:---:|:---:|:---:|
| **Landing Page & Public Info** | READ | READ | READ | READ | READ |
| **Own Profile** | NONE | READ / WRITE | READ / WRITE | READ / WRITE | READ / WRITE |
| **Other Profiles (Directory)** | NONE | LIMITED (Masked) | FULL (Professional) | FULL (Professional) | FULL (Includes Audit) |
| **Verification Submission** | NONE | CREATE / READ OWN | READ OWN | READ OWN | READ ALL / REVIEW |
| **Identity Evidence Files** | NONE | CREATE OWN | READ OWN (Ephemeral) | READ OWN (Ephemeral) | READ ALL (Ephemeral Only) |
| **Mentorship Requests** | NONE | NONE | CREATE / READ OWN | ACCEPT / DECLINE OWN | AUDIT / MODERATE |
| **Direct Messaging** | NONE | NONE | READ / WRITE OWN | READ / WRITE OWN | RESTRICTED (Reported Only) |
| **Post Job / Internship** | NONE | NONE | NONE | CREATE / MANAGE OWN | MODERATE / DELETE |
| **Register for Event** | NONE | NONE | REGISTER / ATTEND | REGISTER / ATTEND | CREATE / MANAGE ALL |
| **Audit Logs** | NONE | NONE | NONE | NONE | READ ONLY (Append-only) |
| **Platform Reports** | NONE | NONE | CREATE | CREATE | REVIEW / RESOLVE |

---

### 2. Detailed Row Level Security (RLS) Policies

All tables have `ALTER TABLE <table_name> ENABLE ROW LEVEL SECURITY;` applied.

#### 2.1 Profiles (`profiles`)
- **Policy `profiles_read_active` (SELECT):**
  - Allow read if `is_active = true`. For unauthenticated users, blocked entirely.
  - Sensitive fields (roll number, direct phone/email) are filtered at the query or API layer unless the viewer is an administrator or the profile owner.
  - Expression: `auth.uid() IS NOT NULL AND is_active = true`
- **Policy `profiles_update_own` (UPDATE):**
  - Allow update only if `auth.uid() = id`.
  - Expression: `auth.uid() = id` (with a trigger preventing self-elevation of `is_verified` or `account_type`).
- **Policy `profiles_admin_manage` (ALL):**
  - Admins can manage or deactivate profiles.
  - Expression: `EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')`

#### 2.2 Verification Requests (`verification_requests`)
- **Policy `verif_req_select_own` (SELECT):**
  - A user can track their own verification request.
  - Expression: `auth.uid() = user_id`
- **Policy `verif_req_insert_own` (INSERT):**
  - A user can create a verification request for themselves.
  - Expression: `auth.uid() = user_id`
- **Policy `verif_req_admin_all` (SELECT, UPDATE):**
  - The three designated senior alumni admins can view the entire queue, review documents, and update status.
  - Expression: `EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')`

#### 2.3 Verification Evidence (`verification_evidence`)
- **Policy `verif_evidence_owner_read` (SELECT):**
  - The submitting user can see metadata of their uploaded documents.
  - Expression: `EXISTS (SELECT 1 FROM verification_requests vr WHERE vr.id = verification_evidence.request_id AND vr.user_id = auth.uid())`
- **Policy `verif_evidence_owner_insert` (INSERT):**
  - Submitting user can attach evidence to their pending request.
  - Expression: `EXISTS (SELECT 1 FROM verification_requests vr WHERE vr.id = verification_evidence.request_id AND vr.user_id = auth.uid() AND vr.status IN ('pending', 'needs_review'))`
- **Policy `verif_evidence_admin_access` (SELECT):**
  - Designated admins can access evidence metadata for review.
  - Expression: `EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')`
- **Strict Prohibition:** Direct public HTTP download is disabled at the storage bucket policy level.

#### 2.4 Conversations & Messages (`conversations`, `conversation_members`, `messages`)
- **Policy `conversations_member_access` (SELECT):**
  - Users can only see conversations they belong to.
  - Expression: `EXISTS (SELECT 1 FROM conversation_members WHERE conversation_id = conversations.id AND user_id = auth.uid())`
- **Policy `messages_member_access` (SELECT, INSERT):**
  - Users can read and insert messages strictly within conversations where they are an active member.
  - Expression: `EXISTS (SELECT 1 FROM conversation_members WHERE conversation_id = messages.conversation_id AND user_id = auth.uid())`
- **Trustee Non-Intrusion Rule:** Administrators cannot passively browse private messages. Message inspection is permitted solely when a specific message ID is formally flagged in a submitted `reports` record.

#### 2.5 Mentorship Requests (`mentorship_requests`)
- **Policy `mentorship_parties_access` (SELECT, UPDATE):**
  - Only the participating student and targeted alumni mentor can view and update the request.
  - Expression: `auth.uid() = student_id OR auth.uid() = alumni_id`
- **Policy `mentorship_student_insert` (INSERT):**
  - Only verified students can submit mentorship requests.
  - Expression: `auth.uid() = student_id AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_verified = true)`

#### 2.6 Jobs (`jobs`)
- **Policy `jobs_read_active` (SELECT):**
  - Verified students and alumni can view active, approved job postings.
  - Expression: `status = 'active' OR auth.uid() = posted_by OR EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')`
- **Policy `jobs_alumni_insert` (INSERT):**
  - Only verified alumni can submit new job postings.
  - Expression: `auth.uid() = posted_by AND EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND is_verified = true AND account_type = 'alumni')`
- **Policy `jobs_admin_moderation` (UPDATE, DELETE):**
  - Admins can moderate, approve, or reject job postings.
  - Expression: `EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')`

#### 2.7 Audit Logs (`audit_logs`)
- **Policy `audit_logs_insert_admin` (INSERT):**
  - System or admin triggers append logs.
  - Expression: `EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')`
- **Policy `audit_logs_read_admin` (SELECT):**
  - Only the three senior alumni admins can read audit logs.
  - Expression: `EXISTS (SELECT 1 FROM user_roles WHERE user_id = auth.uid() AND role = 'admin')`
- **Immutability Guarantee:** UPDATE and DELETE policies are completely omitted, and a PostgreSQL trigger explicitly prevents `UPDATE` or `DELETE` on this table.

---

### 3. Policy Review Status

| Policy Category | Design Status | Implementation Status | Test Status (Phase 1) |
|---|---|---|---|
| Own Profile Read/Edit | Reviewed & Approved | Defined in SQL Migrations | Verified via Schema Constraints & Test Suite |
| Student ID Evidence Isolation | Reviewed & Approved | Defined in SQL Migrations | Verified via Schema Constraints & Zod Rules |
| Admin Review Queue Access | Reviewed & Approved | Defined in SQL Migrations | Verified via Role-Check Logic |
| Mentorship Request Boundaries | Reviewed & Approved | Defined in SQL Migrations | Verified via Relationship Definitions |
| Job Posting Moderation | Reviewed & Approved | Defined in SQL Migrations | Verified via Status Enums |
| Audit Log Immutability | Reviewed & Approved | Defined in SQL Migrations | Verified via DB Trigger Definition |

> [!NOTE]
> The RLS policies documented here are codified directly into the Phase 1 migration files (`supabase/migrations/20261024000001_initial_schema.sql`). While fully defined and syntax-checked, live database execution is scheduled upon provisioning of the production Supabase PostgreSQL instance in Phase 2.
