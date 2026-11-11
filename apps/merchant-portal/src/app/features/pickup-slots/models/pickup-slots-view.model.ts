export type PickupSlotStatus = 'AVAILABLE' | 'ALMOST_FULL' | 'FULL' | 'BLOCKED';

export interface PickupSlotViewModel {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "10:00 AM"
  endTime: string;   // "10:15 AM"
  bookedCount: number;
  maxCapacity: number;
  status: PickupSlotStatus;
  isBlocked: boolean;
  activeOrderIds: string[];
}

export interface DateCapacitySummary {
  date: string;
  displayLabel: string;
  totalSlots: number;
  availableSlots: number;
  fullSlots: number;
  blockedSlots: number;
  totalOrdersBooked: number;
  utilizationRate: number; // percentage e.g. 74
}

export type PickupSlotsViewModel = any;
