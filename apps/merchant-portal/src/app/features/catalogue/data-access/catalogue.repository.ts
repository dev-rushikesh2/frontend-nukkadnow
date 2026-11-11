import { Injectable, inject } from '@angular/core';
import { CatalogueApi } from './catalogue.api';
import { CatalogueMapper } from './catalogue.mapper';
import { Observable, of, map } from 'rxjs';
import { CatalogueViewModel } from '../models/catalogue-view.model';

@Injectable({ providedIn: 'root' })
export class CatalogueRepository {
  private api = inject(CatalogueApi);
  private mapper = inject(CatalogueMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
