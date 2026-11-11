import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="product-details-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsDetailsPageComponent {
  id = input.required<string>();
}
