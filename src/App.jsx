import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import AuthModal from './components/AuthModal';
import Hero from './components/Hero';
import PathwaysModule from './components/PathwaysModule';
import ResourceLibrary from './components/ResourceLibrary';
import MentorshipPortal from './components/MentorshipPortal';
import NoticeBoard from './components/NoticeBoard';
import InstagramFeed from './components/InstagramFeed';
import Footer from './components/Footer';

// Dashboard Tabs
import OverviewTab from './components/tabs/OverviewTab';
import AlumniManagementTab from './components/tabs/AlumniManagementTab';
import ForksDirectoryTab from './components/tabs/ForksDirectoryTab';
import AdminPanelTab from './components/tabs/AdminPanelTab';

import { MOCK_USERS } from './data/mockData';

export default function App() {
  // Navigation & View State
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'landing'
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'pathways' | 'resources' | 'mentorship' | 'forks' | 'alumni' | 'admin' | 'notice-board'
  
  // User State & Auth
  const [currentUser, setCurrentUser] = useState(MOCK_USERS.student);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleLoginSuccess = (userObj) => {
    setCurrentUser(userObj);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-indigo-600 selection:text-white font-sans antialiased">
      
      {/* Universal Professional Dashboard Header */}
      <Header
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        onLogout={handleLogout}
        onOpenAuth={() => setAuthModalOpen(true)}
        sidebarOpen={!sidebarCollapsed}
        setSidebarOpen={(val) => setSidebarCollapsed(!val)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Workspace Router */}
      {currentView === 'dashboard' ? (
        <div className="flex-1 flex max-w-7xl mx-auto w-full">
          
          {/* Collapsible Role-Aware Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentUser={currentUser}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
          />

          {/* Main Dashboard Content Area */}
          <main className="flex-1 p-4 sm:p-8 overflow-y-auto min-w-0">
            {activeTab === 'overview' && (
              <OverviewTab currentUser={currentUser} setActiveTab={setActiveTab} />
            )}

            {activeTab === 'pathways' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900">Career Roadmaps Workspace</h2>
                  <p className="text-xs text-slate-500">Year-by-year technical milestone trees for engineering students.</p>
                </div>
                <PathwaysModule />
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900">Resource Repository & ATS Kits</h2>
                  <p className="text-xs text-slate-500">Searchable database of cheat sheets, Overleaf resume templates, and study decks.</p>
                </div>
                <ResourceLibrary />
              </div>
            )}

            {activeTab === 'mentorship' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900">Alumni Q&A Forum</h2>
                  <p className="text-xs text-slate-500">Directly ask questions to verified alumni working in top companies.</p>
                </div>
                <MentorshipPortal />
              </div>
            )}

            {activeTab === 'forks' && (
              <ForksDirectoryTab currentUser={currentUser} />
            )}

            {activeTab === 'alumni' && (
              <AlumniManagementTab currentUser={currentUser} />
            )}

            {activeTab === 'admin' && (
              <AdminPanelTab currentUser={currentUser} />
            )}

            {activeTab === 'notice-board' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-xl font-extrabold text-slate-900">Notice Board & Upcoming Events</h2>
                  <p className="text-xs text-slate-500">Reserve your spot for live webinars and 1-on-1 mock interview drives.</p>
                </div>
                <NoticeBoard />
              </div>
            )}
          </main>

        </div>
      ) : (
        /* Public Landing View */
        <main className="flex-1">
          <Hero onExploreClick={() => {
            setCurrentView('dashboard');
            setActiveTab('pathways');
          }} />
          <PathwaysModule />
          <ResourceLibrary />
          <MentorshipPortal />
          <NoticeBoard />
          <InstagramFeed />
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

    </div>
  );
}
