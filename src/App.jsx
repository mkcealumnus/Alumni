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

import ManageStudents from '@/pages/admin/ManageStudents'
import ManageAlumni from '@/pages/admin/ManageAlumni'
import AdminProfile from '@/pages/admin/AdminProfile'
import ManageRequests from '@/pages/admin/ManageRequests'




// Alumni
import {
  AlumniDashboard,
  AlumniProfile,
  AlumniCareerGuidance,
  AlumniOneOnOneMentorship,
  AlumniGroupMentorship,
  AlumniRoadmaps,
  AlumniWorkshops,
  AlumniJobPortal
} from '@/pages/alumni'


// Student
import StudentDashboard from '@/pages/student/StudentDashboard'
import StudentProfile from '@/pages/student/StudentProfile'
import {
  StudentCareerGuidance,
  StudentOneOnOneMentorship,
  StudentGroupMentorship,
  StudentRoadmaps,
  StudentWorkshops,
  StudentJobPortal
} from '@/pages/student'


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
        <div style={{ padding: '40px', fontFamily: 'Inter, system-ui, sans-serif', maxWidth: '600px', margin: '40px auto' }}>
          <h1 style={{ color: '#12355B', fontSize: '24px', marginBottom: '16px', fontWeight: 700 }}>Something went wrong</h1>
          <p style={{ color: '#475569', marginBottom: '12px' }}>The application encountered an error. Please try refreshing the page.</p>
          <pre style={{ background: '#F1F5F9', padding: '16px', borderRadius: '8px', fontSize: '13px', overflow: 'auto', color: '#0F172A', border: '1px solid #E2E8F0' }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '16px', padding: '10px 24px', background: '#12355B', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
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

          <Route path="/admin/manage-students" element={<ProtectedRoute allowedRoles={['admin']}><ManageStudents /></ProtectedRoute>} />
          <Route path="/admin/manage-alumni" element={<ProtectedRoute allowedRoles={['admin']}><ManageAlumni /></ProtectedRoute>} />
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
          <Route path="/admin/manage-requests" element={<ProtectedRoute allowedRoles={['admin']}><ManageRequests /></ProtectedRoute>} />




          {/* Alumni Routes */}
          <Route path="/alumni" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniDashboard /></ProtectedRoute>} />
          <Route path="/alumni/profile" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniProfile /></ProtectedRoute>} />
          
          <Route path="/alumni/career-guidance" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniCareerGuidance role="alumni" /></ProtectedRoute>} />
          <Route path="/alumni/mentorship" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniOneOnOneMentorship role="alumni" /></ProtectedRoute>} />
          <Route path="/alumni/groups" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniGroupMentorship role="alumni" /></ProtectedRoute>} />
          <Route path="/alumni/roadmaps" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniRoadmaps role="alumni" /></ProtectedRoute>} />
          <Route path="/alumni/workshops" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniWorkshops role="alumni" /></ProtectedRoute>} />
          <Route path="/alumni/jobs" element={<ProtectedRoute allowedRoles={['alumni']}><AlumniJobPortal role="alumni" /></ProtectedRoute>} />


          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><StudentProfile /></ProtectedRoute>} />

          <Route path="/student/career-guidance" element={<ProtectedRoute allowedRoles={['student']}><StudentCareerGuidance role="student" /></ProtectedRoute>} />
          <Route path="/student/mentorship" element={<ProtectedRoute allowedRoles={['student']}><StudentOneOnOneMentorship role="student" /></ProtectedRoute>} />
          <Route path="/student/groups" element={<ProtectedRoute allowedRoles={['student']}><StudentGroupMentorship role="student" /></ProtectedRoute>} />
          <Route path="/student/roadmaps" element={<ProtectedRoute allowedRoles={['student']}><StudentRoadmaps role="student" /></ProtectedRoute>} />
          <Route path="/student/workshops" element={<ProtectedRoute allowedRoles={['student']}><StudentWorkshops role="student" /></ProtectedRoute>} />
          <Route path="/student/jobs" element={<ProtectedRoute allowedRoles={['student']}><StudentJobPortal role="student" /></ProtectedRoute>} />


          {/* Catch-all 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
}

export default App
