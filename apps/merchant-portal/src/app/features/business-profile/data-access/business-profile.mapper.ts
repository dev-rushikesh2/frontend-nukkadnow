import { Injectable } from '@angular/core';
import { BusinessProfileViewModel } from '../models/business-profile-view.model';

@Injectable({ providedIn: 'root' })
export class BusinessProfileMapper {
  toViewModel(dto: any): BusinessProfileViewModel {
    return { ...dto } as any;
  }
}
