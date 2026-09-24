import React, { useState } from 'react';
import { 
  UserCheck, MessageSquare, BookOpen, Calendar, Send, 
  CheckCircle2, Plus, Sparkles, Award, FileText, Upload
} from 'lucide-react';
import { STUDENT_QUERIES, RESOURCES } from '../../data/mockData';

export default function AlumniManagementTab({ currentUser }) {
  const [queries, setQueries] = useState(STUDENT_QUERIES);
  const [answeringId, setAnsweringId] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  // New Resource Form
  const [showResourceModal, setShowResourceModal] = useState(false);
  const [resTitle, setResTitle] = useState('');
  const [resCategory, setResCategory] = useState('Interview Prep');

  const handlePostAnswer = (queryId) => {
    if (!answerText.trim()) return;

    setQueries(queries.map(q => {
      if (q.id === queryId) {
        return {
          ...q,
          status: 'Answered',
          answer: {
            alumniName: currentUser?.name || 'Vigneshwaran R.',
            alumniRole: `${currentUser?.designation || 'Senior SDE'} @ ${currentUser?.company || 'Freshworks'}`,
            text: answerText
          }
        };
      }
      return q;
    }));

    setAnsweringId(null);
    setAnswerText('');
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 4000);
  };

  const handleAddResource = (e) => {
    e.preventDefault();
    if (!resTitle.trim()) return;
    alert(`Resource "${resTitle}" submitted for Admin verification! Thank you for contributing to MKCE juniors.`);
    setShowResourceModal(false);
    setResTitle('');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-2">
            <UserCheck className="w-3.5 h-3.5 text-purple-300" /> Verified Alumni Mentor Portal
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Welcome, {currentUser?.name || 'Alumni Mentor'}</h2>
          <p className="text-purple-100 text-xs sm:text-sm mt-1 max-w-xl">
            Empower MKCE engineering juniors by providing career insights, verifying resume templates, and answering student doubts.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowResourceModal(true)}
            className="px-5 py-2.5 rounded-xl bg-white text-purple-700 font-bold text-xs hover:bg-purple-50 transition-all shadow-md flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-purple-600" />
            <span>Share Resource / Template</span>
          </button>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">48 Queries</span>
            <span className="text-xs text-slate-500 font-medium">Answered by You</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">12 Guides</span>
            <span className="text-xs text-slate-500 font-medium">Published on Resource Hub</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">4.9 / 5.0</span>
            <span className="text-xs text-slate-500 font-medium">Student Mentorship Rating</span>
          </div>
        </div>
      </div>

      {/* Pending Student Doubts Queue */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-purple-600" />
            <span>Student Doubts Queue ({queries.filter(q => q.status === 'Pending').length} Pending)</span>
          </h3>
          {successMessage && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ Answer published successfully!
            </span>
          )}
        </div>

        <div className="space-y-4">
          {queries.map((q) => (
            <div key={q.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-slate-900">{q.studentName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600">{q.studentYear}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold">{q.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800">{q.question}</h4>
                </div>

                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  q.status === 'Answered' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {q.status}
                </span>
              </div>

              {q.answer ? (
                <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1 text-xs">
                  <div className="font-bold text-slate-900">{q.answer.alumniName} ({q.answer.alumniRole})</div>
                  <p className="text-slate-700 leading-relaxed">{q.answer.text}</p>
                </div>
              ) : (
                <div>
                  {answeringId === q.id ? (
                    <div className="space-y-3 pt-2">
                      <textarea
                        rows={3}
                        placeholder="Write your mentorship response to help this student..."
                        value={answerText}
                        onChange={(e) => setAnswerText(e.target.value)}
                        className="w-full p-3 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handlePostAnswer(q.id)}
                          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Publish Verified Answer</span>
                        </button>
                        <button
                          onClick={() => setAnsweringId(null)}
                          className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold hover:bg-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setAnsweringId(q.id);
                        setAnswerText('');
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Answer This Query</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Share Resource Modal */}
      {showResourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Publish Study Resource / Template</h3>
            <form onSubmit={handleAddResource} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SDE System Design Notes 2026"
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={resCategory}
                  onChange={(e) => setResCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none"
                >
                  <option value="Interview Prep">Interview Prep</option>
                  <option value="Resume">ATS Resume Template</option>
                  <option value="Core Eng">Core Engineering</option>
                  <option value="Database">Database & SQL</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowResourceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                >
                  Submit for Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
