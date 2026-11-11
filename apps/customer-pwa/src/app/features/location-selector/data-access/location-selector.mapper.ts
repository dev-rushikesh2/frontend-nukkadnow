import { Injectable } from '@angular/core';
import { LocationSelectorViewModel } from '../models/location-selector-view.model';

@Injectable({ providedIn: 'root' })
export class LocationSelectorMapper {
  toViewModel(dto: any): LocationSelectorViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
