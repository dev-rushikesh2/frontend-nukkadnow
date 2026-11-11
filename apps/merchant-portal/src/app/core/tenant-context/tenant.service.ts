import { Injectable, inject } from '@angular/core';
import { HttpClientAdapter } from '@nukkadnow/api-client';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private http = inject(HttpClientAdapter);
}
