import { Injectable, inject } from '@angular/core';
import { StaffAccessApi } from './staff-access.api';
import { StaffAccessMapper } from './staff-access.mapper';
import { Observable, of, map } from 'rxjs';
import { StaffAccessViewModel } from '../models/staff-access-view.model';

@Injectable({ providedIn: 'root' })
export class StaffAccessRepository {
  private api = inject(StaffAccessApi);
  private mapper = inject(StaffAccessMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
