import { Injectable } from '@angular/core';
import { PaymentResultViewModel } from '../models/payment-result-view.model';

@Injectable({ providedIn: 'root' })
export class PaymentResultMapper {
  toViewModel(dto: any): PaymentResultViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
