
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRoutesProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

const ProtectedRoutes = ({ isLoggedIn, children }: ProtectedRoutesProps) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoutes;
