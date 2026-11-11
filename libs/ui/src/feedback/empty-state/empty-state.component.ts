import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-empty-state',
  standalone: true,
  template: `
    <div class="ui-empty-state">
      <div class="icon">{{ icon() }}</div>
      <h3>{{ title() }}</h3>
      <p>{{ description() }}</p>
      @if (actionLabel()) {
        <button type="button" (click)="action.emit()">{{ actionLabel() }}</button>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  icon = input<string>('ðŸ“¦');
  title = input.required<string>();
  description = input<string>('');
  actionLabel = input<string>('');
  action = output<void>();
}
