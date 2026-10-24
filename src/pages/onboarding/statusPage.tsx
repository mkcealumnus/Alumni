
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { VerificationStatus } from "@/lib/types";

export default function VerificationStatusPage() {
  const [currentStatus, setCurrentStatus] = useState<VerificationStatus>("pending");

  return (
    <div className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      {/* Interactive Prototype State Switcher */}
      <div className="p-3 bg-[#F2F2EC] border border-border rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 font-mono text-secondary">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>INSPECT VERIFICATION STATES:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <Button
            variant={currentStatus === "pending" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2.5"
            onClick={() => setCurrentStatus("pending")}
          >
            Pending
          </Button>
          <Button
            variant={currentStatus === "needs_review" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2.5"
            onClick={() => setCurrentStatus("needs_review")}
          >
            Needs Review
          </Button>
          <Button
            variant={currentStatus === "verified" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2.5"
            onClick={() => setCurrentStatus("verified")}
          >
            Verified
          </Button>
          <Button
            variant={currentStatus === "rejected" ? "primary" : "outline"}
            size="sm"
            className="text-[11px] h-7 px-2.5"
            onClick={() => setCurrentStatus("rejected")}
          >
            Rejected
          </Button>
        </div>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent" />
              <CardTitle>Academic Verification Status</CardTitle>
            </div>
            {currentStatus === "pending" && (
              <Badge variant="pending" className="gap-1 font-mono text-xs">
                <Clock className="w-3.5 h-3.5" />
                In Review Queue
              </Badge>
            )}
            {currentStatus === "needs_review" && (
              <Badge variant="needs_review" className="gap-1 font-mono text-xs">
                <AlertTriangle className="w-3.5 h-3.5" />
                Action Required
              </Badge>
            )}
            {currentStatus === "verified" && (
              <Badge variant="verified" className="gap-1 font-mono text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Identity Verified
              </Badge>
            )}
            {currentStatus === "rejected" && (
              <Badge variant="rejected" className="gap-1 font-mono text-xs">
                <XCircle className="w-3.5 h-3.5" />
                Rejected
              </Badge>
            )}
          </div>
          <CardDescription>
            Application Reference: <span className="font-mono text-primary font-semibold">REQ-2026-CSE-1042</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* STATE 1: PENDING */}
          {currentStatus === "pending" && (
            <div className="space-y-4">
              <Alert variant="info" title="Under Review by Senior Alumni Trustees">
                Your academic documents have been encrypted and queued for manual inspection by one of the three designated senior alumni trustees.
              </Alert>

              <div className="p-4 border border-border rounded-md bg-[#F8F8F5] space-y-3 text-xs">
                <h4 className="font-semibold text-primary">Verification Checklist</h4>
                <div className="space-y-2 text-secondary">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-semantic-success" />
                    <span>Credentials received and cryptographic checksum stored</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Awaiting trustee inspection (Average turnaround: 24–48 hours)</span>
                  </div>
                  <div className="flex items-center gap-2 text-secondary/60">
                    <div className="w-4 h-4 rounded-full border border-border flex items-center justify-center text-[10px]">3</div>
                    <span>Verified badge issuance and access activation</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-surface border border-border rounded-sm text-[11px] text-secondary">
                <strong>Notification:</strong> You will receive an in-app alert and confirmation upon resolution. No action is needed while review is in progress.
              </div>
            </div>
          )}

          {/* STATE 2: NEEDS REVIEW */}
          {currentStatus === "needs_review" && (
            <div className="space-y-4">
              <Alert variant="warning" title="Document Resubmission Requested">
                The reviewer noted a minor discrepancy or blur on your uploaded document scan. Please address the feedback below and upload updated images.
              </Alert>

              <div className="p-4 border border-semantic-warning-border rounded-md bg-semantic-warning-subtle space-y-2 text-xs">
                <h4 className="font-semibold text-semantic-warning">Reviewer Note from Trustee:</h4>
                <p className="text-primary italic leading-relaxed">
                  &ldquo;The uploaded College ID Card Back scan is cropped and the academic validity year seal is not readable. Please upload a full-frame photo in good lighting.&rdquo;
                </p>
                <p className="text-[11px] text-secondary font-mono pt-1">
                  Reviewed by Trustee 1 (Arunachalam S.) on Oct 24, 2026.
                </p>
              </div>

              <div className="pt-2">
                <Link to="/onboardingStudent">
                  <Button className="w-full gap-2 text-xs font-semibold">
                    <RotateCcw className="w-4 h-4" />
                    Resubmit Updated ID Scan
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* STATE 3: VERIFIED */}
          {currentStatus === "verified" && (
            <div className="space-y-5">
              <Alert variant="success" title="Verification Complete!">
                Your academic credentials have been verified by the senior alumni trustees. Your profile now carries the verified community badge.
              </Alert>

              <div className="p-5 border border-semantic-success-border rounded-md bg-semantic-success-subtle space-y-3 text-xs">
                <div className="flex items-center gap-2 font-semibold text-semantic-success text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  Full Network Capabilities Unlocked
                </div>
                <ul className="space-y-1.5 text-primary">
                  <li>&bull; Connect 1-on-1 with alumni mentors across leading tech companies</li>
                  <li>&bull; Access off-campus internship and full-time referral opportunities</li>
                  <li>&bull; RSVP for exclusive live alumni AMAs and career masterclasses</li>
                  <li>&bull; Request personalized resume feedback and mock interviews</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link to="/portalStudent">
                  <Button className="w-full gap-2 text-xs font-semibold">
                    Go to Student Hub
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/directory">
                  <Button variant="secondary" className="w-full text-xs">
                    Browse Alumni Directory
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* STATE 4: REJECTED */}
          {currentStatus === "rejected" && (
            <div className="space-y-4">
              <Alert variant="error" title="Application Disqualified">
                Your verification request could not be approved due to non-compliance with the Alumnux Verification Policy.
              </Alert>

              <div className="p-4 border border-semantic-error-border rounded-md bg-semantic-error-subtle space-y-2 text-xs">
                <h4 className="font-semibold text-semantic-error">Reason for Disqualification:</h4>
                <p className="text-primary italic leading-relaxed">
                  &ldquo;The uploaded credential appears to be an unauthenticated third-party receipt rather than an official Anna University degree certificate or valid college ID.&rdquo;
                </p>
                <p className="text-[11px] text-secondary font-mono pt-1">
                  Reference: AUDIT-DISQ-9481 &bull; DPDP Data Retention: Purged in 14 days.
                </p>
              </div>

              <div className="p-3 bg-surface border border-border rounded-sm text-xs text-secondary space-y-1">
                <p className="font-medium text-primary">Believe this was an error?</p>
                <p>
                  You may contact the senior alumni trustees at <span className="font-mono text-accent">trustees@alumnux.org</span> with your reference ID to initiate an appeal.
                </p>
              </div>
            </div>
          )}

          {/* DPDP Retention Schedule Note */}
          <div className="pt-4 border-t border-border flex items-center justify-between text-[11px] text-secondary font-mono">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-primary" />
              DPDP Retention: 30-day purge schedule
            </span>
            <span>Non-Institutional Review</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
