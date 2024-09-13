import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../../store/Store'; 

const ProtectedRoute: React.FC = () => {
  const sessionId = useSelector((state: RootState) => state.user.sessionId);
  const location = useLocation();

  if (!sessionId) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;