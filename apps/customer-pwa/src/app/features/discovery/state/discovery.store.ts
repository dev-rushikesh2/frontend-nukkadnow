import { Injectable, signal, inject } from '@angular/core';
import { DiscoveryRepository } from '../data-access/discovery.repository';
import { DiscoveryViewModel } from '../models/discovery-view.model';

@Injectable()
export class DiscoveryStore {
  private repo = inject(DiscoveryRepository);

  readonly items = signal<DiscoveryViewModel[]>([]);
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
