import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnboardingStore } from '../state/onboarding.store';
import { SellerMode } from '../models/onboarding-view.model';
import { ButtonComponent, InputComponent, ToggleComponent, ErrorBannerComponent } from '@nukkadnow/ui';
import { Router } from '@angular/router';

@Component({
  selector: 'merchant-onboarding-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ToggleComponent, ErrorBannerComponent],
  templateUrl: './onboarding-list.page.html',
  styleUrls: ['./onboarding-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingPageComponent {
  store = inject(OnboardingStore);
  router = inject(Router);

  categories = [
    'Grocery & Kirana',
    'Sweets & Snacks',
    'Bakery & Cakes',
    'Fresh Meals & Tiffin',
    'Artisanal & Handcrafted',
    'Dairy & Fresh Milk',
    'Fruits & Vegetables'
  ];

  selectMode(mode: SellerMode) {
    this.store.setSellerMode(mode);
  }

  canProceedStep(): boolean {
    const d = this.store.draft();
    switch (d.step) {
      case 1: return !!d.sellerMode;
      case 2: return d.businessName.trim().length >= 3;
      case 3: return d.locality.trim().length >= 2 && d.pincode.length === 6;
      case 4: return d.enablePickup || d.enableDelivery;
      case 5: return true;
      case 6: return true;
      case 7: return d.termsAccepted;
      default: return true;
    }
  }

  onFinish() {
    this.store.submitForVerification().then(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}

export { OnboardingPageComponent as OnboardingListPageComponent };
