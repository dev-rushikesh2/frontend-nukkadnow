import { Injectable } from '@angular/core';
import { CatalogueViewModel } from '../models/catalogue-view.model';

@Injectable({ providedIn: 'root' })
export class CatalogueMapper {
  toViewModel(dto: any): CatalogueViewModel {
    return { ...dto } as any;
  }
}
