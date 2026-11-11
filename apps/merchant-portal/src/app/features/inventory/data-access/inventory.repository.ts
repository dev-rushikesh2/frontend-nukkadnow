import { Injectable, inject } from '@angular/core';
import { InventoryApi } from './inventory.api';
import { InventoryMapper } from './inventory.mapper';
import { Observable, of, map } from 'rxjs';
import { InventoryViewModel } from '../models/inventory-view.model';

@Injectable({ providedIn: 'root' })
export class InventoryRepository {
  private api = inject(InventoryApi);
  private mapper = inject(InventoryMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
