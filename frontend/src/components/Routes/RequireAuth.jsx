import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthProvider';
import { CircularProgress, Box } from '@mui/material';

/**
 * RequireAuth Component
 * 
 * A wrapper component that protects routes by verifying authentication status.
 * Redirects to login if not authenticated, preserving the intended destination.
 */
const RequireAuth = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but remember where they were trying to go
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log("Authenticated, showing protected content");

  return children;
};

export default RequireAuth;