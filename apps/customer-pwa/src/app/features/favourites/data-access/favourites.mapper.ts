import { Injectable } from '@angular/core';
import { FavouritesViewModel } from '../models/favourites-view.model';

@Injectable({ providedIn: 'root' })
export class FavouritesMapper {
  toViewModel(dto: any): FavouritesViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
