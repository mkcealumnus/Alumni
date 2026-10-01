import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi, getImageUrl } from '../../utils/api';

import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ enrolledCourses: 0, completedCourses: 0, avgGrade: 0 });
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await studentApi.getDashboard();
      if (res.success) {
        setStats(res.stats || stats);
        setRecentCourses(res.currentCourses || []);
      }
      setLoading(false);
    };
    fetchDashboard();

  }, []);

  const statCards = [
    {
      label: 'Enrolled Courses',
      value: stats.enrolledCourses,
      icon: 'ri-book-open-line',
      color: 'from-blue-500 to-indigo-600',
      shadow: 'shadow-blue-500/20',
      badge: 'Active',
      link: '/student/my-courses'
    },
    {
      label: 'Completed',
      value: stats.completedCourses,
      icon: 'ri-checkbox-circle-line',
      color: 'from-emerald-500 to-teal-600',
      shadow: 'shadow-emerald-500/20',
      badge: 'Achieved',
      link: '/student/my-courses'
    },
    {
      label: 'Coding Arena',
      value: '150+ DSA',
      icon: 'ri-code-s-slash-line',
      color: 'from-amber-500 to-orange-600',
      shadow: 'shadow-amber-500/20',
      badge: 'Practice',
      link: '/student/coding-practice'
    },

    {
      label: 'Average Grade',
      value: `${stats.avgGrade}%`,
      icon: 'ri-trophy-line',
      color: 'from-purple-500 to-pink-600',
      shadow: 'shadow-purple-500/20',
      badge: 'Score',
      link: '/student/my-grades'
    },
  ];

  const quickHub = [
    {
      title: 'Algorithm Games',
      desc: '33 Interactive DSA visual puzzles',
      icon: 'ri-gamepad-line',
      color: 'from-amber-500 to-orange-500',
      link: '/student/learning-games',
      tag: 'Interactive'
    },
    {
      title: 'Coding Arena',
      desc: '150+ Problems & OneCompiler Sandbox',
      icon: 'ri-code-s-slash-line',
      color: 'from-blue-500 to-cyan-500',
      link: '/student/coding-practice',
      tag: 'Practice'
    },
    {
      title: 'Aptitude Tests',
      desc: 'Timed MCQs with instant analysis',
      icon: 'ri-timer-flash-line',
      color: 'from-emerald-500 to-teal-500',
      link: '/student/aptitude-tests',
      tag: 'Evaluations'
    },
    {
      title: 'Doubts & Support',
      desc: 'Direct mentorship Q&A portal',
      icon: 'ri-question-answer-line',
      color: 'from-purple-500 to-pink-500',
      link: '/student/my-doubts',
      tag: 'Helpdesk'
    },
  ];

  if (loading) {
    return (
      <DashboardLayout pageTitle="Dashboard" role="student">
        <Loader fullPage text="Loading dashboard data..." />
      </DashboardLayout>
    );
  }


  const firstName = user?.fullName?.split(' ')[0] || 'Student';

  return (
    <DashboardLayout pageTitle="Dashboard" role="student">
      <div className="space-y-8">
        {/* ==================== HERO WELCOME BANNER ==================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2c1d11] via-[#432c1b] to-[#1c120a] dark-theme:from-gray-900 dark-theme:via-[#241a12] dark-theme:to-gray-950 p-6 sm:p-8 text-white shadow-2xl border border-amber-900/30">
          {/* Ambient Glows */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative group">
                {user?.profileImage ? (
                  <img
                    src={getImageUrl(user.profileImage)}
                    alt={user.fullName}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-primary/40 shadow-xl"
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-primary via-amber-500 to-amber-700 flex items-center justify-center text-2xl font-bold text-white shadow-xl ring-4 ring-primary/40"
                  style={{ display: user?.profileImage ? 'none' : 'flex' }}
                >
                  {firstName.charAt(0)}
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-[#2c1d11] rounded-full flex items-center justify-center" title="Online Active">
                  <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                </span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-primary/20 text-primary border border-primary/30 backdrop-blur-md">
                    Student Account
                  </span>
                  <span className="text-xs text-amber-200/70 hidden sm:inline-flex items-center gap-1">
                    <i className="ri-fire-line text-amber-400"></i> Active Streak
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                  Welcome back, <span className="text-gradient drop-shadow-sm">{firstName}</span>! 👋
                </h1>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl leading-relaxed">
                  Ready to level up your skills today? Track your courses, practice coding, and master algorithms.
                </p>

              </div>
            </div>

            {/* Quick Hero Actions */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-white/10">
              <Link
                to="/student/my-courses"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-gray-950 font-bold text-xs transition-all shadow-lg shadow-primary/25 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <i className="ri-play-circle-line text-base"></i>
                <span>Resume Learning</span>
              </Link>
              <Link
                to="/student/learning-games"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs backdrop-blur-md border border-white/15 transition-all flex items-center justify-center gap-2"
              >
                <i className="ri-gamepad-line text-base text-amber-400"></i>
                <span>Play Games</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ==================== METRIC STAT CARDS ==================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {statCards.map((s, i) => (
            <Link
              key={i}
              to={s.link}
              className="group relative overflow-hidden bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand/80 dark-theme:border-gray-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}`}></div>

              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center ${s.shadow} text-white text-xl transform group-hover:scale-110 transition-transform`}>
                  <i className={s.icon}></i>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-cream dark-theme:bg-gray-800 text-gray-500 dark-theme:text-gray-400 border border-sand/50 dark-theme:border-gray-700/50">
                  {s.badge}
                </span>
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 dark-theme:text-gray-100 tracking-tight">
                {s.value}
              </h2>
              <p className="text-xs font-semibold text-gray-500 dark-theme:text-gray-400 mt-1 flex items-center justify-between">
                <span>{s.label}</span>
                <i className="ri-arrow-right-up-line text-gray-400 group-hover:text-primary transition-colors"></i>
              </p>
            </Link>
          ))}
        </div>

        {/* ==================== QUICK HUB SHORTCUTS ==================== */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 flex items-center gap-2">
              <i className="ri-apps-2-line text-primary"></i>
              <span>Quick Learning Hub</span>
            </h2>
            <span className="text-xs text-gray-400 font-medium">1-Click Shortcuts</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickHub.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="group bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand/70 dark-theme:border-gray-800/70 hover:border-primary/50 dark-theme:hover:border-primary/40 shadow-xs hover:shadow-md transition-all flex items-center gap-4"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center text-white text-lg flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}>
                  <i className={item.icon}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="text-xs font-bold text-gray-800 dark-theme:text-gray-100 group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-gray-400 dark-theme:text-gray-500 truncate leading-tight">
                    {item.desc}
                  </p>
                </div>
                <i className="ri-chevron-right-line text-gray-300 dark-theme:text-gray-600 group-hover:text-primary group-hover:translate-x-0.5 transition-all text-sm"></i>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
