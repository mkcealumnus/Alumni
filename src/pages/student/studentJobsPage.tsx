import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Building2,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  X,
  ArrowRight,
} from "lucide-react";
import { DEMO_CAREER_OPPORTUNITIES, CareerOpportunity } from "../../data/demoData";

export default function StudentJobsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("alumnux_saved_opp_ids");
      return stored ? JSON.parse(stored) : ["opp-01"];
    } catch {
      return ["opp-01"];
    }
  });

  const [appliedJob, setAppliedJob] = useState<CareerOpportunity | null>(null);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id];
      try {
        localStorage.setItem("alumnux_saved_opp_ids", JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage quota exceeded", e);
      }
      return updated;
    });
  };

  const filtered = useMemo(() => {
    return DEMO_CAREER_OPPORTUNITIES.filter((opp) => {
      const matchesSearch =
        search === "" ||
        opp.title.toLowerCase().includes(search.toLowerCase()) ||
        opp.organization.toLowerCase().includes(search.toLowerCase()) ||
        opp.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesType = typeFilter === "all" || opp.opportunityType === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [search, typeFilter]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplicationSubmitted(true);
    setTimeout(() => {
      setApplicationSubmitted(false);
      setAppliedJob(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Jobs &amp; Internships Board
          </h1>
          <p className="text-xs text-secondary">
            Verified alumni referral listings, graduate software engineering roles, and internships.
          </p>
        </div>
        <Badge variant="outline" className="text-xs self-start sm:self-auto font-mono">
          {DEMO_CAREER_OPPORTUNITIES.length} Active Demo Listings
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border rounded-md p-4 shadow-subtle flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search roles by title, company, or tech stack..."
            className="pl-9 h-9 text-xs bg-[#F8F8F5] border-border"
          />
        </div>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none"
        >
          <option value="all">All Opportunities</option>
          <option value="Full-time">Full-time Roles</option>
          <option value="Internship">Internships</option>
          <option value="Referral">Alumni Referrals</option>
          <option value="Mentorship">Mentorship Tracks</option>
        </select>
      </div>

      {/* Grid of Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((job) => {
          const isSaved = savedIds.includes(job.id);
          return (
            <div
              key={job.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] font-mono uppercase bg-[#F8F8F5]">
                      {job.opportunityType}
                    </Badge>
                    <span className="text-[10px] font-mono text-secondary">
                      {job.workMode}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleSave(job.id)}
                    className="p-1 rounded-sm text-secondary hover:text-accent"
                    title={isSaved ? "Saved" : "Save opportunity"}
                  >
                    {isSaved ? (
                      <BookmarkCheck className="w-4 h-4 text-accent fill-accent" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div>
                  <h2 className="font-bold text-sm sm:text-base text-primary">
                    {job.title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-secondary mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-accent" />
                    <span className="font-medium text-primary">{job.organization}</span>
                    <span>&bull;</span>
                    <span>{job.location}</span>
                  </div>
                </div>

                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                  {job.description}
                </p>

                <div className="p-2.5 bg-[#F8F8F5] rounded-sm text-[11px] font-mono text-secondary">
                  Comp: <strong className="text-primary">{job.compensation}</strong> &bull; Posted by {job.postedByName}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-secondary">
                  Deadline: {job.deadline}
                </span>
                <Button
                  size="sm"
                  onClick={() => setAppliedJob(job)}
                  className="text-xs h-8 gap-1"
                >
                  <span>Apply / Request Referral</span>
                  <ArrowRight className="w-3 h-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Application Modal */}
      {appliedJob && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-md max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-sm text-primary">
                  Apply for {appliedJob.title}
                </h3>
                <p className="text-xs text-accent">
                  {appliedJob.organization} &bull; Shared by {appliedJob.postedByName}
                </p>
              </div>
              <button
                onClick={() => setAppliedJob(null)}
                className="p-1 rounded-sm border border-border text-secondary hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {applicationSubmitted ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm space-y-2 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-semibold">Demo Application Submitted!</p>
                <p className="text-[11px] text-emerald-800">
                  Your profile and simulated resume were shared with {appliedJob.postedByName}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3.5">
                <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-xs space-y-1">
                  <p className="font-semibold text-primary">Applicant Profile:</p>
                  <p className="text-secondary">Alex Rivera &bull; CSE Pre-final Year &bull; 2026</p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-primary">
                    Short Referral Note to Alumni
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Briefly state why you are a good fit for this role and link your primary portfolio project..."
                    className="w-full rounded-sm border border-border bg-[#F8F8F5] p-2.5 text-xs text-primary focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAppliedJob(null)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="text-xs">
                    Submit Application
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
