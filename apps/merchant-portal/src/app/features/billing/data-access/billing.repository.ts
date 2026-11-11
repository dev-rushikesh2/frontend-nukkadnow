import { Injectable, inject } from '@angular/core';
import { BillingApi } from './billing.api';
import { BillingMapper } from './billing.mapper';
import { Observable, of, map } from 'rxjs';
import { BillingViewModel } from '../models/billing-view.model';

@Injectable({ providedIn: 'root' })
export class BillingRepository {
  private api = inject(BillingApi);
  private mapper = inject(BillingMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
