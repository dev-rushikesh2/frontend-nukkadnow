import { Injectable, inject } from '@angular/core';
import { AuthStateService } from '@nukkadnow/auth-client';

@Injectable({ providedIn: 'root' })
export class MerchantAuthFacade {
  private authState = inject(AuthStateService);
  readonly user = this.authState.user;
  readonly isAuthenticated = this.authState.isAuthenticated;
}
