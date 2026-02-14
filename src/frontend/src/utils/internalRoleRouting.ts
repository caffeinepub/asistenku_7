import { INTERNAL_ROLES, type InternalRoleKey } from './internalRoles';

// Centralized role-to-dashboard route mapping
const ROLE_ROUTES: Record<string, string | undefined> = {
  superadmin: '/superadmin/dashboard',
  admin: '/admin/dashboard',
  concierge: '/concierge/dashboard',
  strategicpartner: '/strategicpartner/dashboard',
  manajer: '/manajer/dashboard',
  finance: '/finance/dashboard',
  management: '/management/dashboard',
  asistenmu: '/asistenmu/dashboard',
  client: '/client/dashboard',
  partner: '/partner/dashboard',
};

// Get the dashboard route for a role
export function getRoleRoute(roleKey: string): string | undefined {
  return ROLE_ROUTES[roleKey];
}

// Check if a role has a dashboard route
export function hasRoleRoute(roleKey: string): boolean {
  return !!ROLE_ROUTES[roleKey];
}

// Get workspace cards to display (roles that should appear as workspace options)
export function getWorkspaceRoles() {
  // All internal roles except client and partner (they have separate login flows)
  return INTERNAL_ROLES.filter(role => role.key !== 'client' && role.key !== 'partner');
}
