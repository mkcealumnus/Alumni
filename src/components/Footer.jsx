import React from 'react';
import { MapPin, Mail, Globe, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200/90 bg-slate-50 text-slate-600 py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 text-xs font-medium">
        
        {/* Brand Info */}
        <div className="space-y-3 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 border border-orange-200 flex items-center justify-center font-bold font-serif text-base">
              MK
            </div>
            <span className="text-base font-extrabold text-slate-900 font-sans tracking-tight">
              MKCE Alumni Association
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            The central digital hub for M. Kumarasamy College of Engineering graduates worldwide. Fostering mentorship, placement guidance, and global alumni collaboration.
          </p>
          <div className="flex items-center gap-2 font-mono text-emerald-700 font-bold text-[11px]">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Portal Domain: <strong className="text-slate-900">mkcealumni.org</strong></span>
          </div>
        </div>

        {/* Location & Contact */}
        <div className="space-y-2">
          <h5 className="font-mono text-slate-800 uppercase tracking-wider font-extrabold text-xs">
            Institution Details
          </h5>
          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
            <span>
              M. Kumarasamy College of Engineering (Autonomous)<br />
              Thalavapalayam, Karur - 639113, Tamil Nadu, India.
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Mail className="w-4 h-4 text-orange-600 shrink-0" />
            <a href="mailto:alumni@mkce.ac.in" className="hover:text-orange-600 transition-colors">
              alumni@mkce.ac.in
            </a>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Globe className="w-4 h-4 text-orange-600 shrink-0" />
            <a href="https://mkce.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-orange-600 transition-colors">
              www.mkce.ac.in
            </a>
          </div>
        </div>

        {/* Target Launch & Copyright */}
        <div className="space-y-2 text-right md:text-right w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-200">
          <div className="p-3 bg-white rounded-xl border border-slate-200 inline-block text-left shadow-2xs">
            <span className="block text-[10px] font-mono text-slate-500 uppercase font-bold">Target Go-Live</span>
            <span className="block font-mono text-sm font-bold text-orange-600">January 14, 2027</span>
          </div>
          <p className="text-slate-500 text-[11px] font-medium">
            © {new Date().getFullYear()} MKCE Alumni Association. All rights reserved.
          </p>
          <p className="text-slate-500 text-[10px] flex items-center justify-end gap-1 font-medium">
            <span>Built with</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            <span>for MKCE Engineering Community</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
