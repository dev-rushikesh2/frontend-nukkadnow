import { Injectable, inject } from '@angular/core';
import { VariantsApi } from './variants.api';
import { VariantsMapper } from './variants.mapper';
import { Observable, of, map } from 'rxjs';
import { VariantsViewModel } from '../models/variants-view.model';

@Injectable({ providedIn: 'root' })
export class VariantsRepository {
  private api = inject(VariantsApi);
  private mapper = inject(VariantsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
