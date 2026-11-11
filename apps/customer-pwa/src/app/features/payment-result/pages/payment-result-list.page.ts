import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentResultStore } from '../state/payment-result.store';
import { PaymentResultCardComponent } from '../components/payment-result-card.component';

@Component({
  selector: 'app-payment-result-list-page',
  standalone: true,
  imports: [CommonModule, PaymentResultCardComponent],
  templateUrl: './payment-result-list.page.html',
  styleUrls: ['./payment-result-list.page.scss'],
  providers: [PaymentResultStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentResultListPageComponent {
  store = inject(PaymentResultStore);
}
