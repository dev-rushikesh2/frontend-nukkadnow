import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthFacade } from '../state/auth.facade';
import { ButtonComponent, InputComponent, ErrorBannerComponent } from '@nukkadnow/ui';
import { isValidIndianPhone } from '@nukkadnow/utilities';

@Component({
  selector: 'merchant-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ErrorBannerComponent],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  authFacade = inject(AuthFacade);
  phone = signal<string>('');
  validationError = signal<string | null>(null);

  onPhoneChange(val: string) {
    this.phone.set(val);
    if (this.validationError()) {
      this.validationError.set(null);
    }
  }

  onSubmit() {
    const raw = this.phone().trim();
    if (!raw) {
      this.validationError.set('Please enter your 10-digit mobile number');
      return;
    }
    if (!isValidIndianPhone(raw)) {
      this.validationError.set('Please enter a valid 10-digit Indian phone number starting with 6, 7, 8, or 9');
      return;
    }

    this.authFacade.sendOtp(raw);
  }
}
