"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Lock, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const [authState, setAuthState] = useState<"idle" | "loading" | "error" | "routing">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSimulateOAuth = (outcome: "loading" | "error" | "routing") => {
    if (outcome === "loading") {
      setAuthState("loading");
      setTimeout(() => {
        setAuthState("idle");
      }, 3000);
    } else if (outcome === "error") {
      setAuthState("error");
      setErrorMessage(
        "OAuth State Error: Provider handshake rejected or account domain not recognized. In production, Supabase Auth securely handles OAuth redirects."
      );
    } else if (outcome === "routing") {
      setAuthState("routing");
    }
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand identity header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-sm bg-accent text-white font-bold text-sm mx-auto">
            AL
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Sign In to Alumnux
          </h1>
          <p className="text-xs text-secondary">
            Your Network. Your Next Chapter.
          </p>
        </div>

        <Card className="shadow-subtle">
          <CardHeader>
            <CardTitle className="text-sm">Sign In via Google</CardTitle>
            <CardDescription>
              We utilize federated Google authentication. Academic credentials are verified post-login.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Error state display */}
            {authState === "error" && (
              <Alert variant="error" title="Authentication Error">
                {errorMessage}
              </Alert>
            )}

            {/* Post-login routing simulation */}
            {authState === "routing" && (
              <div className="p-4 border border-border rounded-md bg-[#F8F8F5] space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="w-4 h-4 text-semantic-success" />
                  Authenticated Session Detected
                </div>
                <p className="text-xs text-secondary">
                  Select your designated role to inspect post-login destination routing:
                </p>
                <div className="grid grid-cols-1 gap-2 pt-1">
                  <Link href="/onboarding/student">
                    <Button variant="secondary" size="sm" className="w-full justify-between text-xs">
                      <span>New Student &rarr; <strong>Verification Intake</strong></span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link href="/onboarding/alumni">
                    <Button variant="secondary" size="sm" className="w-full justify-between text-xs">
                      <span>New Alum &rarr; <strong>Degree Intake</strong></span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link href="/portal/student">
                    <Button variant="secondary" size="sm" className="w-full justify-between text-xs">
                      <span>Verified Student &rarr; <strong>Student Hub</strong></span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                  <Link href="/admin">
                    <Button variant="primary" size="sm" className="w-full justify-between text-xs">
                      <span>Senior Trustee &rarr; <strong>Admin Console</strong></span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}

            {/* Primary Google Auth Action */}
            <Button
              className="w-full h-10 gap-3 text-xs font-medium"
              isLoading={authState === "loading"}
              onClick={() => handleSimulateOAuth("loading")}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{authState === "loading" ? "Contacting Google OAuth..." : "Continue with Google"}</span>
            </Button>

            {/* Evaluation State Switcher */}
            <div className="pt-4 border-t border-border space-y-2">
              <span className="text-[10px] uppercase font-mono tracking-wider text-secondary">
                Phase 1 Prototype State Inspector:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[11px] h-7 px-2"
                  onClick={() => handleSimulateOAuth("loading")}
                >
                  Test Loading
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[11px] h-7 px-2"
                  onClick={() => handleSimulateOAuth("error")}
                >
                  Test Error
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[11px] h-7 px-2"
                  onClick={() => handleSimulateOAuth("routing")}
                >
                  Test Post-Login
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-[11px] h-7 px-2 text-secondary"
                  onClick={() => setAuthState("idle")}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Security Notice */}
            <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-[11px] text-secondary space-y-1">
              <div className="flex items-center gap-1.5 font-medium text-primary">
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span>Zero-Trust Credential Storage</span>
              </div>
              <p>
                Passwords are never stored. Auth tokens are maintained via HTTP-only secure cookies adhering to DPDP 2023 principles.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footnote */}
        <p className="text-center text-xs text-secondary">
          Don&apos;t have an account yet?{" "}
          <Link href="/auth/register" className="text-accent font-medium hover:underline">
            Register and choose account type
          </Link>
        </p>
      </div>
    </div>
  );
}
