import { Injectable, signal, inject } from '@angular/core';
import { OnboardingRepository } from '../data-access/onboarding.repository';
import { OnboardingViewModel } from '../models/onboarding-view.model';

@Injectable()
export class OnboardingStore {
  private repo = inject(OnboardingRepository);

  readonly items = signal<OnboardingViewModel[]>([]);
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
