import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, X, CheckCircle2 } from "lucide-react";
import { ReportReason } from "../../types/mentorship";
import { useMentorship } from "../../context/mentorshipContext";

interface ReportMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
  messageType: "open_chat" | "private_mentorship";
  messagePreview?: string;
  senderName?: string;
}

export function ReportMessageModal({
  isOpen,
  onClose,
  messageId,
  messageType,
  messagePreview,
  senderName,
}: ReportMessageModalProps) {
  const { reportMessage } = useMentorship();
  const [reason, setReason] = useState<ReportReason>("inappropriate");
  const [details, setDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await reportMessage({
      messageType,
      messageId,
      messagePreview,
      reason,
      details: details.trim(),
    });
    setIsSubmitting(false);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDetails("");
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-surface border border-border rounded-md p-6 shadow-xl space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-sm bg-semantic-error-subtle border border-semantic-error-border text-semantic-error flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-primary">Report Inappropriate Content</h3>
              <p className="text-[11px] text-secondary font-mono">Alumnux Community Moderation</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-sm border border-border hover:bg-[#F8F8F5] text-secondary"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-semantic-success mx-auto" />
            <h4 className="font-bold text-sm text-primary">Report Submitted</h4>
            <p className="text-xs text-secondary leading-relaxed">
              Thank you for keeping Alumnux safe. Our community moderation team has received the report and will review it promptly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {messagePreview && (
              <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-semibold text-secondary uppercase">
                    Reported Message by {senderName || "Member"}
                  </span>
                  <Badge variant="outline" className="text-[9px]">
                    {messageType === "open_chat" ? "Public Open Chat" : "Private Mentorship"}
                  </Badge>
                </div>
                <p className="text-xs text-primary italic line-clamp-3">
                  &ldquo;{messagePreview}&rdquo;
                </p>
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="report-reason" className="block text-xs font-semibold text-primary">
                Select Reason for Report <span className="text-red-500">*</span>
              </label>
              <select
                id="report-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                className="w-full text-xs p-2 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="inappropriate">Inappropriate or Vulgar Content</option>
                <option value="spam">Spam, Advertising or Unsolicited Promotion</option>
                <option value="harassment">Harassment, Insults or Discrimination</option>
                <option value="off_topic">Off-topic or Disruptive Behavior</option>
                <option value="academic_dishonesty">Academic Dishonesty or Interview Leakage</option>
                <option value="other">Other Violation of Community Guidelines</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="report-details" className="block text-xs font-semibold text-primary">
                Additional Context (Optional)
              </label>
              <textarea
                id="report-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explain why this content violates community standards..."
                className="w-full text-xs p-2 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-secondary/60 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={onClose}
                className="text-xs h-8 border-border"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={isSubmitting}
                className="text-xs h-8 bg-semantic-error hover:bg-red-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
