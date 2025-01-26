import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { usePermissions } from '../hooks/usePermissions';
import { RolePermissions } from '../types/roles';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredPermissions?: (keyof RolePermissions)[];
}

function PrivateRoute({ children, requiredPermissions = [] }: PrivateRouteProps) {
  const { isAuthenticated, loading } = useAuthStore();
  const permissions = usePermissions();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const hasRequiredPermissions = requiredPermissions.every(
    permission => permissions[permission]
  );

  if (requiredPermissions.length > 0 && !hasRequiredPermissions) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default PrivateRoute;