import { Injectable, inject, signal } from '@angular/core';
import { AuthStateService, TokenStorageService } from '@nukkadnow/auth-client';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private authState = inject(AuthStateService);
  private tokenStorage = inject(TokenStorageService);
  private router = inject(Router);

  readonly user = this.authState.user;
  readonly isAuthenticated = this.authState.isAuthenticated;

  logout() {
    this.authState.logout();
    this.router.navigate(['/auth']);
  }
}
