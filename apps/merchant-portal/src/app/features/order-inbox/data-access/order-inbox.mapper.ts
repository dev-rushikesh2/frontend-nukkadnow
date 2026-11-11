import { Injectable } from '@angular/core';
import { OrderInboxViewModel } from '../models/order-inbox-view.model';

@Injectable({ providedIn: 'root' })
export class OrderInboxMapper {
  toViewModel(dto: any): OrderInboxViewModel {
    return { ...dto } as any;
  }
}
