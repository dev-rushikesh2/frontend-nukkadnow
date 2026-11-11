import { Injectable, signal, computed } from '@angular/core';
import { CapacityConfig, BlackoutWindow } from '../models/capacity-settings-view.model';

const DEFAULT_CONFIG: CapacityConfig = {
  slotIntervalMinutes: 15,
  maxOrdersPerSlot: 10,
  bufferMinutes: 5,
  autoPauseOnFullCapacity: true,
  leadTimeAdvanceMinutes: 20,
  maxConcurrentActiveOrders: 15,
  allowWalkinSlotBypass: true,
  blackoutWindows: [
    {
      id: 'bw-1',
      name: 'Kitchen Prep & Clean Break',
      startTime: '14:30',
      endTime: '16:00',
      daysOfWeek: [1, 2, 3, 4, 5, 6, 0],
      isActive: true
    }
  ]
};

@Injectable()
export class CapacitySettingsStore {
  readonly config = signal<CapacityConfig>({ ...DEFAULT_CONFIG });
  readonly isSaving = signal<boolean>(false);
  readonly saveSuccess = signal<boolean>(false);
  readonly dirty = signal<boolean>(false);

  readonly totalDailyCapacityEstimate = computed(() => {
    const cfg = this.config();
    // Assuming 12 hour operational day (e.g. 9 AM to 9 PM = 720 mins)
    const operationalMins = 720 - (cfg.blackoutWindows.filter(b => b.isActive).length * 90);
    const slots = operationalMins / cfg.slotIntervalMinutes;
    return Math.floor(slots * cfg.maxOrdersPerSlot);
  });

  setInterval(minutes: 15 | 30 | 45 | 60): void {
    this.config.update(c => ({ ...c, slotIntervalMinutes: minutes }));
    this.dirty.set(true);
  }

  setMaxOrdersPerSlot(val: number): void {
    this.config.update(c => ({ ...c, maxOrdersPerSlot: Math.max(1, Math.min(100, val)) }));
    this.dirty.set(true);
  }

  setBufferMinutes(val: number): void {
    this.config.update(c => ({ ...c, bufferMinutes: Math.max(0, Math.min(30, val)) }));
    this.dirty.set(true);
  }

  setMaxConcurrentActiveOrders(val: number): void {
    this.config.update(c => ({ ...c, maxConcurrentActiveOrders: Math.max(1, Math.min(50, val)) }));
    this.dirty.set(true);
  }

  setLeadTime(val: number): void {
    this.config.update(c => ({ ...c, leadTimeAdvanceMinutes: Math.max(5, Math.min(120, val)) }));
    this.dirty.set(true);
  }

  toggleAutoPause(): void {
    this.config.update(c => ({ ...c, autoPauseOnFullCapacity: !c.autoPauseOnFullCapacity }));
    this.dirty.set(true);
  }

  toggleWalkinBypass(): void {
    this.config.update(c => ({ ...c, allowWalkinSlotBypass: !c.allowWalkinSlotBypass }));
    this.dirty.set(true);
  }

  toggleBlackoutWindow(id: string): void {
    this.config.update(c => ({
      ...c,
      blackoutWindows: c.blackoutWindows.map(bw => bw.id === id ? { ...bw, isActive: !bw.isActive } : bw)
    }));
    this.dirty.set(true);
  }

  addBlackoutWindow(window: Omit<BlackoutWindow, 'id'>): void {
    const newWindow: BlackoutWindow = {
      ...window,
      id: `bw-${Date.now()}`
    };
    this.config.update(c => ({
      ...c,
      blackoutWindows: [...c.blackoutWindows, newWindow]
    }));
    this.dirty.set(true);
  }

  removeBlackoutWindow(id: string): void {
    this.config.update(c => ({
      ...c,
      blackoutWindows: c.blackoutWindows.filter(bw => bw.id !== id)
    }));
    this.dirty.set(true);
  }

  saveSettings(): void {
    this.isSaving.set(true);
    // Simulate instantaneous local-first state save
    setTimeout(() => {
      this.isSaving.set(false);
      this.saveSuccess.set(true);
      this.dirty.set(false);
      setTimeout(() => this.saveSuccess.set(false), 3000);
    }, 400);
  }

  resetDefaults(): void {
    this.config.set({ ...DEFAULT_CONFIG });
    this.dirty.set(true);
  }
}
