import { Component, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../layout/page-header/page-header.component';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';

export interface HelpTopic {
  id: string;
  category: 'order' | 'payment' | 'delivery' | 'returns';
  icon: string;
  title: string;
  answer: string;
  actionLabel?: string;
  actionRoute?: string;
}

export interface PermissionItem {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

@Component({
  selector: 'app-help-support-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, PageHeaderComponent, CustomerShellComponent],
  templateUrl: './help-support-list.page.html',
  styleUrls: ['./help-support-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpSupportListPageComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Active Tab: 'help' | 'privacy'
  readonly activeTab = signal<'help' | 'privacy'>('help');

  // Search query in Help
  readonly searchQuery = signal<string>('');

  // Selected Category filter
  readonly selectedCategory = signal<string>('all');

  // Accordion expanded item IDs
  readonly expandedTopicIds = signal<Set<string>>(new Set(['track-order']));

  // Privacy Accordion expanded item ID
  readonly expandedPrivacyId = signal<string | null>(null);

  // Chat Modal State
  readonly isChatOpen = signal<boolean>(false);
  readonly chatInput = signal<string>('');
  readonly chatMessages = signal<Array<{ sender: 'agent' | 'user'; text: string; time: string }>>([
    {
      sender: 'agent',
      text: 'Hi Ajay! I\'m Priya from NukkadNow Support. How can I assist you with your order today?',
      time: 'Just now'
    }
  ]);

  // Delete Account Modal
  readonly isDeleteModalOpen = signal<boolean>(false);

  // Toast
  readonly toastMessage = signal<string | null>(null);

  // Permissions state
  readonly permissions = signal<PermissionItem[]>([
    { id: 'loc', name: 'Location Access', description: 'Used to find nearby neighborhood shops & accurate delivery', enabled: true },
    { id: 'cam', name: 'Camera Access', description: 'Used to scan shop QR codes and take photo for returns', enabled: true },
    { id: 'notif', name: 'Push Notifications', description: 'Real-time order tracking & exclusive local store offers', enabled: true }
  ]);

  // Help Topics List
  readonly helpTopics = signal<HelpTopic[]>([
    {
      id: 'track-order',
      category: 'delivery',
      icon: 'location',
      title: 'Track my order',
      answer: 'You can track your order in real-time from the "My Orders" tab. Once a merchant confirms your items, a live vector map shows the delivery partner location, live ETA, and route directly to your doorstep.',
      actionLabel: 'View Live Tracking',
      actionRoute: '/orders'
    },
    {
      id: 'cancel-order',
      category: 'order',
      icon: 'cancel',
      title: 'Cancel or change my order',
      answer: 'Orders can be cancelled within 60 seconds of placement before the merchant begins packing. If your items are already in transit, please contact support or reject the delivery at your door.',
      actionLabel: 'View Recent Orders',
      actionRoute: '/orders'
    },
    {
      id: 'get-refund',
      category: 'payment',
      icon: 'refund',
      title: 'Get a refund',
      answer: 'Refunds for cancelled or returned orders are initiated instantly. For UPI (GPay/PhonePe/Paytm), the amount is credited in 2–4 hours. Card and Net Banking refunds take 2–5 business days.',
      actionLabel: 'Payment Support',
      actionRoute: '/orders'
    },
    {
      id: 'return-replace',
      category: 'returns',
      icon: 'return',
      title: 'Return or replace an item',
      answer: 'If you received damaged, expired, or incorrect grocery items, you can request a return or instant replacement within 24 hours of delivery from your order details screen with photo proof.',
      actionLabel: 'Report an Issue',
      actionRoute: '/orders'
    },
    {
      id: 'payment-failed',
      category: 'payment',
      icon: 'card',
      title: 'Payment failed, what to do?',
      answer: 'If money was debited from your bank account but your order was not confirmed, the amount is automatically reversed by your payment gateway within 24 to 48 hours. You can safely try placing the order again.',
      actionLabel: 'Check Status',
      actionRoute: '/orders'
    }
  ]);

  // Filtered Topics computed
  readonly filteredTopics = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();
    let list = this.helpTopics();

    if (cat !== 'all') {
      list = list.filter(t => t.category === cat);
    }

    if (q) {
      list = list.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.answer.toLowerCase().includes(q)
      );
    }

    return list;
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'privacy') {
        this.activeTab.set('privacy');
      } else {
        this.activeTab.set('help');
      }
    });
  }

  setTab(tab: 'help' | 'privacy') {
    this.activeTab.set(tab);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
      queryParamsHandling: 'merge'
    });
  }

  setCategory(cat: string) {
    if (this.selectedCategory() === cat) {
      this.selectedCategory.set('all');
    } else {
      this.selectedCategory.set(cat);
    }
  }

  toggleTopic(id: string) {
    const current = new Set(this.expandedTopicIds());
    if (current.has(id)) {
      current.delete(id);
    } else {
      current.add(id);
    }
    this.expandedTopicIds.set(current);
  }

  isTopicExpanded(id: string): boolean {
    return this.expandedTopicIds().has(id);
  }

  togglePrivacySection(id: string) {
    if (this.expandedPrivacyId() === id) {
      this.expandedPrivacyId.set(null);
    } else {
      this.expandedPrivacyId.set(id);
    }
  }

  togglePermission(permId: string) {
    this.permissions.update(list =>
      list.map(p => (p.id === permId ? { ...p, enabled: !p.enabled } : p))
    );
    this.showToast('Permission preferences updated');
  }

  openChat() {
    this.isChatOpen.set(true);
  }

  closeChat() {
    this.isChatOpen.set(false);
  }

  sendChatMessage() {
    const text = this.chatInput().trim();
    if (!text) return;

    this.chatMessages.update(msgs => [
      ...msgs,
      { sender: 'user', text, time: 'Just now' }
    ]);
    this.chatInput.set('');

    setTimeout(() => {
      this.chatMessages.update(msgs => [
        ...msgs,
        {
          sender: 'agent',
          text: 'Thanks for reaching out! A NukkadNow customer specialist has been notified and is looking into your inquiry.',
          time: 'Just now'
        }
      ]);
    }, 1000);
  }

  sendQuickChat(quickText: string) {
    this.chatInput.set(quickText);
    this.sendChatMessage();
  }

  openDeleteModal() {
    this.isDeleteModalOpen.set(true);
  }

  closeDeleteModal() {
    this.isDeleteModalOpen.set(false);
  }

  confirmDeleteAccount() {
    this.isDeleteModalOpen.set(false);
    this.showToast('Account deletion request submitted. An email has been sent.');
  }

  downloadUserData() {
    this.showToast('Your data archive (ZIP) is being prepared. Check your email shortly.');
  }

  goBack() {
    this.router.navigate(['/account']);
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2800);
  }
}
