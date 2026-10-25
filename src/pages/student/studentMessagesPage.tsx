import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Lock, Globe, Users, ArrowUpRight } from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";
import { PrivateConversationView } from "../../components/mentorship/privateConversationView";

export default function StudentMessagesPage() {
  const { user } = useAuth();
  const { conversations, getConversationById } = useMentorship();

  const studentId = user?.id || "student-demo-alex";
  const myConversations = useMemo(() => {
    return conversations.filter(
      (c) =>
        c.student_id === studentId ||
        c.student_name.toLowerCase().includes(user?.fullName?.toLowerCase() || "alex")
    );
  }, [conversations, studentId, user?.fullName]);

  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    myConversations.length > 0 ? myConversations[0].id : null
  );

  const activeConversation = selectedConvId
    ? getConversationById(selectedConvId)
    : myConversations.length > 0
    ? myConversations[0]
    : null;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-1.5 py-0.5 bg-accent/10 rounded-xs">
              Private Mentorship Channel
            </span>
            <Badge variant="outline" className="text-[9px] bg-white font-mono flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-accent" />
              <span>Participant-Authorized</span>
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Mentorship Direct Messages
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Confidential 1-on-1 communications with your verified alumni mentors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/student/mentorship/one-on-one">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border bg-surface shadow-subtle hover:bg-[#F8F8F5] gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>Find Mentors</span>
            </Button>
          </Link>
          <Link to="/student/mentorship/open-chat">
            <Button size="sm" className="text-xs gap-1.5 shadow-subtle">
              <Globe className="w-3.5 h-3.5" />
              <span>Open Chat</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Messages Interface */}
      {myConversations.length === 0 ? (
        <div className="bg-surface border border-border rounded-md shadow-subtle p-8 sm:p-12 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-base text-primary">No Active Mentorship Messages</h3>
            <p className="text-xs text-secondary leading-relaxed">
              You do not have any active 1-on-1 mentorship tracks yet. Request mentorship with verified alumni or join public questions in Open Chat.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/student/mentorship/one-on-one" className="w-full sm:w-auto">
              <Button size="sm" className="w-full text-xs gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Browse Alumni Directory</span>
              </Button>
            </Link>
            <Link to="/student/mentorship/open-chat" className="w-full sm:w-auto">
              <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 border-border">
                <Globe className="w-3.5 h-3.5" />
                <span>Open Community Chat</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          {/* Left: Active Mentors Sidebar (4 cols) */}
          <div className="lg:col-span-4 bg-surface border border-border rounded-md shadow-subtle p-3 flex flex-col space-y-3">
            <div className="p-2 border-b border-border flex items-center justify-between">
              <span className="font-bold text-xs text-primary uppercase font-mono tracking-wider">
                Active Mentor Threads ({myConversations.length})
              </span>
              <Badge variant="outline" className="text-[10px] font-mono">
                Student View
              </Badge>
            </div>

            <div className="space-y-1.5 overflow-y-auto flex-1">
              {myConversations.map((conv) => {
                const isSelected = (activeConversation?.id || selectedConvId) === conv.id;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => setSelectedConvId(conv.id)}
                    className={`w-full text-left p-3 rounded-sm border transition-colors flex items-start gap-3 ${
                      isSelected
                        ? "bg-accent/10 border-accent text-primary shadow-xs"
                        : "bg-surface border-border hover:bg-[#F8F8F5] text-secondary"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {conv.alumni_initials}
                    </div>
                    <div className="overflow-hidden flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-primary truncate">
                          {conv.alumni_name}
                        </span>
                        <span className="text-[10px] font-mono text-secondary shrink-0">
                          {new Date(conv.last_message_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-[11px] text-accent font-medium truncate">
                        {conv.alumni_role_title} @ {conv.alumni_company}
                      </p>
                      <p className="text-[11px] text-secondary truncate">
                        {conv.last_message_preview || "Active conversation"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Link to 1-on-1 Page */}
            <div className="pt-2 border-t border-border">
              <Link
                to="/student/mentorship/one-on-one"
                className="flex items-center justify-between p-2 text-xs text-secondary hover:text-accent font-mono hover:bg-[#F8F8F5] rounded-xs"
              >
                <span>Full Mentorship Hub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right: Message Stream Area (8 cols) */}
          <div className="lg:col-span-8 min-h-[500px]">
            {activeConversation ? (
              <PrivateConversationView conversation={activeConversation} />
            ) : (
              <div className="h-full bg-surface border border-border rounded-md p-12 flex flex-col items-center justify-center text-center space-y-3">
                <Lock className="w-10 h-10 text-secondary" />
                <h3 className="font-bold text-sm text-primary">Select a Conversation</h3>
                <p className="text-xs text-secondary max-w-sm">
                  Select an active mentor thread on the left to review private messages.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

