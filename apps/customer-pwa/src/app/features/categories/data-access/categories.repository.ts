import { Injectable, inject } from '@angular/core';
import { CategoriesApi } from './categories.api';
import { CategoriesMapper } from './categories.mapper';
import { Observable, map } from 'rxjs';
import { CategoriesViewModel } from '../models/categories-view.model';

@Injectable({ providedIn: 'root' })
export class CategoriesRepository {
  private api = inject(CategoriesApi);
  private mapper = inject(CategoriesMapper);

  getList(): Observable<CategoriesViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
