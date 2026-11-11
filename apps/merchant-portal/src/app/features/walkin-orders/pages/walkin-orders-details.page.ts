import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'merchant-walkin-orders-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="details-panel">
      <h3>Walk-in Order Detail #{{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalkinOrdersDetailsPageComponent {
  id = input.required<string>();
}
