import { Injectable } from '@angular/core';
import { AnalyticsViewModel } from '../models/analytics-view.model';

@Injectable({ providedIn: 'root' })
export class AnalyticsMapper {
  toViewModel(dto: any): AnalyticsViewModel {
    return { ...dto } as any;
  }
}
