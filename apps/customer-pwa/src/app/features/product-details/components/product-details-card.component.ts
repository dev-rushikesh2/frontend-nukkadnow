import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-product-details-card',
  standalone: true,
  template: `
<div class="card">
      <h4>{{ item().title }}</h4>
      <p>{{ item().subtitle }}</p>
    </div>
  `,
  styles: [`
.card {
      background: #ffffff;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsCardComponent {
  item = input<any>();
}
