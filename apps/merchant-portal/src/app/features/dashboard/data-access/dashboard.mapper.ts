import { Injectable } from '@angular/core';
import { DashboardViewModel } from '../models/dashboard-view.model';

@Injectable({ providedIn: 'root' })
export class DashboardMapper {
  toViewModel(dto: any): DashboardViewModel {
    return { ...dto } as any;
  }
}
