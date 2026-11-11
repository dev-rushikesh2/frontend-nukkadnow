import { computed } from '@angular/core';
import { MerchantProfileStore } from './merchant-profile.store';

export function createMerchantProfileSelectors(store: MerchantProfileStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
