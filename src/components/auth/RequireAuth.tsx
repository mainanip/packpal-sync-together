
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/auth";

interface RequireAuthProps {
  children: JSX.Element;
  allowedRoles?: UserRole[];
}

const RequireAuth = ({ children, allowedRoles }: RequireAuthProps) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to the login page but save the current location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified, check if the user has one of the allowed roles
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // If user is an admin trying to access owner content, redirect to admin dashboard
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    
    // If user is a member or viewer without access, redirect to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RequireAuth;
