import { Injectable, signal } from '@angular/core';

export interface QueuedOfflineAction {
  id: string;
  type: 'DRAFT_WALKIN_ORDER' | 'UPDATE_LOCAL_STOCK';
  payload: any;
  timestamp: number;
  synced: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkSyncService {
  readonly isOnline = signal<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);
  readonly queuedActions = signal<QueuedOfflineAction[]>([]);
  readonly isSyncing = signal<boolean>(false);
  readonly lastSyncTimestamp = signal<string>('Just now');

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.isOnline.set(true);
        this.syncQueue();
      });
      window.addEventListener('offline', () => {
        this.isOnline.set(false);
      });
    }
  }

  queueAction(action: Omit<QueuedOfflineAction, 'id' | 'timestamp' | 'synced'>): void {
    const item: QueuedOfflineAction = {
      ...action,
      id: `queue-${Date.now()}`,
      timestamp: Date.now(),
      synced: false
    };
    this.queuedActions.update(q => [...q, item]);
  }

  syncQueue(): void {
    if (this.queuedActions().length === 0) return;
    this.isSyncing.set(true);

    setTimeout(() => {
      this.queuedActions.set([]);
      this.isSyncing.set(false);
      this.lastSyncTimestamp.set('Just now');
    }, 800);
  }
}
