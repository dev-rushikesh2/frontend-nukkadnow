import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingStore } from '../state/onboarding.store';
import { OnboardingCardComponent } from '../components/onboarding-card.component';

@Component({
  selector: 'app-onboarding-list-page',
  standalone: true,
  imports: [CommonModule, OnboardingCardComponent],
  templateUrl: './onboarding-list.page.html',
  styleUrls: ['./onboarding-list.page.scss'],
  providers: [OnboardingStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingListPageComponent {
  store = inject(OnboardingStore);
}
