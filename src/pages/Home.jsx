import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Swal, { getSwalOpts } from '../utils/swal';
import { publicApi } from '../utils/api';


const Home = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());

    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const body = {
      name: form.querySelector('[placeholder*="name" i], [name="name"]')?.value || form.elements[0]?.value,
      email: form.querySelector('[type="email"]')?.value || form.elements[1]?.value,
      phone: form.querySelector('[type="tel"]')?.value || form.elements[2]?.value || '',
      subject: form.querySelector('[placeholder*="subject" i], [name="subject"]')?.value || form.elements[3]?.value || 'Contact Form',
      message: form.querySelector('textarea')?.value || ''
    };
    const res = await publicApi.submitContact(body);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Sent!', text: 'Your message has been sent successfully.', timer: 2000, showConfirmButton: false });
      form.reset();
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Failed to send message.' });
    }
  };

  return (
    <>
      <Sidebar />
      <ThemeToggle />

      <main className="ml-0 lg:ml-20">

        {/* ═══════════════════════════ HERO ═══════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream dark-theme:bg-gray-950">
          <div className="hero-orb hero-orb-1 -top-20 -left-24"></div>
          <div className="hero-orb hero-orb-2 top-1/4 -right-16"></div>
          <div className="hero-orb hero-orb-3 bottom-16 left-1/4"></div>
          
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-6 py-3 text-sm text-gray-500 dark-theme:text-gray-400 z-10">
            <div className="flex items-center gap-2">
              <i className="ri-shield-keyhole-line text-primary"></i>
              <span>Exclusive & Private Portal for MKCE</span>
            </div>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                100% Free for MKCE Students
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark-theme:text-gray-100 leading-[1.1] tracking-tight mb-6">
                Bridge the Gap with{' '}
                <span className="relative inline-block">
                  <span className="text-gradient">NextStep</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-grad)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="underline-grad" x1="0" y1="0" x2="200" y2="0">
                        <stop offset="0%" stopColor="#c96442" />
                        <stop offset="100%" stopColor="#a78058" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-500 dark-theme:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Your private college portal for <span className="font-medium text-gray-700 dark-theme:text-gray-200">career guidance, alumni mentorship, roadmap discussions, and exclusive job boards.</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link to="/auth" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-semibold shadow-sm hover:bg-primary-dark transition-all duration-200">
                  Login with MKCE ID
                  <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform"></i>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-10 mt-12">
                {[
                  { icon: 'ri-compass-3-line', text: 'Career Guidance', bg: 'bg-peach/30 dark-theme:bg-peach/10', iconColor: 'text-terracotta' },
                  { icon: 'ri-user-star-line', text: '1-on-1 Mentorship', bg: 'bg-sage/30 dark-theme:bg-sage/10', iconColor: 'text-sage' },
                  { icon: 'ri-team-line', text: 'Alumni Groups', bg: 'bg-primary/10 dark-theme:bg-primary/8', iconColor: 'text-primary' },
                  { icon: 'ri-map-pin-time-line', text: 'Roadmaps', bg: 'bg-amber/20 dark-theme:bg-amber/10', iconColor: 'text-amber' },
                  { icon: 'ri-calendar-event-line', text: 'Workshops', bg: 'bg-blush/25 dark-theme:bg-blush/10', iconColor: 'text-clay' },
                  { icon: 'ri-briefcase-4-line', text: 'Job Portal', bg: 'bg-linen dark-theme:bg-sienna/10', iconColor: 'text-sienna' },
                ].map((card, i) => (
                  <div key={i} className={`${card.bg} px-4 py-2.5 rounded-xl border border-sand/50 dark-theme:border-gray-800 flex items-center gap-2.5 text-sm font-medium text-gray-700 dark-theme:text-gray-300 hover:scale-[1.03] transition-transform duration-200`}>
                    <i className={`${card.icon} ${card.iconColor} text-base`}></i>
                    {card.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" className="fill-white dark-theme:fill-gray-900" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════ FEATURES ═══════════════════════════ */}
        <section id="features" className="relative py-24 pb-32 bg-white dark-theme:bg-gray-900 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/15 text-sage text-sm font-medium mb-4">
                <i className="ri-shield-star-line"></i> Exclusive to MKCE
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark-theme:text-gray-100">
                A Private Platform Built for Your Success
              </h2>
              <p className="mt-4 text-gray-500 dark-theme:text-gray-400 max-w-2xl mx-auto">Connecting our students with our distinguished alumni for unparalleled guidance and opportunities.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: 'ri-compass-discover-line',
                  title: 'Free Career Guidance',
                  description: 'Navigate your career path with expert advice from alumni who have been exactly where you are today.',
                  color: 'bg-peach/20 text-terracotta',
                  border: 'border-peach/30',
                },
                {
                  icon: 'ri-user-smile-line',
                  title: '1-on-1 Mentorship',
                  description: 'Book private sessions with alumni mentors for personalized resume reviews, mock interviews, and tech advice.',
                  color: 'bg-sage/20 text-sage',
                  border: 'border-sage/30',
                },
                {
                  icon: 'ri-group-line',
                  title: 'Alumni-Student Groups',
                  description: 'Join domain-specific groups to interact with alumni experts in Web Dev, AI, Data Science, and more.',
                  color: 'bg-primary/10 text-primary',
                  border: 'border-primary/20',
                },
                {
                  icon: 'ri-discuss-line',
                  title: 'Roadmap Discussions',
                  description: 'Access curated tech roadmaps and join active discussion boards to stay updated on the latest industry trends.',
                  color: 'bg-amber/20 text-amber',
                  border: 'border-amber/30',
                },
                {
                  icon: 'ri-presentation-line',
                  title: 'Workshops & Events',
                  description: 'Attend exclusive workshops, technical seminars, and networking events hosted by our alumni network.',
                  color: 'bg-blush/20 text-clay',
                  border: 'border-blush/30',
                },
                {
                  icon: 'ri-briefcase-4-line',
                  title: 'Internal Job Portal',
                  description: 'Get access to direct referrals, internships, and job postings shared exclusively by MKCE alumni.',
                  color: 'bg-sky-500/10 text-sky-600',
                  border: 'border-sky-500/20',
                },
              ].map((card, i) => (
                <div key={i} className={`bg-cream dark-theme:bg-gray-950 rounded-2xl p-8 border ${card.border} dark-theme:border-gray-800 hover:shadow-lg transition-shadow duration-300`}>
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-5`}>
                    <i className={`${card.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-500 dark-theme:text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60V20C360 50 720 50 1080 30C1260 20 1380 10 1440 5V60H0Z" className="fill-cream dark-theme:fill-gray-950" />
            </svg>
          </div>
        </section>


        {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
        <footer className="bg-gray-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <i className="ri-seedling-fill text-primary-light text-xl"></i>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">NextStep</span>
              </div>
              <div className="text-gray-400 text-sm text-center md:text-right">
                <p>Exclusive Private Network for MKCE</p>
                <p>100% Free • Secure • Community Driven</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
              <p>&copy; {currentYear} NextStep | MKCE Alumni Network. All rights reserved.</p>
            </div>
          </div>
        </footer>

      </main>

      {showTopBtn && (
        <button onClick={scrollToTop} className="fixed bottom-6 right-6 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary-dark hover:-translate-y-1 transition-all z-50">
          <i className="ri-arrow-up-line"></i>
        </button>
      )}
    </>
  );
};

export default Home;
