import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { studentApi } from '../../utils/api';

// ════════════════════════════════════════════════════════════════
//     Sowberry — Aptitude Tests (DB-driven)
// ════════════════════════════════════════════════════════════════

const CATEGORIES = ['All', 'Quantitative', 'Logical', 'Verbal', 'Technical', 'Data'];
const CAT_ICONS = { Quantitative: 'ri-calculator-line', Logical: 'ri-brain-line', Verbal: 'ri-book-open-line', Technical: 'ri-computer-line', Data: 'ri-pie-chart-line' };
const CAT_COLORS = { Quantitative: 'from-blue-500 to-indigo-500', Logical: 'from-violet-500 to-purple-500', Verbal: 'from-emerald-500 to-green-500', Technical: 'from-orange-500 to-red-500', Data: 'from-amber-500 to-yellow-500' };
const DIFF_CLR = { Easy: 'bg-green-500/10 text-green-400', Medium: 'bg-amber-500/10 text-amber-400', Hard: 'bg-red-500/10 text-red-400' };

// ════════════════════════════════════════════════════════════════
//                       MAIN COMPONENT
// ════════════════════════════════════════════════════════════════
const AptitudeTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTest, setActiveTest] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [category, setCategory] = useState('All');
  const [currentQ, setCurrentQ] = useState(0);
  const [showResult, setShowResult] = useState(null);
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await studentApi.getAptitudeTests();
        if (res.success) setTests(res.tests || []);
      } catch (e) { console.error('Fetch tests error:', e); }
      setLoading(false);
    };
    fetchTests();
  }, []);

  useEffect(() => {
    if (!activeTest || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(t => { if (t <= 1) { clearInterval(timer); handleAutoSubmit(); return 0; } return t - 1; }), 1000);
    return () => clearInterval(timer);
  }, [activeTest, timeLeft]);

  // ─── START TEST ────
  const startTest = async (testId) => {
    try {
      const res = await studentApi.startAptitudeTest(testId);
      if (res.success) {
        setActiveTest({ ...res.test, questions: res.questions || [] });
        setAttemptId(res.attemptId);
        setAnswers({}); setCurrentQ(0); setShowResult(null); setReviewData([]);
        setTimeLeft((res.test.duration || 30) * 60);
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
      }
    } catch (e) {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Failed to start test. Please try again.' });
    }
  };

  // ─── SUBMIT ────
  const handleAutoSubmit = () => submitTest(true);

  const submitTest = async (auto = false) => {
    if (!auto) {
      const confirm = await Swal.fire({ ...getSwalOpts(), title: 'Submit Test?', text: 'You cannot change answers after submission.', icon: 'question', showCancelButton: true, confirmButtonText: 'Submit', cancelButtonColor: '#333' });
      if (!confirm.isConfirmed) return;
    }

    setSubmitting(true);
    const qs = activeTest.questions || [];
    const answersArray = qs.map(q => ({ questionId: q.id, selectedOption: answers[q.id] || null }));

    try {
      const res = await studentApi.submitAptitudeTest(attemptId, { answers: answersArray.filter(a => a.selectedOption) });
      setSubmitting(false);

      if (res.success) {
        const total = res.totalMarks || qs.length;
        const score = res.score || 0;
        
        Swal.fire({ ...getSwalOpts(), 
          icon: score >= total * 0.7 ? 'success' : score >= total * 0.4 ? 'info' : 'warning', 
          title: auto ? "Time's Up!" : 'Test Submitted!', 
          text: `Score: ${score}/${total} (${Math.round(score / total * 100)}%)`,
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
            window.location.href = `/student/aptitude-tests/result/${attemptId}`;
        });
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
      }
    } catch (e) {
      setSubmitting(false);
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Failed to submit test.' });
    }
  };

  const goBack = () => { setActiveTest(null); setAttemptId(null); setShowResult(null); setReviewData([]); };

  const formatTime = (s) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const filteredTests = category === 'All' ? tests : tests.filter(t => t.category === category);

  // ════════════════════════════════════════════════════
  //               RESULT VIEW
  // ════════════════════════════════════════════════════


  // ════════════════════════════════════════════════════
  //               ACTIVE TEST VIEW
  // ════════════════════════════════════════════════════
  if (activeTest) {
    const questions = activeTest.questions || [];
    const q = questions[currentQ];
    return (
      <DashboardLayout pageTitle="Aptitude Test" role="student">
        <div className="space-y-4">
          {/* Header bar */}
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand dark-theme:border-gray-800 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-gray-800 dark-theme:text-gray-100 text-sm">{activeTest.title}</h2>
                <p className="text-[11px] text-gray-500 dark-theme:text-gray-400">{Object.keys(answers).length}/{questions.length} answered</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-lg font-mono font-bold ${timeLeft < 60 ? 'text-red-500 animate-pulse' : 'text-primary'}`}><i className="ri-time-line mr-1"></i>{formatTime(timeLeft)}</span>
                <button onClick={() => submitTest()} disabled={submitting} className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-50 transition-colors">{submitting ? 'Submitting...' : 'Submit'}</button>
              </div>
            </div>
            {/* Question navigation pills */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {questions.map((_, idx) => (
                <button key={idx} onClick={() => setCurrentQ(idx)} className={`w-7 h-7 rounded-lg text-[10px] font-bold transition-colors ${currentQ === idx ? 'bg-primary text-white' : answers[questions[idx].id] !== undefined ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-cream dark-theme:bg-gray-800 text-gray-500 dark-theme:text-gray-400 border border-sand dark-theme:border-gray-700'}`}>{idx + 1}</button>
              ))}
            </div>
          </div>

          {/* Current question */}
          {q && (
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
              <div className="flex items-start gap-3 mb-4">
                <span className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center text-sm font-bold text-primary flex-shrink-0">{currentQ + 1}</span>
                <p className="text-gray-800 dark-theme:text-gray-100 font-medium leading-relaxed">{q.question}</p>
              </div>
              <div className="grid grid-cols-1 gap-2.5 ml-11">
                {['A', 'B', 'C', 'D'].map(opt => (
                  <button key={opt} onClick={() => setAnswers({ ...answers, [q.id]: opt })} className={`p-4 rounded-xl text-sm text-left transition-all border ${answers[q.id] === opt ? 'border-primary bg-primary/10 text-primary font-medium' : 'border-sand dark-theme:border-gray-800 text-gray-500 dark-theme:text-gray-400 hover:border-gray-400 dark-theme:hover:border-gray-600 hover:text-gray-800 dark-theme:hover:text-gray-100'}`}>
                    <span className="font-bold mr-3 text-xs opacity-60">{opt}.</span>{q[`option${opt}`]}
                  </button>
                ))}
              </div>
              <p className="ml-11 mt-3 text-[10px] text-gray-400 dark-theme:text-gray-500">{q.marks || 1} mark{(q.marks || 1) > 1 ? 's' : ''}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentQ(c => Math.max(0, c - 1))} disabled={currentQ === 0} className="px-4 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-500 dark-theme:text-gray-400 text-xs font-medium hover:bg-cream-dark dark-theme:hover:bg-gray-700 disabled:opacity-30 transition-colors"><i className="ri-arrow-left-line mr-1"></i>Previous</button>
            <span className="text-xs text-gray-400 dark-theme:text-gray-500">{currentQ + 1} of {questions.length}</span>
            <button onClick={() => setCurrentQ(c => Math.min(questions.length - 1, c + 1))} disabled={currentQ >= questions.length - 1} className="px-4 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-500 dark-theme:text-gray-400 text-xs font-medium hover:bg-cream-dark dark-theme:hover:bg-gray-700 disabled:opacity-30 transition-colors">Next<i className="ri-arrow-right-line ml-1"></i></button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // ════════════════════════════════════════════════════
  //               TEST LISTING VIEW
  // ════════════════════════════════════════════════════
  return (
    <DashboardLayout pageTitle="Aptitude Tests" role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Aptitude Tests</h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">{tests.length} tests available across {CATEGORIES.length - 1} categories</p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-xl text-xs font-medium transition-colors ${category === c ? 'bg-primary text-white' : 'bg-cream dark-theme:bg-gray-800 text-gray-500 dark-theme:text-gray-500 border border-sand dark-theme:border-gray-700 hover:border-gray-400 dark-theme:hover:border-gray-600'}`}>
              {c !== 'All' && <i className={`${CAT_ICONS[c]} mr-1`}></i>}{c}
            </button>
          ))}
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Tests', value: tests.length, icon: 'ri-file-list-3-line', color: 'text-primary' },
            { label: 'Questions', value: tests.reduce((s, t) => s + (t.totalQuestions || 0), 0), icon: 'ri-question-line', color: 'text-blue-400' },
            { label: 'Attempted', value: tests.filter(t => t.myAttempts > 0).length, icon: 'ri-check-double-line', color: 'text-green-400' },
            { label: 'Categories', value: [...new Set(tests.map(t => t.category).filter(Boolean))].length || CATEGORIES.length - 1, icon: 'ri-folder-line', color: 'text-violet-400' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand dark-theme:border-gray-800 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-cream dark-theme:bg-gray-800 flex items-center justify-center ${s.color}`}><i className={`${s.icon} text-lg`}></i></div>
              <div><p className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{s.value}</p><p className="text-[10px] text-gray-500 dark-theme:text-gray-400">{s.label}</p></div>
            </div>
          ))}
        </div>

        {loading ? <Loader text="Loading aptitude tests..." /> :
        filteredTests.length === 0 ? <div className="text-center py-20 text-gray-400 dark-theme:text-gray-500"><i className="ri-question-answer-line text-4xl mb-3 block"></i><p>No tests in this category</p></div> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTests.map(t => {
            const bestPct = t.bestScore !== null && t.totalMarks ? Math.round((t.bestScore / t.totalMarks) * 100) : null;
            return (
              <div key={t.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                <div className={`h-1.5 bg-gradient-to-r ${CAT_COLORS[t.category] || 'from-gray-500 to-gray-600'}`}></div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${CAT_COLORS[t.category] || 'from-gray-500 to-gray-600'} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <i className={`${t.icon || CAT_ICONS[t.category] || 'ri-question-answer-line'} text-white text-lg`}></i>
                    </div>
                    <div className="flex items-center gap-2">
                      {t.difficulty && <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${DIFF_CLR[t.difficulty] || ''}`}>{t.difficulty}</span>}
                      {t.myAttempts > 0 && <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-blue-500/10 text-blue-400">{t.myAttempts} attempt{t.myAttempts > 1 ? 's' : ''}</span>}
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-sm mb-1">{t.title}</h3>
                  <p className="text-[11px] text-gray-500 dark-theme:text-gray-400 line-clamp-2 mb-3">{t.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 dark-theme:text-gray-500 mb-4">
                    <span><i className="ri-time-line mr-0.5"></i>{t.duration} min</span>
                    <span><i className="ri-file-list-line mr-0.5"></i>{t.totalQuestions} Q</span>
                    <span><i className="ri-medal-line mr-0.5"></i>{t.totalMarks} marks</span>
                  </div>
                  {bestPct !== null && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-[10px] mb-1">
                        <span className="text-gray-500 dark-theme:text-gray-400">Best Score</span>
                        <span className={bestPct >= 70 ? 'text-green-400' : 'text-amber-400'}>{bestPct}%</span>
                      </div>
                      <div className="h-1.5 bg-cream dark-theme:bg-gray-800 rounded-full"><div className={`h-full rounded-full ${bestPct >= 70 ? 'bg-green-500' : 'bg-amber-500'}`} style={{ width: `${bestPct}%` }}></div></div>
                    </div>
                  )}
                  <button onClick={() => startTest(t.id)} className="w-full py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors">
                    <i className="ri-play-line mr-1"></i>{t.myAttempts > 0 ? 'Retake' : 'Start Test'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>}
      </div>
    </DashboardLayout>
  );
};

export default AptitudeTests;
