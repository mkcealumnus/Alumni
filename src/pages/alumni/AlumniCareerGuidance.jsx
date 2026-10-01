import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Briefcase, BookOpen, Compass, ChevronRight, TrendingUp } from 'lucide-react';

const AlumniCareerGuidance = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const resources = [
    { title: "Resume Building", icon: BookOpen, desc: "Learn how to craft a standout resume that gets past ATS." },
    { title: "Interview Prep", icon: Briefcase, desc: "Master the most common behavioral and technical questions." },
    { title: "Industry Trends", icon: TrendingUp, desc: "Stay updated with the latest in tech, business, and design." },
  ];

  return (
    <Layout pageTitle="Career Guidance" role={role}>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Banner */}
        <div className="rounded-xl p-8 border" style={{ background: 'var(--color-primary)', borderColor: 'var(--color-border)', color: '#ffffff' }}>
          <div className="flex items-center gap-3 mb-3">
            <Compass className="w-8 h-8 opacity-90" />
            <h1 className="text-2xl font-bold tracking-tight">Navigate Your Alumni Career</h1>
          </div>
          <p className="text-xs max-w-2xl leading-relaxed opacity-90">
            Share your journey, find lateral opportunities, or pivot into a new field with our exclusive alumni career resources and mentoring sessions.
          </p>
        </div>

        {/* Resources Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {resources.map((res, i) => (
            <div key={i} className="rounded-xl p-5 border transition-all hover:shadow-xs group cursor-pointer" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: 'rgba(18,53,91,0.08)', color: 'var(--color-primary)' }}>
                <res.icon className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>{res.title}</h3>
              <p className="text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>{res.desc}</p>
              <div className="flex items-center text-xs font-semibold group-hover:underline" style={{ color: 'var(--color-primary)' }}>
                Explore <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div className="rounded-xl p-6 border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <h2 className="text-base font-bold mb-4" style={{ color: 'var(--color-text)' }}>Upcoming Counseling Sessions</h2>
          <div className="space-y-3">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-3" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
               <div>
                 <h4 className="font-semibold text-xs" style={{ color: 'var(--color-text)' }}>Transitioning to Product Management</h4>
                 <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>By Sarah Jenkins • Oct 15, 2:00 PM</p>
               </div>
               <button className="px-4 py-2 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
                 Register
               </button>
             </div>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-3" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
               <div>
                 <h4 className="font-semibold text-xs" style={{ color: 'var(--color-text)' }}>Negotiating Your First Salary</h4>
                 <p className="text-[11px] mt-0.5" style={{ color: 'var(--color-text-muted)' }}>By David Chen • Oct 18, 4:00 PM</p>
               </div>
               <button className="px-4 py-2 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
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
