export interface AuthUser {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  roles: ('customer' | 'merchant_owner' | 'outlet_manager' | 'cashier')[];
  tenantId?: string;
  outletId?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  user: AuthUser;
}
