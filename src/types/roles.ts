export type UserRole = 'member' | 'moderator' | 'admin' | 'pastor';

export interface RolePermissions {
  canCreateEvents: boolean;
  canEditEvents: boolean;
  canDeleteEvents: boolean;
  canModerateComments: boolean;
  canManageUsers: boolean;
  canAccessAdminPanel: boolean;
  canManagePrayers: boolean;
  canSendNewsletters: boolean;
  canManageRoles: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  member: {
    canCreateEvents: false,
    canEditEvents: false,
    canDeleteEvents: false,
    canModerateComments: false,
    canManageUsers: false,
    canAccessAdminPanel: false,
    canManagePrayers: false,
    canSendNewsletters: false,
    canManageRoles: false
  },
  moderator: {
    canCreateEvents: true,
    canEditEvents: true,
    canDeleteEvents: false,
    canModerateComments: true,
    canManageUsers: false,
    canAccessAdminPanel: true,
    canManagePrayers: true,
    canSendNewsletters: false,
    canManageRoles: false
  },
  admin: {
    canCreateEvents: true,
    canEditEvents: true,
    canDeleteEvents: true,
    canModerateComments: true,
    canManageUsers: true,
    canAccessAdminPanel: true,
    canManagePrayers: true,
    canSendNewsletters: true,
    canManageRoles: false
  },
  pastor: {
    canCreateEvents: true,
    canEditEvents: true,
    canDeleteEvents: true,
    canModerateComments: true,
    canManageUsers: true,
    canAccessAdminPanel: true,
    canManagePrayers: true,
    canSendNewsletters: true,
    canManageRoles: true
  }
};