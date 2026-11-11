import { Injectable, signal, inject } from '@angular/core';
import { CategoriesRepository } from '../data-access/categories.repository';
import { CategoriesViewModel } from '../models/categories-view.model';

@Injectable()
export class CategoriesStore {
  private repo = inject(CategoriesRepository);

  readonly items = signal<CategoriesViewModel[]>([]);
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
