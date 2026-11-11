import { computed } from '@angular/core';
import { SellerModesStore } from './seller-modes.store';

export function createSellerModesSelectors(store: SellerModesStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
