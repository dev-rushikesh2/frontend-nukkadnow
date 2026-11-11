import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-button, nukkad-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [attr.aria-disabled]="disabled || loading"
      [attr.aria-busy]="loading"
      [class]="'ui-btn ui-btn--' + variant + ' ui-btn--' + size"
      [class.ui-btn--full]="fullWidth"
      [class.ui-btn--loading]="loading"
      (click)="onClick($event)">
      @if (loading) {
        <span class="ui-spinner" aria-hidden="true"></span>
      }
      <span class="ui-btn-content" [class.invisible]="loading">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    :host([fullWidth="true"]) {
      display: block;
      width: 100%;
    }
    .ui-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: inherit;
      font-weight: 600;
      border: 1px solid transparent;
      border-radius: 8px;
      cursor: pointer;
      user-select: none;
      transition: all 150ms ease-in-out;
      outline: none;
      text-decoration: none;
      position: relative;
      touch-action: manipulation;
    }
    .ui-btn:focus-visible {
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.35);
    }
    /* Sizes */
    .ui-btn--sm {
      padding: 6px 12px;
      font-size: 13px;
      min-height: 36px;
    }
    .ui-btn--md {
      padding: 10px 18px;
      font-size: 15px;
      min-height: 48px; /* 48px touch target */
    }
    .ui-btn--lg {
      padding: 14px 24px;
      font-size: 17px;
      min-height: 54px;
    }
    .ui-btn--full {
      width: 100%;
    }
    /* Variants */
    .ui-btn--primary {
      background-color: #f97316;
      color: #ffffff;
      border-color: #f97316;
    }
    .ui-btn--primary:hover:not(:disabled) {
      background-color: #ea580c;
      border-color: #ea580c;
    }
    .ui-btn--primary:active:not(:disabled) {
      background-color: #c2410c;
    }
    .ui-btn--secondary {
      background-color: #0f172a;
      color: #ffffff;
      border-color: #0f172a;
    }
    .ui-btn--secondary:hover:not(:disabled) {
      background-color: #1e293b;
      border-color: #1e293b;
    }
    .ui-btn--secondary:active:not(:disabled) {
      background-color: #334155;
    }
    .ui-btn--outline {
      background-color: #ffffff;
      color: #0f172a;
      border-color: #cbd5e1;
    }
    .ui-btn--outline:hover:not(:disabled) {
      background-color: #f8fafc;
      border-color: #94a3b8;
    }
    .ui-btn--ghost {
      background-color: transparent;
      color: #0f172a;
    }
    .ui-btn--ghost:hover:not(:disabled) {
      background-color: #f1f5f9;
    }
    .ui-btn--danger {
      background-color: #ef4444;
      color: #ffffff;
      border-color: #ef4444;
    }
    .ui-btn--danger:hover:not(:disabled) {
      background-color: #dc2626;
      border-color: #dc2626;
    }
    /* Disabled */
    .ui-btn:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
    /* Spinner */
    .ui-spinner {
      position: absolute;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: #ffffff;
      border-radius: 50%;
      animation: spin 0.7s linear infinite;
    }
    .ui-btn--outline .ui-spinner,
    .ui-btn--ghost .ui-spinner {
      border: 2px solid rgba(15, 23, 42, 0.2);
      border-top-color: #0f172a;
    }
    .invisible {
      visibility: hidden;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() fullWidth: boolean = false;
  
  @Output() clicked = new EventEmitter<MouseEvent>();
  @Output() buttonClick = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
      this.buttonClick.emit(event);
    }
  }
}
