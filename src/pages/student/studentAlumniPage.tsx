import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  ShieldCheck,
  Building2,
  MapPin,
  GraduationCap,
  CheckCircle2,
  X,
} from "lucide-react";
import { MOCK_ALUMNI } from "../../lib/mockData";
import { UserProfile } from "../../lib/types";
import { useMentorship } from "../../context/mentorshipContext";

export default function StudentAlumniPage() {
  const { createMentorshipRequest } = useMentorship();
  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [connectedIds, setConnectedIds] = useState<string[]>([]);
  const [selectedAlum, setSelectedAlum] = useState<UserProfile | null>(null);
  const [mentorshipTopic, setMentorshipTopic] = useState("System Design");
  const [mentorshipNote, setMentorshipNote] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  const filteredAlumni = useMemo(() => {
    return MOCK_ALUMNI.filter((alum) => {
      const matchesSearch =
        search === "" ||
        alum.full_name.toLowerCase().includes(search.toLowerCase()) ||
        alum.current_company?.toLowerCase().includes(search.toLowerCase()) ||
        alum.headline?.toLowerCase().includes(search.toLowerCase()) ||
        alum.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesDept =
        departmentFilter === "all" || alum.department_code === departmentFilter;

      return matchesSearch && matchesDept;
    });
  }, [search, departmentFilter]);

  const handleConnect = (id: string) => {
    setConnectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSendMentorshipRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAlum) return;

    await createMentorshipRequest({
      alumniId: selectedAlum.id,
      alumniName: selectedAlum.full_name,
      alumniRoleTitle: selectedAlum.current_role || "Alumni Mentor",
      alumniCompany: selectedAlum.current_company || "Alumnux Network",
      topic: mentorshipTopic,
      introductoryMessage: mentorshipNote.trim() || `Interested in mentorship on ${mentorshipTopic}.`,
      preferredCadence: "Bi-weekly Check-in",
    });

    setRequestSent(true);
    setTimeout(() => {
      setRequestSent(false);
      setSelectedAlum(null);
      setMentorshipNote("");
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Alumni Directory
          </h1>
          <p className="text-xs text-secondary">
            Connect with verified alumni across software, cloud, and core engineering industries.
          </p>
        </div>
        <Badge variant="outline" className="text-xs self-start sm:self-auto font-mono">
          {MOCK_ALUMNI.length} Verified Alumni
        </Badge>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-surface border border-border rounded-md p-4 shadow-subtle flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, company (Google, AWS, Stripe), or skill..."
            className="pl-9 h-9 text-xs bg-[#F8F8F5] border-border"
          />
        </div>

        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
          className="h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">All Departments</option>
          <option value="CSE">Computer Science (CSE)</option>
          <option value="IT">Information Tech (IT)</option>
          <option value="ECE">Electronics (ECE)</option>
          <option value="AIDS">AI &amp; Data Science</option>
          <option value="MECH">Mechanical (MECH)</option>
        </select>
      </div>

      {/* Grid of Alumni */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAlumni.map((alum) => {
          const isConnected = connectedIds.includes(alum.id);
          return (
            <div
              key={alum.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-accent text-white font-bold text-sm flex items-center justify-center shrink-0">
                      {alum.full_name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div>
                      <h2 className="font-bold text-sm text-primary flex items-center gap-1.5">
                        <span>{alum.full_name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                      </h2>
                      <p className="text-[11px] text-accent font-medium line-clamp-1">
                        {alum.headline}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-secondary space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-primary">
                    <Building2 className="w-3.5 h-3.5 text-secondary" />
                    <span>{alum.current_company}</span>
                    <span>&bull;</span>
                    <span className="text-secondary">{alum.current_role}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-secondary" />
                    <span>{alum.department_name} ({alum.graduation_year})</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                    <span>{alum.location_city}, {alum.location_country}</span>
                  </div>
                </div>

                <p className="text-xs text-secondary line-clamp-2 leading-relaxed">
                  {alum.bio}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {alum.skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#F8F8F5] border border-border text-secondary font-mono"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Button
                  size="sm"
                  variant={isConnected ? "outline" : "secondary"}
                  onClick={() => handleConnect(alum.id)}
                  className="text-xs h-8 flex-1"
                >
                  {isConnected ? "Connected" : "Connect"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => setSelectedAlum(alum)}
                  className="text-xs h-8 flex-1 gap-1"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Request Mentorship</span>
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mentorship Request Dialog */}
      {selectedAlum && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-md max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <h3 className="font-bold text-sm text-primary">
                  Request Mentorship with {selectedAlum.full_name}
                </h3>
                <p className="text-xs text-secondary">
                  {selectedAlum.current_role} @ {selectedAlum.current_company}
                </p>
              </div>
              <button
                onClick={() => setSelectedAlum(null)}
                className="p-1 rounded-sm border border-border text-secondary hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {requestSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm space-y-2 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="text-xs font-semibold">Mentorship Request Sent (Demo)</p>
                <p className="text-[11px] text-emerald-800">
                  {selectedAlum.full_name} will receive your request in their Alumni dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendMentorshipRequest} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-primary">
                    Guidance Topic
                  </label>
                  <select
                    value={mentorshipTopic}
                    onChange={(e) => setMentorshipTopic(e.target.value)}
                    className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none"
                  >
                    <option value="System Design">System Design &amp; Architecture</option>
                    <option value="Resume Review">Resume &amp; Portfolio Critique</option>
                    <option value="Off-Campus Referral">Off-Campus Referral Discussion</option>
                    <option value="Mock Interview">Mock Technical Interview</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-primary">
                    Personalized Note
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={mentorshipNote}
                    onChange={(e) => setMentorshipNote(e.target.value)}
                    placeholder="Briefly describe your background and what specific advice you are looking for..."
                    className="w-full rounded-sm border border-border bg-[#F8F8F5] p-2.5 text-xs text-primary focus:outline-none resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAlum(null)}
                    className="text-xs"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm" className="text-xs">
                    Send Request
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
