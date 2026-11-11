import { Injectable, inject } from '@angular/core';
import { OrderTrackingApi } from './order-tracking.api';
import { OrderTrackingMapper } from './order-tracking.mapper';
import { Observable, map } from 'rxjs';
import { OrderTrackingViewModel } from '../models/order-tracking-view.model';

@Injectable({ providedIn: 'root' })
export class OrderTrackingRepository {
  private api = inject(OrderTrackingApi);
  private mapper = inject(OrderTrackingMapper);

  getList(): Observable<OrderTrackingViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
