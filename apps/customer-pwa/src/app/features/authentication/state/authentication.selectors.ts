import { computed } from '@angular/core';
import { AuthenticationStore } from './authentication.store';

export function createAuthenticationSelectors(store: AuthenticationStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
