import { Injectable, inject } from '@angular/core';
import { NotificationsApi } from './notifications.api';
import { NotificationsMapper } from './notifications.mapper';
import { Observable, of, map } from 'rxjs';
import { NotificationsViewModel } from '../models/notifications-view.model';

@Injectable({ providedIn: 'root' })
export class NotificationsRepository {
  private api = inject(NotificationsApi);
  private mapper = inject(NotificationsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
