import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, allowedRoles, children }) => {
  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
