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
  Check,
  X,
  CheckCircle2,
  Globe,
  Lock,
  MessageSquare,
  ArrowRight,
  Video,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useMentorship } from "../../context/mentorshipContext";
import {
  DEMO_CAREER_OPPORTUNITIES,
  CareerOpportunity,
} from "../../data/demoData";

export default function AlumniDashboardPage() {
  const { user } = useAuth();
  const displayName = user?.fullName?.split(" ")[0] || "Jordan";

  const {
    openChatMessages,
    mentorshipRequests,
    conversations,
    respondToMentorshipRequest,
  } = useMentorship();

  const alumniId = user?.id || "alumni-demo-jordan";
  const myRequests = mentorshipRequests.filter(
    (r) =>
      r.alumni_id === alumniId ||
      r.alumni_name.toLowerCase().includes(user?.fullName?.toLowerCase() || "jordan")
  );
  const pendingRequests = myRequests.filter((r) => r.status === "pending");
  const myConversations = conversations.filter(
    (c) =>
      c.alumni_id === alumniId ||
      c.alumni_name.toLowerCase().includes(user?.fullName?.toLowerCase() || "jordan")
  );

  // Recent student questions in Open Chat
  const recentStudentQuestions = openChatMessages
    .filter((m) => m.sender_role === "student")
    .slice(-3);

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
      label: "Pending Inquiries",
      value: pendingRequests.length.toString(),
      change: "Action required",
      icon: GraduationCap,
    },
    {
      label: "Active Mentees",
      value: myConversations.length.toString(),
      change: "1-on-1 private tracks",
      icon: Users,
    },
    {
      label: "Open Chat Inquiries",
      value: openChatMessages.length.toString(),
      change: "Community active",
      icon: Globe,
    },
    {
      label: "Opportunities Shared",
      value: sharedListings.length.toString(),
      change: "14 Total Views",
      icon: Briefcase,
    },
  ];

  const handleRequestAction = async (id: string, action: "accepted" | "declined") => {
    const target = myRequests.find((r) => r.id === id);
    const result = await respondToMentorshipRequest(id, action);
    if (result.success) {
      setActionFeedback(
        action === "accepted"
          ? `Mentorship request from ${target?.student_name} accepted. Private conversation activated!`
          : `Mentorship request from ${target?.student_name} declined.`
      );
      setTimeout(() => setActionFeedback(null), 3500);
    }
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
      {/* 1. Welcome Section & Quick Actions (Section 5 Spec) */}
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
            Answer questions in the community Open Chat, manage your incoming 1-on-1 mentorship requests, and guide active mentees.
          </p>
        </div>

        {/* Quick Action Buttons (Section 5 Spec: "Answer a Question", "Review Mentorship Requests") */}
        <div className="flex flex-wrap gap-2.5">
          <Link to="/alumni/mentorship/open-chat">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Answer a Question</span>
            </Button>
          </Link>
          <Link to="/alumni/mentorship/requests">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-border bg-[#F8F8F5]"
            >
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <span>Review Mentorship Requests ({pendingRequests.length})</span>
            </Button>
          </Link>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShareModalOpen(true)}
            className="text-xs gap-1.5 border-border bg-surface"
          >
            <PlusCircle className="w-3.5 h-3.5 text-secondary" />
            <span>Post Opportunity</span>
          </Button>
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

      {/* 3. Mentorship Focus: Open Chat Questions & Pending 1-on-1 Requests (Section 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Student Questions in Open Chat */}
        <div className="lg:col-span-6 bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-primary">
                Student Questions in Open Chat
              </h2>
            </div>
            <Link
              to="/alumni/mentorship/open-chat"
              className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
            >
              <span>View All Discussions</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentStudentQuestions.map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-sm border border-border bg-[#F8F8F5] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-primary">
                      {msg.sender_name}
                    </span>
                    <Badge variant="outline" className="text-[9px] font-mono">
                      {msg.sender_department || "Student"}
                    </Badge>
                    {msg.category_tag && (
                      <span className="text-[9px] font-mono text-secondary bg-surface px-1 py-0.5 rounded-xs border border-border">
                        {msg.category_tag}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-secondary">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>

                <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                  &ldquo;{msg.content}&rdquo;
                </p>

                <div className="pt-1 flex items-center justify-end">
                  <Link to="/alumni/mentorship/open-chat">
                    <Button size="sm" variant="outline" className="text-xs h-7 px-3 border-border bg-surface gap-1 hover:border-accent">
                      <MessageSquare className="w-3 h-3 text-accent" />
                      <span>Answer Question</span>
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Pending 1-on-1 Requests (Section 5) */}
        <div className="lg:col-span-6 bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-primary">
                Pending Mentorship Requests ({pendingRequests.length})
              </h2>
            </div>
            <Link
              to="/alumni/mentorship/requests"
              className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
            >
              <span>Manage Requests</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {pendingRequests.length === 0 ? (
            <div className="p-8 text-center space-y-2 bg-[#F8F8F5] rounded-sm border border-border">
              <CheckCircle2 className="w-8 h-8 text-semantic-success mx-auto" />
              <p className="text-xs font-semibold text-primary">All caught up!</p>
              <p className="text-[11px] text-secondary">
                No pending mentorship requests waiting for your decision.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-sm border border-border bg-[#F8F8F5] space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-xs text-primary">
                        {req.student_name}
                      </span>{" "}
                      <span className="text-[11px] text-secondary font-mono">
                        &bull; {req.student_department} ({req.student_graduation_year})
                      </span>
                      <p className="text-xs text-accent font-medium mt-0.5">
                        Focus: {req.topic}
                      </p>
                    </div>
                    <span className="text-[10px] font-mono text-secondary">
                      {new Date(req.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-secondary leading-relaxed bg-surface p-2.5 rounded-sm border border-border italic line-clamp-2">
                    &ldquo;{req.introductory_message}&rdquo;
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono text-secondary">
                      Cadence: {req.preferred_cadence}
                    </span>

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
                        className="text-xs h-7 px-3 gap-1 shadow-xs"
                      >
                        <Check className="w-3 h-3" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Active Mentees & Ongoing Tracks */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold text-primary">
              Active Student Mentorships ({myConversations.length})
            </h2>
          </div>
          <Link
            to="/alumni/mentorship/active"
            className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
          >
            <span>View All Cohorts</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {myConversations.length === 0 ? (
          <div className="py-6 text-center text-xs text-secondary">
            No active mentees. Accept pending requests to activate 1-on-1 guidance tracks.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myConversations.map((conv) => (
              <div
                key={conv.id}
                className="p-4 bg-[#F8F8F5] border border-border rounded-sm space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-primary">{conv.student_name}</span>
                    <Badge className="text-[9px] bg-semantic-success text-white py-0 px-1 font-mono">
                      Active Track
                    </Badge>
                  </div>
                  <p className="text-xs text-accent font-medium">Topic: {conv.topic}</p>
                  <p className="text-[11px] text-secondary font-mono">
                    Cadence: {conv.cadence}
                  </p>
                  <p className="text-xs text-secondary bg-surface p-2 rounded-xs border border-border line-clamp-1">
                    {conv.last_message_preview || "Mentorship active"}
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Link to={`/alumni/mentorship/one-on-one/${conv.id}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs h-7 border-border gap-1">
                      <MessageSquare className="w-3 h-3 text-accent" />
                      <span>Chat</span>
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="text-xs h-7 px-3 gap-1 flex-1"
                    onClick={() =>
                      window.open("https://meet.google.com/demo-alumnux-mentorship", "_blank")
                    }
                  >
                    <Video className="w-3 h-3" />
                    <span>Meet</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Shared Opportunities List */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold text-primary">
              Opportunities You&apos;ve Shared
            </h2>
          </div>
          <Button
            size="sm"
            onClick={() => setShareModalOpen(true)}
            className="text-xs gap-1.5 h-8"
          >
            <PlusCircle className="w-3 h-3" />
            <span>Post New Listing</span>
          </Button>
        </div>

        <div className="space-y-3">
          {sharedListings.map((job) => (
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
                    Posted {job.postedDate} &bull; Deadline: {job.deadline}
                  </span>
                </div>
                <h3 className="font-semibold text-xs sm:text-sm text-primary">
                  {job.title}
                </h3>
                <p className="text-[11px] text-secondary">
                  {job.organization} &bull; {job.location} ({job.workMode})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-mono text-secondary">
                  14 Student Views
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share Opportunity Modal */}
      {shareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-surface border border-border rounded-md p-6 max-w-lg w-full space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-bold text-sm text-primary">Share Career Opportunity</h3>
              <button
                type="button"
                onClick={() => setShareModalOpen(false)}
                className="text-secondary hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleShareOpportunity} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold block mb-1">Opportunity Title</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Junior Backend Engineer (Go / Distributed Systems)"
                  className="text-xs h-9 bg-surface border-border"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1">Organization</label>
                  <Input
                    value={newOrg}
                    onChange={(e) => setNewOrg(e.target.value)}
                    className="text-xs h-9 bg-surface border-border"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1">Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full text-xs h-9 p-2 bg-surface border border-border rounded-sm"
                  >
                    <option value="Referral">Employee Referral</option>
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time Role</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1">Location &amp; Work Mode</label>
                <Input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="text-xs h-9 bg-surface border-border"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Short Description / Instructions</label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Briefly describe responsibilities and how students can apply or connect..."
                  className="w-full text-xs p-2 bg-surface border border-border rounded-sm resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShareModalOpen(false)}
                  className="text-xs border-border"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs">
                  Publish to Student Board
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
