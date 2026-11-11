import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'merchant-notifications-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="details-panel">
      <h3>Notifications Detail #{{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsDetailsPageComponent {
  id = input.required<string>();
}
