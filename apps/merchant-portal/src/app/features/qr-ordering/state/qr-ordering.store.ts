import { Injectable, signal, computed } from '@angular/core';
import { QrStandeeViewModel, QrStandeeType } from '../models/qr-ordering-view.model';
import { generateQrSvg } from '../utils/qr-svg-generator';

const BASE_URL = 'https://nukkadnow.in/m/shree-ram-sweets-dharampeth';

const INITIAL_STANDEES: QrStandeeViewModel[] = [
  {
    id: 'qr-counter-1',
    label: 'Main Billing Counter Standee',
    type: 'COUNTER',
    sourceTag: 'counter_main',
    targetUrl: `${BASE_URL}?source=counter_main`,
    qrSvgDataUri: generateQrSvg(`${BASE_URL}?source=counter_main`),
    scanCount: 342,
    orderCount: 189,
    isActive: true,
    lastScannedAt: '10 mins ago'
  },
  {
    id: 'qr-window-1',
    label: 'Storefront Window Poster',
    type: 'WINDOW',
    sourceTag: 'window_poster',
    targetUrl: `${BASE_URL}?source=window_poster`,
    qrSvgDataUri: generateQrSvg(`${BASE_URL}?source=window_poster`),
    scanCount: 128,
    orderCount: 42,
    isActive: true,
    lastScannedAt: '45 mins ago'
  },
  {
    id: 'qr-table-1',
    label: 'Table #1 Dine-in Tent Card',
    type: 'TABLE',
    tableNumber: 1,
    sourceTag: 'table_1',
    targetUrl: `${BASE_URL}?source=table_1`,
    qrSvgDataUri: generateQrSvg(`${BASE_URL}?source=table_1`),
    scanCount: 88,
    orderCount: 56,
    isActive: true,
    lastScannedAt: '12 mins ago'
  },
  {
    id: 'qr-table-2',
    label: 'Table #2 Dine-in Tent Card',
    type: 'TABLE',
    tableNumber: 2,
    sourceTag: 'table_2',
    targetUrl: `${BASE_URL}?source=table_2`,
    qrSvgDataUri: generateQrSvg(`${BASE_URL}?source=table_2`),
    scanCount: 94,
    orderCount: 61,
    isActive: true,
    lastScannedAt: '5 mins ago'
  }
];

@Injectable()
export class QrOrderingStore {
  readonly standees = signal<QrStandeeViewModel[]>(INITIAL_STANDEES);
  readonly merchantName = signal<string>('Shree Ram Sweets & Farsan');
  readonly locality = signal<string>('Dharampeth, Nagpur');
  readonly merchantSlug = signal<string>('shree-ram-sweets-dharampeth');
  readonly selectedForPrint = signal<QrStandeeViewModel | null>(null);

  readonly totalScans = computed(() => {
    return this.standees().reduce((sum, s) => sum + s.scanCount, 0);
  });

  readonly totalQrOrders = computed(() => {
    return this.standees().reduce((sum, s) => sum + s.orderCount, 0);
  });

  readonly tableStandees = computed(() => {
    return this.standees().filter(s => s.type === 'TABLE');
  });

  readonly counterStandees = computed(() => {
    return this.standees().filter(s => s.type !== 'TABLE');
  });

  addStandee(label: string, type: QrStandeeType, tableNum?: number): void {
    const sourceTag = type === 'TABLE' ? `table_${tableNum}` : `${type.toLowerCase()}_${Date.now() % 1000}`;
    const targetUrl = `${BASE_URL}?source=${sourceTag}`;
    const newStandee: QrStandeeViewModel = {
      id: `qr-${Date.now()}`,
      label,
      type,
      tableNumber: tableNum,
      sourceTag,
      targetUrl,
      qrSvgDataUri: generateQrSvg(targetUrl),
      scanCount: 0,
      orderCount: 0,
      isActive: true
    };
    this.standees.update(list => [...list, newStandee]);
  }

  addTableBatch(start: number, end: number): void {
    const newItems: QrStandeeViewModel[] = [];
    for (let i = start; i <= end; i++) {
      const sourceTag = `table_${i}`;
      const targetUrl = `${BASE_URL}?source=${sourceTag}`;
      newItems.push({
        id: `qr-table-${i}-${Date.now()}`,
        label: `Table #${i} Tent Card`,
        type: 'TABLE',
        tableNumber: i,
        sourceTag,
        targetUrl,
        qrSvgDataUri: generateQrSvg(targetUrl),
        scanCount: 0,
        orderCount: 0,
        isActive: true
      });
    }
    this.standees.update(list => [...list, ...newItems]);
  }

  toggleActive(id: string): void {
    this.standees.update(list =>
      list.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s)
    );
  }

  deleteStandee(id: string): void {
    this.standees.update(list => list.filter(s => s.id !== id));
  }

  setPrintModal(standee: QrStandeeViewModel | null): void {
    this.selectedForPrint.set(standee);
  }
}
