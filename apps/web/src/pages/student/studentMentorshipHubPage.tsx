import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  MessageSquare,
  Lock,
  Globe,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";

export default function StudentMentorshipHubPage() {
  const { user } = useAuth();
  const {
    openChatMessages,
    mentorshipRequests,
    conversations,
  } = useMentorship();

  const studentId = user?.id || "student-demo-alex";
  const myRequests = mentorshipRequests.filter((r) => r.student_id === studentId);
  const myConversations = conversations.filter((c) => c.student_id === studentId);

  // Recent open chat messages for preview
  const recentDiscussions = openChatMessages.slice(-3);

  return (
    <div className="space-y-8 pb-12 max-w-6xl mx-auto">
      {/* 1. Header Banner */}
      <div className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Career Mentorship Architecture
            </span>
            <Badge variant="outline" className="text-[10px] bg-[#F8F8F5]">
              Two Interaction Modes
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Mentorship Hub
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Alumnux provides two separate and complementary mentorship channels: a shared community discussion board for public career questions, and confidential 1-on-1 private tracks for focused personalized guidance.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap gap-2.5">
          <Link to="/student/mentorship/open-chat">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <Globe className="w-3.5 h-3.5" />
              <span>Ask the Community</span>
            </Button>
          </Link>
          <Link to="/student/mentorship/one-on-one">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-border bg-[#F8F8F5]"
            >
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>Find 1-on-1 Mentor</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. THE TWO DISTINCT MODES CARDS (Section 1 & 4 Specification) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MODE A: Open Chat Mentorship */}
        <div className="bg-surface border-2 border-border rounded-md p-6 shadow-subtle flex flex-col justify-between space-y-5 relative overflow-hidden">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-sm bg-accent/10 text-accent flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <Badge className="text-[10px] font-mono bg-accent/15 text-accent border-accent/20">
                Public Community
              </Badge>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">Open Chat Mentorship</h2>
              <p className="text-xs font-mono text-accent font-semibold mt-0.5">
                Ask the community. Learn from experience. Grow together.
              </p>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              A shared community career space where students can ask general questions publicly and any verified alumnus can contribute answers. Learn from previous discussions, interview questions, and multi-alumni perspectives.
            </p>

            <div className="p-3 bg-[#F8F8F5] rounded-sm border border-border text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Access Rules:</span>
                <span className="font-semibold text-primary">All verified students &amp; alumni</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Request Required:</span>
                <span className="text-semantic-success font-semibold">No — instant posting</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Visibility:</span>
                <span className="font-semibold text-primary">Community-wide</span>
              </div>
            </div>
          </div>

          <Link to="/student/mentorship/open-chat" className="w-full">
            <Button size="sm" className="w-full text-xs gap-1.5 h-9 shadow-subtle">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Enter Open Chat Mentorship</span>
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
        </div>

        {/* MODE B: 1-on-1 Private Mentorship */}
        <div className="bg-surface border-2 border-border rounded-md p-6 shadow-subtle flex flex-col justify-between space-y-5 relative overflow-hidden">
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-sm bg-accent text-white flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="text-[10px] font-mono border-accent text-accent bg-accent/5">
                Strictly Confidential
              </Badge>
            </div>

            <div>
              <h2 className="text-lg font-bold text-primary">1-on-1 Mentorship</h2>
              <p className="text-xs font-mono text-accent font-semibold mt-0.5">
                Connect with an alumnus who can guide your next step.
              </p>
            </div>

            <p className="text-xs text-secondary leading-relaxed">
              Connect privately with a specific alumnus of your choice. Submit an introductory mentorship request for in-depth code architecture reviews, resume critiques, and personalized career roadmaps.
            </p>

            <div className="p-3 bg-[#F8F8F5] rounded-sm border border-border text-xs space-y-1.5 font-mono">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Access Rules:</span>
                <span className="font-semibold text-primary">Student &amp; Selected Alumnus Only</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Request Required:</span>
                <span className="font-semibold text-accent">Yes — Alumni approval needed</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-secondary">Visibility:</span>
                <span className="font-semibold text-semantic-success">Strictly Private</span>
              </div>
            </div>
          </div>

          <Link to="/student/mentorship/one-on-one" className="w-full">
            <Button size="sm" variant="outline" className="w-full text-xs gap-1.5 h-9 border-border bg-[#F8F8F5] shadow-subtle">
              <GraduationCap className="w-3.5 h-3.5 text-accent" />
              <span>Browse Mentors &amp; Requests</span>
              <ArrowRight className="w-3 h-3 ml-auto text-secondary" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 3. DIFFERENCE MATRIX TABLE (Section 4 Specification) */}
      <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-primary flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-accent" />
              <span>Difference Between the Two Mentorship Modes</span>
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Clear distinction in permissions, visibility, and workflow as specified by Alumnux architecture.
            </p>
          </div>
          <Badge variant="outline" className="text-[10px] font-mono">
            Platform Protocol
          </Badge>
        </div>

        <div className="overflow-x-auto border border-border rounded-sm">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F8F5] border-b border-border text-[11px] font-mono text-secondary">
                <th className="p-3 font-semibold">Capability</th>
                <th className="p-3 font-semibold text-primary">Open Chat Mentorship</th>
                <th className="p-3 font-semibold text-accent">1-on-1 Private Mentorship</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border font-sans">
              <tr>
                <td className="p-3 font-medium text-secondary">Conversation Type</td>
                <td className="p-3 text-primary">Shared community chat</td>
                <td className="p-3 text-primary font-semibold">Individual private conversation</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-secondary">Who starts it?</td>
                <td className="p-3 text-primary">Any eligible participant posts</td>
                <td className="p-3 text-primary">Student selects a verified alumnus</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-secondary">Who can respond?</td>
                <td className="p-3 text-primary">Any eligible alumni and students</td>
                <td className="p-3 text-primary font-semibold">Only the two authorized participants</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-secondary">Visibility</td>
                <td className="p-3 text-primary">All authorized community members</td>
                <td className="p-3 text-primary font-semibold">Student and selected alumnus only</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-secondary">Mentorship request required</td>
                <td className="p-3 text-secondary">No</td>
                <td className="p-3 text-accent font-semibold">Yes</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-secondary">Alumni acceptance required</td>
                <td className="p-3 text-secondary">No</td>
                <td className="p-3 text-accent font-semibold">Yes, before chat activation</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-secondary">Main purpose</td>
                <td className="p-3 text-primary">General career questions &amp; shared learning</td>
                <td className="p-3 text-primary">Personalized guidance &amp; code teardowns</td>
              </tr>
              <tr>
                <td className="p-3 font-medium text-secondary">Access Control</td>
                <td className="p-3 text-primary">Verified community membership</td>
                <td className="p-3 text-primary font-semibold">Participant-level Row Level Security (RLS)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. PREVIEWS: Recent Open Chat & Active Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Open Chat Snippets */}
        <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-bold text-xs text-primary uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>Recent Community Discussions</span>
            </h3>
            <Link
              to="/student/mentorship/open-chat"
              className="text-[11px] font-mono text-accent hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {recentDiscussions.map((msg) => (
              <div
                key={msg.id}
                className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary">{msg.sender_name}</span>
                    <Badge variant="outline" className="text-[9px] py-0 px-1 font-mono">
                      {msg.sender_role === "alumni" ? "Alumni" : "Student"}
                    </Badge>
                  </div>
                  <span className="text-[10px] font-mono text-secondary">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-secondary line-clamp-2 leading-relaxed">
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Active 1-on-1 Requests & Tracks */}
        <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h3 className="font-bold text-xs text-primary uppercase font-mono tracking-wider flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>My 1-on-1 Mentorship Tracks</span>
            </h3>
            <Link
              to="/student/mentorship/one-on-one"
              className="text-[11px] font-mono text-accent hover:underline flex items-center gap-1"
            >
              <span>Manage</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {myConversations.length === 0 && myRequests.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <GraduationCap className="w-8 h-8 text-secondary mx-auto" />
              <p className="text-xs text-secondary">You haven&apos;t requested a 1-on-1 mentor yet.</p>
              <Link to="/student/mentorship/one-on-one">
                <Button size="sm" variant="outline" className="text-xs border-border">
                  Find a Mentor
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {myConversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-xs flex items-center justify-between gap-3"
                >
                  <div className="overflow-hidden space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary truncate">
                        {conv.alumni_name}
                      </span>
                      <Badge className="text-[9px] bg-semantic-success text-white py-0 px-1 font-mono">
                        Active
                      </Badge>
                    </div>
                    <p className="text-[11px] text-accent truncate">{conv.topic}</p>
                  </div>
                  <Link to={`/student/mentorship/one-on-one/${conv.id}`}>
                    <Button size="sm" className="text-xs h-7 px-2.5 gap-1 shadow-xs">
                      <MessageSquare className="w-3 h-3" />
                      <span>Chat</span>
                    </Button>
                  </Link>
                </div>
              ))}

              {myRequests.filter((r) => r.status === "pending").map((req) => (
                <div
                  key={req.id}
                  className="p-3 bg-[#FAF8F0] border border-amber-200 rounded-sm text-xs flex items-center justify-between gap-3"
                >
                  <div className="overflow-hidden space-y-0.5">
                    <span className="font-semibold text-primary truncate">
                      Request with {req.alumni_name}
                    </span>
                    <p className="text-[11px] text-secondary truncate">{req.topic}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] border-amber-400 text-amber-700 bg-amber-50">
                    Pending
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
