import React from 'react';
import { Instagram, ArrowRight, ShieldCheck, Users, GraduationCap, Sparkles, BookOpen, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function Hero({ onExploreClick }) {
  const stats = [
    { value: '100%', label: 'Free Forever', icon: ShieldCheck, color: 'text-emerald-400' },
    { value: '500+', label: 'MKCE Students Guided', icon: Users, color: 'text-indigo-400' },
    { value: '30+', label: 'Alumni Mentors', icon: GraduationCap, color: 'text-cyan-400' },
  ];

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#0B0F19]">
      
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[350px] h-[350px] bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-xl backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-indigo-400 font-medium">Official Alumni Initiative</span>
            <span className="text-slate-600">•</span>
            <span className="text-pink-400 flex items-center gap-1">
              <Instagram className="w-3.5 h-3.5" /> @mkce.alumni
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
            Bridging <span className="gradient-text">MKCE Students</span> to Top Tech & Engineering Careers
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            100% free career roadmaps, interview preparation material, and 1-on-1 mentorship directly from successful M.Kumarasamy College of Engineering alumni.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onExploreClick}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
            >
              <Compass className="w-4 h-4 text-cyan-300 group-hover:rotate-45 transition-transform" />
              <span>Explore Career Roadmaps</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://instagram.com/mkce.alumni"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-pink-500/50 text-slate-200 hover:text-white font-semibold text-sm transition-all duration-300 hover:bg-slate-800 flex items-center justify-center gap-2 group"
            >
              <Instagram className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
              <span>Join @mkce.alumni on Instagram</span>
            </a>
          </div>

          {/* Key Value Points */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Year-by-Year Skill Trees</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Free ATS Resume Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Direct Alumni Q&A Forum</span>
            </div>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card glass-card-hover p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-2"
              >
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 mb-1">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className="text-3xl font-extrabold text-white tracking-tight">{stat.value}</span>
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{stat.label}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
import { Compass } from 'lucide-react';
