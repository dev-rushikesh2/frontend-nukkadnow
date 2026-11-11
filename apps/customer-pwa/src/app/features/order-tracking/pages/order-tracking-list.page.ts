import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTrackingStore } from '../state/order-tracking.store';
import { OrderTrackingCardComponent } from '../components/order-tracking-card.component';

@Component({
  selector: 'app-order-tracking-list-page',
  standalone: true,
  imports: [CommonModule, OrderTrackingCardComponent],
  templateUrl: './order-tracking-list.page.html',
  styleUrls: ['./order-tracking-list.page.scss'],
  providers: [OrderTrackingStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTrackingListPageComponent {
  store = inject(OrderTrackingStore);
}
