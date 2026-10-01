import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/context/AuthContext'
import SessionManager from '@/components/ui/SessionManager'
import Loader from '@/components/ui/Loader'

import Home from '@/pages/Home'
import AuthPage from '@/pages/auth/AuthPage'

// Admin
import AdminDashboard from '@/pages/admin/AdminDashboard'
import AdminSettings from '@/pages/admin/AdminSettings'
import SystemReports from '@/pages/admin/SystemReports'
import PerformanceAnalytics from '@/pages/admin/PerformanceAnalytics'
import ManageStudents from '@/pages/admin/ManageStudents'
import CoursesOverview from '@/pages/admin/CoursesOverview'
import ManageAlumni from '@/pages/admin/ManageAlumni'
import AdminProfile from '@/pages/admin/AdminProfile'
import ManageRequests from '@/pages/admin/ManageRequests'
import AdminRevenue from '@/pages/admin/AdminRevenue'

// Alumni
import {
  AlumniDashboard,
  Doubts as AlumniDoubts,
  NewProblemSolving,
  StudentsProgress,
  NewEvents,
  NewAptitude,
  AlumniDiscussion,
  AlumniProfile
} from '@/pages/alumni'

// Student
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
import StudentProfile from '@/pages/student/StudentProfile'

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
          <Route path="/admin/manage-alumni" element={<ProtectedRoute allowedRoles={['admin']}><ManageAlumni /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
          <Route path="/admin/manage-requests" element={<ProtectedRoute allowedRoles={['admin']}><ManageRequests /></ProtectedRoute>} />
          <Route path="/admin/revenue" element={<ProtectedRoute allowedRoles={['admin']}><AdminRevenue /></ProtectedRoute>} />

          {/* Alumni Routes */}
          <Route path="/alumni" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniDashboard /></ProtectedRoute>} />
          <Route path="/alumni/doubts" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniDoubts /></ProtectedRoute>} />
          <Route path="/alumni/students-progress" element={<ProtectedRoute allowedRoles={['alumni']}><StudentsProgress /></ProtectedRoute>} />
          <Route path="/alumni/problem-solving" element={<ProtectedRoute allowedRoles={['alumni']}><NewProblemSolving /></ProtectedRoute>} />
          <Route path="/alumni/aptitude" element={<ProtectedRoute allowedRoles={['alumni']}><NewAptitude /></ProtectedRoute>} />
          <Route path="/alumni/events" element={<ProtectedRoute allowedRoles={['alumni']}><NewEvents /></ProtectedRoute>} />
          <Route path="/alumni/discussion" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniDiscussion /></ProtectedRoute>} />
          <Route path="/alumni/profile" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniProfile /></ProtectedRoute>} />
          
          {/* Admin-accessible Alumni features */}
          <Route path="/admin/doubts" element={<ProtectedRoute allowedRoles={['admin']}><AlumniDoubts /></ProtectedRoute>} />
          <Route path="/admin/students-progress" element={<ProtectedRoute allowedRoles={['admin']}><StudentsProgress /></ProtectedRoute>} />
          <Route path="/admin/problem-solving" element={<ProtectedRoute allowedRoles={['admin']}><NewProblemSolving /></ProtectedRoute>} />
          <Route path="/admin/aptitude" element={<ProtectedRoute allowedRoles={['admin']}><NewAptitude /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute allowedRoles={['admin']}><NewEvents /></ProtectedRoute>} />
          <Route path="/admin/discussion" element={<ProtectedRoute allowedRoles={['admin']}><AlumniDiscussion /></ProtectedRoute>} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/billing" element={<ProtectedRoute allowedRoles={['student']}><StudentBilling /></ProtectedRoute>} />
          <Route path="/student/learning-games" element={<ProtectedRoute allowedRoles={['student']}><LearningGames /></ProtectedRoute>} />
          <Route path="/student/study-material" element={<ProtectedRoute allowedRoles={['student']}><StudyMaterial /></ProtectedRoute>} />
          <Route path="/student/my-courses" element={<ProtectedRoute allowedRoles={['student']}><MyCourses /></ProtectedRoute>} />
          <Route path="/student/coding-practice" element={<ProtectedRoute allowedRoles={['student']}><CodingPractice /></ProtectedRoute>} />
          <Route path="/student/aptitude-tests" element={<ProtectedRoute allowedRoles={['student']}><AptitudeTests /></ProtectedRoute>} />
          <Route path="/student/aptitude-tests/result/:attemptId" element={<ProtectedRoute allowedRoles={['student']}><AptitudeResult /></ProtectedRoute>} />
          <Route path="/student/code-editor" element={<ProtectedRoute allowedRoles={['student']}><CodeEditor /></ProtectedRoute>} />
          <Route path="/student/my-grades" element={<ProtectedRoute allowedRoles={['student']}><MyGrades /></ProtectedRoute>} />
          <Route path="/student/my-progress" element={<ProtectedRoute allowedRoles={['student']}><MyProgress /></ProtectedRoute>} />
          <Route path="/student/my-doubts" element={<ProtectedRoute allowedRoles={['student']}><MyDoubts /></ProtectedRoute>} />
          <Route path="/student/course-viewer/:id" element={<ProtectedRoute allowedRoles={['student']}><CourseViewer /></ProtectedRoute>} />
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
