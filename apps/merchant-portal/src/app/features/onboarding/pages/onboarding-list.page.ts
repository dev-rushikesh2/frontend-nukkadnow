import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export interface BusinessTypeItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
}

export interface DayOption {
  day: string;
  short: string;
  selected: boolean;
}

export interface DocumentItem {
  id: string;
  title: string;
  sub: string;
  required: boolean;
  uploaded: boolean;
  fileName?: string;
}

@Component({
  selector: 'merchant-onboarding-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding-list.page.html',
  styleUrls: ['./onboarding-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OnboardingListPageComponent {
  router = inject(Router);

  // Active step: 1 through 7
  readonly currentStep = signal<number>(1);

  // Step 1: Business Type
  readonly selectedBusinessType = signal<string>('retail');
  readonly businessTypes: BusinessTypeItem[] = [
    { id: 'retail', name: 'Retail Shop', desc: 'Grocery, Dairy, Daily Needs', icon: '🏪' },
    { id: 'produce', name: 'Fruit & Vegetable', desc: 'Fresh Produce, Farm Goods', icon: '🥗' },
    { id: 'pharmacy', name: 'Medical / Pharmacy', desc: 'Medicines, Healthcare', icon: '🏥' },
    { id: 'fnb', name: 'Food & Beverages', desc: 'Restaurant, Café, Bakery', icon: '🍴' },
    { id: 'wholesale', name: 'Wholesale / Distributor', desc: 'Bulk Supply, B2B', icon: '📦' },
    { id: 'other', name: 'Other', desc: 'Services, Repair, General', icon: '⊞' }
  ];

  // Step 2: Profile
  shopName = 'Shree Fresh Mart';
  businessCategory = 'Retail Shop (Grocery, Daily Needs)';
  businessMobile = '+91 98765 43210';
  gstin = '27ABCDE1234F1Z5';
  businessDescription = 'Grocery, dairy, household and daily needs.';

  // Step 3: Location
  addressLine1 = 'Shop No. 12, Civil Lines';
  addressLine2 = 'Near Old Bus Stand';
  city = 'Amravati';
  pincode = '444601';
  isLocating = signal<boolean>(false);
  locationPinStatus = signal<string>('Civil Lines, Amravati');

  // Step 4: Fulfilment
  homeDelivery = signal<boolean>(true);
  deliveryRadius = signal<string>('15 km');
  minOrderValue = signal<number>(0);
  storePickup = signal<boolean>(true);
  expressDelivery = signal<boolean>(false);

  // Step 5: Hours
  shopStatus = signal<boolean>(true);
  workingDays = signal<DayOption[]>([
    { day: 'Monday', short: 'Mon', selected: true },
    { day: 'Tuesday', short: 'Tue', selected: true },
    { day: 'Wednesday', short: 'Wed', selected: true },
    { day: 'Thursday', short: 'Thu', selected: true },
    { day: 'Friday', short: 'Fri', selected: true },
    { day: 'Saturday', short: 'Sat', selected: false },
    { day: 'Sunday', short: 'Sun', selected: false }
  ]);
  openingTime = signal<string>('08:00 AM');
  closingTime = signal<string>('09:00 PM');
  open7Days = signal<boolean>(false);

  // Step 6: Compliance
  documents = signal<DocumentItem[]>([
    { id: 'reg', title: 'Business Registration Proof', sub: 'Shop Act / Udyam / GST Certificate', required: true, uploaded: true, fileName: 'shop_act_2026.pdf' },
    { id: 'id', title: 'Owner Identity Proof', sub: 'Aadhaar / PAN / Voter ID', required: true, uploaded: true, fileName: 'aadhaar_card.pdf' },
    { id: 'addr', title: 'Address Proof', sub: 'Electricity Bill / Rent Agreement / Property Proof', required: true, uploaded: true, fileName: 'electricity_bill.pdf' },
    { id: 'gst', title: 'GST Certificate (Optional)', sub: 'For GST registered businesses', required: false, uploaded: false }
  ]);
  confirmValidDocs = signal<boolean>(true);

  // Toast
  toastMessage = signal<string | null>(null);

  nextStep() {
    if (this.currentStep() < 7) {
      this.currentStep.update(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.finishOnboarding();
    }
  }

  prevStep() {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  goToStep(step: number) {
    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  selectBusinessType(id: string) {
    this.selectedBusinessType.set(id);
  }

  triggerGps() {
    this.isLocating.set(true);
    setTimeout(() => {
      this.isLocating.set(false);
      this.locationPinStatus.set('Sai Nagar, Amravati');
      this.addressLine1 = 'Shop 4, Market Yard, Sai Nagar';
      this.pincode = '444607';
      this.showToast('Current GPS location detected (±4m)');
    }, 600);
  }

  toggleDay(short: string) {
    this.workingDays.update(days =>
      days.map(d => (d.short === short ? { ...d, selected: !d.selected } : d))
    );
  }

  toggle7Days() {
    const nextVal = !this.open7Days();
    this.open7Days.set(nextVal);
    if (nextVal) {
      this.workingDays.update(days => days.map(d => ({ ...d, selected: true })));
    }
  }

  uploadDoc(docId: string) {
    this.documents.update(docs =>
      docs.map(d =>
        d.id === docId ? { ...d, uploaded: true, fileName: `${d.id}_doc.pdf` } : d
      )
    );
    this.showToast('Document uploaded successfully');
  }

  finishOnboarding() {
    this.showToast('Shop registration submitted successfully!');
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 1000);
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 2800);
  }
}
