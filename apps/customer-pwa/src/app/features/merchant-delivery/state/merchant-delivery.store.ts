import { Injectable, signal, inject } from '@angular/core';
import { MerchantDeliveryRepository } from '../data-access/merchant-delivery.repository';
import { MerchantDeliveryViewModel } from '../models/merchant-delivery-view.model';

@Injectable()
export class MerchantDeliveryStore {
  private repo = inject(MerchantDeliveryRepository);

  readonly items = signal<MerchantDeliveryViewModel[]>([]);
  readonly loading = signal<boolean>(false);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.repo.getList().subscribe({
      next: (data) => {
        this.items.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }
}
