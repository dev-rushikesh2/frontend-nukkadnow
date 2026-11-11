import { Injectable, signal, inject } from '@angular/core';
import { LocationSelectorRepository } from '../data-access/location-selector.repository';
import { LocationSelectorViewModel } from '../models/location-selector-view.model';

@Injectable()
export class LocationSelectorStore {
  private repo = inject(LocationSelectorRepository);

  readonly items = signal<LocationSelectorViewModel[]>([]);
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
