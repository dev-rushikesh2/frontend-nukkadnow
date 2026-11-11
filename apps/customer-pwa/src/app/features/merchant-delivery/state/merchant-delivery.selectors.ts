import { computed } from '@angular/core';
import { MerchantDeliveryStore } from './merchant-delivery.store';

export function createMerchantDeliverySelectors(store: MerchantDeliveryStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
