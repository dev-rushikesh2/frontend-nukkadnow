import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-badge',
  standalone: true,
  template: `<span [class]="'ui-badge ui-badge--' + tone()"><ng-content></ng-content></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeComponent {
  tone = input<'neutral' | 'success' | 'warning' | 'error' | 'brand'>('neutral');
}
