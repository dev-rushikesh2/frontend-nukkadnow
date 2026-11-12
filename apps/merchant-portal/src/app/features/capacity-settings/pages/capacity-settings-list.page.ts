import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface PickupSlotPreview {
  id: string;
  timeRange: string;
  bookedCount: number;
  capacity: number;
  status: 'Open' | 'Filling Fast' | 'Full' | 'Paused';
}

export interface BlackoutTimeWindow {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  days: string[];
  isActive: boolean;
}

@Component({
  selector: 'merchant-capacity-settings-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './capacity-settings-list.page.html',
  styleUrls: ['./capacity-settings-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapacitySettingsListPageComponent {
  readonly Math = Math;
  // Sub-tabs: 'SLOTS' | 'BLACKOUTS'
  readonly activeSubTab = signal<'SLOTS' | 'BLACKOUTS'>('SLOTS');

  // Capacity Settings Signals
  readonly slotInterval = signal<15 | 30 | 45 | 60>(30);
  readonly maxOrdersPerSlot = signal<number>(12);
  readonly maxConcurrentActive = signal<number>(8);
  readonly bufferMinutes = signal<number>(15);
  readonly kitchenLeadTime = signal<number>(20);

  // Blackout Windows
  readonly blackoutWindows = signal<BlackoutTimeWindow[]>([
    {
      id: 'bw-1',
      name: 'Kitchen Afternoon Deep Clean',
      startTime: '14:30',
      endTime: '16:00',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      isActive: true
    },
    {
      id: 'bw-2',
      name: 'Evening Shift Changeover',
      startTime: '18:00',
      endTime: '18:30',
      days: ['All Days'],
      isActive: true
    }
  ]);

  // Today's Live Slots Schedule
  readonly todaySlots = signal<PickupSlotPreview[]>([
    { id: 's1', timeRange: '10:00 AM – 10:30 AM', bookedCount: 12, capacity: 12, status: 'Full' },
    { id: 's2', timeRange: '10:30 AM – 11:00 AM', bookedCount: 9, capacity: 12, status: 'Filling Fast' },
    { id: 's3', timeRange: '11:00 AM – 11:30 AM', bookedCount: 6, capacity: 12, status: 'Open' },
    { id: 's4', timeRange: '11:30 AM – 12:00 PM', bookedCount: 4, capacity: 12, status: 'Open' },
    { id: 's5', timeRange: '12:00 PM – 12:30 PM', bookedCount: 8, capacity: 12, status: 'Open' },
    { id: 's6', timeRange: '02:30 PM – 04:00 PM', bookedCount: 0, capacity: 12, status: 'Paused' },
    { id: 's7', timeRange: '04:00 PM – 04:30 PM', bookedCount: 3, capacity: 12, status: 'Open' }
  ]);

  // Modal
  readonly showAddBlackoutModal = signal<boolean>(false);
  readonly newBlackoutName = signal<string>('');
  readonly newBlackoutStart = signal<string>('14:00');
  readonly newBlackoutEnd = signal<string>('15:30');

  // Toast
  readonly toast = signal<string | null>(null);

  setInterval(val: 15 | 30 | 45 | 60) {
    this.slotInterval.set(val);
    this.showToast(`Pickup slot interval set to ${val} minutes.`);
  }

  toggleSlotPause(slotId: string) {
    this.todaySlots.update(slots =>
      slots.map(s => {
        if (s.id === slotId) {
          const newStatus = s.status === 'Paused' ? 'Open' : 'Paused';
          return { ...s, status: newStatus };
        }
        return s;
      })
    );
    this.showToast('Slot status updated.');
  }

  toggleBlackout(id: string) {
    this.blackoutWindows.update(list =>
      list.map(b => b.id === id ? { ...b, isActive: !b.isActive } : b)
    );
  }

  addBlackout() {
    const name = this.newBlackoutName().trim();
    if (!name) return;

    const newWindow: BlackoutTimeWindow = {
      id: `bw-${Date.now()}`,
      name,
      startTime: this.newBlackoutStart(),
      endTime: this.newBlackoutEnd(),
      days: ['All Days'],
      isActive: true
    };

    this.blackoutWindows.update(list => [...list, newWindow]);
    this.showAddBlackoutModal.set(false);
    this.newBlackoutName.set('');
    this.showToast(`Blackout window "${name}" configured!`);
  }

  saveSettings() {
    this.showToast('Kitchen capacity & slot settings saved successfully!');
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2800);
  }
}
