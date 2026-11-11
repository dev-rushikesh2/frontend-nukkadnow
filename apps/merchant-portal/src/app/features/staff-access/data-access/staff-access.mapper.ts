import { Injectable } from '@angular/core';
import { StaffAccessViewModel } from '../models/staff-access-view.model';

@Injectable({ providedIn: 'root' })
export class StaffAccessMapper {
  toViewModel(dto: any): StaffAccessViewModel {
    return { ...dto } as any;
  }
}
