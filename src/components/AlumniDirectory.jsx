import React, { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { Users, Briefcase, MapPin, Star, MessageSquare, CheckCircle2, UserPlus, Loader2 } from 'lucide-react';

const DEFAULT_ALUMNI = [
  {
    id: 1,
    full_name: 'Karthik Raja',
    name: 'Karthik Raja',
    batch: 'Batch of 2023',
    graduation_year: 2023,
    role: 'Software Development Engineer II',
    designation: 'Software Development Engineer II',
    company: 'Amazon',
    company_or_college: 'Amazon',
    branch: 'CSE',
    location: 'Bengaluru, India',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    skills: ['Data Structures', 'System Design', 'Java', 'AWS'],
    queries_answered: 48,
    queriesAnswered: 48,
    rating: 4.9
  },
  {
    id: 2,
    full_name: 'Priya Dharshini',
    name: 'Priya Dharshini',
    batch: 'Batch of 2022',
    graduation_year: 2022,
    role: 'Hardware Design Engineer',
    designation: 'Hardware Design Engineer',
    company: 'Qualcomm',
    company_or_college: 'Qualcomm',
    branch: 'ECE',
    location: 'Hyderabad, India',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    skills: ['Verilog HDL', 'VLSI', 'Digital Design', 'STA'],
    queries_answered: 35,
    queriesAnswered: 35,
    rating: 5.0
  },
  {
    id: 3,
    full_name: 'Vigneshwaran R.',
    name: 'Vigneshwaran R.',
    batch: 'Batch of 2021',
    graduation_year: 2021,
    role: 'Senior Software Engineer',
    designation: 'Senior Software Engineer',
    company: 'Freshworks',
    company_or_college: 'Freshworks',
    branch: 'IT',
    location: 'Chennai, India',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skills: ['React.js', 'Node.js', 'System Architecture', 'PostgreSQL'],
    queries_answered: 62,
    queriesAnswered: 62,
    rating: 4.9
  },
  {
    id: 4,
    full_name: 'Anand Kumar',
    name: 'Anand Kumar',
    batch: 'Batch of 2020',
    graduation_year: 2020,
    role: 'Analog & Mixed Signal Engineer',
    designation: 'Analog & Mixed Signal Engineer',
    company: 'Texas Instruments',
    company_or_college: 'Texas Instruments',
    branch: 'EEE',
    location: 'Bengaluru, India',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    skills: ['Circuit Design', 'Microcontrollers', 'Embedded C', 'GATE ECE'],
    queries_answered: 29,
    queriesAnswered: 29,
    rating: 4.8
  }
];

export default function AlumniDirectory() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  useEffect(() => {
    async function loadMentors() {
      setLoading(true);
      const data = await dbService.getAlumniMentors();
      if (data && data.length > 0) {
        setMentors(data);
      } else {
        setMentors(DEFAULT_ALUMNI);
      }
      setLoading(false);
    }
    loadMentors();
  }, []);

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
              <Users className="w-3.5 h-3.5" /> Supabase Alumni Directory
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

        {/* Mentors Cards Grid / Loader */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500 text-xs font-semibold">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span>Loading alumni mentors from Supabase database...</span>
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
                  <h4 className="text-base font-bold text-slate-900">Request Logged in Supabase!</h4>
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
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setRequestSubmitted(true);
                    await dbService.submitMentorshipRequest(selectedMentor.id, '3rd Year CSE', 'Resume Audit');
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
                    Request 1-on-1 Session via Supabase
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
