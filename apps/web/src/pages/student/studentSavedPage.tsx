import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bookmark,
  BookmarkX,
  Building2,
  ArrowRight,
} from "lucide-react";
import { DEMO_CAREER_OPPORTUNITIES } from "../../data/demoData";

export default function StudentSavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("alumnux_saved_opp_ids");
      return stored ? JSON.parse(stored) : ["opp-01", "opp-02"];
    } catch {
      return ["opp-01", "opp-02"];
    }
  });

  const removeSaved = (id: string) => {
    const updated = savedIds.filter((item) => item !== id);
    setSavedIds(updated);
    try {
      localStorage.setItem("alumnux_saved_opp_ids", JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage quota exceeded", e);
    }
  };

  const savedList = DEMO_CAREER_OPPORTUNITIES.filter((opp) =>
    savedIds.includes(opp.id)
  );

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Saved Opportunities
          </h1>
          <p className="text-xs text-secondary">
            Your bookmarked job listings, internships, and referral contacts for review and follow-up.
          </p>
        </div>
        <Badge variant="outline" className="text-xs self-start sm:self-auto font-mono">
          {savedList.length} Bookmarked
        </Badge>
      </div>

      {savedList.length === 0 ? (
        <div className="bg-surface border border-dashed border-border rounded-md p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F2F2EC] flex items-center justify-center mx-auto text-secondary">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base font-bold text-primary">No saved opportunities</h2>
            <p className="text-xs text-secondary">
              Browse the career board and bookmark listings to track deadlines and application materials.
            </p>
          </div>
          <Link to="/student/jobs">
            <Button size="sm" className="text-xs gap-1.5">
              <span>Browse Career Board</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {savedList.map((job) => (
            <div
              key={job.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono uppercase bg-[#F8F8F5]">
                    {job.opportunityType}
                  </Badge>
                  <button
                    onClick={() => removeSaved(job.id)}
                    className="text-xs text-secondary hover:text-red-600 flex items-center gap-1 font-mono"
                    title="Remove from saved"
                  >
                    <BookmarkX className="w-4 h-4" />
                    <span>Remove</span>
                  </button>
                </div>

                <div>
                  <h2 className="font-bold text-base text-primary">
                    {job.title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs text-secondary mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-accent" />
                    <span className="font-medium text-primary">{job.organization}</span>
                    <span>&bull;</span>
                    <span>{job.location} ({job.workMode})</span>
                  </div>
                </div>

                <p className="text-xs text-secondary line-clamp-2">
                  {job.description}
                </p>

                <div className="p-2.5 bg-[#F8F8F5] rounded-sm text-[11px] font-mono text-secondary">
                  Comp: {job.compensation} &bull; Shared by {job.postedByName}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between">
                <span className="text-[10px] font-mono text-secondary">
                  Deadline: {job.deadline}
                </span>
                <Link to="/student/jobs">
                  <Button size="sm" className="text-xs h-8">
                    Apply Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
