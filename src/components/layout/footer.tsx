import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-[#F2F2EC] text-primary text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mandate */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-xs shadow-sm">
                AL
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-sm tracking-tight">ALUMNUX</span>
                <span className="text-[10px] text-secondary font-mono tracking-tight">
                  Your Network. Your Next Chapter.
                </span>
              </div>
            </div>

            <p className="text-secondary text-xs max-w-md leading-relaxed">
              An independent student and alumni career guidance platform designed to connect students with experienced alumni through career mentorship, professional networking, job opportunities, internships, and referrals.
            </p>

            {/* Prominent Independence Notice */}
            <div className="p-3 bg-surface border border-border rounded-sm max-w-lg space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-primary text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>Independent Governance Statement</span>
              </div>
              <p className="text-[11px] text-secondary leading-normal">
                Alumnux is independently developed and administered by three senior alumni. It is not an officially managed college platform, and college administration or faculty have no operational oversight.
              </p>
            </div>
          </div>

          {/* Public Pages Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-primary uppercase text-[11px] tracking-wider font-mono">
              Public Pages
            </h4>
            <ul className="space-y-2 text-secondary">
              <li>
                <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors flex items-center gap-1">
                  About Alumnux
                </Link>
              </li>
              <li>
                <Link to="/our-goal" className="hover:text-primary transition-colors flex items-center gap-1">
                  Our Goal &amp; Roadmap
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-primary transition-colors flex items-center gap-1">
                  Career Opportunities
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-1">
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Access & Compliance */}
          <div className="space-y-2.5">
            <h4 className="font-semibold text-primary uppercase text-[11px] tracking-wider font-mono">
              Access &amp; Portal
            </h4>
            <ul className="space-y-2 text-secondary">
              <li>
                <Link to="/login" className="hover:text-primary transition-colors flex items-center gap-1 font-medium text-primary">
                  <span>Sign In</span>
                  <ArrowRight className="w-3 h-3 text-accent" />
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-primary transition-colors flex items-center gap-1">
                  Create Demo Account
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <span className="text-[10px] text-secondary/80 font-mono block pt-1">
                  Frontend Demo Prototype &bull; Client-Ready Architecture
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-secondary text-[11px]">
          <p>
            &copy; {currentYear} Alumnux. All rights reserved. Independently administered by 3 senior alumni trustees.
          </p>
          <div className="flex items-center gap-4 text-[10px] font-mono">
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
              Demo Authentication Enabled
            </span>
            <span>Refined Nano-Brutalism</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
