import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Spinner from "./components/Spinner";

function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, role, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    if (role === "admin") {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
