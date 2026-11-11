import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BillingStore } from '../state/billing.store';
import { GstInvoice } from '../models/billing-view.model';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-billing-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './billing-list.page.html',
  styleUrls: ['./billing-list.page.scss'],
  providers: [BillingStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BillingListPageComponent {
  readonly store = inject(BillingStore);

  formatPrice(paise: number): string {
    return '₹' + (paise / 100).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  download(inv: GstInvoice): void {
    this.store.downloadInvoicePdf(inv);
  }
}
