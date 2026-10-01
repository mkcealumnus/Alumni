import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import { studentApi, getUser } from '../../utils/api';
import { exportGradeReportPDF } from '../../utils/exportData';
import { FileText, BarChart2, TrendingUp, Award } from 'lucide-react';

const MyGrades = () => {
  const [grades, setGrades] = useState([]);
  const [summary, setSummary] = useState({ avgPercentage: 0, highestScore: 0, totalGrades: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrades = async () => {
      const res = await studentApi.getGrades();
      if (res.success) {
        setGrades(res.grades || []);
        setSummary(res.stats || { avgPercentage: 0, highestScore: 0, totalGrades: 0 });
      }
      setLoading(false);
    };
    fetchGrades();
  }, []);

  const handleDownloadPDF = () => {
    const user = getUser() || {};
    exportGradeReportPDF({
      studentInfo: user,
      summary,
      grades,
      fileName: `NextStep_Grade_Transcript_${user.rollNumber || 'Student'}`
    });
  };

  const columns = [
    { 
      key: 'title', 
      label: 'Assessment Item', 
      sortable: true, 
      render: (_, g) => (
        <span className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
          {g.title || g.testTitle || g.assignmentTitle || 'Assessment Item'}
        </span>
      ), 
      exportValue: (g) => g.title || g.testTitle || g.assignmentTitle || 'Assessment Item' 
    },
    { 
      key: 'courseName', 
      label: 'Course', 
      sortable: true, 
      render: (_, g) => (
        <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          {g.courseName || (g.testTitle ? 'Aptitude Test' : '-')}
        </span>
      ), 
      exportValue: (g) => g.courseName || (g.testTitle ? 'Aptitude Test' : '-') 
    },
    { 
      key: 'grade', 
      label: 'Score', 
      sortable: true, 
      render: (_, g) => (
        <span className="text-xs font-medium" style={{ color: 'var(--color-text)' }}>
          {g.grade}/{g.maxScore}
        </span>
      ), 
      exportValue: (g) => `${g.grade}/${g.maxScore}` 
    },
    { 
      key: 'percentage', 
      label: 'Grade', 
      sortable: true, 
      render: (_, g) => {
        const pct = g.maxScore ? Math.round((g.grade / g.maxScore) * 100) : 0;
        const isGood = pct >= 80;
        const isAvg = pct >= 60;
        return (
          <span 
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
            style={{
              background: isGood ? 'var(--color-success-bg)' : isAvg ? 'var(--color-warning-bg)' : 'var(--color-danger-bg)',
              color: isGood ? 'var(--color-success)' : isAvg ? 'var(--color-warning)' : 'var(--color-danger)'
            }}
          >
            {pct}%
          </span>
        );
      }, 
      exportValue: (g) => g.maxScore ? `${Math.round((g.grade / g.maxScore) * 100)}%` : '0%' 
    },
    { 
      key: 'feedback', 
      label: 'Feedback', 
      sortable: false, 
      render: (v) => (
        <span className="text-xs max-w-[200px] truncate block" style={{ color: 'var(--color-text-muted)' }}>
          {v || '-'}
        </span>
      ) 
    },
  ];

  return (
    <DashboardLayout pageTitle="My Grades" role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>My Grades</h1>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 rounded-lg text-white text-xs font-medium flex items-center gap-2 shadow-sm transition-colors"
            style={{ background: 'var(--color-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            <FileText className="h-4 w-4" /> Download Official Transcript PDF
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-xl p-5 border text-center shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}>
              <BarChart2 className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{summary.avgPercentage}%</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Average Score</p>
          </div>

          <div className="rounded-xl p-5 border text-center shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: 'var(--color-success-bg)', color: 'var(--color-success)' }}>
              <TrendingUp className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{summary.highestScore}%</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Highest Score</p>
          </div>

          <div className="rounded-xl p-5 border text-center shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-2" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}>
              <Award className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>{summary.totalGrades}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Total Graded</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={grades}
          loading={loading}
          searchPlaceholder="Search grades..."
          storageKey="nextstep_grades_cols"
          exportTitle="My Grades Report"
          exportFileName="NextStep_My_Grades"
          emptyMessage="No grade records found"
        />
      </div>
    </DashboardLayout>
  );
};
export default MyGrades;

