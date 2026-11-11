import { Injectable, inject } from '@angular/core';
import { TokenStorageService } from '@nukkadnow/auth-client';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private tokenStorage = inject(TokenStorageService);

  get isActive(): boolean {
    return !!this.tokenStorage.getAccessToken();
  }
}
