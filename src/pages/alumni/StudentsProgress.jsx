import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import { alumniApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { TrendingUp } from 'lucide-react';

const StudentsProgress = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const Layout = isAdmin ? AdminLayout : DashboardLayout;
  const layoutProps = isAdmin ? {} : { pageTitle: 'Student Progress', role: 'alumni' };
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await alumniApi.getStudentsProgress();
      if (res.success) setStudents(res.students || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const columns = [
    { key: 'studentName', label: 'Student', sortable: true, render: (_, s) => (
      <div className="flex items-center gap-3">
        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(s.studentName)}&size=32&background=12355B&color=fff`} className="w-8 h-8 rounded-lg" alt="" />
        <span className="font-semibold text-xs" style={{ color: 'var(--color-text)' }}>{s.studentName}</span>
      </div>
    ), exportValue: (s) => s.studentName },
    { key: 'courseTitle', label: 'Course', sortable: true },
    { key: 'completionPercentage', label: 'Progress', sortable: true, render: (v) => (
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 rounded-full overflow-hidden min-w-[80px]" style={{ background: 'var(--color-border)' }}>
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${v || 0}%`, background: (v || 0) >= 100 ? '#10B981' : 'var(--color-primary)' }}></div>
        </div>
        <span className="text-xs font-semibold w-10" style={{ color: 'var(--color-text-muted)' }}>{v || 0}%</span>
      </div>
    ), exportValue: (s) => `${s.completionPercentage || 0}%` },
    { key: 'enrolledAt', label: 'Enrolled', sortable: true, render: (v) => new Date(v).toLocaleDateString(), exportValue: (s) => new Date(s.enrolledAt).toLocaleDateString() },
  ];

  return (
    <Layout {...layoutProps}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Student Progress Tracking</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Monitor course completion rates and student learning trajectories</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={students}
          loading={loading}
          searchPlaceholder="Search students or courses..."
          storageKey="nextstep_students_progress_cols"
          exportTitle="Student Progress Report"
          exportFileName="NextStep_Student_Progress"
          emptyMessage="No student progress data available"
        />
      </div>
    </Layout>
  );
};
export default StudentsProgress;
