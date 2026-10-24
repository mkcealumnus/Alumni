import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: "student" | "alumni";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F8F5]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-mono text-secondary">
            Verifying Alumnux demo session...
          </p>
        </div>
      </div>
    );
  }

  // If not authenticated, redirect to login page with return target
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user role does not match the required role, redirect to their own dashboard
  if (allowedRole && user.role !== allowedRole) {
    const targetDashboard =
      user.role === "student" ? "/student/dashboard" : "/alumni/dashboard";
    return <Navigate to={targetDashboard} replace />;
  }

  return <>{children}</>;
};
