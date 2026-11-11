import { Injectable, signal, inject } from '@angular/core';
import { SellerModesRepository } from '../data-access/seller-modes.repository';
import { SellerModesViewModel } from '../models/seller-modes-view.model';

@Injectable()
export class SellerModesStore {
  private repo = inject(SellerModesRepository);

  readonly items = signal<SellerModesViewModel[]>([]);
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
