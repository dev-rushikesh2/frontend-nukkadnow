import { Injectable } from '@angular/core';
import { WalkinOrdersViewModel } from '../models/walkin-orders-view.model';

@Injectable({ providedIn: 'root' })
export class WalkinOrdersMapper {
  toViewModel(dto: any): WalkinOrdersViewModel {
    return { ...dto } as any;
  }
}
