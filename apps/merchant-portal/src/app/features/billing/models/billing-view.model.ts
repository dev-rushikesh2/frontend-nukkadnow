export interface GstInvoice {
  invoiceNumber: string;
  period: string; // e.g. "October 2026"
  invoiceDate: string;
  merchantGstin: string;
  platformHsn: string;
  subtotalPaise: number;
  cgstPaise: number; // 9%
  sgstPaise: number; // 9%
  totalPaise: number;
  paymentStatus: 'PAID' | 'PENDING';
}

export interface SettlementPayout {
  utrNumber: string;
  settlementDate: string;
  orderCount: number;
  grossOrdersPaise: number;
  platformFeeDeductedPaise: number;
  netCreditedPaise: number;
  bankAccountMasked: string;
  status: 'SETTLED' | 'PROCESSING';
}

export type BillingViewModel = any;
