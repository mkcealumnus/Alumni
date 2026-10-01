import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ObserverMaterials = () => {
  const [materials] = useState([
    { id: 1, title: 'HTML5 Semantics & Modern CSS3 Layouts', type: 'PDF Handbook', category: 'Web Dev' },
    { id: 2, title: 'JavaScript ES6+ Deep Dive Guide', type: 'Cheatsheet', category: 'JS Core' },
    { id: 3, title: 'React State Management Blueprints', type: 'Reference Doc', category: 'Frontend' },
  ]);

  return (
    <DashboardLayout pageTitle="Reference Guides & Sample Materials" role="observer">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Sample Study & Reference Materials
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Read-only view of course handbooks, cheat sheets, and curriculum documentation.
            </p>
          </div>
        </div>

        {/* Materials List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {materials.map((m) => (
            <div
              key={m.id}
              className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col justify-between hover:border-teal-500/50 transition-all"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-600 font-bold text-lg mb-3">
                  <i className="ri-article-line"></i>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-600 text-xs font-semibold">
                  {m.category}
                </span>
                <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mt-2 text-base">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{m.type}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand dark-theme:border-gray-800 flex justify-end">
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark-theme:bg-gray-800 text-gray-500 text-xs font-semibold cursor-not-allowed opacity-75"
                >
                  Preview Document
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ObserverMaterials;
