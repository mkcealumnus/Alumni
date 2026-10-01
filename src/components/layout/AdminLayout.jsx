import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'light');
  const profileRef = useRef(null);
  const notificationsRef = useRef(null);

  useEffect(() => {
    if (theme === 'dark-theme') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

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

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark-theme' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', newTheme);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    setProfileOpen(false);
  };

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
    Swal.fire({ ...getSwalOpts(), title: 'Sign Out?', text: 'Are you sure you want to sign out?', icon: 'question',
      showCancelButton: true, confirmButtonColor: '#d4a574', confirmButtonText: 'Yes, sign out'}).then(result => {
      if (result.isConfirmed) { logout(); navigate('/auth'); }
    });
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const navItems = [
    { path: '/admin', icon: 'ri-dashboard-line', label: 'Dashboard' },
    { path: '/admin/manage-students', icon: 'ri-user-line', label: 'Students' },
    { path: '/admin/manage-mentors', icon: 'ri-team-line', label: 'Mentors' },
    { path: '/admin/courses-overview', icon: 'ri-book-open-line', label: 'Courses' },
    { type: 'separator', label: 'Content Management' },
    { path: '/admin/problem-solving', icon: 'ri-code-s-slash-line', label: 'Problem Solving' },
    { path: '/admin/aptitude', icon: 'ri-question-answer-line', label: 'Aptitude Tests' },
    { path: '/admin/events', icon: 'ri-calendar-event-line', label: 'Events' },
    { path: '/admin/discussion', icon: 'ri-discuss-line', label: 'Discussion' },
    { type: 'separator', label: 'Mentor & Students' },
    { path: '/admin/doubts', icon: 'ri-chat-3-line', label: 'Student Doubts' },
    { path: '/admin/students-progress', icon: 'ri-line-chart-line', label: 'Student Progress' },

    { type: 'separator', label: 'Reports & Settings' },

    { path: '/admin/performance-analytics', icon: 'ri-line-chart-line', label: 'Analytics' },
    { path: '/admin/system-reports', icon: 'ri-file-chart-line', label: 'Reports' },
    { path: '/admin/manage-requests', icon: 'ri-git-pull-request-line', label: 'Requests' },
    { path: '/admin/settings', icon: 'ri-settings-line', label: 'Settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-cream dark-theme:bg-gray-950">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Menu Toggle */}
      <button
        className="fixed top-3 left-3 z-50 lg:hidden w-9 h-9 rounded-lg bg-white dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 shadow-sm flex items-center justify-center text-gray-600 dark-theme:text-gray-400"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <i className="ri-menu-line text-lg"></i>
      </button>

      {/* Sidebar — Claude-style dark sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-gray-950 dark-theme:bg-gray-900 flex flex-col transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <i className="ri-seedling-fill text-primary-light text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-white leading-tight">NextStep</span>
            <span className="text-[10px] font-medium tracking-wider text-gray-500 uppercase">ADMIN</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
          {navItems.map((item, index) => (
            item.type === 'separator' ? (
              <div key={`sep-${index}`} className="pt-4 pb-1.5 px-3">
                <p className="text-[10px] font-semibold tracking-wider text-gray-600 uppercase">{item.label}</p>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150
                  ${location.pathname === item.path
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <i className={`${item.icon} text-base`}></i>
                <span>{item.label}</span>
              </Link>
            )
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-white/10">
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all duration-150">
            <i className="ri-logout-box-line text-base"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white dark-theme:bg-gray-900 border-b border-sand dark-theme:border-gray-800 flex items-center justify-between px-4 lg:px-6 shrink-0">
          {/* Search */}
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <div className="relative w-full hidden sm:block">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-[13px] text-gray-700 dark-theme:text-gray-200 transition-colors"
              />
            </div>
          </div>

          {/* Header Tools */}
          <div className="flex items-center gap-1">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark-theme:text-gray-400 hover:bg-cream-dark dark-theme:hover:bg-gray-800 hover:text-gray-700 dark-theme:hover:text-gray-200 transition-colors"
            >
              <i className={theme === 'dark-theme' ? 'ri-moon-line text-base' : 'ri-sun-line text-base'}></i>
            </button>

            {/* Notifications */}
            <div ref={notificationsRef} className="relative">
              <button
                onClick={toggleNotifications}
                className="relative w-9 h-9 rounded-lg flex items-center justify-center text-gray-500 dark-theme:text-gray-400 hover:bg-cream-dark dark-theme:hover:bg-gray-800 hover:text-gray-700 dark-theme:hover:text-gray-200 transition-colors"
              >
                <i className="ri-notification-3-line text-base"></i>
                {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-11 w-80 bg-white dark-theme:bg-gray-900 rounded-xl shadow-lg border border-sand dark-theme:border-gray-800 overflow-hidden z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-sand dark-theme:border-gray-800">
                    <h4 className="font-semibold text-gray-800 dark-theme:text-gray-200 text-[13px]">Notifications</h4>
                    <button onClick={handleMarkAllRead} className="text-xs text-primary hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="px-4 py-6 text-center text-sm text-gray-400">No notifications</p>
                    ) : notifications.slice(0, 5).map((n, i) => (
                      <div key={n.id || i} className={`flex items-start gap-3 px-4 py-3 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors cursor-pointer ${!n.isRead ? 'bg-primary/5' : ''}`}>
                        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <i className={`ri-notification-3-line text-primary text-xs`}></i>
                        </div>
                        <div>
                          <p className="text-[13px] text-gray-700 dark-theme:text-gray-200">{n.title || n.message}</p>
                          <span className="text-[11px] text-gray-400">{n.createdAt ? new Date(n.createdAt).toLocaleDateString() : ''}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-sand dark-theme:border-gray-800 p-2">
                    <button className="w-full text-center text-[13px] text-primary hover:bg-primary/5 rounded-lg py-2 transition-colors">View all</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div ref={profileRef} className="relative ml-1">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotificationsOpen(false); }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-cream-dark dark-theme:hover:bg-gray-800 transition-colors"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || 'Admin')}&size=28&background=c96442&color=fff&bold=true`}
                  alt="User"
                  className="w-7 h-7 rounded-md"
                />
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-[13px] font-medium text-gray-700 dark-theme:text-gray-200">{user?.fullName || 'Admin'}</span>
                </div>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-11 w-44 bg-white dark-theme:bg-gray-900 rounded-xl shadow-lg border border-sand dark-theme:border-gray-800 overflow-hidden z-50 py-1">
                  <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
                    <i className="ri-dashboard-line text-sm"></i> Dashboard
                  </Link>
                  <Link to="/admin/profile" className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
                    <i className="ri-user-line text-sm"></i> My Profile
                  </Link>
                  <Link to="/admin/settings" className="flex items-center gap-2 px-3 py-2 text-[13px] text-gray-700 dark-theme:text-gray-200 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
                    <i className="ri-settings-line text-sm"></i> Settings
                  </Link>
                  <div className="border-t border-sand dark-theme:border-gray-800 my-1"></div>
                  <button onClick={handleSignOut} className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-danger hover:bg-danger/5 transition-colors">
                    <i className="ri-logout-box-line text-sm"></i> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-5 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
