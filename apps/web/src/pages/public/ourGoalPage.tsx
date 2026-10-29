import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Target,
  ArrowRight,
} from "lucide-react";

export default function OurGoalPage() {
  const strategicGoals = [
    {
      title: "Mentorship Access",
      detail:
        "Democratize 1-on-1 career guidance so any motivated student can request structured guidance from alumni working in top engineering fields.",
    },
    {
      title: "Career Readiness",
      detail:
        "Equip students with realistic industry expectations, modern system design insights, and honest feedback on technical portfolios.",
    },
    {
      title: "Opportunity Discovery",
      detail:
        "Provide a clean, transparent avenue for discovering genuine internship and entry-level referrals posted directly by working alumni.",
    },
    {
      title: "Professional Networking",
      detail:
        "Cultivate a polite, high-signal networking culture that teaches students how to conduct professional outreach effectively.",
    },
    {
      title: "Alumni Participation",
      detail:
        "Give alumni an intuitive, low-friction platform to give back without dealing with institutional politics or administrative gatekeeping.",
    },
  ];

  const roadmapPhases = [
    {
      phase: "Phase 1",
      name: "Foundation & Prototype Architecture",
      status: "In Progress / Current",
      isCurrent: true,
      items: [
        "Vite + React 19 + TypeScript strict frontend release",
        "Public website and refined Nano-Brutalism aesthetic",
        "Client-side isolated demo authentication (Student & Alumni)",
        "Student & Alumni interactive dashboard environments",
        "Searchable career & opportunity directory with live filters",
      ],
    },
    {
      phase: "Phase 2",
      name: "Authentication & Identity Verification",
      status: "Upcoming",
      isCurrent: false,
      items: [
        "Supabase Auth integration for secure credential handling",
        "Zero-trust academic document verification intake",
        "Trustee review workflows adhering to DPDP Act 2023 principles",
        "Verified badge issuance for authenticated alumni",
      ],
    },
    {
      phase: "Phase 3",
      name: "Mentorship Matching & Referral Workflows",
      status: "Planned",
      isCurrent: false,
      items: [
        "Calendar scheduling for 1-on-1 virtual mentoring sessions",
        "Structured referral application intake with resume review",
        "In-app direct messaging with end-to-end privacy protections",
        "Alumni availability controls and mentee capacity caps",
      ],
    },
    {
      phase: "Phase 4",
      name: "Community Knowledge & Interactive AMAs",
      status: "Long-term Horizon",
      isCurrent: false,
      items: [
        "Alumni-hosted live AMAs and technical teardowns",
        "Curated career question-and-answer repository",
        "Cross-department engineering project showcase",
        "Annual transparent platform governance reports",
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-20 pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <section className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-border bg-surface text-xs font-mono text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>MISSION &amp; STRATEGY</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-primary leading-tight">
          Our Goal: A trusted bridge from campus to career.
        </h1>
        <p className="text-base sm:text-lg text-secondary leading-relaxed">
          We are building an enduring professional community where students gain clarity and alumni share knowledge, free of institutional bureaucracy.
        </p>
      </section>

      {/* Mission & Vision Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        <div className="bg-surface border border-border rounded-md p-6 sm:p-8 space-y-4 shadow-subtle flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4" />
              <span>Our Mission</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              Make career guidance and alumni connections universally accessible.
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              To eliminate the social, academic, and administrative barriers that prevent students from receiving practical career advice, honest interview coaching, and authentic opportunity referrals.
            </p>
          </div>
          <div className="pt-4 border-t border-border text-[11px] text-secondary font-mono">
            Commitment: Pro-bono guidance &bull; Student-first design
          </div>
        </div>

        <div className="bg-surface border border-border rounded-md p-6 sm:p-8 space-y-4 shadow-subtle flex flex-col justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider font-semibold">
              <Target className="w-4 h-4" />
              <span>Our Vision</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              Build a trusted network where knowledge, experience, and opportunities flow freely.
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              To cultivate an active, multi-generational network of engineers and leaders who continuously uplift the graduating classes that follow them.
            </p>
          </div>
          <div className="pt-4 border-t border-border text-[11px] text-secondary font-mono">
            Standard: Dignified outreach &bull; High-signal mentorship
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            Strategic Objectives
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Five Strategic Goals
          </h2>
          <p className="text-xs sm:text-sm text-secondary max-w-2xl">
            Each goal guides our platform roadmap and ensures development remains focused on student progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategicGoals.map((goal, idx) => (
            <div
              key={goal.title}
              className="bg-surface border border-border rounded-md p-6 space-y-3 shadow-subtle hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-accent">
                  Goal 0{idx + 1}
                </span>
                <span className="w-2 h-2 rounded-full bg-border" />
              </div>
              <h3 className="font-semibold text-base text-primary">
                {goal.title}
              </h3>
              <p className="text-xs text-secondary leading-relaxed">
                {goal.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Development Roadmap */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            Engineering Trajectory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Platform Development Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-secondary">
            A transparent phased overview of Alumnux capabilities as we progress toward full production deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roadmapPhases.map((phase) => (
            <div
              key={phase.phase}
              className={`p-6 rounded-md border flex flex-col justify-between space-y-5 ${
                phase.isCurrent
                  ? "bg-surface border-accent shadow-sm"
                  : "bg-[#F2F2EC]/40 border-border"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-primary">
                    {phase.phase}
                  </span>
                  <Badge
                    variant={phase.isCurrent ? "default" : "outline"}
                    className="text-[10px]"
                  >
                    {phase.status}
                  </Badge>
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-primary">
                    {phase.name}
                  </h3>
                </div>

                <ul className="space-y-2 text-xs text-secondary">
                  {phase.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-accent font-bold">&rsaquo;</span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-border/80 text-[10px] font-mono text-secondary">
                {phase.isCurrent ? "Active Milestone" : "Scheduled Phase"}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Action Footer */}
      <section className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border">
        <p className="text-xs text-secondary">
          Explore current career listings and mentorship opportunities.
        </p>
        <Link to="/career">
          <Button size="sm" className="text-xs gap-1.5">
            <span>Explore Career Listings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
