import { computed } from '@angular/core';
import { HomeStore } from './home.store';

export function createHomeSelectors(store: HomeStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
