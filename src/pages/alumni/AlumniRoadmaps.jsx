import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Map, Code, Database, LayoutPanelLeft, Rocket } from 'lucide-react';

const AlumniRoadmaps = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const roadmaps = [
    { title: "Frontend Developer", icon: LayoutPanelLeft, steps: 12, completed: 4, desc: "Master HTML, CSS, JavaScript, React, and modern web architecture.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { title: "Backend Developer", icon: Database, steps: 15, completed: 0, desc: "Learn Node.js, databases, APIs, scaling, and system design.", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { title: "Full Stack Developer", icon: Code, steps: 24, completed: 0, desc: "Combine frontend and backend skills to build complete applications.", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20" },
    { title: "AI/ML Engineer", icon: Rocket, steps: 18, completed: 0, desc: "Dive into Python, neural networks, PyTorch, and LLMs.", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" },
  ];

  return (
    <Layout pageTitle="Learning Roadmaps" role={role}>
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Structured Learning Paths</h2>
            <p className="text-white/80 max-w-xl">Follow curated step-by-step guides to master new skills and technologies. Hand-crafted by industry experts.</p>
          </div>
          <Map className="absolute right-4 -bottom-4 w-48 h-48 text-white/10 rotate-12" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {roadmaps.map((map, i) => {
            const progress = (map.completed / map.steps) * 100;
            return (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex gap-6 group cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                <div className={`w-16 h-16 shrink-0 rounded-2xl ${map.bg} flex items-center justify-center`}>
                  <map.icon className={`h-8 w-8 ${map.color}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{map.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{map.desc}</p>
                  
                  {progress > 0 ? (
                    <div>
                      <div className="flex justify-between text-xs mb-1.5 font-medium">
                        <span className="text-indigo-600 dark:text-indigo-400">{map.completed} / {map.steps} steps</span>
                        <span className="text-gray-500">{Math.round(progress)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md">{map.steps} Steps</span>
                      <button className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">Start Path</button>
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
