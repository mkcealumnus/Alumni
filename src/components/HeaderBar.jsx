import React, { useState } from 'react';
import { Sparkles, Bell, Search, UserCheck, ShieldCheck, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function HeaderBar({ currentRole, setCurrentRole, searchQuery, setSearchQuery, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New Event Published', text: 'Off-Campus SDE Hiring Masterclass by Vigneshwaran R. (Amazon)', time: '10m ago', unread: true },
    { id: 2, title: 'Resource Updated', text: 'FAANG-Approved Overleaf ATS Resume Template updated by Jayanthan S.', time: '1h ago', unread: false }
  ]);

  return (
    <div className="bg-[#070709]/95 text-zinc-300 text-xs border-b border-white/5 backdrop-blur-md relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
        
        {/* Top Left Announcement / Institutional Identification */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 font-mono text-[10px] font-semibold border border-orange-500/20 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <ShieldCheck className="w-3 h-3 text-orange-400" /> MKCE Institutional Portal
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-zinc-400 font-medium text-xs hidden sm:inline">
            M.Kumarasamy College of Engineering | Verified Alumni Network
          </span>
        </div>

        {/* Top Right Utilities: Quick Search, Notifications & Role Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          
          {/* Search Shortcut */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pathways, alumni, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-8 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-200 text-[11px] placeholder:text-zinc-500 focus:outline-none focus:border-orange-500/50 w-44 sm:w-60 transition-all font-mono"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-zinc-500 bg-zinc-800/80 px-1.5 py-0.5 rounded border border-white/5">⌘K</span>
          </div>

          {/* Notifications Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-zinc-100 hover:border-orange-500/40 relative transition-all"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              {notifications.some(n => n.unread) && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#121318] rounded-2xl shadow-2xl border border-white/10 text-zinc-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                  <span className="font-bold text-xs text-zinc-100 font-mono">Platform Updates</span>
                  <span className="text-[10px] bg-orange-500/10 text-orange-400 border border-orange-500/20 font-mono font-semibold px-2 py-0.5 rounded-full">{notifications.length} New</span>
                </div>
                {notifications.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-3 text-center">No new notifications</p>
                ) : (
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl text-left transition-colors ${n.unread ? 'bg-orange-500/10 border border-orange-500/20' : 'bg-zinc-900/60 border border-white/5'}`}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-bold text-xs text-zinc-100">{n.title}</span>
                          <span className="text-[9px] font-mono text-zinc-500">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-zinc-400 leading-snug">{n.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-[11px] font-semibold transition-all shadow-md shadow-orange-500/15"
            >
              <UserCheck className="w-3 h-3 text-orange-200" />
              <span>View: {currentRole}</span>
              <ChevronDown className="w-3 h-3 text-orange-200" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-[#121318] rounded-2xl shadow-2xl border border-white/10 text-zinc-200 p-1.5 z-50">
                <button
                  onClick={() => { setCurrentRole('Student'); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${currentRole === 'Student' ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30' : 'hover:bg-zinc-800 text-zinc-300'}`}
                >
                  <span>Student View</span>
                  {currentRole === 'Student' && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                </button>
                <button
                  onClick={() => { setCurrentRole('Alumni Mentor'); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${currentRole === 'Alumni Mentor' ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30' : 'hover:bg-zinc-800 text-zinc-300'}`}
                >
                  <span>Alumni Mentor View</span>
                  {currentRole === 'Alumni Mentor' && <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
