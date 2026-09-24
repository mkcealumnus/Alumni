import React, { useState } from 'react';
import { STUDENT_QUERIES } from '../data/mockData';
import { MessageSquare, Send, ThumbsUp, CheckCircle2, User, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';

export default function MentorshipPortal() {
  const [queries, setQueries] = useState(STUDENT_QUERIES);
  const [newQuestion, setNewQuestion] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentYear, setStudentYear] = useState('3rd Year CSE');
  const [category, setCategory] = useState('Career Transition');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const queryObj = {
      id: Date.now(),
      studentName: studentName || 'MKCE Student',
      studentYear: studentYear,
      question: newQuestion,
      category: category,
      likes: 0,
      status: 'Pending',
      answer: null
    };

    setQueries([queryObj, ...queries]);
    setNewQuestion('');
    setSubmittedMessage(true);
    setTimeout(() => setSubmittedMessage(false), 4000);
  };

  const handleLike = (id) => {
    setQueries(queries.map(q => q.id === id ? { ...q, likes: q.likes + 1 } : q));
  };

  return (
    <section id="mentorship" className="py-20 bg-[#0B0F19] relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
            <MessageSquare className="w-3.5 h-3.5" /> Alumni Ask & Mentorship Portal
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ask Questions, Get <span className="gradient-text">Verified Alumni Advice</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Submit your career doubts, resume queries, or interview concerns directly to alumni mentors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Ask Question Form */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border-indigo-500/20 sticky top-28">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Submit a Career Query</h3>
              </div>

              {submittedMessage && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Question submitted! Alumni mentors will answer shortly.</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name / Alias</label>
                  <input
                    type="text"
                    placeholder="e.g. Aravind M. (or leave blank for Anonymous)"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Year & Branch</label>
                    <select
                      value={studentYear}
                      onChange={(e) => setStudentYear(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="1st Year">1st Year</option>
                      <option value="2nd Year">2nd Year</option>
                      <option value="3rd Year CSE">3rd Year CSE/IT</option>
                      <option value="3rd Year ECE">3rd Year ECE/EEE</option>
                      <option value="4th Year">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Topic Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Career Transition">Career Transition</option>
                      <option value="Placement Strategy">Placement Strategy</option>
                      <option value="Core & Higher Studies">Core & Higher Studies</option>
                      <option value="Resume Review">Resume Review</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Question</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your career confusion or technical goal..."
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Question to Alumni Portal</span>
                </button>
              </form>
            </div>
          </div>

          {/* Q&A Thread Stream */}
          <div className="lg:col-span-7 space-y-6">
            {queries.map((q) => (
              <div key={q.id} className="glass-card p-6 rounded-2xl border-slate-800 space-y-4">
                
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-white">{q.studentName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{q.studentYear}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">{q.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-slate-100">{q.question}</h4>
                  </div>
                  
                  <button
                    onClick={() => handleLike(q.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/40 text-xs font-medium transition-all"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{q.likes}</span>
                  </button>
                </div>

                {/* Answer Section */}
                {q.answer ? (
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-emerald-400">{q.answer.alumniName}</span>
                          <span className="text-[10px] text-slate-400 block">{q.answer.alumniRole}</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-medium">Verified Alumni</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed pt-1">{q.answer.text}</p>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center justify-between">
                    <span>Awaiting alumni review...</span>
                    <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded font-semibold">In Queue</span>
                  </div>
                )}

              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
