import { Injectable, inject } from '@angular/core';
import { PickupTokenApi } from './pickup-token.api';
import { PickupTokenMapper } from './pickup-token.mapper';
import { Observable, map } from 'rxjs';
import { PickupTokenViewModel } from '../models/pickup-token-view.model';

@Injectable({ providedIn: 'root' })
export class PickupTokenRepository {
  private api = inject(PickupTokenApi);
  private mapper = inject(PickupTokenMapper);

  getList(): Observable<PickupTokenViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
