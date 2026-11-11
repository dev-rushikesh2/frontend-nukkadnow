import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutStore } from '../state/checkout.store';
import { CheckoutCardComponent } from '../components/checkout-card.component';

@Component({
  selector: 'app-checkout-list-page',
  standalone: true,
  imports: [CommonModule, CheckoutCardComponent],
  templateUrl: './checkout-list.page.html',
  styleUrls: ['./checkout-list.page.scss'],
  providers: [CheckoutStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutListPageComponent {
  store = inject(CheckoutStore);
}
