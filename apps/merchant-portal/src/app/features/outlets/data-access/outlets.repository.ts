import { Injectable, inject } from '@angular/core';
import { OutletsApi } from './outlets.api';
import { OutletsMapper } from './outlets.mapper';
import { Observable, of, map } from 'rxjs';
import { OutletsViewModel } from '../models/outlets-view.model';

@Injectable({ providedIn: 'root' })
export class OutletsRepository {
  private api = inject(OutletsApi);
  private mapper = inject(OutletsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
