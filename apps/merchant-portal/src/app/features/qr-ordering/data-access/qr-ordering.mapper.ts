import { Injectable } from '@angular/core';
import { QrOrderingViewModel } from '../models/qr-ordering-view.model';

@Injectable({ providedIn: 'root' })
export class QrOrderingMapper {
  toViewModel(dto: any): QrOrderingViewModel {
    return { ...dto } as any;
  }
}
