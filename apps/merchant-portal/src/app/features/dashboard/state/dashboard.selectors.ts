import { computed } from '@angular/core';
import { DashboardStore } from './dashboard.store';

export function createDashboardSelectors(store: DashboardStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
