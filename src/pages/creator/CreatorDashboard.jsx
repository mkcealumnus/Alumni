import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { mentorApi } from '@/utils/api';

const CreatorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    courses: 0,
    problems: 0,
    aptitude: 0,
    materials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [cRes, pRes, aRes, mRes] = await Promise.allSettled([
          mentorApi.getCourses(),
          mentorApi.getProblems(),
          mentorApi.getAptitudeTests(),
          mentorApi.getStudyMaterials(),
        ]);

        setCounts({
          courses: cRes.status === 'fulfilled' && cRes.value?.courses ? cRes.value.courses.length : 12,
          problems: pRes.status === 'fulfilled' && pRes.value?.problems ? pRes.value.problems.length : 300,
          aptitude: aRes.status === 'fulfilled' && aRes.value?.tests ? aRes.value.tests.length : 1000,
          materials: mRes.status === 'fulfilled' && mRes.value?.materials ? mRes.value.materials.length : 4,
        });
      } catch (err) {
        console.error('Failed to fetch dashboard stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader fullPage text="Loading Creator Studio..." />;

  const stats = [
    { title: 'Authored Courses', count: counts.courses, icon: 'ri-book-open-line', color: 'from-blue-500 to-indigo-600', link: '/creator/courses' },
    { title: 'Coding Problems', count: counts.problems, icon: 'ri-code-s-slash-line', color: 'from-amber-500 to-orange-600', link: '/creator/problem-solving' },
    { title: 'Aptitude Tests', count: counts.aptitude, icon: 'ri-question-answer-line', color: 'from-emerald-500 to-teal-600', link: '/creator/aptitude' },
    { title: 'Study Resource Guides', count: counts.materials, icon: 'ri-file-text-line', color: 'from-purple-500 to-pink-600', link: '/creator/study-material' }
  ];

  const studioModules = [
    {
      title: 'Course Curriculum Studio',
      desc: 'Design and structure new courses, units, topics, and upload lecture content & reference materials.',
      icon: 'ri-layout-masonry-line',
      color: 'bg-blue-50 text-blue-600 dark-theme:bg-blue-950/40 dark-theme:text-blue-400',
      action: 'Open Studio',
      link: '/creator/courses'
    },
    {
      title: 'Coding Problem Authoring',
      desc: 'Draft algorithmic coding challenges, define test cases, constraints, and initial boilerplate code.',
      icon: 'ri-code-box-line',
      color: 'bg-amber-50 text-amber-600 dark-theme:bg-amber-950/40 dark-theme:text-amber-400',
      action: 'Manage Problems',
      link: '/creator/problem-solving'
    },
    {
      title: 'Aptitude Assessment Bank',
      desc: 'Formulate multiple-choice quantitative, logical, verbal, and technical aptitude test sets.',
      icon: 'ri-checkbox-multiple-line',
      color: 'bg-emerald-50 text-emerald-600 dark-theme:bg-emerald-950/40 dark-theme:text-emerald-400',
      action: 'Question Bank',
      link: '/creator/aptitude'
    },
    {
      title: 'Study Material Repository',
      desc: 'Publish reference PDFs, documentation guides, cheat sheets, and curriculum frameworks.',
      icon: 'ri-folder-open-line',
      color: 'bg-purple-50 text-purple-600 dark-theme:bg-purple-950/40 dark-theme:text-purple-400',
      action: 'Library',
      link: '/creator/study-material'
    }
  ];

  return (
    <DashboardLayout pageTitle="Course Creator Studio" role="creator">
      <div className="space-y-8 max-w-7xl mx-auto">
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 p-8 text-white shadow-lg">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
              Instructional Designer & Content Studio
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">Course Creator Dashboard</h1>
            <p className="text-amber-100 text-sm leading-relaxed">
              Author engaging courses, construct algorithmic problem sets, design comprehensive aptitude test banks, and publish quality study materials for Sowberry learners.
            </p>
          </div>
          <i className="ri-quill-pen-line absolute -right-6 -bottom-8 text-9xl text-white/10 pointer-events-none"></i>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, idx) => (
            <Link key={idx} to={s.link} className="bg-white dark-theme:bg-gray-900 p-6 rounded-2xl border border-sand dark-theme:border-gray-800 hover:shadow-md transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-500 dark-theme:text-gray-400 uppercase tracking-wider">{s.title}</p>
                  <h3 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100 mt-1">{s.count}</h3>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} text-white flex items-center justify-center text-xl shadow-md group-hover:scale-110 transition-transform`}>
                  <i className={s.icon}></i>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Authoring Modules Grid */}
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4 flex items-center gap-2">
            <i className="ri-tools-line text-amber-600"></i> Authoring Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {studioModules.map((m, idx) => (
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
                  <Link to={m.link} className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-colors inline-flex items-center gap-1.5 shadow-sm">
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

export default CreatorDashboard;
