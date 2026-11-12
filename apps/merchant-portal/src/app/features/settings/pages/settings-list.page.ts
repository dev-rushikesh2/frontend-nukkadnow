import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'merchant-settings-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './settings-list.page.html',
  styleUrls: ['./settings-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsListPageComponent {
  // Sub-tabs: 'GENERAL' | 'SUBSCRIPTION'
  readonly activeSubTab = signal<'GENERAL' | 'SUBSCRIPTION'>('GENERAL');

  // General Settings Toggles
  readonly orderChimeSound = signal<boolean>(true);
  readonly whatsappAlerts = signal<boolean>(true);
  readonly dailySummarySms = signal<boolean>(true);
  readonly autoAcceptOrders = signal<boolean>(false);
  readonly voiceAnnouncementLanguage = signal<string>('hi-IN');

  // Plan Details
  readonly currentPlanName = signal<string>('NukkadNow Pro Merchant');
  readonly planPrice = signal<number>(999);
  readonly renewalDate = signal<string>('15 Dec 2026');
  readonly planStatus = signal<'Active' | 'Expiring Soon'>('Active');

  // Toast
  readonly toast = signal<string | null>(null);

  toggleSetting(settingSignal: ReturnType<typeof signal<boolean>>, label: string) {
    settingSignal.update(v => !v);
    this.showToast(`${label} ${settingSignal() ? 'enabled' : 'disabled'}.`);
  }

  saveAll() {
    this.showToast('Store settings saved successfully!');
  }

  downloadInvoices() {
    this.showToast('Downloading subscription tax invoice (PDF)...');
  }

  upgradePlan() {
    this.showToast('Redirecting to payment gateway for Annual Pro upgrade...');
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2800);
  }
}
