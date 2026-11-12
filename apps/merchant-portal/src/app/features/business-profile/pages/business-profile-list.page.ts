import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface DayOperatingHours {
  day: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface HolidayClosure {
  id: string;
  title: string;
  date: string;
}

@Component({
  selector: 'merchant-business-profile-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './business-profile-list.page.html',
  styleUrls: ['./business-profile-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessProfileListPageComponent {
  // Sub-tabs: 'PROFILE' (Screen 29) | 'HOURS' (Screen 30)
  readonly activeSubTab = signal<'PROFILE' | 'HOURS'>('PROFILE');

  // Screen 29: Business Profile State
  readonly shopName = signal<string>('Nagpur Central Kirana & Fresh Mart');
  readonly businessCategory = signal<string>('Kirana & Supermarket');
  readonly ownerName = signal<string>('Rushikesh Khawane');
  readonly phone = signal<string>('+91 98765 43210');
  readonly email = signal<string>('rushikesh@nukkadnow.store');
  readonly tagline = signal<string>('Your trusted neighbourhood grocery & daily essentials store with express 30-min home delivery.');

  readonly addressStreet = signal<string>('Shop 4, Ground Floor, Laxmi Nagar Square, West High Court Road');
  readonly city = signal<string>('Nagpur');
  readonly pincode = signal<string>('440022');
  readonly gstin = signal<string>('27AADCN9821M1Z5');
  readonly fssai = signal<string>('11522036000123');

  readonly coverUrl = signal<string>('https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200');
  readonly logoUrl = signal<string>('https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=200');

  readonly storePhotos = signal<string[]>([
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
    'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400',
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=400'
  ]);

  // Screen 30: Availability State
  readonly isShopLiveOpen = signal<boolean>(true);

  readonly weeklySchedule = signal<DayOperatingHours[]>([
    { day: 'Monday', isOpen: true, openTime: '08:00', closeTime: '22:30' },
    { day: 'Tuesday', isOpen: true, openTime: '08:00', closeTime: '22:30' },
    { day: 'Wednesday', isOpen: true, openTime: '08:00', closeTime: '22:30' },
    { day: 'Thursday', isOpen: true, openTime: '08:00', closeTime: '22:30' },
    { day: 'Friday', isOpen: true, openTime: '08:00', closeTime: '22:30' },
    { day: 'Saturday', isOpen: true, openTime: '08:00', closeTime: '23:00' },
    { day: 'Sunday', isOpen: true, openTime: '08:00', closeTime: '23:00' }
  ]);

  readonly holidays = signal<HolidayClosure[]>([
    { id: 'h1', title: 'Diwali Balipratipada', date: '01 Nov 2026' },
    { id: 'h2', title: 'Makar Sankranti', date: '14 Jan 2027' }
  ]);

  readonly showAddHolidayModal = signal<boolean>(false);
  readonly newHolidayName = signal<string>('');
  readonly newHolidayDate = signal<string>('');

  // Toast
  readonly toast = signal<string | null>(null);

  toggleShopLive() {
    this.isShopLiveOpen.update(v => !v);
    this.showToast(`Shop status updated: ${this.isShopLiveOpen() ? '🟢 OPEN' : '🔴 TEMPORARILY CLOSED'}.`);
  }

  toggleDayOpen(index: number) {
    this.weeklySchedule.update(list =>
      list.map((d, i) => i === index ? { ...d, isOpen: !d.isOpen } : d)
    );
  }

  applyTimeToAll(time: { openTime: string; closeTime: string }) {
    this.weeklySchedule.update(list =>
      list.map(d => ({ ...d, openTime: time.openTime, closeTime: time.closeTime }))
    );
    this.showToast(`Applied ${time.openTime} – ${time.closeTime} to all 7 days.`);
  }

  addStorePhoto() {
    const photo = 'https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=400';
    this.storePhotos.update(list => [...list, photo]);
    this.showToast('Storefront photo added to gallery.');
  }

  removePhoto(index: number) {
    this.storePhotos.update(list => list.filter((_, i) => i !== index));
  }

  addHoliday() {
    const name = this.newHolidayName().trim();
    if (!name || !this.newHolidayDate()) return;

    this.holidays.update(list => [
      ...list,
      { id: `h-${Date.now()}`, title: name, date: this.newHolidayDate() }
    ]);
    this.showAddHolidayModal.set(false);
    this.newHolidayName.set('');
    this.newHolidayDate.set('');
    this.showToast(`Scheduled closure for "${name}" added.`);
  }

  removeHoliday(id: string) {
    this.holidays.update(list => list.filter(h => h.id !== id));
  }

  saveProfile() {
    this.showToast('Store profile & branding saved successfully!');
  }

  saveHours() {
    this.showToast('Weekly operating hours & availability saved!');
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2800);
  }
}
