import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface MerchantOrder {
  id: string;
  time: string;
  amount: number;
  itemsCount: number;
  customerName: string;
  customerPhone?: string;
  fulfilmentType: 'Home Delivery' | 'Self Pickup';
  distance?: string;
  status: 'New' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  stepIndex?: number; // 0: Accepted, 1: Preparing, 2: Ready, 3: Out for Delivery
}

export interface PastOrder {
  id: string;
  date: string;
  time: string;
  amount: number;
  itemsCount: number;
  status: 'Completed' | 'Cancelled' | 'Returned';
}

@Component({
  selector: 'merchant-order-inbox-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order-inbox-list.page.html',
  styleUrls: ['./order-inbox-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInboxPageComponent {
  private router = inject(Router);

  // Sub Tab: 'inbox' | 'history'
  readonly subTab = signal<'inbox' | 'history'>('inbox');

  // Filter Pills in Live Inbox
  readonly activeFilter = signal<'All' | 'New' | 'Preparing' | 'Ready' | 'Completed'>('All');

  // Filter Pills in Order History
  readonly historyFilter = signal<'All' | 'Completed' | 'Cancelled' | 'Returned'>('All');

  // Search query
  readonly searchQuery = signal<string>('');

  // Live Orders Signal
  readonly orders = signal<MerchantOrder[]>([
    {
      id: '#ORD78291',
      time: 'Today, 10:24 AM',
      amount: 540,
      itemsCount: 5,
      customerName: 'Rahul Deshmukh',
      customerPhone: '+91 98765 43210',
      fulfilmentType: 'Home Delivery',
      distance: '3.2 km',
      status: 'New',
      stepIndex: 0
    },
    {
      id: '#ORD78290',
      time: 'Today, 10:02 AM',
      amount: 1240,
      itemsCount: 8,
      customerName: 'Priya Kulkarni',
      customerPhone: '+91 98234 56789',
      fulfilmentType: 'Home Delivery',
      distance: '5.6 km',
      status: 'Preparing',
      stepIndex: 1
    },
    {
      id: '#ORD78289',
      time: 'Today, 09:48 AM',
      amount: 325,
      itemsCount: 3,
      customerName: 'Amit Patil',
      customerPhone: '+91 97654 32109',
      fulfilmentType: 'Self Pickup',
      status: 'Ready',
      stepIndex: 2
    },
    {
      id: '#ORD78288',
      time: 'Today, 09:20 AM',
      amount: 760,
      itemsCount: 5,
      customerName: 'Kavita Joshi',
      customerPhone: '+91 90123 45678',
      fulfilmentType: 'Home Delivery',
      distance: '2.1 km',
      status: 'Completed',
      stepIndex: 3
    }
  ]);

  // Order History Signal
  readonly pastOrders = signal<PastOrder[]>([
    { id: '#ORD78288', date: '30 Nov', time: '07:14 PM', amount: 760, itemsCount: 5, status: 'Completed' },
    { id: '#ORD78287', date: '30 Nov', time: '05:02 PM', amount: 1240, itemsCount: 8, status: 'Completed' },
    { id: '#ORD78286', date: '30 Nov', time: '03:10 PM', amount: 325, itemsCount: 3, status: 'Cancelled' },
    { id: '#ORD78285', date: '29 Nov', time: '08:36 PM', amount: 540, itemsCount: 5, status: 'Completed' },
    { id: '#ORD78284', date: '29 Nov', time: '06:21 PM', amount: 1080, itemsCount: 7, status: 'Completed' }
  ]);

  // History date range
  readonly dateRange = signal<string>('01 Nov 2026 – 30 Nov 2026');

  // Filtered Live Orders computed
  readonly filteredOrders = computed(() => {
    const f = this.activeFilter();
    const q = this.searchQuery().toLowerCase().trim();
    let list = this.orders();

    if (f !== 'All') {
      list = list.filter(o => o.status === f);
    }
    if (q) {
      list = list.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q)
      );
    }
    return list;
  });

  // Filtered History computed
  readonly filteredHistory = computed(() => {
    const hf = this.historyFilter();
    let list = this.pastOrders();
    if (hf !== 'All') {
      list = list.filter(o => o.status === hf);
    }
    return list;
  });

  // Toast
  readonly toastMessage = signal<string | null>(null);

  setSubTab(tab: 'inbox' | 'history') {
    this.subTab.set(tab);
  }

  setFilter(f: 'All' | 'New' | 'Preparing' | 'Ready' | 'Completed') {
    this.activeFilter.set(f);
  }

  setHistoryFilter(hf: 'All' | 'Completed' | 'Cancelled' | 'Returned') {
    this.historyFilter.set(hf);
  }

  acceptOrder(orderId: string, event: Event) {
    event.stopPropagation();
    this.orders.update(list =>
      list.map(o => (o.id === orderId ? { ...o, status: 'Preparing', stepIndex: 1 } : o))
    );
    this.showToast(`Order ${orderId} accepted! Preparing timer started.`);
  }

  rejectOrder(orderId: string, event: Event) {
    event.stopPropagation();
    this.orders.update(list =>
      list.map(o => (o.id === orderId ? { ...o, status: 'Cancelled' } : o))
    );
    this.showToast(`Order ${orderId} rejected.`);
  }

  markCompleted(orderId: string, event: Event) {
    event.stopPropagation();
    this.orders.update(list =>
      list.map(o => (o.id === orderId ? { ...o, status: 'Completed', stepIndex: 3 } : o))
    );
    this.showToast(`Order ${orderId} marked as completed!`);
  }

  openOrderDetails(orderId: string) {
    this.router.navigate(['/order-inbox', orderId.replace('#', '')]);
  }

  exportReport() {
    this.showToast('Exporting order report as CSV/Excel...');
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2800);
  }
}
