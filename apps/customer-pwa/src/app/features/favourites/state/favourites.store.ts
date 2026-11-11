import { Injectable, signal, inject } from '@angular/core';
import { FavouritesRepository } from '../data-access/favourites.repository';
import { FavouritesViewModel } from '../models/favourites-view.model';

@Injectable()
export class FavouritesStore {
  private repo = inject(FavouritesRepository);

  readonly items = signal<FavouritesViewModel[]>([]);
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
