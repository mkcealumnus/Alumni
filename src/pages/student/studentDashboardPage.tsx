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
  Globe,
  Lock,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { useMentorship } from "../../context/mentorshipContext";
import {
  DEMO_CAREER_OPPORTUNITIES,
  DEMO_EVENTS,
  DEMO_STUDENT_ACTIVITIES,
} from "../../data/demoData";
import { MOCK_ALUMNI } from "../../lib/mockData";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const displayName = user?.fullName?.split(" ")[0] || "Alex";
  const {
    openChatMessages,
    mentorshipRequests,
    conversations,
  } = useMentorship();

  const studentId = user?.id || "student-demo-alex";
  const myRequests = mentorshipRequests.filter((r) => r.student_id === studentId);
  const pendingRequests = myRequests.filter((r) => r.status === "pending");
  const myConversations = conversations.filter((c) => c.student_id === studentId);

  // Recent open chat messages
  const recentOpenChat = openChatMessages.slice(-3);

  // Unanswered community questions
  const unansweredQuestions = openChatMessages.filter(
    (m) =>
      m.sender_role === "student" &&
      !openChatMessages.some((r) => r.reply_to_message_id === m.id)
  );

  const stats = [
    {
      label: "Open Chat Questions",
      value: openChatMessages.length.toString(),
      change: "Active community",
      icon: Globe,
    },
    {
      label: "1-on-1 Requests",
      value: myRequests.length.toString(),
      change: `${pendingRequests.length} Pending Review`,
      icon: GraduationCap,
    },
    {
      label: "Active Mentorships",
      value: myConversations.length.toString(),
      change: "Private tracks",
      icon: Lock,
    },
    {
      label: "Saved Opportunities",
      value: "8",
      change: "2 Deadlines soon",
      icon: Bookmark,
    },
  ];

  const recommendedAlumni = MOCK_ALUMNI.slice(0, 3);
  const featuredOpportunities = DEMO_CAREER_OPPORTUNITIES.slice(0, 2);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Welcome Section & Quick Actions (Section 5 Spec) */}
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
            Ask questions publicly in Open Chat, request personalized 1-on-1 mentorship, and discover career opportunities.
          </p>
        </div>

        {/* Quick Action Buttons (Section 5: "Ask the Community", "Find an Alumni Mentor") */}
        <div className="flex flex-wrap gap-2.5">
          <Link to="/student/mentorship/open-chat">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <Globe className="w-3.5 h-3.5" />
              <span>Ask the Community</span>
            </Button>
          </Link>
          <Link to="/student/mentorship/one-on-one">
            <Button variant="outline" size="sm" className="text-xs gap-1.5 border-border bg-[#F8F8F5]">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>Find an Alumni Mentor</span>
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

      {/* 3. Mentorship Highlights: Open Chat & 1-on-1 Widgets (Section 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Recent Open Chat Discussions */}
        <div className="lg:col-span-6 bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-primary">
                Recent Open Chat Discussions
              </h2>
            </div>
            <Link
              to="/student/mentorship/open-chat"
              className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
            >
              <span>Ask Community</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentOpenChat.map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-sm border border-border bg-[#F8F8F5] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-xs text-primary">
                      {msg.sender_name}
                    </span>
                    <Badge variant="outline" className="text-[9px] py-0 px-1 font-mono">
                      {msg.sender_role === "alumni" ? "Alumni" : "Student"}
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
                  {msg.content}
                </p>
              </div>
            ))}
          </div>

          {unansweredQuestions.length > 0 && (
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-sm text-xs flex items-center justify-between">
              <span className="text-amber-800">
                <strong>{unansweredQuestions.length}</strong> active student questions currently open for discussion.
              </span>
              <Link
                to="/student/mentorship/open-chat"
                className="font-semibold text-amber-900 underline"
              >
                Contribute
              </Link>
            </div>
          )}
        </div>

        {/* Right Column: 1-on-1 Mentorship Status */}
        <div className="lg:col-span-6 bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-primary">
                1-on-1 Mentorships &amp; Requests
              </h2>
            </div>
            <Link
              to="/student/mentorship/one-on-one"
              className="text-xs text-accent font-medium hover:underline flex items-center gap-1"
            >
              <span>Manage 1-on-1</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {myConversations.length === 0 && pendingRequests.length === 0 ? (
            <div className="p-6 text-center space-y-2 bg-[#F8F8F5] rounded-sm border border-border">
              <GraduationCap className="w-8 h-8 text-secondary mx-auto" />
              <p className="text-xs font-semibold text-primary">No active private mentorship tracks</p>
              <p className="text-[11px] text-secondary">
                Connect with verified alumni at Stripe, Google, or AWS for personalized code reviews.
              </p>
              <Link to="/student/mentorship/one-on-one" className="inline-block pt-1">
                <Button size="sm" className="text-xs">Find a Mentor</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myConversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-3.5 bg-[#F8F8F5] border border-border rounded-sm flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-primary truncate">
                        {conv.alumni_name}
                      </span>
                      <Badge className="text-[9px] bg-semantic-success text-white py-0 px-1 font-mono">
                        Active 1-on-1
                      </Badge>
                    </div>
                    <p className="text-[11px] text-accent truncate">{conv.topic}</p>
                    <p className="text-[10px] text-secondary truncate">
                      {conv.last_message_preview || "Ready for next check-in"}
                    </p>
                  </div>
                  <Link to={`/student/mentorship/one-on-one/${conv.id}`}>
                    <Button size="sm" className="text-xs h-8 px-3 gap-1 shadow-xs">
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat</span>
                    </Button>
                  </Link>
                </div>
              ))}

              {pendingRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-3.5 bg-amber-50/50 border border-amber-200 rounded-sm flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <span className="font-semibold text-primary truncate">
                      Request with {req.alumni_name}
                    </span>
                    <p className="text-[11px] text-secondary truncate">{req.topic}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-amber-300 text-amber-700 bg-amber-50 font-mono">
                    Pending
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 4. Secondary Grid: Recommended Alumni & Featured Jobs */}
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
                to="/student/mentorship/one-on-one"
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

                  <Link to="/student/mentorship/one-on-one">
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

        {/* Right Column (Recent Activity & Upcoming Events) */}
        <div className="lg:col-span-4 space-y-6">
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
