import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Video, Calendar, Clock, Plus } from 'lucide-react';

const AlumniWorkshops = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const workshops = [
    { title: "Building Scalable Systems", date: "Oct 20, 2026", time: "10:00 AM PST", speaker: "Dr. Alan Turing", img: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=400&q=80" },
    { title: "React Server Components", date: "Oct 25, 2026", time: "1:00 PM PST", speaker: "Dan Abramov", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80" },
    { title: "Design Systems in Figma", date: "Nov 02, 2026", time: "9:00 AM PST", speaker: "Diana M.", img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80" },
  ];

  return (
    <Layout pageTitle="Workshops & Webinars" role={role}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Workshops & Webinars</h2>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>Host or attend interactive technical and career development workshops.</p>
          </div>
          <button className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
            <Plus className="w-4 h-4" /> Host Workshop
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {workshops.map((workshop, i) => (
            <div key={i} className="rounded-xl overflow-hidden border transition-all hover:shadow-xs flex flex-col group" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="h-44 relative overflow-hidden bg-slate-100">
                <img src={workshop.img} alt={workshop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1.5 shadow-2xs" style={{ color: 'var(--color-text)' }}>
                  <Video className="w-3.5 h-3.5 text-red-500" /> Live Event
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold mb-1 line-clamp-2" style={{ color: 'var(--color-text)' }}>{workshop.title}</h3>
                  <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>By {workshop.speaker}</p>
                </div>

                <div>
                  <div className="space-y-1.5 text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {workshop.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {workshop.time}
                    </div>
                  </div>

                  <button className="w-full py-2.5 text-white text-xs font-semibold rounded-lg transition-colors hover:opacity-90 shadow-xs" style={{ background: 'var(--color-primary)' }}>
                    Reserve Spot
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AlumniWorkshops;
