import { Injectable, signal, inject } from '@angular/core';
import { OrdersRepository } from '../data-access/orders.repository';
import { OrdersViewModel } from '../models/orders-view.model';

@Injectable()
export class OrdersStore {
  private repo = inject(OrdersRepository);

  readonly items = signal<OrdersViewModel[]>([]);
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
