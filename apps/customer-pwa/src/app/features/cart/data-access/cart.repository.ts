import { Injectable, inject } from '@angular/core';
import { CartApi } from './cart.api';
import { CartMapper } from './cart.mapper';
import { Observable, map } from 'rxjs';
import { CartViewModel } from '../models/cart-view.model';

@Injectable({ providedIn: 'root' })
export class CartRepository {
  private api = inject(CartApi);
  private mapper = inject(CartMapper);

  getList(): Observable<CartViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
