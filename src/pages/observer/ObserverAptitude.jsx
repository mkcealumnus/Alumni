import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi } from '@/utils/api';

const ObserverAptitude = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await studentApi.getAptitudeTests();
        if (res?.success && Array.isArray(res.tests)) {
          setTests(res.tests);
        }
      } catch (err) {
        console.error('Failed to fetch aptitude tests for observer:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return (
      <DashboardLayout pageTitle="Public Aptitude Assessment Demos" role="observer">
        <Loader fullPage text="Loading sample aptitude assessments..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Public Aptitude Assessment Demos" role="observer">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Sample Aptitude Assessment Demos
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Read-only inspection of institutional quantitative, logical, and verbal aptitude exams.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 font-semibold text-xs border border-teal-500/20">
            <i className="ri-eye-line mr-1"></i> Observer Mode
          </span>
        </div>

        {/* Aptitude Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((t) => (
            <div
              key={t.id}
              className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col justify-between hover:border-teal-500/50 transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-1 rounded-md bg-teal-500/10 text-teal-600 font-semibold text-xs">
                    {t.category || 'General'}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    <i className="ri-time-line mr-1"></i>{t.durationMinutes || 30} mins
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-lg mb-2">
                  {t.title}
                </h3>
                <p className="text-xs text-gray-500 dark-theme:text-gray-400 line-clamp-2">
                  {t.description || 'Standard institutional aptitude testing set.'}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-sand dark-theme:border-gray-800 flex items-center justify-between">
                <span className="text-xs text-gray-400">{t.totalQuestions || 20} Questions</span>
                <button
                  disabled
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark-theme:bg-gray-800 text-gray-500 text-xs font-semibold cursor-not-allowed opacity-75"
                >
                  Demo View Only
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ObserverAptitude;
