import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Briefcase, BookOpen, Compass, ChevronRight, TrendingUp } from 'lucide-react';

const StudentCareerGuidance = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const resources = [
    { title: "Resume Building", icon: BookOpen, desc: "Learn how to craft a standout resume that gets past ATS.", color: "bg-blue-100 text-blue-600 dark-theme:bg-blue-900/30 dark-theme:text-blue-400" },
    { title: "Interview Prep", icon: Briefcase, desc: "Master the most common behavioral and technical questions.", color: "bg-emerald-100 text-emerald-600 dark-theme:bg-emerald-900/30 dark-theme:text-emerald-400" },
    { title: "Industry Trends", icon: TrendingUp, desc: "Stay updated with the latest in tech, business, and design.", color: "bg-purple-100 text-purple-600 dark-theme:bg-purple-900/30 dark-theme:text-purple-400" },
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
            Discover paths, get resume advice, and prepare for your dream job with curated resources and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${res.color} mb-4`}>
                <res.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100 mb-2">{res.title}</h3>
              <p className="text-gray-500 dark-theme:text-gray-400 mb-4">{res.desc}</p>
              <div className="flex items-center text-sm font-semibold text-primary dark-theme:text-primary-light group-hover:underline">
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm mt-6">
          <h2 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100 mb-4">Upcoming Counseling Sessions</h2>
          <div className="space-y-4">
             <div className="flex items-center justify-between p-4 rounded-xl bg-cream dark-theme:bg-gray-700/50">
               <div>
                 <h4 className="font-semibold text-gray-800 dark-theme:text-gray-100">Transitioning to Product Management</h4>
                 <p className="text-sm text-gray-500 dark-theme:text-gray-400">By Sarah Jenkins • Oct 15, 2:00 PM</p>
               </div>
               <button className="px-4 py-2 bg-white dark-theme:bg-gray-600 border border-sand dark-theme:border-gray-500 rounded-lg text-sm font-medium hover:bg-cream dark-theme:hover:bg-gray-500 transition-colors">
                 Register
               </button>
             </div>
             <div className="flex items-center justify-between p-4 rounded-xl bg-cream dark-theme:bg-gray-700/50">
               <div>
                 <h4 className="font-semibold text-gray-800 dark-theme:text-gray-100">Negotiating Your First Salary</h4>
                 <p className="text-sm text-gray-500 dark-theme:text-gray-400">By David Chen • Oct 18, 4:00 PM</p>
               </div>
               <button className="px-4 py-2 bg-white dark-theme:bg-gray-600 border border-sand dark-theme:border-gray-500 rounded-lg text-sm font-medium hover:bg-cream dark-theme:hover:bg-gray-500 transition-colors">
                 Register
               </button>
             </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentCareerGuidance;
