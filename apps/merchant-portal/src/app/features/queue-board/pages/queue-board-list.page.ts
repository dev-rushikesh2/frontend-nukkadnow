import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface QueueOrder {
  id: string;
  token: string;
  customerName: string;
  type: 'Walk-in' | 'Online' | 'Table QR';
  itemsSummary: string;
  itemsCount: number;
  amount: number;
  status: 'Preparing' | 'Ready' | 'Called';
  timeRemainingMins: number;
  placedTime: string;
}

@Component({
  selector: 'merchant-queue-board-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './queue-board-list.page.html',
  styleUrls: ['./queue-board-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueBoardPageComponent {
  // View mode: 'kanban' | 'list'
  readonly viewLayout = signal<'kanban' | 'list'>('kanban');

  // Filter: 'All' | 'Walk-in' | 'Online' | 'Table QR'
  readonly activeTypeFilter = signal<'All' | 'Walk-in' | 'Online' | 'Table QR'>('All');

  // Fullscreen state
  readonly isFullscreen = signal<boolean>(false);

  // Toast announcement
  readonly announcementToast = signal<string | null>(null);

  // Queue Orders
  readonly queueList = signal<QueueOrder[]>([
    {
      id: 'ord-201',
      token: 'Q-14',
      customerName: 'Sanjay Verma',
      type: 'Walk-in',
      itemsSummary: '2x Masala Tea, 1x Bun Maska, 1x Samosa',
      itemsCount: 4,
      amount: 140,
      status: 'Preparing',
      timeRemainingMins: 4,
      placedTime: '10:32 AM'
    },
    {
      id: 'ord-202',
      token: 'Q-15',
      customerName: 'Pooja Hegde',
      type: 'Online',
      itemsSummary: '1x Cold Coffee, 2x Veg Sandwich',
      itemsCount: 3,
      amount: 220,
      status: 'Preparing',
      timeRemainingMins: 7,
      placedTime: '10:35 AM'
    },
    {
      id: 'ord-203',
      token: 'Q-12',
      customerName: 'Kunal Roy',
      type: 'Table QR',
      itemsSummary: '1x Paneer Roll, 1x Thums Up 250ml',
      itemsCount: 2,
      amount: 160,
      status: 'Ready',
      timeRemainingMins: 0,
      placedTime: '10:20 AM'
    },
    {
      id: 'ord-204',
      token: 'Q-11',
      customerName: 'Meera Rao',
      type: 'Walk-in',
      itemsSummary: '1x Filter Coffee, 1x Butter Croissant',
      itemsCount: 2,
      amount: 150,
      status: 'Called',
      timeRemainingMins: 0,
      placedTime: '10:18 AM'
    },
    {
      id: 'ord-205',
      token: 'Q-16',
      customerName: 'Akash Sharma',
      type: 'Online',
      itemsSummary: '2x Aloo Paratha, 1x Sweet Lassi',
      itemsCount: 3,
      amount: 210,
      status: 'Preparing',
      timeRemainingMins: 11,
      placedTime: '10:38 AM'
    }
  ]);

  // Metrics
  readonly inQueueCount = computed(() => this.queueList().length);
  readonly preparingCount = computed(() => this.queueList().filter(q => q.status === 'Preparing').length);
  readonly readyCount = computed(() => this.queueList().filter(q => q.status === 'Ready' || q.status === 'Called').length);
  readonly completedToday = signal<number>(38);

  // Filtered List
  readonly filteredQueue = computed(() => {
    const f = this.activeTypeFilter();
    if (f === 'All') return this.queueList();
    return this.queueList().filter(q => q.type === f);
  });

  readonly preparingOrders = computed(() =>
    this.filteredQueue().filter(q => q.status === 'Preparing')
  );

  readonly readyOrders = computed(() =>
    this.filteredQueue().filter(q => q.status === 'Ready' || q.status === 'Called')
  );

  callNextToken() {
    const nextReady = this.queueList().find(q => q.status === 'Ready');
    if (nextReady) {
      this.callToken(nextReady.token);
    } else {
      const nextPrep = this.queueList().find(q => q.status === 'Preparing');
      if (nextPrep) {
        this.markReady(nextPrep.id);
        this.callToken(nextPrep.token);
      } else {
        this.showToast('No orders waiting to be called!');
      }
    }
  }

  callToken(token: string) {
    this.queueList.update(list =>
      list.map(q => q.token === token ? { ...q, status: 'Called' } : q)
    );
    this.showToast(`📢 Calling Token ${token}! Please collect your order at counter.`);
  }

  markReady(id: string) {
    this.queueList.update(list =>
      list.map(q => q.id === id ? { ...q, status: 'Ready', timeRemainingMins: 0 } : q)
    );
    this.showToast(`Order marked Ready for Pickup!`);
  }

  completeOrder(id: string) {
    this.queueList.update(list => list.filter(q => q.id !== id));
    this.completedToday.update(c => c + 1);
    this.showToast(`Order handed over & completed!`);
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      this.isFullscreen.set(true);
    } else {
      document.exitFullscreen().catch(() => {});
      this.isFullscreen.set(false);
    }
  }

  private showToast(msg: string) {
    this.announcementToast.set(msg);
    setTimeout(() => this.announcementToast.set(null), 3200);
  }
}

export { QueueBoardPageComponent as QueueBoardListPageComponent };
