import { Injectable, signal } from '@angular/core';
import { DeliverySettingsConfig, ActiveDeliveryOrder } from '../models/delivery-settings-view.model';

const DEFAULT_CONFIG: DeliverySettingsConfig = {
  enabled: true,
  zoneType: 'RADIUS',
  radiusKm: 3.5,
  whitelistedPincodes: ['440010', '440012', '440015', '440022'],
  minOrderAmountPaise: 15000, // ₹150
  baseDeliveryFeePaise: 3000,  // ₹30
  freeDeliveryThresholdPaise: 40000, // ₹400
  estimatedDeliveryMinutes: 35,
  maxDailyDeliveries: 40,
  driverNotes: 'Self-delivery partner: Kishore (+91 98230 *****). Call store if delayed.'
};

const INITIAL_ACTIVE_DELIVERIES: ActiveDeliveryOrder[] = [
  {
    orderId: '#NK-1088',
    tokenNumber: '#DL-12',
    customerName: 'Rohit Kothari',
    customerAddress: 'Flat 302, Sai Sagar Apt, Gokulpeth, Nagpur (Near Post Office)',
    customerPhoneMasked: '+91 98222 *****',
    assignedDriverName: 'Kishore (Store Rider)',
    dispatchedAt: '12 mins ago',
    totalPaise: 38000,
    status: 'OUT_FOR_DELIVERY'
  },
  {
    orderId: '#NK-1092',
    tokenNumber: '#DL-13',
    customerName: 'Anjali Sharma',
    customerAddress: 'Plot 14, Shankar Nagar Square, Dharampeth Extension, Nagpur',
    customerPhoneMasked: '+91 94228 *****',
    assignedDriverName: 'Kishore (Store Rider)',
    dispatchedAt: '5 mins ago',
    totalPaise: 52000,
    status: 'OUT_FOR_DELIVERY'
  }
];

@Injectable()
export class DeliverySettingsStore {
  readonly config = signal<DeliverySettingsConfig>({ ...DEFAULT_CONFIG });
  readonly activeDeliveries = signal<ActiveDeliveryOrder[]>(INITIAL_ACTIVE_DELIVERIES);
  readonly dirty = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);
  readonly saveSuccess = signal<boolean>(false);

  toggleDelivery(): void {
    this.config.update(c => ({ ...c, enabled: !c.enabled }));
    this.dirty.set(true);
  }

  setZoneType(type: 'RADIUS' | 'PINCODES'): void {
    this.config.update(c => ({ ...c, zoneType: type }));
    this.dirty.set(true);
  }

  setRadius(km: number): void {
    this.config.update(c => ({ ...c, radiusKm: Math.max(0.5, Math.min(15, km)) }));
    this.dirty.set(true);
  }

  addPincode(pin: string): void {
    const clean = pin.trim();
    if (!clean || clean.length !== 6 || this.config().whitelistedPincodes.includes(clean)) return;
    this.config.update(c => ({ ...c, whitelistedPincodes: [...c.whitelistedPincodes, clean] }));
    this.dirty.set(true);
  }

  removePincode(pin: string): void {
    this.config.update(c => ({ ...c, whitelistedPincodes: c.whitelistedPincodes.filter(p => p !== pin) }));
    this.dirty.set(true);
  }

  setMinOrder(rupees: number): void {
    this.config.update(c => ({ ...c, minOrderAmountPaise: Math.round(rupees * 100) }));
    this.dirty.set(true);
  }

  setBaseFee(rupees: number): void {
    this.config.update(c => ({ ...c, baseDeliveryFeePaise: Math.round(rupees * 100) }));
    this.dirty.set(true);
  }

  setFreeThreshold(rupees: number): void {
    this.config.update(c => ({ ...c, freeDeliveryThresholdPaise: Math.round(rupees * 100) }));
    this.dirty.set(true);
  }

  setEstimatedMinutes(mins: number): void {
    this.config.update(c => ({ ...c, estimatedDeliveryMinutes: Math.max(15, Math.min(120, mins)) }));
    this.dirty.set(true);
  }

  saveSettings(): void {
    this.isSaving.set(true);
    setTimeout(() => {
      this.isSaving.set(false);
      this.saveSuccess.set(true);
      this.dirty.set(false);
      setTimeout(() => this.saveSuccess.set(false), 3000);
    }, 400);
  }

  markDelivered(orderId: string): void {
    this.activeDeliveries.update(list =>
      list.map(d => d.orderId === orderId ? { ...d, status: 'DELIVERED' as const } : d)
    );
  }
}
