import { Injectable } from '@angular/core';
import { CategoriesViewModel } from '../models/categories-view.model';

@Injectable({ providedIn: 'root' })
export class CategoriesMapper {
  toViewModel(dto: any): CategoriesViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
