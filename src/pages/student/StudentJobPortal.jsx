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
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-c-blue focus:outline-none text-sm"
            />
          </div>
          <button className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
            <Filter className="h-5 w-5" /> Filters
          </button>
          
        </div>

        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col md:flex-row items-start md:items-center gap-6 hover:border-c-blue/40 transition-colors cursor-pointer group">
              <div className="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center text-xl font-bold text-gray-600 dark:text-gray-300 shrink-0">
                {job.logo}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-c-blue transition-colors">{job.title}</h3>
                <div className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">{job.company}</div>
                
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                  <span className="flex items-center gap-1.5"><DollarSign className="h-4 w-4" /> {job.salary}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> Full-time</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 md:max-w-xs">
                {job.tags.map((tag, j) => (
                  <span key={j} className="px-2.5 py-1 bg-c-blue/10 dark:bg-c-blue/20 text-c-blue dark:text-c-blue-light text-xs font-semibold rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <button className="w-full md:w-auto mt-4 md:mt-0 px-6 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
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
