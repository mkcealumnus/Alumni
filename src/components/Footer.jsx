import React from 'react';
import { Instagram, Heart, Linkedin, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200/90 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-extrabold text-indigo-600">
                  MK
                </div>
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">MKCE Alumni</span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed">
              Official non-profit career guidance platform built by alumni for the students of M.Kumarasamy College of Engineering, Karur.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/mkce.alumni" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-pink-600 hover:text-pink-700 hover:border-pink-300 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-indigo-600 hover:text-indigo-700 hover:border-indigo-300 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pathways Links */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Engineering Pathways</h4>
            <ul className="space-y-2.5">
              <li><a href="#pathways" className="hover:text-indigo-600 transition-colors">Software Engineering (SDE)</a></li>
              <li><a href="#pathways" className="hover:text-indigo-600 transition-colors">AI, Data Science & ML</a></li>
              <li><a href="#pathways" className="hover:text-indigo-600 transition-colors">VLSI, Embedded & Hardware</a></li>
              <li><a href="#pathways" className="hover:text-indigo-600 transition-colors">Core Mechanical & Civil</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Resources & Portal</h4>
            <ul className="space-y-2.5">
              <li><a href="#resources" className="hover:text-indigo-600 transition-colors">ATS Resume Templates</a></li>
              <li><a href="#resources" className="hover:text-indigo-600 transition-colors">SDE Interview Cheat Sheet</a></li>
              <li><a href="#mentorship" className="hover:text-indigo-600 transition-colors">Submit Alumni Query</a></li>
              <li><a href="#notice-board" className="hover:text-indigo-600 transition-colors">Mock Interview Drives</a></li>
            </ul>
          </div>

          {/* Contact & Initiative */}
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-4">Instagram Initiative</h4>
            <p className="text-slate-500 mb-4 leading-relaxed">
              Connect with @mkce.alumni on Instagram for real-time updates and weekly live Q&A sessions.
            </p>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">Contact Alumni Team</span>
                <span className="text-xs font-semibold text-slate-800">contact@mkcealumni.org</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 MKCE Alumni Platform. 100% Free Educational Initiative.</p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-pink-600 fill-pink-600" />
            <span>for MKCE Engineering Students</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
