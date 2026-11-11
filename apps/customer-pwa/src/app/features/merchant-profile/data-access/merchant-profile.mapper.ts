import { Injectable } from '@angular/core';
import { MerchantProfileViewModel } from '../models/merchant-profile-view.model';

@Injectable({ providedIn: 'root' })
export class MerchantProfileMapper {
  toViewModel(dto: any): MerchantProfileViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
