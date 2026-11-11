import { Injectable, inject } from '@angular/core';
import { OrderInboxApi } from './order-inbox.api';
import { OrderInboxMapper } from './order-inbox.mapper';
import { Observable, of, map } from 'rxjs';
import { OrderInboxViewModel } from '../models/order-inbox-view.model';

@Injectable({ providedIn: 'root' })
export class OrderInboxRepository {
  private api = inject(OrderInboxApi);
  private mapper = inject(OrderInboxMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
