import { Injectable, signal, computed } from '@angular/core';
import { AnalyticsSummary, HourlyRushPoint, TopSellingProduct, AnalyticsTimeRange } from '../models/analytics-view.model';
import { exportToCsv } from '../utils/csv-exporter';

const SUMMARIES: Record<AnalyticsTimeRange, AnalyticsSummary> = {
  TODAY: {
    timeRange: 'TODAY',
    totalOrders: 48,
    completedOrders: 46,
    cancelledOrRejected: 2,
    grossOrderValuePaise: 1485000, // ₹14,850
    netReconciledPayoutPaise: 1455300, // ₹14,553
    platformFeePaise: 29700, // 2% platform fee
    averagePrepTimeMinutes: 17,
    onTimePickupRate: 97.2,
    totalCustomers: 41,
    walkinPct: 42,
    onlinePct: 58
  },
  YESTERDAY: {
    timeRange: 'YESTERDAY',
    totalOrders: 56,
    completedOrders: 54,
    cancelledOrRejected: 2,
    grossOrderValuePaise: 1840000,
    netReconciledPayoutPaise: 1803200,
    platformFeePaise: 36800,
    averagePrepTimeMinutes: 19,
    onTimePickupRate: 95.8,
    totalCustomers: 49,
    walkinPct: 45,
    onlinePct: 55
  },
  WEEK: {
    timeRange: 'WEEK',
    totalOrders: 342,
    completedOrders: 334,
    cancelledOrRejected: 8,
    grossOrderValuePaise: 11260000,
    netReconciledPayoutPaise: 11034800,
    platformFeePaise: 225200,
    averagePrepTimeMinutes: 18,
    onTimePickupRate: 96.4,
    totalCustomers: 286,
    walkinPct: 40,
    onlinePct: 60
  },
  MONTH: {
    timeRange: 'MONTH',
    totalOrders: 1480,
    completedOrders: 1445,
    cancelledOrRejected: 35,
    grossOrderValuePaise: 48600000,
    netReconciledPayoutPaise: 47628000,
    platformFeePaise: 972000,
    averagePrepTimeMinutes: 18,
    onTimePickupRate: 96.9,
    totalCustomers: 910,
    walkinPct: 38,
    onlinePct: 62
  }
};

const HOURLY_RUSH: HourlyRushPoint[] = [
  { hourLabel: '08:00', ordersCount: 4, intensityPct: 30, isPeak: false },
  { hourLabel: '09:00', ordersCount: 11, intensityPct: 75, isPeak: false },
  { hourLabel: '10:00', ordersCount: 9, intensityPct: 60, isPeak: false },
  { hourLabel: '11:00', ordersCount: 5, intensityPct: 35, isPeak: false },
  { hourLabel: '12:00', ordersCount: 6, intensityPct: 40, isPeak: false },
  { hourLabel: '13:00', ordersCount: 4, intensityPct: 25, isPeak: false },
  { hourLabel: '14:00', ordersCount: 2, intensityPct: 15, isPeak: false },
  { hourLabel: '15:00', ordersCount: 3, intensityPct: 20, isPeak: false },
  { hourLabel: '16:00', ordersCount: 7, intensityPct: 50, isPeak: false },
  { hourLabel: '17:00', ordersCount: 14, intensityPct: 95, isPeak: true },
  { hourLabel: '18:00', ordersCount: 15, intensityPct: 100, isPeak: true },
  { hourLabel: '19:00', ordersCount: 12, intensityPct: 80, isPeak: true },
  { hourLabel: '20:00', ordersCount: 8, intensityPct: 55, isPeak: false },
  { hourLabel: '21:00', ordersCount: 4, intensityPct: 30, isPeak: false }
];

const TOP_PRODUCTS: TopSellingProduct[] = [
  { id: 'p1', name: 'Nagpur Special Tarri Poha', category: 'Breakfast', unitsSold: 142, revenuePaise: 568000, stockoutDurationMinutes: 0 },
  { id: 'p2', name: 'Fresh Samosa (Plate of 2)', category: 'Snacks', unitsSold: 184, revenuePaise: 552000, stockoutDurationMinutes: 15 },
  { id: 'p3', name: 'Desi Ghee Besan Ladoo (1kg)', category: 'Mithai', unitsSold: 68, revenuePaise: 3060000, stockoutDurationMinutes: 0 },
  { id: 'p4', name: 'Masala Chai Flask (500ml)', category: 'Beverages', unitsSold: 92, revenuePaise: 736000, stockoutDurationMinutes: 0 },
  { id: 'p5', name: 'Kaju Katli (250g Box)', category: 'Mithai', unitsSold: 45, revenuePaise: 1125000, stockoutDurationMinutes: 40 }
];

@Injectable()
export class AnalyticsStore {
  readonly selectedRange = signal<AnalyticsTimeRange>('TODAY');
  readonly summary = computed(() => SUMMARIES[this.selectedRange()]);
  readonly hourlyRush = signal<HourlyRushPoint[]>(HOURLY_RUSH);
  readonly topProducts = signal<TopSellingProduct[]>(TOP_PRODUCTS);
  readonly isExporting = signal<boolean>(false);

  setTimeRange(range: AnalyticsTimeRange): void {
    this.selectedRange.set(range);
  }

  exportReport(): void {
    this.isExporting.set(true);

    const headers = ['Order ID', 'Date & Time', 'Customer', 'Source', 'Items', 'Gross Amount (INR)', 'Platform Fee (INR)', 'Net Payout (INR)', 'Status'];
    const mockRows = [
      ['#NK-1001', '2026-11-11 09:12', 'Pooja Deshmukh', 'Marketplace PWA', 'Tarri Poha x2', '80.00', '1.60', '78.40', 'COMPLETED'],
      ['#NK-1002', '2026-11-11 09:25', 'Anand Kulkarni', 'Walk-in Counter', 'Samosa x2, Chai x1', '110.00', '0.00', '110.00', 'COMPLETED'],
      ['#NK-1003', '2026-11-11 10:04', 'Sunil Joshi', 'Store Standee QR', 'Besan Ladoo 1kg x1', '450.00', '9.00', '441.00', 'COMPLETED'],
      ['#NK-1004', '2026-11-11 11:30', 'Priya Rao', 'Marketplace PWA', 'Kaju Katli 250g x2', '500.00', '10.00', '490.00', 'COMPLETED'],
      ['#NK-1005', '2026-11-11 12:15', 'Nitin Gadgil', 'Walk-in Counter', 'Tarri Poha x4', '160.00', '0.00', '160.00', 'COMPLETED']
    ];

    setTimeout(() => {
      exportToCsv(`nukkadnow_reconciliation_report_${this.selectedRange().toLowerCase()}_20261111.csv`, headers, mockRows);
      this.isExporting.set(false);
    }, 500);
  }
}
