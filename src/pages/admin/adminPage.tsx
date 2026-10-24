
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  ShieldCheck,
  FileText,
  Lock,
  Eye,
  Briefcase,
  Calendar,
  ScrollText,
} from "lucide-react";
import { MOCK_VERIFICATION_QUEUE, MOCK_JOBS, MOCK_EVENTS, MOCK_AUDIT_LOGS } from "@/lib/mockData";
import { VerificationQueueItem, VerificationStatus } from "@/lib/types";

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<"verifications" | "jobs" | "events" | "audit">("verifications");
  const [reviewFilter, setReviewFilter] = useState<"all" | "student" | "alumni">("all");
  const [queue, setQueue] = useState<VerificationQueueItem[]>(MOCK_VERIFICATION_QUEUE);

  // Selected item for review (used in modal on smaller screens, and in persistent side pane on 21.5"+ / ultrawide screens)
  const [selectedItem, setSelectedItem] = useState<VerificationQueueItem | null>(queue[0] || null);
  const [decisionModalOpen, setDecisionModalOpen] = useState(false);
  const [decisionReason, setDecisionReason] = useState("");
  const [decisionAction, setDecisionAction] = useState<VerificationStatus>("verified");
  const [activeTrustee, setActiveTrustee] = useState("Trustee 1: Arunachalam S. (Infra Lead)");

  const handleOpenReview = (item: VerificationQueueItem) => {
    setSelectedItem(item);
    setDecisionAction("verified");
    setDecisionReason("");
    setDecisionModalOpen(true);
  };

  const handleSelectForSplitView = (item: VerificationQueueItem) => {
    setSelectedItem(item);
    setDecisionAction("verified");
    setDecisionReason("");
  };

  const handleApplyDecision = () => {
    if (!selectedItem) return;
    setQueue((prev) =>
      prev.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              status: decisionAction,
              rejection_reason: decisionAction !== "verified" ? decisionReason : undefined,
            }
          : item
      )
    );
    setDecisionModalOpen(false);
  };

  const filteredQueue = queue.filter(
    (item) => reviewFilter === "all" || item.account_type === reviewFilter
  );

  return (
    <div className="max-w-[320rem] mx-auto px-4 sm:px-6 md:px-8 2xl:px-10 desktop:px-12 ultrawide:px-20 superwide:px-32 py-6 sm:py-8 space-y-6 sm:space-y-8">
      {/* 1. INDEPENDENT TRUSTEE HEADER BANNER */}
      <div className="border border-border rounded-md bg-[#171717] text-white p-5 sm:p-6 md:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#333]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-mono text-xs text-[#D8D8D2]">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>SENIOR ALUMNI TRUSTEE ADMINISTRATION CONSOLE</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
              Platform Integrity &amp; Verification Center
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#A8A8A0] hidden sm:inline">Active Trustee:</span>
            <Select
              value={activeTrustee}
              onChange={(e) => setActiveTrustee(e.target.value)}
              className="bg-[#262626] border-[#404040] text-white text-xs h-8 max-w-[260px]"
            >
              <option value="Trustee 1: Arunachalam S. (Infra Lead)">
                Arunachalam S. (Trustee 1)
              </option>
              <option value="Trustee 2: Deepika Sundaram (Product Lead)">
                Deepika Sundaram (Trustee 2)
              </option>
              <option value="Trustee 3: Venkatesh Raman (Governance Lead)">
                Venkatesh Raman (Trustee 3)
              </option>
            </Select>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#A8A8A0] leading-relaxed max-w-5xl">
          Independent governance remit: Exclusive authority over academic verification queues, community moderation, and DPDP-compliant data custody. No college management or faculty operational access.
        </p>

        {/* Metric Summary Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
          <div className="p-3 bg-[#262626] rounded-sm border border-[#333]">
            <span className="text-[10px] font-mono uppercase text-[#888] block">Pending Reviews</span>
            <span className="text-xl sm:text-2xl font-bold text-white font-mono">
              {queue.filter((q) => q.status === "pending").length}
            </span>
          </div>
          <div className="p-3 bg-[#262626] rounded-sm border border-[#333]">
            <span className="text-[10px] font-mono uppercase text-[#888] block">Needs Clarification</span>
            <span className="text-xl sm:text-2xl font-bold text-semantic-warning font-mono">
              {queue.filter((q) => q.status === "needs_review").length}
            </span>
          </div>
          <div className="p-3 bg-[#262626] rounded-sm border border-[#333]">
            <span className="text-[10px] font-mono uppercase text-[#888] block">Active Verified Alumni</span>
            <span className="text-xl sm:text-2xl font-bold text-semantic-success font-mono">148</span>
          </div>
          <div className="p-3 bg-[#262626] rounded-sm border border-[#333]">
            <span className="text-[10px] font-mono uppercase text-[#888] block">Audit Log Events</span>
            <span className="text-xl sm:text-2xl font-bold text-[#D8D8D2] font-mono">
              {MOCK_AUDIT_LOGS.length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. TABBED CONSOLE CONTROLS */}
      <div className="flex border-b border-border text-xs font-medium space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab("verifications")}
          className={`pb-3 px-3 sm:px-4 flex items-center gap-1.5 transition-colors border-b-2 shrink-0 ${
            activeTab === "verifications"
              ? "border-accent text-primary font-semibold"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-accent" />
          Verification Queue ({queue.length})
        </button>
        <button
          onClick={() => setActiveTab("jobs")}
          className={`pb-3 px-3 sm:px-4 flex items-center gap-1.5 transition-colors border-b-2 shrink-0 ${
            activeTab === "jobs"
              ? "border-accent text-primary font-semibold"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <Briefcase className="w-4 h-4 text-secondary" />
          Job Moderation ({MOCK_JOBS.length})
        </button>
        <button
          onClick={() => setActiveTab("events")}
          className={`pb-3 px-3 sm:px-4 flex items-center gap-1.5 transition-colors border-b-2 shrink-0 ${
            activeTab === "events"
              ? "border-accent text-primary font-semibold"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <Calendar className="w-4 h-4 text-secondary" />
          Event Management ({MOCK_EVENTS.length})
        </button>
        <button
          onClick={() => setActiveTab("audit")}
          className={`pb-3 px-3 sm:px-4 flex items-center gap-1.5 transition-colors border-b-2 shrink-0 ${
            activeTab === "audit"
              ? "border-accent text-primary font-semibold"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <ScrollText className="w-4 h-4 text-secondary" />
          Immutable Audit Trail
        </button>
      </div>

      {/* 3. VERIFICATION QUEUE CONTENT (WITH DUAL-PANE WORKSTATION MODE ON DESKTOP & ULTRAWIDE) */}
      {activeTab === "verifications" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-secondary">Filter Queue:</span>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  variant={reviewFilter === "all" ? "primary" : "outline"}
                  size="sm"
                  className="text-[11px] h-7 px-2.5"
                  onClick={() => setReviewFilter("all")}
                >
                  All Submissions
                </Button>
                <Button
                  variant={reviewFilter === "student" ? "primary" : "outline"}
                  size="sm"
                  className="text-[11px] h-7 px-2.5"
                  onClick={() => setReviewFilter("student")}
                >
                  Students
                </Button>
                <Button
                  variant={reviewFilter === "alumni" ? "primary" : "outline"}
                  size="sm"
                  className="text-[11px] h-7 px-2.5"
                  onClick={() => setReviewFilter("alumni")}
                >
                  Alumni
                </Button>
              </div>
            </div>

            <span className="text-[11px] font-mono text-secondary">
              DPDP Storage: Ephemeral 600s signed URLs active
            </span>
          </div>

          {/* DUAL PANE CONTAINER: Stacks on Mobile/Laptop (< 1920px), Side-by-Side on Desktop/Ultrawide (>= 1920px) */}
          <div className="grid grid-cols-1 desktop:grid-cols-12 ultrawide:grid-cols-12 gap-6 items-start">
            {/* Left Pane (Table Queue) */}
            <div className="desktop:col-span-7 ultrawide:col-span-7 space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Role &amp; Academic Dept</TableHead>
                    <TableHead className="hidden sm:table-cell">Evidence Scans</TableHead>
                    <TableHead className="hidden md:table-cell">Submitted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredQueue.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                      <TableRow
                        key={item.id}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? "bg-accent-subtle/50 border-l-2 border-l-accent" : ""
                        }`}
                        onClick={() => handleSelectForSplitView(item)}
                      >
                        <TableCell>
                          <div className="font-semibold text-xs text-primary">
                            {item.full_name}
                          </div>
                          <div className="text-[11px] text-secondary font-mono truncate max-w-[140px] sm:max-w-none">
                            {item.email}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="capitalize text-xs font-medium text-primary">
                            {item.account_type} &bull; {item.department_code} ({item.graduation_year})
                          </div>
                          {item.roll_number && (
                            <div className="text-[11px] text-secondary font-mono">
                              Reg: {item.roll_number}
                            </div>
                          )}
                          {item.current_company && (
                            <div className="text-[11px] text-secondary truncate max-w-[160px]">
                              {item.current_role} @ {item.current_company}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <div className="space-y-1">
                            {item.evidence.map((ev) => (
                              <div
                                key={ev.id}
                                className="flex items-center gap-1.5 text-[11px] text-secondary"
                              >
                                <FileText className="w-3.5 h-3.5 text-accent shrink-0" />
                                <span className="truncate max-w-[140px] font-mono">
                                  {ev.file_name}
                                </span>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-[11px] font-mono text-secondary hidden md:table-cell">
                          {new Date(item.submitted_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {item.status === "pending" && <Badge variant="pending">Pending</Badge>}
                          {item.status === "needs_review" && (
                            <Badge variant="needs_review">Needs Review</Badge>
                          )}
                          {item.status === "verified" && <Badge variant="verified">Verified</Badge>}
                          {item.status === "rejected" && <Badge variant="rejected">Rejected</Badge>}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenReview(item);
                            }}
                            className="text-[11px] h-7 gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Inspect</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            {/* Right Pane: Persistent Split-View Credential Workstation (Active on 21.5"+ Desktops & 34"-49" Ultrawides) */}
            <div className="hidden desktop:block desktop:col-span-5 ultrawide:col-span-5 sticky top-20">
              {selectedItem ? (
                <Card className="p-5 space-y-4 shadow-subtle border-border bg-surface">
                  <div className="flex items-center justify-between pb-3 border-b border-border">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-secondary block">
                        Dual-Pane Live Inspection Station
                      </span>
                      <h3 className="font-bold text-sm text-primary">
                        {selectedItem.full_name} ({selectedItem.account_type.toUpperCase()})
                      </h3>
                    </div>
                    <Badge variant={selectedItem.status as any} className="capitalize text-[10px]">
                      {selectedItem.status.replace("_", " ")}
                    </Badge>
                  </div>

                  {/* Metadata */}
                  <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-secondary block text-[11px]">Academic Dept:</span>
                      <span className="font-semibold text-primary">
                        {selectedItem.department_code} ({selectedItem.graduation_year})
                      </span>
                    </div>
                    {selectedItem.roll_number && (
                      <div>
                        <span className="text-secondary block text-[11px]">Register Number:</span>
                        <span className="font-mono text-primary font-semibold">
                          {selectedItem.roll_number}
                        </span>
                      </div>
                    )}
                    {selectedItem.current_company && (
                      <div className="col-span-2">
                        <span className="text-secondary block text-[11px]">Company &amp; Role:</span>
                        <span className="font-medium text-primary">
                          {selectedItem.current_role} @ {selectedItem.current_company}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Document Scans Frame */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block">
                      Submitted Credential Files (Private Bucket):
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedItem.evidence.map((ev) => (
                        <div
                          key={ev.id}
                          className="border border-border rounded-md p-2.5 bg-white space-y-1.5"
                        >
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="font-semibold text-primary capitalize truncate">
                              {ev.document_type.replace(/_/g, " ")}
                            </span>
                            <span className="text-secondary font-mono">
                              {(ev.file_size_bytes / 1024 / 1024).toFixed(1)}MB
                            </span>
                          </div>

                          <div className="h-24 bg-[#F2F2EC] border border-dashed border-border rounded-sm flex flex-col items-center justify-center p-2 text-center text-secondary">
                            <FileText className="w-6 h-6 text-accent mb-1" />
                            <span className="font-mono text-[9px] text-primary truncate max-w-full">
                              {ev.file_name}
                            </span>
                            <span className="text-[8px] text-secondary">
                              Encrypted Ephemeral Token
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Immediate 1-Click Decision Action Bar */}
                  <div className="pt-3 border-t border-border space-y-3">
                    <span className="text-[11px] font-semibold text-primary block">
                      Trustee Audit Decision:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setDecisionAction("verified")}
                        className={`p-2 rounded-sm border text-center transition-all ${
                          decisionAction === "verified"
                            ? "border-semantic-success bg-semantic-success-subtle text-semantic-success font-semibold"
                            : "border-border hover:bg-[#F2F2EC]"
                        }`}
                      >
                        Approve
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecisionAction("needs_review")}
                        className={`p-2 rounded-sm border text-center transition-all ${
                          decisionAction === "needs_review"
                            ? "border-semantic-warning bg-semantic-warning-subtle text-semantic-warning font-semibold"
                            : "border-border hover:bg-[#F2F2EC]"
                        }`}
                      >
                        Clarify
                      </button>
                      <button
                        type="button"
                        onClick={() => setDecisionAction("rejected")}
                        className={`p-2 rounded-sm border text-center transition-all ${
                          decisionAction === "rejected"
                            ? "border-semantic-error bg-semantic-error-subtle text-semantic-error font-semibold"
                            : "border-border hover:bg-[#F2F2EC]"
                        }`}
                      >
                        Reject
                      </button>
                    </div>

                    {decisionAction !== "verified" && (
                      <Input
                        value={decisionReason}
                        onChange={(e) => setDecisionReason(e.target.value)}
                        placeholder="State reason for clarification or rejection..."
                        className="text-xs h-8"
                      />
                    )}

                    <Button
                      size="sm"
                      variant={decisionAction === "verified" ? "primary" : "danger"}
                      onClick={handleApplyDecision}
                      disabled={decisionAction !== "verified" && !decisionReason.trim()}
                      className="w-full text-xs font-semibold"
                    >
                      Apply Decision &amp; Emit Audit Log
                    </Button>
                  </div>
                </Card>
              ) : (
                <div className="border border-border rounded-md bg-surface p-8 text-center text-secondary text-xs">
                  Select an applicant row to inspect credentials in dual-pane mode.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. JOB MODERATION TAB */}
      {activeTab === "jobs" && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-primary">
            Alumni Job &amp; Referral Moderation Queue
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title &amp; Company</TableHead>
                <TableHead className="hidden sm:table-cell">Posted By</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Moderation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_JOBS.map((job) => (
                <TableRow key={job.id}>
                  <TableCell>
                    <div className="font-semibold text-xs text-primary">{job.title}</div>
                    <div className="text-[11px] text-secondary">
                      {job.company} &bull; {job.location}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="text-xs text-primary font-medium">{job.posted_by_name}</div>
                    <div className="text-[11px] text-secondary">{job.posted_by_role}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs uppercase hidden md:table-cell">
                    {job.job_type.replace("_", " ")}
                  </TableCell>
                  <TableCell>
                    <Badge variant="verified">Approved &amp; Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" className="text-[11px] h-7">
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 5. EVENT MANAGEMENT TAB */}
      {activeTab === "events" && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-primary">
            Upcoming Career Sessions &amp; Masterclasses
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-3 gap-4">
            {MOCK_EVENTS.map((evt) => (
              <Card key={evt.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono">
                    {evt.event_type}
                  </Badge>
                  <span className="text-xs font-mono text-accent">{evt.start_time}</span>
                </div>
                <h4 className="font-semibold text-sm text-primary">{evt.title}</h4>
                <p className="text-xs text-secondary">{evt.description}</p>
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-secondary truncate">Speaker: {evt.speaker_name}</span>
                  <span className="font-mono text-primary shrink-0">{evt.registered_count} RSVPs</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 6. IMMUTABLE AUDIT TRAIL TAB */}
      {activeTab === "audit" && (
        <div className="space-y-4">
          <Alert variant="info" title="Append-Only Database Audit Log">
            Every administrative decision is permanently logged with administrator ID, timestamp, target entity, and rationale. Mutation and deletion of audit logs are prevented by PostgreSQL database triggers.
          </Alert>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Administrator</TableHead>
                <TableHead>Action</TableHead>
                <TableHead className="hidden sm:table-cell">Target Entity</TableHead>
                <TableHead>Details / Summary</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_AUDIT_LOGS.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell className="font-mono text-[11px] text-secondary">
                    {new Date(audit.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-medium text-xs text-primary">
                    {audit.admin_name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {audit.action}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-secondary hidden sm:table-cell">
                    {audit.target_entity}
                  </TableCell>
                  <TableCell className="text-xs text-primary">
                    {audit.summary}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* 7. VERIFICATION DECISION & EVIDENCE INSPECTION MODAL (FOR MOBILE, TABLETS & LAPTOPS) */}
      {selectedItem && (
        <Dialog
          open={decisionModalOpen}
          onOpenChange={setDecisionModalOpen}
          title={`Credential Audit: ${selectedItem.full_name}`}
          description={`Reviewing ${selectedItem.account_type.toUpperCase()} academic credentials. DPDP short-lived ephemeral token active.`}
        >
          <div className="space-y-5 text-xs">
            {/* Applicant metadata */}
            <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm grid grid-cols-2 gap-2">
              <div>
                <span className="text-secondary block">Applicant:</span>
                <span className="font-semibold text-primary">{selectedItem.full_name}</span>
              </div>
              <div>
                <span className="text-secondary block">Department &amp; Year:</span>
                <span className="font-semibold text-primary">
                  {selectedItem.department_code} ({selectedItem.graduation_year})
                </span>
              </div>
              {selectedItem.roll_number && (
                <div>
                  <span className="text-secondary block">Register Number:</span>
                  <span className="font-mono text-primary font-semibold">
                    {selectedItem.roll_number}
                  </span>
                </div>
              )}
              {selectedItem.current_company && (
                <div>
                  <span className="text-secondary block">Company &amp; Role:</span>
                  <span className="font-medium text-primary">
                    {selectedItem.current_role} @ {selectedItem.current_company}
                  </span>
                </div>
              )}
            </div>

            {/* Evidence previews */}
            <div className="space-y-2">
              <h4 className="font-semibold text-primary text-xs uppercase tracking-wider">
                Submitted Identity Credentials:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedItem.evidence.map((ev) => (
                  <div
                    key={ev.id}
                    className="border border-border rounded-md p-3 bg-white space-y-2"
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-primary capitalize">
                        {ev.document_type.replace(/_/g, " ")}
                      </span>
                      <Badge variant="outline" className="text-[9px]">
                        {(ev.file_size_bytes / 1024 / 1024).toFixed(1)} MB
                      </Badge>
                    </div>

                    <div className="h-28 bg-[#F2F2EC] border border-dashed border-border rounded-sm flex flex-col items-center justify-center p-2 text-center text-secondary">
                      <FileText className="w-7 h-7 text-accent mb-1" />
                      <span className="font-mono text-[10px] text-primary truncate max-w-full">
                        {ev.file_name}
                      </span>
                      <span className="text-[9px] text-secondary mt-0.5">
                        Encrypted Ephemeral Preview
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Decision Controls */}
            <div className="space-y-3 pt-3 border-t border-border">
              <h4 className="font-semibold text-primary">Trustee Verification Action</h4>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDecisionAction("verified")}
                  className={`p-2 rounded-sm border text-center transition-all ${
                    decisionAction === "verified"
                      ? "border-semantic-success bg-semantic-success-subtle text-semantic-success font-semibold"
                      : "border-border hover:bg-[#F2F2EC]"
                  }`}
                >
                  Approve
                </button>
                <button
                  type="button"
                  onClick={() => setDecisionAction("needs_review")}
                  className={`p-2 rounded-sm border text-center transition-all ${
                    decisionAction === "needs_review"
                      ? "border-semantic-warning bg-semantic-warning-subtle text-semantic-warning font-semibold"
                      : "border-border hover:bg-[#F2F2EC]"
                  }`}
                >
                  Clarify
                </button>
                <button
                  type="button"
                  onClick={() => setDecisionAction("rejected")}
                  className={`p-2 rounded-sm border text-center transition-all ${
                    decisionAction === "rejected"
                      ? "border-semantic-error bg-semantic-error-subtle text-semantic-error font-semibold"
                      : "border-border hover:bg-[#F2F2EC]"
                  }`}
                >
                  Reject
                </button>
              </div>

              {decisionAction !== "verified" && (
                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-primary">
                    Reason for {decisionAction === "needs_review" ? "Clarification Request" : "Rejection"}
                  </label>
                  <Input
                    value={decisionReason}
                    onChange={(e) => setDecisionReason(e.target.value)}
                    placeholder="Specify why document is incomplete, blurred, or invalid..."
                  />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDecisionModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant={decisionAction === "verified" ? "primary" : "danger"}
                onClick={handleApplyDecision}
                disabled={decisionAction !== "verified" && !decisionReason.trim()}
              >
                Apply Decision
              </Button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
