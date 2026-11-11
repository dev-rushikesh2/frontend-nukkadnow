import { Injectable } from '@angular/core';
import { OrderTrackingViewModel } from '../models/order-tracking-view.model';

@Injectable({ providedIn: 'root' })
export class OrderTrackingMapper {
  toViewModel(dto: any): OrderTrackingViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
