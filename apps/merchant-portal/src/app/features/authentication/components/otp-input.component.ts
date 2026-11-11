import { Component, output, ChangeDetectionStrategy, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'merchant-otp-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="otp-boxes-wrapper" (paste)="onPaste($event)">
      @for (digit of digits; track $index) {
        <input
          #otpInput
          type="tel"
          inputmode="numeric"
          maxlength="1"
          [value]="digits[$index]"
          (input)="onInput($event, $index)"
          (keydown)="onKeyDown($event, $index)"
          class="otp-box"
          autocomplete="one-time-code" />
      }
    </div>
  `,
  styles: [`
    .otp-boxes-wrapper {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      margin: 20px 0;
    }
    .otp-box {
      width: 48px;
      height: 56px;
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      color: #0f172a;
      background: #ffffff;
      border: 2px solid #cbd5e1;
      border-radius: 8px;
      outline: none;
      transition: all 150ms ease;
    }
    .otp-box:focus {
      border-color: #f97316;
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
    }
    @media (max-width: 400px) {
      .otp-box {
        width: 42px;
        height: 50px;
        font-size: 20px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OtpInputComponent {
  @ViewChildren('otpInput') inputElements!: QueryList<ElementRef<HTMLInputElement>>;
  digits: string[] = ['', '', '', '', '', ''];
  otpComplete = output<string>();

  onInput(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    const val = input.value.replace(/\D/g, '');
    this.digits[index] = val ? val[0] : '';
    input.value = this.digits[index];

    if (val && index < 5) {
      const nextInput = this.inputElements.get(index + 1);
      nextInput?.nativeElement.focus();
    }
    this.checkComplete();
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.digits[index] && index > 0) {
      const prevInput = this.inputElements.get(index - 1);
      prevInput?.nativeElement.focus();
    }
  }

  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pasted = event.clipboardData?.getData('text').replace(/\D/g, '').slice(0, 6) || '';
    if (pasted.length > 0) {
      for (let i = 0; i < 6; i++) {
        this.digits[i] = pasted[i] || '';
      }
      this.checkComplete();
    }
  }

  private checkComplete() {
    const code = this.digits.join('');
    if (code.length === 6) {
      this.otpComplete.emit(code);
    }
  }
}
