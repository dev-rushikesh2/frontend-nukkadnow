import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'ui-price-display',
  standalone: true,
  imports: [DecimalPipe],
  template: `
    <span class="ui-price">
      <span class="currency">â‚¹</span>
      <span class="amount">{{ (amountPaise() / 100) | number:'1.2-2' }}</span>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PriceDisplayComponent {
  amountPaise = input.required<number>();
}
