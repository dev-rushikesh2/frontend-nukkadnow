import { Injectable, inject } from '@angular/core';
import { BatchesApi } from './batches.api';
import { BatchesMapper } from './batches.mapper';
import { Observable, of, map } from 'rxjs';
import { BatchesViewModel } from '../models/batches-view.model';

@Injectable({ providedIn: 'root' })
export class BatchesRepository {
  private api = inject(BatchesApi);
  private mapper = inject(BatchesMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
