import React from 'react';
import { EVENTS } from '../data/mockData';
import { Calendar, Clock, UserCheck, Video, BellRing, ArrowUpRight } from 'lucide-react';

export default function NoticeBoard() {
  return (
    <section id="notice-board" className="py-20 bg-[#0B0F19] relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <BellRing className="w-3.5 h-3.5 animate-bounce" /> Live Notice Board
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Upcoming Webinars & <span className="gradient-text">Mock Drives</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Participate in live interactive sessions hosted by MKCE alumni across the globe.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="glass-card glass-card-hover p-6 rounded-2xl border-slate-800 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Gradient Banner Accent */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${event.bannerColor}`} />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4 mt-1">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center gap-1.5">
                    <Video className="w-3 h-3 text-cyan-400" />
                    {event.type}
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                    {event.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 hover:text-indigo-300 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 text-xs text-slate-300 mb-6">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="font-medium text-slate-200">{event.speaker}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{event.date}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  <strong className="text-white">{event.registrations}</strong> students registered
                </span>
                
                <button
                  onClick={() => alert(`Registered for "${event.title}"! Check your email for joining details.`)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all"
                >
                  <span>Reserve Free Spot</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
