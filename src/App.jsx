import React, { useState } from 'react';
import HeaderBar from './components/HeaderBar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PathwaysModule from './components/PathwaysModule';
import AlumniDirectory from './components/AlumniDirectory';
import ResourceLibrary from './components/ResourceLibrary';
import MentorshipPortal from './components/MentorshipPortal';
import NoticeBoard from './components/NoticeBoard';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';
import {
  INITIAL_PATHWAYS,
  INITIAL_ALUMNI,
  INITIAL_RESOURCES,
  INITIAL_QUERIES,
  INITIAL_EVENTS,
  INITIAL_INSTAGRAM_POSTS
} from './data/initialData';

export default function App() {
  const [activeSection, setActiveSection] = useState('pathways');
  const [currentRole, setCurrentRole] = useState('Student');
  const [searchQuery, setSearchQuery] = useState('');

  // Global State initialized with rich reference dataset
  const [pathways] = useState(INITIAL_PATHWAYS);
  const [mentors] = useState(INITIAL_ALUMNI);
  const [resources, setResources] = useState(INITIAL_RESOURCES);
  const [queries, setQueries] = useState(INITIAL_QUERIES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [instagramPosts] = useState(INITIAL_INSTAGRAM_POSTS);

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] text-slate-900 flex flex-col selection:bg-orange-500 selection:text-white relative font-sans">
      
      {/* Top Combined Sticky Header Wrapper */}
      <header className="sticky top-0 z-[60] shadow-sm">
        <HeaderBar
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onNavigate={scrollToSection}
        />
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      </header>

      {/* Role Banner Indicator if Alumni Mentor View */}
      {currentRole === 'Alumni Mentor' && (
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-rose-600 text-white py-2 px-4 text-center text-xs font-semibold shadow-lg relative z-40">
          ✨ Alumni Mentor Mode Active: You can respond to pending student queries and publish technical placement resources.
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onExploreClick={() => scrollToSection('pathways')} />
        <PathwaysModule initialPathways={pathways} />
        <AlumniDirectory initialMentors={mentors} />
        <ResourceLibrary initialResources={resources} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <MentorshipPortal initialQueries={queries} currentRole={currentRole} />
        <NoticeBoard initialEvents={events} currentRole={currentRole} />
        <InstagramFeed initialPosts={instagramPosts} />
      </main>

      {/* Institutional Footer */}
      <Footer />

    </div>
  );
}
