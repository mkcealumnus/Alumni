import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { alumniApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, Users, HelpCircle, MessageCircle, TrendingUp,
  UserCircle, CalendarDays, ChevronRight
} from 'lucide-react';

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

  const firstName = user?.fullName?.split(' ')[0] || 'Alumni';

  return (
    <DashboardLayout pageTitle="Alumni Dashboard" role="alumni">
      {loading ? null : (
        <div className="space-y-8">
          {/* Welcome */}
          <div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
              Welcome back, {firstName}
            </h1>
            <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
              Here&apos;s an overview of your active courses, student progress, and doubt resolution.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              to="/alumni/students-progress"
              className="group p-5 rounded-xl transition-all duration-200"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
                  <BookOpen size={18} style={{ color: 'var(--color-primary)' }} />
                </div>
                <div>
                  <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Active Courses</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{stats?.totalCourses || 0}</p>
                </div>
              </div>
            </Link>

            <Link
              to="/alumni/students-progress"
              className="group p-5 rounded-xl transition-all duration-200"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#E0F2FE' }}>
                  <Users size={18} style={{ color: '#0369A1' }} />
                </div>
                <div>
                  <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Enrolled Students</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{stats?.totalStudents || 0}</p>
                </div>
              </div>
            </Link>

            <Link
              to="/alumni/doubts"
              className="group p-5 rounded-xl transition-all duration-200"
              style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: '#DCFCE7' }}>
                  <HelpCircle size={18} style={{ color: '#15803D' }} />
                </div>
                <div>
                  <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>Pending Doubts</p>
                  <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{stats?.pendingDoubts || 0}</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Shortcuts */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-[16px] font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              Alumni Quick Shortcuts
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { to: '/alumni/doubts', icon: MessageCircle, iconColor: '#7C3AED', iconBg: '#EDE9FE', title: 'Student Doubts', desc: 'Answer student queries & code doubts' },
                { to: '/alumni/students-progress', icon: TrendingUp, iconColor: '#2563EB', iconBg: '#E0F2FE', title: 'Student Progress', desc: 'Track student completion percentages' },
                { to: '/alumni/profile', icon: UserCircle, iconColor: '#B45309', iconBg: '#FEF3C7', title: 'Alumni Profile', desc: 'Update account info & security settings' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    to={item.to}
                    className="flex items-center gap-3 p-4 rounded-lg transition-colors"
                    style={{ border: '1px solid var(--color-border)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: item.iconBg }}>
                      <Icon size={18} style={{ color: item.iconColor }} />
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold" style={{ color: 'var(--color-text)' }}>{item.title}</p>
                      <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>{item.desc}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <h3 className="text-[16px] font-semibold mb-4" style={{ color: 'var(--color-text)' }}>
              Upcoming Events & Schedules
            </h3>
            <div className="space-y-3">
              {(stats?.upcomingEvents || []).length === 0 ? (
                <div className="text-center py-8">
                  <CalendarDays size={32} className="mx-auto mb-2" style={{ color: 'var(--color-border-strong)' }} />
                  <p className="text-[14px]" style={{ color: 'var(--color-text-muted)' }}>No upcoming events scheduled</p>
                </div>
              ) : (
                stats.upcomingEvents.map((e, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                    style={{ border: '1px solid var(--color-border)' }}
                    onMouseEnter={(el) => el.currentTarget.style.background = 'var(--color-surface-muted)'}
                    onMouseLeave={(el) => el.currentTarget.style.background = 'transparent'}
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#E0F2FE' }}>
                      <CalendarDays size={15} style={{ color: '#0369A1' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-medium truncate" style={{ color: 'var(--color-text)' }}>{e.title}</p>
                      <span className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
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
