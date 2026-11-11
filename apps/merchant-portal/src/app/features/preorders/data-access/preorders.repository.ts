import { Injectable, inject } from '@angular/core';
import { PreordersApi } from './preorders.api';
import { PreordersMapper } from './preorders.mapper';
import { Observable, of, map } from 'rxjs';
import { PreordersViewModel } from '../models/preorders-view.model';

@Injectable({ providedIn: 'root' })
export class PreordersRepository {
  private api = inject(PreordersApi);
  private mapper = inject(PreordersMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
