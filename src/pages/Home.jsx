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

  const [formStatus, setFormStatus] = useState('');
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

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]')?.value;
    if (!email) return;
    const res = await publicApi.subscribeNewsletter({ email });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Subscribed!', text: 'You have been subscribed to our newsletter.', timer: 2000, showConfirmButton: false });
      e.target.reset();
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not subscribe.' });
    }
  };



  return (
    <>
      <Sidebar />
      <ThemeToggle />

      <main className="ml-0 lg:ml-20">

        {/* ═══════════════════════════ HERO ═══════════════════════════ */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-cream dark-theme:bg-gray-950">
          {/* Gradient Orbs */}
          <div className="hero-orb hero-orb-1 -top-20 -left-24"></div>
          <div className="hero-orb hero-orb-2 top-1/4 -right-16"></div>
          <div className="hero-orb hero-orb-3 bottom-16 left-1/4"></div>
          <div className="hero-orb hero-orb-4 top-12 right-1/3"></div>
          <div className="hero-orb hero-orb-5 -bottom-20 -right-20"></div>

          {/* Subtle grid lines */}
          <div className="hero-grid-line w-px h-full left-1/4 top-0"></div>
          <div className="hero-grid-line w-px h-full left-2/4 top-0"></div>
          <div className="hero-grid-line w-px h-full left-3/4 top-0"></div>
          <div className="hero-grid-line h-px w-full top-1/3 left-0"></div>
          <div className="hero-grid-line h-px w-full top-2/3 left-0"></div>

          {/* Top Contact Bar */}
          <div className="absolute top-0 left-0 right-0 flex justify-center gap-6 py-3 text-sm text-gray-500 dark-theme:text-gray-400 z-10">
            <div className="flex items-center gap-2">
              <i className="ri-mail-line text-primary"></i>
              <span>berries@nextstep.app</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <i className="ri-phone-line text-primary"></i>
              <span>+91 7010707678</span>
            </div>
          </div>

          {/* Centered Hero Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 py-32 text-center">
            <div className="animate-fade-in-up">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 border border-primary/15 text-primary text-sm font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Free Certification Courses for Everyone
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark-theme:text-gray-100 leading-[1.1] tracking-tight mb-6">
                Grow with{' '}
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

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-500 dark-theme:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                Free certification courses, hands-on coding practice, aptitude training, and mentorship —{' '}
                <span className="text-gray-700 dark-theme:text-gray-200 font-medium">everything you need to kickstart your tech career</span>, without spending a penny.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link to="/auth" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-semibold shadow-sm hover:bg-primary-dark transition-all duration-200">
                  Start Learning Free
                  <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform"></i>
                </Link>
                <a href="#about" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 text-gray-700 dark-theme:text-gray-200 font-semibold hover:border-primary/30 hover:text-primary transition-all duration-200">
                  <i className="ri-information-line"></i>
                  Learn More
                </a>
              </div>

              {/* Trust line */}
              <p className="text-xs text-gray-400 dark-theme:text-gray-500 mb-14">
                <i className="ri-shield-check-line text-sage mr-1"></i> 100% Free &nbsp;·&nbsp; <i className="ri-award-line text-amber mr-1"></i> Certified Courses &nbsp;·&nbsp; <i className="ri-code-s-slash-line text-primary mr-1"></i> Hands-on Practice
              </p>

              {/* Highlight Cards */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {[
                  { icon: 'ri-book-open-line', text: 'Free Courses', bg: 'bg-peach/30 dark-theme:bg-peach/10', iconColor: 'text-terracotta' },
                  { icon: 'ri-award-line', text: 'Certifications', bg: 'bg-sage/30 dark-theme:bg-sage/10', iconColor: 'text-sage' },
                  { icon: 'ri-code-s-slash-line', text: 'Coding Practice', bg: 'bg-primary/10 dark-theme:bg-primary/8', iconColor: 'text-primary' },
                  { icon: 'ri-brain-line', text: 'Aptitude Training', bg: 'bg-amber/20 dark-theme:bg-amber/10', iconColor: 'text-amber' },
                  { icon: 'ri-group-line', text: 'Expert Mentors', bg: 'bg-blush/25 dark-theme:bg-blush/10', iconColor: 'text-clay' },
                  { icon: 'ri-gamepad-line', text: 'Learning Games', bg: 'bg-linen dark-theme:bg-sienna/10', iconColor: 'text-sienna' },
                ].map((card, i) => (
                  <div key={i} className={`${card.bg} px-4 py-2.5 rounded-xl border border-sand/50 dark-theme:border-gray-800 flex items-center gap-2.5 text-sm font-medium text-gray-700 dark-theme:text-gray-300 hover:scale-[1.03] transition-transform duration-200`}>
                    <i className={`${card.icon} ${card.iconColor} text-base`}></i>
                    {card.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z" className="fill-white dark-theme:fill-gray-900" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════ ABOUT ═══════════════════════════ */}
        <section id="about" className="relative py-24 pb-32 bg-white dark-theme:bg-gray-900 overflow-hidden">
          <div className="hero-orb hero-orb-2 -top-32 -right-32 opacity-20"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage/15 text-sage text-sm font-medium mb-4">
                <i className="ri-seedling-line"></i> Our Story
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark-theme:text-gray-100">
                About <span className="relative inline-block"><span className="text-gradient">NextStep</span><svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-grad-about)" strokeWidth="3" strokeLinecap="round" /><defs><linearGradient id="underline-grad-about" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stopColor="#c96442" /><stop offset="100%" stopColor="#a78058" /></linearGradient></defs></svg></span>
              </h2>
              <p className="mt-4 text-gray-500 dark-theme:text-gray-400 max-w-2xl mx-auto">A learning platform built by students, for students — making quality tech education accessible to everyone.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Visual Side */}
              <div className="relative flex justify-center">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                  <div className="absolute inset-0 rounded-[2rem] bg-peach/20 dark-theme:bg-peach/10 rotate-3"></div>
                  <div className="absolute inset-0 rounded-[2rem] bg-sage/15 dark-theme:bg-sage/8 -rotate-3"></div>
                  <div className="absolute inset-2 rounded-[1.75rem] bg-cream dark-theme:bg-gray-800 flex items-center justify-center">
                    <i className="ri-plant-line text-7xl text-primary opacity-80"></i>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 px-4 py-2.5 bg-white dark-theme:bg-gray-800 rounded-xl border border-sand dark-theme:border-gray-700 shadow-sm flex items-center gap-2 text-sm font-medium text-gray-700 dark-theme:text-gray-200 animate-float">
                  <div className="w-6 h-6 rounded-md bg-sage/20 flex items-center justify-center">
                    <i className="ri-money-dollar-circle-line text-sage text-xs"></i>
                  </div>
                  100% Free
                </div>
                <div className="absolute -bottom-4 -right-4 px-4 py-2.5 bg-white dark-theme:bg-gray-800 rounded-xl border border-sand dark-theme:border-gray-700 shadow-sm flex items-center gap-2 text-sm font-medium text-gray-700 dark-theme:text-gray-200 animate-float-delay">
                  <div className="w-6 h-6 rounded-md bg-amber/20 flex items-center justify-center">
                    <i className="ri-medal-line text-amber text-xs"></i>
                  </div>
                  Certified
                </div>
                <div className="absolute top-1/2 -right-8 px-4 py-2.5 bg-white dark-theme:bg-gray-800 rounded-xl border border-sand dark-theme:border-gray-700 shadow-sm flex items-center gap-2 text-sm font-medium text-gray-700 dark-theme:text-gray-200 animate-float">
                  <div className="w-6 h-6 rounded-md bg-blush/20 flex items-center justify-center">
                    <i className="ri-heart-line text-primary text-xs"></i>
                  </div>
                  Built with Love
                </div>
              </div>

              {/* Text Side */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">What is NextStep?</h3>
                <p className="text-gray-500 dark-theme:text-gray-400 leading-relaxed">
                  NextStep is a free online learning platform that offers certification courses, hands-on coding practice, aptitude training, and personalized mentorship. We believe that financial barriers should never stand in the way of learning, so every course and resource on NextStep is completely free.
                </p>
                <p className="text-gray-500 dark-theme:text-gray-400 leading-relaxed">
                  Whether you're a complete beginner taking your first step into technology or someone looking to sharpen your skills, NextStep provides the tools, guidance, and community to help you grow.
                </p>
                <div className="space-y-3">
                  {[
                    { text: 'Free Certification Courses', icon: 'ri-award-line', color: 'bg-peach/20 text-terracotta' },
                    { text: 'Coding & Aptitude Practice', icon: 'ri-code-box-line', color: 'bg-sage/20 text-sage' },
                    { text: 'Mentorship & Guidance', icon: 'ri-user-star-line', color: 'bg-amber/20 text-amber' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand/50 dark-theme:border-gray-700">
                      <div className={`w-8 h-8 rounded-lg ${item.color} flex items-center justify-center`}>
                        <i className={`${item.icon} text-sm`}></i>
                      </div>
                      <span className="font-medium text-gray-700 dark-theme:text-gray-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60V20C360 50 720 50 1080 30C1260 20 1380 10 1440 5V60H0Z" className="fill-cream dark-theme:fill-gray-950" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════ OUR MOTO ═══════════════════════════ */}
        <section id="moto" className="relative py-24 pb-32 bg-cream dark-theme:bg-gray-950 overflow-hidden">
          <div className="hero-orb hero-orb-1 -top-20 -left-20 opacity-15"></div>
          <div className="hero-orb hero-orb-4 bottom-10 right-10 opacity-15"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-medium mb-4">
                <i className="ri-focus-3-line"></i> Our Moto
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark-theme:text-gray-100">
                Learn. Build. <span className="relative inline-block"><span className="text-gradient">Grow.</span><svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-grad-moto)" strokeWidth="3" strokeLinecap="round" /><defs><linearGradient id="underline-grad-moto" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stopColor="#c96442" /><stop offset="100%" stopColor="#a78058" /></linearGradient></defs></svg></span>
              </h2>
              <p className="mt-4 text-gray-500 dark-theme:text-gray-400 max-w-2xl mx-auto">Empowering every aspiring developer with free, high-quality education and the practical skills needed to thrive in the tech industry.</p>
            </div>

            {/* Moto Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  icon: 'ri-book-open-line',
                  title: 'Free Certification Courses',
                  description: 'Access structured courses across web development, data science, programming, and more — all completely free with certificates on completion.',
                  color: 'bg-peach/20 text-terracotta',
                  border: 'border-peach/30',
                },
                {
                  icon: 'ri-code-s-slash-line',
                  title: 'Hands-on Coding Practice',
                  description: 'Solve real-world coding challenges with our built-in code editor. Practice DSA, problem solving, and build the skills that employers look for.',
                  color: 'bg-sage/20 text-sage',
                  border: 'border-sage/30',
                },
                {
                  icon: 'ri-brain-line',
                  title: 'Aptitude & Interview Prep',
                  description: 'Sharpen your logical thinking with aptitude tests and quizzes designed to prepare you for placement drives and technical interviews.',
                  color: 'bg-amber/20 text-amber',
                  border: 'border-amber/30',
                },
              ].map((card, i) => (
                <div key={i} className={`bg-white dark-theme:bg-gray-900 rounded-2xl p-8 border ${card.border} dark-theme:border-gray-800 hover:shadow-lg transition-shadow duration-300`}>
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-5`}>
                    <i className={`${card.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-500 dark-theme:text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: 'ri-team-line',
                  title: 'Mentorship & Doubt Resolution',
                  description: 'Get your doubts cleared by mentors who have been through the same journey. No question is too small — we are here to guide you at every step.',
                  color: 'bg-blush/20 text-clay',
                  border: 'border-blush/30',
                },
                {
                  icon: 'ri-gamepad-line',
                  title: 'Learning Through Games',
                  description: 'Master algorithms and data structures through interactive games that make complex concepts fun and engaging. Learn by playing, not just reading.',
                  color: 'bg-primary/10 text-primary',
                  border: 'border-primary/20',
                },
              ].map((card, i) => (
                <div key={i} className={`bg-white dark-theme:bg-gray-900 rounded-2xl p-8 border ${card.border} dark-theme:border-gray-800 hover:shadow-lg transition-shadow duration-300`}>
                  <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center mb-5`}>
                    <i className={`${card.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-3">{card.title}</h3>
                  <p className="text-sm text-gray-500 dark-theme:text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>

            {/* Mission Statement */}
            <div className="mt-16 text-center max-w-3xl mx-auto">
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-8 border border-sand dark-theme:border-gray-800">
                <i className="ri-double-quotes-l text-3xl text-primary/30 mb-3 block"></i>
                <p className="text-lg text-gray-700 dark-theme:text-gray-300 leading-relaxed italic">
                  "We believe learning should never come with a price tag. Our mission is to break down every barrier between a curious mind and the skills they need to succeed in technology."
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center">
                    <i className="ri-seedling-fill text-primary text-sm"></i>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark-theme:text-gray-200">The NextStep Team</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60V30C300 10 600 0 900 15C1100 25 1300 40 1440 35V60H0Z" className="fill-white dark-theme:fill-gray-900" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════ WHO WE ARE ═══════════════════════════ */}
        <section id="who-we-are" className="relative py-24 pb-32 bg-white dark-theme:bg-gray-900 overflow-hidden">
          <div className="hero-orb hero-orb-3 -top-24 left-10 opacity-15"></div>
          <div className="hero-orb hero-orb-5 bottom-0 -right-20 opacity-15"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush/15 text-clay text-sm font-medium mb-4">
                <i className="ri-team-line"></i> Who We Are
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark-theme:text-gray-100">
                Built by <span className="relative inline-block"><span className="text-gradient">Students</span><svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-grad-who)" strokeWidth="3" strokeLinecap="round" /><defs><linearGradient id="underline-grad-who" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stopColor="#c96442" /><stop offset="100%" stopColor="#a78058" /></linearGradient></defs></svg></span>, for Students
              </h2>
              <p className="mt-4 text-gray-500 dark-theme:text-gray-400 max-w-2xl mx-auto">We are a team of upcoming developers who turned our struggles into a solution for others.</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Story Side */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Our Story</h3>
                <p className="text-gray-500 dark-theme:text-gray-400 leading-relaxed">
                  We are a group of new and upcoming developers who know the struggle of starting from scratch. When we began our journey into tech, we faced the same problems every beginner faces — scattered resources, expensive courses, no clear roadmap, and nobody to ask for help when we got stuck.
                </p>
                <p className="text-gray-500 dark-theme:text-gray-400 leading-relaxed">
                  Finding quality learning material that was structured, beginner-friendly, and free felt nearly impossible. We spent countless hours searching for the right tutorials, figuring things out on our own, and wishing someone had made this path easier for us.
                </p>
                <p className="text-gray-500 dark-theme:text-gray-400 leading-relaxed">
                  That's exactly why we built <span className="font-semibold text-gray-700 dark-theme:text-gray-200">NextStep</span>. We wanted to create the platform we wish we had when we started — a place where anyone can learn coding, practice aptitude, earn certifications, and get mentorship, all for <span className="font-semibold text-primary">completely free</span>.
                </p>
                <p className="text-gray-500 dark-theme:text-gray-400 leading-relaxed">
                  We understand the struggle because we lived it. And now we are here to make sure no one else has to go through it alone.
                </p>
              </div>

              {/* Visual Side */}
              <div className="space-y-6">
                {/* Journey Cards */}
                {[
                  {
                    icon: 'ri-emotion-sad-line',
                    title: 'The Struggle Was Real',
                    text: 'Expensive courses, scattered tutorials, no mentors — starting out in tech was overwhelming and lonely.',
                    color: 'bg-red-500/10 text-red-500',
                    accent: 'border-l-red-400',
                  },
                  {
                    icon: 'ri-lightbulb-line',
                    title: 'The Idea Sparked',
                    text: 'What if we could build the platform we wished existed? Free courses, structured learning, real practice, and a community that helps.',
                    color: 'bg-amber/15 text-amber',
                    accent: 'border-l-amber',
                  },
                  {
                    icon: 'ri-hammer-line',
                    title: 'We Built NextStep',
                    text: 'As developers who learned the hard way, we poured everything we know into building a platform that makes learning free and accessible.',
                    color: 'bg-sage/15 text-sage',
                    accent: 'border-l-sage',
                  },
                  {
                    icon: 'ri-heart-line',
                    title: 'Now We Give Back',
                    text: 'Every free course, every coding challenge, every doubt resolved — it is our way of ensuring the next generation of developers never has to struggle like we did.',
                    color: 'bg-primary/10 text-primary',
                    accent: 'border-l-primary',
                  },
                ].map((step, i) => (
                  <div key={i} className={`bg-cream dark-theme:bg-gray-800 rounded-xl p-5 border border-sand/50 dark-theme:border-gray-700 border-l-4 ${step.accent} flex gap-4`}>
                    <div className={`w-10 h-10 rounded-lg ${step.color} flex items-center justify-center shrink-0`}>
                      <i className={`${step.icon} text-lg`}></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500 dark-theme:text-gray-400 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60V20C360 50 720 50 1080 30C1260 20 1380 10 1440 5V60H0Z" className="fill-cream dark-theme:fill-gray-950" />
            </svg>
          </div>
        </section>



        {/* ═══════════════════════════ CONTACT ═══════════════════════════ */}
        <section id="contact" className="relative py-24 pb-32 bg-cream dark-theme:bg-gray-950 overflow-hidden">
          <div className="hero-orb hero-orb-5 -top-20 -right-32 opacity-20"></div>
          <div className="hero-orb hero-orb-3 bottom-0 left-10 opacity-15"></div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-medium mb-4">
                <i className="ri-chat-smile-line"></i> Let's Connect
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark-theme:text-gray-100">
                Get in <span className="relative inline-block"><span className="text-gradient">Touch</span><svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none"><path d="M2 6C50 2 150 2 198 6" stroke="url(#underline-grad-contact)" strokeWidth="3" strokeLinecap="round" /><defs><linearGradient id="underline-grad-contact" x1="0" y1="0" x2="200" y2="0"><stop offset="0%" stopColor="#c96442" /><stop offset="100%" stopColor="#a78058" /></linearGradient></defs></svg></span>
              </h2>
              <p className="mt-4 text-gray-500 dark-theme:text-gray-400 max-w-2xl mx-auto">Have questions or want to learn more? We're here to help you on your learning journey.</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
              {/* Contact Info — dark warm panel */}
              <div className="lg:col-span-2 bg-gray-950 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-sage/10 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Contact Information</h3>
                  <p className="text-white/50 text-sm mb-8">We're here to help you succeed.</p>

                  <div className="space-y-5">
                    {[
                      { icon: 'ri-map-pin-line', title: 'Our Location', lines: ['Yelahanka', 'Bangalore, Karnataka 560064'], color: 'bg-primary/15' },
                      { icon: 'ri-mail-line', title: 'Email Us', lines: ['berries@nextstep.app', 'ceo@nextstep.app'], color: 'bg-sage/15' },
                      { icon: 'ri-phone-line', title: 'Call Us', lines: ['+91 7010707678'], color: 'bg-amber/15' },
                      { icon: 'ri-time-line', title: 'Office Hours', lines: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 1:00 PM'], color: 'bg-blush/15' },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-9 h-9 rounded-lg ${item.color} flex items-center justify-center shrink-0`}>
                          <i className={`${item.icon} text-sm`}></i>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-white/90">{item.title}</h4>
                          {item.lines.map((line, j) => (
                            <p key={j} className="text-white/50 text-sm">{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-sm font-medium text-white/70 mb-3">Connect With Us</h4>
                    <div className="flex gap-2">
                      {[
                        { icon: 'ri-facebook-fill', hover: 'hover:bg-blue-500/20' },
                        { icon: 'ri-twitter-x-fill', hover: 'hover:bg-white/15' },
                        { icon: 'ri-instagram-fill', hover: 'hover:bg-pink-500/20' },
                        { icon: 'ri-linkedin-fill', hover: 'hover:bg-blue-600/20' },
                        { icon: 'ri-youtube-fill', hover: 'hover:bg-red-500/20' },
                      ].map((s, i) => (
                        <a key={i} href="#" className={`w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center text-white/60 ${s.hover} hover:text-white transition-all`}>
                          <i className={`${s.icon} text-sm`}></i>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3 bg-white dark-theme:bg-gray-900 rounded-2xl p-8 border border-sand dark-theme:border-gray-800">
                <h3 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100 mb-1">Send Us a Message</h3>
                <p className="text-sm text-gray-400 mb-6">We'll get back to you within 24 hours</p>
                <form onSubmit={handleContactFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input type="text" placeholder="Your Name" required className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors" />
                    </div>
                    <div className="relative">
                      <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input type="email" placeholder="Your Email" required className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <i className="ri-phone-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <input type="tel" placeholder="Your Phone (optional)" className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors" />
                    </div>
                    <div className="relative">
                      <i className="ri-menu-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                      <select required className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 transition-colors appearance-none">
                        <option value="" disabled>Select Subject</option>
                        <option>Course Inquiry</option>
                        <option>Enrollment</option>
                        <option>Technical Support</option>
                        <option>Feedback</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="relative">
                    <i className="ri-message-2-line absolute left-3 top-4 text-gray-400"></i>
                    <textarea placeholder="Your Message" required rows={4} className="w-full pl-10 pr-4 py-3 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm text-gray-700 dark-theme:text-gray-200 resize-none transition-colors"></textarea>
                  </div>
                  <div className="flex items-center gap-4">
                    <button type="submit" className="group px-8 py-3 rounded-xl bg-primary text-white font-semibold shadow-sm hover:bg-primary-dark transition-all duration-200 flex items-center gap-2">
                      <i className="ri-send-plane-fill group-hover:translate-x-0.5 transition-transform"></i> Send Message
                    </button>
                    {formStatus && <span className="text-sm text-sage font-medium flex items-center gap-1"><i className="ri-check-line"></i> {formStatus}</span>}
                  </div>
                </form>

                <div className="mt-6 rounded-xl overflow-hidden h-44 border border-sand dark-theme:border-gray-700">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62179.39302498498!2d77.52836804863279!3d13.100700700000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17595de01e11%3A0x98e14e7f7220bd28!2sYelahanka%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1708000000000!5m2!1sen!2sin" className="w-full h-full border-0" style={{ touchAction: 'pan-x pan-y' }} allowFullScreen="" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-auto">
              <path d="M0 60V15C300 40 600 50 900 30C1100 18 1300 8 1440 12V60H0Z" className="fill-gray-950" />
            </svg>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
      <footer className="bg-gray-950 text-white ml-0 lg:ml-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sage/5 rounded-full blur-[80px]"></div>

        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* About Column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                  <i className="ri-seedling-fill text-lg text-primary-light"></i>
                </div>
                <h2 className="text-lg font-bold">NextStep <span className="text-primary-light">Academy</span></h2>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">Free certification courses, coding practice, and mentorship — built by students who know the struggle of starting out in tech.</p>

              <div className="flex gap-2">
                {[
                  { icon: 'ri-facebook-fill', hover: 'hover:bg-blue-500/15 hover:text-blue-400' },
                  { icon: 'ri-twitter-x-fill', hover: 'hover:bg-white/10 hover:text-white' },
                  { icon: 'ri-instagram-fill', hover: 'hover:bg-pink-500/15 hover:text-pink-400' },
                  { icon: 'ri-linkedin-fill', hover: 'hover:bg-blue-600/15 hover:text-blue-400' },
                  { icon: 'ri-youtube-fill', hover: 'hover:bg-red-500/15 hover:text-red-400' },
                ].map((s, i) => (
                  <a key={i} href="#" className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 transition-all ${s.hover}`}>
                    <i className={`${s.icon} text-sm`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-400">Explore</h3>
              <div className="space-y-0.5">
                {[
                  { text: 'Home', href: '#hero' },
                  { text: 'About Us', href: '#about' },
                  { text: 'Our Moto', href: '#moto' },
                  { text: 'Who We Are', href: '#who-we-are' },
                  { text: 'Contact Us', href: '#contact' },
                ].map((link, i) => (
                  <a key={i} href={link.href} className="flex items-center gap-2 py-1.5 text-sm text-gray-500 hover:text-peach transition-colors group">
                    <i className="ri-arrow-right-s-line text-xs text-gray-600 group-hover:text-peach transition-colors"></i> {link.text}
                  </a>
                ))}
              </div>
            </div>

            {/* What We Offer Column */}
            <div>
              <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-400">What We Offer</h3>
              <div className="space-y-0.5">
                {['Free Courses', 'Coding Practice', 'Aptitude Tests', 'Certifications', 'Mentorship', 'Learning Games'].map((item, i) => (
                  <span key={i} className="flex items-center gap-2 py-1.5 text-sm text-gray-500 group">
                    <i className="ri-arrow-right-s-line text-xs text-gray-600"></i> {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact & Newsletter Column */}
            <div>
              <h3 className="text-sm font-semibold mb-5 uppercase tracking-wider text-gray-400">Get In Touch</h3>
              <ul className="space-y-3 text-sm text-gray-500 mb-6">
                <li className="flex gap-3"><i className="ri-map-pin-line text-primary-light mt-0.5"></i><span>Yelahanka, Bangalore<br />Karnataka - 560064</span></li>
                <li className="flex gap-3"><i className="ri-mail-line text-primary-light"></i><span>berries@nextstep.com</span></li>
                <li className="flex gap-3"><i className="ri-phone-line text-primary-light"></i><span>+91 8825756388</span></li>
              </ul>

              <h4 className="text-sm font-medium text-gray-400 mb-2">Newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input type="email" placeholder="Your Email" required className="flex-1 px-4 py-2.5 rounded-l-xl bg-white/5 border border-white/10 text-sm text-gray-300 outline-none focus:border-primary transition-colors placeholder:text-gray-600" />
                <button type="submit" className="px-4 py-2.5 rounded-r-xl bg-primary text-white hover:bg-primary-dark transition-colors">
                  <i className="ri-send-plane-fill text-sm"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 py-4">
          <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-600">&copy; {currentYear} NextStep. All Rights Reserved.</p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Service'].map((link, i) => (
                <a key={i} href="#" className="text-xs text-gray-600 hover:text-primary-light transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Go to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-11 h-11 rounded-xl bg-primary text-white shadow-sm flex items-center justify-center hover:bg-primary-dark transition-all duration-200 cursor-pointer
          ${showTopBtn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <i className="ri-arrow-up-line text-lg"></i>
      </button>
    </>
  );
};

export default Home;
