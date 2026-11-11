import { Injectable } from '@angular/core';
import { BillingViewModel } from '../models/billing-view.model';

@Injectable({ providedIn: 'root' })
export class BillingMapper {
  toViewModel(dto: any): BillingViewModel {
    return { ...dto } as any;
  }
}
