import React, { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { MessageSquare, Send, ThumbsUp, CheckCircle2, HelpCircle, Plus, Search } from 'lucide-react';

export default function MentorshipPortal() {
  const [queries, setQueries] = useState([]);
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

  useEffect(() => {
    async function loadData() {
      const data = await dbService.getStudentQueries();
      setQueries(data);
    }
    loadData();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const newObj = await dbService.submitQuery({
      name: studentName,
      year: studentYear,
      question: newQuestion,
      category: category
    });

    setQueries([newObj, ...queries]);
    setNewQuestion('');
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowSubmitModal(false);
    }, 2000);
  };

  const handleLike = async (id) => {
    setQueries(queries.map(q => q.id === id ? { ...q, likes: (q.likes || q.likes_count || 0) + 1 } : q));
    await dbService.upvoteQuery(id);
  };

  return (
    <section id="mentorship" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200 text-xs font-semibold mb-3">
              <MessageSquare className="w-3.5 h-3.5" /> Supabase Live Alumni Ask Portal
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Ask Questions, Get <span className="gradient-text">Verified Alumni Advice</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Submit your career doubts, resume queries, or interview concerns directly to alumni mentors.
            </p>
          </div>

          {/* Ask Question Trigger Button */}
          <button
            onClick={() => setShowSubmitModal(true)}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Ask Alumni A Question</span>
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Status Filter */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search questions or alumni..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Answered">Answered Only</option>
              <option value="Pending">Pending Only</option>
            </select>
          </div>
        </div>

        {/* Q&A Thread Stream Grid */}
        <div className="space-y-6 max-w-4xl mx-auto">
          {filteredQueries.map((q) => (
            <div key={q.id} className="glass-card p-6 rounded-2xl border-slate-200 bg-white space-y-4 shadow-sm">
              
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-900">{q.studentName || q.student_name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">{q.studentYear || q.student_year}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-medium">{q.category}</span>
                    <span className="text-[10px] text-slate-400">{q.date || 'Recent'}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">{q.question}</h4>
                </div>
                
                <button
                  onClick={() => handleLike(q.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 text-xs font-semibold transition-all shrink-0"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{q.likes || q.likes_count || 0}</span>
                </button>
              </div>

              {/* Answer Section */}
              {q.answer ? (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{q.answer.alumniName}</span>
                          {q.answer.company && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-900 text-white font-extrabold text-[9px]">
                              {q.answer.company}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 block font-medium">{q.answer.alumniRole}</span>
                      </div>
                    </div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">Verified Alumni Answer</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed pt-1 font-normal">{q.answer.text}</p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between font-medium">
                  <span>Awaiting alumni review...</span>
                  <span className="text-[10px] bg-amber-100 px-2.5 py-0.5 rounded font-bold text-amber-900">In Queue</span>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Question Submission Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Ask Question to Supabase Database</h3>
                </div>
                <button
                  onClick={() => setShowSubmitModal(false)}
                  className="text-slate-400 hover:text-slate-700 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              {submittedMessage ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Saved directly to Supabase Database!</h4>
                  <p className="text-xs text-slate-600">Alumni mentors will be notified and respond shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Name / Alias</label>
                    <input
                      type="text"
                      placeholder="e.g. Aravind M. (or leave blank for Anonymous)"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Year & Branch</label>
                      <select
                        value={studentYear}
                        onChange={(e) => setStudentYear(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600"
                      >
                        <option value="1st Year">1st Year</option>
                        <option value="2nd Year">2nd Year</option>
                        <option value="3rd Year CSE">3rd Year CSE/IT</option>
                        <option value="3rd Year ECE">3rd Year ECE/EEE</option>
                        <option value="4th Year">4th Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600"
                      >
                        <option value="Career Transition">Career Transition</option>
                        <option value="Placement Strategy">Placement Strategy</option>
                        <option value="Core & Higher Studies">Core & Higher Studies</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Your Question Details</label>
                    <textarea
                      rows={4}
                      placeholder="Describe your career dilemma, resume doubt, or interview technical question..."
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowSubmitModal(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md"
                    >
                      Post Question to Supabase
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
