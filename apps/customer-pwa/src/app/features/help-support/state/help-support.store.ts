import { Injectable, signal, inject } from '@angular/core';
import { HelpSupportRepository } from '../data-access/help-support.repository';
import { HelpSupportViewModel } from '../models/help-support-view.model';

@Injectable()
export class HelpSupportStore {
  private repo = inject(HelpSupportRepository);

  readonly items = signal<HelpSupportViewModel[]>([]);
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
