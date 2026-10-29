import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  X,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";

interface RequestMentorshipModalProps {
  isOpen: boolean;
  onClose: () => void;
  alumnus: {
    id: string;
    full_name: string;
    current_role?: string;
    current_company?: string;
    department_name?: string;
    skills?: string[];
  } | null;
  onSuccess?: (requestId: string) => void;
}

const TOPIC_SUGGESTIONS = [
  "System Design & Distributed Queues",
  "Resume Review & Off-Campus Referral Strategy",
  "Technical Coding Interview Prep (DSA & Algorithms)",
  "Transitioning into Cloud Infrastructure / SRE",
  "Core Electronics & Embedded Firmware Engineering",
  "General Career Guidance & Tech Transition",
];

const CADENCE_OPTIONS = [
  "Bi-weekly 45-min Zoom calls",
  "Monthly Check-in & Milestone Review",
  "One-off Resume & Project Deep Dive",
  "Asynchronous Written Feedback & Guidance",
];

export function RequestMentorshipModal({
  isOpen,
  onClose,
  alumnus,
  onSuccess,
}: RequestMentorshipModalProps) {
  const { createMentorshipRequest } = useMentorship();
  const [topic, setTopic] = useState(TOPIC_SUGGESTIONS[0]);
  const [customTopic, setCustomTopic] = useState("");
  const [isCustomTopic, setIsCustomTopic] = useState(false);
  const [preferredCadence, setPreferredCadence] = useState(CADENCE_OPTIONS[0]);
  const [introductoryMessage, setIntroductoryMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !alumnus) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const finalTopic = isCustomTopic ? customTopic.trim() : topic;
    if (!finalTopic) {
      setErrorMessage("Please specify a mentorship topic.");
      return;
    }

    if (introductoryMessage.trim().length < 15) {
      setErrorMessage(
        "Please provide a meaningful introductory note (minimum 15 characters) so your mentor understands your goals."
      );
      return;
    }

    setIsSubmitting(true);
    const result = await createMentorshipRequest({
      alumniId: alumnus.id,
      alumniName: alumnus.full_name,
      alumniRoleTitle: alumnus.current_role || "Alumni Mentor",
      alumniCompany: alumnus.current_company || "Alumnux Network",
      alumniInitials: alumnus.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
      topic: finalTopic,
      introductoryMessage: introductoryMessage.trim(),
      preferredCadence,
    });
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || "Failed to submit request.");
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIntroductoryMessage("");
      setErrorMessage(null);
      onClose();
      if (result.request && onSuccess) {
        onSuccess(result.request.id);
      }
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-surface border border-border rounded-md p-6 shadow-xl space-y-4 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base text-primary">Request 1-on-1 Mentorship</h2>
              <p className="text-[11px] text-secondary font-mono">
                Connect directly with verified alumnus
              </p>
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

        {/* Selected Alumnus Card Preview */}
        <div className="p-3.5 bg-[#F8F8F5] border border-border rounded-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-accent/15 text-accent font-bold text-sm flex items-center justify-center">
              {alumnus.full_name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-primary">{alumnus.full_name}</span>
                <Badge variant="outline" className="text-[9px] bg-white text-accent border-accent/30">
                  Verified Alumni
                </Badge>
              </div>
              <p className="text-xs text-secondary">
                {alumnus.current_role} {alumnus.current_company && `@ ${alumnus.current_company}`}
              </p>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-semantic-success mx-auto" />
            <h3 className="font-bold text-base text-primary">Mentorship Request Dispatched</h3>
            <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
              Your introductory note and mentorship request have been sent to <strong>{alumnus.full_name}</strong>.
              You will be notified as soon as they review and respond!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-semantic-error-subtle border border-semantic-error-border rounded-sm text-xs text-semantic-error flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Topic Selection */}
            <div className="space-y-1.5">
              <label htmlFor="topic-select" className="block text-xs font-semibold text-primary">
                Mentorship Focus Topic <span className="text-red-500">*</span>
              </label>
              {!isCustomTopic ? (
                <div className="space-y-1.5">
                  <select
                    id="topic-select"
                    value={topic}
                    onChange={(e) => {
                      if (e.target.value === "custom") {
                        setIsCustomTopic(true);
                      } else {
                        setTopic(e.target.value);
                      }
                    }}
                    className="w-full text-xs p-2.5 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    {TOPIC_SUGGESTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                    <option value="custom">+ Specify Custom Topic</option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="E.g. Rust Microservices & Concurrency..."
                    className="flex-1 text-xs p-2.5 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCustomTopic(false)}
                    className="text-xs border-border"
                  >
                    Preset List
                  </Button>
                </div>
              )}
            </div>

            {/* Preferred Cadence */}
            <div className="space-y-1.5">
              <label htmlFor="cadence-select" className="block text-xs font-semibold text-primary flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>Preferred Cadence</span>
              </label>
              <select
                id="cadence-select"
                value={preferredCadence}
                onChange={(e) => setPreferredCadence(e.target.value)}
                className="w-full text-xs p-2.5 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {CADENCE_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Introductory Message */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="introductory-message" className="block text-xs font-semibold text-primary">
                  Introductory Note &amp; Learning Objectives <span className="text-red-500">*</span>
                </label>
                <span className="text-[10px] text-secondary font-mono">
                  {introductoryMessage.length} chars
                </span>
              </div>
              <textarea
                id="introductory-message"
                rows={4}
                value={introductoryMessage}
                onChange={(e) => setIntroductoryMessage(e.target.value)}
                placeholder="Introduce yourself, describe your current projects, and specify exactly what guidance you need from this mentor..."
                className="w-full text-xs p-2.5 bg-surface border border-border rounded-sm focus:outline-none focus:ring-1 focus:ring-accent placeholder:text-secondary/60 resize-none leading-relaxed"
              />
              <p className="text-[11px] text-secondary flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-accent" />
                <span>Tip: High-signal requests outlining specific challenges have a 95% acceptance rate.</span>
              </p>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 flex items-center justify-between border-t border-border">
              <span className="text-[11px] text-secondary font-mono">
                Confidential 1-on-1 Request
              </span>
              <div className="flex items-center gap-2">
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
                  className="text-xs h-8 gap-1.5 shadow-subtle"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? "Sending Request..." : "Send Mentorship Request"}</span>
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
