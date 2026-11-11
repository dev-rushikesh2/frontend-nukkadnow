import { Injectable, signal, computed } from '@angular/core';
import { BatchViewModel, BatchStatus } from '../models/batches-view.model';

const INITIAL_BATCHES: BatchViewModel[] = [
  {
    id: 'batch-001',
    batchName: 'Evening Fresh Tarri Poha & Samosas',
    productName: 'Nagpur Tarri Poha (Special Plate)',
    productId: 'p-101',
    productionDate: '2026-11-11',
    readyTime: '17:00',
    cutoffTime: '16:15',
    totalCapacityUnits: 60,
    bookedUnits: 48,
    unitPricePaise: 4000, // ₹40
    status: 'OPEN_FOR_ORDERS',
    preorders: [
      { orderId: '#NK-2001', customerName: 'Sameer D.', quantity: 4, paymentStatus: 'PAID', pickupSlot: '05:00 PM' },
      { orderId: '#NK-2004', customerName: 'Priya K.', quantity: 6, paymentStatus: 'PAID', pickupSlot: '05:15 PM' },
      { orderId: '#NK-2009', customerName: 'Rohan M.', quantity: 12, paymentStatus: 'PAID', pickupSlot: '05:00 PM' }
    ],
    instructions: 'Extra chopped onions & fresh sev topping separated.'
  },
  {
    id: 'batch-002',
    batchName: 'Diwali Besan Ladoo Pure Desi Ghee',
    productName: 'Desi Ghee Besan Ladoo (1kg Box)',
    productId: 'p-102',
    productionDate: '2026-11-12',
    readyTime: '11:00',
    cutoffTime: '08:00',
    totalCapacityUnits: 40,
    bookedUnits: 40,
    unitPricePaise: 45000, // ₹450
    status: 'CUTOFF_REACHED',
    preorders: [
      { orderId: '#NK-2015', customerName: 'Sunita P.', quantity: 5, paymentStatus: 'PAID', pickupSlot: '11:30 AM' },
      { orderId: '#NK-2020', customerName: 'Amit V.', quantity: 10, paymentStatus: 'PAID', pickupSlot: '12:00 PM' }
    ],
    instructions: 'Packed in gift boxes with foil wrap.'
  },
  {
    id: 'batch-003',
    batchName: 'Morning Artisan Sourdough Batch',
    productName: 'Country Sourdough Loaf (450g)',
    productId: 'p-103',
    productionDate: '2026-11-13',
    readyTime: '08:00',
    cutoffTime: '20:00', // Previous evening 8 PM
    totalCapacityUnits: 25,
    bookedUnits: 14,
    unitPricePaise: 18000, // ₹180
    status: 'SCHEDULED',
    preorders: [
      { orderId: '#NK-2032', customerName: 'Vikram S.', quantity: 2, paymentStatus: 'PAID', pickupSlot: '08:30 AM' }
    ]
  }
];

@Injectable()
export class BatchesStore {
  readonly batches = signal<BatchViewModel[]>(INITIAL_BATCHES);
  readonly filter = signal<string>('ALL');

  readonly filteredBatches = computed(() => {
    const list = this.batches();
    const f = this.filter();
    if (f === 'ACTIVE') {
      return list.filter(b => b.status === 'OPEN_FOR_ORDERS' || b.status === 'PREPARING');
    }
    if (f === 'TODAY') {
      return list.filter(b => b.productionDate === '2026-11-11');
    }
    if (f === 'UPCOMING') {
      return list.filter(b => b.productionDate > '2026-11-11');
    }
    return list;
  });

  readonly totalPreorderValuePaise = computed(() => {
    return this.batches().reduce((sum, b) => sum + (b.bookedUnits * b.unitPricePaise), 0);
  });

  setFilter(f: string): void {
    this.filter.set(f);
  }

  addBatch(newBatch: Omit<BatchViewModel, 'id' | 'bookedUnits' | 'preorders' | 'status'>): void {
    const batch: BatchViewModel = {
      ...newBatch,
      id: `batch-${Date.now()}`,
      bookedUnits: 0,
      preorders: [],
      status: 'OPEN_FOR_ORDERS'
    };
    this.batches.update(list => [batch, ...list]);
  }

  addCapacity(batchId: string, extraUnits: number): void {
    this.batches.update(list =>
      list.map(b => b.id === batchId ? { ...b, totalCapacityUnits: b.totalCapacityUnits + extraUnits } : b)
    );
  }

  closeCutoffEarly(batchId: string): void {
    this.batches.update(list =>
      list.map(b => b.id === batchId ? { ...b, status: 'CUTOFF_REACHED' as BatchStatus } : b)
    );
  }

  advanceBatchStatus(batchId: string): void {
    const nextMap: Record<BatchStatus, BatchStatus> = {
      'SCHEDULED': 'OPEN_FOR_ORDERS',
      'OPEN_FOR_ORDERS': 'PREPARING',
      'CUTOFF_REACHED': 'PREPARING',
      'PREPARING': 'READY_FOR_PICKUP',
      'READY_FOR_PICKUP': 'COMPLETED',
      'COMPLETED': 'COMPLETED'
    };

    this.batches.update(list =>
      list.map(b => {
        if (b.id !== batchId) return b;
        return {
          ...b,
          status: nextMap[b.status]
        };
      })
    );
  }
}
