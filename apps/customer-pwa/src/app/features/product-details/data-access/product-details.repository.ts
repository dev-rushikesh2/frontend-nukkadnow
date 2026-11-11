import { Injectable, inject } from '@angular/core';
import { ProductDetailsApi } from './product-details.api';
import { ProductDetailsMapper } from './product-details.mapper';
import { Observable, map } from 'rxjs';
import { ProductDetailsViewModel } from '../models/product-details-view.model';

@Injectable({ providedIn: 'root' })
export class ProductDetailsRepository {
  private api = inject(ProductDetailsApi);
  private mapper = inject(ProductDetailsMapper);

  getList(): Observable<ProductDetailsViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
