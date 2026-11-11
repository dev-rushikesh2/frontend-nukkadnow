import { Injectable } from '@angular/core';
import { DeliverySettingsViewModel } from '../models/delivery-settings-view.model';

@Injectable({ providedIn: 'root' })
export class DeliverySettingsMapper {
  toViewModel(dto: any): DeliverySettingsViewModel {
    return { ...dto } as any;
  }
}
