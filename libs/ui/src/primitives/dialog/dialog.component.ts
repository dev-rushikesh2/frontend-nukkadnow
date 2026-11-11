import { Component, Input, Output, EventEmitter, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dialog, nukkad-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (isOpen) {
      <div class="ui-dialog-backdrop" (click)="onBackdropClick()">
        <div
          class="ui-dialog-panel"
          [style.max-width]="maxWidth"
          (click)="$event.stopPropagation()"
          role="dialog"
          aria-modal="true"
          [attr.aria-labelledby]="title ? 'dialog-title' : null">
          <header class="ui-dialog-header">
            @if (title) {
              <h3 id="dialog-title" class="ui-dialog-title">{{ title }}</h3>
            }
            <button
              type="button"
              class="ui-dialog-close-btn"
              (click)="onClose()"
              aria-label="Close modal">
              ✕
            </button>
          </header>
          <div class="ui-dialog-body">
            <ng-content></ng-content>
          </div>
          <div class="ui-dialog-footer">
            <ng-content select="[slot=footer]"></ng-content>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .ui-dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      z-index: 999;
      animation: fadeIn 150ms ease-out;
    }
    .ui-dialog-panel {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      width: 100%;
      max-height: calc(100vh - 48px);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: scaleUp 150ms ease-out;
    }
    .ui-dialog-header {
      padding: 20px 24px;
      border-bottom: 1px solid #f1f5f9;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ui-dialog-title {
      margin: 0;
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
    }
    .ui-dialog-close-btn {
      background: transparent;
      border: none;
      font-size: 18px;
      color: #64748b;
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 150ms;
    }
    .ui-dialog-close-btn:hover {
      color: #0f172a;
      background: #f1f5f9;
    }
    .ui-dialog-body {
      padding: 24px;
      overflow-y: auto;
      color: #334155;
      font-size: 15px;
      line-height: 1.5;
    }
    .ui-dialog-footer {
      padding: 0 24px 20px;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes scaleUp {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() maxWidth: string = '500px';
  @Input() closeOnBackdrop: boolean = true;
  
  @Output() close = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.isOpen) {
      this.onClose();
    }
  }

  onBackdropClick() {
    if (this.closeOnBackdrop) {
      this.onClose();
    }
  }

  onClose() {
    this.close.emit();
    this.closed.emit();
  }
}
