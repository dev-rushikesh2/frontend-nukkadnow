export type AnalyticsTimeRange = 'TODAY' | 'YESTERDAY' | 'WEEK' | 'MONTH';

export interface AnalyticsSummary {
  timeRange: AnalyticsTimeRange;
  totalOrders: number;
  completedOrders: number;
  cancelledOrRejected: number;
  grossOrderValuePaise: number;
  netReconciledPayoutPaise: number;
  platformFeePaise: number;
  averagePrepTimeMinutes: number;
  onTimePickupRate: number; // percentage e.g. 96.5
  totalCustomers: number;
  walkinPct: number;
  onlinePct: number;
}

export interface HourlyRushPoint {
  hourLabel: string; // e.g. "9 AM", "1 PM", "5 PM"
  ordersCount: number;
  intensityPct: number;
  isPeak: boolean;
}

export interface TopSellingProduct {
  id: string;
  name: string;
  category: string;
  unitsSold: number;
  revenuePaise: number;
  stockoutDurationMinutes: number;
}

export type AnalyticsViewModel = any;
