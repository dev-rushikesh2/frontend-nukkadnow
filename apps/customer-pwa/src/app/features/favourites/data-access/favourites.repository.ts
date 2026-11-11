import { Injectable, inject } from '@angular/core';
import { FavouritesApi } from './favourites.api';
import { FavouritesMapper } from './favourites.mapper';
import { Observable, map } from 'rxjs';
import { FavouritesViewModel } from '../models/favourites-view.model';

@Injectable({ providedIn: 'root' })
export class FavouritesRepository {
  private api = inject(FavouritesApi);
  private mapper = inject(FavouritesMapper);

  getList(): Observable<FavouritesViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
