import { Injectable, signal, inject } from '@angular/core';
import { CartRepository } from '../data-access/cart.repository';
import { CartViewModel } from '../models/cart-view.model';

@Injectable()
export class CartStore {
  private repo = inject(CartRepository);

  readonly items = signal<CartViewModel[]>([]);
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
