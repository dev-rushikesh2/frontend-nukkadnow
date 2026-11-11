import { Injectable, inject } from '@angular/core';
import { AccountApi } from './account.api';
import { AccountMapper } from './account.mapper';
import { Observable, map } from 'rxjs';
import { AccountViewModel } from '../models/account-view.model';

@Injectable({ providedIn: 'root' })
export class AccountRepository {
  private api = inject(AccountApi);
  private mapper = inject(AccountMapper);

  getList(): Observable<AccountViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
