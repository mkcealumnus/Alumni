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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>
          <button 
            className="w-full md:w-auto px-5 py-2.5 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
            style={{ background: 'var(--color-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            <UserPlus className="h-4 w-4" />
            Find a Mentor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor, i) => (
            <div 
              key={i} 
              className="rounded-xl p-6 border shadow-sm flex flex-col items-center text-center transition-all"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div 
                className="w-16 h-16 rounded-full mb-4 flex items-center justify-center text-xl font-bold border"
                style={{ background: 'var(--color-surface-muted)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}
              >
                {mentor.name.charAt(0)}
              </div>
              <h3 className="text-base font-bold mb-1" style={{ color: 'var(--color-text)' }}>{mentor.name}</h3>
              <p className="text-xs mb-3 font-medium" style={{ color: 'var(--color-text-secondary)' }}>{mentor.role}</p>
              
              <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 mb-4">
                <Star className="h-3.5 w-3.5 fill-current text-amber-500" />
                <span>{mentor.rating}</span>
                <span className="font-normal" style={{ color: 'var(--color-text-muted)' }}>({mentor.reviews})</span>
              </div>

              <div className="flex flex-wrap gap-1.5 justify-center mb-6">
                {mentor.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-2 py-0.5 text-xs rounded-md font-medium border"
                    style={{ background: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="w-full grid grid-cols-2 gap-2 mt-auto">
                <button 
                  className="py-2 px-3 border rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
                  style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  <MessageSquare className="h-4 w-4" />
                </button>
                <button 
                  className="py-2 px-3 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  style={{ background: 'var(--color-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                >
                  <Calendar className="h-3.5 w-3.5" /> Book
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

