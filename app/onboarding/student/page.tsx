"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileCheck2,
  AlertCircle,
  GraduationCap,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { studentVerificationSchema, ALLOWED_DEPARTMENTS } from "@/lib/validation";

export default function StudentOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "Priya Dharshini R.",
    department: "CSE" as const,
    graduationYear: 2026,
    rollNumber: "2022CSE1042",
    idFrontUploaded: false,
    idBackUploaded: false,
    declarationAccepted: false,
  });

  const [frontFileName, setFrontFileName] = useState<string | null>(null);
  const [backFileName, setBackFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimulateUpload = (side: "front" | "back") => {
    if (side === "front") {
      setFrontFileName("college_id_front_2022CSE1042.jpg");
      setFormData((prev) => ({ ...prev, idFrontUploaded: true }));
      setErrors((prev) => ({ ...prev, idFrontUploaded: "" }));
    } else {
      setBackFileName("college_id_back_2022CSE1042.jpg");
      setFormData((prev) => ({ ...prev, idBackUploaded: true }));
      setErrors((prev) => ({ ...prev, idBackUploaded: "" }));
    }
  };

  const validateStep1 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      stepErrors.fullName = "Full name must be at least 3 characters.";
    }
    if (!formData.rollNumber || formData.rollNumber.trim().length < 5) {
      stepErrors.rollNumber = "Roll/Register number is required (min 5 chars).";
    }
    if (formData.graduationYear < 2024 || formData.graduationYear > 2032) {
      stepErrors.graduationYear = "Expected graduation year must be between 2024 and 2032.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.idFrontUploaded) {
      stepErrors.idFrontUploaded = "College ID Front image is required.";
    }
    if (!formData.idBackUploaded) {
      stepErrors.idBackUploaded = "College ID Back image is required.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    const result = studentVerificationSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0].toString()] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/onboarding/status?role=student&status=pending");
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress Tracker */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-secondary">
          <span>STUDENT VERIFICATION INTAKE</span>
          <span>STEP {step} OF 3</span>
        </div>
        <div className="w-full bg-[#E8E8E2] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 text-center text-[11px] font-medium text-secondary">
          <span className={step >= 1 ? "text-primary font-semibold" : ""}>1. Academic Details</span>
          <span className={step >= 2 ? "text-primary font-semibold" : ""}>2. Upload ID Cards</span>
          <span className={step === 3 ? "text-primary font-semibold" : ""}>3. Review &amp; Submit</span>
        </div>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              <CardTitle>
                {step === 1 && "Academic Information"}
                {step === 2 && "Identity Document Upload"}
                {step === 3 && "Review Submission"}
              </CardTitle>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              DPDP 2023 Encrypted
            </Badge>
          </div>
          <CardDescription>
            {step === 1 && "Provide your current college enrollment details for administrative review."}
            {step === 2 && "Upload clear photos of your college ID card front and back."}
            {step === 3 && "Confirm the information before sending it to the three senior alumni trustees."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* STEP 1: ACADEMIC DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary">
                  Full Name (as printed on College ID)
                </label>
                <Input
                  value={formData.fullName}
                  error={!!errors.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Priya Dharshini R."
                />
                {errors.fullName && (
                  <p className="text-[11px] text-semantic-error">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary">
                    Academic Department
                  </label>
                  <Select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        department: e.target.value as any,
                      })
                    }
                  >
                    {ALLOWED_DEPARTMENTS.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary">
                    Expected Graduation Year
                  </label>
                  <Input
                    type="number"
                    value={formData.graduationYear}
                    error={!!errors.graduationYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        graduationYear: parseInt(e.target.value) || 2026,
                      })
                    }
                  />
                  {errors.graduationYear && (
                    <p className="text-[11px] text-semantic-error">{errors.graduationYear}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary">
                  College Register / Roll Number
                </label>
                <Input
                  value={formData.rollNumber}
                  error={!!errors.rollNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, rollNumber: e.target.value })
                  }
                  placeholder="e.g. 2022CSE1042"
                />
                <p className="text-[11px] text-secondary">
                  Used by the 3 alumni trustees solely to verify authentic current enrollment.
                </p>
                {errors.rollNumber && (
                  <p className="text-[11px] text-semantic-error">{errors.rollNumber}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: UPLOAD ID CARDS */}
          {step === 2 && (
            <div className="space-y-5">
              <Alert variant="info" title="Verification Evidence Standards">
                Documents are stored in a private encrypted bucket and never made public. Ensure your name, photo, and academic year are clearly legible.
              </Alert>

              {/* ID Front Upload Box */}
              <div className="border border-border rounded-md p-4 space-y-2 bg-[#F8F8F5]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-primary">
                      1. College ID Card (Front)
                    </h4>
                    <p className="text-[11px] text-secondary">
                      Must show student photo, register number, and department.
                    </p>
                  </div>
                  {formData.idFrontUploaded ? (
                    <Badge variant="verified" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Uploaded
                    </Badge>
                  ) : (
                    <Badge variant="outline">Required</Badge>
                  )}
                </div>

                {formData.idFrontUploaded ? (
                  <div className="flex items-center justify-between p-2.5 bg-white border border-border rounded-sm text-xs">
                    <span className="font-mono text-primary truncate max-w-[260px]">
                      {frontFileName}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSimulateUpload("front")}
                      className="text-[11px] h-7"
                    >
                      Replace
                    </Button>
                  </div>
                ) : (
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSimulateUpload("front")}
                      className="gap-2 w-full text-xs"
                    >
                      <Upload className="w-4 h-4 text-accent" />
                      Select / Simulate Upload ID Front
                    </Button>
                  </div>
                )}
                {errors.idFrontUploaded && (
                  <p className="text-[11px] text-semantic-error">{errors.idFrontUploaded}</p>
                )}
              </div>

              {/* ID Back Upload Box */}
              <div className="border border-border rounded-md p-4 space-y-2 bg-[#F8F8F5]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-primary">
                      2. College ID Card (Back)
                    </h4>
                    <p className="text-[11px] text-secondary">
                      Must exhibit valid academic year or authorized signature seal.
                    </p>
                  </div>
                  {formData.idBackUploaded ? (
                    <Badge variant="verified" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Uploaded
                    </Badge>
                  ) : (
                    <Badge variant="outline">Required</Badge>
                  )}
                </div>

                {formData.idBackUploaded ? (
                  <div className="flex items-center justify-between p-2.5 bg-white border border-border rounded-sm text-xs">
                    <span className="font-mono text-primary truncate max-w-[260px]">
                      {backFileName}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSimulateUpload("back")}
                      className="text-[11px] h-7"
                    >
                      Replace
                    </Button>
                  </div>
                ) : (
                  <div className="pt-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => handleSimulateUpload("back")}
                      className="gap-2 w-full text-xs"
                    >
                      <Upload className="w-4 h-4 text-accent" />
                      Select / Simulate Upload ID Back
                    </Button>
                  </div>
                )}
                {errors.idBackUploaded && (
                  <p className="text-[11px] text-semantic-error">{errors.idBackUploaded}</p>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & SUBMIT */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="border border-border rounded-md p-4 bg-[#F8F8F5] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-secondary">
                  Submission Summary
                </h4>
                <div className="grid grid-cols-2 gap-y-2 text-xs">
                  <span className="text-secondary">Student Name:</span>
                  <span className="font-medium text-primary">{formData.fullName}</span>
                  <span className="text-secondary">Department:</span>
                  <span className="font-medium text-primary">{formData.department}</span>
                  <span className="text-secondary">Expected Batch:</span>
                  <span className="font-medium text-primary">{formData.graduationYear}</span>
                  <span className="text-secondary">Register Number:</span>
                  <span className="font-mono text-primary">{formData.rollNumber}</span>
                  <span className="text-secondary">Evidence Files:</span>
                  <span className="text-semantic-success font-medium">
                    2 Document Scans Ready
                  </span>
                </div>
              </div>

              {/* Declaration Checkbox */}
              <div className="p-3 bg-surface border border-border rounded-sm space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-primary">
                  <input
                    type="checkbox"
                    checked={formData.declarationAccepted}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        declarationAccepted: e.target.checked,
                      })
                    }
                    className="mt-0.5 rounded-sm border-border text-accent focus:ring-accent"
                  />
                  <span>
                    I solemnly certify that I am a bonafide student and that the submitted college ID credentials are authentic and unedited. I understand that forged credentials will result in permanent disqualification.
                  </span>
                </label>
                {errors.declarationAccepted && (
                  <p className="text-[11px] text-semantic-error pl-6">
                    {errors.declarationAccepted}
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          {step > 1 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="gap-1.5 text-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <Button size="sm" onClick={handleNextStep} className="gap-1.5 text-xs">
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSubmit}
              isLoading={isSubmitting}
              className="gap-1.5 text-xs font-semibold"
            >
              Submit for Verification
              <CheckCircle2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
