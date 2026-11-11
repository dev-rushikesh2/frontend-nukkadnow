import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export type CheckoutSubStep = 'fulfilment' | 'payment';
export type FulfilmentMethod = 'home_delivery' | 'pickup';
export type DeliveryTimePreference = 'asap' | 'schedule';
export type PaymentMethodType = 'upi' | 'card' | 'netbanking' | 'wallets' | 'cod';

@Component({
  selector: 'app-checkout-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout-list.page.html',
  styleUrls: ['./checkout-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutListPageComponent {
  private router = inject(Router);

  readonly currentStep = signal<CheckoutSubStep>('fulfilment');
  readonly fulfilmentMethod = signal<FulfilmentMethod>('home_delivery');
  readonly deliveryPreference = signal<DeliveryTimePreference>('asap');
  readonly selectedPaymentMethod = signal<PaymentMethodType>('upi');

  readonly deliveryInstructions = signal<string>('');
  readonly selectedAddressId = signal<string>('home-1');

  // Pickup slot selection state
  readonly pickupDates = [
    { id: 'today', day: 'Today', date: 'Nov 4' },
    { id: 'wed', day: 'Wed', date: 'Nov 5' },
    { id: 'thu', day: 'Thu', date: 'Nov 6' },
    { id: 'fri', day: 'Fri', date: 'Nov 7' },
    { id: 'sat', day: 'Sat', date: 'Nov 8' }
  ];
  readonly selectedPickupDateId = signal<string>('today');

  readonly pickupSlots = [
    { id: 'slot-1', time: '10:00 AM – 11:00 AM', sla: 'Ready in ~15 min' },
    { id: 'slot-2', time: '11:00 AM – 12:00 PM' },
    { id: 'slot-3', time: '12:00 PM – 01:00 PM' },
    { id: 'slot-4', time: '04:00 PM – 05:00 PM' },
    { id: 'slot-5', time: '05:00 PM – 06:00 PM' },
    { id: 'slot-6', time: '06:00 PM – 07:00 PM' }
  ];
  readonly selectedPickupSlotId = signal<string>('slot-1');

  // Order summary calculations
  readonly itemsTotal = signal<number>(102);
  readonly shopDiscount = signal<number>(4);
  readonly deliveryFee = computed(() => {
    return this.fulfilmentMethod() === 'home_delivery' ? 20 : 0;
  });

  readonly totalPayable = computed(() => {
    return this.itemsTotal() - this.shopDiscount() + this.deliveryFee();
  });

  goBack() {
    if (this.currentStep() === 'payment') {
      this.currentStep.set('fulfilment');
    } else {
      this.router.navigate(['/cart']);
    }
  }

  setFulfilmentMethod(method: FulfilmentMethod) {
    this.fulfilmentMethod.set(method);
  }

  setDeliveryPreference(pref: DeliveryTimePreference) {
    this.deliveryPreference.set(pref);
  }

  selectPickupDate(id: string) {
    this.selectedPickupDateId.set(id);
  }

  selectPickupSlot(id: string) {
    this.selectedPickupSlotId.set(id);
  }

  setPaymentMethod(method: PaymentMethodType) {
    this.selectedPaymentMethod.set(method);
  }

  continueToPayment() {
    this.currentStep.set('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmPayment() {
    this.router.navigate(['/payment-result']);
  }
}
