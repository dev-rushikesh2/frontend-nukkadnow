import { Injectable, inject } from '@angular/core';
import { PaymentResultApi } from './payment-result.api';
import { PaymentResultMapper } from './payment-result.mapper';
import { Observable, map } from 'rxjs';
import { PaymentResultViewModel } from '../models/payment-result-view.model';

@Injectable({ providedIn: 'root' })
export class PaymentResultRepository {
  private api = inject(PaymentResultApi);
  private mapper = inject(PaymentResultMapper);

  getList(): Observable<PaymentResultViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
