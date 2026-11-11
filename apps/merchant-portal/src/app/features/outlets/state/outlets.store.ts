import { Injectable, signal, inject } from '@angular/core';
import { OutletsRepository } from '../data-access/outlets.repository';
import { OutletsViewModel } from '../models/outlets-view.model';

@Injectable()
export class OutletsStore {
  private repo = inject(OutletsRepository);

  readonly items = signal<OutletsViewModel[]>([]);
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
