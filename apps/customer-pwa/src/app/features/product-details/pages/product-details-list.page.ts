import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsStore } from '../state/product-details.store';
import { ProductDetailsCardComponent } from '../components/product-details-card.component';

@Component({
  selector: 'app-product-details-list-page',
  standalone: true,
  imports: [CommonModule, ProductDetailsCardComponent],
  templateUrl: './product-details-list.page.html',
  styleUrls: ['./product-details-list.page.scss'],
  providers: [ProductDetailsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsListPageComponent {
  store = inject(ProductDetailsStore);
}
