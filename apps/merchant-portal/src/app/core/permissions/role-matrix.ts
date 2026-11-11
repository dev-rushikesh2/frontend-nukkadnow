export type MerchantPermission =
  | 'orders:view'
  | 'orders:accept'
  | 'orders:cancel'
  | 'catalog:manage'
  | 'pricing:update'
  | 'billing:view'
  | 'staff:manage';

export const RolePermissions: Record<string, MerchantPermission[]> = {
  merchant_owner: ['orders:view', 'orders:accept', 'orders:cancel', 'catalog:manage', 'pricing:update', 'billing:view', 'staff:manage'],
  outlet_manager: ['orders:view', 'orders:accept', 'orders:cancel', 'catalog:manage', 'pricing:update'],
  cashier: ['orders:view', 'orders:accept']
};
