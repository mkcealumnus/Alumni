import React from 'react';
import { 
  Compass, BookOpen, MessageSquare, GitFork, ArrowUpRight, 
  CheckCircle2, Clock, Sparkles, TrendingUp, Users, ShieldCheck, 
  GraduationCap
} from 'lucide-react';
import { RESOURCES, STUDENT_QUERIES, EVENTS, FORKS_PROJECTS } from '../../data/mockData';

export default function OverviewTab({ currentUser, setActiveTab }) {
  const role = currentUser?.role || 'student';

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-xl shadow-indigo-500/15 relative overflow-hidden">
        
        {/* Glow Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" /> Welcome back, {currentUser?.name || 'MKCE Student'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {role === 'student' && 'Your Personalized Career & Skill Workspace'}
              {role === 'alumni' && 'Alumni Mentor Dashboard & Guidance Portal'}
              {role === 'admin' && 'Platform Control Center & Network Management'}
            </h2>
            <p className="text-indigo-100 text-xs sm:text-sm max-w-xl">
              100% free career roadmaps, placement resources, and mentorship for M.Kumarasamy College of Engineering.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('pathways')}
              className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 transition-all shadow-md flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>Explore Roadmaps</span>
            </button>
            <button
              onClick={() => setActiveTab('mentorship')}
              className="px-5 py-2.5 rounded-xl bg-indigo-500/40 border border-white/20 text-white font-bold text-xs hover:bg-indigo-500/60 transition-all backdrop-blur-md flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Alumni</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">3 Domains</span>
            <span className="text-xs text-slate-500 font-medium">SDE, AI/ML & Core VLSI</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">{RESOURCES.length}+ Materials</span>
            <span className="text-xs text-slate-500 font-medium">ATS Resumes & Cheat Sheets</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">{STUDENT_QUERIES.length} Queries</span>
            <span className="text-xs text-slate-500 font-medium">Verified Alumni Answers</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <GitFork className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">{FORKS_PROJECTS.length} Student Projects</span>
            <span className="text-xs text-slate-500 font-medium">Open-Source & Capstones</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Student Q&A Stream & Student Projects Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Q&A Threads */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-indigo-600" />
              <span>Recent Alumni Answers</span>
            </h3>
            <button
              onClick={() => setActiveTab('mentorship')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>View All Questions</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {STUDENT_QUERIES.slice(0, 2).map((q) => (
              <div key={q.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{q.studentName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">{q.studentYear}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold">{q.category}</span>
                </div>

                <h4 className="text-xs font-semibold text-slate-800">{q.question}</h4>

                {q.answer && (
                  <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{q.answer.alumniName}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">Verified Alumni</span>
                    </div>
                    <p className="text-slate-700 text-[11px] leading-relaxed">{q.answer.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Featured Student Projects / Forks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <GitFork className="w-5 h-5 text-purple-600" />
              <span>Featured Student Forks</span>
            </h3>
            <button
              onClick={() => setActiveTab('forks')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              <span>Explore Directory</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {FORKS_PROJECTS.slice(0, 2).map((proj) => (
              <div key={proj.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold">
                    {proj.branch}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                    <span>⭐ {proj.stars}</span>
                    <span>🍴 {proj.forksCount}</span>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2">{proj.description}</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400">By {proj.studentName}</span>
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                  >
                    <span>View Code</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
