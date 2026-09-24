import { INITIAL_SEED } from '../lib/supabase';

export const PATHWAYS = INITIAL_SEED.pathways;
export const RESOURCES = INITIAL_SEED.resources;
export const STUDENT_QUERIES = INITIAL_SEED.student_queries;
export const EVENTS = INITIAL_SEED.events;
export const ALUMNI_DIRECTORY = INITIAL_SEED.alumni;

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    caption: '🚀 5 Essential DSA Patterns every MKCE student must master before 3rd Year Placements!',
    likes: 890,
    comments: 45,
    tag: 'PlacementTips',
    date: '3 days ago',
    link: 'https://instagram.com/mkce.alumni'
  },
  {
    id: 2,
    caption: '💡 Alumni Spotlight: Meet Swetha (Batch 2022) sharing her journey from Karur campus to Google SDE 2!',
    likes: 1240,
    comments: 88,
    tag: 'AlumniSpotlight',
    date: '5 days ago',
    link: 'https://instagram.com/mkce.alumni'
  },
  {
    id: 3,
    caption: '📚 Free Download: Resume Template that got 40+ MKCE engineering students shortlisted in 2025.',
    likes: 1560,
    comments: 112,
    tag: 'FreeResource',
    date: '1 week ago',
    link: 'https://instagram.com/mkce.alumni'
  }
];
