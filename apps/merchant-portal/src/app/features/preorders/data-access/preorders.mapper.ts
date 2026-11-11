import { Injectable } from '@angular/core';
import { PreordersViewModel } from '../models/preorders-view.model';

@Injectable({ providedIn: 'root' })
export class PreordersMapper {
  toViewModel(dto: any): PreordersViewModel {
    return { ...dto } as any;
  }
}
