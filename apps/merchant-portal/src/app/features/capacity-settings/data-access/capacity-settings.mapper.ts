import { Injectable } from '@angular/core';
import { CapacitySettingsViewModel } from '../models/capacity-settings-view.model';

@Injectable({ providedIn: 'root' })
export class CapacitySettingsMapper {
  toViewModel(dto: any): CapacitySettingsViewModel {
    return { ...dto } as any;
  }
}
