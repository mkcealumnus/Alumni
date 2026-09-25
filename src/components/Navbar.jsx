import React, { useState, useEffect } from 'react';
import { Compass, BookOpen, MessageSquare, Calendar, Instagram, Menu, X, Sparkles, ChevronRight, Users } from 'lucide-react';

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
    { id: 'pathways', label: 'Domain Roadmaps', icon: Compass },
    { id: 'alumni-network', label: 'Alumni Directory', icon: Users },
    { id: 'resources', label: 'Resource Hub', icon: BookOpen },
    { id: 'mentorship', label: 'Ask Alumni', icon: MessageSquare },
    { id: 'notice-board', label: 'Notice Board', icon: Calendar },
  ];

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/90 py-3 shadow-md shadow-slate-200/50' : 'bg-[#fcfcfc]/80 backdrop-blur-md border-b border-slate-200/60 py-3.5'
    }`}>
      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-rose-500 p-0.5 shadow-md shadow-orange-500/15 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <span className="font-extrabold text-orange-400 text-xs sm:text-sm font-mono tracking-tighter">
                  MK
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 font-sans">
                  MKCE<span className="text-orange-600">.alumni</span>
                </span>
                <span className="bg-orange-50 text-orange-700 border border-orange-200/80 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 hidden xs:flex">
                  <Sparkles className="w-3 h-3 text-orange-600 animate-pulse" /> 100% Free
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono hidden md:block">Career Pathways & Mentorship</p>
            </div>
          </a>

          {/* Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-white border border-slate-200/90 p-1.5 rounded-full shadow-sm">
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
                  className={`flex items-center gap-2 px-3.5 xl:px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-orange-600 text-white font-semibold shadow-md shadow-orange-500/20 scale-[1.02]' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Social CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://instagram.com/mkce.alumni"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 hover:opacity-95 shadow-md shadow-pink-600/15 transition-all duration-300 hover:scale-[1.02]"
            >
              <Instagram className="w-4 h-4 text-white" />
              <span>@mkce.alumni</span>
              <ChevronRight className="w-3.5 h-3.5 text-pink-100" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center gap-2">
            <a
              href="https://instagram.com/mkce.alumni"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-pink-50 text-pink-600 border border-pink-200 sm:hidden"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 bg-white border border-slate-200 hover:text-orange-600 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-slate-200 px-4 pt-4 pb-6 mt-2 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                  isActive 
                    ? 'bg-orange-50 border-orange-200 text-orange-700' 
                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-orange-600" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
