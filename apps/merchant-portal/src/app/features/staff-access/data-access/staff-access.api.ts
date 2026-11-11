import { Injectable, inject } from '@angular/core';
import { HttpClientAdapter } from '@nukkadnow/api-client';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StaffAccessApi {
  private http = inject(HttpClientAdapter);

  fetchList(): Observable<any[]> {
    return of([{ id: 'm-1', title: 'StaffAccess Active Record', subtitle: 'Configured & Active' }]);
  }
}
