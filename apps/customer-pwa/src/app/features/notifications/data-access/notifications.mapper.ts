import { Injectable } from '@angular/core';
import { NotificationsViewModel } from '../models/notifications-view.model';

@Injectable({ providedIn: 'root' })
export class NotificationsMapper {
  toViewModel(dto: any): NotificationsViewModel {
    return {
      id: dto.id,
      title: dto.title,
      subtitle: dto.subtitle ?? ''
    };
  }
}
