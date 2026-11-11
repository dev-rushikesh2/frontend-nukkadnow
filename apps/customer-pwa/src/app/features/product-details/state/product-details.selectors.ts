import { computed } from '@angular/core';
import { ProductDetailsStore } from './product-details.store';

export function createProductDetailsSelectors(store: ProductDetailsStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
