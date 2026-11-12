import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export type AnalyticsRange = 'TODAY' | 'YESTERDAY' | 'WEEK' | 'MONTH';

export interface TopProduct {
  rank: number;
  name: string;
  category: string;
  unitsSold: number;
  revenue: number;
  growth: string;
}

@Component({
  selector: 'merchant-analytics-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './analytics-list.page.html',
  styleUrls: ['./analytics-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsListPageComponent {
  // Selected range
  readonly selectedRange = signal<AnalyticsRange>('WEEK');

  // Toast
  readonly toast = signal<string | null>(null);

  // Top Products
  readonly topProducts = signal<TopProduct[]>([
    { rank: 1, name: 'Special Masala Chai', category: 'Beverages', unitsSold: 420, revenue: 8400, growth: '+24%' },
    { rank: 2, name: 'Nagpur Tarri Poha Plate', category: 'Meals', unitsSold: 285, revenue: 11400, growth: '+18%' },
    { rank: 3, name: 'Nagpur Orange Barfi (1kg)', category: 'Sweets', unitsSold: 64, revenue: 20480, growth: '+32%' },
    { rank: 4, name: 'Bun Maska', category: 'Bakery', unitsSold: 190, revenue: 6650, growth: '+12%' },
    { rank: 5, name: 'Amul Taaza Milk 500ml', category: 'Dairy', unitsSold: 175, revenue: 4725, growth: '+8%' }
  ]);

  // Dynamic Metrics based on range
  readonly gmv = computed(() => {
    switch (this.selectedRange()) {
      case 'TODAY': return 4860;
      case 'YESTERDAY': return 4240;
      case 'WEEK': return 32800;
      case 'MONTH': return 142600;
    }
  });

  readonly netPayout = computed(() => Math.round(this.gmv() * 0.98)); // 2% gateway

  readonly totalOrders = computed(() => {
    switch (this.selectedRange()) {
      case 'TODAY': return 18;
      case 'YESTERDAY': return 16;
      case 'WEEK': return 128;
      case 'MONTH': return 542;
    }
  });

  readonly avgPrepTime = signal<number>(14);

  // Channel share
  readonly walkinShare = signal<number>(48);
  readonly onlineShare = signal<number>(38);
  readonly tableQrShare = signal<number>(14);

  selectRange(r: AnalyticsRange) {
    this.selectedRange.set(r);
    this.showToast(`Updated analytics range to ${r.toLowerCase()}.`);
  }

  exportCsv() {
    this.showToast('Exporting bank-reconciled financial CSV report...');
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2800);
  }
}
