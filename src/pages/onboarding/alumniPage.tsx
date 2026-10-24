
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileCheck2,
  Briefcase,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { alumniVerificationSchema, ALLOWED_DEPARTMENTS } from "@/lib/validation";

export default function AlumniOnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [formData, setFormData] = useState({
    fullName: "Karthik Subramanian",
    department: "CSE" as const,
    graduationYear: 2017,
    currentCompany: "Amazon Web Services",
    currentRole: "Staff Cloud Architect",
    experienceYears: 7.5,
    locationCity: "Bengaluru",
    linkedinUrl: "https://linkedin.com/in/example-karthik",
    certificateUploaded: false,
    declarationAccepted: false,
  });

  const [certFileName, setCertFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimulateUpload = () => {
    setCertFileName("anna_university_degree_convocation_cert.pdf");
    setFormData((prev) => ({ ...prev, certificateUploaded: true }));
    setErrors((prev) => ({ ...prev, certificateUploaded: "" }));
  };

  const validateStep1 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.fullName || formData.fullName.trim().length < 3) {
      stepErrors.fullName = "Full name is required (min 3 characters).";
    }
    if (!formData.currentCompany || formData.currentCompany.trim().length < 2) {
      stepErrors.currentCompany = "Company name is required.";
    }
    if (!formData.currentRole || formData.currentRole.trim().length < 2) {
      stepErrors.currentRole = "Designation/Role is required.";
    }
    if (formData.graduationYear > 2025 || formData.graduationYear < 1970) {
      stepErrors.graduationYear = "Graduation year must be between 1970 and 2025.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const validateStep2 = () => {
    const stepErrors: Record<string, string> = {};
    if (!formData.certificateUploaded) {
      stepErrors.certificateUploaded = "Anna University degree certificate is required.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleSubmit = () => {
    const result = alumniVerificationSchema.safeParse(formData);
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
      navigate("/onboardingStatus?role=alumni&status=pending");
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Progress Tracker */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-secondary">
          <span>ALUMNI DEGREE VERIFICATION</span>
          <span>STEP {step} OF 3</span>
        </div>
        <div className="w-full bg-[#E8E8E2] h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-accent h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
        <div className="grid grid-cols-3 text-center text-[11px] font-medium text-secondary">
          <span className={step >= 1 ? "text-primary font-semibold" : ""}>1. Career &amp; Batch</span>
          <span className={step >= 2 ? "text-primary font-semibold" : ""}>2. Degree Certificate</span>
          <span className={step === 3 ? "text-primary font-semibold" : ""}>3. Review &amp; Submit</span>
        </div>
      </div>

      <Card className="shadow-subtle">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent" />
              <CardTitle>
                {step === 1 && "Professional Profile & Alumni Batch"}
                {step === 2 && "Anna University Degree Credential"}
                {step === 3 && "Verification Summary"}
              </CardTitle>
            </div>
            <Badge variant="outline" className="font-mono text-[10px]">
              Alumni Verification
            </Badge>
          </div>
          <CardDescription>
            {step === 1 && "Tell us about your engineering degree and current industry role."}
            {step === 2 && "Upload your official degree or provisional certificate for independent trustee audit."}
            {step === 3 && "Final review of your submission before review by the 3 senior alumni trustees."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* STEP 1: CAREER & BATCH */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary">
                  Full Name (as printed on Degree Certificate)
                </label>
                <Input
                  value={formData.fullName}
                  error={!!errors.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="e.g. Karthik Subramanian"
                />
                {errors.fullName && (
                  <p className="text-[11px] text-semantic-error">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary">
                    Graduated Department
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
                    Year of Graduation
                  </label>
                  <Input
                    type="number"
                    value={formData.graduationYear}
                    error={!!errors.graduationYear}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        graduationYear: parseInt(e.target.value) || 2017,
                      })
                    }
                  />
                  {errors.graduationYear && (
                    <p className="text-[11px] text-semantic-error">{errors.graduationYear}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary">
                    Current Employer / Company
                  </label>
                  <Input
                    value={formData.currentCompany}
                    error={!!errors.currentCompany}
                    onChange={(e) =>
                      setFormData({ ...formData, currentCompany: e.target.value })
                    }
                    placeholder="e.g. Amazon Web Services"
                  />
                  {errors.currentCompany && (
                    <p className="text-[11px] text-semantic-error">{errors.currentCompany}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary">
                    Current Designation / Role
                  </label>
                  <Input
                    value={formData.currentRole}
                    error={!!errors.currentRole}
                    onChange={(e) =>
                      setFormData({ ...formData, currentRole: e.target.value })
                    }
                    placeholder="e.g. Staff Cloud Architect"
                  />
                  {errors.currentRole && (
                    <p className="text-[11px] text-semantic-error">{errors.currentRole}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary">
                    Years of Industry Experience
                  </label>
                  <Input
                    type="number"
                    step="0.5"
                    value={formData.experienceYears}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        experienceYears: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-primary">
                    Current City
                  </label>
                  <Input
                    value={formData.locationCity}
                    onChange={(e) =>
                      setFormData({ ...formData, locationCity: e.target.value })
                    }
                    placeholder="e.g. Bengaluru"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-primary">
                  LinkedIn Profile URL (Optional)
                </label>
                <Input
                  value={formData.linkedinUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, linkedinUrl: e.target.value })
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          )}

          {/* STEP 2: DEGREE CERTIFICATE UPLOAD */}
          {step === 2 && (
            <div className="space-y-5">
              <Alert variant="info" title="Official Credential Requirement">
                Alumni verification requires an official Anna University Degree Certificate or Provisional Certificate. Other informal receipts or offer letters are not accepted.
              </Alert>

              <div className="border border-border rounded-md p-5 space-y-3 bg-[#F8F8F5]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-primary">
                      Anna University Degree Certificate (Scan / Photo)
                    </h4>
                    <p className="text-[11px] text-secondary">
                      Must legibly show candidate name, degree title, and university seal.
                    </p>
                  </div>
                  {formData.certificateUploaded ? (
                    <Badge variant="verified" className="gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ready
                    </Badge>
                  ) : (
                    <Badge variant="outline">Required</Badge>
                  )}
                </div>

                {formData.certificateUploaded ? (
                  <div className="flex items-center justify-between p-3 bg-white border border-border rounded-sm text-xs">
                    <div className="flex items-center gap-2 truncate">
                      <FileCheck2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="font-mono text-primary truncate max-w-[280px]">
                        {certFileName}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSimulateUpload}
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
                      onClick={handleSimulateUpload}
                      className="gap-2 w-full text-xs"
                    >
                      <Upload className="w-4 h-4 text-accent" />
                      Select / Simulate Upload Anna Univ Certificate
                    </Button>
                  </div>
                )}
                {errors.certificateUploaded && (
                  <p className="text-[11px] text-semantic-error">{errors.certificateUploaded}</p>
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
                  <span className="text-secondary">Alum Name:</span>
                  <span className="font-medium text-primary">{formData.fullName}</span>
                  <span className="text-secondary">Department &amp; Year:</span>
                  <span className="font-medium text-primary">
                    {formData.department} ({formData.graduationYear})
                  </span>
                  <span className="text-secondary">Company &amp; Role:</span>
                  <span className="font-medium text-primary">
                    {formData.currentRole} at {formData.currentCompany}
                  </span>
                  <span className="text-secondary">Location:</span>
                  <span className="font-medium text-primary">{formData.locationCity}</span>
                  <span className="text-secondary">Degree Credential:</span>
                  <span className="text-semantic-success font-medium">Verified Document Attached</span>
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
                    I affirm that I am an authentic graduate of Anna University and that this certificate is valid. I consent to confidential review by the three senior alumni trustees.
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
            <Button size="sm" onClick={handleNext} className="gap-1.5 text-xs">
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
