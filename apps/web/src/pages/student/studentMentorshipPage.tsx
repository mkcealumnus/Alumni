import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Calendar,
  Clock,
  MessageSquare,
  Video,
} from "lucide-react";

export default function StudentMentorshipPage() {
  const [sessions] = useState([
    {
      id: "sess-01",
      mentorName: "Jordan Vance",
      mentorRole: "Staff Platform Engineer @ Stripe",
      topic: "System Design & Distributed Queues",
      date: "Saturday, Nov 07",
      time: "5:00 PM - 5:45 PM IST",
      status: "Confirmed",
      meetingLink: "https://meet.google.com/demo-alumnux-session",
    },
    {
      id: "sess-02",
      mentorName: "Ananya Ramesh",
      mentorRole: "Senior Software Engineer @ Google",
      topic: "Off-Campus Core Systems Referral & Algorithms",
      date: "Tuesday, Nov 10",
      time: "7:00 PM - 7:30 PM IST",
      status: "Pending Confirmation",
    },
  ]);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Mentorship Hub
          </h1>
          <p className="text-xs text-secondary">
            Manage your 1-on-1 career guidance sessions, mock interview requests, and mentor conversations.
          </p>
        </div>
        <Link to="/student/alumni">
          <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Find a New Mentor</span>
          </Button>
        </Link>
      </div>

      {/* Active Mentorship Sessions */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-primary flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          <span>Scheduled &amp; Pending Sessions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((sess) => (
            <div
              key={sess.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge
                    variant={sess.status === "Confirmed" ? "default" : "outline"}
                    className="text-[10px]"
                  >
                    {sess.status}
                  </Badge>
                  <span className="text-[11px] font-mono text-secondary">
                    {sess.date}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-primary">
                    {sess.topic}
                  </h3>
                  <p className="text-xs text-accent font-medium mt-0.5">
                    with {sess.mentorName}
                  </p>
                  <p className="text-[11px] text-secondary">
                    {sess.mentorRole}
                  </p>
                </div>

                <div className="p-2.5 bg-[#F8F8F5] rounded-sm text-[11px] font-mono text-secondary flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>{sess.time}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Link to="/student/messages" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1.5 border-border">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message Mentor</span>
                  </Button>
                </Link>
                {sess.meetingLink && (
                  <Button
                    size="sm"
                    className="text-xs h-8 gap-1.5 flex-1"
                    onClick={() => window.open(sess.meetingLink, "_blank")}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Join Call</span>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Mentorship Domains */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <h2 className="text-sm font-bold text-primary">Popular Mentorship Guidance Tracks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#F8F8F5] rounded-sm border border-border space-y-2">
            <h3 className="font-semibold text-primary">1. System Design &amp; Architecture</h3>
            <p className="text-secondary text-[11px]">
              Learn how to structure high-throughput databases, cache invalidation, and microservices for Tier-1 engineering interviews.
            </p>
          </div>
          <div className="p-4 bg-[#F8F8F5] rounded-sm border border-border space-y-2">
            <h3 className="font-semibold text-primary">2. Off-Campus Referral Strategy</h3>
            <p className="text-secondary text-[11px]">
              Techniques to showcase genuine engineering depth on your GitHub, reach out to recruiters, and secure internal referrals.
            </p>
          </div>
          <div className="p-4 bg-[#F8F8F5] rounded-sm border border-border space-y-2">
            <h3 className="font-semibold text-primary">3. Core Hardware &amp; Embedded Systems</h3>
            <p className="text-secondary text-[11px]">
              Guidance for ECE/EEE students targeting firmware, micro-controller architecture, and semiconductor roles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
