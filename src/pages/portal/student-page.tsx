import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Compass,
  Calendar,
  Bell,
  ChevronRight,
} from "lucide-react";
import { MOCK_ALUMNI, MOCK_JOBS, MOCK_EVENTS } from "@/lib/mock-data";

export default function StudentDashboardPage() {
  return (
    <div className="max-w-[320rem] mx-auto px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* Demonstration Banner */}
      <div className="p-3 bg-[#EFEFEA] border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-secondary font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <span>STUDENT CAREER HUB &bull; DEMONSTRATION DATA &bull; 6.1&quot; &rarr; 49.0&quot; DYNAMIC CANVAS</span>
        </div>
        <Badge variant="outline" className="text-[10px] bg-white self-start sm:self-auto">
          Phase 1 Concept
        </Badge>
      </div>

      {/* 1. WELCOME & VERIFICATION STATUS HEADER */}
      <div className="border border-border rounded-md bg-surface p-5 sm:p-6 md:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary">
                Welcome back, Priya
              </h1>
              <Badge variant="verified" className="gap-1 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Student
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-secondary">
              B.Tech Computer Science &amp; Engineering &bull; Class of 2026 &bull; Reg: 2022CSE1042
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/directory" className="w-full sm:w-auto">
              <Button size="sm" className="w-full sm:w-auto gap-1.5 text-xs font-semibold">
                <Compass className="w-4 h-4" />
                Find Alumni Mentors
              </Button>
            </Link>
          </div>
        </div>

        {/* Profile Completion Bar */}
        <div className="pt-4 border-t border-border/70 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-primary">Profile Readiness for Mentorship</span>
            <span className="font-mono text-accent font-semibold">85% Complete</span>
          </div>
          <div className="w-full bg-[#EAEAE2] h-2 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[85%]" />
          </div>
          <p className="text-[11px] text-secondary">
            Tip: Add your target software engineering roles and resume link to increase mentor response rates.
          </p>
        </div>
      </div>

      {/* 2. PRIMARY GRID: RESPONSIVE 1-COL (MOBILE) -> 2-COL (LAPTOP) -> 3-COL COMMAND CENTER (DESKTOP/ULTRAWIDE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 desktop:grid-cols-12 gap-6 sm:gap-8">
        {/* Section A: Featured Mentorship (Left 6 cols on Desktop, 8 cols on Laptop, Full on Mobile) */}
        <div className="lg:col-span-7 desktop:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-primary">
                Recommended Mentors in Your Field
              </h2>
              <p className="text-xs text-secondary">
                Verified alumni available for resume reviews and tech prep.
              </p>
            </div>
            <Link to="/directory" className="text-xs text-accent font-medium hover:underline inline-flex items-center gap-1">
              View All <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 desktop:grid-cols-1 ultrawide:grid-cols-2 gap-4">
            {MOCK_ALUMNI.slice(0, 2).map((mentor) => (
              <Card key={mentor.id} className="p-4 space-y-3 hover:border-primary transition-colors flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {mentor.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-primary">
                          {mentor.full_name}
                        </h4>
                        <p className="text-[11px] text-secondary leading-tight">
                          {mentor.current_role}
                        </p>
                        <p className="text-[10px] text-secondary font-mono">
                          {mentor.current_company} &bull; Class of {mentor.graduation_year}
                        </p>
                      </div>
                    </div>
                    <Badge variant="verified" className="text-[9px] shrink-0">
                      Verified
                    </Badge>
                  </div>

                  <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                    {mentor.bio}
                  </p>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-[11px] text-secondary">
                    {mentor.location_city}
                  </span>
                  <Button variant="secondary" size="sm" className="text-[11px] h-7 px-2">
                    Request Mentorship
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section B: Referral Openings (Center on Desktop, Bottom on Laptop) */}
        <div className="lg:col-span-5 desktop:col-span-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-primary">
                Alumni Referral Openings
              </h2>
              <p className="text-xs text-secondary">
                Job and internship roles posted by verified graduates.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {MOCK_JOBS.map((job) => (
              <Card key={job.id} className="p-4 space-y-2 hover:border-primary transition-colors">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <h4 className="font-semibold text-xs sm:text-sm text-primary leading-snug">
                      {job.title}
                    </h4>
                    <p className="text-xs text-secondary font-medium">
                      {job.company} &bull; {job.location}
                    </p>
                  </div>
                  {job.is_referral_available && (
                    <Badge variant="verified" className="text-[9px] shrink-0">
                      Referral
                    </Badge>
                  )}
                </div>

                <div className="pt-2 border-t border-border/70 text-[11px] text-secondary flex items-center justify-between">
                  <span className="truncate max-w-[160px]">By {job.posted_by_name}</span>
                  <Button size="sm" className="text-[11px] h-7 px-2">
                    Apply
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Section C: Live AMAs & Activity (Right Pane on Desktop 3-col, Bottom on Mobile/Laptop) */}
        <div className="lg:col-span-12 desktop:col-span-3 space-y-6">
          {/* Notifications Card */}
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
                  <Bell className="w-4 h-4 text-accent" />
                  Recent Updates
                </CardTitle>
                <span className="w-2 h-2 rounded-full bg-semantic-success" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-2.5 bg-[#F8F8F5] border border-border rounded-sm space-y-1">
                <span className="font-semibold text-primary block">
                  Verification Approved
                </span>
                <p className="text-secondary leading-snug">
                  Trustee 1 approved your college ID credentials. Full network access is active.
                </p>
                <span className="text-[10px] text-secondary font-mono">Today, 9:15 AM</span>
              </div>

              <div className="p-2.5 bg-[#F8F8F5] border border-border rounded-sm space-y-1">
                <span className="font-semibold text-primary block">
                  New Referral Added
                </span>
                <p className="text-secondary leading-snug">
                  An alum from AWS posted Graduate Cloud roles for CSE/IT students.
                </p>
                <span className="text-[10px] text-secondary font-mono">Yesterday</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs sm:text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                Upcoming Alumni AMAs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MOCK_EVENTS.map((evt) => (
                <div
                  key={evt.id}
                  className="p-3 border border-border rounded-sm space-y-2 bg-[#F8F8F5] text-xs"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[9px] uppercase font-mono">
                      {evt.event_type}
                    </Badge>
                    <span className="font-mono text-[10px] text-accent">{evt.start_time}</span>
                  </div>
                  <h5 className="font-semibold text-xs text-primary leading-tight">
                    {evt.title}
                  </h5>
                  <p className="text-[11px] text-secondary">
                    Speaker: {evt.speaker_name}
                  </p>
                  <Button variant="secondary" size="sm" className="w-full text-[10px] h-6">
                    RSVP ({evt.registered_count} Attending)
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
