import { Injectable, signal, computed, inject } from '@angular/core';
import { OrderInboxItem, INITIAL_INBOX_ORDERS, OrderLifecycleState } from '../models/order-inbox-view.model';
import { AudioAlertService } from '../../../core/realtime/audio-alert.service';

@Injectable({ providedIn: 'root' })
export class OrderInboxStore {
  private audio = inject(AudioAlertService);

  readonly orders = signal<OrderInboxItem[]>(INITIAL_INBOX_ORDERS);
  readonly activeTab = signal<'NEW' | 'PREPARING' | 'READY' | 'COMPLETED'>('NEW');
  readonly isSoundEnabled = signal<boolean>(true);

  readonly newOrdersCount = computed(() => this.orders().filter((o) => o.status === 'PLACED').length);
  readonly preparingCount = computed(() => this.orders().filter((o) => o.status === 'PREPARING').length);
  readonly readyCount = computed(() => this.orders().filter((o) => o.status === 'READY').length);
  readonly completedCount = computed(() => this.orders().filter((o) => o.status === 'COMPLETED').length);

  readonly visibleOrders = computed(() => {
    const tab = this.activeTab();
    return this.orders().filter((o) => {
      if (tab === 'NEW') return o.status === 'PLACED';
      if (tab === 'PREPARING') return o.status === 'PREPARING';
      if (tab === 'READY') return o.status === 'READY';
      if (tab === 'COMPLETED') return o.status === 'COMPLETED';
      return true;
    });
  });

  setTab(tab: 'NEW' | 'PREPARING' | 'READY' | 'COMPLETED') {
    this.activeTab.set(tab);
  }

  toggleSound() {
    this.isSoundEnabled.update((v) => !v);
  }

  acceptOrder(orderId: string, prepMinutes: number) {
    this.orders.update((list) =>
      list.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'PREPARING' as OrderLifecycleState,
              prepMinutes,
              countdownMinutes: prepMinutes
            }
          : o
      )
    );
  }

  rejectOrder(orderId: string, reason: string) {
    this.orders.update((list) =>
      list.map((o) =>
        o.id === orderId ? { ...o, status: 'REJECTED' as OrderLifecycleState } : o
      )
    );
  }

  markReady(orderId: string) {
    this.orders.update((list) =>
      list.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'READY' as OrderLifecycleState,
              countdownMinutes: 0
            }
          : o
      )
    );
  }

  completeOrder(orderId: string) {
    this.orders.update((list) =>
      list.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'COMPLETED' as OrderLifecycleState
            }
          : o
      )
    );
  }

  simulateNewOrder() {
    const newId = 'ord-' + Date.now();
    const newOrder: OrderInboxItem = {
      id: newId,
      orderNumber: '#NK-' + Math.floor(100 + Math.random() * 900),
      customerName: 'Rahul Deshmukh',
      customerPhoneMasked: '+91 99701 *****',
      source: 'MARKETPLACE',
      status: 'PLACED',
      fulfillmentType: 'PICKUP',
      pickupSlotTime: 'Today, 06:15 PM',
      itemsSummary: '2x Authentic Tarri Poha Plate',
      items: [{ title: 'Authentic Tarri Poha Plate', quantity: 2, pricePaise: 8000 }],
      totalPaise: 8000,
      receivedAgo: 'Just now'
    };

    this.orders.update((list) => [newOrder, ...list]);
    this.activeTab.set('NEW');

    if (this.isSoundEnabled()) {
      this.audio.playNewOrderChime();
    }
  }
}
