import { computed } from '@angular/core';
import { FavouritesStore } from './favourites.store';

export function createFavouritesSelectors(store: FavouritesStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
