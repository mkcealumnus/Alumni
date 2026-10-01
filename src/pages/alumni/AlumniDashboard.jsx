import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { alumniApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const AlumniDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await alumniApi.getDashboard();
      if (res.success) {
        setStats({
          ...(res.stats || {}),
          recentSubmissions: res.recentSubmissions || [],
          upcomingEvents: res.upcomingEvents || [],
        });
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <DashboardLayout pageTitle="Alumni Dashboard" role="alumni">
      {loading ? null : (
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="bg-gray-950 rounded-2xl p-6 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">
                Welcome, <span className="text-primary-light">{user?.fullName || 'Alumni'}!</span>
              </h1>
              <p className="text-white/60 text-sm">
                Here&apos;s an overview of your active courses, student progress, and doubt resolution.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                to="/alumni/doubts"
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-all flex items-center gap-1.5 shadow-md shadow-primary/20"
              >
                <i className="ri-chat-3-line text-sm"></i> Resolve Doubts
              </Link>
              <Link
                to="/alumni/students-progress"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5"
              >
                <i className="ri-line-chart-line text-sm"></i> Student Progress
              </Link>
            </div>
          </div>

          {/* Stats Grid with Interactive Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/alumni/students-progress"
              className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm hover:border-primary/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-white text-primary transition-all flex items-center justify-center">
                  <i className="ri-book-open-line text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Active Courses</p>
                  <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                    {stats?.totalCourses || 0}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/alumni/students-progress"
              className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm hover:border-blue-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 group-hover:bg-blue-500 group-hover:text-white text-blue-500 transition-all flex items-center justify-center">
                  <i className="ri-user-line text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total Enrolled Students</p>
                  <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                    {stats?.totalStudents || 0}
                  </p>
                </div>
              </div>
            </Link>

            <Link
              to="/alumni/doubts"
              className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm hover:border-green-500/40 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 group-hover:bg-green-500 group-hover:text-white text-green-500 transition-all flex items-center justify-center">
                  <i className="ri-question-answer-line text-lg"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Pending Doubts</p>
                  <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                    {stats?.pendingDoubts || 0}
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">
              Alumni Quick Shortcuts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                to="/alumni/doubts"
                className="p-4 rounded-xl border border-sand dark-theme:border-gray-800 hover:bg-sand/30 dark-theme:hover:bg-gray-800/50 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                  <i className="ri-chat-3-line text-xl"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark-theme:text-gray-100">
                    Student Doubts
                  </p>
                  <p className="text-xs text-gray-400">Answer student queries & code doubts</p>
                </div>
              </Link>

              <Link
                to="/alumni/students-progress"
                className="p-4 rounded-xl border border-sand dark-theme:border-gray-800 hover:bg-sand/30 dark-theme:hover:bg-gray-800/50 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                  <i className="ri-line-chart-line text-xl"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark-theme:text-gray-100">
                    Student Progress
                  </p>
                  <p className="text-xs text-gray-400">Track student completion percentages</p>
                </div>
              </Link>

              <Link
                to="/alumni/profile"
                className="p-4 rounded-xl border border-sand dark-theme:border-gray-800 hover:bg-sand/30 dark-theme:hover:bg-gray-800/50 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                  <i className="ri-user-settings-line text-xl"></i>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 dark-theme:text-gray-100">
                    Alumni Profile
                  </p>
                  <p className="text-xs text-gray-400">Update account info & security settings</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">
              Upcoming Events & Schedules
            </h3>
            <div className="space-y-3">
              {(stats?.upcomingEvents || []).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No upcoming events scheduled</p>
              ) : (
                stats.upcomingEvents.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors border border-sand/50 dark-theme:border-gray-800/50"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <i className="ri-calendar-event-line text-blue-500 text-sm"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200 truncate">
                        {e.title}
                      </p>
                      <span className="text-xs text-gray-400">
                        {new Date(e.startDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AlumniDashboard;
