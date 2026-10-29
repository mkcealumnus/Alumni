import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  MessageSquare,
  Search,
  Reply,
  AlertTriangle,
  Send,
  ShieldCheck,
  X,
  Globe,
  Lock,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";
import { OpenChatMessage } from "../../types/mentorship";
import { ReportMessageModal } from "../../components/mentorship/reportMessageModal";

const CATEGORIES = [
  "All Discussions",
  "Interview Prep",
  "System Design",
  "Career Strategy",
  "Career Transition",
  "Unanswered Questions",
];

export default function OpenChatMentorshipPage() {
  const { user } = useAuth();
  const {
    openChatMessages,
    sendOpenChatMessage,
  } = useMentorship();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Discussions");
  const [replyTarget, setReplyTarget] = useState<OpenChatMessage | null>(null);
  const [inputVal, setInputVal] = useState("");
  const [selectedTag, setSelectedTag] = useState("Interview Prep");
  const [isSending, setIsSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  // Report modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportMessageId, setReportMessageId] = useState("");
  const [reportPreview, setReportPreview] = useState("");
  const [reportSender, setReportSender] = useState("");

  const composerTextareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter messages
  const filteredMessages = useMemo(() => {
    return openChatMessages.filter((msg) => {
      if (msg.moderation_status === "removed") return false;

      // Filter by category
      if (selectedCategory === "Unanswered Questions") {
        if (msg.sender_role !== "student") return false;
        const hasReply = openChatMessages.some(
          (m) => m.reply_to_message_id === msg.id
        );
        if (hasReply) return false;
      } else if (selectedCategory !== "All Discussions") {
        if (msg.category_tag !== selectedCategory) return false;
      }

      // Search term
      if (search.trim()) {
        const query = search.toLowerCase();
        const matchesContent = msg.content.toLowerCase().includes(query);
        const matchesSender = msg.sender_name.toLowerCase().includes(query);
        const matchesBadge = msg.sender_badge?.toLowerCase().includes(query);
        return matchesContent || matchesSender || matchesBadge;
      }

      return true;
    });
  }, [openChatMessages, selectedCategory, search]);

  const handleReplyClick = (msg: OpenChatMessage) => {
    setReplyTarget(msg);
    composerTextareaRef.current?.focus();
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim() || isSending) return;

    setSendError(null);
    setIsSending(true);

    const result = await sendOpenChatMessage({
      content: inputVal.trim(),
      categoryTag: selectedTag,
      replyToMessageId: replyTarget ? replyTarget.id : null,
    });

    setIsSending(false);

    if (result.success) {
      setInputVal("");
      setReplyTarget(null);
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      setSendError(result.error || "Failed to post message.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const openReport = (msg: OpenChatMessage) => {
    setReportMessageId(msg.id);
    setReportPreview(msg.content);
    setReportSender(msg.sender_name);
    setReportModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* 1. PAGE HEADER (Section 2 UI Spec) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-1.5 py-0.5 bg-accent/10 rounded-xs">
              Shared Career Guidance Space
            </span>
            <Badge variant="outline" className="text-[9px] bg-white font-mono">
              Public Discussion
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Open Chat Mentorship
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Ask the community. Learn from experience. Grow together.
          </p>
        </div>

        {/* Quick link to 1-on-1 Mode */}
        <div className="flex items-center gap-2">
          <Link
            to={
              user?.role === "alumni"
                ? "/alumni/mentorship/requests"
                : "/student/mentorship/one-on-one"
            }
          >
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-border bg-surface shadow-subtle hover:bg-[#F8F8F5]"
            >
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>Switch to 1-on-1 Mentorship</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. PUBLIC NOTICE BANNER (Section 2 & 8 Access Rules) */}
      <div className="p-4 bg-surface border-l-4 border-l-accent border-y border-r border-border rounded-r-md shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-sm bg-accent/10 text-accent flex items-center justify-center shrink-0 mt-0.5">
            <Globe className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <p className="font-semibold text-primary">
              Public Community Guidance Board
            </p>
            <p className="text-secondary text-[11px] leading-relaxed">
              Every authorized student and verified alumnus can view and contribute to these career discussions.
              For private resume evaluations or confidential questions, please use{" "}
              <Link
                to={
                  user?.role === "alumni"
                    ? "/alumni/mentorship/requests"
                    : "/student/mentorship/one-on-one"
                }
                className="text-accent underline font-medium"
              >
                1-on-1 Mentorship
              </Link>.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0 font-mono text-[11px] text-secondary">
          <span className="w-2 h-2 rounded-full bg-semantic-success animate-pulse" />
          <span>Active Community</span>
        </div>
      </div>

      {/* 3. CONTROLS: SEARCH & CATEGORY CHIPS */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-colors border ${
                  active
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-surface text-secondary border-border hover:bg-[#F2F2EC] hover:text-primary"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <Search className="w-3.5 h-3.5 text-secondary absolute left-2.5 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions or advice..."
            className="pl-8 text-xs h-9 bg-surface border-border"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4. MAIN CONVERSATION PANEL */}
      <div className="bg-surface border border-border rounded-md shadow-subtle flex flex-col min-h-[500px] max-h-[750px]">
        {/* History Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5 bg-[#FAF9F5]">
          {filteredMessages.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#EFEFED] text-secondary flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-sm text-primary">No community messages found</h3>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                {search
                  ? `No discussions matching "${search}". Try searching for another topic or clear the search query.`
                  : "Be the first to post a career question to the alumni network below!"}
              </p>
              {search && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearch("")}
                  className="text-xs border-border"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isAlumni = msg.sender_role === "alumni";

              return (
                <div
                  key={msg.id}
                  className={`group rounded-md border p-4 sm:p-5 transition-all shadow-subtle ${
                    isAlumni
                      ? "bg-white border-l-4 border-l-accent border-border"
                      : "bg-[#FFFFFF] border-l-4 border-l-[#A3A39E] border-border"
                  }`}
                >
                  {/* Quoted Message / Threaded Reply Reference */}
                  {msg.reply_to_preview && (
                    <div className="mb-3 p-2.5 bg-[#F8F8F5] border-l-2 border-l-accent/50 rounded-xs text-[11px] text-secondary space-y-0.5">
                      <div className="flex items-center gap-1 font-semibold text-primary">
                        <Reply className="w-3 h-3 text-accent rotate-180" />
                        <span>In reply to {msg.reply_to_preview.sender_name}</span>
                        <span className="text-[10px] text-secondary font-mono capitalize">
                          ({msg.reply_to_preview.sender_role})
                        </span>
                      </div>
                      <p className="italic line-clamp-2 pl-4">
                        &ldquo;{msg.reply_to_preview.content}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Sender Header */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      {/* Avatar / Initials */}
                      <div
                        className={`w-9 h-9 rounded-sm font-bold text-xs flex items-center justify-center shrink-0 ${
                          isAlumni
                            ? "bg-accent text-white shadow-xs"
                            : "bg-[#EAEAE5] text-primary"
                        }`}
                      >
                        {msg.sender_initials}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-primary">
                            {msg.sender_name}
                          </span>

                          {/* Role Badge Distinction (Section 2 UI Spec) */}
                          {isAlumni ? (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-accent/10 text-accent border-accent/30 font-semibold gap-1 py-0 px-2"
                            >
                              <ShieldCheck className="w-3 h-3" />
                              <span>Alumni Mentor</span>
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-[10px] bg-[#F2F2EC] text-secondary border-border py-0 px-2 font-mono"
                            >
                              Student
                            </Badge>
                          )}

                          {msg.category_tag && (
                            <span className="text-[10px] font-mono text-secondary px-1.5 py-0.5 bg-[#F8F8F5] border border-border rounded-xs hidden sm:inline">
                              {msg.category_tag}
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-secondary font-mono mt-0.5">
                          {msg.sender_badge || (isAlumni ? "Alumni Mentor" : "Student Member")}
                        </p>
                      </div>
                    </div>

                    {/* Timestamp & Message Actions */}
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono text-secondary">
                        {new Date(msg.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>

                      {/* Reply Action */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReplyClick(msg)}
                        className="h-7 px-2 text-xs text-secondary hover:text-accent gap-1"
                        title="Reply to this message"
                      >
                        <Reply className="w-3 h-3" />
                        <span className="hidden sm:inline">Reply</span>
                      </Button>

                      {/* Report Action */}
                      <button
                        type="button"
                        onClick={() => openReport(msg)}
                        className="p-1 text-secondary/70 hover:text-semantic-error rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Report inappropriate content"
                        aria-label="Report message"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="text-xs sm:text-sm text-primary leading-relaxed whitespace-pre-wrap pl-12">
                    {msg.content}
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 5. BOTTOM COMPOSER (Fixed at Bottom with Reply Banner) */}
        <div className="border-t border-border bg-surface p-4 shrink-0 space-y-3">
          {/* Active Reply Tag */}
          {replyTarget && (
            <div className="flex items-center justify-between p-2.5 bg-[#F8F8F5] border border-border rounded-sm text-xs">
              <div className="flex items-center gap-2 overflow-hidden">
                <Reply className="w-3.5 h-3.5 text-accent shrink-0 rotate-180" />
                <span className="text-secondary font-medium">Replying to:</span>
                <span className="font-bold text-primary truncate">
                  {replyTarget.sender_name}
                </span>
                <span className="text-[11px] text-secondary italic truncate max-w-xs">
                  &ldquo;{replyTarget.content}&rdquo;
                </span>
              </div>
              <button
                type="button"
                onClick={() => setReplyTarget(null)}
                className="p-1 text-secondary hover:text-primary rounded-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {sendError && (
            <div className="p-2 bg-semantic-error-subtle border border-semantic-error-border rounded-sm text-xs text-semantic-error">
              {sendError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSendMessage} className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <textarea
                ref={composerTextareaRef}
                rows={2}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  replyTarget
                    ? `Write your reply to ${replyTarget.sender_name}...`
                    : user?.role === "alumni"
                    ? "Share advice or respond to a student's career question..."
                    : "Ask the alumni community a question regarding interviews, skills, or career guidance..."
                }
                className="flex-1 text-xs sm:text-sm p-3 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent resize-none placeholder:text-secondary/60 leading-relaxed"
              />

              <div className="flex sm:flex-col justify-between sm:justify-end gap-2">
                {/* Topic Selector for new top-level questions */}
                {!replyTarget && (
                  <select
                    value={selectedTag}
                    onChange={(e) => setSelectedTag(e.target.value)}
                    className="text-[11px] p-1.5 bg-surface border border-border rounded-sm focus:outline-none text-secondary"
                  >
                    <option value="Interview Prep">Interview Prep</option>
                    <option value="System Design">System Design</option>
                    <option value="Career Strategy">Career Strategy</option>
                    <option value="Career Transition">Career Transition</option>
                    <option value="General">General Question</option>
                  </select>
                )}

                <Button
                  type="submit"
                  disabled={!inputVal.trim() || isSending}
                  size="sm"
                  className="text-xs h-9 sm:h-auto sm:py-2.5 px-4 gap-1.5 shadow-subtle shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSending ? "Posting..." : replyTarget ? "Post Reply" : "Post Question"}</span>
                </Button>
              </div>
            </div>

            {/* Keyboard Hints & Mode Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-secondary font-mono gap-1">
              <span>Press Enter to send, Shift + Enter for new line</span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-3 h-3 text-accent" />
                <span>Posting as: <strong>{user?.fullName || "Alex Rivera"}</strong> ({user?.role === "alumni" ? "Alumni Mentor" : "Student"})</span>
              </span>
            </div>
          </form>
        </div>
      </div>

      {/* Report Modal */}
      <ReportMessageModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        messageId={reportMessageId}
        messageType="open_chat"
        messagePreview={reportPreview}
        senderName={reportSender}
      />
    </div>
  );
}
