import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi } from '../../utils/api';
import { AlertTriangle, ArrowLeft, Award, Percent, CheckCircle2, SkipForward, Check, X, Lightbulb } from 'lucide-react';

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
      <div className="text-center py-20">
        <AlertTriangle className="h-10 w-10 mx-auto mb-3" style={{ color: 'var(--color-danger)' }} />
        <p className="text-sm font-semibold" style={{ color: 'var(--color-danger)' }}>{error}</p>
        <Link 
          to="/student/aptitude-tests" 
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-xs font-medium"
          style={{ background: 'var(--color-primary)' }}
        >
          <ArrowLeft className="h-4 w-4" /> Back to Tests
        </Link>
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

  const statCards = [
    { label: 'Score', value: `${score}/${total}`, icon: Award, isPass: percentage >= 70 },
    { label: 'Percentage', value: `${percentage}%`, icon: Percent, isPass: percentage >= 70 },
    { label: 'Answered', value: `${answered}/${questions}`, icon: CheckCircle2, isPass: true },
    { label: 'Skipped', value: `${questions - answered}`, icon: SkipForward, isPass: false },
  ];

  return (
    <DashboardLayout pageTitle="Test Results" role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{attempt.title} — Results</h1>
          <Link 
            to="/student/aptitude-tests" 
            className="px-3.5 py-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Tests
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <div 
                key={i} 
                className="rounded-xl p-4 border text-center shadow-xs"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2 border"
                  style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</p>
                <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>Review Answers</h2>
          {results.map((q, idx) => {
            const userAns = q.selectedOption;
            const correct = q.isCorrect;
            
            return (
              <div 
                key={idx} 
                className="rounded-xl p-5 border shadow-xs"
                style={{ 
                  background: 'var(--color-surface)', 
                  borderColor: correct ? 'var(--color-success)' : userAns ? 'var(--color-danger)' : 'var(--color-border)' 
                }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <span 
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border"
                    style={{
                      background: correct ? 'var(--color-success-bg)' : userAns ? 'var(--color-danger-bg)' : 'var(--color-surface-muted)',
                      color: correct ? 'var(--color-success)' : userAns ? 'var(--color-danger)' : 'var(--color-text-muted)',
                      borderColor: 'transparent'
                    }}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-sm font-semibold pt-0.5" style={{ color: 'var(--color-text)' }}>{q.question}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 ml-10">
                  {['A', 'B', 'C', 'D'].map(opt => {
                    const isCorrectOption = opt === q.correctOption;
                    const isUserSelected = opt === userAns;
                    return (
                      <div 
                        key={opt} 
                        className="p-3 rounded-lg text-xs border flex items-center justify-between font-medium"
                        style={{
                          background: isCorrectOption ? 'var(--color-success-bg)' : isUserSelected ? 'var(--color-danger-bg)' : 'var(--color-surface-muted)',
                          borderColor: isCorrectOption ? 'var(--color-success)' : isUserSelected ? 'var(--color-danger)' : 'var(--color-border)',
                          color: isCorrectOption ? 'var(--color-success)' : isUserSelected ? 'var(--color-danger)' : 'var(--color-text-secondary)'
                        }}
                      >
                        <div>
                          <span className="font-bold mr-2">{opt}.</span>{q[`option${opt}`]}
                        </div>
                        {isCorrectOption && <Check className="h-4 w-4 shrink-0" style={{ color: 'var(--color-success)' }} />}
                        {isUserSelected && !isCorrectOption && <X className="h-4 w-4 shrink-0" style={{ color: 'var(--color-danger)' }} />}
                      </div>
                    );
                  })}
                </div>
                {q.explanation && (
                  <div 
                    className="ml-10 mt-3 p-3 rounded-lg border text-xs flex items-start gap-2"
                    style={{ background: 'var(--color-info-bg)', borderColor: 'var(--color-border)', color: 'var(--color-info)' }}
                  >
                    <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <strong className="font-semibold">Explanation:</strong> {q.explanation}
                    </div>
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

