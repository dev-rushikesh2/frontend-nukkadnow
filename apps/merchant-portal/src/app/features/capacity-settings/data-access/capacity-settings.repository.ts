import { Injectable, inject } from '@angular/core';
import { CapacitySettingsApi } from './capacity-settings.api';
import { CapacitySettingsMapper } from './capacity-settings.mapper';
import { Observable, of, map } from 'rxjs';
import { CapacitySettingsViewModel } from '../models/capacity-settings-view.model';

@Injectable({ providedIn: 'root' })
export class CapacitySettingsRepository {
  private api = inject(CapacitySettingsApi);
  private mapper = inject(CapacitySettingsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
