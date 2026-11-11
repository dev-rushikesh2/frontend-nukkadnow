import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantDeliveryStore } from '../state/merchant-delivery.store';
import { MerchantDeliveryCardComponent } from '../components/merchant-delivery-card.component';

@Component({
  selector: 'app-merchant-delivery-list-page',
  standalone: true,
  imports: [CommonModule, MerchantDeliveryCardComponent],
  templateUrl: './merchant-delivery-list.page.html',
  styleUrls: ['./merchant-delivery-list.page.scss'],
  providers: [MerchantDeliveryStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantDeliveryListPageComponent {
  store = inject(MerchantDeliveryStore);
}
