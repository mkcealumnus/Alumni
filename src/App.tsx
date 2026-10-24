import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./components/auth/protectedRoute";
import { RootLayout } from "./components/layout/rootLayout";

// Public Pages
import HomePage from "./pages/landingPage";
import AboutPage from "./pages/public/aboutPage";
import OurGoalPage from "./pages/public/ourGoalPage";
import CareerPage from "./pages/public/careerPage";
import ContactPage from "./pages/public/contactPage";
import PrivacyPolicyPage from "./pages/privacyPage";
import TermsPage from "./pages/termsPage";
import NotFoundPage from "./pages/notFoundPage";

// Auth Pages
import LoginPage from "./pages/auth/loginPage";
import RegisterPage from "./pages/auth/registerPage";
import ForgotPasswordPage from "./pages/auth/forgotPasswordPage";

// Student Portal & Layout
import { StudentDashboardLayout } from "./layouts/studentDashboardLayout";
import StudentDashboardPage from "./pages/student/studentDashboardPage";
import StudentAlumniPage from "./pages/student/studentAlumniPage";
import StudentMentorshipPage from "./pages/student/studentMentorshipPage";
import StudentJobsPage from "./pages/student/studentJobsPage";
import StudentSavedPage from "./pages/student/studentSavedPage";
import StudentMessagesPage from "./pages/student/studentMessagesPage";
import StudentEventsPage from "./pages/student/studentEventsPage";
import StudentProfilePage from "./pages/student/studentProfilePage";
import StudentSettingsPage from "./pages/student/studentSettingsPage";

// Alumni Portal & Layout
import { AlumniDashboardLayout } from "./layouts/alumniDashboardLayout";
import AlumniDashboardPage from "./pages/alumni/alumniDashboardPage";
import AlumniStudentsPage from "./pages/alumni/alumniStudentsPage";
import AlumniMentorshipPage from "./pages/alumni/alumniMentorshipPage";
import AlumniOpportunitiesPage from "./pages/alumni/alumniOpportunitiesPage";
import AlumniMessagesPage from "./pages/alumni/alumniMessagesPage";
import AlumniEventsPage from "./pages/alumni/alumniEventsPage";
import AlumniProfilePage from "./pages/alumni/alumniProfilePage";
import AlumniSettingsPage from "./pages/alumni/alumniSettingsPage";

// Specialized Legacy / Verification Workflows
import StudentOnboardingPage from "./pages/onboarding/studentPage";
import AlumniOnboardingPage from "./pages/onboarding/alumniPage";
import VerificationStatusPage from "./pages/onboarding/statusPage";
import AlumniDirectoryPage from "./pages/directory/directoryPage";
import AdminConsolePage from "./pages/admin/adminPage";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Website Shell (Header & Footer) */}
        <Route element={<RootLayout />}>
          {/* Five Primary Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/our-goal" element={<OurGoalPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/authLogin" element={<LoginPage />} />
          <Route path="/auth/login" element={<LoginPage />} />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/authRegister" element={<RegisterPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />

          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          {/* Public / Directory & Policy Pages */}
          <Route path="/directory" element={<AlumniDirectoryPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />

          {/* Onboarding Intake Verification */}
          <Route path="/onboardingStudent" element={<StudentOnboardingPage />} />
          <Route path="/onboarding/student" element={<StudentOnboardingPage />} />
          <Route path="/onboardingAlumni" element={<AlumniOnboardingPage />} />
          <Route path="/onboarding/alumni" element={<AlumniOnboardingPage />} />
          <Route path="/onboardingStatus" element={<VerificationStatusPage />} />
          <Route path="/onboarding/status" element={<VerificationStatusPage />} />

          {/* Senior Admin Console (Strict 3-Trustee Platform Management) */}
          <Route path="/admin" element={<AdminConsolePage />} />

          {/* Legacy Portal Redirects */}
          <Route path="/portalStudent" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/portal/student" element={<Navigate to="/student/dashboard" replace />} />
          {/* Global Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Student Protected Dashboard Environment */}
        <Route
          element={
            <ProtectedRoute allowedRole="student">
              <StudentDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
          <Route path="/student/dashboard" element={<StudentDashboardPage />} />
          <Route path="/student/alumni" element={<StudentAlumniPage />} />
          <Route path="/student/mentorship" element={<StudentMentorshipPage />} />
          <Route path="/student/jobs" element={<StudentJobsPage />} />
          <Route path="/student/saved" element={<StudentSavedPage />} />
          <Route path="/student/messages" element={<StudentMessagesPage />} />
          <Route path="/student/events" element={<StudentEventsPage />} />
          <Route path="/student/profile" element={<StudentProfilePage />} />
          <Route path="/student/settings" element={<StudentSettingsPage />} />
        </Route>

        {/* Alumni Protected Dashboard Environment */}
        <Route
          element={
            <ProtectedRoute allowedRole="alumni">
              <AlumniDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/alumni" element={<Navigate to="/alumni/dashboard" replace />} />
          <Route path="/alumni/dashboard" element={<AlumniDashboardPage />} />
          <Route path="/alumni/students" element={<AlumniStudentsPage />} />
          <Route path="/alumni/mentorship" element={<AlumniMentorshipPage />} />
          <Route path="/alumni/opportunities" element={<AlumniOpportunitiesPage />} />
          <Route path="/alumni/messages" element={<AlumniMessagesPage />} />
          <Route path="/alumni/events" element={<AlumniEventsPage />} />
          <Route path="/alumni/profile" element={<AlumniProfilePage />} />
          <Route path="/alumni/settings" element={<AlumniSettingsPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
