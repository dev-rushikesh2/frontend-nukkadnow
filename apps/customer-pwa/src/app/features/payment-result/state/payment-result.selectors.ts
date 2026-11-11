import { computed } from '@angular/core';
import { PaymentResultStore } from './payment-result.store';

export function createPaymentResultSelectors(store: PaymentResultStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
