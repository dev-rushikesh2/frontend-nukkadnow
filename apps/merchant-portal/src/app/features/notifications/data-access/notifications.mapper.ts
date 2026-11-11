import { Injectable } from '@angular/core';
import { NotificationsViewModel } from '../models/notifications-view.model';

@Injectable({ providedIn: 'root' })
export class NotificationsMapper {
  toViewModel(dto: any): NotificationsViewModel {
    return { ...dto } as any;
  }
}
