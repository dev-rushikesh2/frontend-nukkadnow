import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merchant-delivery-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="merchant-delivery-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantDeliveryDetailsPageComponent {
  id = input.required<string>();
}
