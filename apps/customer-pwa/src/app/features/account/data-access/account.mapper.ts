import { Injectable } from '@angular/core';
import { AccountViewModel } from '../models/account-view.model';

@Injectable({ providedIn: 'root' })
export class AccountMapper {
  toViewModel(dto: any): AccountViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
