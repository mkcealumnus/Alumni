import React, { useState } from 'react';
import Header from './components/Header';
import CountdownTimer from './components/CountdownTimer';
import NotifyForm from './components/NotifyForm';
import FeatureTeasers from './components/FeatureTeasers';
import CalendarAddModal from './components/CalendarAddModal';
import FaqSection from './components/FaqSection';
import ShareBar from './components/ShareBar';
import Footer from './components/Footer';
import { Sparkles, Calendar, ArrowRight, ShieldCheck, Award, Zap, HeartHandshake } from 'lucide-react';

export default function App() {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background radial glow & subtle grid pattern */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0"></div>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col">
        
        {/* Navigation Header */}
        <Header
          onNavigate={scrollToSection}
          onOpenCalendarModal={() => setIsCalendarModalOpen(true)}
        />

        {/* Hero Section */}
        <section className="relative px-4 pt-12 lg:pt-20 pb-8 text-center max-w-5xl mx-auto">
          
          {/* Top Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono font-medium text-slate-300 shadow-xl mb-6 backdrop-blur-md hover:border-orange-500/40 transition-all cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-orange-400 font-bold">OFFICIAL PORTAL</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">mkcealumni.org</span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400 font-bold">JAN 14, 2027</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-sans tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Connecting Generations of <br className="hidden sm:inline" />
            <span className="gradient-text font-serif italic font-normal">Engineering Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The official central alumni platform for <strong className="text-white">M. Kumarasamy College of Engineering</strong> is going live. Verified alumni network, career pathways, placement archives & 1-on-1 mentorship.
          </p>

          {/* Action Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('notify-section')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-slate-950 font-extrabold text-sm shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve Early Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-orange-500/40 font-bold text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Save Launch Date (.ics)</span>
            </button>
          </div>

          {/* Institutional Highlights Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Verified Badge</span>
                <span className="block text-[11px] text-slate-400 font-mono">100% MKCE Alumni</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Career Vault</span>
                <span className="block text-[11px] text-slate-400 font-mono">Tech Roadmaps</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Mentorship Hub</span>
                <span className="block text-[11px] text-slate-400 font-mono">1-on-1 Sessions</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-white">Global Chapters</span>
                <span className="block text-[11px] text-slate-400 font-mono">Worldwide Network</span>
              </div>
            </div>
          </div>

        </section>

        {/* Live Countdown Timer Component */}
        <section>
          <CountdownTimer onOpenCalendarModal={() => setIsCalendarModalOpen(true)} />
        </section>

        {/* Priority Access Subscription Form */}
        <section>
          <NotifyForm />
        </section>

        {/* Feature Teasers */}
        <section>
          <FeatureTeasers />
        </section>

        {/* Social Share Bar */}
        <section>
          <ShareBar />
        </section>

        {/* FAQ Accordion */}
        <section>
          <FaqSection />
        </section>

        {/* Footer */}
        <Footer />

        {/* Calendar Add Modal */}
        <CalendarAddModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
        />

      </div>

    </div>
  );
}
