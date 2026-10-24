import { Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/layout/root-layout";
import HomePage from "./pages/landing-page";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import StudentOnboardingPage from "./pages/onboarding/student-page";
import AlumniOnboardingPage from "./pages/onboarding/alumni-page";
import VerificationStatusPage from "./pages/onboarding/status-page";
import StudentDashboardPage from "./pages/portal/student-page";
import AlumniDirectoryPage from "./pages/directory/directory-page";
import AdminConsolePage from "./pages/admin/admin-page";
import PrivacyPolicyPage from "./pages/privacy-page";
import TermsPage from "./pages/terms-page";
import NotFoundPage from "./pages/not-found-page";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication Routes (both aliases supported) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Onboarding & Verification Intake */}
        <Route path="/onboarding/student" element={<StudentOnboardingPage />} />
        <Route path="/onboarding/alumni" element={<AlumniOnboardingPage />} />
        <Route path="/onboarding/status" element={<VerificationStatusPage />} />

        {/* Portals & Directory */}
        <Route path="/portal/student" element={<StudentDashboardPage />} />
        <Route path="/directory" element={<AlumniDirectoryPage />} />

        {/* Senior Admin Console (Governed strictly by 3 senior trustees) */}
        <Route path="/admin" element={<AdminConsolePage />} />

        {/* Policy & Legal */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
