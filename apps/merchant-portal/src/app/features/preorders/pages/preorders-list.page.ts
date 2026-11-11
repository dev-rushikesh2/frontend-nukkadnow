import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreordersStore } from '../state/preorders.store';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-preorders-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './preorders-list.page.html',
  styleUrls: ['./preorders-list.page.scss'],
  providers: [PreordersStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreordersListPageComponent {
  readonly store = inject(PreordersStore);

  getStatusClass(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'status-confirmed';
      case 'IN_PREPARATION': return 'status-prep';
      case 'READY_FOR_PICKUP': return 'status-ready';
      case 'COLLECTED': return 'status-collected';
      default: return '';
    }
  }

  getActionLabel(status: string): string {
    switch (status) {
      case 'CONFIRMED': return 'Start Prep';
      case 'IN_PREPARATION': return 'Mark Ready';
      case 'READY_FOR_PICKUP': return 'Handover / Done';
      default: return 'Completed';
    }
  }

  formatPrice(paise: number): string {
    return '₹' + (paise / 100).toFixed(0);
  }
}
