import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MerchantShellComponent } from '../../../layout/merchant-shell/merchant-shell.component';

export interface DashboardMetric {
  label: string;
  value: string;
  icon: string;
  subtext: string;
}

export interface RecentOrderSummary {
  id: string;
  time: string;
  amount: number;
  status: 'New' | 'Preparing' | 'Ready' | 'Completed';
  color: 'green' | 'blue' | 'purple';
}

@Component({
  selector: 'merchant-dashboard-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MerchantShellComponent],
  templateUrl: './dashboard-list.page.html',
  styleUrls: ['./dashboard-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardListPageComponent {
  private router = inject(Router);

  // Shop Info
  readonly shopName = signal<string>('Shree Fresh Mart');
  readonly greeting = signal<string>('Good Morning');
  readonly selectedTimeframe = signal<string>('Today');

  // Performance Metrics
  readonly performance = signal({
    sales: 12840,
    orders: 48,
    customers: 126,
    growthPercent: 18
  });

  // Recent Orders
  readonly recentOrders = signal<RecentOrderSummary[]>([
    { id: '#ORD78291', time: '10:24 AM', amount: 540, status: 'New', color: 'green' },
    { id: '#ORD78290', time: '10:02 AM', amount: 1240, status: 'Preparing', color: 'blue' },
    { id: '#ORD78289', time: '09:48 AM', amount: 325, status: 'Ready', color: 'purple' }
  ]);

  // Quick Insights
  readonly topProduct = signal<string>('Tomato (5 kg)');
  readonly activeArea = signal<string>('Within 15 km');
  readonly rating = signal<{ score: number; count: number }>({ score: 4.7, count: 328 });

  openOrderDetails(orderId: string) {
    this.router.navigate(['/order-inbox'], { queryParams: { orderId } });
  }

  setTimeframe(tf: string) {
    this.selectedTimeframe.set(tf);
  }
}
