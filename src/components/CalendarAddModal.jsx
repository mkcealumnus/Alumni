import React, { useState } from 'react';
import { X, Calendar, Download, ExternalLink, Check, Copy } from 'lucide-react';

export default function CalendarAddModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Launch Details: Jan 14, 2027 00:00:00 IST
  const eventTitle = encodeURIComponent('MKCE Alumni Portal Official Launch (mkcealumni.org)');
  const eventDetails = encodeURIComponent('Grand online launch of the official M. Kumarasamy College of Engineering Alumni Network portal at https://mkcealumni.org.');
  const eventLocation = encodeURIComponent('https://mkcealumni.org (Online Launch)');

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=20270113T183000Z/20270113T203000Z&details=${eventDetails}&location=${eventLocation}`;
  const outlookCalUrl = `https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent&subject=${eventTitle}&startdt=2027-01-14T00:00:00&enddt=2027-01-14T02:00:00&body=${eventDetails}&location=${eventLocation}`;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 border border-slate-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 border border-orange-200 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider">
              CALENDAR REMINDER
            </span>
            <h3 className="text-xl font-bold text-slate-900">Add Launch to Calendar</h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
          Save <strong className="text-slate-900">Thursday, January 14, 2027</strong> to your personal calendar so you don't miss the official launch of <span className="text-orange-600 font-bold">mkcealumni.org</span>.
        </p>

        {/* Calendar Provider Buttons */}
        <div className="space-y-3 mb-6">
          {/* Google Calendar */}
          <a
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-orange-400 text-xs font-semibold text-slate-800 transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-mono font-bold text-xs">G</span>
              <span>Add to Google Calendar</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
          </a>

          {/* iCal / Outlook ICS File Download */}
          <button
            onClick={downloadIcsFile}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-orange-400 text-xs font-semibold text-slate-800 transition-all cursor-pointer group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-mono font-bold text-xs">iCal</span>
              <span>Download iCal / Apple / Outlook File (.ics)</span>
            </div>
            <Download className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
          </button>

          {/* Outlook.com */}
          <a
            href={outlookCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-orange-400 text-xs font-semibold text-slate-800 transition-all group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-mono font-bold text-xs">O</span>
              <span>Add to Outlook Web</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-600 transition-colors" />
          </a>
        </div>

        {/* Quick Link Copy */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium">
          <span className="font-mono text-slate-600 truncate mr-2">https://mkcealumni.org</span>
          <button
            onClick={copyEventLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold cursor-pointer shrink-0 shadow-2xs"
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
