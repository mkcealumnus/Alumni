import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { Briefcase, MapPin, DollarSign, Search, Filter, Plus } from 'lucide-react';

const AlumniJobPortal = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const jobs = [
    { title: "Frontend Engineer", company: "Vercel", location: "Remote", salary: "$120k - $160k", tags: ["React", "Next.js", "TypeScript"], logo: "V" },
    { title: "Product Designer", company: "Figma", location: "San Francisco, CA", salary: "$130k - $180k", tags: ["UI/UX", "Prototyping"], logo: "F" },
    { title: "Backend Developer", company: "Stripe", location: "New York, NY", salary: "$140k - $190k", tags: ["Go", "PostgreSQL", "APIs"], logo: "S" },
    { title: "Data Scientist", company: "OpenAI", location: "Remote", salary: "$150k - $220k", tags: ["Python", "PyTorch", "LLMs"], logo: "O" },
  ];

  const inputClass = 'w-full pl-9 pr-4 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]';
  const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <Layout pageTitle="Job Portal" role={role}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search jobs by title, company, or keywords..." 
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-3.5 py-2.5 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors hover:opacity-80" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
              <Plus className="w-4 h-4" /> Post a Job
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {jobs.map((job, i) => (
            <div key={i} className="rounded-xl p-5 border transition-all hover:shadow-xs flex flex-col md:flex-row items-start md:items-center gap-5 group cursor-pointer" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold shrink-0" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                {job.logo}
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-text)' }}>{job.title}</h3>
                <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{job.company}</div>

                <div className="flex flex-wrap items-center gap-4 mt-2.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {job.salary}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-[var(--color-primary)]" /> Full-time</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 md:max-w-xs">
                {job.tags.map((tag, j) => (
                  <span key={j} className="px-2.5 py-0.5 text-[10px] font-semibold rounded-md border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full md:w-auto mt-2 md:mt-0 px-4 py-2 rounded-lg border text-xs font-semibold transition-colors hover:opacity-80" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AlumniJobPortal;
