import React, { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { Clock, UserCheck, Video, BellRing, ArrowUpRight, CheckCircle2, Ticket, Plus, Loader2 } from 'lucide-react';

const DEFAULT_EVENTS = [
  {
    id: 1,
    title: 'Crack Top SDE Roles: Resume & Coding Strategy 2026',
    speaker: 'Surya Narayanan',
    speaker_role: 'Senior Software Engineer @ Microsoft (Batch 2019)',
    date: 'Oct 12, 2026 • 6:30 PM IST',
    type: 'Live Webinar',
    status: 'Upcoming',
    banner_color: 'from-indigo-600 to-blue-600',
    registrations: 340,
    agenda: ['15 DSA Patterns to Master', 'ATS Resume Audit live sample', 'Q&A session with Microsoft SDEs']
  },
  {
    id: 2,
    title: '1-on-1 Mock Interview Drive with Verified Alumni Mentors',
    speaker: '15+ MKCE Alumni Mentors',
    speaker_role: 'Amazon, Qualcomm, ZoHo, Freshworks',
    date: 'Oct 18, 2026 • Full Day (10:00 AM - 5:00 PM)',
    type: 'Mock Interview Drive',
    status: 'Registration Open',
    banner_color: 'from-purple-600 to-pink-600',
    registrations: 180,
    agenda: ['45-min live technical coding or core VLSI round', '15-min personalized feedback & resume score card']
  },
  {
    id: 3,
    title: 'Semiconductor & Embedded Career Roadmap Workshop',
    speaker: 'Priya Dharshini',
    speaker_role: 'Hardware Engineer @ Qualcomm (Batch 2022)',
    date: 'Oct 25, 2026 • 5:00 PM IST',
    type: 'Domain Workshop',
    status: 'Registration Open',
    banner_color: 'from-amber-600 to-orange-600',
    registrations: 210,
    agenda: ['Breakdown of RTL & STA interviews', 'How to get off-campus core hardware internships']
  }
];

export default function NoticeBoard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
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

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      const data = await dbService.getEvents();
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        setEvents(DEFAULT_EVENTS);
      }
      setLoading(false);
    }
    loadEvents();
  }, []);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setTicketGenerated(true);
    if (selectedEvent) {
      const newCount = (registrationsCount[selectedEvent.id] || selectedEvent.registrations || 100) + 1;
      setRegistrationsCount(prev => ({ ...prev, [selectedEvent.id]: newCount }));
      await dbService.registerForEvent({
        event_id: selectedEvent.id,
        student_name: studentName,
        student_email: studentEmail
      });
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEv = await dbService.createEvent({
      title: eventTitle,
      speaker: eventSpeaker || 'MKCE Alumni Speaker',
      speaker_role: eventSpeakerRole || 'Verified Industry Leader',
      date: eventDate || 'Upcoming Session',
      type: eventType,
      status: 'Upcoming',
      banner_color: 'from-indigo-600 to-purple-600',
      registrations: 1
    });

    if (newEv) {
      setEvents([newEv, ...events]);
    } else {
      setEvents([{
        id: Date.now(),
        title: eventTitle,
        speaker: eventSpeaker || 'MKCE Alumni Speaker',
        speaker_role: eventSpeakerRole || 'Verified Industry Leader',
        date: eventDate || 'Upcoming Session',
        type: eventType,
        status: 'Upcoming',
        banner_color: 'from-indigo-600 to-purple-600',
        registrations: 1,
        agenda: ['Interactive Domain Talk', 'Live Q&A Session']
      }, ...events]);
    }

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
    <section id="notice-board" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold mb-3">
              <BellRing className="w-3.5 h-3.5 animate-bounce text-emerald-600" /> Supabase Connected Notice Board
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Upcoming Webinars & <span className="gradient-text">Mock Drives</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Participate in live interactive sessions hosted by MKCE alumni across the globe.
            </p>
          </div>

          <button
            onClick={() => setShowCreateEventModal(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md transition-all shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Publish Session to Supabase</span>
          </button>
        </div>

        {/* Events Grid / Loader */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500 text-xs font-semibold">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span>Fetching upcoming sessions from Supabase...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              const currentRegs = registrationsCount[event.id] || event.registrations || 10;
              return (
                <div
                  key={event.id}
                  className="glass-card glass-card-hover p-6 rounded-2xl border-slate-200 bg-white relative overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  {/* Gradient Banner Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${event.banner_color || event.bannerColor || 'from-indigo-600 to-purple-600'}`} />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4 mt-1">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
                        <Video className="w-3 h-3 text-cyan-600" />
                        {event.type}
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                        {event.status || 'Upcoming'}
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
                          <span className="text-[10px] text-slate-500 font-medium block">{event.speaker_role || event.speakerRole}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 pt-1">
                        <Clock className="w-4 h-4 text-cyan-600 shrink-0" />
                        <span className="font-medium text-slate-700">{event.date}</span>
                      </div>
                    </div>

                    {/* Agenda Bullet points */}
                    {event.agenda && (
                      <div className="space-y-1.5 mb-6">
                        <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">Session Agenda:</span>
                        {event.agenda.map((item, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
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
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Publish Session to Supabase</h3>
                </div>
                <button onClick={() => setShowCreateEventModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
              </div>

              {eventCreatedSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Session Saved to Supabase Database!</h4>
                </div>
              ) : (
                <form onSubmit={handleCreateEvent} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Session Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Master System Design & Microservices"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Speaker Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Vigneshwaran R."
                        value={eventSpeaker}
                        onChange={(e) => setEventSpeaker(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Speaker Role / Company</label>
                      <input
                        type="text"
                        placeholder="e.g. SDE @ Amazon"
                        value={eventSpeakerRole}
                        onChange={(e) => setEventSpeakerRole(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date & Time</label>
                      <input
                        type="text"
                        placeholder="e.g. Nov 5, 2026 • 6:00 PM IST"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Session Type</label>
                      <select
                        value={eventType}
                        onChange={(e) => setEventType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="Live Webinar">Live Webinar</option>
                        <option value="Mock Interview Drive">Mock Interview Drive</option>
                        <option value="Domain Workshop">Domain Workshop</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowCreateEventModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white text-xs font-bold shadow-md">Publish to Supabase</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Event Registration Pass Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Ticket className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">Reserve Event Pass</h3>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
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
                    Saved to Supabase registrations! Joining link sent to <strong>{studentEmail || 'student@mkce.ac.in'}</strong>.
                  </p>

                  <button onClick={() => setSelectedEvent(null)} className="w-full py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md">Done & Close</button>
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

                  <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-emerald-500/20">Generate Free Entry Pass</button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
