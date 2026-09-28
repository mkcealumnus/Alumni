import React, { useState, useEffect } from 'react';
import { Mail, User, GraduationCap, CheckCircle, ArrowRight, Sparkles, Shield, Lock } from 'lucide-react';

export default function NotifyForm() {
  const [role, setRole] = useState('Alumni');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    batchDept: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(1482);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user already subscribed in LocalStorage
    const saved = localStorage.getItem('mkce_alumni_subscribed');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
        setIsSubmitted(true);
      } catch (e) {
        // ignore fallback
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.fullName) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setSubscriberCount((prev) => prev + 1);
      localStorage.setItem('mkce_alumni_subscribed', JSON.stringify({ ...formData, role }));
    }, 700);
  };

  return (
    <div id="notify-section" className="w-full max-w-4xl mx-auto my-12 px-4 scroll-mt-24">
      <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Glow backdrop behind form */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-tr from-orange-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            EXCLUSIVE LAUNCH INVITATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
            Get Priority Access to <span className="gradient-text">mkcealumni.org</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
            Be the first to claim your verified alumnus badge, access placement question archives, and connect with MKCE seniors across top global companies on January 14, 2027.
          </p>
        </div>

        {/* Form or Success Box */}
        {isSubmitted ? (
          <div className="bg-slate-950/80 border border-emerald-500/30 p-6 sm:p-8 rounded-2xl text-center max-w-xl mx-auto space-y-4 animate-fadeIn">
            <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">You're on the Launch List!</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Thank you, <strong className="text-orange-400">{formData.fullName}</strong>. We've reserved your priority slot for <strong className="text-white">mkcealumni.org</strong>.
              </p>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl text-xs font-mono text-slate-400 border border-slate-800 flex items-center justify-between gap-2">
              <span>Notification Sent To:</span>
              <span className="text-orange-400 font-bold truncate max-w-[200px]">{formData.email}</span>
            </div>
            <p className="text-xs text-slate-500 italic">
              📅 Mark your calendar: Launch Day is January 14, 2027.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                localStorage.removeItem('mkce_alumni_subscribed');
              }}
              className="text-xs text-slate-400 underline hover:text-slate-200 cursor-pointer pt-2 inline-block"
            >
              Register another email or edit response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
            {/* Role Tabs */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-400 font-medium text-center">
                Select Your Category:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'Alumni', label: '🎓 Alumni' },
                  { id: 'Student', label: '📚 Student' },
                  { id: 'Faculty', label: '👨‍🏫 Faculty' },
                  { id: 'Partner', label: '🤝 Recruiter' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRole(item.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      role === item.id
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/50 shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300">
                  Full Name <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="e.g., Jayanth S."
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:border-orange-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-slate-300">
                  Email Address <span className="text-orange-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@gmail.com or @mkce.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:border-orange-500 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Batch & Dept */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-300">
                Graduation Batch & Department <span className="text-slate-500">(Optional)</span>
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g., 2020-2024 CSE / ECE / Mech / IT / AI-DS"
                  value={formData.batchDept}
                  onChange={(e) => setFormData({ ...formData, batchDept: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-slate-100 placeholder-slate-600 focus:border-orange-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer flex items-center justify-center gap-2 transform active:scale-[0.99]"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  Reserving Launch Spot...
                </span>
              ) : (
                <>
                  <span>Join Early Launch List</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Privacy note */}
            <div className="flex items-center justify-center gap-2 text-slate-500 text-xs text-center pt-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>Zero spam guarantee. Used strictly for mkcealumni.org launch notification.</span>
            </div>
          </form>
        )}

        {/* Subscriber Social Proof Count */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex items-center justify-center gap-3 text-xs text-slate-400">
          <div className="flex -space-x-2 overflow-hidden">
            <span className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-gradient-to-br from-orange-400 to-rose-500 text-[10px] font-bold text-white flex items-center justify-center">AK</span>
            <span className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-gradient-to-br from-indigo-400 to-purple-500 text-[10px] font-bold text-white flex items-center justify-center">SR</span>
            <span className="inline-block h-6 w-6 rounded-full ring-2 ring-slate-900 bg-gradient-to-br from-emerald-400 to-teal-500 text-[10px] font-bold text-white flex items-center justify-center">PM</span>
          </div>
          <span>
            <strong className="text-slate-200 font-mono">{subscriberCount.toLocaleString()}</strong> alumni & students signed up
          </span>
        </div>

      </div>
    </div>
  );
}
