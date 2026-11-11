import { computed } from '@angular/core';
import { OutletsStore } from './outlets.store';

export function createOutletsSelectors(store: OutletsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
