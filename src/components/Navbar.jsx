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
      isScrolled ? 'bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/50' : 'bg-[#09090b]/70 backdrop-blur-md border-b border-white/5 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group select-none">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-rose-500 p-0.5 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#09090b] rounded-[14px] flex items-center justify-center">
                <span className="font-extrabold text-orange-500 text-sm font-mono tracking-tighter">
                  MK
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-white font-sans">
                  MKCE<span className="text-orange-500">.alumni</span>
                </span>
                <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-orange-400 animate-pulse" /> 100% Free
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono hidden sm:block">Career Pathways & Mentorship</p>
            </div>
          </a>

          {/* Desktop Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121318]/90 border border-white/10 p-1.5 rounded-full shadow-inner">
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
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-orange-500 text-white font-semibold shadow-md shadow-orange-500/25 scale-[1.02]' 
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-pink-600 via-purple-600 to-orange-600 hover:opacity-95 shadow-lg shadow-pink-600/20 transition-all duration-300 hover:scale-[1.03]"
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
              className="p-2 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-zinc-300 bg-zinc-900 border border-white/10 hover:text-orange-400"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#121318]/95 backdrop-blur-2xl border-b border-white/10 px-4 pt-4 pb-6 mt-2 space-y-2 shadow-2xl animate-in fade-in slide-in-from-top-2">
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
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-xs font-semibold transition-all ${
                  isActive 
                    ? 'bg-orange-500/15 border-orange-500/40 text-orange-400' 
                    : 'bg-zinc-900/80 border-white/5 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-orange-400" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-500" />
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
