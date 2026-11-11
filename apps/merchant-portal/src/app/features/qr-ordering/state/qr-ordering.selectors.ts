import { computed } from '@angular/core';
import { QrOrderingStore } from './qr-ordering.store';

export function createQrOrderingSelectors(store: QrOrderingStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
