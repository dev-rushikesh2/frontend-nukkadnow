import { computed } from '@angular/core';
import { VariantsStore } from './variants.store';

export function createVariantsSelectors(store: VariantsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
