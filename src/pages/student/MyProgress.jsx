import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import { studentApi } from '../../utils/api';
import { BookOpen } from 'lucide-react';

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
        <div 
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border"
          style={{ background: 'var(--color-accent)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
        >
          <BookOpen className="h-4 w-4" />
        </div>
        <div>
          <span className="font-semibold text-sm block" style={{ color: 'var(--color-text)' }}>{p.courseTitle || p.title}</span>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{p.mentorName || 'Instructor'}</p>
        </div>
      </div>
    ), exportValue: (p) => p.courseTitle || p.title },
    { key: 'mentorName', label: 'Mentor', sortable: true, visible: false, render: (v) => v || 'Instructor' },
    { key: 'progress', label: 'Progress', sortable: true, render: (v) => (
      <div className="flex items-center gap-3 min-w-[140px]">
        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-muted)' }}>
          <div 
            className="h-2 rounded-full transition-all" 
            style={{ 
              width: `${v || 0}%`, 
              background: (v || 0) >= 100 ? 'var(--color-success)' : 'var(--color-primary)' 
            }}
          ></div>
        </div>
        <span className="text-xs font-semibold w-10 text-right" style={{ color: 'var(--color-text-secondary)' }}>{v || 0}%</span>
      </div>
    ), exportValue: (p) => `${p.progress || 0}%` },
    { key: 'status', label: 'Status', sortable: true, render: (_, p) => {
      const pct = p.progress || 0;
      const isComplete = pct >= 100;
      return (
        <span 
          className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
          style={{
            background: isComplete ? 'var(--color-success-bg)' : 'var(--color-info-bg)',
            color: isComplete ? 'var(--color-success)' : 'var(--color-info)'
          }}
        >
          {isComplete ? 'Completed' : 'In Progress'}
        </span>
      );
    }, exportValue: (p) => (p.progress || 0) >= 100 ? 'Completed' : 'In Progress' },
    { key: 'enrolledDate', label: 'Enrolled', sortable: true, render: (v) => v ? new Date(v).toLocaleDateString() : 'N/A', exportValue: (p) => p.enrolledDate ? new Date(p.enrolledDate).toLocaleDateString() : 'N/A' },
  ];

  return (
    <DashboardLayout pageTitle="My Progress" role="student">
      <div className="space-y-6">
        <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>My Progress</h1>

        {/* Overall Progress Card */}
        <div className="rounded-xl p-6 border shadow-sm" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Overall Progress</p>
              <p className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{overall.overallProgress}%</p>
            </div>
            <div 
              className="w-16 h-16 rounded-full border-4 flex items-center justify-center"
              style={{ borderColor: 'var(--color-primary)' }}
            >
              <span className="text-sm font-bold" style={{ color: 'var(--color-primary)' }}>{overall.overallProgress}%</span>
            </div>
          </div>
          <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-muted)' }}>
            <div 
              className="h-2.5 rounded-full transition-all" 
              style={{ width: `${overall.overallProgress}%`, background: 'var(--color-primary)' }}
            ></div>
          </div>
          <div className="flex justify-between mt-3 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
            <span>{overall.totalCourses} courses enrolled</span>
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
          emptyMessage="No progress data available"
        />
      </div>
    </DashboardLayout>
  );
};
export default MyProgress;

