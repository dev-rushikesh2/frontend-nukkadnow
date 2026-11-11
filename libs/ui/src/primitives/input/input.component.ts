import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-input-group" [class.ui-input-group--error]="!!error()" [class.ui-input-group--disabled]="disabled()">
      @if (label()) {
        <label [for]="id()" class="ui-input-label">
          {{ label() }}
          @if (required()) {
            <span class="required-star" aria-hidden="true">*</span>
          }
        </label>
      }
      <div class="ui-input-field-wrapper">
        @if (prefix()) {
          <span class="ui-input-prefix">{{ prefix() }}</span>
        }
        <input
          [id]="id()"
          [type]="type()"
          [placeholder]="placeholder()"
          [disabled]="disabled()"
          [value]="value()"
          [attr.maxlength]="maxLength() ? maxLength() : null"
          [attr.aria-invalid]="!!error()"
          [attr.aria-describedby]="error() ? id() + '-error' : (hint() ? id() + '-hint' : null)"
          (input)="onInput($event)"
          (focus)="focused.emit()"
          (blur)="blurred.emit()"
          class="ui-input-control" />
        @if (suffix()) {
          <span class="ui-input-suffix">{{ suffix() }}</span>
        }
      </div>
      @if (error()) {
        <p [id]="id() + '-error'" class="ui-input-error-msg" role="alert">
          {{ error() }}
        </p>
      } @else if (hint()) {
        <p [id]="id() + '-hint'" class="ui-input-hint-msg">
          {{ hint() }}
        </p>
      }
    </div>
  `,
  styles: [`
    .ui-input-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;
      font-family: inherit;
    }
    .ui-input-label {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
      margin-bottom: 6px;
    }
    .required-star {
      color: #ef4444;
      margin-left: 2px;
    }
    .ui-input-field-wrapper {
      display: flex;
      align-items: center;
      background: #ffffff;
      border: 1.5px solid #cbd5e1;
      border-radius: 8px;
      transition: all 150ms ease;
      overflow: hidden;
      min-height: 48px; /* 48px touch target */
    }
    .ui-input-field-wrapper:focus-within {
      border-color: #f97316;
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.15);
    }
    .ui-input-prefix, .ui-input-suffix {
      padding: 0 12px;
      color: #64748b;
      font-size: 14px;
      font-weight: 500;
      background: #f8fafc;
      display: flex;
      align-items: center;
      height: 100%;
      user-select: none;
    }
    .ui-input-control {
      flex: 1;
      border: none;
      outline: none;
      padding: 10px 14px;
      font-size: 15px;
      color: #0f172a;
      background: transparent;
      width: 100%;
    }
    .ui-input-control::placeholder {
      color: #94a3b8;
    }
    .ui-input-group--error .ui-input-field-wrapper {
      border-color: #ef4444;
    }
    .ui-input-group--error .ui-input-field-wrapper:focus-within {
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }
    .ui-input-error-msg {
      font-size: 12px;
      color: #ef4444;
      margin: 4px 0 0 0;
      font-weight: 500;
    }
    .ui-input-hint-msg {
      font-size: 12px;
      color: #64748b;
      margin: 4px 0 0 0;
    }
    .ui-input-group--disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  id = input<string>('inp-' + Math.random().toString(36).substring(2, 9));
  label = input<string>('');
  type = input<string>('text');
  placeholder = input<string>('');
  value = input<string>('');
  prefix = input<string>('');
  suffix = input<string>('');
  hint = input<string>('');
  error = input<string | null>(null);
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  maxLength = input<number | string | null>(null);

  valueChanged = output<string>();
  focused = output<void>();
  blurred = output<void>();

  onInput(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.valueChanged.emit(val);
  }
}
