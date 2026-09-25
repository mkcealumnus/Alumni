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
    <section id="mentorship" className="py-20 bg-[#fcfcfc] relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-mono text-xs text-orange-600 font-bold mb-1">Live Mentorship Forum</p>
            <h2 className="text-3xl sm:text-5xl font-normal text-slate-900 font-sans tracking-tight">
              Ask Questions, Get <span className="font-serif italic text-orange-600">Verified Alumni Advice</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Submit your career doubts, resume queries, or technical interview concerns directly to alumni mentors.
            </p>
          </div>

          {/* Ask Question Trigger Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Ask Alumni A Question</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20 border border-orange-500/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions or alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-full bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600 font-mono"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-full bg-slate-50 border border-slate-300 text-xs font-mono font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Answered">Answered Only</option>
              <option value="Pending">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Q&A Thread Stream Grid */}
        {filteredQueries.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto border border-orange-200">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Questions Found</h3>
            <p className="text-xs text-slate-500">
              No questions posted yet. Click 'Ask Alumni A Question' to start a discussion.
            </p>
          </div>
        ) : (
          <div className="space-y-6 max-w-4xl mx-auto">
            {filteredQueries.map((q) => (
              <div key={q.id} className="glass-card glass-card-hover p-6 sm:p-7 rounded-3xl border-slate-200/90 bg-white space-y-5 shadow-sm">
                
                {/* Question Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">{q.studentName || q.student_name}</span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-medium">{q.studentYear || q.student_year}</span>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 font-semibold">{q.category}</span>
                      <span className="text-[10px] font-mono text-slate-400">{q.date || 'Recent'}</span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{q.question}</h4>
                  </div>
                  
                  <button
                    onClick={() => handleLike(q.id)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300 text-xs font-mono font-semibold transition-all shrink-0 cursor-pointer"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-orange-600" />
                    <span>{q.likes || q.likes_count || 0}</span>
                  </button>
                </div>

                {/* Answer Section */}
                {q.answer ? (
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200/90 space-y-2.5">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{q.answer.alumniName}</span>
                            {q.answer.company && (
                              <span className="px-2 py-0.5 rounded-md bg-slate-900 text-white font-mono font-extrabold text-[9px]">
                                {q.answer.company}
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-emerald-700 font-semibold block">{q.answer.alumniRole}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">Verified Alumni Answer</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed pt-1 font-normal">{q.answer.text}</p>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between font-mono font-medium">
                    <span>Awaiting alumni response...</span>
                    <span className="text-[10px] bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold text-amber-900">In Queue</span>
                  </div>
                )}

              </div>
            ))}
          </div>
        )}

        {/* Question Submission Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-base font-bold text-slate-900">Ask Alumni A Question</h3>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {submittedMessage ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Question Posted Successfully!</h4>
                  <p className="text-xs text-slate-600">Alumni mentors will review and post a response shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Your Name / Alias</label>
                    <input
                      type="text"
                      placeholder="e.g. Aravind M. (or leave blank for Anonymous)"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Year & Branch</label>
                      <select
                        value={studentYear}
                        onChange={(e) => setStudentYear(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-orange-600 font-mono"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year CSE">3rd Year CSE/IT</option>
                        <option value="3rd Year ECE">3rd Year ECE/EEE</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-orange-600 font-mono"
                      >
                        <option value="Career Transition">Career Transition</option>
                        <option value="Placement Strategy">Placement Strategy</option>
                        <option value="Core & Higher Studies">Core & Higher Studies</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Question Details</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your career dilemma, resume doubt, or interview question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md cursor-pointer"
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
