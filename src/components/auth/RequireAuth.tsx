
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
    // If user is an admin, redirect to admin dashboard
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    
    // If user is an owner, redirect to dashboard
    if (user.role === 'owner') {
      return <Navigate to="/dashboard" replace />;
    }
    
    // If user is a member, redirect to member dashboard
    if (user.role === 'member') {
      return <Navigate to="/dashboard" replace />;
    }
    
    // If user is a viewer, redirect to viewer dashboard
    return <Navigate to="/view" replace />;
  }

  return children;
};

export default RequireAuth;
