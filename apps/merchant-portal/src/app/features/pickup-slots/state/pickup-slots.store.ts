import { Injectable, signal, computed } from '@angular/core';
import { PickupSlotViewModel, DateCapacitySummary, PickupSlotStatus } from '../models/pickup-slots-view.model';

function generateMockSlots(dateStr: string): PickupSlotViewModel[] {
  const times = [
    { start: '10:00 AM', end: '10:15 AM', booked: 3, max: 10, isBlocked: false },
    { start: '10:15 AM', end: '10:30 AM', booked: 6, max: 10, isBlocked: false },
    { start: '10:30 AM', end: '10:45 AM', booked: 9, max: 10, isBlocked: false },
    { start: '10:45 AM', end: '11:00 AM', booked: 10, max: 10, isBlocked: false },
    { start: '11:00 AM', end: '11:15 AM', booked: 5, max: 10, isBlocked: false },
    { start: '11:15 AM', end: '11:30 AM', booked: 8, max: 10, isBlocked: false },
    { start: '11:30 AM', end: '11:45 AM', booked: 10, max: 10, isBlocked: false },
    { start: '11:45 AM', end: '12:00 PM', booked: 4, max: 10, isBlocked: false },
    { start: '12:00 PM', end: '12:15 PM', booked: 10, max: 10, isBlocked: true },
    { start: '12:15 PM', end: '12:30 PM', booked: 0, max: 10, isBlocked: true },
    { start: '12:30 PM', end: '12:45 PM', booked: 7, max: 10, isBlocked: false },
    { start: '12:45 PM', end: '01:00 PM', booked: 2, max: 10, isBlocked: false },
    { start: '01:00 PM', end: '01:15 PM', booked: 4, max: 10, isBlocked: false },
    { start: '01:15 PM', end: '01:30 PM', booked: 8, max: 10, isBlocked: false },
    { start: '01:30 PM', end: '01:45 PM', booked: 10, max: 10, isBlocked: false },
    { start: '01:45 PM', end: '02:00 PM', booked: 1, max: 10, isBlocked: false }
  ];

  return times.map((t, idx) => {
    let status: PickupSlotStatus = 'AVAILABLE';
    if (t.isBlocked) {
      status = 'BLOCKED';
    } else if (t.booked >= t.max) {
      status = 'FULL';
    } else if (t.booked >= t.max * 0.8) {
      status = 'ALMOST_FULL';
    }

    return {
      id: `slot-${dateStr}-${idx + 1}`,
      date: dateStr,
      startTime: t.start,
      endTime: t.end,
      bookedCount: t.booked,
      maxCapacity: t.max,
      status,
      isBlocked: t.isBlocked,
      activeOrderIds: t.booked > 0 ? [`#NK-${1000 + idx}`, `#NK-${1020 + idx}`] : []
    };
  });
}

@Injectable()
export class PickupSlotsStore {
  readonly selectedDate = signal<string>('2026-11-11');
  readonly slots = signal<PickupSlotViewModel[]>(generateMockSlots('2026-11-11'));
  readonly filterStatus = signal<string>('ALL');

  readonly summary = computed<DateCapacitySummary>(() => {
    const list = this.slots();
    const totalSlots = list.length;
    const blockedSlots = list.filter(s => s.isBlocked).length;
    const fullSlots = list.filter(s => !s.isBlocked && s.bookedCount >= s.maxCapacity).length;
    const availableSlots = list.filter(s => !s.isBlocked && s.bookedCount < s.maxCapacity).length;
    const totalOrdersBooked = list.reduce((acc, s) => acc + s.bookedCount, 0);
    const totalCapacity = list.reduce((acc, s) => acc + s.maxCapacity, 0);
    const utilizationRate = totalCapacity > 0 ? Math.round((totalOrdersBooked / totalCapacity) * 100) : 0;

    return {
      date: this.selectedDate(),
      displayLabel: this.selectedDate() === '2026-11-11' ? 'Today (11 Nov)' : this.selectedDate(),
      totalSlots,
      availableSlots,
      fullSlots,
      blockedSlots,
      totalOrdersBooked,
      utilizationRate
    };
  });

  readonly filteredSlots = computed(() => {
    const list = this.slots();
    const filter = this.filterStatus();
    if (filter === 'AVAILABLE') {
      return list.filter(s => !s.isBlocked && s.bookedCount < s.maxCapacity);
    }
    if (filter === 'FULL') {
      return list.filter(s => !s.isBlocked && s.bookedCount >= s.maxCapacity);
    }
    if (filter === 'BLOCKED') {
      return list.filter(s => s.isBlocked);
    }
    return list;
  });

  selectDate(dateStr: string): void {
    this.selectedDate.set(dateStr);
    this.slots.set(generateMockSlots(dateStr));
  }

  setFilter(filter: string): void {
    this.filterStatus.set(filter);
  }

  toggleSlotBlocked(slotId: string): void {
    this.slots.update(list =>
      list.map(slot => {
        if (slot.id !== slotId) return slot;
        const newBlocked = !slot.isBlocked;
        let newStatus: PickupSlotStatus = 'AVAILABLE';
        if (newBlocked) {
          newStatus = 'BLOCKED';
        } else if (slot.bookedCount >= slot.maxCapacity) {
          newStatus = 'FULL';
        } else if (slot.bookedCount >= slot.maxCapacity * 0.8) {
          newStatus = 'ALMOST_FULL';
        }
        return {
          ...slot,
          isBlocked: newBlocked,
          status: newStatus
        };
      })
    );
  }

  adjustCapacity(slotId: string, delta: number): void {
    this.slots.update(list =>
      list.map(slot => {
        if (slot.id !== slotId) return slot;
        const newCap = Math.max(slot.bookedCount, slot.maxCapacity + delta);
        let newStatus: PickupSlotStatus = slot.isBlocked ? 'BLOCKED' : 'AVAILABLE';
        if (!slot.isBlocked) {
          if (slot.bookedCount >= newCap) {
            newStatus = 'FULL';
          } else if (slot.bookedCount >= newCap * 0.8) {
            newStatus = 'ALMOST_FULL';
          }
        }
        return {
          ...slot,
          maxCapacity: newCap,
          status: newStatus
        };
      })
    );
  }

  blockAllRemaining(): void {
    this.slots.update(list =>
      list.map(slot => ({
        ...slot,
        isBlocked: true,
        status: 'BLOCKED'
      }))
    );
  }

  unblockAll(): void {
    this.slots.update(list =>
      list.map(slot => {
        let status: PickupSlotStatus = 'AVAILABLE';
        if (slot.bookedCount >= slot.maxCapacity) {
          status = 'FULL';
        } else if (slot.bookedCount >= slot.maxCapacity * 0.8) {
          status = 'ALMOST_FULL';
        }
        return {
          ...slot,
          isBlocked: false,
          status
        };
      })
    );
  }
}
