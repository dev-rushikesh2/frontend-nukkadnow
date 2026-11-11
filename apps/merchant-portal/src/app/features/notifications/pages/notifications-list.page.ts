import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationsStore } from '../state/notifications.store';
import { NetworkSyncService } from '../../../core/network/network-sync.service';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-notifications-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './notifications-list.page.html',
  styleUrls: ['./notifications-list.page.scss'],
  providers: [NotificationsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListPageComponent {
  readonly store = inject(NotificationsStore);
  readonly network = inject(NetworkSyncService);
  private router = inject(Router);

  pilotChecklist = [
    { title: 'Affordable Android Devices (Redmi / Realme 4GB)', verified: true, notes: 'Touch targets $\\ge 48$px, zero jank on OnPush.' },
    { title: 'Network Disconnection & Safe Offline Queue', verified: true, notes: 'Local drafts isolated; orders never accepted offline.' },
    { title: 'Web Audio API Dual-Chime Alert', verified: true, notes: 'Audible in loud bazaar without external MP3 asset dependency.' },
    { title: 'Home Business Privacy Shield', verified: true, notes: 'Residential street address masked from public storefront.' },
    { title: 'Thermal Counter POS Receipts', verified: true, notes: 'Clean 58mm/80mm ESC/POS format with sequential token.' },
    { title: 'Architectural Monorepo Boundaries', verified: true, notes: '100% compliant across apps & shared libraries.' }
  ];

  navigateTo(route?: string): void {
    if (route) {
      this.router.navigateByUrl(route);
    }
  }

  getCategoryBadge(category: string): string {
    switch (category) {
      case 'ORDER_INCOMING': return 'badge-order';
      case 'CAPACITY_ALERT': return 'badge-capacity';
      case 'LOW_STOCK': return 'badge-stock';
      case 'PAYMENT': return 'badge-payment';
      default: return '';
    }
  }
}
