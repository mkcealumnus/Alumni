import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Map, Code, Database, LayoutPanelLeft, Rocket } from 'lucide-react';

const StudentRoadmaps = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const roadmaps = [
    { title: 'Frontend Developer', icon: LayoutPanelLeft, steps: 12, completed: 4, desc: 'Master HTML, CSS, JavaScript, React, and modern web architecture.', color: '#2563EB', bg: '#E0F2FE' },
    { title: 'Backend Developer', icon: Database, steps: 15, completed: 0, desc: 'Learn Node.js, databases, APIs, scaling, and system design.', color: '#15803D', bg: '#DCFCE7' },
    { title: 'Full Stack Developer', icon: Code, steps: 24, completed: 0, desc: 'Combine frontend and backend skills to build complete applications.', color: '#7C3AED', bg: '#EDE9FE' },
    { title: 'AI/ML Engineer', icon: Rocket, steps: 18, completed: 0, desc: 'Dive into Python, neural networks, PyTorch, and LLMs.', color: '#B91C1C', bg: '#FEE2E2' },
  ];

  return (
    <Layout pageTitle="Learning Roadmaps" role={role}>
      <div className="space-y-6">
        <div className="p-8 rounded-xl" style={{ background: 'var(--color-primary)' }}>
          <h2 className="text-2xl font-bold text-white mb-2">Structured Learning Paths</h2>
          <p className="text-white/80 max-w-xl text-sm">Follow curated step-by-step guides to master new skills and technologies, hand-crafted by industry experts.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {roadmaps.map((map, i) => {
            const progress = (map.completed / map.steps) * 100;
            const Icon = map.icon;
            return (
              <div
                key={i}
                className="p-5 rounded-xl flex gap-5 cursor-pointer transition-all duration-200"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center" style={{ background: map.bg }}>
                  <Icon size={24} style={{ color: map.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold mb-1" style={{ color: 'var(--color-text)' }}>{map.title}</h3>
                  <p className="text-sm mb-3 line-clamp-2" style={{ color: 'var(--color-text-secondary)' }}>{map.desc}</p>
                  {progress > 0 ? (
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-medium">
                        <span style={{ color: 'var(--color-secondary)' }}>{map.completed} / {map.steps} steps</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${progress}%`, background: map.color }} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-md" style={{ background: 'var(--color-surface-muted)', color: 'var(--color-text-muted)' }}>
                        {map.steps} Steps
                      </span>
                      <button className="text-sm font-semibold hover:underline" style={{ color: 'var(--color-secondary)' }}>Start Path</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default StudentRoadmaps;
