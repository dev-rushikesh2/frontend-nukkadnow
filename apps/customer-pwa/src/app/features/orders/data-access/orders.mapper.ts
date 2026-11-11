import { Injectable } from '@angular/core';
import { OrdersViewModel } from '../models/orders-view.model';

@Injectable({ providedIn: 'root' })
export class OrdersMapper {
  toViewModel(dto: any): OrdersViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
