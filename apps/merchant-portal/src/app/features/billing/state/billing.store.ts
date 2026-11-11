import { Injectable, signal } from '@angular/core';
import { GstInvoice, SettlementPayout } from '../models/billing-view.model';
import { exportToCsv } from '../../analytics/utils/csv-exporter';

const INITIAL_INVOICES: GstInvoice[] = [
  {
    invoiceNumber: 'NNK-INV-2026-10-881',
    period: 'October 2026',
    invoiceDate: '2026-11-01',
    merchantGstin: '27AABCS1429B1Z2',
    platformHsn: '998314',
    subtotalPaise: 99900, // ₹999
    cgstPaise: 8991,     // ₹89.91 (9%)
    sgstPaise: 8991,     // ₹89.91 (9%)
    totalPaise: 117882,  // ₹1,178.82
    paymentStatus: 'PAID'
  },
  {
    invoiceNumber: 'NNK-INV-2026-09-540',
    period: 'September 2026',
    invoiceDate: '2026-10-01',
    merchantGstin: '27AABCS1429B1Z2',
    platformHsn: '998314',
    subtotalPaise: 99900,
    cgstPaise: 8991,
    sgstPaise: 8991,
    totalPaise: 117882,
    paymentStatus: 'PAID'
  },
  {
    invoiceNumber: 'NNK-INV-2026-08-204',
    period: 'August 2026',
    invoiceDate: '2026-09-01',
    merchantGstin: '27AABCS1429B1Z2',
    platformHsn: '998314',
    subtotalPaise: 99900,
    cgstPaise: 8991,
    sgstPaise: 8991,
    totalPaise: 117882,
    paymentStatus: 'PAID'
  }
];

const INITIAL_SETTLEMENTS: SettlementPayout[] = [
  {
    utrNumber: 'HDFC2026111000918',
    settlementDate: '2026-11-10',
    orderCount: 54,
    grossOrdersPaise: 1840000,
    platformFeeDeductedPaise: 36800,
    netCreditedPaise: 1803200,
    bankAccountMasked: 'HDFC Bank ••••••4102',
    status: 'SETTLED'
  },
  {
    utrNumber: 'HDFC2026110900344',
    settlementDate: '2026-11-09',
    orderCount: 62,
    grossOrdersPaise: 2120000,
    platformFeeDeductedPaise: 42400,
    netCreditedPaise: 2077600,
    bankAccountMasked: 'HDFC Bank ••••••4102',
    status: 'SETTLED'
  },
  {
    utrNumber: 'HDFC2026110800882',
    settlementDate: '2026-11-08',
    orderCount: 49,
    grossOrdersPaise: 1650000,
    platformFeeDeductedPaise: 33000,
    netCreditedPaise: 1617000,
    bankAccountMasked: 'HDFC Bank ••••••4102',
    status: 'SETTLED'
  }
];

@Injectable()
export class BillingStore {
  readonly invoices = signal<GstInvoice[]>(INITIAL_INVOICES);
  readonly settlements = signal<SettlementPayout[]>(INITIAL_SETTLEMENTS);
  readonly merchantGstin = signal<string>('27AABCS1429B1Z2');

  downloadInvoicePdf(inv: GstInvoice): void {
    const headers = ['Invoice Number', 'Period', 'Date', 'Merchant GSTIN', 'HSN Code', 'Subtotal (INR)', 'CGST 9% (INR)', 'SGST 9% (INR)', 'Total (INR)', 'Status'];
    const row = [
      inv.invoiceNumber,
      inv.period,
      inv.invoiceDate,
      inv.merchantGstin,
      inv.platformHsn,
      (inv.subtotalPaise / 100).toFixed(2),
      (inv.cgstPaise / 100).toFixed(2),
      (inv.sgstPaise / 100).toFixed(2),
      (inv.totalPaise / 100).toFixed(2),
      inv.paymentStatus
    ];
    exportToCsv(`tax_invoice_${inv.invoiceNumber}.csv`, headers, [row]);
  }
}
