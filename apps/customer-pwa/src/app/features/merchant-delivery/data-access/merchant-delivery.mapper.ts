import { Injectable } from '@angular/core';
import { MerchantDeliveryViewModel } from '../models/merchant-delivery-view.model';

@Injectable({ providedIn: 'root' })
export class MerchantDeliveryMapper {
  toViewModel(dto: any): MerchantDeliveryViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
