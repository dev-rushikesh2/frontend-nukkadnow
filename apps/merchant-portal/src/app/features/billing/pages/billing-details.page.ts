import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'merchant-billing-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="details-panel">
      <h3>Billing Detail #{{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingDetailsPageComponent {
  id = input.required<string>();
}
