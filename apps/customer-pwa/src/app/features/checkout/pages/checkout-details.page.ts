import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="checkout-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutDetailsPageComponent {
  id = input.required<string>();
}
