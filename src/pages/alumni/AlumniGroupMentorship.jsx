import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Users, UsersRound, ArrowRight, Plus } from 'lucide-react';

const AlumniGroupMentorship = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const groups = [
    { title: "React Masterclass 2026", members: 45, type: "Technical", active: true },
    { title: "Tech Interview Prep", members: 120, type: "Career", active: true },
    { title: "Women in Tech", members: 300, type: "Community", active: true },
    { title: "System Design Circle", members: 85, type: "Advanced", active: false },
  ];

  return (
    <Layout pageTitle="Group Mentorship" role={role}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Active Mentorship Groups</h2>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Join or lead a community cohort to guide students collectively.</p>
          </div>
          <button className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors" style={{ background: 'var(--color-primary)' }}>
            <Plus className="w-4 h-4" /> Create Group
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {groups.map((group, i) => (
            <div key={i} className="rounded-xl p-5 border transition-all hover:shadow-xs flex flex-col justify-between group" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                    <UsersRound className="w-4 h-4" />
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                    {group.type}
                  </span>
                </div>

                <h3 className="text-sm font-bold mb-2" style={{ color: 'var(--color-text)' }}>{group.title}</h3>

                <div className="flex items-center gap-2 text-xs mb-6" style={{ color: 'var(--color-text-muted)' }}>
                  <Users className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {group.members} Members
                  {group.active && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
                      <span className="text-emerald-600 font-medium text-[11px]">Active cohort</span>
                    </>
                  )}
                </div>
              </div>

              <button className="w-full py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors hover:opacity-80" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                View Group <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AlumniGroupMentorship;
