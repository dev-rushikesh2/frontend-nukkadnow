import { Injectable, inject } from '@angular/core';
import { SellerModesApi } from './seller-modes.api';
import { SellerModesMapper } from './seller-modes.mapper';
import { Observable, of, map } from 'rxjs';
import { SellerModesViewModel } from '../models/seller-modes-view.model';

@Injectable({ providedIn: 'root' })
export class SellerModesRepository {
  private api = inject(SellerModesApi);
  private mapper = inject(SellerModesMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
