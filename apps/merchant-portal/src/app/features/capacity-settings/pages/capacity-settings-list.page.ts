import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CapacitySettingsStore } from '../state/capacity-settings.store';
import { ButtonComponent, DialogComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-capacity-settings-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, DialogComponent],
  templateUrl: './capacity-settings-list.page.html',
  styleUrls: ['./capacity-settings-list.page.scss'],
  providers: [CapacitySettingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapacitySettingsListPageComponent {
  readonly store = inject(CapacitySettingsStore);

  showAddBlackoutModal = false;
  newBlackoutName = '';
  newBlackoutStart = '14:00';
  newBlackoutEnd = '15:30';

  onIntervalChange(val: 15 | 30 | 45 | 60): void {
    this.store.setInterval(val);
  }

  onMaxOrdersChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setMaxOrdersPerSlot(val);
  }

  onMaxConcurrentChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setMaxConcurrentActiveOrders(val);
  }

  onBufferChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setBufferMinutes(val);
  }

  onLeadTimeChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setLeadTime(val);
  }

  openAddBlackoutModal(): void {
    this.newBlackoutName = '';
    this.newBlackoutStart = '14:00';
    this.newBlackoutEnd = '15:30';
    this.showAddBlackoutModal = true;
  }

  saveNewBlackout(): void {
    if (!this.newBlackoutName.trim()) return;
    this.store.addBlackoutWindow({
      name: this.newBlackoutName.trim(),
      startTime: this.newBlackoutStart,
      endTime: this.newBlackoutEnd,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      isActive: true
    });
    this.showAddBlackoutModal = false;
  }
}
