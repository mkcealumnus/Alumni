import React from 'react';
import { Calendar, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Header({ onNavigate, onOpenCalendarModal }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80 px-4 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo & Domain */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-amber-300 p-0.5 shadow-lg shadow-orange-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-orange-400 font-serif text-xl tracking-wider">
              MK
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base lg:text-lg tracking-tight text-white font-sans">
                MKCE <span className="gradient-text">Alumni Network</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                mkcealumni.org
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden xs:block">
              M. Kumarasamy College of Engineering • Autonomous
            </p>
          </div>
        </div>

        {/* Live Status Pill & Quick Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenCalendarModal}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-orange-500/50 transition-all cursor-pointer group"
          >
            <Calendar className="w-3.5 h-3.5 text-orange-400 group-hover:scale-110 transition-transform" />
            <span>Launch: <span className="text-orange-400 font-mono font-bold">Jan 14, 2027</span></span>
          </button>

          <button
            onClick={() => onNavigate('notify-section')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-slate-950 shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get Early Access</span>
          </button>
        </div>

      </div>
    </header>
  );
}
