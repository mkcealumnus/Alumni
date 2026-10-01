import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Map, Code, Database, LayoutPanelLeft, Rocket, Plus } from 'lucide-react';

const AlumniRoadmaps = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const roadmaps = [
    { title: "Frontend Developer", icon: LayoutPanelLeft, steps: 12, completed: 4, desc: "Master HTML, CSS, JavaScript, React, and modern web architecture." },
    { title: "Backend Developer", icon: Database, steps: 15, completed: 0, desc: "Learn Node.js, databases, APIs, scaling, and system design." },
    { title: "Full Stack Developer", icon: Code, steps: 24, completed: 0, desc: "Combine frontend and backend skills to build complete applications." },
    { title: "AI/ML Engineer", icon: Rocket, steps: 18, completed: 0, desc: "Dive into Python, neural networks, PyTorch, and LLMs." },
  ];

  return (
    <Layout pageTitle="Learning Roadmaps" role={role}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Structured Learning Paths</h2>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Follow step-by-step guides to master new skills and career tracks.</p>
          </div>
          <button className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
            <Plus className="w-4 h-4" /> Create Path
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {roadmaps.map((map, i) => {
            const progress = (map.completed / map.steps) * 100;
            return (
              <div key={i} className="rounded-xl p-5 border transition-all hover:shadow-xs flex gap-4 group" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                  <map.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>{map.title}</h3>
                  <p className="text-xs mb-4 line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{map.desc}</p>
                  
                  {progress > 0 ? (
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-semibold">
                        <span style={{ color: 'var(--color-primary)' }}>{map.completed} / {map.steps} steps</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full rounded-full h-2 overflow-hidden" style={{ background: 'var(--color-border)' }}>
                        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, background: 'var(--color-primary)' }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>{map.steps} Steps</span>
                      <button className="text-xs font-semibold hover:underline" style={{ color: 'var(--color-primary)' }}>Start Path</button>
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

export default AlumniRoadmaps;
