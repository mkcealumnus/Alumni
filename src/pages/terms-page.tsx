import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <div className="space-y-3">
        <Link to="/">
          <Button variant="ghost" size="sm" className="gap-1.5 text-xs -ml-2 text-secondary">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Home
          </Button>
        </Link>
        <Badge variant="outline" className="font-mono text-[10px]">
          Alumnux Terms of Service
        </Badge>
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Terms of Service &amp; Community Charter
        </h1>
        <p className="text-xs text-secondary font-mono">
          Effective Date: October 2026 &bull; Independent Self-Governed Platform
        </p>
      </div>

      <div className="prose prose-sm max-w-none text-secondary space-y-6 text-xs sm:text-sm leading-relaxed">
        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">1. Operational Independence &amp; Disclaimer</h2>
          <p>
            Alumnux is an independently established career guidance platform operated exclusively by three designated senior alumni members acting in their individual capacities as community trustees. Alumnux is not authorized by, endorsed by, or affiliated with the formal college administration or any educational institution. Use of the platform implies acknowledgment of its independent community status.
          </p>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">2. Truthfulness of Verification Credentials</h2>
          <p>
            Members agree to provide authentic, unaltered academic documents (College ID cards for students; Anna University degree certificates for alumni). Submission of fraudulent, forged, altered, or impersonated identity documents results in immediate permanent expulsion, reporting to relevant professional associations, and permanent ban across all associated IP addresses.
          </p>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">3. Mentorship &amp; Conduct Rules</h2>
          <p>
            All mentorship sessions, feedback conversations, and referral exchanges must remain respectful, professional, and career-focused. Commercial solicitation, harassment, unapproved marketing, or solicitation of paid academic work is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2 border-t border-border pt-4">
          <h2 className="text-base font-semibold text-primary">4. Limitation of Liability</h2>
          <p>
            Mentorship advice, interview preparation guidelines, and job postings are shared in good faith by verified alumni volunteers. Alumnux and its trustees do not guarantee employment, internship offers, or compensation outcomes.
          </p>
        </section>
      </div>
    </div>
  );
}
