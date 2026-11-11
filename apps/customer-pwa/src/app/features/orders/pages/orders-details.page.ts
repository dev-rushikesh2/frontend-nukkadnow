import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="orders-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersDetailsPageComponent {
  id = input.required<string>();
}
