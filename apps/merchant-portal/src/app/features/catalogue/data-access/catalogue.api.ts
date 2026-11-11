import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProductItem, INITIAL_PRODUCTS } from '../models/catalogue-view.model';

@Injectable({ providedIn: 'root' })
export class CatalogueApi {
  fetchProducts(): Observable<ProductItem[]> {
    return of(INITIAL_PRODUCTS).pipe(delay(300));
  }

  fetchList(): Observable<ProductItem[]> {
    return this.fetchProducts();
  }
}
