import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Briefcase,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { AuthBrandPanel } from "../../components/auth/authBrandPanel";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsDemo } = useAuth();

  const [identifier, setIdentifier] = useState("");
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

    if (!identifier.trim()) {
      setErrorMessage("Please enter your email address or username.");
      return;
    }

    if (!password) {
      setErrorMessage("Please enter your password.");
      return;
    }

    setIsLoading(true);
    const result = await login(identifier, password);
    setIsLoading(false);

    if (result.success && result.user) {
      const destination =
        from ||
        (result.user.role === "student" ? "/student/dashboard" : "/alumni/dashboard");
      navigate(destination, { replace: true });
    } else {
      setErrorMessage(
        result.error ||
          "Invalid credentials. Check your email/username and password, or use the 1-Click Demo accounts below."
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
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row text-primary font-sans antialiased">
      {/* 1. LEFT PANEL — BRAND IDENTITY (~45% Desktop) */}
      <AuthBrandPanel />

      {/* 2. RIGHT PANEL — LOGIN FORM (~55% Desktop) */}
      <main className="w-full lg:w-[55%] xl:w-[58%] min-h-screen flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 bg-surface">
        <div className="w-full max-w-md space-y-6">
          {/* Top Return Navigation */}
          <div className="flex items-center justify-between pb-1">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <span className="text-[10px] font-mono text-secondary uppercase tracking-wider">
              Secure Sign In
            </span>
          </div>

          {/* Header Typography */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                Welcome back
              </h1>
              <Badge variant="outline" className="text-[10px] font-mono">
                Sign In
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-secondary">
              Sign in to continue your Alumnux career &amp; mentorship journey.
            </p>
          </div>

          {/* Error Feedback Alert */}
          {errorMessage && (
            <Alert variant="error" title="Sign In Notice">
              {errorMessage}
            </Alert>
          )}

          {/* Standard Credentials Form */}
          <form onSubmit={handleStandardLogin} className="space-y-4">
            {/* Email or Username Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="login-identifier"
                className="text-xs font-semibold text-primary block"
              >
                Email or Username <span className="text-accent">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="login-identifier"
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="student@alumnux.demo or alexrivera"
                  required
                  autoComplete="username"
                  className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                />
              </div>
            </div>

            {/* Password Input with Show/Hide Toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label
                  htmlFor="login-password"
                  className="font-semibold text-primary"
                >
                  Password <span className="text-accent">*</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-accent hover:underline text-[11px] font-mono"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  required
                  autoComplete="current-password"
                  className="pl-9 pr-10 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-primary p-0.5 rounded-xs"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-xs border-border text-accent focus:ring-accent w-4 h-4"
                />
                <label
                  htmlFor="remember-me"
                  className="text-xs text-secondary select-none cursor-pointer"
                >
                  Remember session on this device
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 text-xs font-semibold gap-2 shadow-subtle"
            >
              {isLoading ? (
                <span>Authenticating credentials...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </Button>
          </form>

          {/* Discreet Demo Accounts Panel */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-secondary text-[11px] uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Instant Demo Access</span>
              </span>
              <span className="text-[10px] text-secondary font-mono">
                1-Click Preset
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleInstantDemoLogin("student")}
                disabled={isLoading}
                className="w-full text-xs h-9 border-border bg-[#F8F8F5] hover:border-accent hover:bg-accent/5 justify-between px-3"
              >
                <div className="flex items-center gap-2 text-left truncate">
                  <GraduationCap className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="font-semibold text-primary truncate">
                    Student Demo
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-secondary shrink-0" />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => handleInstantDemoLogin("alumni")}
                disabled={isLoading}
                className="w-full text-xs h-9 border-border bg-[#F8F8F5] hover:border-accent hover:bg-accent/5 justify-between px-3"
              >
                <div className="flex items-center gap-2 text-left truncate">
                  <Briefcase className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span className="font-semibold text-primary truncate">
                    Alumni Demo
                  </span>
                </div>
                <ArrowRight className="w-3 h-3 text-secondary shrink-0" />
              </Button>
            </div>
          </div>

          {/* Registration Link */}
          <div className="pt-2 text-center text-xs text-secondary">
            <span>New to the Alumnux network?</span>{" "}
            <Link
              to="/register"
              className="text-accent font-semibold hover:underline"
            >
              Create an account
            </Link>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-[11px] text-secondary flex items-start gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
            <p className="leading-snug">
              Accounts must meet verification requirements before access is granted. Unverified or pending registrations undergo manual review by alumni trustees.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
