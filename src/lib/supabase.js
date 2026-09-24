import { createClient } from '@supabase/supabase-js';

// Supabase environment variables from .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://trulyybuehooprkknuoz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_n9492e8repCoQzeSnM4QkA_y_8W50dw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
==============================================================================
PURE SUPABASE DATABASE SERVICES (No Static Mock Files)
==============================================================================
*/

export const dbService = {
  // 1. CAREER PATHWAYS
  getPathways: async () => {
    try {
      const { data, error } = await supabase
        .from('career_pathways')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.warn('Supabase career_pathways query:', error.message);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Failed to fetch pathways from Supabase:', err);
      return [];
    }
  },

  createPathway: async (pathwayData) => {
    try {
      const { data, error } = await supabase
        .from('career_pathways')
        .insert([pathwayData])
        .select();
      if (error) throw error;
      return data ? data[0] : null;
    } catch (err) {
      console.error('Error inserting pathway into Supabase:', err);
      throw err;
    }
  },

  // 2. RESOURCE LIBRARY
  getResources: async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Supabase resources query:', error.message);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Failed to fetch resources from Supabase:', err);
      return [];
    }
  },

  uploadResource: async (resourceData) => {
    try {
      const payload = {
        title: resourceData.title,
        category: resourceData.category,
        target_branch: resourceData.target_branch || 'All Branches',
        type: resourceData.type || 'PDF Guide',
        author: resourceData.author || 'MKCE Alumni',
        author_role: resourceData.author_role || 'Verified Alumni Contributor',
        downloads_count: 0,
        rating: 5.0,
        size: resourceData.size || '5 MB',
        tags: resourceData.tags || [],
        description: resourceData.description,
        file_url: resourceData.file_url || '#'
      };

      const { data, error } = await supabase
        .from('resources')
        .insert([payload])
        .select();
      
      if (error) throw error;
      return data ? data[0] : null;
    } catch (err) {
      console.error('Error uploading resource to Supabase:', err);
      throw err;
    }
  },

  incrementDownload: async (id, currentCount = 0) => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .update({ downloads_count: currentCount + 1 })
        .eq('id', id)
        .select();
      if (error) console.warn('Supabase update downloads:', error.message);
      return data;
    } catch (err) {
      console.error('Failed to increment download count:', err);
    }
  },

  // 3. STUDENT MENTORSHIP QUERIES
  getStudentQueries: async () => {
    try {
      const { data, error } = await supabase
        .from('student_queries')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Supabase student_queries query:', error.message);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Failed to fetch queries from Supabase:', err);
      return [];
    }
  },

  submitQuery: async (queryData) => {
    try {
      const payload = {
        student_name: queryData.name || 'MKCE Student',
        student_year: queryData.year || '3rd Year CSE',
        question: queryData.question,
        category: queryData.category || 'Career Transition',
        likes_count: 0,
        status: 'Pending'
      };

      const { data, error } = await supabase
        .from('student_queries')
        .insert([payload])
        .select();
      
      if (error) throw error;
      return data ? data[0] : null;
    } catch (err) {
      console.error('Error posting query to Supabase:', err);
      throw err;
    }
  },

  upvoteQuery: async (id, currentLikes = 0) => {
    try {
      const { data, error } = await supabase
        .from('student_queries')
        .update({ likes_count: currentLikes + 1 })
        .eq('id', id)
        .select();
      if (error) console.warn('Supabase upvote query:', error.message);
      return data;
    } catch (err) {
      console.error('Failed to upvote query:', err);
    }
  },

  // 4. NOTICE BOARD & EVENTS
  getEvents: async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Supabase events query:', error.message);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Failed to fetch events from Supabase:', err);
      return [];
    }
  },

  createEvent: async (eventData) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([eventData])
        .select();
      if (error) throw error;
      return data ? data[0] : null;
    } catch (err) {
      console.error('Error creating event in Supabase:', err);
      throw err;
    }
  },

  registerForEvent: async (registrationData) => {
    try {
      const { data, error } = await supabase
        .from('event_registrations')
        .insert([registrationData])
        .select();
      if (error) console.warn('Supabase event registration error:', error.message);
      return data;
    } catch (err) {
      console.error('Failed to register for event:', err);
    }
  },

  // 5. ALUMNI DIRECTORY & PROFILES
  getAlumniDirectory: async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'alumni')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.warn('Supabase profiles query:', error.message);
        return [];
      }
      return data || [];
    } catch (err) {
      console.error('Failed to fetch alumni directory from Supabase:', err);
      return [];
    }
  },

  submitMentorshipRequest: async (requestData) => {
    try {
      const { data, error } = await supabase
        .from('mentorship_requests')
        .insert([requestData])
        .select();
      if (error) console.warn('Supabase mentorship request:', error.message);
      return data;
    } catch (err) {
      console.error('Failed to submit mentorship request:', err);
    }
  }
};
