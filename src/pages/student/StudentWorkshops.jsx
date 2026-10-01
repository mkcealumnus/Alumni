import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Video, Calendar, Clock } from 'lucide-react';

const StudentWorkshops = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const workshops = [
    { title: 'Building Scalable Systems', date: 'Oct 20, 2026', time: '10:00 AM IST', speaker: 'Dr. Alan Turing', img: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=400&q=80' },
    { title: 'React Server Components', date: 'Oct 25, 2026', time: '1:00 PM IST', speaker: 'Dan Abramov', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80' },
    { title: 'Design Systems in Figma', date: 'Nov 02, 2026', time: '9:00 AM IST', speaker: 'Diana M.', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80' },
  ];

  return (
    <Layout pageTitle="Workshops & Webinars" role={role}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Workshops & Webinars</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>Exclusive learning sessions hosted by the MKCE alumni network.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {workshops.map((workshop, i) => (
            <div key={i} className="rounded-xl overflow-hidden flex flex-col" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
              <div className="h-44 relative overflow-hidden">
                <img src={workshop.img} alt={workshop.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-white" style={{ background: 'rgba(185,28,28,0.85)' }}>
                  <Video size={12} /> Live Event
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-semibold mb-1 line-clamp-2" style={{ color: 'var(--color-text)' }}>{workshop.title}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>By {workshop.speaker}</p>
                <div className="mt-auto space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <Calendar size={14} style={{ color: 'var(--color-text-muted)' }} /> {workshop.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <Clock size={14} style={{ color: 'var(--color-text-muted)' }} /> {workshop.time}
                  </div>
                </div>
                <button
                  className="w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-colors"
                  style={{ background: 'var(--color-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                >
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
