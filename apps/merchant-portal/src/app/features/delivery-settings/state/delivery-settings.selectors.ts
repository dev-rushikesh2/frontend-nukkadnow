import { computed } from '@angular/core';
import { DeliverySettingsStore } from './delivery-settings.store';

export function createDeliverySettingsSelectors(store: DeliverySettingsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
