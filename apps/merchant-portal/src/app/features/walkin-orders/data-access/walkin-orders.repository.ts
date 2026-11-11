import { Injectable, inject } from '@angular/core';
import { WalkinOrdersApi } from './walkin-orders.api';
import { WalkinOrdersMapper } from './walkin-orders.mapper';
import { Observable, of, map } from 'rxjs';
import { WalkinOrdersViewModel } from '../models/walkin-orders-view.model';

@Injectable({ providedIn: 'root' })
export class WalkinOrdersRepository {
  private api = inject(WalkinOrdersApi);
  private mapper = inject(WalkinOrdersMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
