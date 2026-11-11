import { Injectable, inject } from '@angular/core';
import { AuthenticationApi } from './authentication.api';
import { AuthenticationMapper } from './authentication.mapper';
import { Observable, map } from 'rxjs';
import { AuthenticationViewModel } from '../models/authentication-view.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationRepository {
  private api = inject(AuthenticationApi);
  private mapper = inject(AuthenticationMapper);

  getList(): Observable<AuthenticationViewModel[]> {
    return this.api.fetchList().pipe(
      map(items => items.map(this.mapper.toViewModel))
    );
  }
}
