import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-result-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="payment-result-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentResultDetailsPageComponent {
  id = input.required<string>();
}
