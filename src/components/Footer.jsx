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
    <footer className="border-t border-white/10 bg-[#070709] pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Handle Claim & Institutional Box (Inspired by twinaventrea.vercel.app) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-b border-white/10 pb-12">
          
          <div className="lg:col-span-5 space-y-4">
            <a href="#" className="flex items-center gap-3 group select-none">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 via-amber-500 to-rose-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-[#09090b] rounded-[14px] flex items-center justify-center font-mono font-extrabold text-orange-500 text-sm">
                  MK
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                MKCE<span className="text-orange-500">.alumni</span>
              </span>
            </a>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              Official non-profit career guidance, roadmap, and mentorship platform built by alumni for the engineering students of <strong className="text-white">M.Kumarasamy College of Engineering (MKCE), Karur</strong>.
            </p>

            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[11px] font-mono text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                <ShieldCheck className="h-3.5 w-3.5 text-orange-400" />
                100% Free Forever
              </span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#121318] rounded-3xl border border-white/10 p-6 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <p className="label-mono text-xs text-orange-400 font-bold flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-orange-400" /> Reserve Student Profile Pass
              </p>
              <span className="text-[11px] font-mono text-zinc-500">Instant Student ID</span>
            </div>
            
            <p className="text-xs text-zinc-400">
              Claim your verified student profile handle on <strong className="text-zinc-200">mkcealumni.org/@yourname</strong> to track roadmap progress.
            </p>

            <form onSubmit={handleClaimSubmit} className="flex items-center gap-2 pt-1">
              <div className="flex-1 flex items-center rounded-xl border border-white/10 bg-[#09090b] px-3.5 py-2">
                <span className="text-xs font-mono text-zinc-500 select-none">mkcealumni.org/@</span>
                <input
                  type="text"
                  placeholder="yourname"
                  value={handleName}
                  onChange={(e) => setHandleName(e.target.value)}
                  className="w-full bg-transparent text-xs font-mono text-white focus:outline-none placeholder:text-zinc-600"
                  required
                />
              </div>
              <button type="submit" className="inline-flex items-center gap-1.5 rounded-xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow transition-all hover:bg-orange-600 cursor-pointer">
                <span>Claim Handle</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-400 font-bold">Engineering Pathways</p>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans">
              <li><a href="#pathways" className="hover:text-white transition-colors">Software Engineering (SDE)</a></li>
              <li><a href="#pathways" className="hover:text-white transition-colors">AI, Data Science & ML</a></li>
              <li><a href="#pathways" className="hover:text-white transition-colors">VLSI & Chip Design (ECE/EEE)</a></li>
              <li><a href="#pathways" className="hover:text-white transition-colors">Core Industrial Tech</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-400 font-bold">Resources & Services</p>
            <ul className="space-y-2.5 text-xs text-zinc-400 font-sans">
              <li><a href="#resources" className="hover:text-white transition-colors">Overleaf ATS Resume Templates</a></li>
              <li><a href="#resources" className="hover:text-white transition-colors">DSA 450 Placement Cheat Sheet</a></li>
              <li><a href="#mentorship" className="hover:text-white transition-colors">Submit Alumni Doubt Ticket</a></li>
              <li><a href="#notice-board" className="hover:text-white transition-colors">Live Mock Interview Drives</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-400 font-bold">Social Media Initiative</p>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Connect with @mkce.alumni on Instagram for real-time placement alerts, reels, and alumni spotlights.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a href="https://instagram.com/mkce.alumni" target="_blank" rel="noreferrer" className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-pink-400 hover:text-pink-300 hover:border-pink-500/40 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white hover:border-white/20 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="label-mono text-xs text-orange-400 font-bold">Contact Alumni Team</p>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-400 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-zinc-500 block">Institutional Email</span>
                <span className="text-xs font-mono font-semibold text-zinc-200">contact@mkcealumni.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <p>© 2026 MKCE Alumni Platform. Non-profit Educational Initiative.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for M.Kumarasamy College of Engineering Students</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
