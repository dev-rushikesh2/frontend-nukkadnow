import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { OrderInboxItem, INITIAL_INBOX_ORDERS } from '../models/order-inbox-view.model';

@Injectable({ providedIn: 'root' })
export class OrderInboxApi {
  fetchOrders(): Observable<OrderInboxItem[]> {
    return of(INITIAL_INBOX_ORDERS).pipe(delay(300));
  }

  fetchList(): Observable<OrderInboxItem[]> {
    return this.fetchOrders();
  }
}
