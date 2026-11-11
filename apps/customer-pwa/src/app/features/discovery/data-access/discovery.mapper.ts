import { Injectable } from '@angular/core';
import { DiscoveryViewModel } from '../models/discovery-view.model';

@Injectable({ providedIn: 'root' })
export class DiscoveryMapper {
  toViewModel(dto: any): DiscoveryViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
