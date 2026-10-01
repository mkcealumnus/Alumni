import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import { studentApi, getUser } from '../../utils/api';
import { exportGradeReportPDF } from '../../utils/exportData';

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
      fileName: `Sowberry_Grade_Transcript_${user.rollNumber || 'Student'}`
    });
  };

  const getGradeColor = (pct) => pct >= 80 ? 'text-green-600' : pct >= 60 ? 'text-amber-600' : 'text-red-600';
  const getGradeBg = (pct) => pct >= 80 ? 'bg-green-500/15' : pct >= 60 ? 'bg-amber-500/15' : 'bg-red-500/15';

  const columns = [
    { key: 'title', label: 'Assessment Item', sortable: true, render: (_, g) => (
      <span className="font-medium text-gray-800 dark-theme:text-gray-100">{g.title || g.testTitle || g.assignmentTitle || 'Assessment Item'}</span>
    ), exportValue: (g) => g.title || g.testTitle || g.assignmentTitle || 'Assessment Item' },

    { key: 'courseName', label: 'Course', sortable: true, render: (_, g) => g.courseName || (g.testTitle ? 'Aptitude Test' : '-'), exportValue: (g) => g.courseName || (g.testTitle ? 'Aptitude Test' : '-') },
    { key: 'grade', label: 'Score', sortable: true, render: (_, g) => (
      <span className="text-gray-600 dark-theme:text-gray-300">{g.grade}/{g.maxScore}</span>
    ), exportValue: (g) => `${g.grade}/${g.maxScore}` },
    { key: 'percentage', label: 'Grade', sortable: true, render: (_, g) => {
      const pct = g.maxScore ? Math.round((g.grade / g.maxScore) * 100) : 0;
      return <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${getGradeBg(pct)} ${getGradeColor(pct)}`}>{pct}%</span>;
    }, exportValue: (g) => g.maxScore ? `${Math.round((g.grade / g.maxScore) * 100)}%` : '0%' },
    { key: 'feedback', label: 'Feedback', sortable: false, render: (v) => (
      <span className="text-gray-500 text-xs max-w-[200px] truncate block">{v || '-'}</span>
    ) },
  ];

  return (
    <DashboardLayout pageTitle="My Grades" role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">My Grades</h1>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold flex items-center gap-2 shadow-md hover:opacity-95 transition-all"
          >
            <i className="ri-file-pdf-2-line text-sm"></i> Download Official Transcript PDF
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center mx-auto mb-2"><i className="ri-bar-chart-box-line text-blue-600"></i></div>
            <p className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">{summary.avgPercentage}%</p>
            <p className="text-xs text-gray-500">Average</p>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center mx-auto mb-2"><i className="ri-arrow-up-line text-green-600"></i></div>
            <p className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">{summary.highestScore}%</p>
            <p className="text-xs text-gray-500">Highest</p>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 text-center">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-2"><i className="ri-file-list-line text-purple-600"></i></div>
            <p className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">{summary.totalGrades}</p>
            <p className="text-xs text-gray-500">Graded</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={grades}
          loading={loading}
          searchPlaceholder="Search grades..."
          storageKey="sowberry_grades_cols"
          exportTitle="My Grades Report"
          exportFileName="Sowberry_My_Grades"
          emptyIcon="ri-bar-chart-box-line"
          emptyMessage="No grades yet"
        />
      </div>
    </DashboardLayout>
  );
};
export default MyGrades;
