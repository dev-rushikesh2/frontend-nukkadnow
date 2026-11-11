import { Injectable } from '@angular/core';
import { SettingsViewModel } from '../models/settings-view.model';

@Injectable({ providedIn: 'root' })
export class SettingsMapper {
  toViewModel(dto: any): SettingsViewModel {
    return { ...dto } as any;
  }
}
