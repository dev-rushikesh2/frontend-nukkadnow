import { Injectable } from '@angular/core';
import { SubscriptionsViewModel } from '../models/subscriptions-view.model';

@Injectable({ providedIn: 'root' })
export class SubscriptionsMapper {
  toViewModel(dto: any): SubscriptionsViewModel {
    return { ...dto } as any;
  }
}
