
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  ShieldCheck,
  Building2,
  MapPin,
  Lock,
  RotateCcw,
  SlidersHorizontal,
  GraduationCap,
} from "lucide-react";
import { MOCK_ALUMNI } from "@/lib/mockData";
import { ALLOWED_DEPARTMENTS } from "@/lib/validation";

export default function AlumniDirectoryPage() {
  // Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [selectedGradYear, setSelectedGradYear] = useState<string>("ALL");
  const [selectedSkill, setSelectedSkill] = useState<string>("ALL");
  const [selectedCompany, setSelectedCompany] = useState<string>("ALL");

  // Mobile Filter Drawer Toggle (for 6.1" - 6.8" phones)
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false);

  // Simulated UI States for Inspection
  const [viewState, setViewState] = useState<"normal" | "loading" | "error" | "empty">("normal");

  // Derived filter logic
  const filteredAlumni = useMemo(() => {
    if (viewState === "empty") return [];
    return MOCK_ALUMNI.filter((alum) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        alum.full_name.toLowerCase().includes(q) ||
        alum.current_company?.toLowerCase().includes(q) ||
        alum.current_role?.toLowerCase().includes(q) ||
        alum.skills.some((s) => s.toLowerCase().includes(q));

      const matchesDept = selectedDept === "ALL" || alum.department_code === selectedDept;
      const matchesGradYear =
        selectedGradYear === "ALL" || alum.graduation_year.toString() === selectedGradYear;
      const matchesSkill = selectedSkill === "ALL" || alum.skills.includes(selectedSkill);
      const matchesCompany =
        selectedCompany === "ALL" || alum.current_company === selectedCompany;

      return matchesQuery && matchesDept && matchesGradYear && matchesSkill && matchesCompany;
    });
  }, [searchQuery, selectedDept, selectedGradYear, selectedSkill, selectedCompany, viewState]);

  // Unique companies and skills for dropdowns
  const allSkills = Array.from(new Set(MOCK_ALUMNI.flatMap((a) => a.skills))).sort();
  const allCompanies = Array.from(new Set(MOCK_ALUMNI.map((a) => a.current_company).filter(Boolean))).sort();

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDept("ALL");
    setSelectedGradYear("ALL");
    setSelectedSkill("ALL");
    setSelectedCompany("ALL");
    setViewState("normal");
  };

  const hasActiveFilters =
    searchQuery ||
    selectedDept !== "ALL" ||
    selectedGradYear !== "ALL" ||
    selectedSkill !== "ALL" ||
    selectedCompany !== "ALL";

  return (
    <div className="max-w-[320rem] mx-auto px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* State Inspector / Evaluation Helper */}
      <div className="p-3 bg-[#EFEFEA] border border-border rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 font-mono text-secondary truncate">
          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
          <span className="truncate">ALUMNI DIRECTORY &bull; PRIVACY-AWARE &bull; 6.1&quot; TO 49.0&quot; LAYOUT</span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] uppercase font-mono text-secondary">Test State:</span>
          <Button
            variant={viewState === "normal" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2"
            onClick={() => setViewState("normal")}
          >
            Normal ({filteredAlumni.length})
          </Button>
          <Button
            variant={viewState === "loading" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2"
            onClick={() => setViewState("loading")}
          >
            Loading
          </Button>
          <Button
            variant={viewState === "empty" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2"
            onClick={() => setViewState("empty")}
          >
            Empty
          </Button>
          <Button
            variant={viewState === "error" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2"
            onClick={() => setViewState("error")}
          >
            Error
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-primary">
            Verified Alumni Directory
          </h1>
          <p className="text-xs sm:text-sm text-secondary max-w-2xl">
            Search and connect with authenticated alumni across engineering departments and global technology employers.
          </p>
        </div>
        <div className="text-xs font-mono text-secondary hidden sm:block">
          Showing <span className="font-bold text-primary">{filteredAlumni.length}</span> of {MOCK_ALUMNI.length} Verified Mentors
        </div>
      </div>

      {/* FILTER CONTROLS BAR (RESPONSIVE COLLAPSIBLE ON SMALL SCREENS, DENSE ON LARGE) */}
      <div className="border border-border rounded-md bg-surface p-4 sm:p-5 space-y-4 shadow-subtle">
        {/* Search bar with mobile filter toggle button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-secondary" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, company, role, or technical skill..."
              className="pl-9 h-10 text-xs sm:text-sm"
            />
          </div>
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            className="sm:hidden h-10 px-3 gap-1.5 text-xs shrink-0"
            onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
          >
            <SlidersHorizontal className="w-4 h-4 text-secondary" />
            <span>Filters</span>
          </Button>
        </div>

        {/* Quick Horizontal Skill Chips for 1-Tap Mobile & Laptop Filtering */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
          <span className="text-[11px] font-mono text-secondary shrink-0 mr-1 hidden sm:inline">
            Quick Skills:
          </span>
          <button
            onClick={() => setSelectedSkill("ALL")}
            className={`px-2.5 py-1 rounded-sm text-[11px] shrink-0 border transition-colors ${
              selectedSkill === "ALL"
                ? "bg-primary text-white border-primary font-medium"
                : "bg-[#F8F8F5] text-secondary border-border hover:text-primary"
            }`}
          >
            All
          </button>
          {allSkills.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSkill(s)}
              className={`px-2.5 py-1 rounded-sm text-[11px] shrink-0 border transition-colors ${
                selectedSkill === s
                  ? "bg-accent text-white border-accent font-medium"
                  : "bg-[#F8F8F5] text-secondary border-border hover:text-primary"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Multi-attribute Filter Selects (Always open on Foldables/Laptops/Monitors; Collapsible on 6.1"-6.8" Phones) */}
        <div className={`${mobileFiltersExpanded ? "block" : "hidden sm:grid"} grid-cols-2 md:grid-cols-4 2xl:grid-cols-4 gap-3 text-xs pt-1`}>
          <div>
            <label className="text-[11px] font-semibold text-secondary mb-1 block">
              Academic Department
            </label>
            <Select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="h-8 text-xs"
            >
              <option value="ALL">All Departments</option>
              {ALLOWED_DEPARTMENTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-secondary mb-1 block">
              Graduation Batch
            </label>
            <Select
              value={selectedGradYear}
              onChange={(e) => setSelectedGradYear(e.target.value)}
              className="h-8 text-xs"
            >
              <option value="ALL">All Batches</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2021">2021</option>
            </Select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-secondary mb-1 block">
              Skill Taxonomy
            </label>
            <Select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="h-8 text-xs"
            >
              <option value="ALL">All Skills</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-secondary mb-1 block">
              Current Employer
            </label>
            <Select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="h-8 text-xs"
            >
              <option value="ALL">All Companies</option>
              {allCompanies.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
          </div>
        </div>

        {/* Reset Filter Action */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
            <span className="text-secondary font-mono text-[11px]">
              Found {filteredAlumni.length} matching alumni
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="text-[11px] h-7 gap-1 text-secondary hover:text-primary"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All Filters
            </Button>
          </div>
        )}
      </div>

      {/* ERROR STATE */}
      {viewState === "error" && (
        <Alert variant="error" title="Directory Query Error">
          Failed to query the verified alumni registry. In production, Supabase PostgreSQL RLS verifies caller identity before returning catalog items.
        </Alert>
      )}

      {/* LOADING SKELETON STATE (SCALED TO RESPONSIVE GRID) */}
      {viewState === "loading" && (
        <div className="grid grid-cols-1 foldable:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 desktop:grid-cols-4 qhd:grid-cols-4 ultrawide:grid-cols-5 superwide:grid-cols-6 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="w-12 h-12 rounded-sm shrink-0" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
              <Skeleton className="h-14 w-full" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {viewState === "empty" || (viewState === "normal" && filteredAlumni.length === 0) ? (
        <div className="border border-border rounded-md bg-surface p-8 sm:p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-sm bg-[#F2F2EC] text-secondary flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-primary">
              No verified alumni found
            </h3>
            <p className="text-xs text-secondary max-w-sm mx-auto">
              No alumni match your current search query or combination of filters. Try broadening your criteria.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={handleResetFilters} className="text-xs">
            Clear All Filters
          </Button>
        </div>
      ) : null}

      {/* NORMAL RESULTS GRID (FLUID SCALE: 1 COL MOBILE -> 2 FOLDABLE -> 3 LAPTOP -> 4 DESKTOP -> 5-6 ULTRAWIDE) */}
      {viewState === "normal" && filteredAlumni.length > 0 && (
        <div className="grid grid-cols-1 foldable:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 desktop:grid-cols-4 qhd:grid-cols-4 ultrawide:grid-cols-5 superwide:grid-cols-6 gap-4 sm:gap-6">
          {filteredAlumni.map((alum) => (
            <Card
              key={alum.id}
              className="p-4 sm:p-5 flex flex-col justify-between hover:border-primary transition-all duration-150 space-y-4"
            >
              <div className="space-y-3">
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-sm bg-accent text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {alum.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-primary leading-tight">
                        {alum.full_name}
                      </h3>
                      <p className="text-xs text-secondary leading-tight mt-0.5">
                        {alum.current_role}
                      </p>
                    </div>
                  </div>
                  <Badge variant="verified" className="text-[9px] gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                </div>

                {/* Company & Department Metadata */}
                <div className="space-y-1 text-xs text-secondary border-t border-border/60 pt-2.5">
                  <div className="flex items-center gap-1.5 font-medium text-primary">
                    <Building2 className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span className="truncate">{alum.current_company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <GraduationCap className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>
                      {alum.department_code} &bull; Class of {alum.graduation_year}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span>{alum.location_city}, India</span>
                  </div>
                </div>

                {/* Bio snippet */}
                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                  {alum.bio}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {alum.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-sm bg-[#F8F8F5] border border-border text-[10px] text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                  {alum.skills.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded-sm bg-transparent text-[10px] text-secondary">
                      +{alum.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Privacy Footer & Action */}
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono text-secondary flex items-center gap-1">
                  <Lock className="w-3 h-3 text-secondary shrink-0" />
                  Email Masked
                </span>
                <Button size="sm" variant="secondary" className="text-xs h-8 px-2.5 sm:px-3">
                  Request Mentorship
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
