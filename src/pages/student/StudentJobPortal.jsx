import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Briefcase, MapPin, DollarSign, Search, Filter } from 'lucide-react';

const StudentJobPortal = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  
  const jobs = [
    { title: "Frontend Engineer", company: "Vercel", location: "Remote", salary: "$120k - $160k", tags: ["React", "Next.js", "TypeScript"], logo: "V" },
    { title: "Product Designer", company: "Figma", location: "San Francisco, CA", salary: "$130k - $180k", tags: ["UI/UX", "Prototyping"], logo: "F" },
    { title: "Backend Developer", company: "Stripe", location: "New York, NY", salary: "$140k - $190k", tags: ["Go", "PostgreSQL", "APIs"], logo: "S" },
    { title: "Data Scientist", company: "OpenAI", location: "Remote", salary: "$150k - $220k", tags: ["Python", "PyTorch", "LLMs"], logo: "O" },
  ];

  return (
    <Layout pageTitle="Job Portal" role={role}>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder="Search jobs by title, company, or keywords..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>
          <button 
            className="px-4 py-2.5 border rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div 
              key={i} 
              className="rounded-xl p-5 border shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 transition-all cursor-pointer"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold border shrink-0"
                style={{ background: 'var(--color-surface-muted)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
              >
                {job.logo}
              </div>
              
              <div className="flex-1">
                <h3 className="text-base font-bold transition-colors" style={{ color: 'var(--color-text)' }}>{job.title}</h3>
                <div className="text-xs font-semibold mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{job.company}</div>
                
                <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Full-time</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 md:max-w-xs">
                {job.tags.map((tag, j) => (
                  <span 
                    key={j} 
                    className="px-2 py-0.5 text-xs font-medium rounded-md border"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button 
                className="w-full md:w-auto px-4 py-2 border rounded-lg font-medium text-xs transition-colors shadow-xs shrink-0"
                style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default StudentJobPortal;

