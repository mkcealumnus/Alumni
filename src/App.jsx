import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PathwaysModule from './components/PathwaysModule';
import ResourceLibrary from './components/ResourceLibrary';
import MentorshipPortal from './components/MentorshipPortal';
import NoticeBoard from './components/NoticeBoard';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('pathways');

  const scrollToSection = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero onExploreClick={() => scrollToSection('pathways')} />
        <PathwaysModule />
        <ResourceLibrary />
        <MentorshipPortal />
        <NoticeBoard />
        <InstagramFeed />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
