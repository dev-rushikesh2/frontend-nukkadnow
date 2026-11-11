import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-toggle',
  standalone: true,
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="checked()"
      [disabled]="disabled()"
      [class.checked]="checked()"
      [class.disabled]="disabled()"
      (click)="toggle()"
      class="ui-toggle">
      <span class="ui-toggle-thumb"></span>
    </button>
  `,
  styles: [`
    .ui-toggle {
      position: relative;
      width: 48px;
      height: 28px;
      border-radius: 9999px;
      background: #cbd5e1;
      border: none;
      cursor: pointer;
      padding: 2px;
      transition: background 200ms ease;
      outline: none;
      display: inline-flex;
      align-items: center;
    }
    .ui-toggle:focus-visible {
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.35);
    }
    .ui-toggle-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
      transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
      transform: translateX(0);
    }
    .ui-toggle.checked {
      background: #10b981;
    }
    .ui-toggle.checked .ui-toggle-thumb {
      transform: translateX(20px);
    }
    .ui-toggle.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleComponent {
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  toggled = output<boolean>();

  toggle() {
    if (!this.disabled()) {
      this.toggled.emit(!this.checked());
    }
  }
}
