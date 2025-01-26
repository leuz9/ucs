import { useMemo } from 'react';
import useAuthStore from '../store/authStore';
import { ROLE_PERMISSIONS, RolePermissions } from '../types/roles';

export function usePermissions(): RolePermissions {
  const { user } = useAuthStore();

  return useMemo(() => {
    if (!user || !user.role) {
      return ROLE_PERMISSIONS.member;
    }
    return ROLE_PERMISSIONS[user.role as keyof typeof ROLE_PERMISSIONS] || ROLE_PERMISSIONS.member;
  }, [user]);
}