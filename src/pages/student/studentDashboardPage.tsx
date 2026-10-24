import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  Briefcase,
  Bookmark,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import {
  DEMO_CAREER_OPPORTUNITIES,
  DEMO_EVENTS,
  DEMO_STUDENT_ACTIVITIES,
} from "../../data/demoData";
import { MOCK_ALUMNI } from "../../lib/mockData";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const displayName = user?.fullName?.split(" ")[0] || "Alex";

  const stats = [
    {
      label: "Alumni Connections",
      value: "12",
      change: "+2 this month",
      icon: Users,
    },
    {
      label: "Mentorship Requests",
      value: "3",
      change: "1 Pending Review",
      icon: GraduationCap,
    },
    {
      label: "Saved Opportunities",
      value: "8",
      change: "2 Deadlines soon",
      icon: Bookmark,
    },
    {
      label: "Upcoming Events",
      value: "2",
      change: "Next: Saturday",
      icon: Calendar,
    },
  ];

  const recommendedAlumni = MOCK_ALUMNI.slice(0, 3);
  const featuredOpportunities = DEMO_CAREER_OPPORTUNITIES.slice(0, 2);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcome Section & Quick Actions */}
      <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Student Career Overview
            </span>
            <Badge variant="outline" className="text-[10px] bg-[#F8F8F5]">
              Demo Session
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Welcome back, {displayName}!
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Discover opportunities, connect with experienced alumni, and take your next career step.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Link to="/student/mentorship">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Find a Mentor</span>
            </Button>
          </Link>
          <Link to="/student/jobs">
            <Button variant="outline" size="sm" className="text-xs gap-1.5 border-border bg-[#F8F8F5]">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              <span>Explore Jobs</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Four Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-secondary">
                  {card.label}
                </span>
                <div className="w-7 h-7 rounded-sm bg-[#F2F2EC] flex items-center justify-center text-accent">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-primary">
                  {card.value}
                </span>
                <span className="text-[11px] font-mono text-secondary">
                  {card.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Recommended Alumni & Featured Jobs) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Recommended Alumni */}
          <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-bold text-primary">
                  Recommended Alumni for Your Domain
                </h2>
              </div>
              <Link
                to="/student/alumni"
                className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedAlumni.map((alum) => (
                <div
                  key={alum.id}
                  className="p-4 rounded-sm border border-border bg-[#F8F8F5] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {alum.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="font-semibold text-xs text-primary truncate">
                          {alum.full_name}
                        </h3>
                        <p className="text-[10px] text-accent truncate">
                          {alum.current_role}
                        </p>
                      </div>
                    </div>
                    <p className="text-[11px] text-secondary line-clamp-2 leading-relaxed">
                      {alum.bio}
                    </p>
                  </div>

                  <Link to="/student/mentorship">
                    <Button variant="outline" size="sm" className="w-full text-[11px] h-7 border-border hover:border-accent">
                      Request Guidance
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Career Opportunities */}
          <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-bold text-primary">
                  Featured Career Opportunities
                </h2>
              </div>
              <Link
                to="/student/jobs"
                className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
              >
                <span>Browse All</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {featuredOpportunities.map((job) => (
                <div
                  key={job.id}
                  className="p-4 rounded-sm border border-border bg-[#F8F8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[9px] font-mono uppercase">
                        {job.opportunityType}
                      </Badge>
                      <span className="text-[10px] font-mono text-secondary">
                        {job.postedByName} &bull; {job.postedByCompany}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm text-primary">
                      {job.title}
                    </h3>
                    <p className="text-[11px] text-secondary">
                      {job.organization} &bull; {job.location} ({job.workMode})
                    </p>
                  </div>

                  <Link to="/student/jobs">
                    <Button size="sm" variant="outline" className="text-xs h-8 border-border hover:border-accent">
                      View Details
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Profile Completion, Recent Activity, Upcoming Events) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Completion Card */}
          <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-xs text-primary">
                Profile Completion
              </h3>
              <span className="text-xs font-mono font-bold text-accent">85%</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#F2F2EC] h-2 rounded-full overflow-hidden">
              <div className="bg-accent h-full w-[85%] rounded-full" />
            </div>
            <p className="text-[11px] text-secondary leading-snug">
              Add your target engineering roles and GitHub profile link to boost connection acceptance by alumni.
            </p>
            <Link to="/student/profile" className="block pt-1">
              <Button variant="outline" size="sm" className="w-full text-xs h-7 border-border">
                Complete Profile
              </Button>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-4">
            <h3 className="font-semibold text-xs text-primary pb-2 border-b border-border">
              Recent Activity
            </h3>
            <div className="space-y-3 text-xs">
              {DEMO_STUDENT_ACTIVITIES.map((act) => (
                <div key={act.id} className="space-y-0.5">
                  <p className="font-medium text-primary text-[11px] leading-tight">
                    {act.title}
                  </p>
                  <p className="text-[10px] text-secondary leading-tight">
                    {act.detail}
                  </p>
                  <p className="text-[9px] font-mono text-secondary pt-0.5">
                    {act.timestamp}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Event Preview */}
          <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>Next Upcoming Event</span>
            </div>
            <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm space-y-1.5">
              <p className="text-xs font-bold text-primary">
                {DEMO_EVENTS[0].title}
              </p>
              <p className="text-[10px] text-secondary font-mono">
                {DEMO_EVENTS[0].date} &bull; {DEMO_EVENTS[0].time}
              </p>
              <p className="text-[10px] text-accent">
                Speaker: {DEMO_EVENTS[0].speakerName}
              </p>
            </div>
            <Link to="/student/events" className="block">
              <Button variant="outline" size="sm" className="w-full text-xs h-7 border-border">
                View All Events ({DEMO_EVENTS.length})
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
