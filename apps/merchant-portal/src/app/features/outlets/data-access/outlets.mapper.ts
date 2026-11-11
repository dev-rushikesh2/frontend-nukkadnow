import { Injectable } from '@angular/core';
import { OutletsViewModel } from '../models/outlets-view.model';

@Injectable({ providedIn: 'root' })
export class OutletsMapper {
  toViewModel(dto: any): OutletsViewModel {
    return { ...dto } as any;
  }
}
