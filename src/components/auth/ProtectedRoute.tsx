
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  allowedRoles = [] 
}) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    // If specific roles are required and user doesn't have permission
    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
      navigate("/unauthorized");
    }
  }, [isAuthenticated, navigate, allowedRoles, user]);

  // Don't render anything if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't render if user doesn't have the required role
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
