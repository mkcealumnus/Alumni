import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, MessageSquare, Calendar, Instagram, Menu, X, Sparkles, ChevronRight } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'pathways', label: 'Career Roadmaps', icon: Compass },
    { id: 'resources', label: 'Resource Hub', icon: BookOpen },
    { id: 'mentorship', label: 'Ask Alumni', icon: MessageSquare },
    { id: 'notice-board', label: 'Notice Board', icon: Calendar },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 text-lg">
                  MK
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white tracking-tight">MKCE Alumni</span>
                <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-indigo-400 animate-pulse" /> 100% Free
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">Career Pathways & Mentorship Portal</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 glass-card px-3 py-1.5 rounded-full border border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-500/25' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-300' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Social CTA & Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://instagram.com/mkce.alumni"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>@mkce.alumni</span>
              <ChevronRight className="w-3.5 h-3.5 text-pink-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <a
              href="https://instagram.com/mkce.alumni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 bg-slate-900 border border-slate-800 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B0F19]/95 backdrop-blur-xl border-b border-slate-800 px-4 pt-4 pb-6 mt-3 space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-sm font-medium text-slate-200 hover:bg-indigo-600/20 hover:border-indigo-500/40 hover:text-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
