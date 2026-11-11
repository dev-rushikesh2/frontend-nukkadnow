import { computed } from '@angular/core';
import { PickupTokenStore } from './pickup-token.store';

export function createPickupTokenSelectors(store: PickupTokenStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
