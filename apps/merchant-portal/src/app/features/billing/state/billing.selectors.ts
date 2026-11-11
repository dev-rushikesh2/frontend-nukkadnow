import { computed } from '@angular/core';
import { BillingStore } from './billing.store';

export function createBillingSelectors(store: BillingStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
