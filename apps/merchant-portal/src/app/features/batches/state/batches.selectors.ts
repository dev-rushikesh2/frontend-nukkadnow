import { computed } from '@angular/core';
import { BatchesStore } from './batches.store';

export function createBatchesSelectors(store: BatchesStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
