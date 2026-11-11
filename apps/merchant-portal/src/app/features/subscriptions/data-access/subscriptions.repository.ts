import { Injectable, inject } from '@angular/core';
import { SubscriptionsApi } from './subscriptions.api';
import { SubscriptionsMapper } from './subscriptions.mapper';
import { Observable, of, map } from 'rxjs';
import { SubscriptionsViewModel } from '../models/subscriptions-view.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionsRepository {
  private api = inject(SubscriptionsApi);
  private mapper = inject(SubscriptionsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
