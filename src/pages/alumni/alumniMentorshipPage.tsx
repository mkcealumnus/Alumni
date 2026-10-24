import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, Calendar, Video, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { INITIAL_MENTORSHIP_REQUESTS, MentorshipRequest } from "../../data/demoData";

export default function AlumniMentorshipPage() {
  const [requests, setRequests] = useState<MentorshipRequest[]>(INITIAL_MENTORSHIP_REQUESTS);
  const [activeMentees] = useState([
    {
      id: "mentee-1",
      name: "Alex Rivera",
      department: "CSE '26",
      topic: "System Design & Distributed Queues",
      cadence: "Bi-weekly Saturdays",
      nextCall: "Nov 07, 5:00 PM IST",
      progress: "Implemented write-ahead log & idempotency keys in Go project",
    },
    {
      id: "mentee-2",
      name: "Kavya Sundaram",
      department: "ECE '26",
      topic: "Transition to Cloud Infrastructure",
      cadence: "Monthly check-ins",
      nextCall: "Nov 14, 4:00 PM IST",
      progress: "Learning Docker containerization and Linux process namespaces",
    },
  ]);

  const handleAction = (id: string, status: "accepted" | "declined") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Mentorship Management
          </h1>
          <p className="text-xs text-secondary">
            Review student incoming requests, schedule 1-on-1 virtual sessions, and track mentee milestones.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          {activeMentees.length} Active Mentees
        </Badge>
      </div>

      {/* Active Mentees Section */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-primary flex items-center gap-2">
          <Calendar className="w-4 h-4 text-accent" />
          <span>Active Mentees &amp; Next Scheduled Sessions</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {activeMentees.map((m) => (
            <div
              key={m.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-primary">{m.name}</span>
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {m.department}
                  </Badge>
                </div>

                <div className="text-xs space-y-1">
                  <p className="font-semibold text-accent">Track: {m.topic}</p>
                  <p className="text-secondary">Cadence: {m.cadence}</p>
                </div>

                <div className="p-2.5 bg-[#F8F8F5] rounded-sm text-[11px] font-mono text-secondary flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>Next: {m.nextCall}</span>
                </div>

                <p className="text-xs text-secondary bg-surface p-2.5 rounded-sm border border-border">
                  <strong className="text-primary font-medium">Recent Milestone:</strong> {m.progress}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Link to="/alumni/messages" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs h-8 gap-1.5 border-border">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat</span>
                  </Button>
                </Link>
                <Button size="sm" className="text-xs h-8 gap-1.5 flex-1">
                  <Video className="w-3.5 h-3.5" />
                  <span>Open Video Room</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incoming Requests Table/List */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-5">
        <h2 className="text-sm font-bold text-primary">
          All Mentorship Requests
        </h2>

        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 rounded-sm border border-border bg-[#F8F8F5] space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="font-bold text-xs sm:text-sm text-primary">
                    {req.studentName}
                  </span>{" "}
                  <span className="text-xs text-secondary">
                    &bull; {req.studentDepartment} ({req.studentGraduationYear})
                  </span>
                  <p className="text-xs text-accent font-medium mt-0.5">
                    Topic: {req.topic}
                  </p>
                </div>
                <div className="text-[11px] font-mono text-secondary">
                  {req.requestedDate}
                </div>
              </div>

              <p className="text-xs text-secondary leading-relaxed bg-surface p-2.5 rounded-sm border border-border">
                {req.message}
              </p>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-secondary font-mono">
                  Preferred format: {req.preferredCadence}
                </span>

                {req.status === "pending" ? (
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAction(req.id, "declined")}
                      className="text-xs h-7 px-2.5 text-secondary hover:text-red-600 border-border"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Decline
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleAction(req.id, "accepted")}
                      className="text-xs h-7 px-3 gap-1"
                    >
                      <Check className="w-3 h-3" />
                      Accept
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
    </div>
  );
}
