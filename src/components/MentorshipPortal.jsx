import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, CheckCircle2, HelpCircle, Plus, Search } from 'lucide-react';
import { INITIAL_QUERIES } from '../data/initialData';

export default function MentorshipPortal({ initialQueries, currentRole }) {
  const [queries, setQueries] = useState(initialQueries && initialQueries.length > 0 ? initialQueries : INITIAL_QUERIES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Modal state
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentYear, setStudentYear] = useState('3rd Year CSE');
  const [category, setCategory] = useState('Career Transition');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const categories = ['All', 'Career Transition', 'Placement Strategy', 'Core & Higher Studies'];

  const filteredQueries = queries.filter(q => {
    const questionText = q.question || '';
    const nameText = q.studentName || q.student_name || '';
    const alumniNameText = (q.answer && q.answer.alumniName) || '';
    
    const matchesSearch = questionText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          nameText.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          alumniNameText.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesStatus = statusFilter === 'All' || q.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newObj = {
      id: Date.now(),
      studentName: studentName || 'MKCE Student',
      studentYear: studentYear || '3rd Year CSE',
      question: newQuestion,
      category: category || 'Career Transition',
      likes_count: 0,
      status: 'Pending',
      date: 'Just now'
    };

    setQueries(prev => [newObj, ...prev]);
    setNewQuestion('');
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowSubmitModal(false);
    }, 1800);
  };

  const handleLike = (id) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, likes_count: (q.likes_count || q.likes || 0) + 1 } : q));
  };

  return (
    <section id="mentorship" className="py-20 bg-[#09090b] relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-mono text-xs text-orange-400 font-bold mb-1">Live Mentorship Forum</p>
            <h2 className="text-3xl sm:text-5xl font-normal text-white font-sans tracking-tight">
              Ask Questions, Get <span className="font-serif italic text-orange-500">Verified Alumni Advice</span>
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Submit your career doubts, resume queries, or technical interview concerns directly to alumni mentors.
            </p>
          </div>

          {/* Ask Question Trigger Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-lg shadow-orange-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ask Alumni A Question</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#121318] p-4 rounded-3xl border border-white/10 shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 border border-orange-400/30'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions or alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-full bg-zinc-900 border border-white/10 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 font-mono"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-full bg-zinc-900 border border-white/10 text-xs font-mono font-semibold text-zinc-300 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Answered">Answered Only</option>
              <option value="Pending">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Q&A Thread Stream Grid */}
        {filteredQueries.length === 0 ? (
          <div className="py-16 text-center bg-[#121318] rounded-3xl border border-white/10 p-8 max-w-md mx-auto space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto border border-orange-500/20">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">No Questions Found</h3>
            <p className="text-xs text-zinc-400">
              No questions posted yet. Click 'Ask Alumni A Question' to start a discussion.
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredQueries.map((q) => (
              <div key={q.id} className="glass-card p-6 sm:p-7 rounded-3xl border-white/10 bg-[#121318] space-y-5 shadow-xl">
                
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{q.studentName || q.student_name}</span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-400 border border-white/5">{q.studentYear || q.student_year}</span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">{q.category}</span>
                      <span className="text-[10px] font-mono text-zinc-500">{q.date || 'Recent'}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug">{q.question}</h4>
                  </div>
                  
                  <button
                    onClick={() => handleLike(q.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 hover:text-orange-400 hover:border-orange-500/40 text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-orange-400" />
                    <span>{q.likes || q.likes_count || 0}</span>
                  </button>
                </div>

                {/* Answer Section */}
                {q.answer ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-white">{q.answer.alumniName}</span>
                            {q.answer.company && (
                              <span className="px-2 py-0.5 rounded-md bg-zinc-900 text-orange-400 font-mono font-extrabold text-[9px] border border-white/5">
                                {q.answer.company}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-400 block">{q.answer.alumniRole}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">Verified Alumni Answer</span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed pt-1 font-normal">{q.answer.text}</p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-center justify-between font-mono font-medium">
                    <span>Awaiting alumni response...</span>
                    <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold text-amber-300">In Queue</span>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

        {/* Question Submission Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#121318] rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-white/10 space-y-4 animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-400" />
                  <h3 className="text-base font-bold text-white">Ask Alumni A Question</h3>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="text-zinc-500 hover:text-white font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {submittedMessage ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Question Posted Successfully!</h4>
                  <p className="text-xs text-zinc-400">Alumni mentors will review and post a response shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 mb-1">Your Name / Alias</label>
                    <input
                      type="text"
                      placeholder="e.g. Aravind M. (or leave blank for Anonymous)"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-orange-500/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 mb-1">Year & Branch</label>
                      <select
                        value={studentYear}
                        onChange={(e) => setStudentYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-orange-500/50 font-mono"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year CSE">3rd Year CSE/IT</option>
                        <option value="3rd Year ECE">3rd Year ECE/EEE</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-zinc-300 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-orange-500/50 font-mono"
                      >
                        <option value="Career Transition">Career Transition</option>
                        <option value="Placement Strategy">Placement Strategy</option>
                        <option value="Core & Higher Studies">Core & Higher Studies</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-zinc-300 mb-1">Question Details</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your career dilemma, resume doubt, or interview question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 text-xs focus:outline-none focus:border-orange-500/50"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-orange-500 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Post Question
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
