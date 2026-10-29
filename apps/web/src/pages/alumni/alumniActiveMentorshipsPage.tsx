import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Clock,
  Video,
  MessageSquare,
  Lock,
  GraduationCap,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";

export default function AlumniActiveMentorshipsPage() {
  const { user } = useAuth();
  const { conversations } = useMentorship();

  const alumniId = user?.id || "alumni-demo-jordan";
  const myConversations = conversations.filter(
    (c) =>
      c.alumni_id === alumniId ||
      c.alumni_name.toLowerCase().includes(user?.fullName?.toLowerCase() || "jordan")
  );

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-1.5 py-0.5 bg-accent/10 rounded-xs">
              Active Mentees &amp; Engagements
            </span>
            <Badge variant="outline" className="text-[9px] bg-white font-mono flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-accent" />
              <span>Participant Authorization</span>
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Active Mentorships
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Manage your ongoing 1-on-1 mentee cohorts, track milestones, and maintain regular check-ins.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/alumni/mentorship/requests">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border bg-surface shadow-subtle hover:bg-[#F8F8F5] gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <span>Review Inquiries</span>
            </Button>
          </Link>
          <Link to="/alumni/mentorship/open-chat">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Open Chat</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Active Cohort Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-primary flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span>Currently Active Mentees ({myConversations.length})</span>
          </h2>
          <span className="text-[11px] font-mono text-secondary">
            Encrypted &amp; Confidential Sessions
          </span>
        </div>

        {myConversations.length === 0 ? (
          <div className="bg-surface border border-border rounded-md p-12 text-center space-y-3">
            <Users className="w-10 h-10 text-secondary mx-auto" />
            <h3 className="font-bold text-sm text-primary">No active mentees yet</h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              Accept incoming student requests to activate private 1-on-1 mentorship tracks.
            </p>
            <Link to="/alumni/mentorship/requests">
              <Button size="sm" className="text-xs mt-2">
                Check Pending Requests
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {myConversations.map((conv) => (
              <div
                key={conv.id}
                className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-accent/15 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                        {conv.student_initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-sm text-primary">
                            {conv.student_name}
                          </h3>
                          <Badge
                            variant={conv.status === "active" ? "default" : "outline"}
                            className="text-[9px] font-mono capitalize"
                          >
                            {conv.status}
                          </Badge>
                        </div>
                        <p className="text-[11px] text-secondary font-mono">
                          {conv.student_department} &apos;{conv.student_graduation_year.toString().slice(-2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="font-semibold text-accent">
                      Topic: {conv.topic}
                    </p>
                    <div className="p-2.5 bg-[#F8F8F5] rounded-sm text-[11px] font-mono text-secondary flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>Cadence: {conv.cadence}</span>
                      </span>
                      <span>
                        Last active: {new Date(conv.last_message_at).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-secondary bg-surface p-2.5 rounded-sm border border-border line-clamp-2">
                      <strong className="text-primary font-medium">Recent Note:</strong>{" "}
                      {conv.last_message_preview || "Mentorship track activated."}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-border flex items-center gap-2">
                  <Link
                    to={`/alumni/mentorship/one-on-one/${conv.id}`}
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full text-xs h-8 gap-1.5 border-border"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Open Private Chat</span>
                    </Button>
                  </Link>

                  <Button
                    size="sm"
                    className="text-xs h-8 gap-1.5 flex-1"
                    onClick={() =>
                      window.open("https://meet.google.com/demo-alumnux-mentorship", "_blank")
                    }
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video Meet</span>
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
