import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Briefcase, BookOpen, Compass, ChevronRight, TrendingUp } from 'lucide-react';

const AlumniCareerGuidance = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const resources = [
    { title: "Resume Building", icon: BookOpen, desc: "Learn how to craft a standout resume that gets past ATS.", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { title: "Interview Prep", icon: Briefcase, desc: "Master the most common behavioral and technical questions.", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { title: "Industry Trends", icon: TrendingUp, desc: "Stay updated with the latest in tech, business, and design.", color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
  ];

  return (
    <Layout pageTitle="Career Guidance" role={role}>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-c-blue to-c-teal rounded-2xl p-8 text-white shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <Compass className="h-10 w-10 text-white/90" />
            <h1 className="text-3xl font-bold">Navigate Your Career</h1>
          </div>
          <p className="text-white/80 max-w-2xl text-lg">
            Share your journey, find lateral opportunities, or pivot into a new field with our exclusive alumni career resources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${res.color} mb-4`}>
                <res.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{res.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{res.desc}</p>
              <div className="flex items-center text-sm font-semibold text-c-blue dark:text-c-blue-light group-hover:underline">
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm mt-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Upcoming Counseling Sessions</h2>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
               <div>
                 <h4 className="font-semibold text-gray-800 dark:text-white">Transitioning to Product Management</h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400">By Sarah Jenkins • Oct 15, 2:00 PM</p>
               </div>
               <button className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                 Register
               </button>
             </div>
             <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
               <div>
                 <h4 className="font-semibold text-gray-800 dark:text-white">Negotiating Your First Salary</h4>
                 <p className="text-sm text-gray-500 dark:text-gray-400">By David Chen • Oct 18, 4:00 PM</p>
               </div>
               <button className="px-4 py-2 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors">
                 Register
               </button>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AlumniCareerGuidance;
