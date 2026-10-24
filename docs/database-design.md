# Relational Database Design Specification
## Project: ALUMNUX — PostgreSQL Schema Foundation

**Engine:** PostgreSQL 15+ (via Supabase)  
**Schema Version:** 1.0  
**Security Model:** 100% Tables Protected by Row Level Security (RLS)  
**Total Tables:** 17

---

### 1. Entity-Relationship Overview

The database is structured into four primary functional clusters:
1. **Identity, Core Profiles & Access Control:** `profiles`, `departments`, `user_roles`, `skills`, `profile_skills`
2. **Verification & Evidence Subsystem:** `verification_requests`, `verification_evidence`
3. **Communication & Mentorship:** `conversations`, `conversation_members`, `messages`, `mentorship_requests`
4. **Opportunities, Community & Platform Governance:** `jobs`, `events`, `event_registrations`, `notifications`, `reports`, `audit_logs`

---

### 2. Comprehensive Table Catalog

#### 2.1 Cluster 1: Identity & Profiles

##### 1. `departments`
- **Purpose:** Canonical roster of academic departments (e.g., Computer Science & Engineering, Information Technology, Mechanical, etc.).
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `code` (VARCHAR(16), UNIQUE, NOT NULL) — e.g., 'CSE', 'IT', 'ECE'
  - `name` (TEXT, NOT NULL) — e.g., 'Computer Science and Engineering'
  - `is_active` (BOOLEAN, DEFAULT true)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
- **Indexes:** `idx_departments_code` ON `code`
- **Access:** Public read; Write restricted to senior alumni admins.

##### 2. `profiles`
- **Purpose:** Core profile information for all users (students, alumni, and administrators) extending Supabase `auth.users`.
- **Columns:**
  - `id` (UUID, Primary Key, References `auth.users(id)` ON DELETE CASCADE)
  - `email` (TEXT, UNIQUE, NOT NULL)
  - `full_name` (TEXT, NOT NULL)
  - `avatar_url` (TEXT)
  - `headline` (TEXT) — e.g., 'Senior Cloud Architect @ AWS' or 'Pre-final Year CSE Undergrad'
  - `bio` (TEXT)
  - `account_type` (VARCHAR(20), NOT NULL) — CHECK (`account_type` IN ('student', 'alumni', 'admin'))
  - `department_id` (UUID, References `departments(id)` ON DELETE SET NULL)
  - `graduation_year` (INTEGER) — CHECK (`graduation_year` BETWEEN 1970 AND 2040)
  - `roll_number` (VARCHAR(32)) — Student register/roll number (private)
  - `current_company` (TEXT) — For alumni
  - `current_role` (TEXT) — For alumni
  - `experience_years` (NUMERIC(4,1)) — For alumni
  - `location_city` (TEXT)
  - `location_country` (TEXT, DEFAULT 'India')
  - `linkedin_url` (TEXT)
  - `github_url` (TEXT)
  - `portfolio_url` (TEXT)
  - `is_verified` (BOOLEAN, DEFAULT false)
  - `is_active` (BOOLEAN, DEFAULT true)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
  - `updated_at` (TIMESTAMPTZ, DEFAULT now())
- **Indexes:** `idx_profiles_account_type`, `idx_profiles_dept_year`, `idx_profiles_search` (GIN index on `full_name`, `current_company`, `current_role`).
- **Deletion:** Cascades on auth user deletion.
- **Privacy:** Public/students see name, headline, company, role, grad year. Contact info masked until mutual connection.

##### 3. `user_roles`
- **Purpose:** Explicit platform role assignments. Crucially defines the exactly three senior alumni administrators.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `user_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `role` (VARCHAR(20), NOT NULL) — CHECK (`role` IN ('student', 'alumni', 'admin'))
  - `assigned_by` (UUID, References `profiles(id)`)
  - `assigned_at` (TIMESTAMPTZ, DEFAULT now())
- **Constraints:** UNIQUE (`user_id`, `role`)
- **Access:** Admin read/write; self read.

##### 4. `skills`
- **Purpose:** Standardized skills repository for tagging profiles, mentorship areas, and job requirements.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `name` (TEXT, UNIQUE, NOT NULL)
  - `category` (VARCHAR(32), NOT NULL) — e.g., 'Frontend', 'Backend', 'Cloud', 'Data Science', 'Core Engineering'
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
- **Indexes:** `idx_skills_name`

##### 5. `profile_skills`
- **Purpose:** Many-to-many relationship linking profiles to their verified or claimed skills.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `profile_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `skill_id` (UUID, References `skills(id)` ON DELETE CASCADE, NOT NULL)
  - `years_experience` (NUMERIC(4,1))
  - `is_primary` (BOOLEAN, DEFAULT false)
- **Constraints:** UNIQUE (`profile_id`, `skill_id`)

---

#### 2.2 Cluster 2: Verification & Evidence Subsystem

##### 6. `verification_requests`
- **Purpose:** Tracks the formal verification lifecycle of students and alumni accounts.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `user_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `account_type` (VARCHAR(20), NOT NULL) — CHECK (`account_type` IN ('student', 'alumni'))
  - `status` (VARCHAR(20), NOT NULL, DEFAULT 'pending') — CHECK (`status` IN ('pending', 'needs_review', 'verified', 'rejected'))
  - `submitted_at` (TIMESTAMPTZ, DEFAULT now())
  - `reviewed_by` (UUID, References `profiles(id)`)
  - `reviewed_at` (TIMESTAMPTZ)
  - `rejection_reason` (TEXT)
  - `review_notes` (TEXT) — Internal notes for the 3 admins
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
  - `updated_at` (TIMESTAMPTZ, DEFAULT now())
- **Indexes:** `idx_verif_status`, `idx_verif_user_id`
- **Access:** Owner can view their own; Only admins can view queue, claim, and update status.

##### 7. `verification_evidence`
- **Purpose:** Metadata and private storage references for identity documents submitted for verification.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `request_id` (UUID, References `verification_requests(id)` ON DELETE CASCADE, NOT NULL)
  - `document_type` (VARCHAR(32), NOT NULL) — CHECK (`document_type` IN ('student_id_front', 'student_id_back', 'degree_certificate', 'provisional_certificate', 'other_evidence'))
  - `storage_path` (TEXT, NOT NULL) — Encrypted path in Supabase private bucket
  - `file_name` (TEXT, NOT NULL)
  - `file_size_bytes` (INTEGER, NOT NULL)
  - `mime_type` (VARCHAR(64), NOT NULL)
  - `uploaded_at` (TIMESTAMPTZ, DEFAULT now())
  - `purged_at` (TIMESTAMPTZ) — Timestamp when document was purged per DPDP retention schedule
- **Access:** Highly restricted. Only the uploading user and designated admins have read access via short-lived signed URLs. Public access strictly blocked.

---

#### 2.3 Cluster 3: Communication & Mentorship

##### 8. `conversations`
- **Purpose:** Root container for direct 1-on-1 and mentorship dialogues.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
  - `updated_at` (TIMESTAMPTZ, DEFAULT now())
  - `is_archived` (BOOLEAN, DEFAULT false)

##### 9. `conversation_members`
- **Purpose:** Links users to conversations and tracks read timestamps.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `conversation_id` (UUID, References `conversations(id)` ON DELETE CASCADE, NOT NULL)
  - `user_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `joined_at` (TIMESTAMPTZ, DEFAULT now())
  - `last_read_at` (TIMESTAMPTZ, DEFAULT now())
- **Constraints:** UNIQUE (`conversation_id`, `user_id`)

##### 10. `messages`
- **Purpose:** Individual text messages transmitted within a conversation.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `conversation_id` (UUID, References `conversations(id)` ON DELETE CASCADE, NOT NULL)
  - `sender_id` (UUID, References `profiles(id)` ON DELETE SET NULL, NOT NULL)
  - `content` (TEXT, NOT NULL)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
  - `is_edited` (BOOLEAN, DEFAULT false)
- **Indexes:** `idx_messages_conversation_created` ON (`conversation_id`, `created_at` DESC)

##### 11. `mentorship_requests`
- **Purpose:** Structured 1-on-1 mentorship applications submitted by students to verified alumni.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `student_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `alumni_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `topic` (VARCHAR(64), NOT NULL) — e.g., 'Resume Review', 'Mock Tech Interview', 'Career Transition', 'Higher Studies'
  - `message` (TEXT, NOT NULL)
  - `status` (VARCHAR(20), NOT NULL, DEFAULT 'pending') — CHECK (`status` IN ('pending', 'accepted', 'declined', 'completed', 'cancelled'))
  - `response_message` (TEXT)
  - `scheduled_at` (TIMESTAMPTZ)
  - `completed_at` (TIMESTAMPTZ)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
  - `updated_at` (TIMESTAMPTZ, DEFAULT now())
- **Indexes:** `idx_mentor_student`, `idx_mentor_alumni`, `idx_mentor_status`

---

#### 2.4 Cluster 4: Opportunities, Events & Governance

##### 12. `jobs`
- **Purpose:** Job, internship, and referral postings shared exclusively by verified alumni.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `posted_by` (UUID, References `profiles(id)` ON DELETE SET NULL, NOT NULL)
  - `title` (TEXT, NOT NULL)
  - `company` (TEXT, NOT NULL)
  - `location` (TEXT, NOT NULL)
  - `job_type` (VARCHAR(20), NOT NULL) — CHECK (`job_type` IN ('full_time', 'internship', 'contract', 'referral_only'))
  - `description` (TEXT, NOT NULL)
  - `requirements` (TEXT)
  - `application_url` (TEXT)
  - `is_referral_available` (BOOLEAN, DEFAULT true)
  - `status` (VARCHAR(20), NOT NULL, DEFAULT 'pending_moderation') — CHECK (`status` IN ('pending_moderation', 'active', 'closed', 'rejected'))
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
  - `expires_at` (TIMESTAMPTZ)
- **Indexes:** `idx_jobs_status_created`, `idx_jobs_company`

##### 13. `events`
- **Purpose:** Webinars, Ask-Me-Anything (AMA) sessions, and career workshops organized by alumni or trustees.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `organizer_id` (UUID, References `profiles(id)` ON DELETE SET NULL, NOT NULL)
  - `title` (TEXT, NOT NULL)
  - `description` (TEXT, NOT NULL)
  - `event_type` (VARCHAR(32), NOT NULL) — e.g., 'webinar', 'ama', 'panel_discussion', 'workshop'
  - `start_time` (TIMESTAMPTZ, NOT NULL)
  - `end_time` (TIMESTAMPTZ, NOT NULL)
  - `meeting_link` (TEXT) — Revealed only to registered verified attendees
  - `max_participants` (INTEGER)
  - `status` (VARCHAR(20), NOT NULL, DEFAULT 'upcoming') — CHECK (`status` IN ('upcoming', 'live', 'completed', 'cancelled'))
  - `created_at` (TIMESTAMPTZ, DEFAULT now())

##### 14. `event_registrations`
- **Purpose:** Records student and alumni RSVP for platform events.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `event_id` (UUID, References `events(id)` ON DELETE CASCADE, NOT NULL)
  - `user_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `registered_at` (TIMESTAMPTZ, DEFAULT now())
  - `attended` (BOOLEAN, DEFAULT false)
- **Constraints:** UNIQUE (`event_id`, `user_id`)

##### 15. `notifications`
- **Purpose:** In-app notification alerts for verification updates, mentorship responses, and moderation messages.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `user_id` (UUID, References `profiles(id)` ON DELETE CASCADE, NOT NULL)
  - `type` (VARCHAR(32), NOT NULL) — e.g., 'verification_update', 'mentorship_received', 'job_alert', 'system'
  - `title` (TEXT, NOT NULL)
  - `body` (TEXT, NOT NULL)
  - `action_url` (TEXT)
  - `is_read` (BOOLEAN, DEFAULT false)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
- **Indexes:** `idx_notifications_user_read` ON (`user_id`, `is_read`)

##### 16. `reports`
- **Purpose:** Platform abuse, harassment, fake profile, or inappropriate content reports submitted to the three administrators.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `reporter_id` (UUID, References `profiles(id)` ON DELETE SET NULL, NOT NULL)
  - `target_type` (VARCHAR(20), NOT NULL) — CHECK (`target_type` IN ('profile', 'message', 'job', 'event'))
  - `target_id` (UUID, NOT NULL)
  - `reason` (TEXT, NOT NULL)
  - `status` (VARCHAR(20), NOT NULL, DEFAULT 'pending') — CHECK (`status` IN ('pending', 'investigating', 'resolved', 'dismissed'))
  - `resolution_notes` (TEXT)
  - `resolved_by` (UUID, References `profiles(id)`)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
  - `resolved_at` (TIMESTAMPTZ)
- **Access:** Reporter can create; only the 3 senior alumni admins can review and resolve.

##### 17. `audit_logs`
- **Purpose:** Immutable append-only audit trail recording every administrative decision and high-risk action.
- **Columns:**
  - `id` (UUID, Primary Key, `DEFAULT gen_random_uuid()`)
  - `admin_id` (UUID, References `profiles(id)` ON DELETE SET NULL, NOT NULL)
  - `action` (VARCHAR(64), NOT NULL) — e.g., 'approve_verification', 'reject_verification', 'moderate_job', 'ban_user'
  - `target_entity` (VARCHAR(32), NOT NULL) — e.g., 'verification_requests', 'profiles', 'jobs'
  - `target_id` (UUID, NOT NULL)
  - `metadata` (JSONB) — Action context, diff, or formal reason (strictly omitting raw identity document files)
  - `ip_address` (INET)
  - `user_agent` (TEXT)
  - `created_at` (TIMESTAMPTZ, DEFAULT now())
- **Access:** Strictly append-only; update and delete operations blocked by database trigger. Viewable exclusively by the three trustees.
