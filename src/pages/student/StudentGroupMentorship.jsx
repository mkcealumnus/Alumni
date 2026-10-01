import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Users, UsersRound, ArrowRight } from 'lucide-react';

const StudentGroupMentorship = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const groups = [
    { title: "React Masterclass 2026", members: 45, type: "Technical", active: true },
    { title: "Tech Interview Prep", members: 120, type: "Career", active: true },
    { title: "Women in Tech", members: 300, type: "Community", active: true },
    { title: "System Design Circle", members: 85, type: "Advanced", active: false },
  ];

  return (
    <Layout pageTitle="Group Mentorship" role={role}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>Active Groups</h2>
            <p className="text-xs mt-1 font-medium" style={{ color: 'var(--color-text-secondary)' }}>Join a community of like-minded individuals to learn and grow together.</p>
          </div>
          <button 
            className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors shadow-sm self-start sm:self-auto"
            style={{ background: 'var(--color-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            Create Group
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, i) => (
            <div 
              key={i} 
              className="rounded-xl p-6 border shadow-sm relative overflow-hidden flex flex-col transition-all"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex justify-between items-start mb-4">
                <div 
                  className="p-2.5 rounded-lg border"
                  style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}
                >
                  <UsersRound className="h-5 w-5" />
                </div>
                <span 
                  className="px-2.5 py-0.5 text-xs font-medium rounded-md border"
                  style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
                >
                  {group.type}
                </span>
              </div>
              
              <h3 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{group.title}</h3>
              
              <div className="flex items-center gap-2 text-xs mb-6 font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                <Users className="h-3.5 w-3.5" style={{ color: 'var(--color-text-muted)' }} /> {group.members} Members
                {group.active && (
                  <>
                    <span className="w-1 h-1 rounded-full mx-1" style={{ background: 'var(--color-border-strong)' }}></span>
                    <span className="font-semibold" style={{ color: 'var(--color-success)' }}>Active now</span>
                  </>
                )}
              </div>

              <button 
                className="w-full mt-auto py-2.5 border rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-surface-muted)'; e.currentTarget.style.color = 'var(--color-text)'; }}
              >
                Join Group <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StudentGroupMentorship;

