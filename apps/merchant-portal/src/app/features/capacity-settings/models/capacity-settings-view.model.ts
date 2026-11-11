export interface BlackoutWindow {
  id: string;
  name: string;
  startTime: string; // HH:mm format e.g. "14:00"
  endTime: string;   // HH:mm format e.g. "16:00"
  daysOfWeek: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  isActive: boolean;
}

export interface CapacityConfig {
  slotIntervalMinutes: 15 | 30 | 45 | 60;
  maxOrdersPerSlot: number;
  bufferMinutes: number;
  autoPauseOnFullCapacity: boolean;
  leadTimeAdvanceMinutes: number;
  maxConcurrentActiveOrders: number;
  blackoutWindows: BlackoutWindow[];
  allowWalkinSlotBypass: boolean;
}

export interface CapacitySettingsViewModel {
  outletId: string;
  outletName: string;
  config: CapacityConfig;
  lastUpdated: string;
}
