import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInboxStore } from '../state/order-inbox.store';
import { OrderInboxItem } from '../models/order-inbox-view.model';
import { ButtonComponent, DialogComponent, PriceDisplayComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-order-inbox-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DialogComponent, PriceDisplayComponent],
  templateUrl: './order-inbox-list.page.html',
  styleUrls: ['./order-inbox-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderInboxPageComponent {
  store = inject(OrderInboxStore);

  isAcceptModalOpen = signal<boolean>(false);
  isRejectModalOpen = signal<boolean>(false);
  selectedOrder = signal<OrderInboxItem | null>(null);

  selectedPrepMinutes = signal<number>(20);
  rejectReason = signal<string>('OUT_OF_STOCK');

  openAcceptDialog(order: OrderInboxItem) {
    this.selectedOrder.set(order);
    this.selectedPrepMinutes.set(20);
    this.isAcceptModalOpen.set(true);
  }

  confirmAccept() {
    const o = this.selectedOrder();
    if (o) {
      this.store.acceptOrder(o.id, this.selectedPrepMinutes());
      this.isAcceptModalOpen.set(false);
    }
  }

  openRejectDialog(order: OrderInboxItem) {
    this.selectedOrder.set(order);
    this.rejectReason.set('OUT_OF_STOCK');
    this.isRejectModalOpen.set(true);
  }

  confirmReject() {
    const o = this.selectedOrder();
    if (o) {
      this.store.rejectOrder(o.id, this.rejectReason());
      this.isRejectModalOpen.set(false);
    }
  }
}
