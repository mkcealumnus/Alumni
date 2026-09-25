import React, { useState } from 'react';
import { Users, Briefcase, MapPin, Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import { INITIAL_ALUMNI } from '../data/initialData';

export default function AlumniDirectory({ initialMentors }) {
  const mentors = initialMentors && initialMentors.length > 0 ? initialMentors : INITIAL_ALUMNI;
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const branches = ['All', 'CSE', 'ECE', 'IT', 'EEE', 'AI & DS'];

  const filteredMentors = mentors.filter(m => {
    const mentorBranch = m.branch || 'CSE';
    return selectedBranch === 'All' || mentorBranch === selectedBranch;
  });

  return (
    <section id="alumni-network" className="py-16 sm:py-20 3xl:py-24 bg-[#fcfcfc] relative border-b border-slate-200/80">
      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="label-mono text-xs text-orange-600 font-bold mb-1">Institutional Mentorship Directory</p>
            <h2 className="text-3xl sm:text-5xl 3xl:text-6xl font-normal text-slate-900 font-sans tracking-tight">
              Connect With <span className="font-serif italic text-orange-600">Verified MKCE Alumni</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Engineers, researchers, and product leaders in top tech companies ready to guide your career.
            </p>
          </div>

          {/* Branch Filter Tabs - Scrollable on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {branches.map(b => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer shrink-0 ${
                  selectedBranch === b
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20 border border-orange-500/30'
                    : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-orange-300 shadow-2xs'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Cards Grid */}
        {filteredMentors.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto border border-orange-200">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Alumni Mentors Found</h3>
            <p className="text-xs text-slate-500">
              No alumni mentors match your current branch filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-6">
            {filteredMentors.map((mentor) => {
              const name = mentor.full_name || mentor.name || 'MKCE Alumni';
              const role = mentor.designation || mentor.role || 'Software Engineer';
              const company = mentor.company_or_college || mentor.company || 'Tech Leader';
              const avatar = mentor.avatar_url || mentor.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
              const batch = mentor.graduation_year ? `Batch of ${mentor.graduation_year}` : mentor.batch || 'MKCE Alumni';

              return (
                <div
                  key={mentor.id}
                  className="glass-card glass-card-hover p-6 rounded-3xl border-slate-200/90 bg-white flex flex-col justify-between shadow-sm relative group"
                >
                  <div>
                    {/* Header Avatar & Rating */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="relative">
                        <img
                          src={avatar}
                          alt={name}
                          className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-100 shadow-xs"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow-xs" title="Verified Alumni">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-700 text-xs font-mono font-bold bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{mentor.rating || 5.0}</span>
                      </div>
                    </div>

                    {/* Mentor Info */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {name}
                    </h3>
                    
                    <p className="text-xs font-semibold text-orange-600 mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-orange-600" />
                      <span>{role}</span>
                    </p>

                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-[11px] font-extrabold mb-3">
                      {company}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 mb-4">
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
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-500">
                      <strong className="text-slate-900">{mentor.queries_answered || mentor.queriesAnswered || 20}</strong> queries solved
                    </span>

                    <button
                      onClick={() => { setSelectedMentor(mentor); setRequestSubmitted(false); }}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
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
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 relative animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <img src={selectedMentor.avatar_url || selectedMentor.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-200" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{selectedMentor.full_name || selectedMentor.name}</h4>
                    <p className="text-xs text-orange-600 font-mono font-semibold">{selectedMentor.designation || selectedMentor.role} @ {selectedMentor.company_or_college || selectedMentor.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {requestSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Mentorship Request Submitted!</h4>
                  <p className="text-xs text-slate-600 max-w-xs mx-auto">
                    {selectedMentor.full_name || selectedMentor.name} will review your request and reach out via email.
                  </p>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="px-6 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md cursor-pointer"
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
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Your Engineering Year & Branch</label>
                    <input
                      type="text"
                      placeholder="e.g. 3rd Year CSE - Section B"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Mentorship Goal / Key Question</label>
                    <textarea
                      rows={3}
                      placeholder={`What advice would you like from ${selectedMentor.full_name || selectedMentor.name}? (e.g. Resume audit, Amazon interview prep, Verilog RTL guidance)...`}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold shadow-md shadow-orange-500/20 cursor-pointer"
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
