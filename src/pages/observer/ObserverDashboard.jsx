import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';

const ObserverDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader fullPage text="Loading Observer Portal..." />;

  const previews = [
    {
      title: 'Course Catalog & Syllabus',
      desc: 'Browse public course offerings, curriculum roadmaps, prerequisites, and sample lecture previews.',
      icon: 'ri-compass-3-line',
      color: 'bg-blue-50 text-blue-600 dark-theme:bg-blue-950/40 dark-theme:text-blue-400',
      action: 'Explore Catalog',
      link: '/observer/catalog'
    },
    {
      title: 'Aptitude Practice Demos',
      desc: 'Try sample quantitative, logical, verbal, and technical aptitude practice tests.',
      icon: 'ri-lightbulb-line',
      color: 'bg-amber-50 text-amber-600 dark-theme:bg-amber-950/40 dark-theme:text-amber-400',
      action: 'Try Demo Test',
      link: '/observer/aptitude'
    },
    {
      title: 'Interactive Learning Games',
      desc: 'Experience gamified algorithm simulations, sorting visualizers, and maze runner puzzles.',
      icon: 'ri-gamepad-line',
      color: 'bg-emerald-50 text-emerald-600 dark-theme:bg-emerald-950/40 dark-theme:text-emerald-400',
      action: 'Play Demos',
      link: '/observer/games'
    },
    {
      title: 'Public Reference Guides',
      desc: 'View public documentation, reference guides, cheat sheets, and course sample materials.',
      icon: 'ri-file-search-line',
      color: 'bg-purple-50 text-purple-600 dark-theme:bg-purple-950/40 dark-theme:text-purple-400',
      action: 'View Material',
      link: '/observer/materials'
    }
  ];

  return (
    <DashboardLayout pageTitle="Observer Portal" role="observer">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-8 text-white shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              Guest & Observer Read-Only Portal
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">Observer Exploration Portal</h1>
            <p className="text-blue-100 text-sm leading-relaxed">
              Explore the Sowberry learning environment! Audit course catalogs, preview mock aptitude assessments, and try interactive learning game visualizers.
            </p>
          </div>
          <i className="ri-eye-line absolute -right-6 -bottom-8 text-9xl text-white/10 pointer-events-none"></i>
        </div>

        {/* Modules */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4 flex items-center gap-2">
            <i className="ri-search-eye-line text-blue-600"></i> Guest Audit Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {previews.map((m, idx) => (
              <div key={idx} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 flex flex-col justify-between hover:shadow-md transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl ${m.color} flex items-center justify-center text-xl`}>
                      <i className={m.icon}></i>
                    </div>
                    <h3 className="font-bold text-gray-800 dark-theme:text-gray-100">{m.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 dark-theme:text-gray-400 leading-relaxed">{m.desc}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-sand/50 dark-theme:border-gray-800 flex justify-end">
                  <Link to={m.link} className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-1.5">
                    {m.action} <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ObserverDashboard;
