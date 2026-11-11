import { Injectable } from '@angular/core';
import { OnboardingViewModel } from '../models/onboarding-view.model';

@Injectable({ providedIn: 'root' })
export class OnboardingMapper {
  toViewModel(dto: any): OnboardingViewModel {
    return { ...dto } as any;
  }
}
