import { Injectable, signal, computed } from '@angular/core';

export type ShopLiveStatus = 'OPEN' | 'PAUSED' | 'CLOSED';

export interface OutletScheduleDay {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  isOpen: boolean;
  openTime: string;
  closeTime: string;
}

export interface OutletRecord {
  id: string;
  name: string;
  locality: string;
  address: string;
  pincode: string;
  status: ShopLiveStatus;
  pauseRemainingMinutes?: number;
  activeOrdersCount: number;
  weeklySchedule: OutletScheduleDay[];
}

const DEFAULT_SCHEDULE: OutletScheduleDay[] = [
  { day: 'MON', isOpen: true, openTime: '09:00', closeTime: '21:00' },
  { day: 'TUE', isOpen: true, openTime: '09:00', closeTime: '21:00' },
  { day: 'WED', isOpen: true, openTime: '09:00', closeTime: '21:00' },
  { day: 'THU', isOpen: true, openTime: '09:00', closeTime: '21:00' },
  { day: 'FRI', isOpen: true, openTime: '09:00', closeTime: '21:00' },
  { day: 'SAT', isOpen: true, openTime: '09:00', closeTime: '22:00' },
  { day: 'SUN', isOpen: true, openTime: '09:00', closeTime: '22:00' }
];

@Injectable({ providedIn: 'root' })
export class OutletSwitcherStore {
  readonly outlets = signal<OutletRecord[]>([
    {
      id: 'outlet-dharampeth-1',
      name: 'Dharampeth Main Branch',
      locality: 'Dharampeth',
      address: 'Shop 4, West High Court Road',
      pincode: '440010',
      status: 'OPEN',
      activeOrdersCount: 5,
      weeklySchedule: DEFAULT_SCHEDULE
    },
    {
      id: 'outlet-sadar-1',
      name: 'Sadar Bazar Outlet',
      locality: 'Sadar',
      address: 'Near Residency Road, Sadar',
      pincode: '440001',
      status: 'OPEN',
      activeOrdersCount: 2,
      weeklySchedule: DEFAULT_SCHEDULE
    }
  ]);

  readonly activeOutletId = signal<string>('outlet-dharampeth-1');

  readonly activeOutlet = computed(() => {
    return this.outlets().find((o) => o.id === this.activeOutletId()) || this.outlets()[0];
  });

  readonly currentStatus = computed(() => this.activeOutlet().status);

  selectOutlet(id: string) {
    this.activeOutletId.set(id);
  }

  setShopStatus(status: ShopLiveStatus, pauseMinutes?: number) {
    this.outlets.update((list) =>
      list.map((o) => {
        if (o.id === this.activeOutletId()) {
          return {
            ...o,
            status,
            pauseRemainingMinutes: status === 'PAUSED' ? (pauseMinutes || 45) : undefined
          };
        }
        return o;
      })
    );
  }

  updateSchedule(outletId: string, schedule: OutletScheduleDay[]) {
    this.outlets.update((list) =>
      list.map((o) => (o.id === outletId ? { ...o, weeklySchedule: schedule } : o))
    );
  }
}
