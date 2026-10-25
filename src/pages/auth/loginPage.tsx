import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/authContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Determine redirection target if user arrived from a protected route
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname;

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success && result.user) {
      const destination =
        from ||
        (result.user.role === "student" ? "/student/dashboard" : "/alumni/dashboard");
      navigate(destination, { replace: true });
    } else {
      setErrorMessage(
        result.error ||
          "Invalid credentials. Use the Demo Login buttons below for instant 1-click access."
      );
    }
  };

  const handleInstantDemoLogin = async (role: "student" | "alumni") => {
    setIsLoading(true);
    await loginAsDemo(role);
    setIsLoading(false);

    const destination =
      role === "student" ? "/student/dashboard" : "/alumni/dashboard";
    navigate(destination, { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand identity header */}
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
            Sign In to Alumnux
          </h1>
          <p className="text-xs text-secondary font-mono">
            Your Network. Your Next Chapter.
          </p>
        </div>

        {/* Demo Fast-Access Section (Highlighted prominently per prompt requirements) */}
        <div className="bg-surface border-2 border-accent/40 rounded-md p-4 sm:p-5 shadow-subtle space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-primary font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>1-Click Demo Login</span>
            </div>
            <Badge variant="outline" className="text-[10px] bg-[#F8F8F5]">
              No Password Needed
            </Badge>
          </div>
          <p className="text-xs text-secondary leading-snug">
            Instantly enter the platform as either a Student or Verified Alumni to test dashboard interactions without database setup.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleInstantDemoLogin("student")}
              disabled={isLoading}
              className="w-full text-xs h-10 border-border hover:border-accent hover:bg-accent/5 justify-between px-3"
            >
              <div className="flex items-center gap-2 text-left">
                <GraduationCap className="w-4 h-4 text-accent" />
                <div>
                  <div className="font-semibold text-primary leading-tight">Student Demo</div>
                  <div className="text-[10px] text-secondary font-mono">student@alumnux.demo</div>
                </div>
              </div>
              <ArrowRight className="w-3 h-3 text-secondary" />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleInstantDemoLogin("alumni")}
              disabled={isLoading}
              className="w-full text-xs h-10 border-border hover:border-accent hover:bg-accent/5 justify-between px-3"
            >
              <div className="flex items-center gap-2 text-left">
                <Briefcase className="w-4 h-4 text-accent" />
                <div>
                  <div className="font-semibold text-primary leading-tight">Alumni Demo</div>
                  <div className="text-[10px] text-secondary font-mono">alumni@alumnux.demo</div>
                </div>
              </div>
              <ArrowRight className="w-3 h-3 text-secondary" />
            </Button>
          </div>
        </div>

        {/* Standard Credentials Card */}
        <Card className="shadow-subtle border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold text-primary">
              Manual Demo Credentials
            </CardTitle>
            <CardDescription className="text-xs">
              Enter test credentials or prefill via the instant buttons above.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {errorMessage && (
              <Alert variant="error" title="Sign In Error">
                {errorMessage}
              </Alert>
            )}

            <form onSubmit={handleStandardLogin} className="space-y-3.5">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-primary">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@alumnux.demo or alumni@alumnux.demo"
                    className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                  />
                </div>
              </div>

              {/* Password Input with Show/Hide toggle */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-medium text-primary">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-accent hover:underline text-[11px]"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Student@123 or Alumni@123"
                    className="pl-9 pr-10 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-xs border-border text-accent focus:ring-accent w-3.5 h-3.5"
                />
                <label htmlFor="remember-me" className="text-xs text-secondary select-none">
                  Remember demo session on this browser
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-10 text-xs font-semibold gap-2 shadow-subtle"
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </Button>
            </form>

            {/* Security Disclaimer Note */}
            <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-[11px] text-secondary flex items-start gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
              <span>
                <strong className="text-primary font-medium">Demo Limitation:</strong> These accounts operate in client demonstration mode. In future milestones, Supabase Auth handles federated authentication and zero-trust identity verification.
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Link to Registration */}
        <p className="text-center text-xs text-secondary">
          Don&apos;t have an account yet?{" "}
          <Link to="/register" className="text-accent font-semibold hover:underline">
            Register for Alumnux demo
          </Link>
        </p>
      </div>
    </div>
  );
}
