import { Injectable, signal, inject } from '@angular/core';
import { OrderTrackingRepository } from '../data-access/order-tracking.repository';
import { OrderTrackingViewModel } from '../models/order-tracking-view.model';

@Injectable()
export class OrderTrackingStore {
  private repo = inject(OrderTrackingRepository);

  readonly items = signal<OrderTrackingViewModel[]>([]);
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
