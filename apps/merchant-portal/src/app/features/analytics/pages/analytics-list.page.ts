import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalyticsStore } from '../state/analytics.store';
import { AnalyticsTimeRange } from '../models/analytics-view.model';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-analytics-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './analytics-list.page.html',
  styleUrls: ['./analytics-list.page.scss'],
  providers: [AnalyticsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsListPageComponent {
  readonly store = inject(AnalyticsStore);

  readonly timeRanges: { label: string; value: AnalyticsTimeRange }[] = [
    { label: 'Today (Live)', value: 'TODAY' },
    { label: 'Yesterday', value: 'YESTERDAY' },
    { label: 'Last 7 Days', value: 'WEEK' },
    { label: 'This Month', value: 'MONTH' }
  ];

  selectRange(range: AnalyticsTimeRange): void {
    this.store.setTimeRange(range);
  }

  exportCsv(): void {
    this.store.exportReport();
  }

  formatPrice(paise: number): string {
    return '₹' + (paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
}
