import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid academic or professional email."),
  category: z.enum([
    "general",
    "technical_support",
    "partnership",
    "feedback",
  ], {
    errorMap: () => ({ message: "Please select an inquiry category." }),
  }),
  subject: z.string().min(4, "Subject must be at least 4 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      category: "general",
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate brief network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSubmitting(false);
    setSubmittedData(data);
    reset();
  };

  const faqs = [
    {
      q: "Who operates and administers Alumnux?",
      a: "Alumnux is independently developed and managed by exactly three designated senior alumni trustees. College management and faculty have no operational involvement or administrative access.",
    },
    {
      q: "Is there any fee or subscription required to use Alumnux?",
      a: "No. Alumnux is built as a pro-bono career service to empower students and connect verified alumni without any fees, paywalls, or premium tiers.",
    },
    {
      q: "How does the demo authentication system work?",
      a: "For this frontend milestone release, Alumnux provides isolated client-side demo accounts for both Student and Alumni roles with pre-seeded data. No external database or credentials are required.",
    },
    {
      q: "How will alumni identity be verified in production?",
      a: "In future phases, verified alumni badges will be issued after zero-trust inspection of degree records or verified institutional email addresses in strict compliance with the DPDP Act 2023.",
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-20 pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-border bg-surface text-xs font-mono text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>CONTACT &amp; FEEDBACK</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
          Get in touch with the Alumnux initiative.
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed">
          Have an inquiry, technical feedback, or ideas on enhancing alumni mentorship? Reach out directly through the inquiry form below.
        </p>
      </section>

      {/* Main Grid: Contact Form (Left) & FAQs/Notice (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Form Column */}
        <div className="lg:col-span-7 bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle space-y-6">
          <div className="space-y-1 pb-4 border-b border-border">
            <h2 className="text-lg font-bold text-primary">Submit an Inquiry</h2>
            <p className="text-xs text-secondary">
              Fill out the details below. Form submissions are verified client-side via React Hook Form and Zod.
            </p>
          </div>

          {/* Success Notification */}
          {submittedData && (
            <div className="p-4 rounded-md border border-emerald-300 bg-emerald-50 text-emerald-950 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-xs text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Inquiry Received (Demo Simulation)</span>
              </div>
              <p className="text-xs leading-relaxed">
                Thank you, <strong className="font-semibold">{submittedData.name}</strong>. Your message regarding &ldquo;{submittedData.subject}&rdquo; has been validated. In production, this directly routes to the senior trustees via transactional email.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="text-[11px] underline font-mono text-emerald-800 hover:text-emerald-950 pt-1"
              >
                Send another message
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-primary">
                Inquiry Category <span className="text-accent">*</span>
              </label>
              <select
                {...register("category")}
                className="w-full h-10 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <option value="general">General Inquiry</option>
                <option value="technical_support">Technical Support &amp; Bugs</option>
                <option value="partnership">Partnership &amp; Alumni Initiative</option>
                <option value="feedback">Product Feedback &amp; Suggestions</option>
              </select>
              {errors.category && (
                <p className="text-[11px] text-red-600">{errors.category.message}</p>
              )}
            </div>

            {/* Name & Email in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-primary">
                  Full Name <span className="text-accent">*</span>
                </label>
                <Input
                  {...register("name")}
                  placeholder="e.g. Alex Rivera"
                  className="h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                />
                {errors.name && (
                  <p className="text-[11px] text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-primary">
                  Email Address <span className="text-accent">*</span>
                </label>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="you@domain.com"
                  className="h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                />
                {errors.email && (
                  <p className="text-[11px] text-red-600">{errors.email.message}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-primary">
                Subject <span className="text-accent">*</span>
              </label>
              <Input
                {...register("subject")}
                placeholder="Brief summary of your inquiry..."
                className="h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
              />
              {errors.subject && (
                <p className="text-[11px] text-red-600">{errors.subject.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-primary">
                Detailed Message <span className="text-accent">*</span>
              </label>
              <textarea
                {...register("message")}
                rows={4}
                placeholder="Share your questions, feedback, or thoughts here..."
                className="w-full rounded-sm border border-border bg-[#F8F8F5] p-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent resize-y"
              />
              {errors.message && (
                <p className="text-[11px] text-red-600">{errors.message.message}</p>
              )}
            </div>

            {/* Demo Notice */}
            <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-[11px] text-secondary flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>
                Note: Form submissions in this release are demo-only until production backend or transactional email integration is provisioned.
              </span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto h-10 px-6 gap-2 text-xs font-semibold"
            >
              {isSubmitting ? (
                <span>Validating &amp; Submitting...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry</span>
                </>
              )}
            </Button>
          </form>
        </div>

        {/* FAQs & Contact Guidelines Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* FAQ Accordion */}
          <div className="bg-surface border border-border rounded-md p-6 shadow-subtle space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <HelpCircle className="w-4 h-4 text-accent" />
              <h2 className="text-sm font-bold text-primary">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-border rounded-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3 text-left text-xs font-medium text-primary bg-[#F8F8F5] flex items-center justify-between gap-2 hover:bg-[#F2F2EC] transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-secondary shrink-0 transition-transform ${
                          isOpen ? "rotate-180 text-accent" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="p-3 text-xs text-secondary bg-surface leading-relaxed border-t border-border">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy & Governance Notice */}
          <div className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-primary text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Independent Platform Notice</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Alumnux is strictly independently governed by 3 senior alumni trustees. We do not publish fabricated phone numbers or physical administrative offices. Inquiries submitted via this portal are handled with confidentiality adhering to DPDP 2023 principles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
