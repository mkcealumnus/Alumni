import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Globe, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CountdownTimer({ onOpenCalendarModal }) {
  // Target Date: February 1, 2027 00:00:00 IST (UTC+05:30)
  const TARGET_DATE_STRING = '2027-02-01T00:00:00+05:30';
  const targetDate = new Date(TARGET_DATE_STRING).getTime();

  // Campaign Start Date for progress bar calculation (Jan 1, 2026)
  const campaignStartDate = new Date('2026-01-01T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [tzMode, setTzMode] = useState('IST');
  const [progressPercent, setProgressPercent] = useState(0);

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds, isCompleted: false };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      const now = new Date().getTime();
      const totalDuration = targetDate - campaignStartDate;
      const elapsed = now - campaignStartDate;
      const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
      setProgressPercent(pct.toFixed(1));
    }, 1000);

    const now = new Date().getTime();
    const totalDuration = targetDate - campaignStartDate;
    const elapsed = now - campaignStartDate;
    const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
    setProgressPercent(pct.toFixed(1));

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days, subtitle: 'Days Remaining' },
    { label: 'Hours', value: timeLeft.hours, subtitle: 'Hours to Launch' },
    { label: 'Minutes', value: timeLeft.minutes, subtitle: 'Minutes Left' },
    { label: 'Seconds', value: timeLeft.seconds, subtitle: 'Live Ticking' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto my-6 lg:my-10 px-4">
      {/* Container Card - Pure Light Theme */}
      <div className="relative rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-10 shadow-xl shadow-slate-200/60 backdrop-blur-xl overflow-hidden">
        
        {/* Decorative Top Glow Beams */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-2xs"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left border-b border-slate-100 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-xs font-mono font-bold mb-2">
              <Clock className="w-3.5 h-3.5 text-orange-600 animate-spin-slow" />
              COUNTDOWN TO LAUNCH • FEB 01, 2027
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans tracking-tight">
              Platform Go-Live Timer
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              Official Launch at 00:00 IST on Monday, February 1, 2027
            </p>
          </div>

          {/* Timezone Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1" />
            <span className="text-xs text-slate-500 font-mono hidden lg:inline font-medium">Timezone:</span>
            {['IST', 'UTC', 'LOCAL'].map((mode) => (
              <button
                key={mode}
                onClick={() => setTzMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  tzMode === mode
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/80'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Countdown Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {timeUnits.map((unit) => (
            <div
              key={unit.label}
              className="relative group flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-50 to-slate-100/60 border border-slate-200 hover:border-orange-400/60 transition-all duration-300 shadow-xs hover:shadow-md hover:shadow-orange-500/10"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-orange-400/50 to-transparent group-hover:via-orange-500 transition-all"></div>
              
              {/* Digit Counter Display */}
              <div className="relative font-mono font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight gradient-text font-bold my-1">
                {String(unit.value).padStart(2, '0')}
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-widest mt-1">
                {unit.label}
              </span>
              <span className="text-[10px] text-slate-500 font-mono font-medium mt-0.5 hidden xs:block">
                {unit.subtitle}
              </span>

              {/* Subtle Glowing Pulse Dot for Seconds */}
              {unit.label === 'Seconds' && (
                <span className="absolute top-3 right-3 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
              )}
            </div>
          ))}
        </div>

        {/* System Preparation & Development Progress Bar */}
        <div className="space-y-3 bg-slate-50/90 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <span className="font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Deployment Pipeline Readiness
            </span>
            <span className="font-mono text-orange-600 font-bold">
              {progressPercent}% Complete • Target: Feb 01, 2027
            </span>
          </div>

          <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-300/60 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500 transition-all duration-1000 shadow-xs shadow-orange-500/20"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            ></div>
          </div>

          {/* Development Milestones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>Core DB & Auth</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
              <span>Alumni Registry</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-700">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-amber-600" />
              <span>Mentorship Hub</span>
            </div>
            <div className="flex items-center gap-1.5 text-orange-700">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-orange-600" />
              <span>Go-Live (Feb 01 '27)</span>
            </div>
          </div>
        </div>

        {/* Calendar Add Action Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs bg-gradient-to-r from-slate-50 via-white to-slate-50 p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-slate-700 font-medium">
              Don't miss the inauguration of <strong className="text-slate-900 font-bold">mkcealumni.org</strong>. Set a reminder now!
            </span>
          </div>
          <button
            onClick={onOpenCalendarModal}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold shadow-xs transition-all cursor-pointer shrink-0 text-center"
          >
            Add to Calendar (.ics / Google)
          </button>
        </div>

      </div>
    </div>
  );
}
