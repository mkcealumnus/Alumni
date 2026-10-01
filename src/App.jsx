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
import AdminProfile from '@/pages/admin/AdminProfile'
import ManageRequests from '@/pages/admin/ManageRequests'
import StudentDashboard from '@/pages/student/StudentDashboard'

import MyProgress from '@/pages/student/MyProgress'
import MyDoubts from '@/pages/student/MyDoubts'
import StudentProfile from '@/pages/student/StudentProfile'

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
          <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><AdminProfile /></ProtectedRoute>} />
          <Route path="/admin/manage-requests" element={<ProtectedRoute allowedRoles={['admin']}><ManageRequests /></ProtectedRoute>} />

          {/* Admin-accessible features (same pages, admin layout) */}

          {/* Content Management (admin accessible) */}
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/my-progress" element={<ProtectedRoute allowedRoles={['student']}><MyProgress /></ProtectedRoute>} />
          <Route path="/student/my-doubts" element={<ProtectedRoute allowedRoles={['student']}><MyDoubts /></ProtectedRoute>} />
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
