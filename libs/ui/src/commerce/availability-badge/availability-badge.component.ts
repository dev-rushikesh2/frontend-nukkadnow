import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ui-availability-badge',
  standalone: true,
  template: `
    <span [class]="'badge ' + (isOpen() ? 'open' : 'closed')">
      {{ isOpen() ? 'Open Now' : 'Closed' }}
    </span>
  `,
  styles: [`
    .badge { padding: 2px 8px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .open { background: #dcfce7; color: #166534; }
    .closed { background: #fee2e2; color: #991b1b; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvailabilityBadgeComponent {
  isOpen = input.required<boolean>();
}
