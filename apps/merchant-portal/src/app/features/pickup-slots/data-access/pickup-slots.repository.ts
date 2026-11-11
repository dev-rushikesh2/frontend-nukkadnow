import { Injectable, inject } from '@angular/core';
import { PickupSlotsApi } from './pickup-slots.api';
import { PickupSlotsMapper } from './pickup-slots.mapper';
import { Observable, of, map } from 'rxjs';
import { PickupSlotsViewModel } from '../models/pickup-slots-view.model';

@Injectable({ providedIn: 'root' })
export class PickupSlotsRepository {
  private api = inject(PickupSlotsApi);
  private mapper = inject(PickupSlotsMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
