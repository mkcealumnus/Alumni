import React, { useState } from 'react';
import { Instagram, ArrowRight, ShieldCheck, Users, GraduationCap, Compass, CheckCircle2, Sparkles, Bot, Code, Terminal, Star } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const heroPrompts = [
    {
      q: "Which roadmap fits 3rd Year CSE targeting Tier-1 product companies?",
      a: "The Software Engineering (SDE) roadmap — focusing on 250+ LeetCode problems, System Design LLD, and a full-stack React/Node project."
    },
    {
      q: "How can ECE students prepare for Qualcomm & Intel campus drives?",
      a: "Follow the VLSI & Embedded Core pathway: master Verilog HDL, Static Timing Analysis (STA), and Basys3 FPGA testbench simulation."
    },
    {
      q: "Where can I download FAANG-approved ATS resume templates?",
      a: "Available for free in the Resource Hub — authored in LaTeX/Overleaf with impact metrics by MKCE alumni."
    }
  ];

  const stats = [
    { value: '100%', label: 'Free Educational Hub', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { value: '500+', label: 'MKCE Students Guided', icon: Users, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
    { value: '30+', label: 'Verified Alumni Mentors', icon: GraduationCap, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#09090b] via-[#0c0d12] to-[#121318]">
      
      {/* Background Radial Glows & Grain Texture */}
      <div className="grain pointer-events-none absolute inset-0 opacity-20" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-mono font-medium text-orange-400 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
              <span>@mkce.alumni — Verified Career & Mentorship Portal</span>
            </div>

            {/* Main Display Title with Italic Serif Accent */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] text-white tracking-tight font-sans">
              Bridging <span className="font-serif italic text-orange-500 font-normal">MKCE Students</span> to Top Tech Careers
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-zinc-400 font-normal">
              100% free domain roadmaps, ATS resume templates, placement cheat-sheets, and 1-on-1 mentorship directly from successful M.Kumarasamy College of Engineering alumni.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-orange-500/20 transition-all hover:opacity-95 hover:scale-[1.02] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-200" />
                <span>Explore Domain Roadmaps</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="https://instagram.com/mkce.alumni"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/80 px-6 py-3.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>Join @mkce.alumni</span>
              </a>
            </div>

            {/* Key Value Points Pills */}
            <div className="pt-6 border-t border-white/10 space-y-2">
              <p className="label-mono text-[10px] text-orange-400">Key Institutional Features</p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-zinc-300">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#121318] px-3 py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Year-by-Year Skill Trees
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#121318] px-3 py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Free Overleaf ATS Resumes
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#121318] px-3 py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Live Q&A & Mock Drives
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Proof & Interactive Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl border border-white/10 bg-[#121318]/90 p-6 sm:p-7 shadow-2xl space-y-5 backdrop-blur-xl">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <span className="label-mono text-xs text-orange-400 font-bold">mkce.alumni/@portal-preview</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Alumni Hub
                </span>
              </div>

              {/* Alumni Identity Showcase */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">MKCE Career Hub</h3>
                  <span className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                    <Star className="w-3 h-3 fill-amber-400" /> 5.0 Rating
                  </span>
                </div>
                <p className="mt-1 text-xs font-mono text-orange-400">Guided by Engineers @ Amazon, Google, Qualcomm, Zoho</p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  Providing structured technical pathways for CSE, AI & DS, ECE, IT, and Core Engineering students at MKCE.
                </p>
              </div>

              {/* Normalized Skill Pills */}
              <div>
                <p className="label-mono text-[10px] text-zinc-400 mb-2">Core Tech Stacks Covered</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-200">C++ / Java DSA</span>
                  <span className="rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-200">React & Node.js</span>
                  <span className="rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-200">Python & LLMs</span>
                  <span className="rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-200">Verilog & FPGA</span>
                  <span className="rounded-md border border-white/10 bg-zinc-900 px-2.5 py-1 font-mono text-[11px] text-zinc-200">System Design</span>
                </div>
              </div>

              {/* Interactive Ask Profile Card */}
              <div className="rounded-2xl border border-white/10 bg-[#09090b] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="label-mono text-[10px] text-orange-400 flex items-center gap-1.5">
                    <Bot className="h-3.5 w-3.5 text-orange-400" /> Ask Alumni Assistant
                  </p>
                  <span className="text-[10px] font-mono text-zinc-500">Grounded Answers</span>
                </div>
                
                <p className="text-xs font-semibold text-zinc-100">“{heroPrompts[activePromptIndex].q}”</p>
                
                <div className="text-xs leading-relaxed text-zinc-300 bg-zinc-900/90 p-3 rounded-xl border border-white/5 font-sans">
                  {heroPrompts[activePromptIndex].a}
                </div>

                <div className="flex gap-1.5 pt-1">
                  {heroPrompts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePromptIndex(idx)}
                      className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${activePromptIndex === idx ? 'bg-orange-500' : 'bg-zinc-800'}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-2 border-white/10 bg-[#121318]/80"
              >
                <div className={`p-3 rounded-xl border mb-1 ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-3xl font-extrabold text-white tracking-tight font-sans">{stat.value}</span>
                <span className="text-xs font-mono font-semibold text-zinc-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
