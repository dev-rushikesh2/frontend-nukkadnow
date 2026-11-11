import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupSlotsStore } from '../state/pickup-slots.store';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-pickup-slots-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pickup-slots-list.page.html',
  styleUrls: ['./pickup-slots-list.page.scss'],
  providers: [PickupSlotsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickupSlotsListPageComponent {
  readonly store = inject(PickupSlotsStore);

  readonly dates = [
    { label: 'Today (11 Nov)', value: '2026-11-11' },
    { label: 'Tomorrow (12 Nov)', value: '2026-11-12' },
    { label: 'Thursday (13 Nov)', value: '2026-11-13' }
  ];

  selectDate(val: string): void {
    this.store.selectDate(val);
  }

  setFilter(filter: string): void {
    this.store.setFilter(filter);
  }

  toggleBlock(slotId: string): void {
    this.store.toggleSlotBlocked(slotId);
  }

  adjustCap(slotId: string, delta: number): void {
    this.store.adjustCapacity(slotId, delta);
  }

  getSlotStatusClass(status: string): string {
    switch (status) {
      case 'AVAILABLE': return 'status-available';
      case 'ALMOST_FULL': return 'status-almost-full';
      case 'FULL': return 'status-full';
      case 'BLOCKED': return 'status-blocked';
      default: return '';
    }
  }

  getSlotProgressWidth(booked: number, max: number): number {
    if (max <= 0) return 0;
    return Math.min(100, Math.round((booked / max) * 100));
  }
}
