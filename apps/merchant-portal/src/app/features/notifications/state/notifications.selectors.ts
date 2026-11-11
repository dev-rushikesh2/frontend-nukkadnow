import { computed } from '@angular/core';
import { NotificationsStore } from './notifications.store';

export function createNotificationsSelectors(store: NotificationsStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
