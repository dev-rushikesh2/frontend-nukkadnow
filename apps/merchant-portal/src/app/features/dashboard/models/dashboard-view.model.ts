export interface DashboardKpis {
  ordersToday: number;
  pendingActionOrders: number;
  inPrepOrders: number;
  readyOrders: number;
  todaysGrossSalesPaise: number;
  todaysNetPayoutPaise: number;
  lowStockCount: number;
  nextSlotBookedCount: number;
  nextSlotCapacity: number;
  nextSlotTime: string;
}

export interface DashboardActivity {
  id: string;
  title: string;
  time: string;
  type: 'ORDER' | 'STOCK' | 'PAYMENT' | 'CAPACITY';
}

export type DashboardViewModel = any;
