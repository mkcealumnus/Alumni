import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Check,
  X,
  MessageSquare,
  CheckCircle2,
  Lock,
  ArrowRight,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";

export default function AlumniMentorshipRequestsPage() {
  const { user } = useAuth();
  const {
    mentorshipRequests,
    respondToMentorshipRequest,
  } = useMentorship();

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "accepted" | "declined">("all");
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filter requests for alumni
  const alumniId = user?.id || "alumni-demo-jordan";
  const myRequests = mentorshipRequests.filter(
    (r) =>
      r.alumni_id === alumniId ||
      r.alumni_name.toLowerCase().includes(user?.fullName?.toLowerCase() || "jordan")
  );

  const filteredRequests = myRequests.filter((r) => {
    if (statusFilter === "all") return true;
    return r.status === statusFilter;
  });

  const handleAction = async (id: string, action: "accepted" | "declined") => {
    const target = myRequests.find((r) => r.id === id);
    const result = await respondToMentorshipRequest(id, action);
    if (result.success) {
      setFeedback(
        action === "accepted"
          ? `Mentorship request from ${target?.student_name} accepted! Private conversation created.`
          : `Mentorship request from ${target?.student_name} declined.`
      );
      setTimeout(() => setFeedback(null), 3500);

      if (action === "accepted" && result.conversationId) {
        // Option to navigate or notify
      }
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-1.5 py-0.5 bg-accent/10 rounded-xs">
              Alumni Mentorship Inquiries
            </span>
            <Badge variant="outline" className="text-[9px] bg-white font-mono">
              Incoming 1-on-1 Requests
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Mentorship Requests
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Review student incoming applications, evaluate goals, and activate private guidance tracks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/alumni/mentorship/active">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border bg-surface shadow-subtle hover:bg-[#F8F8F5] gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>Active Mentees</span>
            </Button>
          </Link>
          <Link to="/alumni/mentorship/open-chat">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Answer in Open Chat</span>
            </Button>
          </Link>
        </div>
      </div>

      {feedback && (
        <div className="p-3 bg-semantic-success-subtle border border-semantic-success-border rounded-sm text-xs text-semantic-success flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            {feedback}
          </span>
          <Link
            to="/alumni/mentorship/active"
            className="underline font-semibold flex items-center gap-1"
          >
            <span>View Active</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* 2. Filters */}
      <div className="flex items-center gap-2 text-xs">
        {(["all", "pending", "accepted", "declined"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-sm capitalize font-medium border transition-colors ${
              statusFilter === s
                ? "bg-primary text-white border-primary"
                : "bg-surface text-secondary border-border hover:bg-[#F2F2EC] hover:text-primary"
            }`}
          >
            {s === "all" ? "All Requests" : s}
          </button>
        ))}
      </div>

      {/* 3. Requests List */}
      <div className="space-y-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-surface border border-border rounded-md p-12 text-center space-y-3">
            <GraduationCap className="w-10 h-10 text-secondary mx-auto" />
            <h3 className="font-bold text-sm text-primary">No mentorship requests in this filter</h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              Students browse your profile and submit inquiries based on your specified expertise and career track.
            </p>
          </div>
        ) : (
          filteredRequests.map((req) => {
            const isPending = req.status === "pending";
            const isAccepted = req.status === "accepted";

            return (
              <div
                key={req.id}
                className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-accent/15 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                      {req.student_initials || "ST"}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-primary">
                          {req.student_name}
                        </span>
                        <span className="text-xs text-secondary">
                          &bull; {req.student_department} ({req.student_graduation_year})
                        </span>
                      </div>
                      <p className="text-xs text-accent font-medium mt-0.5">
                        Requested Focus: {req.topic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-secondary">
                      {new Date(req.created_at).toLocaleDateString()}
                    </span>
                    <Badge
                      variant={isPending ? "outline" : isAccepted ? "default" : "outline"}
                      className={`text-[10px] font-mono capitalize ${
                        isPending
                          ? "border-amber-300 text-amber-700 bg-amber-50"
                          : isAccepted
                          ? "bg-semantic-success text-white"
                          : "bg-[#F8F8F5] text-secondary"
                      }`}
                    >
                      {req.status}
                    </Badge>
                  </div>
                </div>

                {/* Introductory Note */}
                <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-xs text-secondary space-y-1">
                  <span className="text-[10px] font-mono uppercase font-semibold text-primary">
                    Student Introductory Note:
                  </span>
                  <p className="leading-relaxed whitespace-pre-wrap italic">
                    &ldquo;{req.introductory_message}&rdquo;
                  </p>
                </div>

                {/* Footer and Accept/Decline Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-border gap-2">
                  <span className="text-[11px] text-secondary font-mono">
                    Preferred Cadence: {req.preferred_cadence}
                  </span>

                  {isPending ? (
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction(req.id, "declined")}
                        className="text-xs h-8 px-3 text-secondary hover:text-red-600 border-border"
                      >
                        <X className="w-3.5 h-3.5 mr-1" />
                        Decline
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAction(req.id, "accepted")}
                        className="text-xs h-8 px-4 gap-1 shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Accept &amp; Open Chat
                      </Button>
                    </div>
                  ) : isAccepted ? (
                    <Link to={`/alumni/mentorship/one-on-one/conv-${req.student_id}-${req.alumni_id}`}>
                      <Button size="sm" className="text-xs h-8 gap-1 shadow-xs">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Open Private Conversation</span>
                      </Button>
                    </Link>
                  ) : (
                    <span className="text-xs text-secondary italic">
                      Request declined
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
