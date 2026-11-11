import { Injectable, inject } from '@angular/core';
import { MerchantDeliveryApi } from './merchant-delivery.api';
import { MerchantDeliveryMapper } from './merchant-delivery.mapper';
import { Observable, map } from 'rxjs';
import { MerchantDeliveryViewModel } from '../models/merchant-delivery-view.model';

@Injectable({ providedIn: 'root' })
export class MerchantDeliveryRepository {
  private api = inject(MerchantDeliveryApi);
  private mapper = inject(MerchantDeliveryMapper);

  getList(): Observable<MerchantDeliveryViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
