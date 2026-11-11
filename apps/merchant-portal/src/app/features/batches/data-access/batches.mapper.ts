import { Injectable } from '@angular/core';
import { BatchesViewModel } from '../models/batches-view.model';

@Injectable({ providedIn: 'root' })
export class BatchesMapper {
  toViewModel(dto: any): BatchesViewModel {
    return { ...dto } as any;
  }
}
