import { computed } from '@angular/core';
import { OrdersStore } from './orders.store';

export function createOrdersSelectors(store: OrdersStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
