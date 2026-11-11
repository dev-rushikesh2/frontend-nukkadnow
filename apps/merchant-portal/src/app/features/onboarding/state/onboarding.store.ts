import { Injectable, signal, computed } from '@angular/core';
import { OnboardingDraft, INITIAL_DRAFT, SellerMode } from '../models/onboarding-view.model';

@Injectable({ providedIn: 'root' })
export class OnboardingStore {
  private readonly STORAGE_KEY = 'nk_onboarding_draft';
  readonly draft = signal<OnboardingDraft>(this.loadFromStorage());
  readonly submitting = signal<boolean>(false);
  readonly submitted = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly currentStep = computed(() => this.draft().step);
  readonly isHomeMaker = computed(() => this.draft().isHomeMaker);

  setSellerMode(mode: SellerMode) {
    this.updateDraft({
      sellerMode: mode,
      isHomeMaker: mode === 'HOME_MAKER'
    });
  }

  updateDraft(partial: Partial<OnboardingDraft>) {
    this.draft.update((d) => {
      const updated = { ...d, ...partial };
      this.saveToStorage(updated);
      return updated;
    });
  }

  nextStep() {
    if (this.currentStep() < 7) {
      this.updateDraft({ step: this.currentStep() + 1 });
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.updateDraft({ step: this.currentStep() - 1 });
    }
  }

  submitForVerification(): Promise<boolean> {
    this.submitting.set(true);
    this.errorMessage.set(null);
    return new Promise((resolve) => {
      setTimeout(() => {
        this.submitting.set(false);
        this.submitted.set(true);
        localStorage.removeItem(this.STORAGE_KEY);
        resolve(true);
      }, 1000);
    });
  }

  private loadFromStorage(): OnboardingDraft {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_DRAFT;
    } catch {
      return INITIAL_DRAFT;
    }
  }

  private saveToStorage(draft: OnboardingDraft) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // Storage unavailable fallback
    }
  }
}
