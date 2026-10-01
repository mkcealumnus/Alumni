import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import CheckoutModal from '@/components/ui/CheckoutModal';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';
import { generateCertificate } from '../../utils/certificateGenerator';
import { 
  Crown, BookOpen, Clock, CheckCircle2, Compass, Award, 
  Eye, Play, LogOut, Search, User, Layers, Check, Plus, ShoppingCart 
} from 'lucide-react';

const MyCourses = () => {
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState([]);
  const [browse, setBrowse] = useState([]);
  const [subStatus, setSubStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('enrolled');
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  
  // Checkout Modal State
  const [selectedCourseForBuy, setSelectedCourseForBuy] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [eRes, bRes, sRes] = await Promise.all([
      studentApi.getCourses(),
      studentApi.browseCourses(),
      studentApi.getSubscriptionStatus()
    ]);
    if (eRes.success) setEnrolled(eRes.courses || []);
    if (bRes.success) setBrowse(bRes.courses || []);
    if (sRes.success) setSubStatus(sRes);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleEnrollOrBuy = async (course) => {
    const hasPro = subStatus?.hasActiveSub;
    const isPurchased = subStatus?.purchasedCourseIds?.includes(course.id);

    if (hasPro || isPurchased || !course.isPremium) {
      const res = await studentApi.enrollCourse(course.id);
      if (res.success) {
        Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Enrolled!', text: 'You have been enrolled in the course.', timer: 1500, showConfirmButton: false });
        fetchData();
      } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    } else {
      setSelectedCourseForBuy(course);
      setCheckoutModalOpen(true);
    }
  };

  const handleUnenroll = (courseId, title) => {
    Swal.fire({ ...getSwalOpts(), title: 'Unenroll?', text: `Leave "${title}"? Your progress will be lost.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', cancelButtonColor: '#333', confirmButtonText: 'Unenroll' })
      .then(async r => {
        if (r.isConfirmed) {
          const res = await studentApi.unenrollCourse(courseId);
          if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Unenrolled', timer: 1500, showConfirmButton: false }); fetchData(); }
          else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
        }
      });
  };

  const handleDownloadCertificate = async (courseId) => {
    try {
      const res = await studentApi.getCertificate(courseId);
      if (res.success) {
        generateCertificate(res);
        Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Certificate Downloaded!', text: 'Your certificate has been saved.', timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not generate certificate.' });
      }
    } catch (err) {
      console.error('Certificate download error:', err);
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Failed to download certificate.' });
    }
  };

  const categories = ['All', ...new Set(browse.map(c => c.category || 'General').filter(Boolean))];
  const filteredBrowse = browse.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !search || (c.title || '').toLowerCase().includes(q) || (c.courseCode || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q);
    const matchCat = catFilter === 'All' || (c.category || 'General') === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <DashboardLayout pageTitle="My Courses" role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>My Courses</h1>
            <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-text-secondary)' }}>{enrolled.length} enrolled, {browse.length} available</p>
          </div>
          <div className="flex rounded-lg p-1 border" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)' }}>
            <button 
              onClick={() => setTab('enrolled')} 
              className="px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{
                background: tab === 'enrolled' ? 'var(--color-primary)' : 'transparent',
                color: tab === 'enrolled' ? '#FFFFFF' : 'var(--color-text-secondary)'
              }}
            >
              Enrolled ({enrolled.length})
            </button>
            <button 
              onClick={() => setTab('browse')} 
              className="px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{
                background: tab === 'browse' ? 'var(--color-primary)' : 'transparent',
                color: tab === 'browse' ? '#FFFFFF' : 'var(--color-text-secondary)'
              }}
            >
              Browse
            </button>
          </div>
        </div>

        {/* Membership Banner if non-pro */}
        {!subStatus?.hasActiveSub && (
          <div className="border p-5 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs" style={{ background: 'var(--color-accent)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white shrink-0 shadow-xs" style={{ background: 'var(--color-primary)' }}>
                <Crown className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <h4 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>Unlock All Courses with Pro Scholar Pass</h4>
                <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Get unlimited access to courses, interactive compilers, and 1-on-1 mentor guidance starting at ₹499/month.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/student/billing')}
              className="px-4 py-2 rounded-lg text-white font-semibold text-xs transition-colors flex-shrink-0 shadow-xs"
              style={{ background: 'var(--color-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
            >
              Upgrade to Pro
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Enrolled', value: enrolled.length, icon: BookOpen },
            { label: 'In Progress', value: enrolled.filter(c => (c.completionPercentage || 0) > 0 && (c.completionPercentage || 0) < 100).length, icon: Clock },
            { label: 'Completed', value: enrolled.filter(c => (c.completionPercentage || 0) === 100).length, icon: CheckCircle2 },
            { label: 'Available', value: browse.length, icon: Compass },
          ].map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="rounded-xl p-4 border flex items-center gap-3 shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center border shrink-0" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>{s.value}</p>
                  <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {loading ? <Loader text="Loading courses..." /> :
        tab === 'enrolled' ? (

          enrolled.length === 0 ? (
            <div className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
              <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-50" />
              <p className="text-sm font-medium">No enrolled courses. Browse and enroll!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolled.map(c => {
                const pct = c.completionPercentage || c.progress || 0;
                const cat = c.category || 'General';
                return (
                  <div key={c.id || c.courseId} className="rounded-xl border overflow-hidden shadow-xs flex flex-col justify-between transition-all" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="px-2 py-0.5 rounded-md text-xs font-semibold border" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}>{cat}</span>
                        {c.courseCode && <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>#{c.courseCode}</span>}
                      </div>
                      <h3 className="font-bold text-sm mb-1 line-clamp-1" style={{ color: 'var(--color-text)' }}>{c.title}</h3>
                      <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--color-text-secondary)' }}>{c.description}</p>
                      <div className="flex items-center gap-3 text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                        {c.mentorName && <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {c.mentorName}</span>}
                        <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> {c.contentCount || 0} items</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs font-medium mb-1">
                          <span style={{ color: 'var(--color-text-muted)' }}>Progress</span>
                          <span style={{ color: pct === 100 ? 'var(--color-success)' : 'var(--color-primary)' }}>{pct}%</span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-surface-muted)' }}>
                          <div className="h-2 rounded-full transition-all" style={{ width: `${pct}%`, background: pct === 100 ? 'var(--color-success)' : 'var(--color-primary)' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 flex gap-2">
                      {pct >= 100 ? (
                        <>
                          <button 
                            onClick={() => handleDownloadCertificate(c.courseId || c.id)} 
                            className="flex-1 py-2 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                            style={{ background: 'var(--color-success)' }}
                          >
                            <Award className="h-3.5 w-3.5" /> Certificate
                          </button>
                          <button 
                            onClick={() => navigate(`/student/course-viewer/${c.courseId || c.id}`)} 
                            className="py-2 px-3 rounded-lg border text-xs font-medium flex items-center justify-center"
                            style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                            title="Review Course"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={() => navigate(`/student/course-viewer/${c.courseId || c.id}`)} 
                          className="flex-1 py-2 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs"
                          style={{ background: 'var(--color-primary)' }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                        >
                          <Play className="h-3.5 w-3.5 fill-current" /> Continue
                        </button>
                      )}
                      <button 
                        onClick={() => handleUnenroll(c.courseId || c.id, c.title)} 
                        className="py-2 px-3 rounded-lg border text-xs flex items-center justify-center"
                        style={{ background: 'var(--color-danger-bg)', borderColor: 'var(--color-border)', color: 'var(--color-danger)' }}
                        title="Unenroll"
                      >
                        <LogOut className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search courses..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)} 
                  className="w-full pl-9 pr-4 py-2 rounded-lg border text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {categories.map(c => (
                  <button 
                    key={c} 
                    onClick={() => setCatFilter(c)} 
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors"
                    style={{
                      background: catFilter === c ? 'var(--color-primary)' : 'var(--color-surface)',
                      borderColor: catFilter === c ? 'var(--color-primary)' : 'var(--color-border)',
                      color: catFilter === c ? '#FFFFFF' : 'var(--color-text-secondary)'
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {filteredBrowse.length === 0 ? (
              <div className="text-center py-16" style={{ color: 'var(--color-text-muted)' }}>
                <Search className="h-10 w-10 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">{search || catFilter !== 'All' ? 'No matching courses' : 'No courses available'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredBrowse.map(c => {
                  const cat = c.category || 'General';
                  const coursePrice = c.price || 999;
                  const isPurchased = subStatus?.purchasedCourseIds?.includes(c.id);
                  const hasPro = subStatus?.hasActiveSub;

                  return (
                    <div key={c.id} className="rounded-xl border overflow-hidden shadow-xs flex flex-col justify-between transition-all" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                          <span className="px-2 py-0.5 rounded-md text-xs font-semibold border" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}>{cat}</span>
                          <span className="text-xs font-extrabold" style={{ color: 'var(--color-primary)' }}>₹{coursePrice}</span>
                        </div>
                        <h3 className="font-bold text-sm mb-1 line-clamp-1" style={{ color: 'var(--color-text)' }}>{c.title}</h3>
                        <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--color-text-secondary)' }}>{c.description}</p>
                        <div className="flex items-center gap-3 text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                          <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" /> {c.mentorName || 'Instructor'}</span>
                          <span className="flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> {c.contentCount || 0} items</span>
                        </div>
                      </div>

                      <div className="p-5 pt-0">
                        {c.isEnrolled ? (
                          <button disabled className="w-full py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1 cursor-not-allowed" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                            <Check className="h-3.5 w-3.5" /> Already Enrolled
                          </button>
                        ) : (hasPro || isPurchased) ? (
                          <button onClick={() => handleEnrollOrBuy(c)} className="w-full py-2 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs" style={{ background: 'var(--color-success)' }}>
                            <Plus className="h-3.5 w-3.5" /> Enroll Now (Unlocked)
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleEnrollOrBuy(c)} 
                            className="w-full py-2 rounded-lg text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                            style={{ background: 'var(--color-primary)' }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                          >
                            <ShoppingCart className="h-3.5 w-3.5" /> Buy Course ₹{coursePrice}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {selectedCourseForBuy && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          item={selectedCourseForBuy}
          type="course"
          onSuccess={() => fetchData()}
        />
      )}
    </DashboardLayout>
  );
};

export default MyCourses;

