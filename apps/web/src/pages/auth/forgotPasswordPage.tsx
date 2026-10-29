import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowLeft, Mail, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-sm bg-accent text-white font-bold text-sm flex items-center justify-center shadow-sm">
              AL
            </div>
            <span className="font-bold text-lg text-primary tracking-tight">
              ALUMNUX
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Reset Password
          </h1>
          <p className="text-xs text-secondary font-mono">
            Password recovery simulation for demo environment.
          </p>
        </div>

        <Card className="shadow-subtle border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-primary">
              Account Recovery
            </CardTitle>
            <CardDescription className="text-xs">
              Enter your registered email address to receive password reset instructions.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {submitted ? (
              <div className="space-y-4">
                <div className="p-4 rounded-md border border-emerald-300 bg-emerald-50 text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-xs text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Reset Link Dispatched (Simulated)</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    If an account is associated with <strong className="font-semibold">{email}</strong>, you would receive a password reset link.
                  </p>
                  <p className="text-[11px] text-emerald-800 font-mono pt-1">
                    Demo Reminder: You can log in directly using preset credentials &lsquo;student@alumnux.demo&rsquo; (Student@123) or &lsquo;alumni@alumnux.demo&rsquo; (Alumni@123).
                  </p>
                </div>

                <Link to="/login" className="block">
                  <Button variant="outline" className="w-full text-xs h-9 gap-1.5 border-border">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Return to Sign In</span>
                  </Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-primary">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@alumnux.demo or your email"
                      className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-10 text-xs font-semibold"
                >
                  {isLoading ? "Sending..." : "Send Password Reset Link"}
                </Button>

                <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-[11px] text-secondary flex items-start gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>
                    In production, secure cryptographic reset tokens are issued through Supabase Auth.
                  </span>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center">
          <Link
            to="/login"
            className="text-xs text-secondary hover:text-primary inline-flex items-center gap-1 font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
