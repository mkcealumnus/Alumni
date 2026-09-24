import React, { useState } from 'react';
import { EVENTS } from '../data/mockData';
import { Clock, UserCheck, Video, BellRing, ArrowUpRight, CheckCircle2, Calendar, Ticket, Sparkles } from 'lucide-react';

export default function NoticeBoard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [registrationsCount, setRegistrationsCount] = useState({});

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setTicketGenerated(true);
    if (selectedEvent) {
      setRegistrationsCount(prev => ({ ...prev, [selectedEvent.id]: (prev[selectedEvent.id] || selectedEvent.registrations) + 1 }));
    }
  };

  return (
    <section id="notice-board" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <BellRing className="w-3.5 h-3.5 animate-bounce text-emerald-600" /> Institutional Notice Board
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Upcoming Webinars & <span className="gradient-text">Mock Drives</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Participate in live interactive sessions hosted by MKCE alumni across the globe.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => {
            const currentRegs = registrationsCount[event.id] || event.registrations;
            return (
              <div
                key={event.id}
                className="glass-card glass-card-hover p-6 rounded-2xl border-slate-200 bg-white relative overflow-hidden flex flex-col justify-between shadow-sm"
              >
                {/* Gradient Banner Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${event.bannerColor}`} />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 mt-1">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                      <Video className="w-3 h-3 text-cyan-600" />
                      {event.type}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {event.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3 hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-xs text-slate-600 mb-4">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                      <div>
                        <span className="font-bold text-slate-900 block">{event.speaker}</span>
                        <span className="text-[10px] text-slate-500 font-medium block">{event.speakerRole}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 pt-1">
                      <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                      <span className="font-medium text-slate-700">{event.date}</span>
                    </div>
                  </div>

                  {/* Agenda Bullet points */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Session Agenda:</span>
                    {event.agenda.map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    <strong className="text-slate-900">{currentRegs}</strong> registered
                  </span>
                  
                  <button
                    onClick={() => { setSelectedEvent(event); setTicketGenerated(false); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all"
                  >
                    <span>Reserve Free Spot</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Event Registration & Digital Pass Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">Reserve Event Pass</h3>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-slate-400 hover:text-slate-700 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {ticketGenerated ? (
                <div className="py-4 space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-200 space-y-3 relative shadow-sm">
                    <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                      <span className="text-[10px] font-black text-indigo-700 uppercase tracking-wider">Official MKCE Digital Pass</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">CONFIRMED</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{selectedEvent.title}</h4>
                      <p className="text-xs text-indigo-600 font-semibold mt-0.5">{selectedEvent.speaker}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-1 border-t border-indigo-100/60">
                      <div>
                        <span className="text-[9px] text-slate-400 block">ATTENDEE</span>
                        <strong className="text-slate-900">{studentName || 'MKCE Student'}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block">DATE & TIME</span>
                        <strong className="text-slate-900">{selectedEvent.date}</strong>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 text-center">
                    Joining link & calendar invitation sent to <strong>{studentEmail || 'student@mkce.ac.in'}</strong>!
                  </p>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                  >
                    Done & Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{selectedEvent.title}</span>
                    <span className="text-xs text-slate-500 block">{selectedEvent.date}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aravind M."
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">MKCE College Email ID</label>
                    <input
                      type="email"
                      placeholder="e.g. aravind@mkce.ac.in"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                  >
                    Generate Free Entry Pass
                  </button>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
