import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  Building2,
  MapPin,
  ArrowRight,
  X,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import {
  DEMO_CAREER_OPPORTUNITIES,
  CareerOpportunity,
} from "../../data/demoData";
import { useAuth } from "../../context/authContext";

export default function CareerPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("alumnux_saved_opp_ids");
      return stored ? JSON.parse(stored) : ["opp-01"];
    } catch {
      return ["opp-01"];
    }
  });

  const [activeOpportunity, setActiveOpportunity] = useState<CareerOpportunity | null>(null);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("alumnux_saved_opp_ids", JSON.stringify(updated));
      } catch (e) {
        console.warn("Storage quota exceeded", e);
      }
      return updated;
    });
  };

  // Extract unique locations from demo dataset
  const locations = useMemo(() => {
    const set = new Set<string>();
    DEMO_CAREER_OPPORTUNITIES.forEach((o) => {
      const city = o.location.split("(")[0].trim();
      set.add(city);
    });
    return Array.from(set);
  }, []);

  // Filtered dataset
  const filteredOpportunities = useMemo(() => {
    return DEMO_CAREER_OPPORTUNITIES.filter((item) => {
      // Search text query
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Type filter
      const matchesType =
        selectedType === "all" || item.opportunityType === selectedType;

      // Work mode filter
      const matchesWorkMode =
        selectedWorkMode === "all" || item.workMode === selectedWorkMode;

      // Location filter
      const matchesLocation =
        selectedLocation === "all" ||
        item.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return matchesSearch && matchesType && matchesWorkMode && matchesLocation;
    });
  }, [searchQuery, selectedType, selectedWorkMode, selectedLocation]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedWorkMode("all");
    setSelectedLocation("all");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedType !== "all" ||
    selectedWorkMode !== "all" ||
    selectedLocation !== "all";

  return (
    <div className="flex flex-col gap-10 pb-20 pt-8 sm:pt-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm border border-border bg-surface text-xs font-mono text-secondary">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>OPPORTUNITY DIRECTORY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary">
            Career &amp; Mentorship Discovery
          </h1>
          <p className="text-xs sm:text-sm text-secondary leading-relaxed">
            Explore curated roles, internships, referral leads, and 1-on-1 mentorship tracks shared by alumni across leading engineering organizations.
          </p>
        </div>

        {/* CTA for Alumni to share */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link to={user?.role === "alumni" ? "/alumni/opportunities" : "/login"}>
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9 gap-1.5 border-border bg-surface hover:border-accent"
            >
              <PlusCircle className="w-3.5 h-3.5 text-accent" />
              <span>Are you an Alumnus? Share an Opportunity</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Demo Notice Banner */}
      <div className="p-3 bg-surface border border-border rounded-sm flex items-start sm:items-center gap-2.5 text-xs text-secondary">
        <AlertCircle className="w-4 h-4 text-accent shrink-0 mt-0.5 sm:mt-0" />
        <p>
          <strong className="text-primary font-medium">Demonstration Content:</strong> All opportunities in this catalog are seeded sample records to demonstrate filtering, search, and referral mechanics. They do not imply verified vacancies or contractual partnerships.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-surface border border-border rounded-md p-4 sm:p-5 shadow-subtle space-y-4">
        {/* Main Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role, company (e.g. Stripe, AWS), tech stack (Go, PyTorch), or keyword..."
            className="pl-10 h-10 text-xs sm:text-sm bg-[#F8F8F5] border-border focus-visible:ring-accent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary text-xs"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Opportunity Type */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-secondary font-medium">
              Opportunity Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All Types (Full-time, Intern, Referral, Mentorship)</option>
              <option value="Full-time">Full-time</option>
              <option value="Internship">Internship</option>
              <option value="Referral">Referral Only</option>
              <option value="Mentorship">1-on-1 Mentorship</option>
            </select>
          </div>

          {/* Work Mode */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-secondary font-medium">
              Work Mode
            </label>
            <select
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
              className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Onsite">On-site</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase text-secondary font-medium">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="all">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset Button */}
        {hasActiveFilters && (
          <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
            <span className="text-secondary font-mono text-[11px]">
              Showing {filteredOpportunities.length} of {DEMO_CAREER_OPPORTUNITIES.length} listings
            </span>
            <button
              onClick={clearAllFilters}
              className="text-accent hover:underline font-medium text-xs flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Grid of Listings */}
      {filteredOpportunities.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center bg-surface border border-dashed border-border rounded-md space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F2F2EC] flex items-center justify-center mx-auto text-secondary">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h3 className="font-semibold text-base text-primary">
              No matching opportunities found
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              We couldn&apos;t find any demo listings matching your current search query and filter combination.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="text-xs border-border"
          >
            Clear all filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map((opp) => {
            const isSaved = savedIds.includes(opp.id);
            return (
              <div
                key={opp.id}
                className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-accent/50 transition-colors group relative"
              >
                <div className="space-y-3.5">
                  {/* Top Tags & Bookmark Button */}
                  <div className="flex items-center justify-between gap-2">
                    <Badge
                      variant="outline"
                      className="text-[10px] font-mono uppercase bg-[#F8F8F5] border-border"
                    >
                      {opp.opportunityType}
                    </Badge>
                    <button
                      type="button"
                      onClick={() => toggleSave(opp.id)}
                      className={`p-1.5 rounded-sm transition-colors border ${
                        isSaved
                          ? "bg-accent/10 border-accent/40 text-accent"
                          : "border-transparent text-secondary hover:text-primary hover:border-border"
                      }`}
                      title={isSaved ? "Remove from bookmarks" : "Save opportunity"}
                      aria-label="Save opportunity"
                    >
                      {isSaved ? (
                        <BookmarkCheck className="w-4 h-4 fill-accent" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Title & Organization */}
                  <div className="space-y-1">
                    <h2 className="font-bold text-sm sm:text-base text-primary line-clamp-2 leading-snug">
                      {opp.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-xs text-secondary font-medium">
                      <Building2 className="w-3.5 h-3.5 text-accent" />
                      <span>{opp.organization}</span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-secondary font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-secondary" />
                      {opp.location}
                    </span>
                    <span>&bull;</span>
                    <span>{opp.workMode}</span>
                    <span>&bull;</span>
                    <span className="text-primary font-medium">{opp.compensation}</span>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-secondary line-clamp-3 leading-relaxed">
                    {opp.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 pt-1">
                    {opp.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#F8F8F5] border border-border text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer with Posted By & Action Modal Trigger */}
                <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-secondary font-mono">
                      Shared by <span className="text-primary font-medium">{opp.postedByName}</span>
                    </p>
                    <p className="text-[10px] text-secondary">
                      {opp.postedByCompany} &bull; Class of {opp.postedByYear}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveOpportunity(opp)}
                    className="text-xs h-8 px-2.5 font-medium border-border hover:border-accent hover:text-accent"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Slideover / Modal for Selected Opportunity */}
      {activeOpportunity && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="career-modal-title"
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-surface border border-border rounded-md max-w-xl w-full p-6 space-y-5 shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] font-mono uppercase">
                    {activeOpportunity.opportunityType}
                  </Badge>
                  <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Sample Demo Data
                  </span>
                </div>
                <h2 id="career-modal-title" className="text-lg font-bold text-primary">
                  {activeOpportunity.title}
                </h2>
                <p className="text-xs text-accent font-medium mt-0.5">
                  {activeOpportunity.organization} &bull; {activeOpportunity.location} ({activeOpportunity.workMode})
                </p>
              </div>
              <button
                onClick={() => setActiveOpportunity(null)}
                className="p-1 rounded-sm border border-border text-secondary hover:text-primary"
                aria-label="Close dialog"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-secondary">
              <div>
                <h3 className="font-semibold text-primary mb-1 text-xs">Role Overview</h3>
                <p>{activeOpportunity.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-primary mb-1 text-xs">Requirements &amp; Preferred Skills</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {activeOpportunity.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm space-y-1">
                <p className="font-medium text-primary text-[11px]">
                  Sample Compensation / Stipend:
                </p>
                <p className="text-secondary font-mono">{activeOpportunity.compensation}</p>
              </div>

              <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm space-y-1">
                <p className="font-medium text-primary text-[11px]">Alumni Referral Contact:</p>
                <p className="text-secondary">
                  Posted by <strong className="text-primary">{activeOpportunity.postedByName}</strong> ({activeOpportunity.postedByRole} at {activeOpportunity.postedByCompany}).
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleSave(activeOpportunity.id)}
                className="text-xs gap-1.5"
              >
                {savedIds.includes(activeOpportunity.id) ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-accent" />
                    <span>Saved in Bookmarks</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Save for Later</span>
                  </>
                )}
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveOpportunity(null)}
                  className="text-xs"
                >
                  Close
                </Button>
                <Link
                  to={user ? (user.role === "student" ? "/student/jobs" : "/alumni/dashboard") : "/login"}
                >
                  <Button size="sm" className="text-xs gap-1.5">
                    <span>{user ? "Apply via Demo Hub" : "Sign In to Connect"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
