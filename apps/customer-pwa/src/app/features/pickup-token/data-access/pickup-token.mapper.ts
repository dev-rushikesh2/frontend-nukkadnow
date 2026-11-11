import { Injectable } from '@angular/core';
import { PickupTokenViewModel } from '../models/pickup-token-view.model';

@Injectable({ providedIn: 'root' })
export class PickupTokenMapper {
  toViewModel(dto: any): PickupTokenViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
