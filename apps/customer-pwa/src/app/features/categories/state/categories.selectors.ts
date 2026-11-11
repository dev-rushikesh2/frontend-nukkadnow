import { computed } from '@angular/core';
import { CategoriesStore } from './categories.store';

export function createCategoriesSelectors(store: CategoriesStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
