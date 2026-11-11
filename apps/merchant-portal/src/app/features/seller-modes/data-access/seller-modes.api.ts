import { Injectable, inject } from '@angular/core';
import { HttpClientAdapter } from '@nukkadnow/api-client';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SellerModesApi {
  private http = inject(HttpClientAdapter);

  fetchList(): Observable<any[]> {
    return of([{ id: 'm-1', title: 'SellerModes Active Record', subtitle: 'Configured & Active' }]);
  }
}
