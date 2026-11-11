import { computed } from '@angular/core';
import { AnalyticsStore } from './analytics.store';

export function createAnalyticsSelectors(store: AnalyticsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
