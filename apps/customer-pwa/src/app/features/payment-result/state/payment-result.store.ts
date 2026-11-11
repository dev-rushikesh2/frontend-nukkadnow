import { Injectable, signal, inject } from '@angular/core';
import { PaymentResultRepository } from '../data-access/payment-result.repository';
import { PaymentResultViewModel } from '../models/payment-result-view.model';

@Injectable()
export class PaymentResultStore {
  private repo = inject(PaymentResultRepository);

  readonly items = signal<PaymentResultViewModel[]>([]);
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
