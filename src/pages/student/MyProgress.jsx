import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import { studentApi } from '../../utils/api';

const MyProgress = () => {
  const [progress, setProgress] = useState([]);
  const [overall, setOverall] = useState({ totalCourses: 0, completedLessons: 0, totalLessons: 0, overallProgress: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await studentApi.getProgress();
      if (res.success) {
        setProgress(res.progress || []);
        setOverall(res.overall || overall);
      }
      setLoading(false);
    };
    fetchProgress();
  }, []);

  const columns = [
    { key: 'courseTitle', label: 'Course', sortable: true, render: (_, p) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="ri-book-open-line text-primary text-sm"></i></div>
        <div>
          <span className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{p.courseTitle || p.title}</span>
          <p className="text-[11px] text-gray-400">{p.mentorName || 'Instructor'}</p>
        </div>
      </div>
    ), exportValue: (p) => p.courseTitle || p.title },
    { key: 'mentorName', label: 'Mentor', sortable: true, visible: false, render: (v) => v || 'Instructor' },
    { key: 'progress', label: 'Progress', sortable: true, render: (v) => (
      <div className="flex items-center gap-3 min-w-[120px]">
        <div className="flex-1 h-2 bg-gray-200 dark-theme:bg-gray-700 rounded-full overflow-hidden">
          <div className={`h-2 rounded-full transition-all ${(v || 0) >= 100 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${v || 0}%` }}></div>
        </div>
        <span className="text-xs font-medium w-10 text-right">{v || 0}%</span>
      </div>
    ), exportValue: (p) => `${p.progress || 0}%` },
    { key: 'status', label: 'Status', sortable: true, render: (_, p) => {
      const pct = p.progress || 0;
      return <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${pct >= 100 ? 'bg-green-500/15 text-green-400' : pct >= 50 ? 'bg-blue-500/15 text-blue-400' : 'bg-amber-500/15 text-amber-400'}`}>{pct >= 100 ? 'Completed' : 'In Progress'}</span>;
    }, exportValue: (p) => (p.progress || 0) >= 100 ? 'Completed' : 'In Progress' },
    { key: 'enrolledDate', label: 'Enrolled', sortable: true, render: (v) => v ? new Date(v).toLocaleDateString() : 'N/A', exportValue: (p) => p.enrolledDate ? new Date(p.enrolledDate).toLocaleDateString() : 'N/A' },
  ];

  return (
    <DashboardLayout pageTitle="My Progress" role="student">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">My Progress</h1>

        {/* Overall Progress Card */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div><p className="text-sm text-gray-500">Overall Progress</p><p className="text-3xl font-bold text-gray-800 dark-theme:text-gray-100">{overall.overallProgress}%</p></div>
            <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary">{overall.overallProgress}%</span>
            </div>
          </div>
          <div className="w-full h-3 bg-gray-200 dark-theme:bg-gray-700 rounded-full"><div className="h-3 bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all" style={{ width: `${overall.overallProgress}%` }}></div></div>
          <div className="flex justify-between mt-3 text-xs text-gray-400">
            <span>{overall.totalCourses} courses</span>
            <span>{overall.completedLessons}/{overall.totalLessons} lessons completed</span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={progress}
          loading={loading}
          searchPlaceholder="Search courses..."
          storageKey="nextstep_my_progress_cols"
          exportTitle="My Progress Report"
          exportFileName="NextStep_My_Progress"
          emptyIcon="ri-line-chart-line"
          emptyMessage="No progress data yet"
        />
      </div>
    </DashboardLayout>
  );
};
export default MyProgress;
