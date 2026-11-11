import { computed } from '@angular/core';
import { OrderTrackingStore } from './order-tracking.store';

export function createOrderTrackingSelectors(store: OrderTrackingStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
