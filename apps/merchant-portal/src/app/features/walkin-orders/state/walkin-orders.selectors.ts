import { computed } from '@angular/core';
import { WalkinOrdersStore } from './walkin-orders.store';

export function createWalkinOrdersSelectors(store: WalkinOrdersStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
