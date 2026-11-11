import { computed } from '@angular/core';
import { CatalogueStore } from './catalogue.store';

export function createCatalogueSelectors(store: CatalogueStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
