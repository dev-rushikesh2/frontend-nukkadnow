import { Injectable, inject } from '@angular/core';
import { OnboardingApi } from './onboarding.api';
import { OnboardingMapper } from './onboarding.mapper';
import { Observable, of, map } from 'rxjs';
import { OnboardingViewModel } from '../models/onboarding-view.model';

@Injectable({ providedIn: 'root' })
export class OnboardingRepository {
  private api = inject(OnboardingApi);
  private mapper = inject(OnboardingMapper);

  getList(): Observable<any[]> {
    return of([]);
  }
}
