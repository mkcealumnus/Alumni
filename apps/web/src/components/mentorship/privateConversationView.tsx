import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Send,
  Lock,
  AlertTriangle,
  Check,
  CheckCheck,
  XCircle,
  Video,
  Clock,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { PrivateMentorshipConversation } from "../../types/mentorship";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";
import { ReportMessageModal } from "./reportMessageModal";

interface PrivateConversationViewProps {
  conversation: PrivateMentorshipConversation;
  onBack?: () => void;
  isMobile?: boolean;
}

export function PrivateConversationView({
  conversation,
  onBack,
  isMobile: _isMobile = false,
}: PrivateConversationViewProps) {
  const { user } = useAuth();
  const {
    getMessagesForConversation,
    sendPrivateMessage,
    closeMentorship,
  } = useMentorship();

  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [confirmCloseModalOpen, setConfirmCloseModalOpen] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTargetMsgId, setReportTargetMsgId] = useState("");
  const [reportTargetPreview, setReportTargetPreview] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messages = getMessagesForConversation(conversation.id);

  const isStudent = user?.role !== "alumni";
  const partnerName = isStudent ? conversation.alumni_name : conversation.student_name;
  const partnerRole = isStudent
    ? `${conversation.alumni_role_title} @ ${conversation.alumni_company}`
    : `${conversation.student_department} (${conversation.student_graduation_year})`;
  const partnerInitials = isStudent
    ? conversation.alumni_initials
    : conversation.student_initials;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isSending) return;

    const content = inputVal.trim();
    setInputVal("");
    setIsSending(true);

    await sendPrivateMessage({
      conversationId: conversation.id,
      content,
    });

    setIsSending(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCloseMentorship = async () => {
    await closeMentorship(conversation.id);
    setConfirmCloseModalOpen(false);
  };

  const openReport = (msgId: string, preview: string) => {
    setReportTargetMsgId(msgId);
    setReportTargetPreview(preview);
    setReportModalOpen(true);
  };

  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-md shadow-subtle overflow-hidden">
      {/* 1. PARTICIPANT HEADER */}
      <div className="p-4 border-b border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="p-1.5 rounded-sm border border-border hover:bg-[#F8F8F5] text-secondary sm:hidden"
              aria-label="Back to conversations list"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="w-10 h-10 rounded-sm bg-accent/15 text-accent font-bold text-sm flex items-center justify-center shrink-0">
            {partnerInitials}
          </div>

          <div className="overflow-hidden">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-sm text-primary truncate">{partnerName}</h2>
              <Badge
                variant={conversation.status === "active" ? "default" : "outline"}
                className={`text-[9px] py-0 px-1.5 capitalize font-mono ${
                  conversation.status === "active"
                    ? "bg-semantic-success text-white"
                    : "bg-[#F8F8F5] text-secondary"
                }`}
              >
                {conversation.status === "active" ? "Active 1-on-1" : "Concluded"}
              </Badge>
            </div>
            <p className="text-xs text-secondary truncate">{partnerRole}</p>
          </div>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Badge variant="outline" className="text-[10px] font-mono text-secondary hidden md:inline-flex gap-1">
            <Clock className="w-3 h-3 text-accent" />
            <span>{conversation.cadence}</span>
          </Badge>

          {conversation.status === "active" ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open("https://meet.google.com/demo-alumnux-mentorship", "_blank")
                }
                className="text-xs h-7 px-2.5 gap-1 border-border bg-[#F8F8F5]"
              >
                <Video className="w-3 h-3 text-accent" />
                <span className="hidden sm:inline">Launch Meet</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmCloseModalOpen(true)}
                className="text-xs h-7 px-2.5 text-secondary hover:text-red-600 border-border"
              >
                <XCircle className="w-3 h-3 mr-1" />
                <span>End Track</span>
              </Button>
            </>
          ) : (
            <Badge variant="outline" className="text-xs font-mono text-secondary">
              Track Closed
            </Badge>
          )}
        </div>
      </div>

      {/* 2. CONFIDENTIALITY / PRIVACY NOTICE BANNER */}
      <div className="bg-[#FAF9F5] border-b border-border px-4 py-2 flex items-center justify-between text-[11px] text-secondary shrink-0">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-accent shrink-0" />
          <span className="leading-tight">
            <strong>Confidential 1-on-1 Mentorship:</strong> Visible strictly to you and {partnerName}. Protected by participant-level authorization.
          </span>
        </div>
        <button
          type="button"
          onClick={() => openReport(conversation.id, `Private mentorship with ${partnerName}`)}
          className="text-[10px] font-mono text-secondary hover:text-semantic-error underline shrink-0 ml-2"
        >
          Report
        </button>
      </div>

      {/* Topic Pill */}
      <div className="bg-surface px-4 py-2 border-b border-border flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono font-bold text-secondary">
            Mentorship Topic:
          </span>
          <span className="font-semibold text-primary text-xs truncate">
            {conversation.topic}
          </span>
        </div>
        <span className="text-[10px] font-mono text-secondary hidden sm:inline">
          Started {new Date(conversation.created_at).toLocaleDateString()}
        </span>
      </div>

      {/* 3. MESSAGE STREAM */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#F8F8F5]">
        {/* Intro Guidance Card */}
        <div className="max-w-md mx-auto p-3.5 bg-surface border border-border rounded-sm text-center space-y-1.5 shadow-xs">
          <div className="w-7 h-7 rounded-full bg-accent/10 text-accent mx-auto flex items-center justify-center">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <h3 className="font-bold text-xs text-primary">Private Guidance Room Activated</h3>
          <p className="text-[11px] text-secondary leading-relaxed">
            Discuss code reviews, architecture diagrams, interview preparation, and career navigation in full privacy.
          </p>
        </div>

        {/* Messages */}
        {messages.map((msg) => {
          const isCurrentUser =
            msg.sender_id === user?.id ||
            (isStudent && msg.sender_role === "student") ||
            (!isStudent && msg.sender_role === "alumni");

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"} space-y-1`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-secondary font-mono px-1">
                <span className="font-semibold text-primary">
                  {isCurrentUser ? "You" : msg.sender_name}
                </span>
                <span>&bull;</span>
                <span>
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div
                className={`group relative max-w-[85%] sm:max-w-md rounded-md p-3 text-xs leading-relaxed ${
                  isCurrentUser
                    ? "bg-accent text-white shadow-subtle rounded-br-none"
                    : "bg-surface border border-border text-primary shadow-subtle rounded-bl-none"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>

                {/* Floating Report Button */}
                {!isCurrentUser && (
                  <button
                    type="button"
                    onClick={() => openReport(msg.id, msg.content)}
                    className="absolute -top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 bg-surface border border-border rounded-sm shadow-xs text-secondary hover:text-semantic-error"
                    title="Report message"
                    aria-label="Report message"
                  >
                    <AlertTriangle className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Delivery / Read Status */}
              {isCurrentUser && (
                <div className="flex items-center gap-1 text-[10px] text-secondary font-mono pr-1">
                  {msg.status === "read" ? (
                    <span className="flex items-center gap-0.5 text-accent">
                      <CheckCheck className="w-3 h-3" />
                      <span>Read</span>
                    </span>
                  ) : msg.status === "delivered" ? (
                    <span className="flex items-center gap-0.5 text-secondary">
                      <CheckCheck className="w-3 h-3" />
                      <span>Delivered</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-0.5 text-secondary">
                      <Check className="w-3 h-3" />
                      <span>Sent</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. COMPOSER OR CLOSED BANNER */}
      <div className="p-3 sm:p-4 border-t border-border bg-surface shrink-0">
        {conversation.status === "closed" ? (
          <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-center space-y-1">
            <p className="text-xs font-semibold text-primary">
              This 1-on-1 mentorship track was concluded.
            </p>
            <p className="text-[11px] text-secondary">
              Conversation history is archived in read-only mode for reference.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSendMessage} className="space-y-2">
            <div className="flex gap-2">
              <textarea
                rows={2}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={`Send private message to ${partnerName}...`}
                className="flex-1 text-xs p-2.5 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none placeholder:text-secondary/60"
              />
              <Button
                type="submit"
                disabled={!inputVal.trim() || isSending}
                size="sm"
                className="h-auto px-4 self-end text-xs gap-1.5 shadow-subtle"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
            <div className="flex items-center justify-between text-[10px] text-secondary font-mono">
              <span>Press Enter to send, Shift + Enter for new line</span>
              <span className="flex items-center gap-1 text-accent">
                <Sparkles className="w-3 h-3" />
                <span>Simulated Real-time Delivery</span>
              </span>
            </div>
          </form>
        )}
      </div>

      {/* Confirmation Modal to Close Mentorship */}
      {confirmCloseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-surface border border-border rounded-md p-6 max-w-sm w-full space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-semantic-warning">
              <AlertTriangle className="w-5 h-5" />
              <h4 className="font-bold text-sm text-primary">Conclude Mentorship Track?</h4>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Are you sure you want to conclude this 1-on-1 mentorship with <strong>{partnerName}</strong>?
              The conversation history will remain readable, but no further messages may be sent.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setConfirmCloseModalOpen(false)}
                className="text-xs border-border"
              >
                Keep Active
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleCloseMentorship}
                className="text-xs bg-semantic-error hover:bg-red-700 text-white"
              >
                Conclude Mentorship
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      <ReportMessageModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        messageId={reportTargetMsgId}
        messageType="private_mentorship"
        messagePreview={reportTargetPreview}
        senderName={partnerName}
      />
    </div>
  );
}
