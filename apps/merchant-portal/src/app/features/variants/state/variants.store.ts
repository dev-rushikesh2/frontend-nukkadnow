import { Injectable, signal, inject } from '@angular/core';
import { VariantsRepository } from '../data-access/variants.repository';
import { VariantsViewModel } from '../models/variants-view.model';

@Injectable()
export class VariantsStore {
  private repo = inject(VariantsRepository);

  readonly items = signal<VariantsViewModel[]>([]);
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
