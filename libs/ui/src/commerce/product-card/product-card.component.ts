import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProductItem {
  id: string;
  title: string;
  pricePaise: number;
  imageUrl?: string;
  isVegetarian?: boolean;
  inStock: boolean;
}

@Component({
  selector: 'ui-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ui-product-card" [class.out-of-stock]="!item().inStock">
      @if (item().imageUrl) {
        <img [src]="item().imageUrl" [alt]="item().title" class="product-thumb" />
      }
      <div class="product-details">
        <h4>{{ item().title }}</h4>
        <div class="price">â‚¹{{ (item().pricePaise / 100) | number:'1.2-2' }}</div>
      </div>
      <div class="actions">
        <button type="button" [disabled]="!item().inStock" (click)="addClicked.emit(item())">
          {{ item().inStock ? 'Add' : 'Unavailable' }}
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  item = input.required<ProductItem>();
  addClicked = output<ProductItem>();
}
