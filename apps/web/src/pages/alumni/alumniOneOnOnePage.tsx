import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Lock,
  Users,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";
import { PrivateConversationView } from "../../components/mentorship/privateConversationView";

export default function AlumniOneOnOnePage() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { conversations, getConversationById } = useMentorship();

  const alumniId = user?.id || "alumni-demo-jordan";
  const myConversations = conversations.filter(
    (c) =>
      c.alumni_id === alumniId ||
      c.alumni_name.toLowerCase().includes(user?.fullName?.toLowerCase() || "jordan")
  );

  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    conversationId || (myConversations.length > 0 ? myConversations[0].id : null)
  );

  useEffect(() => {
    if (conversationId) {
      setSelectedConvId(conversationId);
    }
  }, [conversationId]);

  const activeConversation = selectedConvId ? getConversationById(selectedConvId) : null;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-1.5 py-0.5 bg-accent/10 rounded-xs">
              Private Guidance Workspace
            </span>
            <Badge variant="outline" className="text-[9px] bg-white font-mono flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-accent" />
              <span>1-on-1 Confidential</span>
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Mentee Private Conversation
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            1-on-1 career guidance, technical code teardowns, and interview mentorship.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/alumni/mentorship/active">
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border bg-surface shadow-subtle hover:bg-[#F8F8F5] gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>All Active Mentees</span>
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

      {/* 2. Dual Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
        {/* Left: Active Mentees List (4 cols) */}
        <div className="lg:col-span-4 bg-surface border border-border rounded-md shadow-subtle p-3 flex flex-col space-y-3">
          <div className="p-2 border-b border-border flex items-center justify-between">
            <span className="font-bold text-xs text-primary uppercase font-mono tracking-wider">
              Active Mentees ({myConversations.length})
            </span>
            <Badge variant="outline" className="text-[10px] font-mono">
              Alumni View
            </Badge>
          </div>

          {myConversations.length === 0 ? (
            <div className="py-12 text-center space-y-2 p-4">
              <Lock className="w-8 h-8 text-secondary mx-auto" />
              <p className="text-xs font-semibold text-primary">No active conversations</p>
              <p className="text-[11px] text-secondary">
                Accept pending student mentorship requests to start private guidance.
              </p>
            </div>
          ) : (
            <div className="space-y-1.5 overflow-y-auto flex-1">
              {myConversations.map((conv) => {
                const isSelected = conv.id === selectedConvId;
                return (
                  <button
                    key={conv.id}
                    type="button"
                    onClick={() => {
                      setSelectedConvId(conv.id);
                      navigate(`/alumni/mentorship/one-on-one/${conv.id}`);
                    }}
                    className={`w-full text-left p-3 rounded-sm border transition-colors flex items-start gap-3 ${
                      isSelected
                        ? "bg-accent/10 border-accent text-primary shadow-xs"
                        : "bg-surface border-border hover:bg-[#F8F8F5] text-secondary"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-sm bg-accent/20 text-accent font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {conv.student_initials}
                    </div>
                    <div className="overflow-hidden flex-1 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-primary truncate">
                          {conv.student_name}
                        </span>
                        <span className="text-[10px] font-mono text-secondary shrink-0">
                          {new Date(conv.last_message_at).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-[11px] text-accent font-medium truncate">
                        {conv.topic}
                      </p>
                      <p className="text-[11px] text-secondary truncate">
                        {conv.last_message_preview || "Active conversation"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Private Chat Stream (8 cols) */}
        <div className="lg:col-span-8 min-h-[500px]">
          {activeConversation ? (
            <PrivateConversationView conversation={activeConversation} />
          ) : (
            <div className="h-full bg-surface border border-border rounded-md p-12 flex flex-col items-center justify-center text-center space-y-3">
              <Lock className="w-10 h-10 text-secondary" />
              <h3 className="font-bold text-sm text-primary">Select a Mentee</h3>
              <p className="text-xs text-secondary max-w-sm">
                Choose an active mentee conversation from the left to exchange private messages.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
