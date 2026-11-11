import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthApi } from '../data-access/auth.api';
import { TokenStorageService, AuthStateService } from '@nukkadnow/auth-client';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private api = inject(AuthApi);
  private tokenStorage = inject(TokenStorageService);
  private authState = inject(AuthStateService);
  private router = inject(Router);

  readonly phoneNumber = signal<string>('');
  readonly challengeId = signal<string | null>(null);
  readonly cooldownSeconds = signal<number>(0);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);
  readonly attemptsLeft = signal<number>(3);

  private timerInterval: any = null;

  setPhoneNumber(phone: string) {
    this.phoneNumber.set(phone);
  }

  sendOtp(phoneNumber: string) {
    this.loading.set(true);
    this.error.set(null);
    this.phoneNumber.set(phoneNumber);

    this.api.requestOtp(phoneNumber).subscribe({
      next: (res) => {
        this.challengeId.set(res.challengeId);
        this.startCooldown(res.cooldownSeconds);
        this.loading.set(false);
        this.router.navigate(['/auth/verify-otp']);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.message || 'Failed to send OTP. Please try again.');
      }
    });
  }

  verifyOtp(otp: string) {
    const cid = this.challengeId();
    const phone = this.phoneNumber();
    if (!cid) {
      this.error.set('Session expired. Please request a new OTP.');
      this.router.navigate(['/auth/login']);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.api.verifyOtp(cid, phone, otp).subscribe({
      next: (res) => {
        this.tokenStorage.setAccessToken(res.accessToken);
        this.tokenStorage.setRefreshToken(res.refreshToken);
        this.authState.setUser(res.user as any);
        this.loading.set(false);
        this.clearTimer();
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.loading.set(false);
        this.attemptsLeft.update((a) => Math.max(0, a - 1));
        this.error.set(err.message || 'Invalid OTP. Please check and retry.');
      }
    });
  }

  resendOtp() {
    if (this.cooldownSeconds() > 0) return;
    this.sendOtp(this.phoneNumber());
  }

  private startCooldown(seconds: number) {
    this.clearTimer();
    this.cooldownSeconds.set(seconds);
    this.timerInterval = setInterval(() => {
      this.cooldownSeconds.update((s) => {
        if (s <= 1) {
          this.clearTimer();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }

  private clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
