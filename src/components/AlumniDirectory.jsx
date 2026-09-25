import React, { useState } from 'react';
import { Users, Briefcase, MapPin, Star, MessageSquare, CheckCircle2, Search } from 'lucide-react';
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
    <section id="alumni-network" className="py-20 bg-[#09090b] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="label-mono text-xs text-orange-400 font-bold mb-1">Institutional Mentorship Directory</p>
            <h2 className="text-3xl sm:text-5xl font-normal text-white font-sans tracking-tight">
              Connect With <span className="font-serif italic text-orange-500">Verified MKCE Alumni</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Engineers, researchers, and product leaders in top tech companies ready to guide your career.
            </p>
          </div>

          {/* Branch Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {branches.map(b => (
              <button
                key={b}
                onClick={() => setSelectedBranch(b)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedBranch === b
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 border border-orange-400/30'
                    : 'bg-[#121318] border border-white/10 text-zinc-400 hover:text-white hover:border-orange-500/30'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        {/* Mentors Cards Grid */}
        {filteredMentors.length === 0 ? (
          <div className="py-16 text-center bg-[#121318] rounded-3xl border border-white/10 p-8 max-w-md mx-auto space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No Alumni Mentors Found</h3>
            <p className="text-xs text-zinc-400">
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
                  className="glass-card glass-card-hover p-6 rounded-3xl border-white/10 bg-[#121318] flex flex-col justify-between shadow-xl relative group"
                >
                  <div>
                    {/* Header Avatar & Rating */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="relative">
                        <img
                          src={avatar}
                          alt={name}
                          className="w-14 h-14 rounded-2xl object-cover border border-white/10 shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-white shadow" title="Verified Alumni">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{mentor.rating || 5.0}</span>
                      </div>
                    </div>

                    {/* Mentor Info */}
                    <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                      {name}
                    </h3>
                    
                    <p className="text-xs font-medium text-orange-400 mb-1 flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-orange-400" />
                      <span>{role}</span>
                    </p>

                    <div className="inline-block px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/10 text-zinc-200 font-mono text-[11px] font-bold mb-3">
                      {company}
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-zinc-500" />
                        {mentor.location || 'India'}
                      </span>
                      <span>•</span>
                      <span className="font-medium text-zinc-300">{batch}</span>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-1 mb-6">
                      {(mentor.skills || ['Mentorship', 'Career Guide']).map((skill, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-300 border border-white/5">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400">
                      <strong className="text-white">{mentor.queries_answered || mentor.queriesAnswered || 20}</strong> queries solved
                    </span>

                    <button
                      onClick={() => { setSelectedMentor(mentor); setRequestSubmitted(false); }}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold transition-all shadow-md shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
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
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#121318] rounded-3xl max-w-md w-full p-6 shadow-2xl border border-white/10 space-y-4 relative animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <img src={selectedMentor.avatar_url || selectedMentor.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/10" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{selectedMentor.full_name || selectedMentor.name}</h4>
                    <p className="text-xs text-orange-400 font-mono font-medium">{selectedMentor.designation || selectedMentor.role} @ {selectedMentor.company_or_college || selectedMentor.company}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMentor(null)}
                  className="text-zinc-500 hover:text-white text-sm font-bold p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {requestSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Mentorship Request Submitted!</h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    {selectedMentor.full_name || selectedMentor.name} will review your query and reach out via email.
                  </p>
                  <button
                    onClick={() => setSelectedMentor(null)}
                    className="px-6 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold shadow-md cursor-pointer"
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
                    <label className="block text-xs font-mono font-semibold text-zinc-300 mb-1">Your Engineering Year & Branch</label>
                    <input
                      type="text"
                      placeholder="e.g. 3rd Year CSE - Section B"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 mb-1">Mentorship Goal / Key Question</label>
                    <textarea
                      rows={3}
                      placeholder={`What specific guidance would you like from ${selectedMentor.full_name || selectedMentor.name}? (e.g. Resume audit, Amazon interview prep, Verilog RTL guidance)...`}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold shadow-lg shadow-orange-500/20 cursor-pointer"
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
