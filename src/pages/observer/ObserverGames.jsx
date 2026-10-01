import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ObserverGames = () => {
  const [games] = useState([
    { id: 'memory', name: 'Code Memory Match', category: 'Logic & Memory', difficulty: 'Easy', status: 'Demo Available' },
    { id: 'quiz', name: 'Algo Quiz Challenge', category: 'Algorithms', difficulty: 'Medium', status: 'Demo Available' },
    { id: 'speed', name: 'Syntax Speed Run', category: 'Speed Coding', difficulty: 'Hard', status: 'Demo Available' },
    { id: 'word', name: 'Tech Word Unscramble', category: 'Terminology', difficulty: 'Easy', status: 'Demo Available' },
  ]);

  return (
    <DashboardLayout pageTitle="Learning Games Preview" role="observer">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Interactive Learning Games Preview
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Sample gamified learning modules designed for engaging technical education.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 font-semibold text-xs border border-teal-500/20">
            <i className="ri-[#Gamepad]-line mr-1"></i> Observer Preview
          </span>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((g) => (
            <div
              key={g.id}
              className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col justify-between hover:border-teal-500/50 transition-all"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-600 font-bold text-2xl mb-4">
                  <i className="ri-gamepad-line"></i>
                </div>
                <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-lg">
                  {g.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{g.category}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand dark-theme:border-gray-800 flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-teal-500/10 text-teal-600">
                  {g.difficulty}
                </span>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark-theme:bg-gray-800 text-gray-500 text-xs font-semibold cursor-not-allowed opacity-75"
                >
                  Demo Mode
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ObserverGames;
