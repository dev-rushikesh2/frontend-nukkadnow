import { Injectable, inject } from '@angular/core';
import { HomeApi } from './home.api';
import { HomeMapper } from './home.mapper';
import { Observable, map } from 'rxjs';
import { HomeViewModel } from '../models/home-view.model';

@Injectable({ providedIn: 'root' })
export class HomeRepository {
  private api = inject(HomeApi);
  private mapper = inject(HomeMapper);

  getList(): Observable<HomeViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
