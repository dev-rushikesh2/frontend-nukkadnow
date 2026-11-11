import { Injectable, inject } from '@angular/core';
import { HttpClientAdapter } from '@nukkadnow/api-client';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationsApi {
  private http = inject(HttpClientAdapter);

  fetchList(): Observable<any[]> {
    return of([{ id: '1', title: 'Notifications Sample 1', subtitle: 'Locality preview' }]);
  }
}
