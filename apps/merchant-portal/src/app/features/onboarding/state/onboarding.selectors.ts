import { computed } from '@angular/core';
import { OnboardingStore } from './onboarding.store';

export function createOnboardingSelectors(store: OnboardingStore) {
  return {
    itemCount: computed(() => ((store as any).items ? (store as any).items().length : 0))
  };
}
