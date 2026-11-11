import { Injectable, signal, inject } from '@angular/core';
import { NotificationsRepository } from '../data-access/notifications.repository';
import { NotificationsViewModel } from '../models/notifications-view.model';

@Injectable()
export class NotificationsStore {
  private repo = inject(NotificationsRepository);

  readonly items = signal<NotificationsViewModel[]>([]);
  readonly loading = signal<boolean>(false);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.repo.getList().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
