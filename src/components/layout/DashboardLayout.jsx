import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Compass, UserCircle, Users, Handshake,
  Map, CalendarDays, Briefcase, LogOut, Menu, X, Bell,
  ChevronDown, Search, Settings, ArrowLeft, GraduationCap
} from 'lucide-react';
import Swal, { getSwalOpts } from '@/utils/swal';
import { useAuth } from '@/context/AuthContext';

const studentNav = [
  { section: 'MAIN' },
  { path: '/student', icon: LayoutDashboard, label: 'Dashboard' },
  { section: 'NETWORK' },
  { path: '/student/career-guidance', icon: Compass, label: 'Career Guidance' },
  { path: '/student/mentorship', icon: Handshake, label: '1-on-1 Mentorship' },
  { path: '/student/groups', icon: Users, label: 'Alumni Groups' },
  { section: 'CAREER' },
  { path: '/student/roadmaps', icon: Map, label: 'Roadmaps' },
  { path: '/student/workshops', icon: CalendarDays, label: 'Workshops' },
  { path: '/student/jobs', icon: Briefcase, label: 'Job Portal' },
  { section: 'ACCOUNT' },
  { path: '/student/profile', icon: UserCircle, label: 'My Profile' },
];

const alumniNav = [
  { section: 'MAIN' },
  { path: '/alumni', icon: LayoutDashboard, label: 'Dashboard' },
  { section: 'NETWORK' },
  { path: '/alumni/career-guidance', icon: Compass, label: 'Career Guidance' },
  { path: '/alumni/mentorship', icon: Handshake, label: '1-on-1 Mentorship' },
  { path: '/alumni/groups', icon: Users, label: 'Mentorship Groups' },
  { section: 'CAREER' },
  { path: '/alumni/roadmaps', icon: Map, label: 'Roadmaps' },
  { path: '/alumni/workshops', icon: CalendarDays, label: 'Workshops' },
  { path: '/alumni/jobs', icon: Briefcase, label: 'Job Portal' },
  { section: 'ACCOUNT' },
  { path: '/alumni/profile', icon: UserCircle, label: 'Profile' },
];

const DashboardLayout = ({ children, pageTitle, role = 'student' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const profileRef = useRef(null);

  const getNavItems = () => {
    switch (role) {
      case 'alumni':
        return alumniNav;
      default:
        return studentNav;
    }
  };

  const navItems = getNavItems();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleSignOut = () => {
    Swal.fire({
      ...getSwalOpts(),
      title: 'Sign Out?',
      text: 'Are you sure you want to sign out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, sign out'
    }).then(result => {
      if (result.isConfirmed) { logout(); navigate('/auth'); }
    });
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--color-background)' }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[252px] flex flex-col transition-transform duration-200 ease-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{
          background: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 h-[68px] shrink-0" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
            <GraduationCap size={20} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] leading-tight" style={{ color: 'var(--color-text)' }}>MKCE Alumni</span>
            <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: 'var(--color-text-muted)' }}>
              {role.toUpperCase()}
            </span>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-1.5 rounded-md hover:bg-[var(--color-surface-muted)]"
            aria-label="Close sidebar"
          >
            <X size={18} style={{ color: 'var(--color-text-muted)' }} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          {navItems.map((item, index) => {
            if (item.section) {
              return (
                <div key={`section-${index}`} className="pt-5 pb-1.5 px-3 first:pt-1">
                  <p className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: 'var(--color-text-muted)' }}>
                    {item.section}
                  </p>
                </div>
              );
            }

            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-150 relative"
                style={{
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  background: isActive ? 'var(--color-accent)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'var(--color-surface-muted)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full"
                    style={{ background: 'var(--color-secondary)' }}
                  />
                )}
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 space-y-1" style={{ borderTop: '1px solid var(--color-border)' }}>
          {user?.role === 'admin' && role === 'alumni' && (
            <Link
              to="/admin"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-150"
              style={{ color: 'var(--color-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <ArrowLeft size={18} />
              <span>Back to Admin</span>
            </Link>
          )}

          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-2">
            {user?.profileImage ? (
              <img src={user.profileImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                style={{ background: 'var(--color-primary)' }}
              >
                {(user?.fullName || 'U').charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                {user?.fullName || 'User'}
              </p>
              <p className="text-[11px] truncate" style={{ color: 'var(--color-text-muted)' }}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors duration-150"
            style={{ color: 'var(--color-danger)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-danger-bg)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header
          className="h-[68px] flex items-center justify-between px-4 lg:px-8 shrink-0"
          style={{
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-secondary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
              {pageTitle}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Notifications placeholder */}
            <button
              className="p-2 rounded-lg transition-colors"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            {/* User Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    {(user?.fullName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline text-[13px] font-semibold" style={{ color: 'var(--color-text)' }}>
                  {user?.fullName || 'User'}
                </span>
                <ChevronDown size={14} style={{ color: 'var(--color-text-muted)' }} />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-xl py-2 z-50 animate-fade-in"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text)' }}>{user?.fullName}</p>
                    <p className="text-[12px] truncate" style={{ color: 'var(--color-text-muted)' }}>{user?.email}</p>
                    <span
                      className="inline-block mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase"
                      style={{ background: 'var(--color-accent)', color: 'var(--color-primary)' }}
                    >
                      {role}
                    </span>
                  </div>

                  <Link
                    to={role === 'admin' ? '/admin/profile' : role === 'alumni' ? '/alumni/profile' : '/student/profile'}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    onClick={() => setProfileOpen(false)}
                  >
                    <Settings size={16} style={{ color: 'var(--color-text-muted)' }} />
                    <span>Profile Settings</span>
                  </Link>

                  <div style={{ borderTop: '1px solid var(--color-border)' }} className="mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13px] transition-colors"
                      style={{ color: 'var(--color-danger)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-danger-bg)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main
          className="flex-1 overflow-y-auto"
          style={{ background: 'var(--color-background)' }}
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
