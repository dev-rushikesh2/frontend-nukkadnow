import { Component, inject, signal, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthFacade } from '../state/auth.facade';

@Component({
  selector: 'merchant-verify-otp-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyOtpPageComponent implements OnInit, OnDestroy {
  authFacade = inject(AuthFacade);
  router = inject(Router);
  route = inject(ActivatedRoute);

  phone = signal<string>('+91 98765 43210');
  digits = signal<string[]>(['5', '2', '8', '7', '4', '6']);
  countdown = signal<number>(28);
  private timer: any;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['phone']) {
        this.phone.set(params['phone']);
      }
    });

    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startCountdown() {
    this.countdown.set(28);
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.countdown() > 0) {
        this.countdown.update(c => c - 1);
      } else {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onDigitInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value;
    const current = [...this.digits()];

    if (val && val.length > 0) {
      current[index] = val.slice(-1);
      this.digits.set(current);
      // Auto focus next input
      if (index < 5) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`) as HTMLInputElement;
        if (nextInput) nextInput.focus();
      }
    } else {
      current[index] = '';
      this.digits.set(current);
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.digits()[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  }

  resendOtp() {
    if (this.countdown() === 0) {
      this.startCountdown();
    }
  }

  changePhone() {
    this.router.navigate(['/auth/login']);
  }

  verifyAndContinue() {
    // Navigate into onboarding or dashboard
    this.router.navigate(['/onboarding']);
  }
}
