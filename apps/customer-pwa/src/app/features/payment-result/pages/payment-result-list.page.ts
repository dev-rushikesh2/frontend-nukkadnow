import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export interface ConfirmedOrderItem {
  id: string;
  name: string;
  unitWeight: string;
  quantity: number;
  price: number;
  image: string;
}

@Component({
  selector: 'app-payment-result-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-result-list.page.html',
  styleUrls: ['./payment-result-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentResultListPageComponent {
  private router = inject(Router);

  readonly orderId = signal<string>('NN123456789');
  readonly copied = signal<boolean>(false);

  readonly shopInfo = signal({
    id: 'shree-fresh-mart',
    name: 'Shree Fresh Mart',
    categories: 'Fruits • Vegetables • Groceries',
    rating: 4.7,
    reviewsCount: 328,
    phone: '+919876543210',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80'
  });

  readonly items = signal<ConfirmedOrderItem[]>([
    {
      id: 'fresh-tomatoes',
      name: 'Fresh Tomatoes',
      unitWeight: '1 kg',
      quantity: 1,
      price: 28,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'fresh-potato',
      name: 'Potato',
      unitWeight: '1 kg',
      quantity: 1,
      price: 26,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'brown-bread',
      name: 'Brown Bread',
      unitWeight: '400 g',
      quantity: 1,
      price: 48,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=150&q=80'
    }
  ]);

  readonly itemTotal = signal<number>(102);
  readonly discount = signal<number>(4);
  readonly deliveryFee = signal<number>(20);
  readonly totalPaid = signal<number>(118);

  copyOrderId() {
    navigator.clipboard.writeText(this.orderId()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {});
  }

  callShop() {
    window.location.href = `tel:${this.shopInfo().phone}`;
  }

  trackOrder() {
    this.router.navigate(['/order-tracking', this.orderId()]);
  }

  continueShopping() {
    this.router.navigate(['/home']);
  }
}
