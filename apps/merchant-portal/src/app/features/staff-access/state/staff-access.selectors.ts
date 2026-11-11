import { computed } from '@angular/core';
import { StaffAccessStore } from './staff-access.store';

export function createStaffAccessSelectors(store: StaffAccessStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
