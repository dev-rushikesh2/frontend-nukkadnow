import { computed } from '@angular/core';
import { CartStore } from './cart.store';

export function createCartSelectors(store: CartStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
