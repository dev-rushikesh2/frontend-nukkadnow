import { Injectable, signal, inject } from '@angular/core';
import { HomeRepository } from '../data-access/home.repository';
import { HomeViewModel } from '../models/home-view.model';

@Injectable()
export class HomeStore {
  private repo = inject(HomeRepository);

  readonly items = signal<HomeViewModel[]>([]);
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
