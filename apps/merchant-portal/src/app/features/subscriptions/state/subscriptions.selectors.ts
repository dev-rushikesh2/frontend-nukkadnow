import { computed } from '@angular/core';
import { SubscriptionsStore } from './subscriptions.store';

export function createSubscriptionsSelectors(store: SubscriptionsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
