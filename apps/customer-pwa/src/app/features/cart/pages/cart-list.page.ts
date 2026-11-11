import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartStore } from '../state/cart.store';
import { CartCardComponent } from '../components/cart-card.component';

@Component({
  selector: 'app-cart-list-page',
  standalone: true,
  imports: [CommonModule, CartCardComponent],
  templateUrl: './cart-list.page.html',
  styleUrls: ['./cart-list.page.scss'],
  providers: [CartStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListPageComponent {
  store = inject(CartStore);
}
