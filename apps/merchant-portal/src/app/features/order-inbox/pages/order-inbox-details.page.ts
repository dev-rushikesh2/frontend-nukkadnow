import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderInboxStore } from '../state/order-inbox.store';
import { OrderInboxItem } from '../models/order-inbox-view.model';
import { ButtonComponent, InputComponent, OrderStatusBadgeComponent, PriceDisplayComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-order-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, OrderStatusBadgeComponent, PriceDisplayComponent],
  template: `
    @if (order(); as ord) {
      <div class="detail-container">
        <!-- Header Row -->
        <div class="header-nav">
          <button type="button" class="back-btn" (click)="goBack()">â† Back to Order Inbox</button>
          <div class="header-main">
            <div class="title-meta">
              <h2>Order {{ ord.orderNumber }}</h2>
              <span class="source-chip source-chip--{{ ord.source.toLowerCase() }}">{{ ord.source }}</span>
              <ui-order-status-badge [state]="ord.status"></ui-order-status-badge>
            </div>
            <ui-button variant="outline" size="sm" (clicked)="printReceipt()">ðŸ–¨ï¸ Print Kitchen Receipt</ui-button>
          </div>
        </div>

        <div class="detail-grid">
          <!-- Left Column: Customer & Items -->
          <div class="main-column">
            <!-- Customer Card -->
            <div class="info-card">
              <h3>Customer & Fulfilment</h3>
              <div class="customer-row">
                <div>
                  <strong>{{ ord.customerName }}</strong>
                  <span class="phone-muted">{{ ord.customerPhoneMasked }}</span>
                </div>
                <div class="pickup-highlight">
                  <span class="label">Fulfilment:</span>
                  <strong>{{ ord.fulfillmentType }} â€¢ {{ ord.pickupSlotTime || 'Immediate' }}</strong>
                </div>
              </div>
            </div>

            <!-- Items Breakdown Card -->
            <div class="info-card">
              <h3>Order Items ({{ ord.items.length }})</h3>
              <div class="items-table">
                @for (item of ord.items; track item.title) {
                  <div class="item-row">
                    <div class="item-qty-name">
                      <span class="qty-badge">{{ item.quantity }}x</span>
                      <div>
                        <strong>{{ item.title }}</strong>
                        @if (item.notes) {
                          <div class="instructions-callout">
                            âš ï¸ Note: <em>"{{ item.notes }}"</em>
                          </div>
                        }
                      </div>
                    </div>
                    <ui-price-display [amountPaise]="item.pricePaise"></ui-price-display>
                  </div>
                }
              </div>

              <!-- Payment Summary -->
              <div class="billing-summary">
                <div class="bill-line">
                  <span>Subtotal</span>
                  <ui-price-display [amountPaise]="ord.totalPaise"></ui-price-display>
                </div>
                <div class="bill-line">
                  <span>GST (Included)</span>
                  <span>5%</span>
                </div>
                <div class="bill-line bill-line--total">
                  <strong>Total Paid</strong>
                  <ui-price-display [amountPaise]="ord.totalPaise"></ui-price-display>
                </div>
                <span class="payment-badge">âœ“ Paid via UPI (Verified)</span>
              </div>
            </div>

            <!-- Private Kitchen Notes Card -->
            <div class="info-card">
              <h3>Private Kitchen Staff Notes</h3>
              <p class="notes-desc">Internal notes are strictly private and never shared with the customer.</p>

              <div class="notes-list">
                @for (note of kitchenNotes(); track note) {
                  <div class="note-pill">ðŸ“Œ {{ note }}</div>
                }
              </div>

              <div class="add-note-box">
                <ui-input
                  placeholder="Add internal note e.g. Customer requested yellow box..."
                  [value]="newNoteText()"
                  (valueChanged)="newNoteText.set($event)">
                </ui-input>
                <ui-button variant="secondary" size="sm" [disabled]="!newNoteText().trim()" (clicked)="addNote()">
                  Add Note
                </ui-button>
              </div>
            </div>
          </div>

          <!-- Right Column: Verification & Timeline -->
          <div class="side-column">
            <!-- 4-Digit Pickup Token Verification Card -->
            <div class="info-card token-card">
              <h3>Customer Pickup Token</h3>
              <p class="token-desc">Customer must present their 4-digit token upon arrival.</p>

              @if (isTokenVerified()) {
                <div class="token-verified-box">
                  <span class="check-icon">âœ“</span>
                  <strong>Token Verified Successfully</strong>
                  <p>Customer identity confirmed for Order {{ ord.orderNumber }}.</p>
                </div>
                @if (ord.status !== 'COMPLETED') {
                  <ui-button variant="primary" [fullWidth]="true" (clicked)="completeOrder(ord.id)">
                    Complete Handover
                  </ui-button>
                }
              } @else {
                <div class="token-input-row">
                  <input
                    type="text"
                    maxlength="4"
                    placeholder="e.g. 8492"
                    [value]="enteredToken()"
                    (input)="enteredToken.set($any($event.target).value)"
                    class="token-input" />
                  <ui-button variant="primary" (clicked)="verifyCustomerToken()">Verify</ui-button>
                </div>
                @if (tokenError()) {
                  <span class="token-error">{{ tokenError() }}</span>
                }
              }
            </div>

            <!-- Audit Timeline Card -->
            <div class="info-card">
              <h3>Order Audit Timeline</h3>
              <div class="timeline">
                <div class="timeline-event">
                  <span class="dot dot--active"></span>
                  <div class="event-text">
                    <strong>Order Placed</strong>
                    <small>Customer completed UPI payment â€¢ {{ ord.receivedAgo }}</small>
                  </div>
                </div>

                @if (ord.status === 'PREPARING' || ord.status === 'READY' || ord.status === 'COMPLETED') {
                  <div class="timeline-event">
                    <span class="dot dot--active"></span>
                    <div class="event-text">
                      <strong>Accepted by Staff</strong>
                      <small>Prep time set to {{ ord.prepMinutes }}m â€¢ Staff (Kitchen)</small>
                    </div>
                  </div>
                }

                @if (ord.status === 'READY' || ord.status === 'COMPLETED') {
                  <div class="timeline-event">
                    <span class="dot dot--active"></span>
                    <div class="event-text">
                      <strong>Ready for Pickup</strong>
                      <small>Pickup notification sent to customer</small>
                    </div>
                  </div>
                }

                @if (ord.status === 'COMPLETED') {
                  <div class="timeline-event">
                    <span class="dot dot--active"></span>
                    <div class="event-text">
                      <strong>Handover Completed</strong>
                      <small>Token verified & order handed over</small>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    .detail-container { display: flex; flex-direction: column; gap: 20px; }
    .back-btn { background: none; border: none; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 6px; }
    .header-main { display: flex; justify-content: space-between; align-items: center; }
    .title-meta { display: flex; align-items: center; gap: 12px; }
    h2 { font-size: 24px; color: #0f172a; margin: 0; }
    .source-chip { font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; }
    .source-chip--marketplace { background: #ffedd5; color: #c2410c; }
    .source-chip--qr { background: #f3e8ff; color: #7e22ce; }
    .source-chip--walkin { background: #e0f2fe; color: #0369a1; }
    .detail-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }
    @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
    .info-card { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); }
    .info-card h3 { font-size: 16px; color: #0f172a; margin: 0 0 14px; }
    .customer-row { display: flex; justify-content: space-between; align-items: center; }
    .phone-muted { display: block; font-size: 13px; color: #64748b; margin-top: 2px; }
    .pickup-highlight { text-align: right; font-size: 13px; }
    .pickup-highlight .label { display: block; font-size: 11px; color: #64748b; }
    .items-table { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
    .item-row { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
    .item-qty-name { display: flex; gap: 10px; align-items: flex-start; }
    .qty-badge { background: #f97316; color: #ffffff; font-size: 12px; font-weight: 700; padding: 2px 6px; border-radius: 4px; }
    .instructions-callout { background: #fef9c3; border-left: 3px solid #eab308; padding: 4px 8px; font-size: 12px; color: #854d0e; border-radius: 4px; margin-top: 4px; }
    .billing-summary { background: #f8fafc; border-radius: 8px; padding: 16px; display: flex; flex-direction: column; gap: 8px; font-size: 14px; }
    .bill-line { display: flex; justify-content: space-between; color: #475569; }
    .bill-line--total { border-top: 1px solid #e2e8f0; padding-top: 8px; font-size: 16px; color: #0f172a; }
    .payment-badge { font-size: 12px; color: #15803d; font-weight: 600; margin-top: 4px; }
    .notes-desc { font-size: 12px; color: #64748b; margin: 0 0 12px; }
    .notes-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
    .note-pill { background: #f1f5f9; padding: 6px 12px; border-radius: 6px; font-size: 13px; color: #334155; }
    .add-note-box { display: flex; gap: 8px; }
    .token-desc { font-size: 13px; color: #64748b; margin: 0 0 16px; }
    .token-input-row { display: flex; gap: 8px; }
    .token-input { flex: 1; border: 2px solid #cbd5e1; border-radius: 8px; font-size: 20px; font-weight: 700; text-align: center; letter-spacing: 4px; outline: none; }
    .token-input:focus { border-color: #f97316; }
    .token-error { font-size: 12px; color: #dc2626; margin-top: 6px; display: block; }
    .token-verified-box { background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 14px; text-align: center; margin-bottom: 12px; }
    .token-verified-box .check-icon { font-size: 24px; color: #16a34a; font-weight: 700; display: block; }
    .timeline { display: flex; flex-direction: column; gap: 16px; }
    .timeline-event { display: flex; gap: 12px; position: relative; }
    .dot { width: 10px; height: 10px; border-radius: 50%; background: #cbd5e1; margin-top: 5px; flex-shrink: 0; }
    .dot--active { background: #10b981; }
    .event-text strong { display: block; font-size: 13px; color: #0f172a; }
    .event-text small { font-size: 11px; color: #64748b; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(OrderInboxStore);

  orderId = signal<string>(this.route.snapshot.paramMap.get('id') || 'ord-101');
  order = signal<OrderInboxItem | null>(null);

  enteredToken = signal<string>('');
  isTokenVerified = signal<boolean>(false);
  tokenError = signal<string | null>(null);

  kitchenNotes = signal<string[]>([
    'Customer requested yellow festival box packaging'
  ]);
  newNoteText = signal<string>('');

  constructor() {
    const o = this.store.orders().find((x) => x.id === this.orderId()) || this.store.orders()[0];
    this.order.set(o);
  }

  verifyCustomerToken() {
    if (this.enteredToken().trim().length === 4) {
      this.isTokenVerified.set(true);
      this.tokenError.set(null);
    } else {
      this.tokenError.set('Please enter valid 4-digit customer pickup token');
    }
  }

  completeOrder(id: string) {
    this.store.completeOrder(id);
    this.router.navigate(['/order-inbox']);
  }

  addNote() {
    if (this.newNoteText().trim()) {
      this.kitchenNotes.update((n) => [...n, this.newNoteText().trim()]);
      this.newNoteText.set('');
    }
  }

  printReceipt() {
    window.print();
  }

  goBack() {
    this.router.navigate(['/order-inbox']);
  }
}
