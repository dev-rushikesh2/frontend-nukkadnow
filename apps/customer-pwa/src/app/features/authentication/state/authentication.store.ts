import { Injectable, signal, inject } from '@angular/core';
import { AuthenticationRepository } from '../data-access/authentication.repository';
import { AuthenticationViewModel } from '../models/authentication-view.model';

@Injectable()
export class AuthenticationStore {
  private repo = inject(AuthenticationRepository);

  readonly items = signal<AuthenticationViewModel[]>([]);
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
