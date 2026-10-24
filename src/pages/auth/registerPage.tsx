import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Briefcase, ArrowRight, Check } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <Badge variant="outline" className="font-mono text-[10px] uppercase">
            Step 1 of 2: Role Selection
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
            Join the Alumnux Network
          </h1>
          <p className="text-xs text-secondary max-w-md mx-auto">
            Choose your account category. Each path undergoes rigorous academic credential verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Option 1: Student */}
          <Card className="hover:border-primary transition-all duration-150 flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="w-9 h-9 rounded-sm bg-accent-subtle text-accent flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">I am a Current Student</CardTitle>
              <CardDescription>
                Enrolled undergraduate or postgraduate student seeking mentorship and career opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 border-t border-border/70 pt-3 text-xs text-secondary">
                <p className="font-medium text-primary text-[11px] uppercase tracking-wider">
                  Verification Required:
                </p>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-semantic-success" />
                  <span>College ID Card (Front)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-semantic-success" />
                  <span>College ID Card (Back with validity)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-semantic-success" />
                  <span>Valid Student Register Number</span>
                </div>
              </div>

              <Link to="/onboarding/student" className="block pt-2">
                <Button className="w-full justify-between text-xs">
                  <span>Continue as Student</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Option 2: Alumni */}
          <Card className="hover:border-primary transition-all duration-150 flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="w-9 h-9 rounded-sm bg-accent text-white flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <CardTitle className="text-base">I am a Graduated Alum</CardTitle>
              <CardDescription>
                Graduated professional ready to mentor students, share referrals, and connect with peers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 border-t border-border/70 pt-3 text-xs text-secondary">
                <p className="font-medium text-primary text-[11px] uppercase tracking-wider">
                  Verification Required:
                </p>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-semantic-success" />
                  <span>Anna University Degree Certificate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-semantic-success" />
                  <span>Current Employer &amp; Designation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-semantic-success" />
                  <span>Professional LinkedIn Profile</span>
                </div>
              </div>

              <Link to="/onboarding/alumni" className="block pt-2">
                <Button variant="secondary" className="w-full justify-between text-xs">
                  <span>Continue as Alumni</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pt-2 text-xs text-secondary">
          Already registered?{" "}
          <Link to="/auth/login" className="text-accent font-medium hover:underline">
            Sign in to your account
          </Link>
        </div>
      </div>
    </div>
  );
}
