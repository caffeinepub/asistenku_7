// Single source of truth for internal role keys and labels
export const INTERNAL_ROLES = [
  { key: 'superadmin', label: 'Superadmin' },
  { key: 'admin', label: 'Admin' },
  { key: 'concierge', label: 'Concierge' },
  { key: 'strategicpartner', label: 'Strategic Partner' },
  { key: 'manajer', label: 'Manajer' },
  { key: 'finance', label: 'Finance' },
  { key: 'management', label: 'Management' },
  { key: 'asistenmu', label: 'Asistenmu' },
  { key: 'client', label: 'Client' },
  { key: 'partner', label: 'Partner' },
] as const;

export type InternalRoleKey = typeof INTERNAL_ROLES[number]['key'];

export function getRoleLabel(key: string): string {
  const role = INTERNAL_ROLES.find(r => r.key === key);
  return role?.label || key;
}
