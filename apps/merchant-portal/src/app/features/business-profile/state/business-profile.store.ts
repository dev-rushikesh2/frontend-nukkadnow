import { Injectable, signal, inject } from '@angular/core';
import { BusinessProfileRepository } from '../data-access/business-profile.repository';
import { BusinessProfileViewModel } from '../models/business-profile-view.model';

@Injectable()
export class BusinessProfileStore {
  private repo = inject(BusinessProfileRepository);

  readonly items = signal<BusinessProfileViewModel[]>([]);
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
