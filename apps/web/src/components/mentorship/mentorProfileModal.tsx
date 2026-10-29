import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  X,
  Building2,
  MapPin,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Linkedin,
  Github,
  CheckCircle2,
} from "lucide-react";
import { UserProfile } from "../../lib/types";

interface MentorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumnus: UserProfile | null;
  onRequestMentorship: (alumnus: UserProfile) => void;
  isPendingRequest?: boolean;
  isActiveMentorship?: boolean;
}

export function MentorProfileModal({
  isOpen,
  onClose,
  alumnus,
  onRequestMentorship,
  isPendingRequest,
  isActiveMentorship,
}: MentorProfileModalProps) {
  if (!isOpen || !alumnus) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-surface border border-border rounded-md p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-sm bg-accent/15 text-accent font-bold text-base flex items-center justify-center">
              {alumnus.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-primary">{alumnus.full_name}</h3>
                {alumnus.is_verified && (
                  <Badge variant="outline" className="text-[10px] bg-accent/10 text-accent border-accent/30 gap-1 py-0 px-1.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Alumnus</span>
                  </Badge>
                )}
              </div>
              <p className="text-xs text-accent font-medium mt-0.5">
                {alumnus.current_role} {alumnus.current_company && `@ ${alumnus.current_company}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-sm border border-border hover:bg-[#F8F8F5] text-secondary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-2.5 bg-[#F8F8F5] border border-border rounded-sm space-y-0.5">
            <span className="text-[10px] font-mono text-secondary uppercase flex items-center gap-1">
              <Building2 className="w-3 h-3 text-accent" /> Company
            </span>
            <p className="font-bold text-primary truncate">{alumnus.current_company || "Undisclosed"}</p>
          </div>
          <div className="p-2.5 bg-[#F8F8F5] border border-border rounded-sm space-y-0.5">
            <span className="text-[10px] font-mono text-secondary uppercase flex items-center gap-1">
              <Briefcase className="w-3 h-3 text-accent" /> Experience
            </span>
            <p className="font-bold text-primary">{alumnus.experience_years ? `${alumnus.experience_years} Years` : "Experienced"}</p>
          </div>
          <div className="p-2.5 bg-[#F8F8F5] border border-border rounded-sm space-y-0.5 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-secondary uppercase flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-accent" /> Batch
            </span>
            <p className="font-bold text-primary">{alumnus.department_code} &apos;{alumnus.graduation_year.toString().slice(-2)}</p>
          </div>
        </div>

        {/* Bio / Guidance Philosophy */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-primary uppercase font-mono tracking-wider">
            Mentorship Guidance &amp; Focus
          </h4>
          <p className="text-xs text-secondary leading-relaxed bg-[#F8F8F5] p-3 rounded-sm border border-border">
            {alumnus.bio || "Available to review software architectures, provide mock interviews, and share practical industry transition advice with ambitious students."}
          </p>
        </div>

        {/* Skills & Domains */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-bold text-primary uppercase font-mono tracking-wider">
            Mentorship Topics &amp; Competencies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {alumnus.skills.map((s) => (
              <Badge key={s} variant="outline" className="text-[11px] bg-white border-border py-0.5">
                {s}
              </Badge>
            ))}
          </div>
        </div>

        {/* Location & Social Links */}
        <div className="flex items-center justify-between text-xs text-secondary pt-2 border-t border-border">
          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-accent" />
            <span>{alumnus.location_city || "Bengaluru"}, India</span>
          </div>
          <div className="flex items-center gap-2">
            {alumnus.linkedin_url && (
              <a
                href={alumnus.linkedin_url}
                target="_blank"
                rel="noreferrer"
                className="p-1 rounded-sm border border-border text-secondary hover:text-accent"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {alumnus.github_url && (
              <a
                href={alumnus.github_url}
                target="_blank"
                rel="noreferrer"
                className="p-1 rounded-sm border border-border text-secondary hover:text-accent"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex items-center justify-between border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs border-border"
          >
            Close
          </Button>

          {isActiveMentorship ? (
            <Badge className="text-xs bg-semantic-success text-white py-1 px-3 gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Active 1-on-1 Mentorship</span>
            </Badge>
          ) : isPendingRequest ? (
            <Badge variant="outline" className="text-xs border-accent text-accent py-1 px-3">
              Request Pending Review
            </Badge>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                onClose();
                onRequestMentorship(alumnus);
              }}
              className="text-xs gap-1.5 shadow-subtle"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Request 1-on-1 Mentorship</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
