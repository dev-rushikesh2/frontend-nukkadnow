import { computed } from '@angular/core';
import { InventoryStore } from './inventory.store';

export function createInventorySelectors(store: InventoryStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
