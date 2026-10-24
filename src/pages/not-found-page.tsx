import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full bg-surface border border-border p-8 rounded-sm text-center space-y-5">
        <div className="w-12 h-12 rounded-sm bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] mx-auto flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-primary">
            404 &mdash; Page Not Found
          </h1>
          <p className="text-xs text-secondary leading-relaxed">
            The page or resource you requested could not be located on the Alumnux network. It may have moved or requires verified credentials.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/">
            <Button variant="primary" size="sm" className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" />
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
