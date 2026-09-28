import React, { useState } from 'react';
import { X, Calendar, Download, ExternalLink, Check, Copy } from 'lucide-react';

export default function CalendarAddModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Launch Details: Jan 14, 2027 00:00:00 IST (2027-01-14 00:00 IST = 20270113T183000Z in UTC)
  const eventTitle = encodeURIComponent('MKCE Alumni Portal Official Launch (mkcealumni.org)');
  const eventDetails = encodeURIComponent('Grand online launch of the official M. Kumarasamy College of Engineering Alumni Network portal at https://mkcealumni.org.');
  const eventLocation = encodeURIComponent('https://mkcealumni.org (Online Launch)');

  // Google Calendar URL format: dates=YYYYMMDDTHHMMSSZ/YYYYMMDDTHHMMSSZ
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=20270113T183000Z/20270113T203000Z&details=${eventDetails}&location=${eventLocation}`;
  
  // Yahoo Calendar URL
  const yahooCalUrl = `https://calendar.yahoo.com/?v=60&title=${eventTitle}&st=20270113T183000Z&in_desc=${eventDetails}&in_loc=${eventLocation}`;

  // Outlook Online URL
  const outlookCalUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${eventTitle}&startdt=2027-01-14T00:00:00&enddt=2027-01-14T02:00:00&body=${eventDetails}&location=${eventLocation}`;

  // Download ICS File generator
  const downloadIcsFile = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MKCE Alumni Association//mkcealumni.org//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:MKCE Alumni Portal Official Launch (mkcealumni.org)
DESCRIPTION:Grand online launch of the official M. Kumarasamy College of Engineering Alumni Network portal at https://mkcealumni.org.
LOCATION:https://mkcealumni.org
DTSTART:20270113T183000Z
DTEND:20270113T203000Z
STATUS:CONFIRMED
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder: MKCE Alumni Network launches today!
TRIGGER:-PT2H
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MKCE_Alumni_Launch_Jan_14_2027.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyEventLink = () => {
    navigator.clipboard.writeText('https://mkcealumni.org');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 border border-orange-500/20 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-orange-400 font-bold uppercase tracking-wider">
              CALENDAR REMINDER
            </span>
            <h3 className="text-xl font-bold text-white">Add Launch to Calendar</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
          Save <strong className="text-white">Thursday, January 14, 2027</strong> to your personal calendar so you don't miss the official launch of <span className="text-orange-400">mkcealumni.org</span>.
        </p>

        {/* Calendar Provider Buttons */}
        <div className="space-y-3 mb-6">
          {/* Google Calendar */}
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/40 text-xs font-semibold text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">G</span>
              <span>Add to Google Calendar</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </a>

          {/* iCal / Outlook ICS File Download */}
          <button
            onClick={downloadIcsFile}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/40 text-xs font-semibold text-slate-200 transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center font-mono font-bold text-xs">iCal</span>
              <span>Download iCal / Apple / Outlook File (.ics)</span>
            </div>
            <Download className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </button>

          {/* Outlook.com */}
          <a
            href={outlookCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-orange-500/40 text-xs font-semibold text-slate-200 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-mono font-bold text-xs">O</span>
              <span>Add to Outlook Web</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors" />
          </a>
        </div>

        {/* Quick Link Copy */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
          <span className="font-mono text-slate-400 truncate mr-2">https://mkcealumni.org</span>
          <button
            onClick={copyEventLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy URL</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
