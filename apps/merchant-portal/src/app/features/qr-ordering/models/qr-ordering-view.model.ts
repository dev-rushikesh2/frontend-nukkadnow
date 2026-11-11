export type QrStandeeType = 'COUNTER' | 'TABLE' | 'WINDOW' | 'CUSTOM';

export interface QrStandeeViewModel {
  id: string;
  label: string;
  type: QrStandeeType;
  tableNumber?: number;
  sourceTag: string;
  targetUrl: string;
  qrSvgDataUri: string;
  scanCount: number;
  orderCount: number;
  isActive: boolean;
  lastScannedAt?: string;
}

export interface StandeePrintTemplate {
  storeName: string;
  tagline: string;
  locality: string;
  tableLabel?: string;
  targetUrl: string;
  qrSvgDataUri: string;
}

export type QrOrderingViewModel = any;
