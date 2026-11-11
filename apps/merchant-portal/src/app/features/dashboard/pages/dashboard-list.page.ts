import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardStore } from '../state/dashboard.store';
import { AudioAlertService } from '../../../core/realtime/audio-alert.service';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-dashboard-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonComponent],
  templateUrl: './dashboard-list.page.html',
  styleUrls: ['./dashboard-list.page.scss'],
  providers: [DashboardStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardListPageComponent {
  readonly store = inject(DashboardStore);
  private audio = inject(AudioAlertService);

  formatPrice(paise: number): string {
    return '₹' + (paise / 100).toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }

  playAlertSound(): void {
    this.audio.playNewOrderAlert();
  }
}
