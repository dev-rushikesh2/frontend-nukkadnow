import { computed } from '@angular/core';
import { BusinessProfileStore } from './business-profile.store';

export function createBusinessProfileSelectors(store: BusinessProfileStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
