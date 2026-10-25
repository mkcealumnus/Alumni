-- ==============================================================================
-- Alumnux — Phase 1 Mentorship Module Database Schema
-- Specification Sections 7 & 8: Initial Data Model & Security Requirements
-- Target Database: PostgreSQL / Supabase
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
DO $$ BEGIN
    CREATE TYPE mentorship_request_status AS ENUM ('pending', 'accepted', 'declined', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE mentorship_conversation_status AS ENUM ('active', 'completed', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE moderation_status AS ENUM ('visible', 'flagged', 'removed', 'approved');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE message_type_enum AS ENUM ('open_chat', 'private_mentorship');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ------------------------------------------------------------------------------
-- Table 1: open_chat_messages
-- Shared community career guidance space readable by all verified users.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.open_chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL CHECK (char_length(trim(content)) > 0 AND char_length(content) <= 3000),
    reply_to_message_id UUID REFERENCES public.open_chat_messages(id) ON DELETE SET NULL,
    category_tag VARCHAR(60) DEFAULT 'General',
    moderation_status moderation_status NOT NULL DEFAULT 'visible',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_open_chat_created_at ON public.open_chat_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_open_chat_reply_to ON public.open_chat_messages(reply_to_message_id);
CREATE INDEX IF NOT EXISTS idx_open_chat_moderation ON public.open_chat_messages(moderation_status);

-- ------------------------------------------------------------------------------
-- Table 2: mentorship_requests
-- Private requests sent by verified students to selected verified alumni.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.mentorship_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    alumni_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    topic VARCHAR(120) NOT NULL,
    introductory_message TEXT NOT NULL CHECK (char_length(trim(introductory_message)) >= 10),
    preferred_cadence VARCHAR(80) NOT NULL DEFAULT 'Bi-weekly check-in',
    status mentorship_request_status NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    responded_at TIMESTAMPTZ,
    closed_at TIMESTAMPTZ,
    CONSTRAINT chk_different_participants CHECK (student_id <> alumni_id)
);

-- Prevent duplicate pending requests between the same student and alumnus
CREATE UNIQUE INDEX IF NOT EXISTS uq_pending_mentorship_request 
ON public.mentorship_requests (student_id, alumni_id) 
WHERE status = 'pending';

CREATE INDEX IF NOT EXISTS idx_mentorship_requests_student ON public.mentorship_requests(student_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_requests_alumni ON public.mentorship_requests(alumni_id);
CREATE INDEX IF NOT EXISTS idx_mentorship_requests_status ON public.mentorship_requests(status);

-- ------------------------------------------------------------------------------
-- Table 3: private_mentorship_conversations
-- 1-on-1 private conversation between student and alumnus.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.private_mentorship_conversations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    alumni_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    mentorship_request_id UUID NOT NULL REFERENCES public.mentorship_requests(id) ON DELETE RESTRICT,
    topic VARCHAR(120) NOT NULL,
    status mentorship_conversation_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    last_message_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    closed_at TIMESTAMPTZ,
    closed_by_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    CONSTRAINT chk_conversation_participants CHECK (student_id <> alumni_id)
);

CREATE INDEX IF NOT EXISTS idx_conv_participants ON public.private_mentorship_conversations(student_id, alumni_id);
CREATE INDEX IF NOT EXISTS idx_conv_last_message ON public.private_mentorship_conversations(last_message_at DESC);

-- ------------------------------------------------------------------------------
-- Table 4: private_mentorship_messages
-- Strictly confidential messages exchanged between authorized participants.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.private_mentorship_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES public.private_mentorship_conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
    content TEXT NOT NULL CHECK (char_length(trim(content)) > 0 AND char_length(content) <= 5000),
    is_read BOOLEAN NOT NULL DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_priv_msgs_conv_created ON public.private_mentorship_messages(conversation_id, created_at ASC);

-- ------------------------------------------------------------------------------
-- Table 5: message_reports
-- Message reporting and moderation controls for inappropriate content.
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.message_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reporter_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    message_type message_type_enum NOT NULL,
    message_id UUID NOT NULL,
    reason VARCHAR(80) NOT NULL,
    details TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'pending_review',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON public.message_reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_type_id ON public.message_reports(message_type, message_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict adherence to Section 8: Security and Privacy Requirements
-- ==============================================================================

ALTER TABLE public.open_chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mentorship_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_mentorship_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_mentorship_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_reports ENABLE ROW LEVEL SECURITY;

-- 1. open_chat_messages RLS:
-- All authenticated users can read visible open chat messages
CREATE POLICY "Authenticated users can read open chat messages"
    ON public.open_chat_messages
    FOR SELECT
    TO authenticated
    USING (moderation_status IN ('visible', 'approved'));

-- Authenticated verified users can insert messages as themselves
CREATE POLICY "Users can post to open chat"
    ON public.open_chat_messages
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = sender_id);

-- 2. mentorship_requests RLS:
-- Only student or alumni participant can view their requests
CREATE POLICY "Participants can view their mentorship requests"
    ON public.mentorship_requests
    FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id OR auth.uid() = alumni_id);

-- Only student can insert request with themselves as student_id
CREATE POLICY "Students can create mentorship requests"
    ON public.mentorship_requests
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = student_id);

-- Alumni can update status (accept/decline), student can close
CREATE POLICY "Participants can update request status"
    ON public.mentorship_requests
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = student_id OR auth.uid() = alumni_id)
    WITH CHECK (auth.uid() = student_id OR auth.uid() = alumni_id);

-- 3. private_mentorship_conversations RLS:
-- Visible ONLY to the two authorized participants
CREATE POLICY "Conversation visible only to participants"
    ON public.private_mentorship_conversations
    FOR SELECT
    TO authenticated
    USING (auth.uid() = student_id OR auth.uid() = alumni_id);

-- 4. private_mentorship_messages RLS:
-- Messages visible ONLY to conversation participants
CREATE POLICY "Private messages readable only by conversation participants"
    ON public.private_mentorship_messages
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.private_mentorship_conversations c
            WHERE c.id = conversation_id
              AND (c.student_id = auth.uid() OR c.alumni_id = auth.uid())
        )
    );

-- Only participant can insert a private message, sender_id must match auth.uid()
CREATE POLICY "Participants can send private messages"
    ON public.private_mentorship_messages
    FOR INSERT
    TO authenticated
    WITH CHECK (
        auth.uid() = sender_id
        AND EXISTS (
            SELECT 1 FROM public.private_mentorship_conversations c
            WHERE c.id = conversation_id
              AND (c.student_id = auth.uid() OR c.alumni_id = auth.uid())
              AND c.status = 'active'
        )
    );

-- 5. message_reports RLS:
-- Any authenticated user can submit a report
CREATE POLICY "Authenticated users can submit reports"
    ON public.message_reports
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = reporter_id);
