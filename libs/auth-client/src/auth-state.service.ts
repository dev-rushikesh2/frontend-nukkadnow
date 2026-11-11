import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthUser } from './auth.models';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthStateService {
  private tokenStorage = inject(TokenStorageService);
  private currentUserSignal = signal<AuthUser | null>(null);

  readonly user = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = computed(() => !!this.currentUserSignal());

  setUser(user: AuthUser | null) {
    this.currentUserSignal.set(user);
  }

  logout() {
    this.tokenStorage.clear();
    this.currentUserSignal.set(null);
  }
}
