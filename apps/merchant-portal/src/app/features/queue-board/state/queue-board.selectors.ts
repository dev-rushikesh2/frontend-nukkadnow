import { computed } from '@angular/core';
import { QueueBoardStore } from './queue-board.store';

export function createQueueBoardSelectors(store: QueueBoardStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
