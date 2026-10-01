import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap, Users, Handshake, Briefcase, Compass, Map,
  CalendarDays, ArrowRight, ChevronUp, CheckCircle2, ArrowUpRight
} from 'lucide-react';

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

  const features = [
    { icon: Compass, title: 'Career Guidance', desc: 'Get actionable insights and career pathways drawn directly from alumni working in top companies.' },
    { icon: Handshake, title: '1-on-1 Mentorship', desc: 'Book private sessions with industry professionals to review your resume, practice interviews, or seek advice.' },
    { icon: Users, title: 'Alumni Groups', desc: 'Join specialized domain groups to chat with peers and mentors in a focused, private environment.' },
    { icon: Map, title: 'Roadmaps', desc: 'Access curated learning paths for various roles, vetted by alumni in leading technology companies.' },
    { icon: CalendarDays, title: 'Workshops', desc: 'Register for exclusive webinars and technical seminars hosted by the MKCE alumni network.' },
    { icon: Briefcase, title: 'Job Portal', desc: 'Access internal job postings, direct referral opportunities, and internship listings shared by alumni.' },
  ];

  const steps = [
    { num: '01', title: 'Register & Verify', desc: 'Sign up using your MKCE credentials. Our admin team verifies your identity before granting access.' },
    { num: '02', title: 'Connect & Schedule', desc: 'Browse alumni profiles by company or domain. Send messages or book 1-on-1 mentorship sessions.' },
    { num: '03', title: 'Learn & Get Hired', desc: 'Attend workshops, follow roadmaps, and apply to exclusive job referrals to land your dream role.' },
  ];

  const testimonials = [
    { quote: "Thanks to a mock interview with a 2018 Alumni, I cleared my final round at Amazon! The roadmap provided was incredibly accurate.", name: "Siddharth R.", role: "Final Year Student" },
    { quote: "It's so fulfilling to give back. I posted a referral link for my team, and we hired a brilliant student from MKCE within a week.", name: "Priya M.", role: "Alumni '19, SDE" },
    { quote: "The 1-on-1 mentorship completely changed my perspective on backend development. A private space to ask questions is a game changer.", name: "Karthik V.", role: "3rd Year Student" },
  ];

  return (
    <>
      <main className="font-sans" style={{ background: 'var(--color-background)' }}>

        {/* ─── TOP NAV ─── */}
        <nav
          className="sticky top-0 z-50 h-16 flex items-center justify-between px-6 lg:px-12"
          style={{
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
              <GraduationCap size={18} style={{ color: 'var(--color-primary)' }} />
            </div>
            <span className="font-bold text-[16px]" style={{ color: 'var(--color-text)' }}>MKCE Alumni</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[14px] font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }}>Features</a>
            <a href="#how-it-works" className="text-[14px] font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }}>How It Works</a>
            <a href="#testimonials" className="text-[14px] font-medium transition-colors" style={{ color: 'var(--color-text-secondary)' }}>Community</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/auth"
              className="px-5 py-2 rounded-lg text-[14px] font-semibold transition-colors text-white"
              style={{ background: 'var(--color-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* ─── HERO ─── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <div className="animate-fade-in-up">
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold mb-8"
                style={{
                  background: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: 'var(--color-success)' }} />
                Exclusive & Free for MKCE
              </div>

              <h1
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.12] mb-6 tracking-tight"
                style={{ color: 'var(--color-text)' }}
              >
                Reconnect. Grow.<br className="hidden sm:block" />
                <span style={{ color: 'var(--color-secondary)' }}>Give Back.</span>
              </h1>

              <p
                className="text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                A private, high-trust ecosystem for MKCE students and alumni to connect through
                <strong> 1-on-1 mentorship</strong>, career guidance, and <strong>exclusive opportunities</strong>.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
                <Link
                  to="/auth"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-[15px] font-semibold text-white transition-colors"
                  style={{ background: 'var(--color-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                >
                  Join Alumni Network <ArrowRight size={18} />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-[15px] font-semibold transition-colors"
                  style={{
                    background: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border-strong)',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-surface)'}
                >
                  Explore Features
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {[
                  { label: 'Active Alumni', value: '500+' },
                  { label: 'Mentorships', value: '1,200+' },
                  { label: 'Job Referrals', value: '300+' },
                  { label: 'Cost for MKCE', value: 'Free' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <span className="text-2xl font-bold block mb-1" style={{ color: 'var(--color-primary)' }}>
                      {stat.value}
                    </span>
                    <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="py-20 lg:py-24" style={{ background: 'var(--color-surface)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
                Core Features
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                Everything you need to accelerate your career
              </h2>
              <p className="text-base" style={{ color: 'var(--color-text-secondary)' }}>
                Designed exclusively for the MKCE community to bring all critical networking resources into one private platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="p-6 rounded-xl transition-all duration-200"
                    style={{
                      background: 'var(--color-surface)',
                      border: '1px solid var(--color-border)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border-strong)';
                      e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                      style={{ background: 'var(--color-accent)' }}
                    >
                      <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <h3 className="text-[16px] font-semibold mb-2" style={{ color: 'var(--color-text)' }}>{item.title}</h3>
                    <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── HOW IT WORKS ─── */}
        <section id="how-it-works" className="py-20 lg:py-24" style={{ background: 'var(--color-background)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
                  Simple Process
                </p>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
                  From campus to corporate in 3 steps
                </h2>
                <p className="text-base mb-10" style={{ color: 'var(--color-text-secondary)' }}>
                  We verify every profile to ensure a safe, high-quality, exclusive environment for our community.
                </p>

                <div className="space-y-8">
                  {steps.map((step, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-[13px] shrink-0"
                          style={{
                            background: 'var(--color-accent)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          {step.num}
                        </div>
                        {i !== steps.length - 1 && <div className="w-px flex-1 mt-3" style={{ background: 'var(--color-border)' }} />}
                      </div>
                      <div className="pb-2 pt-1">
                        <h3 className="text-[16px] font-semibold mb-1.5" style={{ color: 'var(--color-text)' }}>
                          {step.title}
                        </h3>
                        <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Illustrative UI mockup */}
              <div
                className="rounded-xl p-6"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div className="flex items-center gap-2 mb-6 pb-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-border-strong)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-border-strong)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--color-border-strong)' }} />
                </div>

                <div className="space-y-4">
                  {[1, 2].map((_, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center p-4 rounded-lg"
                      style={{ border: '1px solid var(--color-border)' }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg" style={{ background: 'var(--color-surface-muted)' }} />
                        <div>
                          <div className="h-3 w-24 rounded-full mb-2.5" style={{ background: 'var(--color-border-strong)' }} />
                          <div className="h-2 w-16 rounded-full" style={{ background: 'var(--color-border)' }} />
                        </div>
                      </div>
                      <div
                        className="h-7 px-3 rounded-md flex items-center text-[11px] font-semibold"
                        style={{
                          background: i === 1 ? 'var(--color-accent)' : 'var(--color-surface-muted)',
                          color: i === 1 ? 'var(--color-secondary)' : 'var(--color-text-muted)',
                        }}
                      >
                        {i === 1 ? 'CONNECTED' : 'CONNECT'}
                      </div>
                    </div>
                  ))}
                  <div className="h-24 w-full rounded-lg" style={{ background: 'var(--color-surface-muted)' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section id="testimonials" className="py-20 lg:py-24" style={{ background: 'var(--color-surface)' }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <p className="text-[12px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--color-secondary)' }}>
                Community Impact
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: 'var(--color-text)' }}>
                What our community says
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{
                    background: 'var(--color-background)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <p className="text-[14px] leading-relaxed mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center font-semibold text-[13px] text-white"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold" style={{ color: 'var(--color-text)' }}>{t.name}</h4>
                      <span className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-20 lg:py-24" style={{ background: 'var(--color-primary)' }}>
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to take your next step?
            </h2>
            <p className="text-base text-white/70 mb-8 max-w-xl mx-auto">
              Join hundreds of MKCE students who are already learning from the best. Sign up today and gain exclusive access to the network.
            </p>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-[15px] transition-colors"
              style={{ background: 'white', color: 'var(--color-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F1F5F9'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              Get Started Now <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>

        {/* ─── FOOTER ─── */}
        <footer style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
              <div className="max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
                    <GraduationCap size={18} style={{ color: 'var(--color-primary)' }} />
                  </div>
                  <span className="font-bold text-[16px]" style={{ color: 'var(--color-text)' }}>MKCE Alumni</span>
                </div>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  Stay connected with the community, build meaningful relationships, and create opportunities for the next generation.
                </p>
              </div>

              <div className="flex gap-12">
                <div>
                  <h4 className="text-[12px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    Quick Links
                  </h4>
                  <div className="space-y-2">
                    {['Alumni', 'Students', 'Events', 'Mentorship', 'Careers'].map(link => (
                      <a key={link} href="#" className="block text-[14px] transition-colors" style={{ color: 'var(--color-text-secondary)' }}>
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6"
              style={{ borderTop: '1px solid var(--color-border)' }}
            >
              <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                © {currentYear} MKCE Alumni Network. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-[13px] transition-colors" style={{ color: 'var(--color-text-muted)' }}>Privacy Policy</a>
                <a href="#" className="text-[13px] transition-colors" style={{ color: 'var(--color-text-muted)' }}>Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-lg flex items-center justify-center z-50 transition-colors text-white"
          style={{ background: 'var(--color-primary)', boxShadow: 'var(--shadow-md)' }}
          aria-label="Back to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
};

export default Home;
