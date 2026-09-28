import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Globe, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function CountdownTimer({ onOpenCalendarModal }) {
  // Target Date: January 14, 2027 00:00:00 IST (UTC+05:30)
  const TARGET_DATE_STRING = '2027-01-14T00:00:00+05:30';
  const targetDate = new Date(TARGET_DATE_STRING).getTime();

  // Campaign Start Date for progress bar calculation (Jan 1, 2026)
  const campaignStartDate = new Date('2026-01-01T00:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [tzMode, setTzMode] = useState('IST'); // 'IST', 'UTC', 'LOCAL'
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

      // Calculate progress percentage
      const now = new Date().getTime();
      const totalDuration = targetDate - campaignStartDate;
      const elapsed = now - campaignStartDate;
      const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
      setProgressPercent(pct.toFixed(1));
    }, 1000);

    // Initial progress computation
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
      {/* Container Card */}
      <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800/90 p-6 sm:p-10 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Decorative Top Glow Beams */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent blur-xs"></div>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 text-center sm:text-left border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-mono font-semibold mb-2">
              <Clock className="w-3.5 h-3.5 animate-spin-slow" />
              COUNTDOWN TO LAUNCH • JAN 14, 2027
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-sans tracking-tight">
              Platform Go-Live Timer
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Official Launch at 00:00 IST on Thursday, January 14, 2027
            </p>
          </div>

          {/* Timezone Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
            <span className="text-xs text-slate-400 font-mono hidden lg:inline">Timezone:</span>
            {['IST', 'UTC', 'LOCAL'].map((mode) => (
              <button
                key={mode}
                onClick={() => setTzMode(mode)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  tzMode === mode
                    ? 'bg-orange-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Countdown Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {timeUnits.map((unit, index) => (
            <div
              key={unit.label}
              className="relative group flex flex-col items-center justify-center p-5 sm:p-7 rounded-2xl bg-slate-950/90 border border-slate-800/80 hover:border-orange-500/40 transition-all duration-300 shadow-inner"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-orange-500/50 to-transparent group-hover:via-orange-400 transition-all"></div>
              
              {/* Digit Counter Display */}
              <div className="relative font-mono font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight gradient-text font-bold my-1">
                {String(unit.value).padStart(2, '0')}
              </div>

              {/* Label */}
              <span className="text-xs sm:text-sm font-semibold text-slate-200 uppercase tracking-widest mt-1">
                {unit.label}
              </span>
              <span className="text-[10px] text-slate-500 font-mono mt-0.5 hidden xs:block">
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
        <div className="space-y-3 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
            <span className="font-semibold text-slate-300 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Deployment Pipeline Readiness
            </span>
            <span className="font-mono text-orange-400 font-bold">
              {progressPercent}% Complete • Target: Jan 14, 2027
            </span>
          </div>

          <div className="relative w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-600 via-amber-500 to-emerald-400 transition-all duration-1000 shadow-sm shadow-orange-500/30"
              style={{ width: `${Math.max(5, progressPercent)}%` }}
            ></div>
          </div>

          {/* Development Milestones */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Core DB & Auth</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Alumni Registry</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>Mentorship Portal</span>
            </div>
            <div className="flex items-center gap-1.5 text-orange-400">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>Go-Live (Jan 14 '27)</span>
            </div>
          </div>
        </div>

        {/* Calendar Add Action Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-slate-300 font-medium">
              Don't miss the inauguration of <strong className="text-white">mkcealumni.org</strong>. Set a reminder now!
            </span>
          </div>
          <button
            onClick={onOpenCalendarModal}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-orange-500/50 transition-all font-semibold cursor-pointer shrink-0 text-center"
          >
            Add to Calendar (.ics / Google)
          </button>
        </div>

      </div>
    </div>
  );
}
