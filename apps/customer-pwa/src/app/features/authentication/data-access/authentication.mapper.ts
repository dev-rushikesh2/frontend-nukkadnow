import { Injectable } from '@angular/core';
import { AuthenticationViewModel } from '../models/authentication-view.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationMapper {
  toViewModel(dto: any): AuthenticationViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
