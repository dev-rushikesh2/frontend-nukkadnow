import { Injectable } from '@angular/core';
import { VariantsViewModel } from '../models/variants-view.model';

@Injectable({ providedIn: 'root' })
export class VariantsMapper {
  toViewModel(dto: any): VariantsViewModel {
    return { ...dto } as any;
  }
}
