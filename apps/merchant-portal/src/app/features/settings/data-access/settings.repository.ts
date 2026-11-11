import { Injectable, inject } from '@angular/core';
import { SettingsApi } from './settings.api';
import { SettingsMapper } from './settings.mapper';
import { Observable, of, map } from 'rxjs';
import { SettingsViewModel } from '../models/settings-view.model';

@Injectable({ providedIn: 'root' })
export class SettingsRepository {
  private api = inject(SettingsApi);
  private mapper = inject(SettingsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
