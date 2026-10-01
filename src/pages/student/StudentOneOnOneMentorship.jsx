import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { UserPlus, Star, Calendar, MessageSquare, Search } from 'lucide-react';

const StudentOneOnOneMentorship = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const mentors = [
    { name: "Alex Rivera", role: "Senior Engineer @ Google", skills: ["React", "System Design"], rating: 4.9, reviews: 124 },
    { name: "Priya Sharma", role: "Product Manager @ Stripe", skills: ["Product Strategy", "Agile"], rating: 4.8, reviews: 89 },
    { name: "Michael Chang", role: "Data Scientist @ Meta", skills: ["Machine Learning", "Python"], rating: 5.0, reviews: 200 },
    { name: "Jessica Lee", role: "UX Designer @ Apple", skills: ["Figma", "User Research"], rating: 4.7, reviews: 56 },
  ];

  return (
    <Layout pageTitle="1-on-1 Mentorship" role={role}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search mentors by name, role, or skill..." 
              className="w-full pl-10 pr-4 py-3 bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-800 rounded-xl focus:ring-2 focus:ring-primary focus:outline-none text-sm"
            />
          </div>
          <button className="w-full md:w-auto px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2">
            <UserPlus className="h-5 w-5" />
            Find a Mentor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-sand dark-theme:bg-gray-700 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-gray-500 dark-theme:text-gray-400">
                {mentor.name.charAt(0)}
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-1">{mentor.name}</h3>
              <p className="text-sm text-gray-500 dark-theme:text-gray-400 mb-3">{mentor.role}</p>
              
              <div className="flex items-center gap-1 text-sm font-medium text-amber-500 mb-4">
                <Star className="h-4 w-4 fill-current" />
                <span>{mentor.rating}</span>
                <span className="text-gray-400 dark-theme:text-gray-500 font-normal">({mentor.reviews})</span>
              </div>

              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {mentor.skills.map((skill, j) => (
                  <span key={j} className="px-2 py-1 bg-sand dark-theme:bg-gray-700 text-gray-600 dark-theme:text-gray-300 text-xs rounded-md">
                    {skill}
                  </span>
                ))}
              </div>

              <div className="w-full grid grid-cols-2 gap-2 mt-auto">
                <button className="py-2 px-3 border border-sand dark-theme:border-gray-700 rounded-lg text-sm font-medium hover:bg-cream dark-theme:hover:bg-gray-700 transition-colors flex items-center justify-center">
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button className="py-2 px-3 bg-gray-900 dark-theme:bg-white text-white dark-theme:text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-800 dark-theme:hover:bg-sand transition-colors flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" /> Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StudentOneOnOneMentorship;
