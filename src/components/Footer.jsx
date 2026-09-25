import React, { useState } from 'react';
import { Instagram, Heart, Linkedin, Github, Mail, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

export default function Footer() {
  const [handleName, setHandleName] = useState('');

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (!handleName.trim()) return;
    alert(`Handle @${handleName.trim()} reserved! Check your MKCE student inbox for confirmation.`);
    setHandleName('');
  };

  return (
    <footer className="border-t border-slate-200/90 bg-white pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 space-y-12">
        
        {/* Top Handle Claim & Institutional Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-slate-200/80 pb-12">
          
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-3 group select-none">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-rose-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-mono font-extrabold text-orange-400 text-sm">
                  MK
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                MKCE<span className="text-orange-600">.alumni</span>
              </span>
            </a>

            <p className="text-slate-600 text-xs leading-relaxed max-w-md">
              Official non-profit career guidance, roadmap, and mentorship platform built by alumni for the engineering students of <strong className="text-slate-900">M.Kumarasamy College of Engineering (MKCE), Karur</strong>.
            </p>

            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-mono text-emerald-700 font-semibold">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-orange-600" />
                100% Free Forever
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-slate-50/90 rounded-3xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <p className="label-mono text-xs text-orange-600 font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-orange-600" /> Reserve Student Profile Pass
              </p>
              <span className="text-[11px] font-mono text-slate-500">Instant Student ID</span>
            </div>
            
            <p className="text-xs text-slate-600">
              Claim your verified student profile handle on <strong className="text-slate-900">mkcealumni.org/@yourname</strong> to track roadmap progress.
            </p>

            <form onSubmit={handleClaimSubmit} className="flex items-center gap-2 pt-1">
              <div className="flex-1 flex items-center rounded-xl border border-slate-300 bg-white px-3.5 py-2">
                <span className="text-xs font-mono text-slate-400 select-none">mkcealumni.org/@</span>
                <input
                  type="text"
                  placeholder="yourname"
                  value={handleName}
                  onChange={(e) => setHandleName(e.target.value)}
                  className="w-full bg-transparent text-xs font-mono text-slate-900 focus:outline-none placeholder:text-slate-400"
                  required
                />
              </div>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white shadow transition-all hover:bg-orange-700 cursor-pointer">
                <span>Claim Handle</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-600 font-bold">Engineering Pathways</p>
            <ul className="space-y-2.5 text-xs text-slate-600 font-sans">
              <li><a href="#pathways" className="hover:text-slate-900 transition-colors">Software Engineering (SDE)</a></li>
              <li><a href="#pathways" className="hover:text-slate-900 transition-colors">AI, Data Science & ML</a></li>
              <li><a href="#pathways" className="hover:text-slate-900 transition-colors">VLSI & Chip Design (ECE/EEE)</a></li>
              <li><a href="#pathways" className="hover:text-slate-900 transition-colors">Core Industrial Tech</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-600 font-bold">Resources & Services</p>
            <ul className="space-y-2.5 text-xs text-slate-600 font-sans">
              <li><a href="#resources" className="hover:text-slate-900 transition-colors">Overleaf ATS Resume Templates</a></li>
              <li><a href="#resources" className="hover:text-slate-900 transition-colors">DSA 450 Placement Cheat Sheet</a></li>
              <li><a href="#mentorship" className="hover:text-slate-900 transition-colors">Submit Alumni Doubt Ticket</a></li>
              <li><a href="#notice-board" className="hover:text-slate-900 transition-colors">Live Mock Interview Drives</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-600 font-bold">Social Media Initiative</p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Connect with @mkce.alumni on Instagram for real-time placement alerts, reels, and alumni spotlights.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com/mkce.alumni" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-pink-600 hover:text-pink-700 hover:border-pink-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-600 font-bold">Contact Alumni Team</p>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-600 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-slate-400 block">Institutional Email</span>
                <span className="text-xs font-mono font-semibold text-slate-800">contact@mkcealumni.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-slate-500">
          <p>© 2026 MKCE Alumni Platform. Non-profit Educational Initiative.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>for M.Kumarasamy College of Engineering Students</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
