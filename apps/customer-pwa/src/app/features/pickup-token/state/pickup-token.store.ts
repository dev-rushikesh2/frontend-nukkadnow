import { Injectable, signal, inject } from '@angular/core';
import { PickupTokenRepository } from '../data-access/pickup-token.repository';
import { PickupTokenViewModel } from '../models/pickup-token-view.model';

@Injectable()
export class PickupTokenStore {
  private repo = inject(PickupTokenRepository);

  readonly items = signal<PickupTokenViewModel[]>([]);
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
