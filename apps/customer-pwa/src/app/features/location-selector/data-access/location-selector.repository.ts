import { Injectable, inject } from '@angular/core';
import { LocationSelectorApi } from './location-selector.api';
import { LocationSelectorMapper } from './location-selector.mapper';
import { Observable, map } from 'rxjs';
import { LocationSelectorViewModel } from '../models/location-selector-view.model';

@Injectable({ providedIn: 'root' })
export class LocationSelectorRepository {
  private api = inject(LocationSelectorApi);
  private mapper = inject(LocationSelectorMapper);

  getList(): Observable<LocationSelectorViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
