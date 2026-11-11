import { Injectable, inject } from '@angular/core';
import { MerchantProfileApi } from './merchant-profile.api';
import { MerchantProfileMapper } from './merchant-profile.mapper';
import { Observable, map } from 'rxjs';
import { MerchantProfileViewModel } from '../models/merchant-profile-view.model';

@Injectable({ providedIn: 'root' })
export class MerchantProfileRepository {
  private api = inject(MerchantProfileApi);
  private mapper = inject(MerchantProfileMapper);

  getList(): Observable<MerchantProfileViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
