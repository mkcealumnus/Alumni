import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ArrowRight,
  GraduationCap,
  Users,
} from "lucide-react";

export default function AboutPage() {
  const coreValues = [
    {
      title: "Accessibility",
      description:
        "Every student deserves direct, unhindered access to seasoned career mentors, regardless of academic ranking, background, or social circle.",
    },
    {
      title: "Collaboration",
      description:
        "Meaningful professional growth thrives on mutual respect, transparent knowledge sharing, and peer-to-peer encouragement across graduating classes.",
    },
    {
      title: "Professional Growth",
      description:
        "We focus on real-world engineering readiness, system design foundations, interview preparation, and authentic portfolio craftsmanship.",
    },
    {
      title: "Responsible Networking",
      description:
        "We champion high-signal, thoughtful outreach over spammy messaging, ensuring that alumni time is valued and student inquiries are intentional.",
    },
  ];

  const studentBenefits = [
    "Unfiltered guidance from graduates who recently navigated the exact same hiring pipelines.",
    "Mock technical interviews, architecture reviews, and resume optimization from practicing engineers.",
    "Access to internal employee referrals that bypass automated screening algorithms.",
    "Clarity on off-campus opportunities, open-source contributions, and high-impact project topics.",
  ];

  const alumniBenefits = [
    "A direct, structured channel to give back to junior peers without administrative overhead.",
    "Discover motivated student talent for their engineering teams, startups, and open referrals.",
    "Sharpen leadership, mentorship, and engineering management communication skills.",
    "Strengthen a close-knit, independent professional network across graduating batches.",
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-20 pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Header Banner */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-border bg-surface text-xs font-mono text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>ABOUT ALUMNUX</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
          Built to make career guidance personal, direct, and accessible.
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed">
          Alumnux is an independent student and alumni network established to bridge the gap between academic education and modern technical industry standards.
        </p>
      </section>

      {/* The Problem & Why Alumnux Exists */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="bg-surface border border-border rounded-md p-6 sm:p-8 space-y-4 shadow-subtle">
          <div className="w-9 h-9 rounded-sm bg-[#F2F2EC] flex items-center justify-center text-accent font-mono font-bold text-sm">
            01
          </div>
          <h2 className="text-xl font-bold text-primary">The Guidance Gap</h2>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Every year, hundreds of capable engineering students graduate without clear insight into how modern tech companies recruit, evaluate candidates, and architect systems.
          </p>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Traditional campus placement offices often emphasize standardized bulk hiring over product engineering, specialized core domains, or off-campus opportunities. Meanwhile, alumni working in top organizations want to give back, but lack a structured, reliable platform to reach motivated students.
          </p>
        </div>

        <div className="bg-surface border border-border rounded-md p-6 sm:p-8 space-y-4 shadow-subtle">
          <div className="w-9 h-9 rounded-sm bg-[#F2F2EC] flex items-center justify-center text-accent font-mono font-bold text-sm">
            02
          </div>
          <h2 className="text-xl font-bold text-primary">Why Alumnux Exists</h2>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Alumnux was created to eliminate the gatekeepers. We provide a clean, dignified space where students can discover verified alumni by domain, request targeted mentorship, review opportunities, and build relationships that outlast any single interview.
          </p>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            We prioritize meaningful conversations over vanity metrics. A single 45-minute architectural teardown with an alumnus can change a student&apos;s career trajectory far more than generic advice.
          </p>
        </div>
      </section>

      {/* Mutual Benefits: Students & Alumni */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            Value Creation
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            How Students and Alumni Benefit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Students */}
          <div className="border border-border rounded-md bg-[#F2F2EC]/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <GraduationCap className="w-5 h-5 text-accent" />
              <span>For Current Students</span>
            </div>
            <ul className="space-y-3 pt-2">
              {studentBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-secondary leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* For Alumni */}
          <div className="border border-border rounded-md bg-[#F2F2EC]/40 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <Users className="w-5 h-5 text-accent" />
              <span>For Working Alumni</span>
            </div>
            <ul className="space-y-3 pt-2">
              {alumniBenefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-secondary leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            Guiding Principles
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Our Core Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val) => (
            <div
              key={val.title}
              className="bg-surface border border-border rounded-md p-6 space-y-3 shadow-subtle"
            >
              <h3 className="font-semibold text-base text-primary">
                {val.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Independent Platform Transparency Statement */}
      <section className="bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold text-base">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <span>Independent Platform Transparency Statement</span>
        </div>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          Alumnux is independently developed and administered by three senior alumni. It is not an officially managed college platform, nor is it affiliated with, operated by, or subordinate to college administration, placement cells, or faculty bodies.
        </p>
        <p className="text-xs sm:text-sm text-secondary leading-relaxed">
          This independence guarantees that student privacy, career choices, and open discussions remain protected from institutional pressures, ranking metrics, or administrative constraints.
        </p>
      </section>

      {/* Next Step CTA */}
      <section className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
        <p className="text-xs text-secondary">
          Ready to experience direct alumni networking?
        </p>
        <div className="flex items-center gap-3">
          <Link to="/our-goal">
            <Button variant="outline" size="sm" className="text-xs border-border">
              Read Our Goal
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="text-xs gap-1.5">
              <span>Join Alumnux</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
