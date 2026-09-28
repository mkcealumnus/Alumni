import React, { useState } from 'react';
import Header from './components/Header';
import CountdownTimer from './components/CountdownTimer';
import NotifyForm from './components/NotifyForm';
import FeatureTeasers from './components/FeatureTeasers';
import KeyDevelopers from './components/KeyDevelopers';
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
    <div className="min-h-screen bg-[#fcfcfd] text-slate-900 flex flex-col font-sans selection:bg-orange-500 selection:text-white relative overflow-x-hidden">
      
      {/* Light background radial glow & subtle grid pattern */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-60 pointer-events-none z-0"></div>

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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 shadow-sm mb-6 backdrop-blur-md hover:border-orange-400 transition-all cursor-default">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-orange-600 font-extrabold">OFFICIAL PORTAL</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-800">mkcealumni.org</span>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-extrabold">JAN 14, 2027</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-sans tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Connecting Generations of <br className="hidden sm:inline" />
            <span className="gradient-text font-serif italic font-normal">Engineering Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            The official central alumni platform for <strong className="text-slate-900 font-bold">M. Kumarasamy College of Engineering</strong> is going live. Verified alumni network, career pathways, placement archives & 1-on-1 mentorship.
          </p>

          {/* Action Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('notify-section')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm shadow-md shadow-orange-500/20 hover:shadow-orange-500/30 transition-all cursor-pointer flex items-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reserve Early Access</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsCalendarModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-orange-400 font-bold text-sm shadow-2xs transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-orange-600" />
              <span>Save Launch Date (.ics)</span>
            </button>
          </div>

          {/* Institutional Highlights Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-900">Verified Badge</span>
                <span className="block text-[11px] text-slate-500 font-mono font-medium">100% MKCE Alumni</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-900">Career Vault</span>
                <span className="block text-[11px] text-slate-500 font-mono font-medium">Tech Roadmaps</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-900">Mentorship Hub</span>
                <span className="block text-[11px] text-slate-500 font-mono font-medium">1-on-1 Sessions</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-900">Global Chapters</span>
                <span className="block text-[11px] text-slate-500 font-mono font-medium">Worldwide Network</span>
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

        {/* Key Developers Showcase */}
        <section>
          <KeyDevelopers />
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
