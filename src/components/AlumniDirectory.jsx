import React, { useState } from 'react';
import { Users, Briefcase, MapPin, Star, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function AlumniDirectory() {
  const [mentors, setMentors] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const branches = ['All', 'CSE', 'ECE', 'IT', 'EEE', 'AI & DS'];

  const filteredMentors = mentors.filter(m => {
    const mentorBranch = m.branch || 'CSE';
    return selectedBranch === 'All' || mentorBranch === selectedBranch;
  });

  return (
    <section id="alumni-network" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold mb-3">
              <Users className="w-3.5 h-3.5" /> Alumni Directory
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Connect With <span className="gradient-text">Verified MKCE Alumni</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Engineers, researchers, and product leaders working in tier-1 tech companies ready to guide you.
            </p>
          </div>

          {/* Branch Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {branches.map(b => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedBranch === b
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-indigo-600'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Cards Grid / Empty state */}
        {filteredMentors.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Alumni Mentors Found</h3>
            <p className="text-xs text-slate-500">
              No alumni mentors match your current branch filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredMentors.map((mentor) => {
              const name = mentor.full_name || mentor.name || 'MKCE Alumni';
              const role = mentor.designation || mentor.role || 'Software Engineer';
              const company = mentor.company_or_college || mentor.company || 'Tech Leader';
              const avatar = mentor.avatar_url || mentor.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              const batch = mentor.graduation_year ? `Batch of ${mentor.graduation_year}` : mentor.batch || 'MKCE Alumni';

              return (
                <div
                  key={mentor.id}
                  className="glass-card glass-card-hover p-6 rounded-2xl border-slate-200 bg-white flex flex-col justify-between shadow-sm relative group"
                >
                  <div>
                    {/* Header Avatar & Verified Badge */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="relative">
                        <img
                          src={avatar}
                          alt={name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-100 shadow-sm"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white" title="Verified Alumni">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{mentor.rating || 5.0}</span>
                      </div>
                    </div>

                    {/* Mentor Info */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {name}
                    </h3>
                    
                    <p className="text-xs font-semibold text-indigo-600 mb-1 flex items-center gap-1">
                      <Briefcase className="w-3 h-3 text-indigo-500" />
                      <span>{role}</span>
                    </p>

                    <div className="inline-block px-2.5 py-0.5 rounded bg-slate-900 text-white font-extrabold text-[11px] mb-3">
                      {company}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-slate-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {mentor.location || 'India'}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-slate-700">{batch}</span>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {(mentor.skills || ['Mentorship', 'Career Guide']).map((skill, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-slate-500">
                      <strong className="text-slate-900">{mentor.queries_answered || mentor.queriesAnswered || 20}</strong> queries solved
                    </span>

                    <button
                      onClick={() => { setSelectedMentor(mentor); setRequestSubmitted(false); }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold transition-all shadow-sm flex items-center gap-1"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Connect</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* 1-on-1 Connect Modal */}
        {selectedMentor && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <img src={selectedMentor.avatar_url || selectedMentor.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{selectedMentor.full_name || selectedMentor.name}</h4>
                    <p className="text-xs text-indigo-600 font-semibold">{selectedMentor.designation || selectedMentor.role} @ {selectedMentor.company_or_college || selectedMentor.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {requestSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Request Submitted Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    {selectedMentor.full_name || selectedMentor.name} will receive your request and session invite shortly.
                  </p>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRequestSubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Engineering Year & Department</label>
                    <input
                      type="text"
                      placeholder="e.g. 3rd Year CSE - Section B"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mentorship Goal / Key Question</label>
                    <textarea
                      rows={3}
                      placeholder={`What advice would you like from ${selectedMentor.full_name || selectedMentor.name}? (e.g. Resume audit, Amazon interview prep, Verilog RTL project guidance)...`}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
                  >
                    Request 1-on-1 Session
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
