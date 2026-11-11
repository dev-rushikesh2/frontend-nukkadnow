import { Injectable, inject } from '@angular/core';
import { OrdersApi } from './orders.api';
import { OrdersMapper } from './orders.mapper';
import { Observable, map } from 'rxjs';
import { OrdersViewModel } from '../models/orders-view.model';

@Injectable({ providedIn: 'root' })
export class OrdersRepository {
  private api = inject(OrdersApi);
  private mapper = inject(OrdersMapper);

  getList(): Observable<OrdersViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
