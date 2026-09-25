import React, { useState } from 'react';
import { Instagram, ArrowRight, ShieldCheck, Users, GraduationCap, Compass, CheckCircle2, Sparkles, Bot, Star } from 'lucide-react';

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
    { value: '100%', label: 'Free Educational Hub', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' },
    { value: '500+', label: 'MKCE Students Guided', icon: Users, color: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' },
    { value: '30+', label: 'Verified Alumni Mentors', icon: GraduationCap, color: 'text-cyan-600', bg: 'bg-cyan-50 border-cyan-200' },
  ];

  return (
    <section className="relative py-12 sm:py-16 lg:py-24 3xl:py-28 overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-[#fcfcfc] via-[#f8fafc] to-[#f1f5f9]">
      
      {/* Background Radial Glows & Grain Texture */}
      <div className="grain pointer-events-none absolute inset-0 opacity-30" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] 3xl:w-[1000px] h-[700px] 3xl:h-[1000px] bg-orange-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-amber-300/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-rose-300/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 relative z-10">
        
        {/* Main Hero Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Action Buttons */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-xs font-mono font-semibold text-orange-700 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-orange-600 animate-pulse" />
              <span>@mkce.alumni — Verified Career & Mentorship Portal</span>
            </div>

            {/* Main Display Title with Italic Serif Accent */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl 3xl:text-7xl 4xl:text-8xl font-normal leading-[1.08] text-slate-900 tracking-tight font-sans">
              Bridging <span className="font-serif italic text-orange-600 font-normal">MKCE Students</span> to Top Tech Careers
            </h1>

            {/* Subtitle */}
            <p className="max-w-2xl text-sm sm:text-base lg:text-lg 3xl:text-xl leading-relaxed text-slate-600 font-normal">
              100% free domain roadmaps, ATS resume templates, placement cheat-sheets, and 1-on-1 mentorship directly from successful M.Kumarasamy College of Engineering alumni.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-orange-500/20 transition-all hover:opacity-95 hover:scale-[1.02] cursor-pointer"
              >
                <Compass className="w-4 h-4 text-amber-200" />
                <span>Explore Domain Roadmaps</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                href="https://instagram.com/mkce.alumni"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition-all hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300"
              >
                <Instagram className="w-4 h-4 text-pink-600" />
                <span>Join @mkce.alumni</span>
              </a>
            </div>

            {/* Key Value Points Pills */}
            <div className="pt-6 border-t border-slate-200/80 space-y-2">
              <p className="label-mono text-[10px] text-orange-600">Key Institutional Features</p>
              <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-700">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Year-by-Year Skill Trees
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Free Overleaf ATS Resumes
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Live Q&A & Mock Drives
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Proof & Interactive Card Preview */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl border border-slate-200/90 bg-white/95 p-5 sm:p-7 shadow-2xl space-y-5 backdrop-blur-xl">
              
              {/* Card Header Bar */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="label-mono text-xs text-orange-600 font-bold">mkce.alumni/@portal-preview</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-mono text-emerald-700 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Verified Alumni Hub
                </span>
              </div>

              {/* Alumni Identity Showcase */}
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900">MKCE Career Hub</h3>
                  <span className="flex items-center gap-1 text-amber-700 text-xs font-mono font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> 5.0 Rating
                  </span>
                </div>
                <p className="mt-1 text-xs font-mono font-semibold text-orange-600">Guided by Engineers @ Amazon, Google, Qualcomm, Zoho</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Providing structured technical pathways for CSE, AI & DS, ECE, IT, and Core Engineering students at MKCE.
                </p>
              </div>

              {/* Normalized Skill Pills */}
              <div>
                <p className="label-mono text-[10px] text-slate-500 mb-2">Core Tech Stacks Covered</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-800">C++ / Java DSA</span>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-800">React & Node.js</span>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-800">Python & LLMs</span>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-800">Verilog & FPGA</span>
                  <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] text-slate-800">System Design</span>
                </div>
              </div>

              {/* Interactive Ask Profile Card */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="label-mono text-[10px] text-orange-600 flex items-center gap-1.5">
                    <Bot className="h-3.5 w-3.5 text-orange-600" /> Ask Alumni Assistant
                  </p>
                  <span className="text-[10px] font-mono text-slate-500">Grounded Answers</span>
                </div>
                
                <p className="text-xs font-semibold text-slate-900">“{heroPrompts[activePromptIndex].q}”</p>
                
                <div className="text-xs leading-relaxed text-slate-700 bg-white p-3 rounded-xl border border-slate-200 font-sans shadow-2xs">
                  {heroPrompts[activePromptIndex].a}
                </div>

                <div className="flex gap-1.5 pt-1">
                  {heroPrompts.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePromptIndex(idx)}
                      className={`h-1.5 flex-1 rounded-full transition-all cursor-pointer ${activePromptIndex === idx ? 'bg-orange-600' : 'bg-slate-300'}`}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-5xl 3xl:max-w-6xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-5 sm:p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-2 border-slate-200 bg-white/90 shadow-sm"
              >
                <div className={`p-3 rounded-xl border mb-1 ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">{stat.value}</span>
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">{stat.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
