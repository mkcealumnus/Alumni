import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Video, Calendar, Clock } from 'lucide-react';

const StudentWorkshops = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const workshops = [
    { title: "Building Scalable Systems", date: "Oct 20, 2026", time: "10:00 AM PST", speaker: "Dr. Alan Turing", img: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=400&q=80" },
    { title: "React Server Components", date: "Oct 25, 2026", time: "1:00 PM PST", speaker: "Dan Abramov", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" },
    { title: "Design Systems in Figma", date: "Nov 02, 2026", time: "9:00 AM PST", speaker: "Diana M.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <Layout pageTitle="Workshops & Webinars" role={role}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {workshops.map((workshop, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-900 rounded-2xl overflow-hidden border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col group">
              <div className="h-48 relative overflow-hidden">
                <img src={workshop.img} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm dark-theme:bg-gray-950/80 px-3 py-1 rounded-full text-xs font-bold text-gray-900 dark-theme:text-gray-100 flex items-center gap-1.5">
                  <Video className="h-3.5 w-3.5 text-red-500" /> Live Event
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100 mb-2 line-clamp-2">{workshop.title}</h3>
                <p className="text-sm text-gray-500 dark-theme:text-gray-400 mb-4">By {workshop.speaker}</p>
                
                <div className="mt-auto space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600 dark-theme:text-gray-300">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" /> {workshop.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark-theme:text-gray-300">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" /> {workshop.time}
                  </div>
                </div>

                <button className="w-full py-2.5 bg-gray-900 dark-theme:bg-white text-white dark-theme:text-gray-900 rounded-xl font-medium hover:opacity-90 transition-opacity">
                  Reserve Spot
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StudentWorkshops;
