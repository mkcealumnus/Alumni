/**
 * Supabase Client & Database Schema Blueprint for MKCE Alumni Web Platform
 * 
 * To initialize database tables, execute the SQL migration script below in your Supabase SQL Editor.
 */

/*
==============================================================================
SUPABASE SQL MIGRATION SCHEMA (MySQL/PostgreSQL Compatible)
==============================================================================

-- 1. PROFILES / USERS TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('student', 'alumni', 'admin')) DEFAULT 'student',
  branch TEXT NOT NULL, -- e.g., 'CSE', 'ECE', 'AI&DS', 'EEE', 'MECH', 'CIVIL'
  graduation_year INT NOT NULL,
  company_or_college TEXT,
  designation TEXT,
  avatar_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. CAREER PATHWAYS TABLE
CREATE TABLE IF NOT EXISTS career_pathways (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  target_branches TEXT[] NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PATHWAY MILESTONES TABLE
CREATE TABLE IF NOT EXISTS pathway_milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pathway_id VARCHAR(64) REFERENCES career_pathways(id) ON DELETE CASCADE,
  academic_year VARCHAR(20) NOT NULL, -- '1st Year', '2nd Year', '3rd Year', '4th Year'
  milestone_title TEXT NOT NULL,
  topics JSONB NOT NULL, -- Array of topic strings
  order_index INT DEFAULT 0
);

-- 4. RESOURCE LIBRARY TABLE
CREATE TABLE IF NOT EXISTS resources (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Interview Prep', 'Resume', 'Core Eng', 'Database', 'Coding'
  target_branch TEXT NOT NULL,
  resource_type TEXT NOT NULL, -- 'PDF Guide', 'Overleaf', 'Practice Deck', 'Video Course'
  author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  author_display_name TEXT,
  file_url TEXT,
  external_link TEXT,
  downloads_count INT DEFAULT 0,
  upvotes_count INT DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. MENTORSHIP & STUDENT QUERIES TABLE
CREATE TABLE IF NOT EXISTS student_queries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  student_year TEXT NOT NULL,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  likes_count INT DEFAULT 0,
  status VARCHAR(20) CHECK (status IN ('Pending', 'Answered', 'Closed')) DEFAULT 'Pending',
  assigned_alumni_id UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. MENTORSHIP ANSWERS TABLE
CREATE TABLE IF NOT EXISTS query_answers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  query_id UUID REFERENCES student_queries(id) ON DELETE CASCADE,
  alumni_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  alumni_name TEXT NOT NULL,
  alumni_role TEXT NOT NULL,
  answer_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. NOTICE BOARD & EVENTS TABLE
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  speaker_name TEXT NOT NULL,
  speaker_designation TEXT,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  event_type VARCHAR(50) NOT NULL, -- 'Live Webinar', 'Mock Interview', 'Placement Drive'
  status VARCHAR(30) DEFAULT 'Upcoming',
  registration_link TEXT,
  banner_color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

-- POLICIES
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public resources are viewable by everyone" ON resources FOR SELECT USING (true);
CREATE POLICY "Student queries are viewable by everyone" ON student_queries FOR SELECT USING (true);
CREATE POLICY "Authenticated users can submit queries" ON student_queries FOR INSERT WITH CHECK (auth.role() = 'authenticated');
*/

import { PATHWAYS, RESOURCES, STUDENT_QUERIES, EVENTS, INSTAGRAM_POSTS } from '../data/mockData';

// Lightweight local API service simulation for rapid testing & offline dev
export const apiService = {
  getPathways: async () => PATHWAYS,
  getResources: async () => RESOURCES,
  getStudentQueries: async () => STUDENT_QUERIES,
  getEvents: async () => EVENTS,
  getInstagramPosts: async () => INSTAGRAM_POSTS,
  submitQuery: async (newQuery) => {
    const queryObj = {
      id: Date.now(),
      studentName: newQuery.name || 'Anonymous Student',
      studentYear: newQuery.year || '3rd Year',
      question: newQuery.question,
      category: newQuery.category || 'General Guidance',
      likes: 0,
      status: 'Pending',
      answer: null
    };
    STUDENT_QUERIES.unshift(queryObj);
    return queryObj;
  }
};
