import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-tracking-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-tracking-list.page.html',
  styleUrls: ['./order-tracking-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTrackingListPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly orderId = signal<string>('NN123456789');
  readonly copied = signal<boolean>(false);

  readonly order = signal({
    shopName: 'Shree Fresh Mart',
    verified: true,
    itemCount: 3,
    totalAmount: 118,
    estimatedDelivery: '11:15 AM',
    etaMinutes: 20,
    distanceKm: '4.2 km',
    shopImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80',
    rider: {
      name: 'Rohit S.',
      role: 'Delivery Partner',
      rating: 4.8,
      deliveriesCount: '1,246',
      phone: '+919876500000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    items: [
      {
        name: 'Fresh Tomatoes',
        qty: '1 kg × 1',
        image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80'
      },
      {
        name: 'Potato',
        qty: '1 kg × 1',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80'
      },
      {
        name: 'Brown Bread',
        qty: '400 g × 1',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80'
      }
    ]
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  copyOrderId() {
    navigator.clipboard.writeText(this.orderId()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {});
  }

  viewDetails() {
    this.router.navigate(['/orders']);
  }

  callRider() {
    window.location.href = `tel:${this.order().rider.phone}`;
  }

  openChat() {
    // Open chat simulated or native SMS
    window.location.href = `sms:${this.order().rider.phone}`;
  }

  openSupport() {
    this.router.navigate(['/help-support']);
  }
}
