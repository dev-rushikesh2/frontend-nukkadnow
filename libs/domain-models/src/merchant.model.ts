export type SellerMode = 'retail' | 'food_stall' | 'home_maker' | 'seasonal_stall';

export interface Merchant {
  id: string;
  businessName: string;
  sellerMode: SellerMode;
  isHomeMaker: boolean;
  verified: boolean;
}

export interface Outlet {
  id: string;
  merchantId: string;
  name: string;
  locality: string;
  address: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
  activeQueueCount: number;
  averagePrepTimeMinutes: number;
}
