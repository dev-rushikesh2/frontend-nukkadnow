import { Injectable, inject } from '@angular/core';
import { DiscoveryApi } from './discovery.api';
import { DiscoveryMapper } from './discovery.mapper';
import { Observable, map } from 'rxjs';
import { DiscoveryViewModel } from '../models/discovery-view.model';

@Injectable({ providedIn: 'root' })
export class DiscoveryRepository {
  private api = inject(DiscoveryApi);
  private mapper = inject(DiscoveryMapper);

  getList(): Observable<DiscoveryViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
