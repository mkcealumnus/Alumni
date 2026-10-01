
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi } from '../../utils/api';


const AptitudeResult = () => {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await studentApi.getAptitudeResult(attemptId);
        if (res.success) {
          setData(res.data);
        } else {
          setError(res.message);
        }
      } catch (err) {
        setError('Failed to load results.');
      }
      setLoading(false);
    };
    fetchResult();
  }, [attemptId]);

  if (loading) {
    return (
      <DashboardLayout pageTitle="Test Results" role="student">
        <Loader fullPage text="Loading test results..." />
      </DashboardLayout>
    );
  }


  if (error) return (
    <DashboardLayout pageTitle="Test Results" role="student">
        <div className="text-center py-20 text-red-500">
            <i className="ri-error-warning-line text-4xl mb-3 block"></i>
            <p>{error}</p>
            <Link to="/student/aptitude-tests" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-xl">Back to Tests</Link>
        </div>
    </DashboardLayout>
  );

  const attempt = data?.attempt || {};
  const results = data?.results || [];
  const score = data?.score ?? 0;
  const total = data?.total || 1;
  const answered = data?.answered ?? 0;
  const questions = data?.questions || results.length || 1;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <DashboardLayout pageTitle="Test Results" role="student">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{attempt.title} — Results</h1>
          <Link to="/student/aptitude-tests" className="px-4 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-500 dark-theme:text-gray-400 text-sm hover:bg-cream-dark dark-theme:hover:bg-gray-700 transition-colors"><i className="ri-arrow-left-line mr-1"></i>Back to Tests</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Score', value: `${score}/${total}`, icon: 'ri-medal-line', color: percentage >= 70 ? 'text-green-400' : 'text-amber-400' },
            { label: 'Percentage', value: `${percentage}%`, icon: 'ri-percent-line', color: 'text-primary' },
            { label: 'Answered', value: `${answered}/${questions}`, icon: 'ri-checkbox-circle-line', color: 'text-blue-400' },
            { label: 'Skipped', value: `${questions - answered}`, icon: 'ri-skip-forward-line', color: 'text-gray-500 dark-theme:text-gray-400' },
          ].map((s, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand dark-theme:border-gray-800 text-center">
              <i className={`${s.icon} text-xl ${s.color} block mb-1`}></i>
              <p className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{s.value}</p>
              <p className="text-[10px] text-gray-500 dark-theme:text-gray-400">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 dark-theme:text-gray-500">Review Answers</h2>
          {results.map((q, idx) => {
            const userAns = q.selectedOption;
            const correct = q.isCorrect;
            
            return (
              <div key={idx} className={`bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border ${correct ? 'border-green-500/30' : userAns ? 'border-red-500/30' : 'border-sand dark-theme:border-gray-800'}`}>
                <div className="flex items-start gap-3 mb-3">
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${correct ? 'bg-green-500/15 text-green-400' : userAns ? 'bg-red-500/15 text-red-400' : 'bg-cream-dark dark-theme:bg-gray-800 text-gray-500 dark-theme:text-gray-400'}`}>{idx + 1}</span>
                  <p className="text-sm text-gray-800 dark-theme:text-gray-100 font-medium">{q.question}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ml-10">
                  {['A', 'B', 'C', 'D'].map(opt => {
                    const isCorrectOption = opt === q.correctOption;
                    const isUserSelected = opt === userAns;
                    return (
                      <div key={opt} className={`p-3 rounded-xl text-xs border transition-all ${isCorrectOption ? 'border-green-500 bg-green-500/10 text-green-400 font-medium' : isUserSelected ? 'border-red-500 bg-red-500/10 text-red-400' : 'border-sand dark-theme:border-gray-800 text-gray-500 dark-theme:text-gray-500'}`}>
                        <span className="font-bold mr-2">{opt}.</span>{q[`option${opt}`]}
                        {isCorrectOption && <i className="ri-check-line ml-2 text-green-400"></i>}
                        {isUserSelected && !isCorrectOption && <i className="ri-close-line ml-2 text-red-400"></i>}
                      </div>
                    );
                  })}
                </div>
                {q.explanation && (
                  <div className="ml-10 mt-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/10">
                    <p className="text-[11px] text-blue-400"><i className="ri-lightbulb-line mr-1"></i><strong>Explanation:</strong> {q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AptitudeResult;
