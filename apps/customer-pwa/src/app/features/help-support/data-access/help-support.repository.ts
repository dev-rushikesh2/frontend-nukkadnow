import { Injectable, inject } from '@angular/core';
import { HelpSupportApi } from './help-support.api';
import { HelpSupportMapper } from './help-support.mapper';
import { Observable, map } from 'rxjs';
import { HelpSupportViewModel } from '../models/help-support-view.model';

@Injectable({ providedIn: 'root' })
export class HelpSupportRepository {
  private api = inject(HelpSupportApi);
  private mapper = inject(HelpSupportMapper);

  getList(): Observable<HelpSupportViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
