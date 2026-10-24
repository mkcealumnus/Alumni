import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Building2, CheckCircle2, Trash2 } from "lucide-react";
import { DEMO_CAREER_OPPORTUNITIES, CareerOpportunity } from "../../data/demoData";

export default function AlumniOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<CareerOpportunity[]>(
    DEMO_CAREER_OPPORTUNITIES.filter((o) => o.postedByName === "Jordan Vance")
  );

  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [org, setOrg] = useState("Stripe");
  const [type, setType] = useState<"Full-time" | "Internship" | "Referral">("Referral");
  const [location, setLocation] = useState("Bengaluru (Hybrid)");
  const [desc, setDesc] = useState("");
  const [comp, setComp] = useState("₹18,00,000 - ₹24,00,000 (Sample)");
  const [successNotice, setSuccessNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newOpp: CareerOpportunity = {
      id: `opp-${Date.now()}`,
      title: title.trim(),
      organization: org.trim(),
      location: location.trim(),
      workMode: "Hybrid",
      opportunityType: type,
      departmentTag: "CSE / IT",
      description: desc.trim() || "Early career opportunity shared by Jordan Vance.",
      requirements: ["Strong data structures and algorithms", "Curiosity to learn"],
      compensation: comp.trim(),
      postedByName: "Jordan Vance",
      postedByRole: "Staff Platform Engineer",
      postedByCompany: "Stripe",
      postedByYear: 2018,
      postedDate: "Just now",
      deadline: "Rolling Demo",
      isDemo: true,
      tags: ["Engineering", type, "Stripe"],
    };

    setOpportunities([newOpp, ...opportunities]);
    setFormOpen(false);
    setTitle("");
    setDesc("");
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);
  };

  const handleDelete = (id: string) => {
    setOpportunities(opportunities.filter((o) => o.id !== id));
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            My Shared Opportunities &amp; Referrals
          </h1>
          <p className="text-xs text-secondary">
            Manage your posted vacancies, employee referrals, and internship opportunities for students.
          </p>
        </div>
        <Button
          onClick={() => setFormOpen(true)}
          size="sm"
          className="text-xs gap-1.5 shadow-subtle self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Post New Opportunity</span>
        </Button>
      </div>

      {successNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Opportunity posted and published to the student career board!</span>
        </div>
      )}

      {/* New Opportunity Creation Form */}
      {formOpen && (
        <div className="bg-surface border-2 border-accent/40 rounded-md p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <h2 className="font-bold text-sm text-primary">Share Opportunity Details</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFormOpen(false)}
              className="text-xs h-7"
            >
              Cancel
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary">Role Title *</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Junior Backend Engineer (Go)"
                  className="h-9 text-xs bg-[#F8F8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary">Company / Org *</label>
                <Input
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="e.g. Stripe"
                  className="h-9 text-xs bg-[#F8F8F5]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary">Type</label>
                <select
                  value={type}
                  onChange={(e) =>
                    setType(e.target.value as "Full-time" | "Internship" | "Referral")
                  }
                  className="w-full h-9 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary"
                >
                  <option value="Referral">Alumni Referral</option>
                  <option value="Full-time">Full-time Job</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary">Location</label>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Bengaluru (Hybrid)"
                  className="h-9 text-xs bg-[#F8F8F5]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-primary">Sample Comp / Stipend</label>
                <Input
                  value={comp}
                  onChange={(e) => setComp(e.target.value)}
                  placeholder="e.g. ₹18,00,000 CTC"
                  className="h-9 text-xs bg-[#F8F8F5]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-primary">Role Overview &amp; Criteria</label>
              <textarea
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Describe role responsibilities, tech stack, and referral guidelines..."
                className="w-full rounded-sm border border-border bg-[#F8F8F5] p-2.5 text-xs text-primary focus:outline-none resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-border">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormOpen(false)}
                className="text-xs"
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="text-xs">
                Publish Listing
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grid of Shared Listings */}
      <div className="space-y-4">
        {opportunities.map((opp) => (
          <div
            key={opp.id}
            className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] uppercase font-mono">
                  {opp.opportunityType}
                </Badge>
                <span className="text-[11px] font-mono text-secondary">
                  Posted {opp.postedDate}
                </span>
                <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px] font-mono border border-emerald-200">
                  Active Demo
                </span>
              </div>
              <h2 className="font-bold text-sm sm:text-base text-primary">
                {opp.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-secondary">
                <Building2 className="w-3.5 h-3.5 text-accent" />
                <span>{opp.organization}</span>
                <span>&bull;</span>
                <span>{opp.location}</span>
                <span>&bull;</span>
                <span className="font-mono">{opp.compensation}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right text-xs font-mono text-secondary hidden sm:block">
                <div>14 Student Views</div>
                <div>3 Referral Inquiries</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(opp.id)}
                className="text-xs text-secondary hover:text-red-600 border-border h-8"
                title="Remove listing"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
