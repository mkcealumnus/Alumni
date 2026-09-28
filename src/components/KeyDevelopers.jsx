import React from 'react';
import { Code2, Sparkles, GraduationCap, Linkedin, Github, Award, CheckCircle2 } from 'lucide-react';

export default function KeyDevelopers() {
  const developers = [
    {
      name: 'Sugeeth Priyan',
      dept: 'Department of Civil Engineering',
      batch: '2016 - 2020',
      role: 'Platform Architect & Lead Alumni Developer',
      type: 'Alumnus',
      avatarGradient: 'from-orange-500 to-amber-500',
      initials: 'SP',
      highlights: [
        'MKCE Civil Engineering Alumnus',
        'Initiated mkcealumni.org architecture',
        'Alumni Network Strategy & Mentorship Lead'
      ]
    },
    {
      name: 'Jayanthan Senthilkumar',
      dept: 'Department of Artificial Intelligence and Machine Learning',
      batch: '2022 - 2026',
      role: 'Core Platform Engineer & Full-Stack Developer',
      type: 'Developer',
      avatarGradient: 'from-indigo-500 to-purple-500',
      initials: 'JS',
      highlights: [
        'AI & Machine Learning Engineering',
        'Frontend Architecture & UI/UX System',
        'Database & Interactive Portal Integration'
      ]
    }
  ];

  return (
    <div id="developers-section" className="w-full max-w-5xl mx-auto my-14 px-4 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-mono font-bold mb-3">
          <Code2 className="w-3.5 h-3.5 text-orange-600" />
          PLATFORM ARCHITECTS & CREATORS
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
          Key Developers Behind <span className="gradient-text">mkcealumni.org</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          Built by MKCE engineers for the global MKCE alumni and student community.
        </p>
      </div>

      {/* Developers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {developers.map((dev) => (
          <div
            key={dev.name}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Line */}
            <div className={`absolute top-0 inset-x-8 h-1 bg-gradient-to-r ${dev.avatarGradient} rounded-b-full`}></div>

            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  {/* Avatar Badge */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${dev.avatarGradient} p-0.5 shadow-md shadow-slate-200`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-bold text-slate-900 font-mono text-lg">
                      {dev.initials}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {dev.name}
                    </h4>
                    <p className="text-xs font-mono text-orange-600 font-bold mt-0.5">
                      {dev.role}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-700 shrink-0">
                  {dev.type}
                </span>
              </div>

              {/* Department & Batch */}
              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-1.5 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <GraduationCap className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{dev.dept}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pl-6 font-medium">
                  <span>Graduation Batch:</span>
                  <span className="text-slate-900 font-bold">{dev.batch}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 mb-4">
                <h5 className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Key Contributions:
                </h5>
                {dev.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Badge */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                M. Kumarasamy College of Engineering
              </span>
              <span className="font-mono text-[10px] text-orange-600 font-bold">
                mkcealumni.org
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
