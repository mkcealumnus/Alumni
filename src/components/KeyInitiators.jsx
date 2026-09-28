import React from 'react';
import { Compass, Sparkles, GraduationCap, Award, CheckCircle2 } from 'lucide-react';

export default function KeyInitiators() {
  const initiators = [
    {
      name: 'Sugeeth Priyan',
      dept: 'Department of Civil Engineering',
      batch: '2016 - 2020',
      role: 'Platform Initiator & MKCE Alumnus',
      type: 'Alumnus',
      avatarGradient: 'from-orange-500 to-amber-500',
      initials: 'SP',
      highlights: [
        'MKCE Civil Engineering Alumnus',
        'Conceptualized & Initiated mkcealumni.org',
        'Alumni Network Strategy & Community Visionary'
      ]
    },
    {
      name: 'Jayanthan Senthilkumar',
      dept: 'Department of Artificial Intelligence and Machine Learning',
      batch: '2022 - 2026',
      role: 'Platform Initiator & Core Engineer',
      type: 'Student Initiator',
      avatarGradient: 'from-indigo-500 to-purple-500',
      initials: 'JS',
      highlights: [
        'AI & Machine Learning Department',
        'Technical Execution & Platform Development',
        'Student-Alumni Engagement Architecture'
      ]
    }
  ];

  return (
    <div id="initiators-section" className="w-full max-w-5xl mx-auto my-14 px-4 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-mono font-bold mb-3">
          <Compass className="w-3.5 h-3.5 text-orange-600" />
          PLATFORM VISION & LEADERSHIP
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans tracking-tight">
          Key Initiators Behind <span className="gradient-text">mkcealumni.org</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          Driven by dedicated MKCE alumni and engineering students to empower generations of graduates.
        </p>
      </div>

      {/* Initiators Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {initiators.map((person) => (
          <div
            key={person.name}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Top Accent Line */}
            <div className={`absolute top-0 inset-x-8 h-1 bg-gradient-to-r ${person.avatarGradient} rounded-b-full`}></div>

            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-4">
                  {/* Avatar Badge */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${person.avatarGradient} p-0.5 shadow-md shadow-slate-200`}>
                    <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-bold text-slate-900 font-mono text-lg">
                      {person.initials}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {person.name}
                    </h4>
                    <p className="text-xs font-mono text-orange-600 font-bold mt-0.5">
                      {person.role}
                    </p>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-700 shrink-0">
                  {person.type}
                </span>
              </div>

              {/* Department & Batch */}
              <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/90 space-y-1.5 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <GraduationCap className="w-4 h-4 text-orange-600 shrink-0" />
                  <span>{person.dept}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pl-6 font-medium">
                  <span>Graduation Batch:</span>
                  <span className="text-slate-900 font-bold">{person.batch}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 mb-4">
                <h5 className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  Initiative Focus:
                </h5>
                {person.highlights.map((item, idx) => (
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
