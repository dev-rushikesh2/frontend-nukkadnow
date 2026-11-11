export type DeliveryZoneType = 'RADIUS' | 'PINCODES';

export interface DeliverySettingsConfig {
  enabled: boolean;
  zoneType: DeliveryZoneType;
  radiusKm: number;
  whitelistedPincodes: string[];
  minOrderAmountPaise: number;
  baseDeliveryFeePaise: number;
  freeDeliveryThresholdPaise: number;
  estimatedDeliveryMinutes: number;
  maxDailyDeliveries: number;
  driverNotes?: string;
}

export interface ActiveDeliveryOrder {
  orderId: string;
  tokenNumber: string;
  customerName: string;
  customerAddress: string;
  customerPhoneMasked: string;
  assignedDriverName: string;
  dispatchedAt: string;
  totalPaise: number;
  status: 'OUT_FOR_DELIVERY' | 'DELIVERED';
}

export type DeliverySettingsViewModel = any;
