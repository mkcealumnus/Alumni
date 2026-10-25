import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap,
  ShieldCheck,
  MapPin,
  Building2,
  TrendingUp,
} from "lucide-react";
import { DEMO_CAREER_OPPORTUNITIES } from "../data/demoData";

export default function HomePage() {
  const featuredOpportunities = DEMO_CAREER_OPPORTUNITIES.slice(0, 3);

  const featureCards = [
    {
      icon: TrendingUp,
      title: "Career Guidance",
      description:
        "Receive practical roadmap advice, portfolio feedback, and interview preparation tailored to your target engineering roles.",
    },
    {
      icon: Users,
      title: "Alumni Networking",
      description:
        "Connect directly with graduates working across leading software, hardware, and infrastructure companies without gatekeepers.",
    },
    {
      icon: GraduationCap,
      title: "Mentorship",
      description:
        "Schedule structured 1-on-1 guidance sessions focused on resume teardowns, off-campus hiring strategies, and skill mastery.",
    },
    {
      icon: Briefcase,
      title: "Jobs & Internships",
      description:
        "Discover curated job opportunities, summer internships, and internal employee referrals shared directly by verified alumni.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create your profile",
      description:
        "Sign up in seconds, outline your academic background, current skill set, and targeted engineering or product aspirations.",
    },
    {
      number: "02",
      title: "Connect with alumni & explore opportunities",
      description:
        "Search the alumni directory, filter by domain or company, send direct mentorship requests, and browse authentic job referrals.",
    },
    {
      number: "03",
      title: "Build skills & advance your career",
      description:
        "Gain real-world interview insights, refine your technical projects, attend alumni AMAs, and make confident career moves.",
    },
  ];

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20">
      {/* SECTION 1 — HERO */}
      <section className="pt-8 sm:pt-14 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-border bg-surface text-xs font-mono text-secondary">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>INDEPENDENT STUDENT &amp; ALUMNI PLATFORM</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-primary leading-[1.08]">
                Your Network. <br />
                <span className="text-accent underline decoration-border decoration-2 underline-offset-8">
                  Your Next Chapter.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-secondary max-w-xl leading-relaxed">
                Connect with alumni, discover career opportunities, and turn professional relationships into meaningful progress.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/career">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-sm font-semibold shadow-subtle">
                  <span>Explore Careers</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-sm font-semibold border-border hover:bg-surface">
                  Join Alumnux
                </Button>
              </Link>
            </div>

            {/* Trust Statement */}
            <div className="pt-4 border-t border-border flex items-start gap-3 max-w-lg">
              <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <p className="text-xs text-secondary leading-relaxed">
                <strong className="text-primary font-medium">Independent Platform:</strong> Alumnux is independently developed and administered by three senior alumni. It is not an officially managed college platform.
              </p>
            </div>
          </div>

          {/* Right Column: Visual of Career Connections & Mentorship */}
          <div className="lg:col-span-5">
            <div className="border border-border rounded-md bg-surface p-6 shadow-subtle space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    Active Mentor Connection
                  </span>
                </div>
                <Badge variant="outline" className="text-[11px] bg-[#F8F8F5]">
                  Live Demo Preview
                </Badge>
              </div>

              {/* Alumni Profile Card */}
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
                  JV
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-primary text-sm sm:text-base">
                      Jordan Vance
                    </h3>
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5">
                      Class of 2018
                    </Badge>
                  </div>
                  <p className="text-xs font-medium text-accent">
                    Staff Platform Engineer @ Stripe
                  </p>
                  <p className="text-[11px] text-secondary">
                    Mentoring in Distributed Systems &amp; System Design
                  </p>
                </div>
              </div>

              {/* Interactive preview box */}
              <div className="p-3.5 bg-[#F8F8F5] border border-border rounded-sm space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-secondary text-[11px] font-mono">
                  <span>RECENT MENTORSHIP SESSION</span>
                  <span className="text-emerald-600 font-semibold">&bull; Completed</span>
                </div>
                <p className="text-primary font-medium text-xs leading-snug">
                  &ldquo;Reviewed Alex&apos;s Go distributed queue project. Discussed idempotency, write-ahead logs, and interview prep strategies.&rdquo;
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  <span className="text-[10px] px-2 py-0.5 bg-surface border border-border rounded-sm text-secondary">
                    Go / Rust
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-surface border border-border rounded-sm text-secondary">
                    Distributed Queues
                  </span>
                  <span className="text-[10px] px-2 py-0.5 bg-surface border border-border rounded-sm text-secondary">
                    Mock Design
                  </span>
                </div>
              </div>

              {/* Action Preview */}
              <div className="pt-2 flex items-center justify-between text-xs">
                <span className="text-secondary text-[11px]">Looking for advice?</span>
                <Link to="/career" className="text-accent font-medium hover:underline inline-flex items-center gap-1">
                  Browse opportunities &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHAT ALUMNUX OFFERS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="space-y-3 mb-10 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
            Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            What Alumnux Offers
          </h2>
          <p className="text-sm text-secondary leading-relaxed">
            Four focused pillars built to accelerate student career readiness and bridge the divide between academia and modern engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 bg-surface border border-border rounded-md shadow-subtle hover:border-accent/60 transition-all duration-150 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-[#F2F2EC] group-hover:bg-accent group-hover:text-white transition-colors flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-base text-primary">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 — HOW IT WORKS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="border border-border rounded-md bg-[#F2F2EC]/60 p-8 sm:p-12 space-y-10">
          <div className="space-y-2 text-center max-w-xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Simple Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
              How Alumnux Works
            </h2>
            <p className="text-xs sm:text-sm text-secondary">
              A transparent, self-directed path from initial registration to professional guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-surface border border-border rounded-md p-6 space-y-3 shadow-subtle relative"
              >
                <div className="text-2xl font-mono font-bold text-accent">
                  {step.number}
                </div>
                <h3 className="text-base font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="text-xs text-secondary leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CAREER OPPORTUNITIES PREVIEW */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border">
          <div className="space-y-1.5">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Opportunities Preview
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
              Featured Opportunities
            </h2>
            <p className="text-xs text-secondary">
              Seeded sample listings demonstrating how alumni share roles, internships, and referrals.
            </p>
          </div>
          <Link to="/career">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-medium border-border">
              <span>View All Careers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* 3 Sample Listings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredOpportunities.map((job) => (
            <div
              key={job.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-accent/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono uppercase border-border bg-[#F8F8F5]"
                  >
                    {job.opportunityType}
                  </Badge>
                  <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Demo Data
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-sm text-primary line-clamp-1">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
                    <Building2 className="w-3.5 h-3.5 text-accent" />
                    <span>{job.organization}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-secondary">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                  <span>&bull;</span>
                  <span>{job.workMode}</span>
                </div>

                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-[11px] text-secondary font-mono">
                  Posted by {job.postedByName}
                </span>
                <Link
                  to="/career"
                  className="text-accent font-semibold hover:underline text-xs flex items-center gap-1"
                >
                  Details
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Content Disclaimer Banner */}
        <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-center text-xs text-secondary">
          <p>
            Notice: All listings shown are sample demonstration content. Alumnux does not invent fake employer partnerships or represent demo postings as verified vacancies.
          </p>
        </div>
      </section>

      {/* SECTION 5 — FINAL CTA */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-[#171717] text-white rounded-md p-8 sm:p-14 text-center space-y-6 shadow-subtle">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Begin Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Your next opportunity could start with one connection.
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A8A0] leading-relaxed">
              Join students and verified alumni actively sharing guidance, interview preparation, and career leads across the industry.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-sm font-semibold gap-2 shadow-sm">
                <span>Create Free Account</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/career" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto text-sm font-semibold bg-transparent text-white border-[#333] hover:bg-white/10"
              >
                Explore Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
