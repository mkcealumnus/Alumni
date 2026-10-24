import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-[#F2F2EC] text-primary text-xs">
      <div className="max-w-[320rem] mx-auto px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 2xl:grid-cols-5 ultrawide:grid-cols-6 gap-8 mb-10">
          {/* Brand & Mandate */}
          <div className="md:col-span-2 2xl:col-span-2 ultrawide:col-span-3 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-xs">
                AL
              </div>
              <span className="font-bold text-sm tracking-tight">ALUMNUX</span>
            </div>
            <p className="text-secondary text-xs max-w-md 2xl:max-w-xl leading-relaxed">
              Your Network. Your Next Chapter. Connecting students directly with verified alumni for career mentorship, mock interviews, and authentic job referrals.
            </p>
            <div className="p-3 bg-surface border border-border rounded-sm max-w-lg 2xl:max-w-2xl">
              <p className="text-[11px] text-secondary leading-normal">
                <strong className="text-primary font-medium">Independent Governance Notice:</strong> Alumnux is independently developed and managed by exactly three designated senior alumni trustees. College management and academic faculty have no operational involvement or administrative access.
              </p>
            </div>
          </div>

          {/* Platform Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary uppercase text-[11px] tracking-wider">
              Platform
            </h4>
            <ul className="space-y-1.5 text-secondary">
              <li>
                <Link to="/directory" className="hover:text-primary transition-colors">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/portalStudent" className="hover:text-primary transition-colors">
                  Student Career Hub
                </Link>
              </li>
              <li>
                <Link to="/onboardingStudent" className="hover:text-primary transition-colors">
                  Student Verification
                </Link>
              </li>
              <li>
                <Link to="/onboardingAlumni" className="hover:text-primary transition-colors">
                  Alumni Verification
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-primary transition-colors text-accent">
                  Admin Console (3 Trustees)
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="space-y-2">
            <h4 className="font-semibold text-primary uppercase text-[11px] tracking-wider">
              Legal & Privacy
            </h4>
            <ul className="space-y-1.5 text-secondary">
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy (DPDP 2023)
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a
                  href="/docs/verification-policy.md"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Verification & Evidence Policy
                </a>
              </li>
              <li>
                <a
                  href="/docs/SRS-v1.1.md"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  Software Requirements (v1.1)
                </a>
              </li>
            </ul>
          </div>

          {/* Device Responsive Coverage */}
          <div className="space-y-2 hidden 2xl:block">
            <h4 className="font-semibold text-primary uppercase text-[11px] tracking-wider">
              Responsive Coverage
            </h4>
            <ul className="space-y-1 text-[11px] text-secondary font-mono">
              <li>&bull; Mobile: 6.1&quot; &rarr; 6.8&quot; (Standard &amp; Max)</li>
              <li>&bull; Foldable: 7.6&quot; &rarr; 8.0&quot;+ Opened</li>
              <li>&bull; Laptops: 11.6&quot; &rarr; 18.0&quot; Standards</li>
              <li>&bull; Monitors: 21.5&quot; &rarr; 32.0&quot; QHD/4K</li>
              <li>&bull; Ultrawides: 34&quot;-38&quot; (21:9) &amp; 49&quot; (32:9)</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-secondary">
          <p>&copy; {new Date().getFullYear()} Alumnux Platform. All rights reserved. Self-governed alumni community.</p>
          <p className="font-mono">Refined Nano-Brutalism &bull; Strict RLS &bull; 6.1&quot; to 49.0&quot; Responsive Grid</p>
        </div>
      </div>
    </footer>
  );
}
