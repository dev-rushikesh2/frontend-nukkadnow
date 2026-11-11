import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsStore } from '../state/subscriptions.store';
import { SaaSTier } from '../models/subscriptions-view.model';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-subscriptions-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './subscriptions-list.page.html',
  styleUrls: ['./subscriptions-list.page.scss'],
  providers: [SubscriptionsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubscriptionsListPageComponent {
  readonly store = inject(SubscriptionsStore);

  upgrade(tier: SaaSTier): void {
    this.store.upgradeTier(tier);
  }

  formatPrice(paise: number): string {
    if (paise === 0) return 'Free';
    return '₹' + (paise / 100).toLocaleString('en-IN') + ' / mo';
  }

  getMeterPercent(used: number, limit: number): number {
    if (limit >= 9999) return Math.min(100, Math.round((used / 100) * 100));
    return Math.min(100, Math.round((used / limit) * 100));
  }
}
