import { computed } from '@angular/core';
import { CapacitySettingsStore } from './capacity-settings.store';

export function createCapacitySettingsSelectors(store: CapacitySettingsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
