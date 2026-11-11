import { computed } from '@angular/core';
import { PickupSlotsStore } from './pickup-slots.store';

export function createPickupSlotsSelectors(store: PickupSlotsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
