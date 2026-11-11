import { computed } from '@angular/core';
import { OnboardingStore } from './onboarding.store';

export function createOnboardingSelectors(store: OnboardingStore) {
  return {
    itemCount: computed(() => store.items().length)
  };
}
