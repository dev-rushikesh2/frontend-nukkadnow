import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthFacade } from '../state/auth.facade';
import { ButtonComponent, ErrorBannerComponent } from '@nukkadnow/ui';
import { OtpInputComponent } from '../components/otp-input.component';

@Component({
  selector: 'merchant-verify-otp-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ErrorBannerComponent, OtpInputComponent],
  templateUrl: './verify-otp.page.html',
  styleUrls: ['./verify-otp.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyOtpPageComponent {
  authFacade = inject(AuthFacade);
  router = inject(Router);
  enteredOtp = signal<string>('');

  onOtpComplete(code: string) {
    this.enteredOtp.set(code);
    this.authFacade.verifyOtp(code);
  }

  onManualSubmit() {
    if (this.enteredOtp().length === 6) {
      this.authFacade.verifyOtp(this.enteredOtp());
    }
  }

  changePhone() {
    this.router.navigate(['/auth/login']);
  }
}
