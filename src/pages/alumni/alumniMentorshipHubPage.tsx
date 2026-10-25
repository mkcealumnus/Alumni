import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  GraduationCap,
  MessageSquare,
  Lock,
  Globe,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";

export default function AlumniMentorshipHubPage() {
  const { user } = useAuth();
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

  // Unanswered student questions in open chat
  const unansweredQuestions = openChatMessages.filter(
    (m) =>
      m.sender_role === "student" &&
      !openChatMessages.some((r) => r.reply_to_message_id === m.id)
  );

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Alumni Mentorship Hub
            </span>
            <Badge variant="outline" className="text-[10px] bg-[#F8F8F5]">
              Guiding the Next Generation
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Mentorship Management
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Support students across both channels: offer public advice to the whole student community in Open Chat, or accept focused 1-on-1 mentees for resume critiques and interview preparation.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Link to="/alumni/mentorship/open-chat">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <Globe className="w-3.5 h-3.5" />
              <span>Answer in Open Chat</span>
            </Button>
          </Link>
          <Link to="/alumni/mentorship/requests">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-border bg-[#F8F8F5]"
            >
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <span>Review Requests ({pendingRequests.length})</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. THE TWO MODES CARDS FOR ALUMNI */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mode A: Open Chat */}
        <div className="bg-surface border-2 border-border rounded-md p-6 shadow-subtle flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <Badge className="text-[10px] font-mono bg-accent/15 text-accent border-accent/20">
                Community Career Guidance
              </Badge>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">Open Chat Mentorship</h2>
              <p className="text-xs font-mono text-accent font-semibold mt-0.5">
                Answer student questions publicly. Multiply your mentorship impact.
              </p>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              Help dozens of students at once. Student questions on interview prep, transition strategies, and tech stacks are posted here. Your answers remain visible to the entire student body.
            </p>

            <div className="p-3 bg-[#F8F8F5] rounded-sm border border-border text-xs space-y-1 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Unanswered Inquiries:</span>
                <span className="font-semibold text-accent">{unansweredQuestions.length} Questions</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Response Mode:</span>
                <span className="font-semibold text-primary">Threaded reply directly in chat</span>
              </div>
            </div>
          </div>

          <Link to="/alumni/mentorship/open-chat" className="w-full">
            <Button size="sm" className="w-full text-xs gap-1.5 h-9 shadow-subtle">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open Chat Mentorship Space</span>
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
        </div>

        {/* Mode B: 1-on-1 Mentorship */}
        <div className="bg-surface border-2 border-border rounded-md p-6 shadow-subtle flex flex-col justify-between space-y-5">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-sm bg-accent text-white flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono border-accent text-accent bg-accent/5">
                Private Cohort
              </Badge>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">1-on-1 Private Mentorship</h2>
              <p className="text-xs font-mono text-accent font-semibold mt-0.5">
                Dedicated mentee cohorts &amp; personalized reviews.
              </p>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              Review individual applications from students seeking your specific domain expertise. Accept students whose goals align with your schedule and mentor them in a confidential private workspace.
            </p>

            <div className="p-3 bg-[#F8F8F5] rounded-sm border border-border text-xs space-y-1 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Pending Inquiries:</span>
                <span className="font-semibold text-amber-700">{pendingRequests.length} Pending</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Active Mentees:</span>
                <span className="font-semibold text-semantic-success">{myConversations.length} Active Tracks</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Link to="/alumni/mentorship/requests" className="flex-1">
              <Button size="sm" variant="outline" className="w-full text-xs gap-1.5 h-9 border-border bg-[#F8F8F5]">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                <span>Review Requests</span>
              </Button>
            </Link>
            <Link to="/alumni/mentorship/active" className="flex-1">
              <Button size="sm" className="w-full text-xs gap-1.5 h-9 shadow-subtle">
                <Users className="w-3.5 h-3.5" />
                <span>Active Mentees</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. PENDING REQUESTS WIDGET */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-accent" />
            <h3 className="font-bold text-sm text-primary">Pending Student Requests</h3>
            {pendingRequests.length > 0 && (
              <Badge className="text-[10px] bg-amber-500 text-white font-mono">
                {pendingRequests.length} Action Needed
              </Badge>
            )}
          </div>
          <Link
            to="/alumni/mentorship/requests"
            className="text-xs font-mono text-accent hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="py-8 text-center text-xs text-secondary">
            No pending mentorship requests waiting for your review.
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.slice(0, 2).map((req) => (
              <div
                key={req.id}
                className="p-4 bg-[#F8F8F5] border border-border rounded-sm text-xs space-y-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{req.student_name}</span>
                    <span className="text-secondary font-mono text-[11px]">
                      &bull; {req.student_department} ({req.student_graduation_year})
                    </span>
                  </div>
                  <p className="text-accent font-semibold">Focus: {req.topic}</p>
                  <p className="text-secondary italic line-clamp-1">&ldquo;{req.introductory_message}&rdquo;</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => respondToMentorshipRequest(req.id, "declined")}
                    className="text-xs h-7 px-2.5 text-secondary hover:text-red-600 border-border"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => respondToMentorshipRequest(req.id, "accepted")}
                    className="text-xs h-7 px-3 gap-1 shadow-xs"
                  >
                    <Check className="w-3 h-3" />
                    Accept
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
