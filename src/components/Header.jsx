import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, Bell, User, LogOut, Shield, GraduationCap, UserCheck, 
  Settings, ChevronDown, Sparkles, ExternalLink, Moon, Sun, 
  SlidersHorizontal, Check, RefreshCw
} from 'lucide-react';
import { MOCK_USERS } from '../data/mockData';

export default function Header({ 
  currentUser, 
  setCurrentUser, 
  onLogout, 
  onOpenAuth, 
  sidebarOpen, 
  setSidebarOpen,
  currentView,
  setCurrentView
}) {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const dropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
        setNotifDropdownOpen(false);
        setRoleSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSwitch = (roleKey) => {
    setCurrentUser(MOCK_USERS[roleKey]);
    setRoleSwitcherOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-sm px-4 sm:px-6 py-3 transition-all">
      <div className="flex items-center justify-between gap-4 max-w-7xl mx-auto" ref={dropdownRef}>
        
        {/* Left Section: Search Bar & View Mode Toggle */}
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roadmaps, alumni, resources, projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>
        </div>

        {/* Right Section: Role Quick-Switcher, Notifications, User Profile Icon & Dropdown */}
        <div className="flex items-center gap-3">
          
          {/* Quick Role Switcher Pill (For Rapid Testing & Demonstration) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold hover:bg-indigo-100 transition-colors"
              title="Quickly switch between Student, Alumni, and Admin roles"
            >
              <RefreshCw className="w-3.5 h-3.5 text-indigo-600" />
              <span>Role: <strong className="capitalize text-slate-900">{currentUser?.role || 'Guest'}</strong></span>
              <ChevronDown className="w-3 h-3 text-indigo-600" />
            </button>

            {roleSwitcherOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Switch Active Role
                </div>
                <button
                  onClick={() => handleRoleSwitch('student')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    currentUser?.role === 'student' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Student</span>
                  </div>
                  {currentUser?.role === 'student' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
                <button
                  onClick={() => handleRoleSwitch('alumni')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    currentUser?.role === 'alumni' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-3.5 h-3.5 text-purple-600" />
                    <span>Alumni Mentor</span>
                  </div>
                  {currentUser?.role === 'alumni' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
                <button
                  onClick={() => handleRoleSwitch('admin')}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium ${
                    currentUser?.role === 'admin' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Admin</span>
                  </div>
                  {currentUser?.role === 'admin' && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              </div>
            )}
          </div>

          {/* View Toggle: Public Portal vs Dashboard */}
          <button
            onClick={() => setCurrentView(currentView === 'landing' ? 'dashboard' : 'landing')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-indigo-600 text-xs font-semibold transition-colors"
          >
            <span>{currentView === 'landing' ? 'Open Dashboard' : 'View Public Site'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-indigo-600 relative transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            </button>

            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-semibold">2 New</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100 space-y-1">
                    <div className="font-semibold text-slate-900">Alumni Response Received</div>
                    <div className="text-slate-600 text-[11px]">Vigneshwaran R. answered your query on Full-Stack transition.</div>
                    <div className="text-[10px] text-indigo-600 font-medium pt-1">10 mins ago</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-semibold text-slate-900">Mock Interview Registration Open</div>
                    <div className="text-slate-600 text-[11px]">15+ alumni mentors online for 1-on-1 sessions.</div>
                    <div className="text-[10px] text-slate-400 font-medium pt-1">2 hours ago</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Icon & Dropdown Menu */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 transition-all"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-indigo-500/30"
                />
                <span className="text-xs font-bold text-slate-900 hidden lg:inline-block max-w-[120px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
              </button>

              {/* User Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-50 divide-y divide-slate-100">
                  
                  {/* User Profile Header */}
                  <div className="pb-3 px-2">
                    <div className="flex items-center gap-3">
                      <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-tight">{currentUser.name}</div>
                        <div className="text-[10px] text-slate-500 truncate max-w-[140px]">{currentUser.email}</div>
                        <span className="inline-block mt-1 text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                          {currentUser.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="py-2 space-y-1 text-xs font-medium">
                    <button
                      onClick={() => {
                        setCurrentView('dashboard');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                      <User className="w-4 h-4 text-indigo-600" />
                      <span>Dashboard Workspace</span>
                    </button>

                    <button
                      onClick={() => {
                        alert(`Account settings for ${currentUser.name}`);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span>Profile & Settings</span>
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-xs font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-200 transition-all flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Login / Register</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
