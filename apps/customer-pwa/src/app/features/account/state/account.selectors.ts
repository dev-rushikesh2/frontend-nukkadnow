import { computed } from '@angular/core';
import { AccountStore } from './account.store';

export function createAccountSelectors(store: AccountStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
