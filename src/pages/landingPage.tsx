import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Briefcase,
  Lock,
  GraduationCap,
  ChevronRight,
  FileCheck2,
  Activity,
} from "lucide-react";
import { MOCK_ALUMNI, MOCK_JOBS } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12 sm:gap-16 md:gap-24 pb-20">
      {/* 1. HERO SECTION (SCALES ACROSS 6.1" MOBILE TO 49" SUPER ULTRAWIDE) */}
      <section className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 max-w-[320rem] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 desktop:grid-cols-12 ultrawide:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Left Column (Hero Message & CTAs) */}
          <div className="lg:col-span-7 desktop:col-span-6 ultrawide:col-span-5 space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm border border-border bg-surface text-[11px] sm:text-xs font-mono text-secondary">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>REFINED NANO-BRUTALISM &bull; 6.1&quot; &rarr; 49.0&quot; RESPONSIVE</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tight text-primary leading-[1.08]">
                Your Network. <br />
                <span className="text-accent underline decoration-border decoration-2 underline-offset-8">
                  Your Next Chapter.
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg 2xl:text-xl text-secondary max-w-xl 2xl:max-w-2xl leading-relaxed pt-1 sm:pt-2">
                An independently governed career guidance and mentorship network connecting ambitious students with verified alumni across top technology companies.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link to="/auth/register" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 text-sm font-semibold">
                  Get Verified &amp; Join
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/directory" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-semibold">
                  Explore Alumni Directory
                </Button>
              </Link>
            </div>

            {/* Credibility badges */}
            <div className="pt-4 border-t border-border flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-secondary">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                <span>Anna University Degree Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary shrink-0" />
                <span>Independent 3-Trustee Governance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0" />
                <span>Zero Faculty/College Interference</span>
              </div>
            </div>
          </div>

          {/* Center Column (Featured Alum Card) */}
          <div className="lg:col-span-5 desktop:col-span-6 ultrawide:col-span-4">
            <div className="border border-border rounded-md bg-surface p-5 sm:p-6 shadow-subtle space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#171717]" />
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    Live Verified Profile
                  </span>
                </div>
                <Badge variant="verified" className="text-[11px] gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verified Alum
                </Badge>
              </div>

              {/* Sample Alum Featured Card */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-base shrink-0">
                    KS
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary text-sm sm:text-base">
                      {MOCK_ALUMNI[0].full_name}
                    </h4>
                    <p className="text-xs sm:text-sm text-secondary leading-snug">
                      {MOCK_ALUMNI[0].headline}
                    </p>
                    <p className="text-[11px] text-secondary font-mono mt-0.5">
                      {MOCK_ALUMNI[0].department_name} &bull; Class of {MOCK_ALUMNI[0].graduation_year}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-xs sm:text-sm text-secondary leading-relaxed">
                  &ldquo;Available for 1-on-1 AWS distributed systems mock interviews and resume reviews for 3rd and final year CSE/IT students.&rdquo;
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {MOCK_ALUMNI[0].skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-sm bg-white border border-border text-[11px] text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-border/70">
                  <span className="text-secondary">Location: Bengaluru</span>
                  <Link to="/directory" className="text-accent font-medium hover:underline inline-flex items-center gap-1">
                    View in Directory <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Panoramic Telemetry on Ultrawides & Super Ultrawides (34"-49") */}
          <div className="hidden ultrawide:block ultrawide:col-span-3 space-y-4">
            <div className="border border-border rounded-md bg-surface p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-accent" />
                  Platform Telemetry
                </span>
                <Badge variant="outline" className="text-[10px] font-mono">
                  Real-time
                </Badge>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm">
                  <span className="text-secondary block text-[11px]">Average Verification Turnaround</span>
                  <span className="text-lg font-bold text-primary font-mono">24.6 Hours</span>
                  <p className="text-[10px] text-secondary mt-0.5">Audited by 3 independent senior alumni</p>
                </div>

                <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm">
                  <span className="text-secondary block text-[11px]">DPDP Act 2023 Protection</span>
                  <span className="text-xs font-semibold text-semantic-success block">30-Day Auto Purge</span>
                  <p className="text-[10px] text-secondary mt-0.5">Encrypted at rest with ephemeral review access</p>
                </div>

                <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm">
                  <span className="text-secondary block text-[11px]">Available Tech Employers</span>
                  <span className="text-xs font-semibold text-primary block">AWS, Google, Microsoft, Freshworks, Oracle</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE-STEP VERIFICATION & ACCESS WORKFLOW */}
      <section className="px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 max-w-[320rem] mx-auto w-full">
        <div className="border border-border rounded-md bg-surface p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
          <div className="max-w-2xl 2xl:max-w-3xl space-y-2">
            <Badge variant="outline" className="font-mono text-[10px] uppercase">
              How Alumnux Works
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">
              Built on Authentic Identity. Unencumbered by Bureaucracy.
            </h2>
            <p className="text-xs sm:text-sm text-secondary leading-relaxed">
              A peer-driven platform operating on rigorous academic verification conducted independently by senior alumni.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Step 1 */}
            <div className="border border-border rounded-sm p-5 space-y-3 bg-[#F8F8F5]">
              <div className="w-7 h-7 rounded-sm bg-primary text-white flex items-center justify-center font-mono text-xs font-bold">
                01
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-primary">
                1. Upload Academic Credentials
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Students upload their College ID card (Front &amp; Back). Alumni upload their official Anna University Degree Certificate.
              </p>
              <div className="text-[11px] font-mono text-accent flex items-center gap-1 pt-1">
                <FileCheck2 className="w-3.5 h-3.5" /> Private, encrypted storage
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-border rounded-sm p-5 space-y-3 bg-[#F8F8F5]">
              <div className="w-7 h-7 rounded-sm bg-accent text-white flex items-center justify-center font-mono text-xs font-bold">
                02
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-primary">
                2. Senior Alumni Audit
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Exactly three designated senior alumni trustees inspect submitted evidence. College management and faculty have zero access.
              </p>
              <div className="text-[11px] font-mono text-semantic-success flex items-center gap-1 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 24-48 hr review cycle
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-border rounded-sm p-5 space-y-3 bg-[#F8F8F5]">
              <div className="w-7 h-7 rounded-sm bg-primary text-white flex items-center justify-center font-mono text-xs font-bold">
                03
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-primary">
                3. Direct Access &amp; Mentorship
              </h3>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                Connect with alumni at Google, Amazon, Freshworks, and Microsoft for mock interviews, resume feedback, and genuine referrals.
              </p>
              <div className="text-[11px] font-mono text-primary flex items-center gap-1 pt-1">
                <Briefcase className="w-3.5 h-3.5" /> Verified job board
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION: STUDENTS VS ALUMNI */}
      <section className="px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 max-w-[320rem] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* For Students Card */}
          <div className="border border-border rounded-md bg-surface p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-lg sm:text-xl text-primary">For Students</h3>
              </div>
              <Badge variant="accent" className="text-[10px]">Pre-final &amp; Final Years</Badge>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-secondary">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-medium">Off-Campus Advantage:</strong> Learn the exact interview formats and preparation roadmaps from alumni working in top engineering teams.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-medium">Direct Resume Reviews:</strong> Receive actionable, constructive feedback on your portfolio and GitHub projects.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-medium">Genuine Referrals:</strong> Apply for internships and full-time vacancies posted directly by verified alumni.
                </span>
              </li>
            </ul>
            <div className="pt-2">
              <Link to="/onboarding/student">
                <Button variant="secondary" size="sm" className="w-full justify-between">
                  Start Student Verification
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* For Alumni Card */}
          <div className="border border-border rounded-md bg-surface p-6 sm:p-8 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-accent" />
                <h3 className="font-bold text-lg sm:text-xl text-primary">For Alumni</h3>
              </div>
              <Badge variant="outline" className="text-[10px]">Graduates &amp; Professionals</Badge>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-secondary">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-medium">No Spam, High Signal:</strong> Only authenticated, verified students from your academic department can request your mentorship.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-medium">Privacy Preserved:</strong> Your direct phone and email remain masked. Interactions are mediated through structured platform requests.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-semantic-success shrink-0 mt-0.5" />
                <span>
                  <strong className="text-primary font-medium">Give Back On Your Terms:</strong> Define mentorship topics, availability slots, and refer talented juniors into your company.
                </span>
              </li>
            </ul>
            <div className="pt-2">
              <Link to="/onboarding/alumni">
                <Button variant="secondary" size="sm" className="w-full justify-between">
                  Verify Alumni Graduation
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CAREER OPPORTUNITIES & JOBS (RESPONSIVE GRID 1 COL -> 6 COLS ON ULTRAWIDE) */}
      <section className="px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 max-w-[320rem] mx-auto w-full">
        <div className="border border-border rounded-md bg-surface p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-primary">
                Recent Opportunities Shared by Alumni
              </h2>
              <p className="text-xs sm:text-sm text-secondary">
                Direct referral openings posted by verified engineers and leaders.
              </p>
            </div>
            <Link to="/portal/student">
              <Button variant="outline" size="sm">
                View All Opportunities
              </Button>
            </Link>
          </div>

          {/* Scalable Grid across Mobile, Foldable, Laptops, Desktops, Ultrawides */}
          <div className="grid grid-cols-1 foldable:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-3 desktop:grid-cols-3 qhd:grid-cols-4 ultrawide:grid-cols-6 superwide:grid-cols-6 gap-4">
            {MOCK_JOBS.map((job) => (
              <Card key={job.id} className="p-4 space-y-3 hover:border-primary transition-colors flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <Badge variant="outline" className="text-[10px]">
                      {job.department_tag}
                    </Badge>
                    {job.is_referral_available && (
                      <Badge variant="verified" className="text-[10px]">
                        Referral
                      </Badge>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-primary leading-snug">
                      {job.title}
                    </h4>
                    <p className="text-xs font-medium text-secondary mt-0.5">
                      {job.company} &bull; {job.location}
                    </p>
                  </div>
                </div>
                <div className="pt-2 border-t border-border/70 text-[11px] text-secondary flex items-center justify-between">
                  <span>Shared by {job.posted_by_name}</span>
                  <span className="font-mono text-accent">Full-time</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 5. INDEPENDENT GOVERNANCE & 3-TRUSTEE COMMITMENT */}
      <section className="px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 max-w-[320rem] mx-auto w-full">
        <div className="border border-border rounded-md bg-[#171717] text-white p-6 sm:p-8 md:p-12 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-sm bg-[#262626] border border-[#404040] text-xs font-mono text-[#D8D8D2]">
              <Lock className="w-3.5 h-3.5 text-accent" />
              NON-INSTITUTIONAL TRUSTEE CHARTER
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Operated Independently by Three Senior Alumni.
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A8A0] leading-relaxed">
              Alumnux is built, financed, and moderated solely by three senior alumni trustees. No college administration, management board, or faculty committee holds operational credentials or authority over this platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-[#333]">
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A8A8A0]">
                Trustee 1: Infrastructure
              </h4>
              <p className="font-semibold text-sm">Arunachalam S.</p>
              <p className="text-xs text-[#888]">Staff Infrastructure Engineer @ Tier-1 Cloud &bull; Class of 2016</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A8A8A0]">
                Trustee 2: Product &amp; UX
              </h4>
              <p className="font-semibold text-sm">Deepika Sundaram</p>
              <p className="text-xs text-[#888]">VP of Engineering @ Fintech Unicorn &bull; Class of 2015</p>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#A8A8A0]">
                Trustee 3: Governance &amp; Privacy
              </h4>
              <p className="font-semibold text-sm">Venkatesh Raman</p>
              <p className="text-xs text-[#888]">Principal Security Architect @ CyberDefense &bull; Class of 2014</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 max-w-[320rem] mx-auto w-full text-center">
        <div className="border border-border rounded-md bg-surface p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Join the High-Trust Alumni Network
          </h2>
          <p className="text-xs sm:text-sm text-secondary max-w-lg mx-auto leading-relaxed">
            Whether you are a student preparing for campus drives or an alumnus looking to mentor the next generation, Alumnux provides the verified space to connect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/auth/register" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-sm font-semibold">
                Start Account Verification
              </Button>
            </Link>
            <Link to="/auth/login" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto text-sm font-semibold">
                Sign In With Google
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
