import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service';

@Component({
  selector: 'ui-toast-container',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container" aria-live="polite">
      @for (toast of toastService.messages(); track toast.id) {
        <div [class]="'toast-item toast-item--' + toast.type">
          <span class="toast-icon">
            @switch (toast.type) {
              @case ('success') { âœ“ }
              @case ('error') { âœ• }
              @case ('warning') { âš  }
              @default { â„¹ }
            }
          </span>
          <span class="toast-text">{{ toast.text }}</span>
          <button type="button" class="toast-close" (click)="toastService.dismiss(toast.id)">âœ•</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      z-index: 1050;
      max-width: 400px;
      width: calc(100vw - 48px);
      pointer-events: none;
    }
    .toast-item {
      pointer-events: auto;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      font-size: 14px;
      font-weight: 500;
      animation: slideUp 200ms ease-out;
      background: #ffffff;
      color: #0f172a;
      border-left: 4px solid #cbd5e1;
    }
    .toast-item--success { border-left-color: #10b981; }
    .toast-item--error { border-left-color: #ef4444; }
    .toast-item--warning { border-left-color: #f59e0b; }
    .toast-item--info { border-left-color: #0284c7; }
    .toast-icon { margin-right: 10px; font-weight: 700; }
    .toast-text { flex: 1; }
    .toast-close {
      background: none;
      border: none;
      cursor: pointer;
      color: #94a3b8;
      padding: 4px;
      font-size: 12px;
    }
    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastContainerComponent {
  toastService = inject(ToastService);
}
