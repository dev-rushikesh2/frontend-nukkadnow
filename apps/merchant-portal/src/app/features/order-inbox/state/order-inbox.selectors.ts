import { computed } from '@angular/core';
import { OrderInboxStore } from './order-inbox.store';

export function createOrderInboxSelectors(store: OrderInboxStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
