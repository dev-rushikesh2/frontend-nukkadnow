import { Injectable, signal, inject } from '@angular/core';
import { SettingsRepository } from '../data-access/settings.repository';
import { SettingsViewModel } from '../models/settings-view.model';

@Injectable()
export class SettingsStore {
  private repo = inject(SettingsRepository);

  readonly items = signal<SettingsViewModel[]>([]);
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
