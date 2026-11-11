export interface CustomerProfile {
  id: string;
  name: string;
  phone: string;
  defaultAddressId?: string;
}

export interface Address {
  id: string;
  tag: 'home' | 'work' | 'other';
  formattedAddress: string;
  landmark?: string;
  locality: string;
  city: string;
  latitude: number;
  longitude: number;
  pincode: string;
}
