import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Briefcase, BookOpen, Compass, ChevronRight, TrendingUp } from 'lucide-react';

const StudentCareerGuidance = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const resources = [
    { title: "Resume Building", icon: BookOpen, desc: "Learn how to craft a standout resume that gets past ATS.", color: '#2563EB', bg: '#E0F2FE' },
    { title: "Interview Prep", icon: Briefcase, desc: "Master the most common behavioral and technical questions.", color: '#15803D', bg: '#DCFCE7' },
    { title: "Industry Trends", icon: TrendingUp, desc: "Stay updated with the latest in tech, business, and design.", color: '#7C3AED', bg: '#EDE9FE' },
  ];

  return (
    <Layout pageTitle="Career Guidance" role={role}>
      <div className="space-y-6">
        <div className="p-8 rounded-xl" style={{ background: 'var(--color-primary)', color: 'white' }}>
          <div className="flex items-center gap-4 mb-4">
            <Compass className="h-10 w-10 opacity-90" />
            <h1 className="text-2xl font-bold">Navigate Your Career</h1>
          </div>
          <p className="opacity-80 max-w-2xl text-base">
            Discover paths, get resume advice, and prepare for your dream job with curated resources and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resources.map((res, i) => (
            <div key={i} className="p-6 rounded-xl group cursor-pointer transition-all duration-200" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ background: res.bg }}>
                <res.icon className="h-6 w-6" style={{ color: res.color }} />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{res.title}</h3>
              <p className="text-[14px] mb-4" style={{ color: 'var(--color-text-secondary)' }}>{res.desc}</p>
              <div className="flex items-center text-sm font-semibold group-hover:underline" style={{ color: 'var(--color-secondary)' }}>
                Explore <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>Upcoming Counseling Sessions</h2>
          <div className="space-y-3">
             {[
               { title: 'Transitioning to Product Management', by: 'Sarah Jenkins', date: 'Oct 15, 2:00 PM' },
               { title: 'Negotiating Your First Salary', by: 'David Chen', date: 'Oct 18, 4:00 PM' },
             ].map((session, i) => (
               <div key={i} className="flex items-center justify-between p-4 rounded-lg" style={{ background: 'var(--color-surface-muted)', border: '1px solid var(--color-border)' }}>
                 <div>
                   <h4 className="font-semibold" style={{ color: 'var(--color-text)' }}>{session.title}</h4>
                   <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>By {session.by} • {session.date}</p>
                 </div>
                 <button className="px-4 py-2 rounded-lg text-sm font-medium transition-colors" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-surface)'}>
                   Register
                 </button>
               </div>
             ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudentCareerGuidance;
