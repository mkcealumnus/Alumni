import { Routes, Route } from "react-router-dom";
import { RootLayout } from "./components/layout/rootLayout";
import HomePage from "./pages/landingPage";
import LoginPage from "./pages/auth/loginPage";
import RegisterPage from "./pages/auth/registerPage";
import StudentOnboardingPage from "./pages/onboarding/studentPage";
import AlumniOnboardingPage from "./pages/onboarding/alumniPage";
import VerificationStatusPage from "./pages/onboarding/statusPage";
import StudentDashboardPage from "./pages/portal/studentPage";
import AlumniDirectoryPage from "./pages/directory/directoryPage";
import AdminConsolePage from "./pages/admin/adminPage";
import PrivacyPolicyPage from "./pages/privacyPage";
import TermsPage from "./pages/termsPage";
import NotFoundPage from "./pages/notFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Authentication Routes (camelCase primary + aliases) */}
        <Route path="/authLogin" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/login" element={<LoginPage />} />

        <Route path="/authRegister" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />

        {/* Onboarding & Verification Intake (camelCase primary + aliases) */}
        <Route path="/onboardingStudent" element={<StudentOnboardingPage />} />
        <Route path="/onboarding/student" element={<StudentOnboardingPage />} />

        <Route path="/onboardingAlumni" element={<AlumniOnboardingPage />} />
        <Route path="/onboarding/alumni" element={<AlumniOnboardingPage />} />

        <Route path="/onboardingStatus" element={<VerificationStatusPage />} />
        <Route path="/onboarding/status" element={<VerificationStatusPage />} />

        {/* Portals & Directory (camelCase primary + aliases) */}
        <Route path="/portalStudent" element={<StudentDashboardPage />} />
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
