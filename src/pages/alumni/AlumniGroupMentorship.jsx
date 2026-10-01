import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Users, UsersRound, ArrowRight } from 'lucide-react';

const AlumniGroupMentorship = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const groups = [
    { title: "React Masterclass 2026", members: 45, type: "Technical", active: true, color: "bg-cyan-500" },
    { title: "Tech Interview Prep", members: 120, type: "Career", active: true, color: "bg-indigo-500" },
    { title: "Women in Tech", members: 300, type: "Community", active: true, color: "bg-pink-500" },
    { title: "System Design Circle", members: 85, type: "Advanced", active: false, color: "bg-orange-500" },
  ];

  return (
    <Layout pageTitle="Group Mentorship" role={role}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Active Groups</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Join a community of like-minded individuals to learn and grow together.</p>
          </div>
          <button className="px-5 py-2.5 bg-c-black dark:bg-white text-white dark:text-black rounded-xl font-medium transition-colors">
            Create Group
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden group hover:border-c-blue/50 transition-colors">
              <div className={`absolute top-0 left-0 w-full h-1 ${group.color}`}></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50`}>
                  <UsersRound className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                </div>
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs font-medium rounded-full">
                  {group.type}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{group.title}</h3>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <Users className="h-4 w-4" /> {group.members} Members
                {group.active && (
                  <>
                    <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                    <span className="text-green-500 font-medium">Active now</span>
                  </>
                )}
              </div>

              <button className="w-full py-2.5 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2">
                Join Group <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AlumniGroupMentorship;
