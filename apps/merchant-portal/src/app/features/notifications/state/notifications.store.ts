import { Injectable, signal, computed, inject } from '@angular/core';
import { NotificationItem, NotificationPreferences } from '../models/notifications-view.model';
import { AudioAlertService } from '../../../core/realtime/audio-alert.service';

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🔔 New Order Received (#NK-1024)',
    message: 'Anjali Sharma placed an order for 2x Tarri Poha. Scheduled for 10:15 AM pickup.',
    category: 'ORDER_INCOMING',
    timestamp: '2 mins ago',
    isRead: false,
    actionRoute: '/order-inbox'
  },
  {
    id: 'notif-2',
    title: '⚠️ Capacity Warning: 10:30 AM Slot',
    message: 'Slot has reached 90% capacity (9/10 orders booked). Auto-throttling active.',
    category: 'CAPACITY_ALERT',
    timestamp: '14 mins ago',
    isRead: false,
    actionRoute: '/pickup-slots'
  },
  {
    id: 'notif-3',
    title: '📦 Low Stock Alert: Desi Ghee Besan Ladoo',
    message: 'Remaining inventory is 3 boxes (threshold: 5). Consider restocking.',
    category: 'LOW_STOCK',
    timestamp: '1 hour ago',
    isRead: true,
    actionRoute: '/inventory'
  },
  {
    id: 'notif-4',
    title: '💰 Bank Settlement Processed (₹18,032)',
    message: 'Daily payout for yesterday credited via Axis Bank UTR AXIS2026111009871.',
    category: 'PAYMENT',
    timestamp: '5 hours ago',
    isRead: true,
    actionRoute: '/billing'
  }
];

@Injectable()
export class NotificationsStore {
  private audio = inject(AudioAlertService);

  readonly notifications = signal<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  readonly preferences = signal<NotificationPreferences>({
    soundChimeEnabled: true,
    pushNotificationsEnabled: true,
    smsCustomerAlerts: true,
    highPriorityOrderChime: true
  });

  readonly unreadCount = computed(() => {
    return this.notifications().filter(n => !n.isRead).length;
  });

  markRead(id: string): void {
    this.notifications.update(list =>
      list.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  }

  markAllRead(): void {
    this.notifications.update(list =>
      list.map(n => ({ ...n, isRead: true }))
    );
  }

  toggleSound(): void {
    this.preferences.update(p => ({ ...p, soundChimeEnabled: !p.soundChimeEnabled }));
  }

  togglePush(): void {
    this.preferences.update(p => ({ ...p, pushNotificationsEnabled: !p.pushNotificationsEnabled }));
  }

  testChime(): void {
    this.audio.playNewOrderAlert();
  }
}
