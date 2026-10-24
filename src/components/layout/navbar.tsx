import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Compass,
  LayoutDashboard,
  FileCheck,
  Lock,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-[#F8F8F5]/95 backdrop-blur-sm">
      {/* Top Advisory Banner (Independent Operation) */}
      <div className="bg-[#171717] text-[#D8D8D2] px-4 sm:px-6 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 py-1 text-[11px] font-mono tracking-tight flex items-center justify-between">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="truncate">
            ALUMNUX INDEPENDENT PLATFORM &bull; OPERATED BY 3 SENIOR ALUMNI TRUSTEES &bull; NON-INSTITUTIONAL
          </span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[10px] text-[#A8A8A0] shrink-0">
          <span>PHASE 1 BASELINE</span>
          <span className="border-l border-[#333] pl-3">DPDP ACT 2023 COMPLIANT</span>
          <span className="border-l border-[#333] pl-3">RESPONSIVE: 6.1&quot; &rarr; 49.0&quot;</span>
        </div>
      </div>

      <div className="max-w-[320rem] mx-auto px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 h-14 flex items-center justify-between">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-sm tracking-tighter">
              AL
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-primary leading-none group-hover:text-accent transition-colors">
                ALUMNUX
              </span>
              <span className="text-[10px] text-secondary font-mono tracking-tighter">
                CAREER NETWORK
              </span>
            </div>
          </Link>

          <Badge variant="outline" className="hidden lg:inline-flex text-[10px] py-0 px-1.5 bg-surface text-secondary">
            v1.1 Phase 1
          </Badge>
        </div>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs font-medium">
          <Link
            to="/"
            className={`px-3 py-1.5 rounded-sm transition-colors ${
              isActive("/") ? "bg-surface text-primary border border-border" : "text-secondary hover:text-primary"
            }`}
          >
            Home
          </Link>
          <Link
            to="/directory"
            className={`px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5 ${
              isActive("/directory")
                ? "bg-surface text-primary border border-border"
                : "text-secondary hover:text-primary"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-accent" />
            Alumni Directory
          </Link>
          <Link
            to="/portal/student"
            className={`px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5 ${
              isActive("/portal/student")
                ? "bg-surface text-primary border border-border"
                : "text-secondary hover:text-primary"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Student Hub
          </Link>
          <Link
            to="/onboarding/status"
            className={`px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5 ${
              isActive("/onboarding/status")
                ? "bg-surface text-primary border border-border"
                : "text-secondary hover:text-primary"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-semantic-warning" />
            Status Tracker
          </Link>
          <Link
            to="/admin"
            className={`px-3 py-1.5 rounded-sm transition-colors flex items-center gap-1.5 ${
              isActive("/admin")
                ? "bg-surface text-primary border border-border font-semibold"
                : "text-secondary hover:text-primary"
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-semantic-error" />
            Admin Console (3 Trustees)
          </Link>
        </nav>

        {/* Auth / Action CTAs */}
        <div className="hidden sm:flex items-center gap-2">
          <Link to="/auth/login">
            <Button variant="secondary" size="sm" className="text-xs h-8">
              Sign In
            </Button>
          </Link>
          <Link to="/auth/register">
            <Button variant="primary" size="sm" className="text-xs h-8">
              Join Network
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger (for 6.1" - 6.8" and Foldables) */}
        <div className="flex lg:hidden items-center gap-2">
          <Link to="/auth/login">
            <Button variant="secondary" size="sm" className="text-xs h-8 px-2.5">
              Sign In
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-sm border border-border bg-surface text-primary"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border bg-surface px-4 py-4 space-y-2 animate-in slide-in-from-top-2 duration-150">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-sm text-primary hover:bg-[#F2F2EC] rounded-sm"
          >
            Home
          </Link>
          <Link
            to="/directory"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-[#F2F2EC] rounded-sm"
          >
            <Compass className="w-4 h-4 text-accent" />
            Alumni Directory
          </Link>
          <Link
            to="/portal/student"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-[#F2F2EC] rounded-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            Student Hub
          </Link>
          <Link
            to="/onboarding/student"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-[#F2F2EC] rounded-sm"
          >
            <GraduationCap className="w-4 h-4 text-accent" />
            Student Verification
          </Link>
          <Link
            to="/onboarding/alumni"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-[#F2F2EC] rounded-sm"
          >
            <ShieldCheck className="w-4 h-4 text-semantic-success" />
            Alumni Verification
          </Link>
          <Link
            to="/onboarding/status"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-[#F2F2EC] rounded-sm"
          >
            <FileCheck className="w-4 h-4 text-semantic-warning" />
            Verification Status Tracker
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-primary hover:bg-[#F2F2EC] rounded-sm font-medium border-t border-border pt-3"
          >
            <Lock className="w-4 h-4 text-semantic-error" />
            Admin Console (3 Senior Trustees)
          </Link>
        </div>
      )}
    </header>
  );
}
