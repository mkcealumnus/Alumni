-- ==============================================================================
-- ALUMNUX DATABASE FOUNDATION: MIGRATION 20261024000001
-- Description: Core schema definition for 17 relational tables with strict RLS
-- Engine: PostgreSQL 15+ (Supabase compatible)
-- ==============================================================================

-- 1. EXTENSIONS & PREREQUISITES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Utility function for automatic timestamp updating
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. ENUM TYPES
DO $$ BEGIN
    CREATE TYPE account_type_enum AS ENUM ('student', 'alumni', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE verification_status_enum AS ENUM ('pending', 'needs_review', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE document_type_enum AS ENUM (
        'student_id_front',
        'student_id_back',
        'degree_certificate',
        'provisional_certificate',
        'other_evidence'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE mentorship_status_enum AS ENUM ('pending', 'accepted', 'declined', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_type_enum AS ENUM ('full_time', 'internship', 'contract', 'referral_only');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE job_status_enum AS ENUM ('pending_moderation', 'active', 'closed', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE event_status_enum AS ENUM ('upcoming', 'live', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE report_status_enum AS ENUM ('pending', 'investigating', 'resolved', 'dismissed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. CORE IDENTITY & PROFILES CLUSTER
-- ==============================================================================

-- Table 1: departments
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(16) UNIQUE NOT NULL,
    name TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 2: profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, -- References auth.users(id) in Supabase production
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    headline TEXT,
    bio TEXT,
    account_type account_type_enum NOT NULL,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    graduation_year INTEGER CHECK (graduation_year BETWEEN 1970 AND 2040),
    roll_number VARCHAR(32), -- Student register number (private)
    current_company TEXT,
    current_role TEXT,
    experience_years NUMERIC(4,1) DEFAULT 0,
    location_city TEXT,
    location_country TEXT DEFAULT 'India' NOT NULL,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    is_verified BOOLEAN DEFAULT false NOT NULL,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 3: user_roles
CREATE TABLE IF NOT EXISTS user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    role account_type_enum NOT NULL,
    assigned_by UUID REFERENCES profiles(id),
    assigned_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT uq_user_role UNIQUE (user_id, role)
);

-- Table 4: skills
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT UNIQUE NOT NULL,
    category VARCHAR(32) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 5: profile_skills
CREATE TABLE IF NOT EXISTS profile_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    skill_id UUID REFERENCES skills(id) ON DELETE CASCADE NOT NULL,
    years_experience NUMERIC(4,1) DEFAULT 1.0,
    is_primary BOOLEAN DEFAULT false NOT NULL,
    CONSTRAINT uq_profile_skill UNIQUE (profile_id, skill_id)
);

-- ==============================================================================
-- 4. VERIFICATION & EVIDENCE SUBSYSTEM
-- ==============================================================================

-- Table 6: verification_requests
CREATE TABLE IF NOT EXISTS verification_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    account_type account_type_enum NOT NULL,
    status verification_status_enum DEFAULT 'pending' NOT NULL,
    submitted_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    reviewed_by UUID REFERENCES profiles(id),
    reviewed_at TIMESTAMPTZ,
    rejection_reason TEXT,
    review_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER trg_verification_requests_updated_at
BEFORE UPDATE ON verification_requests
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 7: verification_evidence
CREATE TABLE IF NOT EXISTS verification_evidence (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID REFERENCES verification_requests(id) ON DELETE CASCADE NOT NULL,
    document_type document_type_enum NOT NULL,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_size_bytes INTEGER NOT NULL,
    mime_type VARCHAR(64) NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    purged_at TIMESTAMPTZ
);

-- ==============================================================================
-- 5. COMMUNICATION & MENTORSHIP
-- ==============================================================================

-- Table 8: conversations
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    is_archived BOOLEAN DEFAULT false NOT NULL
);

CREATE TRIGGER trg_conversations_updated_at
BEFORE UPDATE ON conversations
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Table 9: conversation_members
CREATE TABLE IF NOT EXISTS conversation_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    joined_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    last_read_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    CONSTRAINT uq_conversation_member UNIQUE (conversation_id, user_id)
);

-- Table 10: messages
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    content TEXT NOT NULL,
    is_edited BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 11: mentorship_requests
CREATE TABLE IF NOT EXISTS mentorship_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    alumni_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    topic VARCHAR(64) NOT NULL,
    message TEXT NOT NULL,
    status mentorship_status_enum DEFAULT 'pending' NOT NULL,
    response_message TEXT,
    scheduled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER trg_mentorship_requests_updated_at
BEFORE UPDATE ON mentorship_requests
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ==============================================================================
-- 6. OPPORTUNITIES, EVENTS & GOVERNANCE
-- ==============================================================================

-- Table 12: jobs
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    posted_by UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    job_type job_type_enum NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT,
    application_url TEXT,
    is_referral_available BOOLEAN DEFAULT true NOT NULL,
    status job_status_enum DEFAULT 'pending_moderation' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    expires_at TIMESTAMPTZ
);

-- Table 13: events
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organizer_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    event_type VARCHAR(32) NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    meeting_link TEXT,
    max_participants INTEGER,
    status event_status_enum DEFAULT 'upcoming' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 14: event_registrations
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    registered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    attended BOOLEAN DEFAULT false NOT NULL,
    CONSTRAINT uq_event_registration UNIQUE (event_id, user_id)
);

-- Table 15: notifications
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(32) NOT NULL,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    action_url TEXT,
    is_read BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Table 16: reports
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    target_type VARCHAR(20) NOT NULL CHECK (target_type IN ('profile', 'message', 'job', 'event')),
    target_id UUID NOT NULL,
    reason TEXT NOT NULL,
    status report_status_enum DEFAULT 'pending' NOT NULL,
    resolution_notes TEXT,
    resolved_by UUID REFERENCES profiles(id),
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
    resolved_at TIMESTAMPTZ
);

-- Table 17: audit_logs (Immutable)
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL NOT NULL,
    action VARCHAR(64) NOT NULL,
    target_entity VARCHAR(32) NOT NULL,
    target_id UUID NOT NULL,
    metadata JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Prevent update or deletion on audit_logs
CREATE OR REPLACE FUNCTION prevent_audit_log_mutation()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Audit log entries are strictly immutable and cannot be updated or deleted.';
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_audit_logs_immutable
BEFORE UPDATE OR DELETE ON audit_logs
FOR EACH ROW EXECUTE FUNCTION prevent_audit_log_mutation();

-- ==============================================================================
-- 7. PERFORMANCE INDEXES
-- ==============================================================================

CREATE INDEX IF NOT EXISTS idx_profiles_account_type ON profiles(account_type);
CREATE INDEX IF NOT EXISTS idx_profiles_dept ON profiles(department_id);
CREATE INDEX IF NOT EXISTS idx_profiles_grad_year ON profiles(graduation_year);
CREATE INDEX IF NOT EXISTS idx_verif_status ON verification_requests(status);
CREATE INDEX IF NOT EXISTS idx_verif_user_id ON verification_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_evidence_request_id ON verification_evidence(request_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_student ON mentorship_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_alumni ON mentorship_requests(alumni_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_audit_admin ON audit_logs(admin_id, created_at DESC);

-- ==============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_evidence ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is caller one of the 3 senior alumni trustees?
CREATE OR REPLACE FUNCTION is_senior_alumni_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM user_roles
        WHERE user_id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY profiles_read ON profiles
    FOR SELECT TO authenticated
    USING (is_active = true);

CREATE POLICY profiles_update_own ON profiles
    FOR UPDATE TO authenticated
    USING (id = auth.uid())
    WITH CHECK (id = auth.uid());

CREATE POLICY profiles_admin_all ON profiles
    FOR ALL TO authenticated
    USING (is_senior_alumni_admin());

-- Departments & Skills (Catalogues)
CREATE POLICY departments_read ON departments
    FOR SELECT TO authenticated, anon
    USING (is_active = true);

CREATE POLICY skills_read ON skills
    FOR SELECT TO authenticated, anon
    USING (true);

-- User Roles
CREATE POLICY roles_read_own ON user_roles
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR is_senior_alumni_admin());

-- Verification Requests
CREATE POLICY verif_req_owner_read ON verification_requests
    FOR SELECT TO authenticated
    USING (user_id = auth.uid() OR is_senior_alumni_admin());

CREATE POLICY verif_req_owner_insert ON verification_requests
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY verif_req_admin_update ON verification_requests
    FOR UPDATE TO authenticated
    USING (is_senior_alumni_admin());

-- Verification Evidence (Strict Isolation)
CREATE POLICY verif_evidence_owner_read ON verification_evidence
    FOR SELECT TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM verification_requests vr
            WHERE vr.id = verification_evidence.request_id AND vr.user_id = auth.uid()
        )
        OR is_senior_alumni_admin()
    );

CREATE POLICY verif_evidence_owner_insert ON verification_evidence
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM verification_requests vr
            WHERE vr.id = verification_evidence.request_id 
              AND vr.user_id = auth.uid() 
              AND vr.status IN ('pending', 'needs_review')
        )
    );

-- Conversations & Messages
CREATE POLICY conversations_member_access ON conversations
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM conversation_members cm
            WHERE cm.conversation_id = conversations.id AND cm.user_id = auth.uid()
        )
    );

CREATE POLICY conversation_members_access ON conversation_members
    FOR ALL TO authenticated
    USING (
        user_id = auth.uid() OR EXISTS (
            SELECT 1 FROM conversation_members cm2
            WHERE cm2.conversation_id = conversation_members.conversation_id AND cm2.user_id = auth.uid()
        )
    );

CREATE POLICY messages_member_access ON messages
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM conversation_members cm
            WHERE cm.conversation_id = messages.conversation_id AND cm.user_id = auth.uid()
        )
    );

-- Mentorship Requests
CREATE POLICY mentorship_parties_read ON mentorship_requests
    FOR SELECT TO authenticated
    USING (student_id = auth.uid() OR alumni_id = auth.uid() OR is_senior_alumni_admin());

CREATE POLICY mentorship_student_insert ON mentorship_requests
    FOR INSERT TO authenticated
    WITH CHECK (student_id = auth.uid());

CREATE POLICY mentorship_parties_update ON mentorship_requests
    FOR UPDATE TO authenticated
    USING (student_id = auth.uid() OR alumni_id = auth.uid());

-- Jobs
CREATE POLICY jobs_read ON jobs
    FOR SELECT TO authenticated
    USING (status = 'active' OR posted_by = auth.uid() OR is_senior_alumni_admin());

CREATE POLICY jobs_alumni_insert ON jobs
    FOR INSERT TO authenticated
    WITH CHECK (posted_by = auth.uid() AND EXISTS (
        SELECT 1 FROM profiles WHERE id = auth.uid() AND is_verified = true AND account_type = 'alumni'
    ));

CREATE POLICY jobs_admin_manage ON jobs
    FOR ALL TO authenticated
    USING (is_senior_alumni_admin());

-- Notifications
CREATE POLICY notifications_owner ON notifications
    FOR ALL TO authenticated
    USING (user_id = auth.uid());

-- Reports
CREATE POLICY reports_create ON reports
    FOR INSERT TO authenticated
    WITH CHECK (reporter_id = auth.uid());

CREATE POLICY reports_admin_manage ON reports
    FOR ALL TO authenticated
    USING (is_senior_alumni_admin());

-- Audit Logs
CREATE POLICY audit_logs_read ON audit_logs
    FOR SELECT TO authenticated
    USING (is_senior_alumni_admin());

CREATE POLICY audit_logs_insert ON audit_logs
    FOR INSERT TO authenticated
    WITH CHECK (is_senior_alumni_admin());
