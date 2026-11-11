import { Injectable } from '@angular/core';
import { ProductDetailsViewModel } from '../models/product-details-view.model';

@Injectable({ providedIn: 'root' })
export class ProductDetailsMapper {
  toViewModel(dto: any): ProductDetailsViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
