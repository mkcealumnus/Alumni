import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import { alumniApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

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
        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(s.studentName)}&size=32&background=c96442&color=fff`} className="w-8 h-8 rounded-lg" alt="" />
        <span className="font-medium text-gray-700 dark-theme:text-gray-200">{s.studentName}</span>
      </div>
    ), exportValue: (s) => s.studentName },
    { key: 'courseTitle', label: 'Course', sortable: true },
    { key: 'completionPercentage', label: 'Progress', sortable: true, render: (v) => (
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-sand dark-theme:bg-gray-800 rounded-full overflow-hidden min-w-[80px]">
          <div className={`h-full rounded-full ${(v || 0) >= 100 ? 'bg-green-500' : 'bg-primary'}`} style={{ width: `${v || 0}%` }}></div>
        </div>
        <span className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 w-10">{v || 0}%</span>
      </div>
    ), exportValue: (s) => `${s.completionPercentage || 0}%` },
    { key: 'enrolledAt', label: 'Enrolled', sortable: true, render: (v) => new Date(v).toLocaleDateString(), exportValue: (s) => new Date(s.enrolledAt).toLocaleDateString() },
  ];

  return (
    <Layout {...layoutProps}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Student Progress</h1>

        <DataTable
          columns={columns}
          data={students}
          loading={loading}
          searchPlaceholder="Search students or courses..."
          storageKey="nextstep_students_progress_cols"
          exportTitle="Student Progress Report"
          exportFileName="NextStep_Student_Progress"
          emptyIcon="ri-line-chart-line"
          emptyMessage="No student data available"
        />
      </div>
    </Layout>
  );
};
export default StudentsProgress;
