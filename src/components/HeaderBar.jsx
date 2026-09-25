import React, { useState, useEffect } from 'react';
import { Sparkles, Bell, Search, UserCheck, ShieldCheck, ChevronDown, CheckCircle2, X } from 'lucide-react';

export default function HeaderBar({ currentRole, setCurrentRole, searchQuery, setSearchQuery, onNavigate }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'New Event Published', text: 'Off-Campus SDE Hiring Masterclass by Vigneshwaran R. (Amazon)', time: '10m ago', unread: true },
    { id: 2, title: 'Resource Updated', text: 'FAANG-Approved Overleaf ATS Resume Template updated by Jayanthan S.', time: '1h ago', unread: false }
  ]);

  // Auto-dismiss popovers when user scrolls the page, uses mousewheel, touches, or presses Escape
  useEffect(() => {
    const dismissPopovers = () => {
      setShowNotifications(false);
      setShowRoleDropdown(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        dismissPopovers();
      }
    };

    window.addEventListener('scroll', dismissPopovers, { capture: true, passive: true });
    window.addEventListener('wheel', dismissPopovers, { passive: true });
    window.addEventListener('touchmove', dismissPopovers, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', dismissPopovers, { capture: true });
      window.removeEventListener('wheel', dismissPopovers);
      window.removeEventListener('touchmove', dismissPopovers);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-slate-950 text-slate-200 text-xs border-b border-slate-800 backdrop-blur-md relative z-[60]">
      
      {/* Invisible backdrop to dismiss popovers on click or scroll outside */}
      {(showNotifications || showRoleDropdown) && (
        <div
          className="fixed inset-0 z-[65] bg-transparent"
          onClick={() => {
            setShowNotifications(false);
            setShowRoleDropdown(false);
          }}
          onWheel={() => {
            setShowNotifications(false);
            setShowRoleDropdown(false);
          }}
          onTouchMove={() => {
            setShowNotifications(false);
            setShowRoleDropdown(false);
          }}
        />
      )}

      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12 py-2 flex flex-col md:flex-row md:items-center justify-between gap-2">
        
        {/* Top Left Announcement / Institutional Identification */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 font-mono text-[10px] font-semibold border border-orange-500/30 flex items-center gap-1.5 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
            <ShieldCheck className="w-3 h-3 text-orange-400" /> MKCE Institutional Portal
          </span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-300 font-medium text-xs hidden sm:inline">
            M.Kumarasamy College of Engineering | Verified Alumni Network
          </span>
        </div>

        {/* Top Right Utilities: Quick Search, Notifications & Role Switcher */}
        <div className="flex items-center justify-between md:justify-end gap-3">
          
          {/* Search Shortcut */}
          <div className="relative flex-1 sm:flex-initial">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pathways, alumni..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-8 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-200 text-[11px] placeholder:text-slate-500 focus:outline-none focus:border-orange-500/60 w-full sm:w-56 md:w-64 transition-all font-mono"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700 hidden sm:inline">⌘K</span>
          </div>

          {/* Notifications Toggle */}
          <div className="relative z-[70]">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowRoleDropdown(false);
              }}
              className="p-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-orange-500/40 relative transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              {notifications.some(n => n.unread) && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              )}
            </button>

            {/* Notifications Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2.5 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 p-3.5 z-[75] animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-xs text-slate-900 font-mono">Platform Updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] bg-orange-50 text-orange-700 border border-orange-200 font-mono font-semibold px-2 py-0.5 rounded-full">{notifications.length} New</span>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-700 text-xs font-bold p-0.5 cursor-pointer">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 text-center">No new notifications</p>
                ) : (
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-2.5 rounded-xl text-left transition-colors ${n.unread ? 'bg-orange-50/90 border border-orange-200/90' : 'bg-slate-50 border border-slate-100'}`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-slate-900">{n.title}</span>
                          <span className="text-[9px] font-mono text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-snug">{n.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Role Switcher Pill */}
          <div className="relative z-[70]">
            <button
              onClick={() => {
                setShowRoleDropdown(!showRoleDropdown);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono text-[11px] font-semibold transition-all shadow-md shadow-orange-500/20 cursor-pointer"
            >
              <UserCheck className="w-3 h-3 text-orange-200" />
              <span>{currentRole}</span>
              <ChevronDown className="w-3 h-3 text-orange-200" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2.5 w-48 bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 p-1.5 z-[75] animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => { setCurrentRole('Student'); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${currentRole === 'Student' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <span>Student View</span>
                  {currentRole === 'Student' && <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />}
                </button>
                <button
                  onClick={() => { setCurrentRole('Alumni Mentor'); setShowRoleDropdown(false); }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${currentRole === 'Alumni Mentor' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'hover:bg-slate-50 text-slate-700'}`}
                >
                  <span>Alumni Mentor View</span>
                  {currentRole === 'Alumni Mentor' && <CheckCircle2 className="w-3.5 h-3.5 text-orange-600" />}
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
