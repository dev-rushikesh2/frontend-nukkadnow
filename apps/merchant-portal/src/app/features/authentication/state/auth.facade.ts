import { Injectable, inject } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private store = inject(AuthStore);

  readonly phoneNumber = this.store.phoneNumber;
  readonly cooldownSeconds = this.store.cooldownSeconds;
  readonly loading = this.store.loading;
  readonly error = this.store.error;
  readonly attemptsLeft = this.store.attemptsLeft;

  sendOtp(phone: string) {
    this.store.sendOtp(phone);
  }

  verifyOtp(otp: string) {
    this.store.verifyOtp(otp);
  }

  resendOtp() {
    this.store.resendOtp();
  }
}
