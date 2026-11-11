export type SellerMode = 'RETAIL' | 'HOME_MAKER' | 'PRODUCER' | 'SEASONAL';

export interface OnboardingDraft {
  step: number;
  sellerMode: SellerMode;
  businessName: string;
  category: string;
  description: string;
  isHomeMaker: boolean;
  locality: string;
  addressLine: string;
  landmark: string;
  pincode: string;
  pickupPointName: string;
  enablePickup: boolean;
  enableDelivery: boolean;
  deliveryRadiusKm: number;
  fssaiNumber?: string;
  gstin?: string;
  termsAccepted: boolean;
}

export const INITIAL_DRAFT: OnboardingDraft = {
  step: 1,
  sellerMode: 'RETAIL',
  businessName: '',
  category: 'Grocery & Daily Needs',
  description: '',
  isHomeMaker: false,
  locality: 'Dharampeth',
  addressLine: '',
  landmark: '',
  pincode: '440010',
  pickupPointName: '',
  enablePickup: true,
  enableDelivery: false,
  deliveryRadiusKm: 3,
  termsAccepted: false
};

export type OnboardingViewModel = any;
