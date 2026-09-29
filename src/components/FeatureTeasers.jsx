import React, { useState } from 'react';
import { Users, Compass, BookOpen, UserCheck, Globe, Calendar, ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export default function FeatureTeasers() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      id: 'alumni-directory',
      icon: Users,
      badge: 'Verified Search',
      title: 'Global Alumni Directory',
      tagline: 'Connect with 10,000+ MKCE Graduates',
      description: 'Search alumni by company (Zoho, Google, TCS, L&T), domain, location, or graduation batch. Verified badges for authentic connection.',
      color: 'from-orange-500 to-amber-500',
      highlights: ['Filter by batch, domain & company', 'Direct 1-on-1 messaging', 'Verified MKCE badge authentication']
    },
    {
      id: 'pathways',
      icon: Compass,
      badge: 'Curated Roadmaps',
      title: 'Career Pathway Guides',
      tagline: '100% Free Domain Tech Roadmaps',
      description: 'Curated step-by-step career blueprints for Full-Stack, AI/ML, Embedded Systems, Core Electrical, GATE, GRE, and Overseas Jobs.',
      color: 'from-indigo-500 to-purple-500',
      highlights: ['Recommended skills & certifications', 'Curated free study resources', 'Real-world salary & career expectations']
    },
    {
      id: 'mentorship',
      icon: UserCheck,
      badge: '1-on-1 Sessions',
      title: 'Alumni Mentorship Hub',
      tagline: 'Direct Mentorship from Seniors',
      description: 'Book 30-min 1-on-1 slot with senior alumni for resume reviews, mock technical interviews, and higher studies guidance.',
      color: 'from-emerald-500 to-teal-500',
      highlights: ['Mock technical & HR interviews', 'Resume & Portfolio feedback', 'Career pivot guidance']
    },
    {
      id: 'placement-vault',
      icon: BookOpen,
      badge: 'Exclusive Vault',
      title: 'Placement Question Vault',
      tagline: 'Verified Campus Interview Archives',
      description: 'Real interview experiences, coding round questions, and aptitude patterns submitted by recently placed MKCE graduates.',
      color: 'from-amber-500 to-rose-500',
      highlights: ['Company-wise interview questions', 'Coding test patterns & solutions', 'HR round frequently asked questions']
    },
    {
      id: 'global-chapters',
      icon: Globe,
      badge: 'Worldwide Network',
      title: 'Global Regional Chapters',
      tagline: 'Chennai, Bengaluru, USA & Beyond',
      description: 'Join local alumni city chapters for networking dinners, job referrals, relocation assistance, and regional meetups.',
      color: 'from-cyan-500 to-blue-500',
      highlights: ['City-wise WhatsApp/Telegram groups', 'Local job referral network', 'Relocation & housing support for freshers']
    },
    {
      id: 'reunion-events',
      icon: Calendar,
      badge: 'Annual Meet 2027',
      title: 'Grand Reunion & Events',
      tagline: 'Inaugural Homecoming Convening',
      description: 'Register for the Annual MKCE Alumni Homecoming Meet 2027, campus workshops, hackathons, and guest lecture series.',
      color: 'from-pink-500 to-rose-500',
      highlights: ['Campus homecoming registrations', 'Technical guest talk invitations', 'Student project sponsorship portal']
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4">
      {/* Section Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-mono font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          WHAT'S COMING TO MKCEALUMNI.ORG
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
          Designed for <span className="gradient-text">MKCE Engineers & Graduates</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
          An ecosystem crafted to bridge current MKCE students with our global alumni network launching Feb 01, 2027.
        </p>
      </div>

      {/* Grid of Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedFeature(item)}
              className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              {/* Corner accent glow */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}></div>

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} p-0.5 shadow-md shadow-slate-200`}>
                    <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center text-slate-900">
                      <IconComponent className="w-5.5 h-5.5 text-orange-600" />
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-700">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs font-mono text-orange-600 mt-0.5 mb-2 font-bold">
                  {item.tagline}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">
                  {item.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Preview Details</span>
                <span className="flex items-center gap-1 text-orange-600 font-bold group-hover:translate-x-0.5 transition-transform">
                  Explore <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Feature Preview Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${selectedFeature.color} p-0.5 shadow-xs`}>
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-slate-900">
                  <selectedFeature.icon className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-600 font-bold">
                  {selectedFeature.badge}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedFeature.title}</h3>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6 font-medium">
              {selectedFeature.description}
            </p>

            <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-6">
              <h5 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                Module Key Features:
              </h5>
              {selectedFeature.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200 font-medium">
              <span className="font-mono">Launch Date: Feb 01, 2027</span>
              <button
                onClick={() => setSelectedFeature(null)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold cursor-pointer shadow-xs"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
