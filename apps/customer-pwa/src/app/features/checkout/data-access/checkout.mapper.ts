import { Injectable } from '@angular/core';
import { CheckoutViewModel } from '../models/checkout-view.model';

@Injectable({ providedIn: 'root' })
export class CheckoutMapper {
  toViewModel(dto: any): CheckoutViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
