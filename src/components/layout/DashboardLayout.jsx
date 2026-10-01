import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal, { getSwalOpts } from '@/utils/swal';
import { useAuth } from '@/context/AuthContext';

const studentNav = [
  { path: '/student', icon: 'ri-dashboard-line', label: 'Dashboard' },
  { path: '/student/my-courses', icon: 'ri-book-open-line', label: 'My Courses' },
  { path: '/student/coding-practice', icon: 'ri-code-s-slash-line', label: 'Coding Practice' },
  { path: '/student/code-editor', icon: 'ri-terminal-box-line', label: 'Code Editor' },
  { path: '/student/aptitude-tests', icon: 'ri-question-answer-line', label: 'Aptitude Tests' },
  { path: '/student/learning-games', icon: 'ri-gamepad-line', label: 'Learning Games' },
  { path: '/student/study-material', icon: 'ri-file-text-line', label: 'Study Material' },
  { path: '/student/my-grades', icon: 'ri-bar-chart-box-line', label: 'My Grades' },
  { path: '/student/my-progress', icon: 'ri-line-chart-line', label: 'My Progress' },
  { path: '/student/my-doubts', icon: 'ri-chat-3-line', label: 'My Doubts' },
  { path: '/student/billing', icon: 'ri-vip-crown-line', label: 'Billing & Plans' },
  { path: '/student/profile', icon: 'ri-user-settings-line', label: 'My Profile' },
];

const alumniNav = [
  { path: '/alumni', icon: 'ri-dashboard-line', label: 'Dashboard' },
  { path: '/alumni/doubts', icon: 'ri-chat-3-line', label: 'Student Doubts' },
  { path: '/alumni/students-progress', icon: 'ri-line-chart-line', label: 'Student Progress' },
  { path: '/alumni/problem-solving', icon: 'ri-code-s-slash-line', label: 'Coding Problems' },
  { path: '/alumni/aptitude', icon: 'ri-question-answer-line', label: 'Aptitude Tests' },
  { path: '/alumni/events', icon: 'ri-calendar-event-line', label: 'Events' },
  { path: '/alumni/discussion', icon: 'ri-discuss-line', label: 'Discussion' },
  { path: '/alumni/profile', icon: 'ri-user-settings-line', label: 'Profile' },
];

const DashboardLayout = ({ children, pageTitle, role = 'student' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const profileRef = useRef(null);

  const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(savedTheme || 'light');

  useEffect(() => {
    if (theme === 'dark-theme') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark-theme' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', newTheme);
  };

  const getNavItems = () => {
    switch (role) {
      case 'alumni':
        return alumniNav;
      default:
        return studentNav;
    }
  };

  const navItems = getNavItems();
  const roleBadgeLabel = role.toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    Swal.fire({ ...getSwalOpts(), title: 'Sign Out?', text: 'Are you sure you want to sign out?', icon: 'question',
      showCancelButton: true, confirmButtonColor: '#d4a574', confirmButtonText: 'Yes, sign out'}).then(result => {
      if (result.isConfirmed) { logout(); navigate('/auth'); }
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-cream dark-theme:bg-gray-950">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-[260px] bg-gray-950 dark-theme:bg-gray-900 flex flex-col transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
            <i className="ri-seedling-fill text-primary-light text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[15px] text-white leading-tight">NextStep</span>
            <span className="text-[10px] font-medium tracking-wider text-gray-500 uppercase">{roleBadgeLabel}</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
          {navItems.map(item => (
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
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-white/10 space-y-0.5">
          {user?.role === 'admin' && role === 'alumni' && (
            <Link
              to="/admin"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-primary-light hover:bg-white/5 hover:text-white transition-all duration-150"
              onClick={() => setSidebarOpen(false)}
            >
              <i className="ri-arrow-left-line text-base"></i>
              <span>Back to Admin</span>
            </Link>
          )}
          <button onClick={handleSignOut} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-gray-400 hover:bg-white/5 hover:text-gray-200 transition-all duration-150">
            <i className="ri-logout-box-line text-base"></i>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="h-14 bg-white dark-theme:bg-gray-900 border-b border-sand dark-theme:border-gray-800 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-cream dark-theme:hover:bg-gray-800 text-gray-600 dark-theme:text-gray-300"
            >
              <i className="ri-menu-line text-xl"></i>
            </button>
            <h1 className="text-base font-bold text-gray-800 dark-theme:text-gray-100">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-700 dark-theme:text-gray-400 dark-theme:hover:text-gray-200 hover:bg-gray-100 dark-theme:hover:bg-gray-800 transition-colors"
              title="Toggle theme"
            >
              <i className={`text-lg ${theme === 'dark-theme' ? 'ri-sun-line' : 'ri-moon-line'}`}></i>
            </button>

            {/* User Profile Menu */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors"
              >
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="" className="w-8 h-8 rounded-lg object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                    {(user?.fullName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline text-xs font-semibold text-gray-700 dark-theme:text-gray-200">
                  {user?.fullName || 'User'}
                </span>
                <i className="ri-arrow-down-s-line text-xs text-gray-400"></i>
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-800 shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-sand dark-theme:border-gray-800">
                    <p className="text-xs font-bold text-gray-800 dark-theme:text-gray-100 truncate">{user?.fullName}</p>
                    <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary uppercase">
                      {role}
                    </span>
                  </div>

                  <Link
                    to={
                      role === 'admin' ? '/admin/profile' :
                      role === 'alumni' ? '/alumni/profile' :
                      '/student/profile'
                    }
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-700 dark-theme:text-gray-300 hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors"
                    onClick={() => setProfileOpen(false)}
                  >
                    <i className="ri-user-settings-line text-base text-gray-400"></i>
                    <span>Profile Settings</span>
                  </Link>

                  <div className="border-t border-sand dark-theme:border-gray-800 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 dark-theme:hover:bg-red-950/30 transition-colors"
                    >
                      <i className="ri-logout-box-line text-base"></i>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-cream/50 dark-theme:bg-gray-950">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
