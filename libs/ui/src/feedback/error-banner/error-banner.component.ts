import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-error-banner',
  standalone: true,
  template: `
    <div class="ui-error-banner" role="alert">
      <span class="icon">âš ï¸</span>
      <div class="message">{{ message() }}</div>
      @if (retryable()) {
        <button type="button" (click)="retry.emit()">Retry</button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorBannerComponent {
  message = input.required<string>();
  retryable = input<boolean>(false);
  retry = output<void>();
}
