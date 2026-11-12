import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface StoreRider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: 'Available' | 'On Delivery' | 'Off Shift';
  activeOrdersCount: number;
}

@Component({
  selector: 'merchant-delivery-settings-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './delivery-settings-list.page.html',
  styleUrls: ['./delivery-settings-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliverySettingsListPageComponent {
  // Service toggle
  readonly isDeliveryEnabled = signal<boolean>(true);

  // Delivery configuration signals
  readonly deliveryRadiusKm = signal<number>(5.0);
  readonly minOrderAmount = signal<number>(149);
  readonly baseDeliveryFee = signal<number>(25);
  readonly freeDeliveryAbove = signal<number>(499);
  readonly estDeliveryMinutes = signal<number>(30);

  // Supported Pincodes
  readonly pincodes = signal<string[]>(['440010', '440012', '440015', '440022']);
  readonly newPincode = signal<string>('');

  // Store Riders Roster
  readonly riders = signal<StoreRider[]>([
    { id: 'r1', name: 'Ramesh Sonwane', phone: '+91 98765 11223', vehicle: 'Honda Activa (MH-31-AB-1234)', status: 'On Delivery', activeOrdersCount: 2 },
    { id: 'r2', name: 'Suresh Patil', phone: '+91 98234 44556', vehicle: 'TVS Jupiter (MH-31-CD-5678)', status: 'Available', activeOrdersCount: 0 },
    { id: 'r3', name: 'Ganesh Shinde', phone: '+91 97654 77889', vehicle: 'Hero Splendor (MH-31-EF-9012)', status: 'Off Shift', activeOrdersCount: 0 }
  ]);

  // Toast
  readonly toast = signal<string | null>(null);

  toggleDelivery() {
    this.isDeliveryEnabled.update(v => !v);
    this.showToast(`Delivery service is now ${this.isDeliveryEnabled() ? 'ENABLED' : 'DISABLED'}.`);
  }

  addPincode() {
    const pin = this.newPincode().trim();
    if (pin.length === 6 && !this.pincodes().includes(pin)) {
      this.pincodes.update(list => [...list, pin]);
      this.newPincode.set('');
      this.showToast(`Pincode ${pin} added to delivery zone.`);
    }
  }

  removePincode(pin: string) {
    this.pincodes.update(list => list.filter(p => p !== pin));
    this.showToast(`Pincode ${pin} removed.`);
  }

  toggleRiderStatus(riderId: string) {
    this.riders.update(list =>
      list.map(r => {
        if (r.id === riderId) {
          const nextStatus = r.status === 'Available' ? 'Off Shift' : 'Available';
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  }

  saveSettings() {
    this.showToast('Delivery geofence and pricing rules saved successfully!');
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2800);
  }
}
