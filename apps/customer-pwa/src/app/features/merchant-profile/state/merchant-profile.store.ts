import { Injectable, signal, inject } from '@angular/core';
import { MerchantProfileRepository } from '../data-access/merchant-profile.repository';
import { MerchantProfileViewModel } from '../models/merchant-profile-view.model';

@Injectable()
export class MerchantProfileStore {
  private repo = inject(MerchantProfileRepository);

  readonly items = signal<MerchantProfileViewModel[]>([]);
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
