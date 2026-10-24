import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs -ml-2 text-secondary">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono text-[10px]">
            DPDP Act 2023 Compliance
          </Badge>
          <Badge variant="verified" className="font-mono text-[10px]">
            Strict Data Custody
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Privacy Notice &amp; Evidence Retention Policy
        </h1>
        <p className="text-xs text-secondary font-mono">
          Last Updated: October 2026 &bull; Independent 3-Trustee Platform Governance
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-secondary space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">1. Independent Custodianship Statement</h2>
          <p>
            Alumnux (&ldquo;the Platform&rdquo;) is independently operated and maintained by three designated senior alumni members (&ldquo;Platform Trustees&rdquo;). Alumnux is not owned, operated, funded, or supervised by college management, academic faculty, or university placement cells. Your personal data is never shared with college authorities without your explicit affirmative consent.
          </p>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">2. Identity Credentials &amp; Verification Documents</h2>
          <p>
            To protect community integrity, students are required to upload College ID cards and alumni are required to upload Anna University Degree Certificates.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Storage Isolation:</strong> All uploaded evidence is stored in private, non-public storage containers encrypted at rest.
            </li>
            <li>
              <strong>Ephemeral Access:</strong> Document scans are rendered for review solely via short-lived signed URLs (10-minute validity) exclusively accessible to the three designated administrators.
            </li>
            <li>
              <strong>No Email Transmission:</strong> Identity documents are never transmitted as unencrypted email attachments.
            </li>
          </ul>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">3. Retention &amp; Cryptographic Purge Schedule</h2>
          <p>
            In adherence to the Indian Digital Personal Data Protection (DPDP) Act 2023, data minimization is strictly observed:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Verified Accounts:</strong> Verification evidence files are automatically purged 30 calendar days following verification approval. Only the verified status flag and audit hash persist in the database.
            </li>
            <li>
              <strong>Rejected Accounts:</strong> Files are purged after 14 days to allow for remediation and resubmission.
            </li>
            <li>
              <strong>Account Deletion:</strong> Any member may request complete account deletion at any time, which permanently removes their profile and all associated data.
            </li>
          </ul>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">4. Privacy-Aware Directory Display</h2>
          <p>
            Alumni contact details (personal email, phone number) are masked by default across public and directory views. Direct communication occurs exclusively via structured in-platform mentorship requests to prevent unauthorized harvesting.
          </p>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">5. Grievance &amp; Data Protection Officer</h2>
          <p>
            For data protection inquiries, deletion requests, or grievances, contact the Trustee Governance Lead at: <span className="font-mono text-accent">privacy@alumnux.org</span>.
          </p>
        </section>
      </div>
    </div>
  );
}
