import { Injectable } from '@angular/core';
import { HelpSupportViewModel } from '../models/help-support-view.model';

@Injectable({ providedIn: 'root' })
export class HelpSupportMapper {
  toViewModel(dto: any): HelpSupportViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
