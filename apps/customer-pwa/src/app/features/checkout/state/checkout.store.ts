import { Injectable, signal, inject } from '@angular/core';
import { CheckoutRepository } from '../data-access/checkout.repository';
import { CheckoutViewModel } from '../models/checkout-view.model';

@Injectable()
export class CheckoutStore {
  private repo = inject(CheckoutRepository);

  readonly items = signal<CheckoutViewModel[]>([]);
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
