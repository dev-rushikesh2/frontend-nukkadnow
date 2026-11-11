import { Injectable, signal } from '@angular/core';
import { DashboardKpis, DashboardActivity } from '../models/dashboard-view.model';

const INITIAL_KPIS: DashboardKpis = {
  ordersToday: 48,
  pendingActionOrders: 3,
  inPrepOrders: 5,
  readyOrders: 2,
  todaysGrossSalesPaise: 1485000, // ₹14,850
  todaysNetPayoutPaise: 1455300,  // ₹14,553
  lowStockCount: 2,
  nextSlotBookedCount: 8,
  nextSlotCapacity: 10,
  nextSlotTime: '10:30 AM – 10:45 AM'
};

const INITIAL_ACTIVITIES: DashboardActivity[] = [
  { id: 'act-1', title: 'New Order #NK-1024 received from Anjali S.', time: '2 mins ago', type: 'ORDER' },
  { id: 'act-2', title: 'Walk-in Order #WK-504 billed by Cashier (₹180)', time: '8 mins ago', type: 'PAYMENT' },
  { id: 'act-3', title: 'Slot 10:30 AM reached 80% capacity limit', time: '14 mins ago', type: 'CAPACITY' },
  { id: 'act-4', title: 'Low Stock Alert: Besan Ladoo 1kg (3 left)', time: '1 hour ago', type: 'STOCK' }
];

@Injectable()
export class DashboardStore {
  readonly kpis = signal<DashboardKpis>(INITIAL_KPIS);
  readonly activities = signal<DashboardActivity[]>(INITIAL_ACTIVITIES);
}
