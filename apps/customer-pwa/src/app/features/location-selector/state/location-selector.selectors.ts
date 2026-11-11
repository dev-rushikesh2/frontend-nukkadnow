import { computed } from '@angular/core';
import { LocationSelectorStore } from './location-selector.store';

export function createLocationSelectorSelectors(store: LocationSelectorStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
