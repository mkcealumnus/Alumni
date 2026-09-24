import React from 'react';
import { 
  LayoutDashboard, Compass, BookOpen, MessageSquare, GitFork, 
  UserCheck, Shield, Calendar, ChevronLeft, ChevronRight, 
  Sparkles, Layers
} from 'lucide-react';

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  currentUser, 
  collapsed, 
  setCollapsed 
}) {
  const role = currentUser?.role || 'student';

  const menuItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard, roles: ['student', 'alumni', 'admin'] },
    { id: 'pathways', label: 'Career Roadmaps', icon: Compass, roles: ['student', 'alumni', 'admin'] },
    { id: 'resources', label: 'Resource Library', icon: BookOpen, roles: ['student', 'alumni', 'admin'] },
    { id: 'mentorship', label: 'Alumni Q&A Forum', icon: MessageSquare, roles: ['student', 'alumni', 'admin'] },
    { id: 'forks', label: 'Forks & Student Projects', icon: GitFork, roles: ['student', 'alumni', 'admin'], badge: 'New' },
    { id: 'alumni', label: 'Alumni Mentor Portal', icon: UserCheck, roles: ['alumni', 'admin'], badge: 'Alumni' },
    { id: 'admin', label: 'Admin Control Center', icon: Shield, roles: ['admin'], badge: 'Admin' },
    { id: 'notice-board', label: 'Notice Board & Events', icon: Calendar, roles: ['student', 'alumni', 'admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <aside className={`bg-white border-r border-slate-200/90 h-[calc(100vh-61px)] sticky top-[61px] flex flex-col justify-between transition-all duration-300 z-30 ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      
      {/* Top Sidebar Section */}
      <div className="p-3 space-y-4">
        
        {/* Workspace Role Header */}
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 block">
                {role} Workspace
              </span>
              <span className="text-xs font-bold text-slate-900 truncate block max-w-[130px]">
                {currentUser?.name || 'Guest User'}
              </span>
            </div>
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              MK
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                
                {!collapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide ${
                        isActive ? 'bg-white/20 text-white' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

      </div>

      {/* Bottom Collapse Toggle */}
      <div className="p-3 border-t border-slate-200/80">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 transition-colors text-xs font-semibold"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <div className="flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Collapse Sidebar</div>}
        </button>
      </div>

    </aside>
  );
}
