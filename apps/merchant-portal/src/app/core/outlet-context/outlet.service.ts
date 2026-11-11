import { Injectable, inject } from '@angular/core';
import { HttpClientAdapter } from '@nukkadnow/api-client';

@Injectable({ providedIn: 'root' })
export class OutletService {
  private http = inject(HttpClientAdapter);
}
