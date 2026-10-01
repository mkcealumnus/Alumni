import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import { UserPlus, Star, Calendar, MessageSquare, Search } from 'lucide-react';

const AlumniOneOnOneMentorship = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;

  const mentors = [
    { name: "Alex Rivera", role: "Senior Engineer @ Google", skills: ["React", "System Design"], rating: 4.9, reviews: 124 },
    { name: "Priya Sharma", role: "Product Manager @ Stripe", skills: ["Product Strategy", "Agile"], rating: 4.8, reviews: 89 },
    { name: "Michael Chang", role: "Data Scientist @ Meta", skills: ["Machine Learning", "Python"], rating: 5.0, reviews: 200 },
    { name: "Jessica Lee", role: "UX Designer @ Apple", skills: ["Figma", "User Research"], rating: 4.7, reviews: 56 },
  ];

  const inputClass = 'w-full pl-9 pr-4 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]';
  const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <Layout pageTitle="1-on-1 Mentorship" role={role}>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search mentors by name, role, or skill..." 
              className={inputClass}
              style={inputStyle}
            />
          </div>
          <button className="w-full md:w-auto px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
            <UserPlus className="w-4 h-4" />
            Become a Mentor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {mentors.map((mentor, i) => (
            <div key={i} className="rounded-xl p-5 border transition-all hover:shadow-xs flex flex-col items-center text-center justify-between" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&size=80&background=12355B&color=fff&bold=true`}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full mb-3 border mx-auto object-cover"
                  style={{ borderColor: 'var(--color-border)' }}
                />
                <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>{mentor.name}</h3>
                <p className="text-xs mb-3" style={{ color: 'var(--color-text-muted)' }}>{mentor.role}</p>

                <div className="flex items-center justify-center gap-1 text-xs font-semibold text-amber-500 mb-4">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{mentor.rating}</span>
                  <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>({mentor.reviews})</span>
                </div>

                <div className="flex flex-wrap gap-1.5 justify-center mb-5">
                  {mentor.skills.map((skill, j) => (
                    <span key={j} className="px-2 py-0.5 border text-[10px] font-semibold rounded-md" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-2 mt-auto">
                <button className="py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center transition-colors hover:opacity-80" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                  <MessageSquare className="w-3.5 h-3.5" />
                </button>
                <button className="py-2 px-3 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
                  <Calendar className="w-3.5 h-3.5" /> Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AlumniOneOnOneMentorship;
