import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import Loader from '@/components/ui/Loader';
import { adminApi } from '../../utils/api';

const PerformanceAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await adminApi.getAnalytics();
      if (res.success) { const { success, message, ...data } = res; setAnalytics(data); }
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <AdminLayout pageTitle="Performance Analytics">
        <Loader fullPage text="Loading performance analytics..." />
      </AdminLayout>
    );
  }

  const courseData = (analytics?.courseCompletion || []).map((c, i) => ({ ...c, rank: i + 1 }));
  const trendsData = analytics?.registrationTrends || [];

  const courseColumns = [
    { key: 'rank', label: '#', sortable: true, render: (v) => (
      <span className="w-6 h-6 rounded-md bg-primary/10 text-primary text-xs font-bold inline-flex items-center justify-center">{v}</span>
    ) },
    { key: 'title', label: 'Course', sortable: true, render: (v) => (
      <span className="font-medium text-gray-700 dark-theme:text-gray-200">{v}</span>
    ) },
    { key: 'enrollmentCount', label: 'Enrollments', sortable: true, render: (v) => (
      <span className="font-semibold text-gray-600 dark-theme:text-gray-400">{v}</span>
    ) },
  ];

  const trendsColumns = [
    { key: 'month', label: 'Month', sortable: true, render: (v) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center"><i className="ri-calendar-line text-primary text-xs"></i></div>
        <span className="font-medium text-gray-700 dark-theme:text-gray-200">{v}</span>
      </div>
    ) },
    { key: 'enrollments', label: 'Enrollments', sortable: true, render: (v) => (
      <span className="font-semibold text-gray-800 dark-theme:text-gray-100">{v}</span>
    ) },
    { key: 'newStudents', label: 'New Students', sortable: true, render: (v) => (
      <span className="text-gray-500 dark-theme:text-gray-400">{v}</span>
    ) },
  ];

  return (
    <AdminLayout pageTitle="Performance Analytics">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Performance Analytics</h1>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Students', value: analytics?.totalStudents || 0, icon: 'ri-user-line', color: 'primary', change: '+12%' },
            { label: 'Total Mentors', value: analytics?.totalMentors || 0, icon: 'ri-team-line', color: 'blue-500', change: '+5%' },
            { label: 'Active Courses', value: analytics?.totalCourses || 0, icon: 'ri-book-open-line', color: 'green-500', change: '+8%' },
            { label: 'Completion Rate', value: `${analytics?.completionRate || 0}%`, icon: 'ri-medal-line', color: 'amber-500', change: '+3%' },
          ].map((m, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-${m.color}/10 flex items-center justify-center`}><i className={`${m.icon} text-${m.color} text-lg`}></i></div>
                <span className="text-xs text-green-500 font-medium bg-green-50 dark-theme:bg-green-900/20 px-2 py-0.5 rounded-full">{m.change}</span>
              </div>
              <p className="text-xs text-gray-400 mb-1">{m.label}</p>
              <p className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">{m.value}</p>
            </div>
          ))}
        </div>

        {/* DataTables side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-3">Top Courses by Enrollment</h3>
            <DataTable
              columns={courseColumns}
              data={courseData}
              loading={false}
              searchPlaceholder="Search courses..."
              exportTitle="Top Courses by Enrollment"
              exportFileName="Sowberry_Top_Courses"
              emptyIcon="ri-book-open-line"
              emptyMessage="No course data available"
              columnToggle={false}
              copyable={false}
              defaultPageSize={10}
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-3">Monthly Trends</h3>
            <DataTable
              columns={trendsColumns}
              data={trendsData}
              loading={false}
              searchPlaceholder="Search months..."
              exportTitle="Monthly Trends Report"
              exportFileName="Sowberry_Monthly_Trends"
              emptyIcon="ri-line-chart-line"
              emptyMessage="No trend data available"
              columnToggle={false}
              copyable={false}
              defaultPageSize={10}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default PerformanceAnalytics;
