import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import ThemeToggle from '@/components/ui/ThemeToggle';

const CurveDivider = ({ fillColor }) => (
  <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-0">
    <svg 
      viewBox="0 0 1440 120" 
      preserveAspectRatio="none" 
      className="w-full h-[60px] md:h-[90px] lg:h-[120px] block"
    >
      <path 
        d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" 
        className={fillColor} 
      />
    </svg>
  </div>
);

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

  return (
    <>
      <Sidebar />
      <ThemeToggle />

      <main className="ml-0 lg:ml-20 font-sans selection:bg-primary/30 selection:text-primary-dark">
        
        {/* ═══════════════════════════ HERO ═══════════════════════════ */}
        {/* Claude uses a soft sand/cream background for top levels: #F2EBE5 or similar */}
        <section id="hero" className="relative min-h-[100svh] pt-20 pb-32 flex flex-col justify-center bg-[#F2EBE5] dark-theme:bg-[#18181A] transition-colors duration-500">
          
          <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
            <div className="animate-fade-in-up flex flex-col items-center">
              
              {/* Badge */}
              <div className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark-theme:bg-white/5 border border-[#e4d7cd] dark-theme:border-white/10 text-sm font-semibold text-[#5c4a3d] dark-theme:text-gray-300 mb-10 hover:border-primary/40 transition-colors backdrop-blur-md">
                <span className="relative flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Exclusive & 100% Free for MKCE
              </div>

              {/* Headline (Claude Editorial Style) */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#2C2926] dark-theme:text-[#F3F2F1] leading-[1.1] tracking-tight mb-8 max-w-4xl font-serif">
                Your direct path to <br className="hidden sm:block" />
                <span className="text-[#C27A3A] dark-theme:text-[#D4A574]">Alumni Excellence.</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-[#5C5956] dark-theme:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                A private, high-trust ecosystem for MKCE students to connect, learn, and grow through <strong>1-on-1 mentorship</strong> and <strong>exclusive opportunities</strong>.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 w-full sm:w-auto">
                <Link to="/auth" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#2C2926] dark-theme:bg-[#EAE8E5] text-[#F3F2F1] dark-theme:text-[#18181A] font-semibold text-[15px] hover:bg-[#1A1816] dark-theme:hover:bg-white transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                  Join the Network
                </Link>
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-transparent text-[#2C2926] dark-theme:text-[#EAE8E5] font-semibold text-[15px] border-2 border-[#DCD5CF] dark-theme:border-gray-700 hover:border-[#2C2926] dark-theme:hover:border-[#EAE8E5] transition-colors duration-300">
                  How it works
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl mx-auto pt-8">
                {[
                  { label: 'Active Alumni', value: '500+' },
                  { label: 'Mentorships', value: '1.2k' },
                  { label: 'Job Referrals', value: '300+' },
                  { label: 'Cost for MKCE', value: 'Free' },
                ].map((stat, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#2C2926] dark-theme:text-[#F3F2F1] mb-1">{stat.value}</span>
                    <span className="text-xs font-semibold text-[#8C8985] dark-theme:text-gray-500 uppercase tracking-widest">{stat.label}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
          
          <CurveDivider fillColor="fill-[#FFFFFF] dark-theme:fill-[#121214]" />
        </section>

        {/* ═══════════════════════════ THE ADVANTAGE ═══════════════════════════ */}
        <section id="advantage" className="relative py-24 bg-[#FFFFFF] dark-theme:bg-[#121214]">
          <div className="max-w-7xl mx-auto px-6 relative z-10 mb-20">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-xs font-bold text-[#C27A3A] dark-theme:text-[#D4A574] uppercase tracking-widest mb-4">The MKCE Advantage</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-[#2C2926] dark-theme:text-[#F3F2F1] leading-[1.1] mb-8 font-serif">
                  A closed network <br /> built on legacy.
                </h3>
                <p className="text-[#5C5956] dark-theme:text-gray-400 mb-8 text-lg leading-relaxed">
                  Unlike public platforms where outreach feels like screaming into the void, NextStep is built strictly for the MKCE community. Mentors here already share your background, making them instantly invested in your success.
                </p>
                <ul className="space-y-5">
                  {[
                    'Significantly higher response rates',
                    'Advice tailored to your exact college syllabus',
                    'Zero spam, verified institutional profiles only',
                    'Direct internal referral pipelines'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[#2C2926] dark-theme:text-gray-300 font-medium text-[15px]">
                      <div className="w-5 h-5 rounded-full bg-[#E5DCD5] dark-theme:bg-gray-800 text-[#C27A3A] dark-theme:text-[#D4A574] flex items-center justify-center shrink-0">
                        <i className="ri-check-line text-xs"></i>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                  <div className="bg-[#FAF9F5] dark-theme:bg-[#18181A] p-8 rounded-[2rem] border border-[#F2EBE5] dark-theme:border-gray-800/60 shadow-sm transition-transform hover:-translate-y-1">
                    <i className="ri-shield-star-line text-3xl text-[#C27A3A] dark-theme:text-[#D4A574] mb-6 block"></i>
                    <h4 className="text-lg font-bold text-[#2C2926] dark-theme:text-gray-100 mb-2">Verified Trust</h4>
                    <p className="text-sm text-[#8C8985] dark-theme:text-gray-500 leading-relaxed">Every user is authenticated manually by the admin team.</p>
                  </div>
                  <div className="bg-[#FAF9F5] dark-theme:bg-[#18181A] p-8 rounded-[2rem] border border-[#F2EBE5] dark-theme:border-gray-800/60 shadow-sm transition-transform hover:-translate-y-1">
                    <i className="ri-rocket-line text-3xl text-[#C27A3A] dark-theme:text-[#D4A574] mb-6 block"></i>
                    <h4 className="text-lg font-bold text-[#2C2926] dark-theme:text-gray-100 mb-2">Fast Tracking</h4>
                    <p className="text-sm text-[#8C8985] dark-theme:text-gray-500 leading-relaxed">Skip cold emails and connect directly via 1-on-1s.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#FAF9F5] dark-theme:bg-[#18181A] p-8 rounded-[2rem] border border-[#F2EBE5] dark-theme:border-gray-800/60 shadow-sm h-full flex flex-col justify-center min-h-[240px] transition-transform hover:-translate-y-1">
                    <div className="text-6xl font-bold text-[#C27A3A] dark-theme:text-[#D4A574] mb-4 font-serif">10x</div>
                    <h4 className="text-lg font-bold text-[#2C2926] dark-theme:text-gray-100 mb-2">More Effective</h4>
                    <p className="text-sm text-[#8C8985] dark-theme:text-gray-500 leading-relaxed">Students report a 10x higher engagement rate here.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <CurveDivider fillColor="fill-[#FAF9F5] dark-theme:fill-[#0A0A0B]" />
        </section>

        {/* ═══════════════════════════ FEATURES ═══════════════════════════ */}
        <section id="features" className="relative py-32 bg-[#FAF9F5] dark-theme:bg-[#0A0A0B]">
          <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
            
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-xs font-bold text-[#C27A3A] dark-theme:text-[#D4A574] uppercase tracking-widest mb-4">Core Features</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#2C2926] dark-theme:text-gray-100 leading-[1.1] mb-6 font-serif">
                Everything you need to <br className="hidden sm:block"/> <span className="italic text-[#8C8985]">accelerate</span> your career.
              </h3>
              <p className="text-lg text-[#5C5956] dark-theme:text-gray-400">
                Designed exclusively for the MKCE community to bring all critical networking resources into one private, elegant space.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[
                {
                  icon: 'ri-compass-discover-line',
                  title: 'Career Guidance',
                  desc: 'Unsure about your tech stack? Get actionable insights and career pathways drawn directly from alumni experiences.',
                },
                {
                  icon: 'ri-user-star-line',
                  title: '1-on-1 Mentorship',
                  desc: 'Book private, dedicated time with industry professionals to review your resume, practice interviews, or seek advice.',
                },
                {
                  icon: 'ri-team-line',
                  title: 'Alumni Groups',
                  desc: 'Join specialized domain groups (Web Dev, AI, Cloud) to chat with peers and mentors in a focused environment.',
                },
                {
                  icon: 'ri-map-pin-time-line',
                  title: 'Roadmaps',
                  desc: 'Access curated learning paths for various roles, strictly vetted by our alumni working in top tech companies.',
                },
                {
                  icon: 'ri-calendar-event-line',
                  title: 'Workshops',
                  desc: 'Register for exclusive webinars, code-alongs, and technical seminars hosted entirely by the MKCE alumni network.',
                },
                {
                  icon: 'ri-briefcase-4-line',
                  title: 'Job Portal',
                  desc: 'Get a head start with internal job postings, direct referral opportunities, and internship listings shared by alumni.',
                },
              ].map((item, i) => (
                <div key={i} className="group p-8 rounded-[2rem] bg-white dark-theme:bg-[#18181A] border border-[#F2EBE5] dark-theme:border-white/5 hover:border-[#DCD5CF] dark-theme:hover:border-white/10 hover:shadow-xl shadow-black/5 hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-[#F5F2EF] dark-theme:bg-[#2A2A2D] text-[#2C2926] dark-theme:text-[#F3F2F1] flex items-center justify-center mb-6 group-hover:bg-[#2C2926] group-hover:text-white dark-theme:group-hover:bg-primary dark-theme:group-hover:text-black transition-colors duration-300`}>
                    <i className={`${item.icon} text-xl`}></i>
                  </div>
                  <h4 className="text-lg font-bold text-[#2C2926] dark-theme:text-gray-100 mb-3">{item.title}</h4>
                  <p className="text-[#5C5956] dark-theme:text-gray-400 text-[15px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          
          <CurveDivider fillColor="fill-[#FFFFFF] dark-theme:fill-[#121214]" />
        </section>

        {/* ═══════════════════════════ HOW IT WORKS ═══════════════════════════ */}
        <section id="how-it-works" className="relative py-32 bg-[#FFFFFF] dark-theme:bg-[#121214]">
          <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              <div>
                <h2 className="text-xs font-bold text-[#C27A3A] dark-theme:text-[#D4A574] uppercase tracking-widest mb-4">Simple Process</h2>
                <h3 className="text-3xl md:text-5xl font-bold text-[#2C2926] dark-theme:text-gray-100 leading-[1.1] mb-6 font-serif">
                  From Campus to Corporate <br className="hidden lg:block"/> in 3 steps.
                </h3>
                <p className="text-lg text-[#5C5956] dark-theme:text-gray-400 mb-12">
                  We verify every profile to ensure this remains a safe, high-quality, and exclusive environment.
                </p>

                <div className="space-y-10">
                  {[
                    {
                      num: '1',
                      title: 'Register & Verify',
                      desc: 'Sign up using your MKCE credentials. Our admin team will verify your identity before granting access.',
                    },
                    {
                      num: '2',
                      title: 'Connect & Schedule',
                      desc: 'Browse alumni profiles by company or domain. Send messages or book 1-on-1 mentorship sessions directly.',
                    },
                    {
                      num: '3',
                      title: 'Learn & Get Hired',
                      desc: 'Attend workshops, follow roadmaps, and apply to exclusive job referrals to land your dream role.',
                    }
                  ].map((step, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-[#FAF9F5] dark-theme:bg-[#18181A] border border-[#DCD5CF] dark-theme:border-gray-700 text-[#2C2926] dark-theme:text-gray-100 flex items-center justify-center font-bold text-sm shrink-0">
                          {step.num}
                        </div>
                        {i !== 2 && <div className="w-px h-full bg-[#E5DCD5] dark-theme:bg-gray-800 mt-4"></div>}
                      </div>
                      <div className="pb-2 pt-1">
                        <h4 className="text-lg font-bold text-[#2C2926] dark-theme:text-gray-100 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-[#5C5956] dark-theme:text-gray-400 leading-relaxed text-[15px]">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Minimal Abstract UI Visual */}
              <div className="relative lg:pl-10">
                <div className="bg-[#FAF9F5] dark-theme:bg-[#18181A] border border-[#F2EBE5] dark-theme:border-gray-800 rounded-[2rem] p-8 shadow-2xl shadow-[#2C2926]/5">
                  <div className="flex items-center gap-2 mb-8 pb-4 border-b border-[#E5DCD5] dark-theme:border-gray-800">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5DCD5] dark-theme:bg-gray-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5DCD5] dark-theme:bg-gray-700"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#E5DCD5] dark-theme:bg-gray-700"></div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-5 rounded-2xl bg-white dark-theme:bg-[#121214] border border-[#F2EBE5] dark-theme:border-gray-800/60">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#F5F2EF] dark-theme:bg-[#2A2A2D]"></div>
                        <div>
                          <div className="h-3 w-24 bg-[#E5DCD5] dark-theme:bg-gray-700 rounded-full mb-3"></div>
                          <div className="h-2 w-16 bg-[#F2EBE5] dark-theme:bg-gray-800 rounded-full"></div>
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-[#F5F2EF] dark-theme:bg-[#2A2A2D] rounded-full"></div>
                    </div>
                    
                    <div className="flex justify-between items-center p-5 rounded-2xl bg-white dark-theme:bg-[#121214] border border-[#F2EBE5] dark-theme:border-gray-800/60">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#F5F2EF] dark-theme:bg-[#2A2A2D]"></div>
                        <div>
                          <div className="h-3 w-32 bg-[#E5DCD5] dark-theme:bg-gray-700 rounded-full mb-3"></div>
                          <div className="h-2 w-20 bg-[#F2EBE5] dark-theme:bg-gray-800 rounded-full"></div>
                        </div>
                      </div>
                      <div className="h-8 w-20 bg-[#C27A3A]/10 text-[#C27A3A] rounded-full flex items-center justify-center text-[10px] font-bold">BOOKED</div>
                    </div>

                    <div className="h-32 w-full bg-[#F5F2EF] dark-theme:bg-[#2A2A2D] rounded-2xl mt-8"></div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
          <CurveDivider fillColor="fill-[#F2EBE5] dark-theme:fill-[#0A0A0B]" />
        </section>


        {/* ═══════════════════════════ TESTIMONIALS ═══════════════════════════ */}
        <section id="testimonials" className="relative py-32 bg-[#F2EBE5] dark-theme:bg-[#0A0A0B]">
          <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16">
            <div className="text-center mb-20 max-w-3xl mx-auto">
              <h2 className="text-xs font-bold text-[#C27A3A] dark-theme:text-[#D4A574] uppercase tracking-widest mb-4">Impact</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-[#2C2926] dark-theme:text-gray-100 leading-[1.1] font-serif">
                What the community says.
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Thanks to a mock interview with a 2018 Alumni, I cleared my final round at Amazon! The roadmap provided in the groups was incredibly accurate.",
                  name: "Siddharth R.",
                  role: "Final Year Student",
                },
                {
                  quote: "It's so fulfilling to give back. I posted a referral link for a junior role in my team, and we hired a brilliant student from MKCE within a week.",
                  name: "Priya M.",
                  role: "Alumni '19, SDE",
                },
                {
                  quote: "The 1-on-1 mentorship completely changed my perspective on backend development. Having a private space to ask 'silly' questions is a game changer.",
                  name: "Karthik V.",
                  role: "3rd Year Student",
                }
              ].map((t, i) => (
                <div key={i} className="p-10 rounded-[2rem] bg-white dark-theme:bg-[#18181A] border border-[#E5DCD5] dark-theme:border-gray-800/60 shadow-sm transition-transform hover:-translate-y-1">
                  <div className="text-4xl font-serif text-[#C27A3A] dark-theme:text-[#D4A574] mb-6">"</div>
                  <p className="text-[#2C2926] dark-theme:text-gray-300 mb-10 text-[15px] leading-relaxed">
                    {t.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-[#FAF9F5] dark-theme:bg-[#2A2A2D] text-[#2C2926] dark-theme:text-gray-100 border border-[#E5DCD5] dark-theme:border-gray-700">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-[#2C2926] dark-theme:text-gray-100 text-sm">{t.name}</h5>
                      <span className="text-xs text-[#8C8985]">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <CurveDivider fillColor="fill-[#1A1816] dark-theme:fill-[#0A0A0B]" />
        </section>

        {/* ═══════════════════════════ CTA / BOTTOM BAR ═══════════════════════════ */}
        <section id="cta" className="relative py-32 bg-[#1A1816] dark-theme:bg-[#0A0A0B] overflow-hidden">
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-serif leading-[1.1]">
              Ready to take your Next Step?
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of MKCE students who are already learning from the best. Sign up today and gain exclusive access to the network.
            </p>
            <Link to="/auth" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-[#1A1816] font-bold text-[15px] hover:scale-105 transition-transform shadow-xl shadow-black/20">
              Get Started Now
            </Link>
          </div>
          
          <CurveDivider fillColor="fill-[#0F0F0F] dark-theme:fill-[#050505]" />
        </section>

        {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
        <footer className="bg-[#0F0F0F] dark-theme:bg-[#050505] pt-16 pb-8 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-white/10 pb-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <i className="ri-seedling-fill text-[#D4A574] text-xl"></i>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">NextStep</span>
              </div>
              <div className="text-[#8C8985] text-sm text-center md:text-right">
                <p>Exclusive Private Network for MKCE</p>
                <p className="text-[#D4A574] mt-1 font-medium">100% Free • Secure • Community Driven</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#5C5956] font-medium tracking-wide">
              <p>&copy; {currentYear} NextStep | MKCE Alumni Network. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Contact Admin</a>
              </div>
            </div>
          </div>
        </footer>

      </main>

      {showTopBtn && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#1A1816] dark-theme:bg-white text-white dark-theme:text-[#1A1816] shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 border border-white/10 dark-theme:border-black/10"
        >
          <i className="ri-arrow-up-line text-lg"></i>
        </button>
      )}
    </>
  );
};

export default Home;
