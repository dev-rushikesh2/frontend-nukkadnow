import { computed } from '@angular/core';
import { CheckoutStore } from './checkout.store';

export function createCheckoutSelectors(store: CheckoutStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
