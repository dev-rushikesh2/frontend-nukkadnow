import { Injectable, inject } from '@angular/core';
import { CheckoutApi } from './checkout.api';
import { CheckoutMapper } from './checkout.mapper';
import { Observable, map } from 'rxjs';
import { CheckoutViewModel } from '../models/checkout-view.model';

@Injectable({ providedIn: 'root' })
export class CheckoutRepository {
  private api = inject(CheckoutApi);
  private mapper = inject(CheckoutMapper);

  getList(): Observable<CheckoutViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
