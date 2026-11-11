import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-tracking-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="order-tracking-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTrackingDetailsPageComponent {
  id = input.required<string>();
}
