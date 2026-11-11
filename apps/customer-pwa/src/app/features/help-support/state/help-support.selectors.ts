import { computed } from '@angular/core';
import { HelpSupportStore } from './help-support.store';

export function createHelpSupportSelectors(store: HelpSupportStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
