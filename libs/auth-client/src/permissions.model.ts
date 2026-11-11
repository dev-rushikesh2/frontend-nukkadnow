export type MerchantPermission = 
  | 'orders:view'
  | 'orders:accept'
  | 'orders:status_prep_ready'
  | 'orders:refund_cancel'
  | 'catalogue:edit_price'
  | 'inventory:adjust_stock'
  | 'staff:invite_remove'
  | 'billing:view_invoices';

export type MerchantStaffRole = 'OWNER' | 'OUTLET_MANAGER' | 'CHEF' | 'CASHIER';

export const ROLE_PERMISSIONS: Record<MerchantStaffRole, MerchantPermission[]> = {
  OWNER: [
    'orders:view',
    'orders:accept',
    'orders:status_prep_ready',
    'orders:refund_cancel',
    'catalogue:edit_price',
    'inventory:adjust_stock',
    'staff:invite_remove',
    'billing:view_invoices'
  ],
  OUTLET_MANAGER: [
    'orders:view',
    'orders:accept',
    'orders:status_prep_ready',
    'orders:refund_cancel',
    'catalogue:edit_price',
    'inventory:adjust_stock'
  ],
  CHEF: [
    'orders:view',
    'orders:accept',
    'orders:status_prep_ready',
    'inventory:adjust_stock'
  ],
  CASHIER: [
    'orders:view',
    'orders:accept',
    'inventory:adjust_stock'
  ]
};
