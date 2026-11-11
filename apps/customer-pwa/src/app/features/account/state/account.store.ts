import { Injectable, signal, inject } from '@angular/core';
import { AccountRepository } from '../data-access/account.repository';
import { AccountViewModel } from '../models/account-view.model';

@Injectable()
export class AccountStore {
  private repo = inject(AccountRepository);

  readonly items = signal<AccountViewModel[]>([]);
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
