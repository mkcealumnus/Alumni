import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import {
  Lock,
  Mail,
  User,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../../context/authContext";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters."),
    email: z.string().email("Please enter a valid academic or professional email address."),
    role: z.enum(["student", "alumni"], {
      errorMap: () => ({ message: "Please select an account type." }),
    }),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(6, "Please confirm your password."),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must acknowledge the terms to proceed." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerDemo } = useAuth();
  const [successState, setSuccessState] = useState<{
    name: string;
    email: string;
    role: "student" | "alumni";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "student",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);
    setAuthError("");

    const result = await registerDemo({
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      password: data.password,
    });

    setIsSubmitting(false);

    if (result.success && result.user) {
      setSuccessState({
        name: data.fullName,
        email: data.email,
        role: data.role,
      });
    } else {
      setAuthError(result.error || "Failed to create demo profile.");
    }
  };

  const handleEnterDashboard = () => {
    if (!successState) return;
    const dest =
      successState.role === "student"
        ? "/student/dashboard"
        : "/alumni/dashboard";
    navigate(dest);
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
            Create Demo Account
          </h1>
          <p className="text-xs text-secondary font-mono">
            Join the independent student &amp; alumni network.
          </p>
        </div>

        {/* Success Modal / State */}
        {successState ? (
          <Card className="border-border shadow-subtle">
            <CardHeader className="text-center pb-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <CardTitle className="text-base font-bold text-primary">
                Demo Account Created!
              </CardTitle>
              <CardDescription className="text-xs">
                Welcome, <strong className="text-primary">{successState.name}</strong>. Your {successState.role} demo profile has been initialized in your browser session.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2">
              <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-xs space-y-1.5 font-mono">
                <div className="flex justify-between text-secondary">
                  <span>Role:</span>
                  <span className="text-primary font-bold uppercase">{successState.role}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Email:</span>
                  <span className="text-primary truncate max-w-[200px]">{successState.email}</span>
                </div>
                <div className="flex justify-between text-secondary">
                  <span>Environment:</span>
                  <span className="text-emerald-700 font-semibold">Local Demo Session</span>
                </div>
              </div>

              <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-[11px] text-secondary flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                <span>
                  Notice: This demo account is stored locally. In production, real account registration connects securely to Supabase Auth.
                </span>
              </div>

              <Button
                onClick={handleEnterDashboard}
                className="w-full text-xs h-10 gap-2 font-semibold shadow-subtle"
              >
                <span>Enter {successState.role === "student" ? "Student" : "Alumni"} Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-subtle border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold text-primary">
                Registration Form
              </CardTitle>
              <CardDescription className="text-xs">
                Select your designated role and fill out your demo details.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {authError && (
                <Alert variant="error" title="Registration Error">
                  {authError}
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
                {/* Account Type Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-primary">
                    I am registering as: <span className="text-accent">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label
                      className={`flex items-center gap-2.5 p-3 rounded-sm border cursor-pointer transition-colors ${
                        selectedRole === "student"
                          ? "bg-accent/5 border-accent text-primary font-semibold"
                          : "bg-[#F8F8F5] border-border text-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        value="student"
                        {...register("role")}
                        className="sr-only"
                      />
                      <GraduationCap className="w-4 h-4 text-accent" />
                      <div className="text-xs leading-none">
                        <div>Student</div>
                        <div className="text-[10px] text-secondary font-normal mt-0.5">Seeking guidance</div>
                      </div>
                    </label>

                    <label
                      className={`flex items-center gap-2.5 p-3 rounded-sm border cursor-pointer transition-colors ${
                        selectedRole === "alumni"
                          ? "bg-accent/5 border-accent text-primary font-semibold"
                          : "bg-[#F8F8F5] border-border text-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        value="alumni"
                        {...register("role")}
                        className="sr-only"
                      />
                      <Briefcase className="w-4 h-4 text-accent" />
                      <div className="text-xs leading-none">
                        <div>Alumni</div>
                        <div className="text-[10px] text-secondary font-normal mt-0.5">Mentoring &amp; sharing</div>
                      </div>
                    </label>
                  </div>
                  {errors.role && (
                    <p className="text-[11px] text-red-600">{errors.role.message}</p>
                  )}
                </div>

                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-primary">
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      {...register("fullName")}
                      placeholder="e.g. Alex Rivera"
                      className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-primary">
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      type="email"
                      {...register("email")}
                      placeholder="name@domain.com"
                      className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-600">{errors.email.message}</p>
                  )}
                </div>

                {/* Password & Confirm Password in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-primary">
                      Password <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        type="password"
                        {...register("password")}
                        placeholder="••••••••"
                        className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                      />
                    </div>
                    {errors.password && (
                      <p className="text-[11px] text-red-600">{errors.password.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-primary">
                      Confirm Password <span className="text-accent">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                      <Input
                        type="password"
                        {...register("confirmPassword")}
                        placeholder="••••••••"
                        className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-[11px] text-red-600">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                {/* Terms Acknowledgement */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="terms-check"
                      {...register("terms")}
                      className="rounded-xs border-border text-accent focus:ring-accent w-4 h-4 mt-0.5"
                    />
                    <label htmlFor="terms-check" className="text-xs text-secondary leading-normal select-none">
                      I understand that Alumnux is an independently administered platform, and I agree to the{" "}
                      <Link to="/terms" className="text-accent underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/privacy" className="text-accent underline">
                        Privacy Policy
                      </Link>
                      .
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="text-[11px] text-red-600">{errors.terms.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-10 text-xs font-semibold gap-2 shadow-subtle"
                >
                  {isSubmitting ? (
                    <span>Creating Demo Account...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Back to Login */}
        <p className="text-center text-xs text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-semibold hover:underline">
            Sign In with demo credentials
          </Link>
        </p>
      </div>
    </div>
  );
}
