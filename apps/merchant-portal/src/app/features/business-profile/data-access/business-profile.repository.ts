import { Injectable, inject } from '@angular/core';
import { BusinessProfileApi } from './business-profile.api';
import { BusinessProfileMapper } from './business-profile.mapper';
import { Observable, of, map } from 'rxjs';
import { BusinessProfileViewModel } from '../models/business-profile-view.model';

@Injectable({ providedIn: 'root' })
export class BusinessProfileRepository {
  private api = inject(BusinessProfileApi);
  private mapper = inject(BusinessProfileMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
