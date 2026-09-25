import React, { useState } from 'react';
import { Clock, UserCheck, Video, BellRing, ArrowUpRight, CheckCircle2, Ticket, Plus } from 'lucide-react';
import { INITIAL_EVENTS } from '../data/initialData';

export default function NoticeBoard({ initialEvents, currentRole }) {
  const [events, setEvents] = useState(initialEvents && initialEvents.length > 0 ? initialEvents : INITIAL_EVENTS);
  
  // Registration Modal
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketGenerated, setTicketGenerated] = useState(false);
  const [studentEmail, setStudentEmail] = useState('');
  const [studentName, setStudentName] = useState('');
  const [registrationsCount, setRegistrationsCount] = useState({});

  // Create Event Modal
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventSpeaker, setEventSpeaker] = useState('');
  const [eventSpeakerRole, setEventSpeakerRole] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventType, setEventType] = useState('Live Webinar');
  const [eventCreatedSuccess, setEventCreatedSuccess] = useState(false);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setTicketGenerated(true);
    if (selectedEvent) {
      const newCount = (registrationsCount[selectedEvent.id] || selectedEvent.registrations || 0) + 1;
      setRegistrationsCount(prev => ({ ...prev, [selectedEvent.id]: newCount }));
    }
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEv = {
      id: Date.now(),
      title: eventTitle,
      speaker: eventSpeaker || 'MKCE Alumni Speaker',
      speaker_role: eventSpeakerRole || 'Verified Industry Leader',
      date: eventDate || 'Upcoming Session',
      type: eventType,
      status: 'Upcoming',
      banner_color: 'from-orange-600 to-amber-600',
      registrations: 1,
      agenda: ['Interactive Domain Talk', 'Live Q&A Session']
    };

    setEvents(prev => [newEv, ...prev]);

    setEventCreatedSuccess(true);
    setTimeout(() => {
      setEventCreatedSuccess(false);
      setShowCreateEventModal(false);
      setEventTitle('');
      setEventSpeaker('');
      setEventSpeakerRole('');
      setEventDate('');
    }, 1500);
  };

  return (
    <section id="notice-board" className="py-16 sm:py-20 3xl:py-24 bg-[#fcfcfc] relative border-b border-slate-200/80">
      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="label-mono text-xs text-orange-600 font-bold mb-1">Live Institutional Notice Board</p>
            <h2 className="text-3xl sm:text-5xl 3xl:text-6xl font-normal text-slate-900 font-sans tracking-tight">
              Upcoming Webinars & <span className="font-serif italic text-orange-600">Mock Drives</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Participate in live interactive sessions hosted by MKCE alumni across top companies globally.
            </p>
          </div>

          <button
            onClick={() => setShowCreateEventModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Session</span>
          </button>
        </div>

        {/* Events Grid */}
        {events.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto border border-orange-200">
              <BellRing className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Upcoming Sessions</h3>
            <p className="text-xs text-slate-500">
              No sessions published yet. Click 'Publish Session' above to add one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6">
            {events.map((event) => {
              const currentRegs = registrationsCount[event.id] || event.registrations || 10;
              return (
                <div
                  key={event.id}
                  className="glass-card glass-card-hover p-6 sm:p-7 rounded-3xl border-slate-200/90 bg-white relative overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  {/* Gradient Top Banner Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${event.banner_color || event.bannerColor || 'from-orange-600 to-amber-600'}`} />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 mt-1">
                      <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 flex items-center gap-1.5">
                        <Video className="w-3 h-3 text-orange-600" />
                        {event.type}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        {event.status || 'Upcoming'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-3 hover:text-orange-600 transition-colors leading-snug">
                      {event.title}
                    </h3>

                    <div className="space-y-2.5 text-xs text-slate-600 mb-4">
                      <div className="flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-orange-600 shrink-0" />
                        <div>
                          <span className="font-bold text-slate-900 block">{event.speaker}</span>
                          <span className="text-[10px] font-mono text-slate-500 block">{event.speaker_role || event.speakerRole}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 pt-1 font-mono">
                        <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                        <span className="font-medium text-slate-800">{event.date}</span>
                      </div>
                    </div>

                    {/* Agenda Bullet points */}
                    {event.agenda && (
                      <div className="space-y-1.5 mb-6">
                        <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">Session Agenda:</span>
                        {event.agenda.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">
                      <strong className="text-slate-900">{currentRegs}</strong> registered
                    </span>
                    
                    <button
                      onClick={() => { setSelectedEvent(event); setTicketGenerated(false); }}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                    >
                      <span>Reserve Spot</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Publish Event Modal */}
        {showCreateEventModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-orange-600" />
                  <h3 className="text-base font-bold text-slate-900">Publish Session</h3>
                </div>
                <button onClick={() => setShowCreateEventModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer">✕</button>
              </div>

              {eventCreatedSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Session Published Successfully!</h4>
                </div>
              ) : (
                <form onSubmit={handleCreateEvent} className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Session Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Master System Design & Microservices"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Speaker Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Vigneshwaran R."
                        value={eventSpeaker}
                        onChange={(e) => setEventSpeaker(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Role / Company</label>
                      <input
                        type="text"
                        placeholder="e.g. SDE @ Amazon"
                        value={eventSpeakerRole}
                        onChange={(e) => setEventSpeakerRole(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Date & Time</label>
                      <input
                        type="text"
                        placeholder="e.g. Nov 5, 2026 • 6:00 PM IST"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600 font-mono"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Session Type</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-600 font-mono"
                      >
                        <option value="Live Webinar">Live Webinar</option>
                        <option value="Mock Interview Drive">Mock Interview Drive</option>
                        <option value="Domain Workshop">Domain Workshop</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowCreateEventModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md cursor-pointer">Publish Session</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Event Registration Pass Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">Reserve Event Pass</h3>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer">✕</button>
              </div>

              {ticketGenerated ? (
                <div className="py-4 space-y-4">
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-orange-50 via-white to-amber-50 border border-orange-200 space-y-3 relative shadow-sm">
                    <div className="flex items-center justify-between border-b border-orange-100 pb-2.5">
                      <span className="text-[10px] font-mono font-black text-orange-700 uppercase tracking-wider">MKCE Digital Event Pass</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">CONFIRMED</span>
                    </div>

                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{selectedEvent.title}</h4>
                      <p className="text-xs text-orange-600 font-mono mt-0.5">{selectedEvent.speaker}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-600 pt-2 border-t border-orange-100">
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

                  <p className="text-xs text-slate-600 text-center font-mono">
                    Digital pass generated! Joining link sent to <strong>{studentEmail || 'student@mkce.ac.in'}</strong>.
                  </p>

                  <button onClick={() => setSelectedEvent(null)} className="w-full py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md cursor-pointer">Done & Close</button>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{selectedEvent.title}</span>
                    <span className="text-xs font-mono text-slate-500 block mt-0.5">{selectedEvent.date}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Student Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Aravind M."
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">MKCE Email ID</label>
                    <input
                      type="email"
                      placeholder="e.g. aravind@mkce.ac.in"
                      value={studentEmail}
                      onChange={(e) => setStudentEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 cursor-pointer">Generate Digital Pass</button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
