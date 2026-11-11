import { Injectable, signal, inject } from '@angular/core';
import { WalkinOrdersRepository } from '../data-access/walkin-orders.repository';
import { WalkinOrdersViewModel } from '../models/walkin-orders-view.model';

@Injectable()
export class WalkinOrdersStore {
  private repo = inject(WalkinOrdersRepository);

  readonly items = signal<WalkinOrdersViewModel[]>([]);
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
