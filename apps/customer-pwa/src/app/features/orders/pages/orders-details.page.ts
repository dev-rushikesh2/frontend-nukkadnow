import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders-details-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './orders-details.page.html',
  styleUrls: ['./orders-details.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersDetailsPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly orderId = signal<string>('NN123456789');
  readonly copied = signal<boolean>(false);
  readonly txCopied = signal<boolean>(false);

  readonly order = signal({
    shopName: 'Shree Fresh Mart',
    verified: true,
    placedDate: '04 Nov 2026, 10:24 AM',
    status: 'Delivered',
    totalAmount: 118,
    shopImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80',
    deliveryAddress: 'Home – Flat 302, Sai Residency, Civil Lines, Amravati – 444601',
    rider: {
      name: 'Rohit S.',
      rating: 4.8,
      deliveries: '1,246',
      phone: '+919876500000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    timeline: [
      { step: 'Order Placed', time: '10:24 AM', date: '04 Nov', done: true },
      { step: 'Preparing', time: '10:26 AM', date: '04 Nov', done: true },
      { step: 'On the Way', time: '10:55 AM', date: '04 Nov', done: true },
      { step: 'Delivered', time: '11:15 AM', date: '04 Nov', done: true }
    ],
    items: [
      {
        name: 'Fresh Tomatoes',
        meta: '1 kg × 1',
        price: 28,
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80'
      },
      {
        name: 'Potato',
        meta: '1 kg × 1',
        price: 26,
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80'
      },
      {
        name: 'Brown Bread',
        meta: '400 g × 1',
        price: 48,
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80'
      }
    ],
    payment: {
      method: 'UPI',
      status: 'Paid',
      transactionId: 'UPI426789012345',
      paidOn: '04 Nov 2026, 10:24 AM'
    },
    pricing: {
      itemTotal: 102,
      discount: 4,
      deliveryFee: 20,
      totalPaid: 118
    }
  });

  goBack() {
    this.router.navigate(['/orders']);
  }

  copyOrderId() {
    navigator.clipboard.writeText(this.orderId()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {});
  }

  copyTransactionId() {
    navigator.clipboard.writeText(this.order().payment.transactionId).then(() => {
      this.txCopied.set(true);
      setTimeout(() => this.txCopied.set(false), 2000);
    }).catch(() => {});
  }

  trackOrder() {
    this.router.navigate(['/order-tracking', this.orderId()]);
  }

  orderAgain() {
    this.router.navigate(['/cart']);
  }

  downloadInvoice() {
    // Generate simple printable invoice or alert
    window.print();
  }

  reportIssue() {
    this.router.navigate(['/help-support']);
  }

  callRider() {
    window.location.href = `tel:${this.order().rider.phone}`;
  }

  chatRider() {
    window.location.href = `sms:${this.order().rider.phone}`;
  }
}
