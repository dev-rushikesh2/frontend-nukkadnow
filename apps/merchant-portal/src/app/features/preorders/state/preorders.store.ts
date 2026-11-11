import { Injectable, signal, computed } from '@angular/core';
import { PreorderViewModel, PreorderStatus } from '../models/preorders-view.model';

const INITIAL_PREORDERS: PreorderViewModel[] = [
  {
    orderId: '#NK-2001',
    tokenNumber: '#PR-101',
    customerName: 'Sameer Deshpande',
    customerPhoneMasked: '+91 98234 *****',
    items: [
      { name: 'Nagpur Tarri Poha (Special Plate)', quantity: 4, unitPricePaise: 4000 }
    ],
    totalAmountPaise: 16000,
    orderDate: '2026-11-10 18:30',
    scheduledFulfillmentDate: '2026-11-11',
    scheduledTimeSlot: '05:00 PM – 05:15 PM',
    status: 'CONFIRMED',
    batchName: 'Evening Fresh Tarri Poha & Samosas',
    isPaid: true,
    specialInstructions: 'Pack tarri gravy in separate pouches.'
  },
  {
    orderId: '#NK-2004',
    tokenNumber: '#PR-102',
    customerName: 'Priya Kulkarni',
    customerPhoneMasked: '+91 94221 *****',
    items: [
      { name: 'Nagpur Tarri Poha (Special Plate)', quantity: 6, unitPricePaise: 4000 }
    ],
    totalAmountPaise: 24000,
    orderDate: '2026-11-10 21:10',
    scheduledFulfillmentDate: '2026-11-11',
    scheduledTimeSlot: '05:15 PM – 05:30 PM',
    status: 'CONFIRMED',
    batchName: 'Evening Fresh Tarri Poha & Samosas',
    isPaid: true
  },
  {
    orderId: '#NK-2015',
    tokenNumber: '#PR-103',
    customerName: 'Sunita Patil',
    customerPhoneMasked: '+91 97655 *****',
    items: [
      { name: 'Desi Ghee Besan Ladoo (1kg Box)', quantity: 5, unitPricePaise: 45000 }
    ],
    totalAmountPaise: 225000,
    orderDate: '2026-11-10 14:00',
    scheduledFulfillmentDate: '2026-11-12',
    scheduledTimeSlot: '11:30 AM – 12:00 PM',
    status: 'CONFIRMED',
    batchName: 'Diwali Besan Ladoo Pure Desi Ghee',
    isPaid: true,
    specialInstructions: 'Diwali festive gift bags requested.'
  },
  {
    orderId: '#NK-2032',
    tokenNumber: '#PR-104',
    customerName: 'Vikram Sharma',
    customerPhoneMasked: '+91 93700 *****',
    items: [
      { name: 'Country Sourdough Loaf (450g)', quantity: 2, unitPricePaise: 18000 }
    ],
    totalAmountPaise: 36000,
    orderDate: '2026-11-11 09:20',
    scheduledFulfillmentDate: '2026-11-13',
    scheduledTimeSlot: '08:30 AM – 09:00 AM',
    status: 'CONFIRMED',
    batchName: 'Morning Artisan Sourdough Batch',
    isPaid: true
  }
];

@Injectable()
export class PreordersStore {
  readonly preorders = signal<PreorderViewModel[]>(INITIAL_PREORDERS);
  readonly filterDate = signal<string>('ALL');
  readonly filterStatus = signal<string>('ALL');

  readonly filteredPreorders = computed(() => {
    let list = this.preorders();
    const date = this.filterDate();
    const status = this.filterStatus();

    if (date === 'TODAY') {
      list = list.filter(p => p.scheduledFulfillmentDate === '2026-11-11');
    } else if (date === 'TOMORROW') {
      list = list.filter(p => p.scheduledFulfillmentDate === '2026-11-12');
    }

    if (status !== 'ALL') {
      list = list.filter(p => p.status === status);
    }

    return list;
  });

  readonly totalPreorderValuePaise = computed(() => {
    return this.filteredPreorders().reduce((sum, p) => sum + p.totalAmountPaise, 0);
  });

  setDateFilter(date: string): void {
    this.filterDate.set(date);
  }

  setStatusFilter(status: string): void {
    this.filterStatus.set(status);
  }

  advancePreorderStatus(orderId: string): void {
    const nextMap: Record<PreorderStatus, PreorderStatus> = {
      'CONFIRMED': 'IN_PREPARATION',
      'IN_PREPARATION': 'READY_FOR_PICKUP',
      'READY_FOR_PICKUP': 'COLLECTED',
      'COLLECTED': 'COLLECTED',
      'CANCELLED': 'CANCELLED'
    };

    this.preorders.update(list =>
      list.map(p => {
        if (p.orderId !== orderId) return p;
        return {
          ...p,
          status: nextMap[p.status]
        };
      })
    );
  }
}
