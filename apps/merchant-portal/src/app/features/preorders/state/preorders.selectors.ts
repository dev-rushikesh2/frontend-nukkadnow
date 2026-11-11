import { computed } from '@angular/core';
import { PreordersStore } from './preorders.store';

export function createPreordersSelectors(store: PreordersStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
