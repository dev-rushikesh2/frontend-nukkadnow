import { Injectable, inject } from '@angular/core';
import { AnalyticsApi } from './analytics.api';
import { AnalyticsMapper } from './analytics.mapper';
import { Observable, of, map } from 'rxjs';
import { AnalyticsViewModel } from '../models/analytics-view.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsRepository {
  private api = inject(AnalyticsApi);
  private mapper = inject(AnalyticsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
