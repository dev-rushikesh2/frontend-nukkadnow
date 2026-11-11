import { Injectable, inject } from '@angular/core';
import { DeliverySettingsApi } from './delivery-settings.api';
import { DeliverySettingsMapper } from './delivery-settings.mapper';
import { Observable, of, map } from 'rxjs';
import { DeliverySettingsViewModel } from '../models/delivery-settings-view.model';

@Injectable({ providedIn: 'root' })
export class DeliverySettingsRepository {
  private api = inject(DeliverySettingsApi);
  private mapper = inject(DeliverySettingsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
