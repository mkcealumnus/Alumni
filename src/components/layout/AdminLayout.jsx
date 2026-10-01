import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, GraduationCap, ShieldCheck, Settings,
  LogOut, Menu, X, Bell, ChevronDown, Search, UserCircle
} from 'lucide-react';
import Swal, { getSwalOpts } from '@/utils/swal';
import { useAuth } from '@/context/AuthContext';
import { adminApi } from '@/utils/api';

const AdminLayout = ({ children, pageTitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await adminApi.getNotifications();
      if (res.success) setNotifications(res.notifications || []);
    };
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    await adminApi.markAllRead();
    setNotifications(prev => prev.map(n => ({ ...n, isRead: 1 })));
  };

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

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { section: 'MAIN' },
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { section: 'MANAGEMENT' },
    { path: '/admin/manage-students', icon: Users, label: 'Students' },
    { path: '/admin/manage-alumni', icon: GraduationCap, label: 'Alumni' },
    { path: '/admin/manage-requests', icon: ShieldCheck, label: 'Verifications' },
    { section: 'SYSTEM' },
    { path: '/admin/profile', icon: UserCircle, label: 'My Profile' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

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
              ADMIN
            </span>
          </div>
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
          {/* User info */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'var(--color-primary)' }}
            >
              {(user?.fullName || 'A').charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold truncate" style={{ color: 'var(--color-text)' }}>
                {user?.fullName || 'Admin'}
              </p>
              <p className="text-[11px] truncate" style={{ color: 'var(--color-text-muted)' }}>
                Administrator
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
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header
          className="h-[68px] flex items-center justify-between px-4 lg:px-8 shrink-0"
          style={{
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          {/* Left: menu + search */}
          <div className="flex items-center gap-3 flex-1 max-w-sm">
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
            <div className="relative w-full hidden sm:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 rounded-lg text-[13px] outline-none transition-colors"
                style={{
                  background: 'var(--color-surface-muted)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
          </div>

          {/* Right: tools */}
          <div className="flex items-center gap-1">
            {/* Notifications */}
            <div ref={notificationsRef} className="relative">
              <button
                onClick={() => { setNotificationsOpen(!notificationsOpen); setProfileOpen(false); }}
                className="relative p-2 rounded-lg transition-colors"
                style={{ color: 'var(--color-text-muted)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                    style={{ background: 'var(--color-danger)' }}
                  />
                )}
              </button>

              {notificationsOpen && (
                <div
                  className="absolute right-0 top-12 w-80 rounded-xl overflow-hidden z-50 animate-fade-in"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <h4 className="font-semibold text-[13px]" style={{ color: 'var(--color-text)' }}>Notifications</h4>
                    <button
                      onClick={handleMarkAllRead}
                      className="text-[12px] font-medium"
                      style={{ color: 'var(--color-secondary)' }}
                    >
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-8 text-center text-sm" style={{ color: 'var(--color-text-muted)' }}>No notifications</p>
                    ) : notifications.slice(0, 5).map((n, i) => (
                      <div
                        key={n.id || i}
                        className="flex items-start gap-3 px-4 py-3 transition-colors cursor-pointer"
                        style={{
                          background: !n.isRead ? 'var(--color-accent)' : 'transparent',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = !n.isRead ? 'var(--color-accent)' : 'transparent'}
                      >
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: 'var(--color-accent)' }}
                        >
                          <Bell size={14} style={{ color: 'var(--color-primary)' }} />
                        </div>
                        <div>
                          <p className="text-[13px]" style={{ color: 'var(--color-text)' }}>{n.title || n.message}</p>
                          <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                            {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <button
                      className="w-full text-center text-[13px] font-medium rounded-lg py-2 transition-colors"
                      style={{ color: 'var(--color-secondary)' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-accent)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      View all
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors"
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                aria-expanded={profileOpen}
                aria-haspopup="true"
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: 'var(--color-primary)' }}
                >
                  {(user?.fullName || 'A').charAt(0).toUpperCase()}
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-[13px] font-medium" style={{ color: 'var(--color-text)' }}>
                    {user?.fullName || 'Admin'}
                  </span>
                </div>
                <ChevronDown size={14} style={{ color: 'var(--color-text-muted)' }} />
              </button>

              {profileOpen && (
                <div
                  className="absolute right-0 top-12 w-48 rounded-xl overflow-hidden z-50 py-1 animate-fade-in"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <LayoutDashboard size={15} /> Dashboard
                  </Link>
                  <Link
                    to="/admin/profile"
                    className="flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <UserCircle size={15} /> My Profile
                  </Link>
                  <Link
                    to="/admin/settings"
                    className="flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors"
                    style={{ color: 'var(--color-text-secondary)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Settings size={15} /> Settings
                  </Link>
                  <div style={{ borderTop: '1px solid var(--color-border)' }} className="my-1" />
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] transition-colors"
                    style={{ color: 'var(--color-danger)' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-danger-bg)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <LogOut size={15} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div
          className="flex-1 overflow-y-auto"
          style={{ background: 'var(--color-background)' }}
        >
          <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6 lg:py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
