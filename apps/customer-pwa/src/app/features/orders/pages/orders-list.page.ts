import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersStore } from '../state/orders.store';
import { OrdersCardComponent } from '../components/orders-card.component';

@Component({
  selector: 'app-orders-list-page',
  standalone: true,
  imports: [CommonModule, OrdersCardComponent],
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
  providers: [OrdersStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersListPageComponent {
  store = inject(OrdersStore);
}
