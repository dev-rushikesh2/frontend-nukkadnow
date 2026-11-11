import { Injectable } from '@angular/core';
import { PickupSlotsViewModel } from '../models/pickup-slots-view.model';

@Injectable({ providedIn: 'root' })
export class PickupSlotsMapper {
  toViewModel(dto: any): PickupSlotsViewModel {
    return { ...dto } as any;
  }
}
