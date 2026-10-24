import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  Briefcase,
  PlusCircle,
  Calendar,
  Check,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import {
  INITIAL_MENTORSHIP_REQUESTS,
  DEMO_CAREER_OPPORTUNITIES,
  DEMO_ALUMNI_ACTIVITIES,
  DEMO_EVENTS,
  MentorshipRequest,
  CareerOpportunity,
} from "../../data/demoData";

export default function AlumniDashboardPage() {
  const { user } = useAuth();
  const displayName = user?.fullName?.split(" ")[0] || "Jordan";

  // State for mentorship requests with working accept/decline simulation
  const [requests, setRequests] = useState<MentorshipRequest[]>(INITIAL_MENTORSHIP_REQUESTS);
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);

  // State for share opportunity modal
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newOrg, setNewOrg] = useState("Stripe");
  const [newType, setNewType] = useState<"Full-time" | "Internship" | "Referral">("Referral");
  const [newLocation, setNewLocation] = useState("Bengaluru (Hybrid)");
  const [newDesc, setNewDesc] = useState("");
  const [sharedListings, setSharedListings] = useState<CareerOpportunity[]>(
    DEMO_CAREER_OPPORTUNITIES.filter((o) => o.postedByName === "Jordan Vance")
  );

  const stats = [
    {
      label: "Incoming Requests",
      value: "4",
      change: "2 Pending Review",
      icon: GraduationCap,
    },
    {
      label: "Active Mentees",
      value: "6",
      change: "+1 this week",
      icon: Users,
    },
    {
      label: "Opportunities Shared",
      value: sharedListings.length.toString(),
      change: "14 Total Views",
      icon: Briefcase,
    },
    {
      label: "Student Connections",
      value: "28",
      change: "Active network",
      icon: Sparkles,
    },
  ];

  const handleRequestAction = (id: string, action: "accepted" | "declined") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    const target = requests.find((r) => r.id === id);
    const studentName = target?.studentName || "Student";
    setActionFeedback(
      action === "accepted"
        ? `Mentorship request from ${studentName} accepted. Session scheduled!`
        : `Mentorship request from ${studentName} declined.`
    );
    setTimeout(() => setActionFeedback(null), 3000);
  };

  const handleShareOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newOpp: CareerOpportunity = {
      id: `opp-custom-${Date.now()}`,
      title: newTitle.trim(),
      organization: newOrg.trim(),
      location: newLocation.trim(),
      workMode: "Hybrid",
      opportunityType: newType,
      departmentTag: "CSE / IT",
      description: newDesc.trim() || "Exciting early-career engineering role posted by Jordan Vance.",
      requirements: ["Strong coding skills", "Curiosity and team mindset"],
      compensation: "Competitive (Sample)",
      postedByName: user?.fullName || "Jordan Vance",
      postedByRole: user?.roleTitle || "Staff Platform Engineer",
      postedByCompany: user?.company || "Stripe",
      postedByYear: user?.graduationYear || 2018,
      postedDate: "Just now",
      deadline: "Rolling Demo",
      isDemo: true,
      tags: ["Engineering", newType, "Alumni Shared"],
    };

    setSharedListings([newOpp, ...sharedListings]);
    setShareModalOpen(false);
    setNewTitle("");
    setNewDesc("");
    setActionFeedback("New opportunity shared successfully and added to the Career Board!");
    setTimeout(() => setActionFeedback(null), 3500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcome Section & Quick Actions */}
      <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Alumni Mentor Dashboard
            </span>
            <Badge variant="outline" className="text-[10px] bg-[#F8F8F5]">
              Demo Session
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Welcome back, {displayName}!
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Share your experience, guide emerging professionals, and help students discover their next opportunity.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Button
            size="sm"
            onClick={() => setShareModalOpen(true)}
            className="text-xs gap-1.5 shadow-subtle"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Share an Opportunity</span>
          </Button>
          <Link to="/alumni/mentorship">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-border bg-[#F8F8F5]"
            >
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <span>Review Requests</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Action Notification Alert */}
      {actionFeedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{actionFeedback}</span>
        </div>
      )}

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
        {/* Left Column: Pending Mentorship Requests & Recently Shared Opportunities */}
        <div className="lg:col-span-8 space-y-8">
          {/* Pending Mentorship Requests with working Accept / Decline */}
          <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-bold text-primary">
                  Pending Mentorship Requests
                </h2>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {requests.filter((r) => r.status === "pending").length} Awaiting Decision
              </Badge>
            </div>

            <div className="space-y-4">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-sm border border-border bg-[#F8F8F5] space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-primary">
                          {req.studentName}
                        </span>
                        <Badge variant="outline" className="text-[9px]">
                          {req.studentDepartment} ({req.studentGraduationYear})
                        </Badge>
                      </div>
                      <p className="text-xs text-accent font-medium mt-0.5">
                        Topic: {req.topic}
                      </p>
                    </div>

                    <div className="text-[11px] font-mono text-secondary">
                      {req.requestedDate}
                    </div>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed bg-surface p-2.5 rounded-sm border border-border/80">
                    &ldquo;{req.message}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-secondary font-mono">
                      Preferred: {req.preferredCadence}
                    </span>

                    {req.status === "pending" ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRequestAction(req.id, "declined")}
                          className="text-xs h-7 px-2.5 text-secondary hover:text-red-600 border-border"
                        >
                          <X className="w-3 h-3 mr-1" />
                          Decline
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleRequestAction(req.id, "accepted")}
                          className="text-xs h-7 px-3 gap-1"
                        >
                          <Check className="w-3 h-3" />
                          Accept Request
                        </Button>
                      </div>
                    ) : (
                      <Badge
                        variant={req.status === "accepted" ? "default" : "outline"}
                        className="text-[10px] capitalize"
                      >
                        {req.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Shared Opportunities */}
          <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-accent" />
                <h2 className="text-sm font-bold text-primary">
                  Recently Shared Opportunities
                </h2>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShareModalOpen(true)}
                className="text-xs h-7 gap-1 border-border"
              >
                <PlusCircle className="w-3 h-3 text-accent" />
                <span>Post New</span>
              </Button>
            </div>

            <div className="space-y-3">
              {sharedListings.map((opp) => (
                <div
                  key={opp.id}
                  className="p-4 rounded-sm border border-border bg-[#F8F8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-[9px] uppercase font-mono">
                        {opp.opportunityType}
                      </Badge>
                      <span className="text-[10px] font-mono text-secondary">
                        Posted {opp.postedDate}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm text-primary">
                      {opp.title}
                    </h3>
                    <p className="text-[11px] text-secondary">
                      {opp.organization} &bull; {opp.location}
                    </p>
                  </div>

                  <Link to="/career">
                    <Button variant="outline" size="sm" className="text-xs h-8 border-border">
                      View on Board
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity & Upcoming Events */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Mentorship Guidelines */}
          <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3">
            <h3 className="font-semibold text-xs text-primary">
              Mentor Best Practices
            </h3>
            <ul className="text-xs text-secondary space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">&bull;</span>
                <span>Prioritize concrete feedback on projects over generic talk.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">&bull;</span>
                <span>Encourage students to practice mock design interview questions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">&bull;</span>
                <span>Review student resumes before submitting company referrals.</span>
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-4">
            <h3 className="font-semibold text-xs text-primary pb-2 border-b border-border">
              Recent Activity
            </h3>
            <div className="space-y-3 text-xs">
              {DEMO_ALUMNI_ACTIVITIES.map((act) => (
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

          {/* Upcoming Event Hosted/Attending */}
          <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>Upcoming Webinar You Co-Host</span>
            </div>
            <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm space-y-1.5">
              <p className="text-xs font-bold text-primary">
                {DEMO_EVENTS[0].title}
              </p>
              <p className="text-[10px] text-secondary font-mono">
                {DEMO_EVENTS[0].date} &bull; {DEMO_EVENTS[0].time}
              </p>
              <p className="text-[10px] text-emerald-700 font-medium">
                {DEMO_EVENTS[0].registeredCount} students registered
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Share an Opportunity Interactive Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-md max-w-lg w-full p-6 space-y-5 shadow-xl">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-sm text-primary">
                  Share a Career Opportunity or Referral
                </h3>
                <p className="text-xs text-secondary">
                  Post an early-career vacancy, internship, or referral opportunity for students.
                </p>
              </div>
              <button
                onClick={() => setShareModalOpen(false)}
                className="p-1 rounded-sm border border-border text-secondary hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleShareOpportunity} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-primary">
                  Role Title <span className="text-accent">*</span>
                </label>
                <Input
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Junior Systems Engineer, Cloud Intern..."
                  className="h-9 text-xs bg-[#F8F8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-primary">
                    Organization
                  </label>
                  <Input
                    required
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    placeholder="e.g. Stripe, Google, Startup"
                    className="h-9 text-xs bg-[#F8F8F5]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-primary">
                    Opportunity Type
                  </label>
                  <select
                    value={newType}
                    onChange={(e) =>
                      setNewType(e.target.value as "Full-time" | "Internship" | "Referral")
                    }
                    className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none"
                  >
                    <option value="Referral">Alumni Referral</option>
                    <option value="Full-time">Full-time Vacancy</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-primary">
                  Location &amp; Work Mode
                </label>
                <Input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="e.g. Bengaluru (Hybrid) or Remote"
                  className="h-9 text-xs bg-[#F8F8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-primary">
                  Role Description &amp; Candidate Criteria
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Briefly state target skills, branch criteria, and how students can request a referral..."
                  className="w-full rounded-sm border border-border bg-[#F8F8F5] p-2.5 text-xs text-primary focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShareModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs font-semibold">
                  Post Opportunity
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
