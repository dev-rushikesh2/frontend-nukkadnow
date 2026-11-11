import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="cart-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartDetailsPageComponent {
  id = input.required<string>();
}
