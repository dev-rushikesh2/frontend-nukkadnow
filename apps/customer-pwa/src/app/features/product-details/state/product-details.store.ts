import { Injectable, signal, inject } from '@angular/core';
import { ProductDetailsRepository } from '../data-access/product-details.repository';
import { ProductDetailsViewModel } from '../models/product-details-view.model';

@Injectable()
export class ProductDetailsStore {
  private repo = inject(ProductDetailsRepository);

  readonly items = signal<ProductDetailsViewModel[]>([]);
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
