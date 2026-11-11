import { computed } from '@angular/core';
import { DiscoveryStore } from './discovery.store';

export function createDiscoverySelectors(store: DiscoveryStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
