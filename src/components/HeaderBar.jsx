import React, { useState } from 'react';
import { Sparkles, Bell, Search, UserCheck, ShieldCheck, ExternalLink, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function HeaderBar({ currentRole, setCurrentRole, searchQuery, setSearchQuery, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const notifications = [
    { id: 1, title: 'Mock Interview Drive Open', text: '15+ Alumni mentors available for 1-on-1 mock drives.', time: '10m ago', unread: true },
    { id: 2, title: 'New Resource Added', text: 'Karthik Raja added SDE Interview Master Kit 2026.', time: '1h ago', unread: true },
    { id: 3, title: 'Query Answered', text: 'Vigneshwaran R. answered your question on SDE transition.', time: '1d ago', unread: false },
  ];

  return (
    <div className="bg-slate-900 text-slate-200 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
        
        {/* Top Left Announcement / Institutional Identification */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-indigo-400" /> MKCE Institutional Portal
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 font-medium hidden sm:inline">
            M.Kumarasamy College of Engineering | Alumni Career & Mentorship Network
          </span>
        </div>

        {/* Top Right Utilities: Quick Search, Notifications & Role Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          
          {/* Search Shortcut */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pathways, alumni, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-white text-[11px] placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 w-44 sm:w-56"
            />
          </div>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white relative"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="font-bold text-xs text-slate-900">Notifications</span>
                  <span className="text-[10px] bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full">2 New</span>
                </div>
                <div className="space-y-2">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-2 rounded-lg text-left transition-colors ${n.unread ? 'bg-indigo-50/60 border border-indigo-100' : 'bg-slate-50'}`}>
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-xs text-slate-900">{n.title}</span>
                        <span className="text-[9px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-600/90 text-white font-semibold text-[11px] hover:bg-indigo-600 transition-colors"
            >
              <UserCheck className="w-3 h-3 text-indigo-200" />
              <span>Role: {currentRole}</span>
              <ChevronDown className="w-3 h-3 text-indigo-200" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 text-slate-800 p-1.5 z-50">
                <button
                  onClick={() => { setCurrentRole('Student'); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${currentRole === 'Student' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <span>Student View</span>
                  {currentRole === 'Student' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
                <button
                  onClick={() => { setCurrentRole('Alumni Mentor'); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between ${currentRole === 'Alumni Mentor' ? 'bg-indigo-50 text-indigo-700' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <span>Alumni Mentor View</span>
                  {currentRole === 'Alumni Mentor' && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
