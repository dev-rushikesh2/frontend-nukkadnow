import { Injectable } from '@angular/core';
import { SellerModesViewModel } from '../models/seller-modes-view.model';

@Injectable({ providedIn: 'root' })
export class SellerModesMapper {
  toViewModel(dto: any): SellerModesViewModel {
    return { ...dto } as any;
  }
}
