import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';

export type OrderFilterStatus = 'all' | 'delivered' | 'cancelled' | 'refunded';

export interface HistoryOrderItem {
  id: string;
  orderNumber: string;
  shopName: string;
  verified: boolean;
  dateStr: string;
  status: 'delivered' | 'out_for_delivery' | 'cancelled' | 'refunded';
  statusLabel: string;
  totalAmount: number;
  shopImage: string;
  thumbnails: string[];
  extraCount?: number;
}

@Component({
  selector: 'app-orders-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomerShellComponent],
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListPageComponent {
  private router = inject(Router);

  readonly selectedFilter = signal<OrderFilterStatus>('all');
  readonly copiedId = signal<string | null>(null);

  readonly orders = signal<HistoryOrderItem[]>([
    {
      id: 'NN123456789',
      orderNumber: 'NN123456789',
      shopName: 'Shree Fresh Mart',
      verified: true,
      dateStr: '04 Nov 2026, 10:24 AM',
      status: 'delivered',
      statusLabel: 'Delivered',
      totalAmount: 118,
      shopImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=150&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=100&q=80'
      ],
      extraCount: 0
    },
    {
      id: 'NN123456780',
      orderNumber: 'NN123456780',
      shopName: 'Amruta Medicals',
      verified: true,
      dateStr: '02 Nov 2026, 06:18 PM',
      status: 'out_for_delivery',
      statusLabel: 'Out for Delivery',
      totalAmount: 268,
      shopImage: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=150&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1586942593568-29361efcd571?auto=format&fit=crop&w=100&q=80'
      ],
      extraCount: 1
    },
    {
      id: 'NN123456765',
      orderNumber: 'NN123456765',
      shopName: 'Green Veggies',
      verified: true,
      dateStr: '31 Oct 2026, 11:40 AM',
      status: 'delivered',
      statusLabel: 'Delivered',
      totalAmount: 142,
      shopImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=150&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=100&q=80'
      ],
      extraCount: 2
    },
    {
      id: 'NN123456754',
      orderNumber: 'NN123456754',
      shopName: 'Daily Essentials',
      verified: true,
      dateStr: '28 Oct 2026, 04:12 PM',
      status: 'cancelled',
      statusLabel: 'Cancelled',
      totalAmount: 0,
      shopImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=150&q=80',
      thumbnails: [
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=100&q=80',
        'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=100&q=80'
      ],
      extraCount: 0
    }
  ]);

  readonly filteredOrders = computed(() => {
    const f = this.selectedFilter();
    if (f === 'all') return this.orders();
    return this.orders().filter(o => o.status === f);
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  setFilter(filter: OrderFilterStatus) {
    this.selectedFilter.set(filter);
  }

  copyOrderId(id: string, event: MouseEvent) {
    event.stopPropagation();
    navigator.clipboard.writeText(id).then(() => {
      this.copiedId.set(id);
      setTimeout(() => this.copiedId.set(null), 2000);
    }).catch(() => {});
  }

  viewDetails(orderId: string) {
    this.router.navigate(['/orders', orderId]);
  }

  trackOrder(orderId: string, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/order-tracking', orderId]);
  }

  orderAgain(order: HistoryOrderItem, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/cart']);
  }

  reportIssue(orderId: string, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/help-support']);
  }
}
