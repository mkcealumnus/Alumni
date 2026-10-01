import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { adminApi } from '@/utils/api';

const ObserverCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await adminApi.getCourses();
        if (res?.success && Array.isArray(res.courses)) {
          setCourses(res.courses);
        }
      } catch (err) {
        console.error('Failed to fetch catalog for observer:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <DashboardLayout pageTitle="Course Catalog Explorer" role="observer">
        <Loader fullPage text="Loading course catalog..." />
      </DashboardLayout>
    );
  }

  const filteredCourses = courses.filter((c) =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout pageTitle="Course Catalog Explorer" role="observer">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Institutional Course Catalog Explorer
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Read-only inspection view of public courses and curriculum structure.
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-white dark-theme:bg-gray-900 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((c) => (
            <div
              key={c.id}
              className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 shadow-sm overflow-hidden flex flex-col hover:border-teal-500/50 transition-all"
            >
              <div className="h-32 bg-gradient-to-r from-teal-500 to-emerald-600 p-5 flex flex-col justify-between text-white relative">
                <span className="self-start px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold">
                  {c.category || 'General'}
                </span>
                <h3 className="font-bold text-lg line-clamp-1">{c.title}</h3>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs text-gray-500 dark-theme:text-gray-400 line-clamp-2">
                  {c.description || 'Comprehensive learning module covering foundational & advanced concepts.'}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-sand dark-theme:border-gray-800 text-xs text-gray-500">
                  <span><i className="ri-user-line mr-1"></i>{c.enrolled || 0} Learners</span>
                  <span className="px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 font-medium capitalize">
                    {c.level || 'Intermediate'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ObserverCatalog;
