import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Mail,
  User,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Linkedin,
  Calendar,
  Clock,
  Home,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/authContext";
import { AuthBrandPanel } from "../../components/auth/authBrandPanel";
import { DocumentUploadCard, UploadedFileState } from "../../components/auth/documentUploadCard";
import { ALLOWED_DEPARTMENTS } from "../../lib/validation";

const ACADEMIC_YEARS = [
  "First Year",
  "Second Year",
  "Third Year",
  "Final Year",
] as const;

// Generate past graduation years: 2025 down to 1980
const CURRENT_YEAR = 2025;
const PASSED_OUT_YEARS = Array.from(
  { length: CURRENT_YEAR - 1980 + 1 },
  (_, i) => CURRENT_YEAR - i
);

// Comprehensive Zod validation schema
const registrationSchema = z
  .object({
    role: z.enum(["student", "alumni"]),
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters.")
      .max(80, "Full name exceeds maximum length."),
    email: z
      .string()
      .email("Please enter a valid email address.")
      .max(100, "Email address is too long."),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(30, "Username cannot exceed 30 characters.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username may only contain letters, numbers, and underscores."
      ),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number."),
    confirmPassword: z.string().min(6, "Please confirm your password."),
    department: z.string().min(1, "Please select an academic department."),

    // Student-specific fields
    academicYear: z.string().optional(),

    // Alumni-specific fields
    passedOutYear: z.coerce.number().optional(),
    currentCompany: z.string().optional(),
    linkedinUrl: z.string().optional(),

    // Terms acknowledgement
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and privacy policy to proceed." }),
    }),
  })
  .superRefine((data, ctx) => {
    // 1. Password confirmation check
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match.",
        path: ["confirmPassword"],
      });
    }

    // 2. Student role specific validation
    if (data.role === "student") {
      if (!data.academicYear) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select your current academic year of study.",
          path: ["academicYear"],
        });
      }
    }

    // 3. Alumni role specific validation
    if (data.role === "alumni") {
      if (!data.passedOutYear || data.passedOutYear < 1980 || data.passedOutYear > 2025) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please select your degree passed-out year.",
          path: ["passedOutYear"],
        });
      }

      if (!data.currentCompany || data.currentCompany.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Current employer or organization is required.",
          path: ["currentCompany"],
        });
      }

      if (!data.linkedinUrl || !data.linkedinUrl.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "LinkedIn profile URL is required for alumni verification.",
          path: ["linkedinUrl"],
        });
      } else {
        const urlRegex = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
        if (!urlRegex.test(data.linkedinUrl.trim())) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Please enter a valid LinkedIn profile URL (e.g. https://linkedin.com/in/username).",
            path: ["linkedinUrl"],
          });
        }
      }
    }
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

export default function RegisterPage() {
  const { registerDemo } = useAuth();

  // Document upload state
  const [studentIdFront, setStudentIdFront] = useState<UploadedFileState | null>(null);
  const [studentIdBack, setStudentIdBack] = useState<UploadedFileState | null>(null);
  const [graduationCert, setGraduationCert] = useState<UploadedFileState | null>(null);

  const [documentErrors, setDocumentErrors] = useState<{
    idFront?: string;
    idBack?: string;
    cert?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  // Successful submission confirmation state
  const [submittedApplication, setSubmittedApplication] = useState<{
    applicationId: string;
    fullName: string;
    email: string;
    username: string;
    role: "student" | "alumni";
    department: string;
    detailsLabel: string;
    documentsSubmitted: string[];
    submittedAt: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      role: "student",
      fullName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      department: "CSE",
      academicYear: "Third Year",
      passedOutYear: 2020,
      currentCompany: "",
      linkedinUrl: "",
      termsAccepted: true,
    },
  });

  const selectedRole = watch("role");

  const handleRoleSelect = (newRole: "student" | "alumni") => {
    setValue("role", newRole);
    setDocumentErrors({});
    setSubmissionError("");
  };

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmissionError("");
    const docErrors: { idFront?: string; idBack?: string; cert?: string } = {};

    // Validate required file uploads based on active tab
    if (data.role === "student") {
      if (!studentIdFront) {
        docErrors.idFront = "College ID card front image is required.";
      }
      if (!studentIdBack) {
        docErrors.idBack = "College ID card back image is required.";
      }
    } else {
      if (!graduationCert) {
        docErrors.cert = "Anna University Degree or Provisional Certificate scan is required.";
      }
    }

    if (Object.keys(docErrors).length > 0) {
      setDocumentErrors(docErrors);
      return;
    }

    setIsSubmitting(true);

    const result = await registerDemo({
      fullName: data.fullName,
      email: data.email,
      username: data.username,
      role: data.role,
      department: data.department,
      academicYear: data.role === "student" ? (data.academicYear as any) : undefined,
      passedOutYear: data.role === "alumni" ? data.passedOutYear : undefined,
      password: data.password,
      company: data.role === "alumni" ? data.currentCompany : undefined,
      linkedinUrl: data.role === "alumni" ? data.linkedinUrl : undefined,
      studentIdFrontName: studentIdFront?.name,
      studentIdBackName: studentIdBack?.name,
      graduationCertificateName: graduationCert?.name,
    });

    setIsSubmitting(false);

    if (result.success && result.user) {
      const documentsList =
        data.role === "student"
          ? [
              `ID Front: ${studentIdFront?.name || "Uploaded"}`,
              `ID Back: ${studentIdBack?.name || "Uploaded"}`,
            ]
          : [`Certificate: ${graduationCert?.name || "Uploaded"}`];

      setSubmittedApplication({
        applicationId: `APP-${Date.now().toString().slice(-6)}`,
        fullName: data.fullName,
        email: data.email,
        username: data.username,
        role: data.role,
        department: data.department,
        detailsLabel:
          data.role === "student"
            ? `${data.academicYear} • Class of ${result.user.graduationYear}`
            : `${data.currentCompany} • Passed out ${data.passedOutYear}`,
        documentsSubmitted: documentsList,
        submittedAt: new Date().toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      });
    } else {
      setSubmissionError(
        result.error ||
          "Registration submission failed. Please verify your information and retry."
      );
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col lg:flex-row text-primary font-sans antialiased">
      {/* 1. LEFT PANEL — BRAND IDENTITY (~35% Desktop) */}
      <AuthBrandPanel className="w-full lg:w-[35%] xl:w-[32%]" />

      {/* 2. RIGHT PANEL — REGISTRATION FORM (~65% Desktop for 2-column layout) */}
      <main className="w-full lg:w-[65%] xl:w-[68%] min-h-screen flex flex-col justify-start items-center p-4 sm:p-8 lg:p-10 bg-surface overflow-y-auto">
        <div className="w-full max-w-5xl space-y-5 py-2">
          {/* Top Quick Links & Back to Home */}
          <div className="flex items-center justify-between pb-1">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs text-secondary">Already registered?</span>
              <Link
                to="/login"
                className="text-xs text-accent font-semibold hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>

          {/* Submission Success Screen: Pending Approval State */}
          {submittedApplication ? (
            <div className="max-w-2xl mx-auto space-y-6 bg-surface border border-border rounded-md p-6 sm:p-8 shadow-subtle">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center">
                  <Clock className="w-7 h-7" />
                </div>
                <Badge
                  variant="outline"
                  className="bg-amber-50 text-amber-800 border-amber-300 font-mono text-xs uppercase"
                >
                  Pending Approval
                </Badge>
                <h1 className="text-2xl font-bold tracking-tight text-primary">
                  Application submitted successfully
                </h1>
                <p className="text-xs sm:text-sm text-secondary leading-relaxed max-w-md mx-auto">
                  Your registration is awaiting review. You will be able to access the verified Alumnux features after your application is approved by an alumni administrator.
                </p>
              </div>

              {/* Application Details Summary */}
              <div className="bg-[#FAF9F5] border border-border rounded-sm p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-border pb-2">
                  <span className="font-mono text-secondary text-[11px]">
                    Reference ID:
                  </span>
                  <span className="font-mono font-bold text-primary">
                    {submittedApplication.applicationId}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-secondary block">Applicant Name:</span>
                    <span className="font-semibold text-primary">
                      {submittedApplication.fullName}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary block">Assigned Role:</span>
                    <span className="font-semibold text-primary capitalize">
                      {submittedApplication.role}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary block">Username:</span>
                    <span className="font-mono text-primary">
                      @{submittedApplication.username}
                    </span>
                  </div>
                  <div>
                    <span className="text-secondary block">Department:</span>
                    <span className="font-medium text-primary">
                      {submittedApplication.department}
                    </span>
                  </div>
                </div>

                <div className="border-t border-border pt-2 text-[11px] space-y-1">
                  <span className="text-secondary block font-semibold">
                    Submitted Identity Documents:
                  </span>
                  {submittedApplication.documentsSubmitted.map((doc, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 text-primary font-mono"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-secondary pt-1 border-t border-border">
                  Submitted at: {submittedApplication.submittedAt}
                </div>
              </div>

              {/* Administrative Explanation */}
              <div className="p-3 bg-[#F8F8F5] border border-border rounded-sm text-xs text-secondary space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                  <span>Manual Trustee Review Policy</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  To ensure student safety and authentic industry mentorship, all Anna University student IDs and graduation certificates are inspected manually by one of three senior alumni trustees.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <Link to="/login" className="w-full sm:flex-1">
                  <Button className="w-full text-xs h-10 gap-1.5 font-semibold shadow-subtle">
                    <span>Return to Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
                <Link to="/" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-xs h-10 border-border gap-1.5"
                  >
                    <Home className="w-3.5 h-3.5 text-secondary" />
                    <span>Home Page</span>
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            /* Active Registration Form with 2-Tab Organization */
            <div className="space-y-5">
              {/* Header Title */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">
                    Join the Alumnux Network
                  </h1>
                  <Badge variant="outline" className="text-[10px] font-mono bg-[#FAF9F5] border-border">
                    Phase 1 Registration
                  </Badge>
                </div>
                <p className="text-xs sm:text-sm text-secondary">
                  Choose your registration category below. All accounts require document verification before platform features are unlocked.
                </p>
              </div>

              {submissionError && (
                <Alert variant="error" title="Submission Error">
                  {submissionError}
                </Alert>
              )}

              {/* 2 TABS: STUDENT REGISTRATION & ALUMNI REGISTRATION */}
              <div className="bg-[#EFEFEA] p-1.5 rounded-sm border border-border">
                <div
                  role="tablist"
                  aria-label="Account Registration Type"
                  className="grid grid-cols-2 gap-1.5"
                >
                  {/* TAB 1: STUDENT */}
                  <button
                    type="button"
                    role="tab"
                    id="tab-student"
                    aria-selected={selectedRole === "student"}
                    aria-controls="panel-student"
                    onClick={() => handleRoleSelect("student")}
                    className={`flex items-center justify-center gap-2.5 py-3 px-3 sm:px-4 rounded-xs font-semibold text-xs sm:text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      selectedRole === "student"
                        ? "bg-surface text-primary shadow-subtle border border-border"
                        : "text-secondary hover:text-primary hover:bg-surface/50"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 ${
                        selectedRole === "student"
                          ? "bg-accent text-white"
                          : "bg-[#E2E2DC] text-secondary"
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div className="text-left flex flex-col min-w-0">
                      <span className="leading-tight font-bold truncate">Student Registration</span>
                      <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                        Undergraduate Study
                      </span>
                    </div>
                    {selectedRole === "student" && (
                      <span className="ml-auto hidden md:inline-flex text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 bg-accent/10 text-accent rounded-xs border border-accent/20">
                        Active Tab
                      </span>
                    )}
                  </button>

                  {/* TAB 2: ALUMNI */}
                  <button
                    type="button"
                    role="tab"
                    id="tab-alumni"
                    aria-selected={selectedRole === "alumni"}
                    aria-controls="panel-alumni"
                    onClick={() => handleRoleSelect("alumni")}
                    className={`flex items-center justify-center gap-2.5 py-3 px-3 sm:px-4 rounded-xs font-semibold text-xs sm:text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      selectedRole === "alumni"
                        ? "bg-surface text-primary shadow-subtle border border-border"
                        : "text-secondary hover:text-primary hover:bg-surface/50"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 ${
                        selectedRole === "alumni"
                          ? "bg-accent text-white"
                          : "bg-[#E2E2DC] text-secondary"
                      }`}
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="text-left flex flex-col min-w-0">
                      <span className="leading-tight font-bold truncate">Alumni Registration</span>
                      <span className="text-[10px] font-mono text-secondary hidden sm:inline">
                        Graduates &amp; Mentors
                      </span>
                    </div>
                    {selectedRole === "alumni" && (
                      <span className="ml-auto hidden md:inline-flex text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 bg-accent/10 text-accent rounded-xs border border-accent/20">
                        Active Tab
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* FORM WRAPPER */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* ========================================================================= */}
                {/* TAB 1 CONTENT: STUDENT REGISTRATION (Proper 2-Column Arrangement)          */}
                {/* ========================================================================= */}
                {selectedRole === "student" && (
                  <div
                    role="tabpanel"
                    id="panel-student"
                    aria-labelledby="tab-student"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
                  >
                    {/* COLUMN 1: Personal & Academic Credentials (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-4 sm:p-5 bg-surface border border-border rounded-sm shadow-subtle space-y-3.5">
                        <div className="border-b border-border pb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-xs bg-[#171717] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                              1
                            </span>
                            <h2 className="font-bold text-xs sm:text-sm text-primary">
                              Student Profile &amp; Academic Details
                            </h2>
                          </div>
                          <span className="text-[10px] font-mono text-secondary">
                            Section 1 of 2
                          </span>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-1">
                          <label
                            htmlFor="student-reg-fullName"
                            className="text-xs font-semibold text-primary block"
                          >
                            Full Name <span className="text-accent">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                            <Input
                              id="student-reg-fullName"
                              {...register("fullName")}
                              placeholder="e.g. Alex Rivera"
                              className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                            />
                          </div>
                          {errors.fullName && (
                            <p className="text-[11px] text-red-600">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>

                        {/* Email & Username */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Email ID */}
                          <div className="space-y-1">
                            <label
                              htmlFor="student-reg-email"
                              className="text-xs font-semibold text-primary block"
                            >
                              Email ID <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="student-reg-email"
                                type="email"
                                {...register("email")}
                                placeholder="name@college.edu"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.email && (
                              <p className="text-[11px] text-red-600">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          {/* Username */}
                          <div className="space-y-1">
                            <label
                              htmlFor="student-reg-username"
                              className="text-xs font-semibold text-primary block"
                            >
                              Username <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <span className="text-secondary text-xs absolute left-3 top-1/2 -translate-y-1/2 font-mono">
                                @
                              </span>
                              <Input
                                id="student-reg-username"
                                {...register("username")}
                                placeholder="alexrivera"
                                className="pl-8 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.username && (
                              <p className="text-[11px] text-red-600">
                                {errors.username.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Department & Academic Year */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Department */}
                          <div className="space-y-1">
                            <label
                              htmlFor="student-reg-department"
                              className="text-xs font-semibold text-primary block"
                            >
                              Department <span className="text-accent">*</span>
                            </label>
                            <select
                              id="student-reg-department"
                              {...register("department")}
                              className="w-full h-10 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                            >
                              {ALLOWED_DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept}>
                                  {dept} —{" "}
                                  {dept === "CSE"
                                    ? "Computer Science"
                                    : dept === "IT"
                                    ? "Info Technology"
                                    : dept === "ECE"
                                    ? "Electronics & Comm"
                                    : dept === "EEE"
                                    ? "Electrical & Electronics"
                                    : dept === "MECH"
                                    ? "Mechanical"
                                    : dept === "CIVIL"
                                    ? "Civil"
                                    : "AI & Data Science"}
                                </option>
                              ))}
                            </select>
                            {errors.department && (
                              <p className="text-[11px] text-red-600">
                                {errors.department.message}
                              </p>
                            )}
                          </div>

                          {/* Current Academic Year */}
                          <div className="space-y-1">
                            <label
                              htmlFor="student-reg-academicYear"
                              className="text-xs font-semibold text-primary block"
                            >
                              Academic Year <span className="text-accent">*</span>
                            </label>
                            <select
                              id="student-reg-academicYear"
                              {...register("academicYear")}
                              className="w-full h-10 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                            >
                              {ACADEMIC_YEARS.map((yr) => (
                                <option key={yr} value={yr}>
                                  {yr}
                                </option>
                              ))}
                            </select>
                            {errors.academicYear && (
                              <p className="text-[11px] text-red-600">
                                {errors.academicYear.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-[10px] text-secondary font-mono leading-tight bg-[#FAF9F5] p-2 border border-border rounded-xs">
                          Policy Note: Selecting Final Year does not graduate your account. Student-to-Alumni transition requires official graduation completion.
                        </p>

                        {/* Password & Confirm Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-border">
                          {/* Password */}
                          <div className="space-y-1">
                            <label
                              htmlFor="student-reg-password"
                              className="text-xs font-semibold text-primary block"
                            >
                              Password <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="student-reg-password"
                                type="password"
                                {...register("password")}
                                placeholder="Min 6 chars, uppercase & number"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.password && (
                              <p className="text-[11px] text-red-600">
                                {errors.password.message}
                              </p>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div className="space-y-1">
                            <label
                              htmlFor="student-reg-confirmPassword"
                              className="text-xs font-semibold text-primary block"
                            >
                              Confirm Password <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="student-reg-confirmPassword"
                                type="password"
                                {...register("confirmPassword")}
                                placeholder="Repeat password"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.confirmPassword && (
                              <p className="text-[11px] text-red-600">
                                {errors.confirmPassword.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 2: Verification Documents & Submit (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 sm:p-5 bg-surface border border-border rounded-sm shadow-subtle space-y-3.5">
                        <div className="border-b border-border pb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-xs bg-[#171717] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                              2
                            </span>
                            <h2 className="font-bold text-xs sm:text-sm text-primary">
                              College ID Verification
                            </h2>
                          </div>
                          <span className="text-[10px] font-mono text-secondary">
                            Section 2 of 2
                          </span>
                        </div>

                        <p className="text-[11px] text-secondary">
                          Upload front &amp; back photos of your official Anna University affiliated college identity card.
                        </p>

                        {/* ID Upload Cards */}
                        <div className="space-y-3">
                          <DocumentUploadCard
                            id="student-id-front"
                            label="Student ID — Front Side"
                            helperText="Clear photo with name &amp; photo visible"
                            required
                            value={studentIdFront}
                            onChange={(file) => {
                              setStudentIdFront(file);
                              if (file) {
                                setDocumentErrors((prev) => ({ ...prev, idFront: undefined }));
                              }
                            }}
                            error={documentErrors.idFront}
                          />

                          <DocumentUploadCard
                            id="student-id-back"
                            label="Student ID — Back Side"
                            helperText="Clear photo with register number &amp; validity"
                            required
                            value={studentIdBack}
                            onChange={(file) => {
                              setStudentIdBack(file);
                              if (file) {
                                setDocumentErrors((prev) => ({ ...prev, idBack: undefined }));
                              }
                            }}
                            error={documentErrors.idBack}
                          />
                        </div>

                        {/* Review Policy Callout */}
                        <div className="p-2.5 bg-[#FAF9F5] border border-border rounded-sm text-xs text-secondary flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <p className="text-[11px] leading-snug">
                            Manual Trustee Review: Your student credentials are authenticated by senior alumni trustees. Files are encrypted and confidential.
                          </p>
                        </div>

                        {/* Terms and Submit */}
                        <div className="pt-2 border-t border-border space-y-3">
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id="terms-accepted-student"
                              {...register("termsAccepted")}
                              className="rounded-xs border-border text-accent focus:ring-accent w-4 h-4 mt-0.5"
                            />
                            <label
                              htmlFor="terms-accepted-student"
                              className="text-[11px] text-secondary leading-normal select-none cursor-pointer"
                            >
                              I agree to the{" "}
                              <Link to="/terms" className="text-accent underline font-medium">
                                Terms
                              </Link>{" "}
                              and{" "}
                              <Link to="/privacy" className="text-accent underline font-medium">
                                Privacy Policy
                              </Link>
                              . All submitted documents are authentic.
                            </label>
                          </div>
                          {errors.termsAccepted && (
                            <p className="text-[11px] text-red-600">
                              {errors.termsAccepted.message}
                            </p>
                          )}

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 text-xs font-semibold gap-2 shadow-subtle"
                          >
                            {isSubmitting ? (
                              <span>Submitting student application...</span>
                            ) : (
                              <>
                                <span>Submit Student Application</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================================= */}
                {/* TAB 2 CONTENT: ALUMNI REGISTRATION (Proper 2-Column Arrangement)           */}
                {/* ========================================================================= */}
                {selectedRole === "alumni" && (
                  <div
                    role="tabpanel"
                    id="panel-alumni"
                    aria-labelledby="tab-alumni"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start"
                  >
                    {/* COLUMN 1: Personal & Career Credentials (7 cols) */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="p-4 sm:p-5 bg-surface border border-border rounded-sm shadow-subtle space-y-3.5">
                        <div className="border-b border-border pb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-xs bg-[#171717] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                              1
                            </span>
                            <h2 className="font-bold text-xs sm:text-sm text-primary">
                              Alumni Profile &amp; Career Credentials
                            </h2>
                          </div>
                          <span className="text-[10px] font-mono text-secondary">
                            Section 1 of 2
                          </span>
                        </div>

                        {/* Full Name */}
                        <div className="space-y-1">
                          <label
                            htmlFor="alumni-reg-fullName"
                            className="text-xs font-semibold text-primary block"
                          >
                            Full Name <span className="text-accent">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                            <Input
                              id="alumni-reg-fullName"
                              {...register("fullName")}
                              placeholder="e.g. Alex Rivera"
                              className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                            />
                          </div>
                          {errors.fullName && (
                            <p className="text-[11px] text-red-600">
                              {errors.fullName.message}
                            </p>
                          )}
                        </div>

                        {/* Email & Username */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Email ID */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-email"
                              className="text-xs font-semibold text-primary block"
                            >
                              Email ID <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Mail className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="alumni-reg-email"
                                type="email"
                                {...register("email")}
                                placeholder="name@company.com"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.email && (
                              <p className="text-[11px] text-red-600">
                                {errors.email.message}
                              </p>
                            )}
                          </div>

                          {/* Username */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-username"
                              className="text-xs font-semibold text-primary block"
                            >
                              Username <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <span className="text-secondary text-xs absolute left-3 top-1/2 -translate-y-1/2 font-mono">
                                @
                              </span>
                              <Input
                                id="alumni-reg-username"
                                {...register("username")}
                                placeholder="alexrivera"
                                className="pl-8 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.username && (
                              <p className="text-[11px] text-red-600">
                                {errors.username.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Department & Passed-out Year */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Department */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-department"
                              className="text-xs font-semibold text-primary block"
                            >
                              Degree Department <span className="text-accent">*</span>
                            </label>
                            <select
                              id="alumni-reg-department"
                              {...register("department")}
                              className="w-full h-10 rounded-sm border border-border bg-[#F8F8F5] px-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                            >
                              {ALLOWED_DEPARTMENTS.map((dept) => (
                                <option key={dept} value={dept}>
                                  {dept} —{" "}
                                  {dept === "CSE"
                                    ? "Computer Science"
                                    : dept === "IT"
                                    ? "Info Technology"
                                    : dept === "ECE"
                                    ? "Electronics & Comm"
                                    : dept === "EEE"
                                    ? "Electrical & Electronics"
                                    : dept === "MECH"
                                    ? "Mechanical"
                                    : dept === "CIVIL"
                                    ? "Civil"
                                    : "AI & Data Science"}
                                </option>
                              ))}
                            </select>
                            {errors.department && (
                              <p className="text-[11px] text-red-600">
                                {errors.department.message}
                              </p>
                            )}
                          </div>

                          {/* Passed-out Year */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-passedOutYear"
                              className="text-xs font-semibold text-primary block"
                            >
                              Passed-out Year <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Calendar className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <select
                                id="alumni-reg-passedOutYear"
                                {...register("passedOutYear")}
                                className="w-full h-10 pl-9 rounded-sm border border-border bg-[#F8F8F5] pr-3 text-xs text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                              >
                                {PASSED_OUT_YEARS.map((yr) => (
                                  <option key={yr} value={yr}>
                                    Class of {yr}
                                  </option>
                                ))}
                              </select>
                            </div>
                            {errors.passedOutYear && (
                              <p className="text-[11px] text-red-600">
                                {errors.passedOutYear.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Current Company & LinkedIn URL */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Current Company */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-company"
                              className="text-xs font-semibold text-primary block"
                            >
                              Current Employer / Company <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Building2 className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="alumni-reg-company"
                                {...register("currentCompany")}
                                placeholder="e.g. Stripe, AWS, Zoho"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.currentCompany && (
                              <p className="text-[11px] text-red-600">
                                {errors.currentCompany.message}
                              </p>
                            )}
                          </div>

                          {/* LinkedIn Profile */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-linkedin"
                              className="text-xs font-semibold text-primary block"
                            >
                              LinkedIn Profile URL <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Linkedin className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="alumni-reg-linkedin"
                                {...register("linkedinUrl")}
                                placeholder="https://linkedin.com/in/username"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.linkedinUrl && (
                              <p className="text-[11px] text-red-600">
                                {errors.linkedinUrl.message}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Password & Confirm Password */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-border">
                          {/* Password */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-password"
                              className="text-xs font-semibold text-primary block"
                            >
                              Password <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="alumni-reg-password"
                                type="password"
                                {...register("password")}
                                placeholder="Min 6 chars, uppercase & number"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.password && (
                              <p className="text-[11px] text-red-600">
                                {errors.password.message}
                              </p>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div className="space-y-1">
                            <label
                              htmlFor="alumni-reg-confirmPassword"
                              className="text-xs font-semibold text-primary block"
                            >
                              Confirm Password <span className="text-accent">*</span>
                            </label>
                            <div className="relative">
                              <Lock className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                              <Input
                                id="alumni-reg-confirmPassword"
                                type="password"
                                {...register("confirmPassword")}
                                placeholder="Repeat password"
                                className="pl-9 h-10 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
                              />
                            </div>
                            {errors.confirmPassword && (
                              <p className="text-[11px] text-red-600">
                                {errors.confirmPassword.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* COLUMN 2: Verification Documents & Submit (5 cols) */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="p-4 sm:p-5 bg-surface border border-border rounded-sm shadow-subtle space-y-3.5">
                        <div className="border-b border-border pb-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-xs bg-[#171717] text-white flex items-center justify-center text-[10px] font-mono font-bold">
                              2
                            </span>
                            <h2 className="font-bold text-xs sm:text-sm text-primary">
                              Degree Verification
                            </h2>
                          </div>
                          <span className="text-[10px] font-mono text-secondary">
                            Section 2 of 2
                          </span>
                        </div>

                        <p className="text-[11px] text-secondary">
                          Upload official Anna University Degree Certificate or Provisional Certificate scan.
                        </p>

                        {/* Certificate Upload Card */}
                        <div className="space-y-3">
                          <DocumentUploadCard
                            id="alumni-certificate"
                            label="Anna University Graduation Certificate"
                            helperText="Degree Certificate or Provisional scan (PDF/PNG/JPG)"
                            required
                            value={graduationCert}
                            onChange={(file) => {
                              setGraduationCert(file);
                              if (file) {
                                setDocumentErrors((prev) => ({ ...prev, cert: undefined }));
                              }
                            }}
                            error={documentErrors.cert}
                          />
                        </div>

                        {/* Mentorship Privileges Callout */}
                        <div className="p-2.5 bg-[#FAF9F5] border border-border rounded-sm text-xs text-secondary space-y-1">
                          <div className="flex items-center gap-1.5 font-semibold text-primary text-[11px]">
                            <Sparkles className="w-3.5 h-3.5 text-accent shrink-0" />
                            <span>Verified Mentor Matrix</span>
                          </div>
                          <p className="text-[11px] leading-snug">
                            As a verified alumnus, you can review student resumes, offer 1-on-1 guidance, and share referrals directly.
                          </p>
                        </div>

                        {/* Review Policy Callout */}
                        <div className="p-2.5 bg-[#FAF9F5] border border-border rounded-sm text-xs text-secondary flex items-start gap-2">
                          <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                          <p className="text-[11px] leading-snug">
                            Manual Trustee Review: Your graduation certificate is verified by senior alumni trustees. Your credentials remain private and protected.
                          </p>
                        </div>

                        {/* Terms and Submit */}
                        <div className="pt-2 border-t border-border space-y-3">
                          <div className="flex items-start gap-2">
                            <input
                              type="checkbox"
                              id="terms-accepted-alumni"
                              {...register("termsAccepted")}
                              className="rounded-xs border-border text-accent focus:ring-accent w-4 h-4 mt-0.5"
                            />
                            <label
                              htmlFor="terms-accepted-alumni"
                              className="text-[11px] text-secondary leading-normal select-none cursor-pointer"
                            >
                              I agree to the{" "}
                              <Link to="/terms" className="text-accent underline font-medium">
                                Terms
                              </Link>{" "}
                              and{" "}
                              <Link to="/privacy" className="text-accent underline font-medium">
                                Privacy Policy
                              </Link>
                              . All submitted documents are authentic.
                            </label>
                          </div>
                          {errors.termsAccepted && (
                            <p className="text-[11px] text-red-600">
                              {errors.termsAccepted.message}
                            </p>
                          )}

                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-11 text-xs font-semibold gap-2 shadow-subtle"
                          >
                            {isSubmitting ? (
                              <span>Submitting alumni application...</span>
                            ) : (
                              <>
                                <span>Submit Alumni Application</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
