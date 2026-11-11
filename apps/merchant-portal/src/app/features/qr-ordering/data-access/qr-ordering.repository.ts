import { Injectable, inject } from '@angular/core';
import { QrOrderingApi } from './qr-ordering.api';
import { QrOrderingMapper } from './qr-ordering.mapper';
import { Observable, of, map } from 'rxjs';
import { QrOrderingViewModel } from '../models/qr-ordering-view.model';

@Injectable({ providedIn: 'root' })
export class QrOrderingRepository {
  private api = inject(QrOrderingApi);
  private mapper = inject(QrOrderingMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
