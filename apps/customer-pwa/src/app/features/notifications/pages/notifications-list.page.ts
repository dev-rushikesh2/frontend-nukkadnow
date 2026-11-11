import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

export type NotificationGroupType = 'today' | 'yesterday' | 'earlier';
export type NotificationCategory = 'all' | 'orders' | 'offers' | 'updates';

export interface NotificationItem {
  id: string;
  category: 'orders' | 'offers' | 'updates';
  group: NotificationGroupType;
  title: string;
  body: string;
  timeStr: string;
  icon: string;
  iconBg: string;
  isUnread: boolean;
  actionText?: string;
  actionRoute?: string;
  actionIcon?: string;
}

@Component({
  selector: 'app-notifications-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './notifications-list.page.html',
  styleUrls: ['./notifications-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListPageComponent {
  private router = inject(Router);

  readonly selectedCategory = signal<NotificationCategory>('all');

  readonly notifications = signal<NotificationItem[]>([
    {
      id: 'n-1',
      category: 'orders',
      group: 'today',
      title: 'Your order is Out for Delivery! 🚚',
      body: 'Order #NN123456789 from Shree Fresh Mart is on the way.',
      timeStr: '10:55 AM',
      icon: '🚚',
      iconBg: '#FFF7ED',
      isUnread: true,
      actionText: 'Track Order',
      actionRoute: '/order-tracking/NN123456789',
      actionIcon: '📍'
    },
    {
      id: 'n-2',
      category: 'orders',
      group: 'today',
      title: 'Order Delivered ✅',
      body: 'Your order #NN123456789 has been delivered successfully.',
      timeStr: '11:15 AM',
      icon: '✓',
      iconBg: '#DCFCE7',
      isUnread: false
    },
    {
      id: 'n-3',
      category: 'offers',
      group: 'today',
      title: 'Weekend Offer – Upto 20% OFF 🎉',
      body: 'Save big on fruits, vegetables and daily essentials.',
      timeStr: '09:00 AM',
      icon: '🏷️',
      iconBg: '#FEE2E2',
      isUnread: true,
      actionText: 'Shop Now',
      actionRoute: '/discovery',
      actionIcon: '🛒'
    },
    {
      id: 'n-4',
      category: 'orders',
      group: 'yesterday',
      title: 'Order Confirmed 👍',
      body: 'Your order #NN123456780 has been confirmed by Amruta Medicals.',
      timeStr: 'Yesterday, 06:18 PM',
      icon: '📦',
      iconBg: '#FEF3C7',
      isUnread: true,
      actionText: 'View Order',
      actionRoute: '/orders/NN123456780',
      actionIcon: '📦'
    },
    {
      id: 'n-5',
      category: 'updates',
      group: 'yesterday',
      title: 'Running Low? Restock Now!',
      body: 'You often buy Milk (1 L). Add it to your cart again.',
      timeStr: 'Yesterday, 02:30 PM',
      icon: '🔔',
      iconBg: '#F3E8FF',
      isUnread: false,
      actionText: 'Reorder',
      actionRoute: '/cart',
      actionIcon: '🛒'
    },
    {
      id: 'n-6',
      category: 'updates',
      group: 'earlier',
      title: 'New Shop in Your Area!',
      body: 'Green Veggies is now live in Civil Lines. Check out fresh produce at great prices.',
      timeStr: 'Oct 31, 11:20 AM',
      icon: '📢',
      iconBg: '#E0F2FE',
      isUnread: false
    },
    {
      id: 'n-7',
      category: 'orders',
      group: 'earlier',
      title: 'Rate Your Order',
      body: 'How was your experience with Shree Fresh Mart?',
      timeStr: 'Oct 30, 07:45 PM',
      icon: '⭐',
      iconBg: '#FEF9C3',
      isUnread: false,
      actionText: 'Give Rating',
      actionRoute: '/merchant/shree-fresh-mart',
      actionIcon: '⭐'
    }
  ]);

  readonly filteredToday = computed(() => {
    return this.filterByCat(this.notifications().filter(n => n.group === 'today'));
  });

  readonly filteredYesterday = computed(() => {
    return this.filterByCat(this.notifications().filter(n => n.group === 'yesterday'));
  });

  readonly filteredEarlier = computed(() => {
    return this.filterByCat(this.notifications().filter(n => n.group === 'earlier'));
  });

  private filterByCat(list: NotificationItem[]): NotificationItem[] {
    const c = this.selectedCategory();
    if (c === 'all') return list;
    return list.filter(item => item.category === c);
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  setCategory(cat: NotificationCategory) {
    this.selectedCategory.set(cat);
  }

  markAllAsRead() {
    this.notifications.update(list =>
      list.map(n => ({ ...n, isUnread: false }))
    );
  }

  executeAction(item: NotificationItem) {
    if (item.actionRoute) {
      this.router.navigateByUrl(item.actionRoute);
    }
  }
}
