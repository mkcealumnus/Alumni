import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi, getImageUrl } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, CheckCircle2, Code2, Trophy, Gamepad2,
  Timer, HelpCircle, ChevronRight
} from 'lucide-react';

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
    { label: 'Enrolled Courses', value: stats.enrolledCourses, icon: BookOpen, color: '#2563EB', bg: '#E0F2FE', link: '/student/my-courses' },
    { label: 'Completed', value: stats.completedCourses, icon: CheckCircle2, color: '#15803D', bg: '#DCFCE7', link: '/student/my-courses' },
    { label: 'Coding Arena', value: '150+ DSA', icon: Code2, color: '#B45309', bg: '#FEF3C7', link: '/student/coding-practice' },
    { label: 'Average Grade', value: `${stats.avgGrade}%`, icon: Trophy, color: '#7C3AED', bg: '#EDE9FE', link: '/student/my-grades' },
  ];

  const quickHub = [
    { title: 'Algorithm Games', desc: '33 Interactive DSA visual puzzles', icon: Gamepad2, color: '#B45309', bg: '#FEF3C7', link: '/student/learning-games' },
    { title: 'Coding Arena', desc: '150+ Problems & OneCompiler Sandbox', icon: Code2, color: '#2563EB', bg: '#E0F2FE', link: '/student/coding-practice' },
    { title: 'Aptitude Tests', desc: 'Timed MCQs with instant analysis', icon: Timer, color: '#15803D', bg: '#DCFCE7', link: '/student/aptitude-tests' },
    { title: 'Doubts & Support', desc: 'Direct mentorship Q&A portal', icon: HelpCircle, color: '#7C3AED', bg: '#EDE9FE', link: '/student/my-doubts' },
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
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            Good morning, {firstName}
          </h1>
          <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
            Ready to level up your skills today? Track your courses, practice coding, and master algorithms.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                key={i}
                to={s.link}
                className="group p-5 rounded-xl transition-all duration-200"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                    <Icon size={18} style={{ color: s.color }} />
                  </div>
                </div>
                <p className="text-2xl font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>
                  {s.value}
                </p>
                <p className="text-[13px] flex items-center justify-between" style={{ color: 'var(--color-text-muted)' }}>
                  <span>{s.label}</span>
                  <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" style={{ color: 'var(--color-text-disabled)' }} />
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick Learning Hub */}
        <div>
          <h2 className="text-[16px] font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
            Quick Learning Hub
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickHub.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Link
                  key={idx}
                  to={item.link}
                  className="group flex items-center gap-3 p-4 rounded-xl transition-all duration-200"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: item.bg }}>
                    <Icon size={18} style={{ color: item.color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[14px] font-semibold mb-0.5" style={{ color: 'var(--color-text)' }}>
                      {item.title}
                    </h3>
                    <p className="text-[12px] truncate" style={{ color: 'var(--color-text-muted)' }}>
                      {item.desc}
                    </p>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--color-text-disabled)' }} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
