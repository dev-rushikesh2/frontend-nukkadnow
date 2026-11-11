import { Injectable } from '@angular/core';
import { InventoryViewModel } from '../models/inventory-view.model';

@Injectable({ providedIn: 'root' })
export class InventoryMapper {
  toViewModel(dto: any): InventoryViewModel {
    return { ...dto } as any;
  }
}
