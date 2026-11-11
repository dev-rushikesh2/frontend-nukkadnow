import { computed } from '@angular/core';
import { SettingsStore } from './settings.store';

export function createSettingsSelectors(store: SettingsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
