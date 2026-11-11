import { Injectable, inject } from '@angular/core';
import { DashboardApi } from './dashboard.api';
import { DashboardMapper } from './dashboard.mapper';
import { Observable, of, map } from 'rxjs';
import { DashboardViewModel } from '../models/dashboard-view.model';

@Injectable({ providedIn: 'root' })
export class DashboardRepository {
  private api = inject(DashboardApi);
  private mapper = inject(DashboardMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
