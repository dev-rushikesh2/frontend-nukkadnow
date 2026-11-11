import { Injectable } from '@angular/core';
import { CartViewModel } from '../models/cart-view.model';

@Injectable({ providedIn: 'root' })
export class CartMapper {
  toViewModel(dto: any): CartViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
