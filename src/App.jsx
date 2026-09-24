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

export default function App() {
  const [activeSection, setActiveSection] = useState('pathways');
  const [currentRole, setCurrentRole] = useState('Student');
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white">
      
      {/* Top Institutional Header Bar */}
      <HeaderBar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onNavigate={scrollToSection}
      />

      {/* Main Sticky Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Role Banner Indicator if Alumni Mentor View */}
      {currentRole === 'Alumni Mentor' && (
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-2 px-4 text-center text-xs font-semibold shadow-inner">
          ✨ Alumni Mentor Mode Active: You can respond to pending student queries and publish technical placement resources.
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onExploreClick={() => scrollToSection('pathways')} />
        <PathwaysModule />
        <AlumniDirectory />
        <ResourceLibrary searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <MentorshipPortal />
        <NoticeBoard />
        <InstagramFeed />
      </main>

      {/* Institutional Footer */}
      <Footer />

    </div>
  );
}
