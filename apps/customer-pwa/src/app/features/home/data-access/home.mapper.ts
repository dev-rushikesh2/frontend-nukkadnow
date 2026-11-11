import { Injectable } from '@angular/core';
import { HomeViewModel } from '../models/home-view.model';

@Injectable({ providedIn: 'root' })
export class HomeMapper {
  toViewModel(dto: any): HomeViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
