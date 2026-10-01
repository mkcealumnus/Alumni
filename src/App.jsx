import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import SessionManager from '@/components/ui/SessionManager'
// import SecurityGuard from '@/components/ui/SecurityGuard'
import Loader from '@/components/ui/Loader'


import Home from '@/pages/Home'
import AuthPage from '@/pages/auth/AuthPage'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminSettings from '@/pages/admin/AdminSettings'
import SystemReports from '@/pages/admin/SystemReports'
import PerformanceAnalytics from '@/pages/admin/PerformanceAnalytics'
import ManageStudents from '@/pages/admin/ManageStudents'
import CoursesOverview from '@/pages/admin/CoursesOverview'
import ManageMentors from '@/pages/admin/ManageMentors'
import AdminProfile from '@/pages/admin/AdminProfile'
import ManageRequests from '@/pages/admin/ManageRequests'
import MentorDashboard from '@/pages/mentor/MentorDashboard'
import MentorDoubts from '@/pages/mentor/Doubts'
import NewProblemSolving from '@/pages/mentor/NewProblemSolving'
import StudentsProgress from '@/pages/mentor/StudentsProgress'
import NewEvents from '@/pages/mentor/NewEvents'
import NewAptitude from '@/pages/mentor/NewAptitude'
import MentorDiscussion from '@/pages/mentor/MentorDiscussion'

import MentorProfile from '@/pages/mentor/MentorProfile'
import StudentDashboard from '@/pages/student/StudentDashboard'
import LearningGames from '@/pages/student/LearningGames'
import StudyMaterial from '@/pages/student/StudyMaterial'
import MyCourses from '@/pages/student/MyCourses'
import CodingPractice from '@/pages/student/CodingPractice'
import AptitudeTests from '@/pages/student/AptitudeTests'
import AptitudeResult from '@/pages/student/AptitudeResult'
import CodeEditor from '@/pages/student/CodeEditor'
import MyGrades from '@/pages/student/MyGrades'

import MyProgress from '@/pages/student/MyProgress'
import CourseViewer from '@/pages/student/CourseViewer'
import MyDoubts from '@/pages/student/MyDoubts'
import StudentBilling from '@/pages/student/StudentBilling'
import AdminRevenue from '@/pages/admin/AdminRevenue'
import StudentProfile from '@/pages/student/StudentProfile'

import { CreatorDashboard, CreatorCourses, CreatorProblemSolving, CreatorAptitude, CreatorStudyMaterial, CreatorProfile } from '@/pages/creator'
import { ManagerDashboard, ManagerAnalytics, ManagerCohortProgress, ManagerCurriculum, ManagerReports, ManagerProfile } from '@/pages/manager'
import { ObserverDashboard, ObserverCatalog, ObserverAptitude, ObserverGames, ObserverMaterials, ObserverProfile } from '@/pages/observer'

// Error Boundary to catch runtime errors and show a visible message
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('React Error Boundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '40px auto' }}>
          <h1 style={{ color: '#c96442', fontSize: '24px', marginBottom: '16px' }}>Something went wrong</h1>
          <p style={{ color: '#666', marginBottom: '12px' }}>The application encountered an error. Please try refreshing the page.</p>
          <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto', color: '#e8e8e8' }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '16px', padding: '10px 24px', background: '#c96442', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px' }}>
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  if (loading) return <Loader fullPage text="Verifying session..." />;
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) return <Navigate to="/auth" replace />;
  return children;
};

function App() {
  return (
    <ErrorBoundary>
      {/* <SecurityGuard /> */}
      <Router basename="/">
        <AuthProvider>
          <SessionManager />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/system-reports" element={<ProtectedRoute allowedRoles={['admin']}><SystemReports /></ProtectedRoute>} />
          <Route path="/admin/performance-analytics" element={<ProtectedRoute allowedRoles={['admin']}><PerformanceAnalytics /></ProtectedRoute>} />
          <Route path="/admin/manage-students" element={<ProtectedRoute allowedRoles={['admin']}><ManageStudents /></ProtectedRoute>} />
          <Route path="/admin/courses-overview" element={<ProtectedRoute allowedRoles={['admin']}><CoursesOverview /></ProtectedRoute>} />
          <Route path="/admin/manage-mentors" element={<ProtectedRoute allowedRoles={['admin']}><ManageMentors /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
          <Route path="/admin/manage-requests" element={<ProtectedRoute allowedRoles={['admin']}><ManageRequests /></ProtectedRoute>} />
          <Route path="/admin/revenue" element={<ProtectedRoute allowedRoles={['admin']}><AdminRevenue /></ProtectedRoute>} />

          {/* Mentor / Instructor Routes */}
          <Route path="/mentor" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><MentorDashboard /></ProtectedRoute>} />
          <Route path="/mentor/doubts" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><MentorDoubts /></ProtectedRoute>} />
          <Route path="/mentor/students-progress" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><StudentsProgress /></ProtectedRoute>} />
          <Route path="/mentor/problem-solving" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><NewProblemSolving /></ProtectedRoute>} />
          <Route path="/mentor/aptitude" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><NewAptitude /></ProtectedRoute>} />
          <Route path="/mentor/events" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><NewEvents /></ProtectedRoute>} />
          <Route path="/mentor/discussion" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><MentorDiscussion /></ProtectedRoute>} />
          <Route path="/mentor/profile" element={<ProtectedRoute allowedRoles={['instructor', 'mentor']}><MentorProfile /></ProtectedRoute>} />
          
          {/* Creator Routes */}
          <Route path="/creator" element={<ProtectedRoute allowedRoles={['creator', 'admin']}><CreatorDashboard /></ProtectedRoute>} />
          <Route path="/creator/courses" element={<ProtectedRoute allowedRoles={['creator', 'admin']}><CreatorCourses /></ProtectedRoute>} />
          <Route path="/creator/problem-solving" element={<ProtectedRoute allowedRoles={['creator', 'admin']}><CreatorProblemSolving /></ProtectedRoute>} />
          <Route path="/creator/aptitude" element={<ProtectedRoute allowedRoles={['creator', 'admin']}><CreatorAptitude /></ProtectedRoute>} />
          <Route path="/creator/study-material" element={<ProtectedRoute allowedRoles={['creator', 'admin']}><CreatorStudyMaterial /></ProtectedRoute>} />
          <Route path="/creator/profile" element={<ProtectedRoute allowedRoles={['creator', 'admin']}><CreatorProfile /></ProtectedRoute>} />

          {/* Manager Routes */}
          <Route path="/manager" element={<ProtectedRoute allowedRoles={['manager', 'admin']}><ManagerDashboard /></ProtectedRoute>} />
          <Route path="/manager/analytics" element={<ProtectedRoute allowedRoles={['manager', 'admin']}><ManagerAnalytics /></ProtectedRoute>} />
          <Route path="/manager/cohort-progress" element={<ProtectedRoute allowedRoles={['manager', 'admin']}><ManagerCohortProgress /></ProtectedRoute>} />
          <Route path="/manager/curriculum" element={<ProtectedRoute allowedRoles={['manager', 'admin']}><ManagerCurriculum /></ProtectedRoute>} />
          <Route path="/manager/reports" element={<ProtectedRoute allowedRoles={['manager', 'admin']}><ManagerReports /></ProtectedRoute>} />
          <Route path="/manager/profile" element={<ProtectedRoute allowedRoles={['manager', 'admin']}><ManagerProfile /></ProtectedRoute>} />

          {/* Observer Routes */}
          <Route path="/observer" element={<ProtectedRoute allowedRoles={['observer', 'admin']}><ObserverDashboard /></ProtectedRoute>} />
          <Route path="/observer/catalog" element={<ProtectedRoute allowedRoles={['observer', 'admin']}><ObserverCatalog /></ProtectedRoute>} />
          <Route path="/observer/aptitude" element={<ProtectedRoute allowedRoles={['observer', 'admin']}><ObserverAptitude /></ProtectedRoute>} />
          <Route path="/observer/games" element={<ProtectedRoute allowedRoles={['observer', 'admin']}><ObserverGames /></ProtectedRoute>} />
          <Route path="/observer/materials" element={<ProtectedRoute allowedRoles={['observer', 'admin']}><ObserverMaterials /></ProtectedRoute>} />
          <Route path="/observer/profile" element={<ProtectedRoute allowedRoles={['observer', 'admin']}><ObserverProfile /></ProtectedRoute>} />

          {/* Admin-accessible Mentor features (same pages, admin layout) */}
          <Route path="/admin/doubts" element={<ProtectedRoute allowedRoles={['admin']}><MentorDoubts /></ProtectedRoute>} />
          <Route path="/admin/students-progress" element={<ProtectedRoute allowedRoles={['admin']}><StudentsProgress /></ProtectedRoute>} />

          {/* Content Management (creator & admin accessible) */}
          <Route path="/admin/problem-solving" element={<ProtectedRoute allowedRoles={['admin', 'creator']}><NewProblemSolving /></ProtectedRoute>} />
          <Route path="/admin/aptitude" element={<ProtectedRoute allowedRoles={['admin', 'creator']}><NewAptitude /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin', 'creator']}><NewEvents /></ProtectedRoute>} />
          <Route path="/admin/discussion" element={<ProtectedRoute allowedRoles={['admin', 'creator']}><MentorDiscussion /></ProtectedRoute>} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/billing" element={<ProtectedRoute allowedRoles={['student', 'observer']}><StudentBilling /></ProtectedRoute>} />
          <Route path="/student/learning-games" element={<ProtectedRoute allowedRoles={['student', 'observer']}><LearningGames /></ProtectedRoute>} />
          <Route path="/student/study-material" element={<ProtectedRoute allowedRoles={['student', 'creator', 'observer']}><StudyMaterial /></ProtectedRoute>} />
          <Route path="/student/my-courses" element={<ProtectedRoute allowedRoles={['student', 'observer']}><MyCourses /></ProtectedRoute>} />
          <Route path="/student/coding-practice" element={<ProtectedRoute allowedRoles={['student', 'observer']}><CodingPractice /></ProtectedRoute>} />
          <Route path="/student/aptitude-tests" element={<ProtectedRoute allowedRoles={['student', 'observer']}><AptitudeTests /></ProtectedRoute>} />
          <Route path="/student/aptitude-tests/result/:attemptId" element={<ProtectedRoute allowedRoles={['student']}><AptitudeResult /></ProtectedRoute>} />
          <Route path="/student/code-editor" element={<ProtectedRoute allowedRoles={['student', 'observer']}><CodeEditor /></ProtectedRoute>} />
          <Route path="/student/my-grades" element={<ProtectedRoute allowedRoles={['student']}><MyGrades /></ProtectedRoute>} />

          <Route path="/student/my-progress" element={<ProtectedRoute allowedRoles={['student']}><MyProgress /></ProtectedRoute>} />
          <Route path="/student/my-doubts" element={<ProtectedRoute allowedRoles={['student']}><MyDoubts /></ProtectedRoute>} />
          <Route path="/student/course-viewer/:id" element={<ProtectedRoute allowedRoles={['student', 'observer']}><CourseViewer /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />

          {/* Catch-all 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
    </ErrorBoundary>
  )
}

export default App
