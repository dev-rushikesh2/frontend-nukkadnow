import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthFacade } from '../state/auth.facade';
import { isValidIndianPhone } from '@nukkadnow/utilities';

@Component({
  selector: 'merchant-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  authFacade = inject(AuthFacade);
  router = inject(Router);

  // View Mode: 'splash' | 'login'
  readonly viewMode = signal<'splash' | 'login'>('login');

  // Form inputs
  phone = '+91 98765 43210';
  password = '';
  rememberMe = true;
  showPassword = signal<boolean>(false);
  validationError = signal<string | null>(null);

  // Carousel indicator for splash
  readonly activeSlide = signal<number>(0);

  togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  showLogin() {
    this.viewMode.set('login');
  }

  showSplash() {
    this.viewMode.set('splash');
  }

  onSubmit() {
    const raw = this.phone.replace('+91', '').trim();
    if (!raw) {
      this.validationError.set('Please enter your registered mobile number');
      return;
    }

    // Direct routing to dashboard or verify-otp
    this.router.navigate(['/auth/verify-otp'], { queryParams: { phone: this.phone } });
  }

  loginWithWhatsApp() {
    this.router.navigate(['/auth/verify-otp'], { queryParams: { phone: this.phone, channel: 'whatsapp' } });
  }
}
