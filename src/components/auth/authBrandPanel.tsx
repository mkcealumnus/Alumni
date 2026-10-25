import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, ShieldCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface AuthBrandPanelProps {
  className?: string;
}

export function AuthBrandPanel({ className }: AuthBrandPanelProps) {
  return (
    <aside
      className={cn(
        "w-full lg:w-[45%] xl:w-[42%] bg-[#FAF9F5] border-b lg:border-b-0 lg:border-r border-border p-6 sm:p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden select-none",
        className
      )}
    >
      {/* Background Decorative Grid Line Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#171717 1px, transparent 1px), linear-gradient(to right, #171717 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      {/* Top Header & Brand Identity */}
      <div className="relative z-10 space-y-6">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            aria-label="Return to Alumnux Home"
          >
            <div className="w-10 h-10 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-base tracking-tighter shadow-sm">
              AL
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight text-primary leading-none group-hover:text-accent transition-colors">
                ALUMNUX
              </span>
              <span className="text-[10px] text-secondary font-mono tracking-tight">
                CAREER NETWORK
              </span>
            </div>
          </Link>

          <Badge variant="outline" className="text-[10px] font-mono bg-surface border-border">
            Independent Platform
          </Badge>
        </div>

        {/* Headline & Mission Statement */}
        <div className="space-y-2 pt-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent uppercase tracking-wider bg-accent/10 px-2 py-0.5 rounded-xs">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Bridging College to Industry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary leading-tight">
            Your Network. <br />
            <span className="text-accent">Your Next Chapter.</span>
          </h2>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-md pt-1">
            Connect with experienced alumni, discover opportunities, and build your professional future through verified, confidential guidance.
          </p>
        </div>

        {/* Visual Graphic: Nano-Brutalist Connection & Mentorship Blueprint */}
        <div className="p-4 sm:p-5 bg-surface border border-border rounded-md shadow-subtle space-y-3.5 relative">
          <div className="flex items-center justify-between text-[11px] font-mono text-secondary border-b border-border pb-2.5">
            <span className="font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Verified Mentorship Matrix
            </span>
            <span>Phase 1 Platform</span>
          </div>

          {/* Node Diagram SVG */}
          <div className="relative py-2 flex items-center justify-between text-xs">
            {/* Student Node */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-11 h-11 rounded-sm bg-[#F8F8F5] border-2 border-accent/60 flex items-center justify-center shadow-xs">
                <GraduationCap className="w-5 h-5 text-accent" />
              </div>
              <span className="font-bold text-[11px] text-primary">Student</span>
              <span className="text-[10px] font-mono text-secondary">CSE &bull; 2026</span>
            </div>

            {/* Connecting Bridge Track */}
            <div className="flex-1 mx-3 relative flex items-center justify-center">
              <div className="w-full border-t-2 border-dashed border-accent/40" />
              <div className="absolute px-2 py-0.5 bg-surface border border-border rounded-xs text-[10px] font-mono text-accent font-semibold flex items-center gap-1 shadow-2xs">
                <span>1-on-1 Bridge</span>
                <ArrowUpRight className="w-2.5 h-2.5 text-accent" />
              </div>
            </div>

            {/* Alumni Mentor Node */}
            <div className="flex flex-col items-center gap-1.5 z-10">
              <div className="w-11 h-11 rounded-sm bg-[#171717] text-white flex items-center justify-center shadow-xs">
                <Briefcase className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="font-bold text-[11px] text-primary">Alumni Mentor</span>
              <span className="text-[10px] font-mono text-secondary">Stripe &bull; AWS</span>
            </div>
          </div>

          {/* Milestone Pillars */}
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border text-[11px]">
            <div className="p-2 bg-[#F8F8F5] rounded-xs border border-border">
              <span className="font-semibold text-primary block">Private 1-on-1s</span>
              <span className="text-[10px] text-secondary font-mono">End-to-end confidential</span>
            </div>
            <div className="p-2 bg-[#F8F8F5] rounded-xs border border-border">
              <span className="font-semibold text-primary block">Verified Credentials</span>
              <span className="text-[10px] text-secondary font-mono">Anna Univ. manual review</span>
            </div>
          </div>
        </div>

        {/* Platform Integrity Value Props */}
        <div className="space-y-2.5 text-xs">
          <div className="flex items-start gap-2.5 text-secondary">
            <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong className="text-primary font-medium">Independent Platform Governance:</strong> Administered independently by three senior alumni trustees. Not an official college portal.
            </p>
          </div>
          <div className="flex items-start gap-2.5 text-secondary">
            <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong className="text-primary font-medium">Zero-Compromise Privacy:</strong> Student and alumni document uploads are reviewed securely and never shared publicly.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Statement */}
      <div className="relative z-10 pt-8 mt-8 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-secondary font-mono">
        <span>Built to connect students and alumni.</span>
        <span>&copy; {new Date().getFullYear()} Alumnux Network</span>
      </div>
    </aside>
  );
}
