import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="notifications-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsDetailsPageComponent {
  id = input.required<string>();
}
