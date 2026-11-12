import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export interface OrderItemDetail {
  id: string;
  name: string;
  emoji: string;
  variant: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  instructions?: string;
}

export interface DetailedOrder {
  id: string;
  orderNumber: string;
  receivedTime: string;
  status: 'New' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled';
  customerName: string;
  customerPhone: string;
  fulfillmentType: 'Home Delivery' | 'Self Pickup';
  deliveryAddress?: string;
  distance?: string;
  estimatedTime?: string;
  paymentMode: string;
  paymentRef: string;
  items: OrderItemDetail[];
  itemTotal: number;
  deliveryFee: number;
  packagingFee: number;
  tax: number;
  discount: number;
  grandTotal: number;
  customerNote?: string;
  token: string;
}

@Component({
  selector: 'merchant-order-detail-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="order-detail-viewport">
      <!-- Back & Actions Bar -->
      <nav class="detail-top-nav">
        <button type="button" class="back-link" (click)="goBack()">
          <svg viewBox="0 0 24 24" class="back-svg" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          <span>Back to Live Orders</span>
        </button>

        <div class="top-nav-actions">
          <button type="button" class="btn-print" (click)="printKOT()">
            <svg viewBox="0 0 24 24" class="btn-svg" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            <span>Print Bill / KOT</span>
          </button>
        </div>
      </nav>

      <!-- Order Title & Status Banner -->
      <header class="order-header-banner">
        <div class="header-left">
          <div class="header-title-row">
            <h1 class="order-title">Order {{ currentOrder().orderNumber }}</h1>
            <span class="status-pill" [class]="currentOrder().status.toLowerCase()">
              {{ currentOrder().status }}
            </span>
          </div>
          <p class="order-placed-time">Placed on {{ currentOrder().receivedTime }} • Via NukkadNow Marketplace</p>
        </div>

        <div class="header-right">
          <span class="grand-total-highlight">₹{{ currentOrder().grandTotal }}</span>
          <span class="payment-confirmed-tag">✓ {{ currentOrder().paymentMode }}</span>
        </div>
      </header>

      <!-- Main 2-Column Responsive Grid -->
      <div class="order-grid">
        <!-- LEFT COLUMN: Customer, Delivery, Items, Bill -->
        <main class="grid-main-col">
          <!-- 1. Customer Information Card -->
          <section class="detail-card">
            <h2 class="card-heading">
              <svg viewBox="0 0 24 24" class="heading-svg" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              Customer Details
            </h2>

            <div class="customer-profile-box">
              <div class="customer-meta">
                <div class="cust-avatar-large">{{ currentOrder().customerName.charAt(0) }}</div>
                <div class="cust-details">
                  <strong class="cust-name-lg">{{ currentOrder().customerName }}</strong>
                  <span class="cust-phone-lg">{{ currentOrder().customerPhone }}</span>
                </div>
              </div>

              <div class="customer-contact-actions">
                <a [href]="'tel:' + currentOrder().customerPhone" class="btn-contact-call">
                  <svg viewBox="0 0 24 24" class="contact-svg" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call
                </a>
                <button type="button" class="btn-contact-chat" (click)="openChat()">
                  <svg viewBox="0 0 24 24" class="contact-svg" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                  </svg>
                  Chat
                </button>
              </div>
            </div>
          </section>

          <!-- 2. Delivery / Address Card -->
          <section class="detail-card">
            <h2 class="card-heading">
              <svg viewBox="0 0 24 24" class="heading-svg" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              Fulfilment & Delivery
            </h2>

            <div class="delivery-details-box">
              <div class="delivery-mode-pill" [class.pickup]="currentOrder().fulfillmentType === 'Self Pickup'">
                {{ currentOrder().fulfillmentType }}
              </div>

              @if (currentOrder().deliveryAddress) {
                <div class="address-row">
                  <p class="address-text">{{ currentOrder().deliveryAddress }}</p>
                  <div class="distance-est-row">
                    <span class="dist-tag">📍 {{ currentOrder().distance }}</span>
                    <span class="est-tag">⏱️ Est. {{ currentOrder().estimatedTime }}</span>
                  </div>
                </div>

                <button type="button" class="btn-maps-link" (click)="openMaps()">
                  <svg viewBox="0 0 24 24" class="btn-svg" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                    <line x1="8" y1="2" x2="8" y2="18"/>
                    <line x1="16" y1="6" x2="16" y2="22"/>
                  </svg>
                  Open in Google Maps
                </button>
              } @else {
                <p class="pickup-notice">Customer will collect the package directly at the shop counter.</p>
              }
            </div>
          </section>

          <!-- 3. Order Items List -->
          <section class="detail-card">
            <div class="card-heading-row">
              <h2 class="card-heading">
                <svg viewBox="0 0 24 24" class="heading-svg" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Order Items ({{ currentOrder().items.length }})
              </h2>
              <span class="items-total-pill">{{ currentOrder().items.length }} Items</span>
            </div>

            <div class="items-table">
              @for (item of currentOrder().items; track item.id) {
                <div class="order-item-row">
                  <div class="item-emoji-box">{{ item.emoji }}</div>
                  <div class="item-info">
                    <strong class="item-name">{{ item.name }}</strong>
                    <span class="item-variant">{{ item.variant }} • ₹{{ item.unitPrice }}</span>
                    @if (item.instructions) {
                      <div class="item-note-callout">
                        <span>💬 "{{ item.instructions }}"</span>
                      </div>
                    }
                  </div>
                  <div class="item-qty-total">
                    <span class="qty-pill">{{ item.quantity }}x</span>
                    <strong class="item-line-price">₹{{ item.totalPrice }}</strong>
                  </div>
                </div>
              }
            </div>

            <!-- Customer Special Instructions -->
            @if (currentOrder().customerNote) {
              <div class="special-instructions-banner">
                <svg viewBox="0 0 24 24" class="note-svg" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div class="note-content">
                  <strong>Customer Instructions:</strong>
                  <p>"{{ currentOrder().customerNote }}"</p>
                </div>
              </div>
            }
          </section>

          <!-- 4. Bill Details Breakdown -->
          <section class="detail-card">
            <h2 class="card-heading">Bill Breakdown</h2>

            <div class="bill-breakdown-list">
              <div class="bill-line">
                <span>Items Subtotal</span>
                <span>₹{{ currentOrder().itemTotal }}</span>
              </div>
              <div class="bill-line">
                <span>Delivery Partner Fee</span>
                <span>₹{{ currentOrder().deliveryFee }}</span>
              </div>
              <div class="bill-line">
                <span>Eco Packaging Charges</span>
                <span>₹{{ currentOrder().packagingFee }}</span>
              </div>
              <div class="bill-line">
                <span>Taxes & GST (5%)</span>
                <span>₹{{ currentOrder().tax }}</span>
              </div>
              @if (currentOrder().discount > 0) {
                <div class="bill-line discount">
                  <span>Merchant Promo Discount</span>
                  <span>-₹{{ currentOrder().discount }}</span>
                </div>
              }
              <div class="bill-line total">
                <strong>Grand Total</strong>
                <strong>₹{{ currentOrder().grandTotal }}</strong>
              </div>
            </div>

            <div class="payment-confirmed-footer">
              <svg viewBox="0 0 24 24" class="check-verified-svg" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span>{{ currentOrder().paymentMode }} Confirmed • Ref: {{ currentOrder().paymentRef }}</span>
            </div>
          </section>
        </main>

        <!-- RIGHT COLUMN: Token, Audit Timeline, Internal Notes & Primary Actions -->
        <aside class="grid-side-col">
          <!-- 1. Customer Pickup / Delivery Token Verification -->
          <div class="detail-card token-verify-card">
            <h2 class="card-heading">Customer Token Verification</h2>
            <p class="token-helper-text">Verify the 4-digit code provided by the customer or delivery rider.</p>

            @if (isTokenVerified()) {
              <div class="token-verified-state">
                <svg viewBox="0 0 24 24" class="token-check-svg" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <strong>Token Verified Successfully!</strong>
                <p>Order is authorized for customer pickup / dispatch.</p>
              </div>
            } @else {
              <div class="token-input-group">
                <input 
                  type="text" 
                  maxlength="4" 
                  class="token-pin-input" 
                  placeholder="e.g. 7829"
                  [ngModel]="enteredToken()"
                  (ngModelChange)="enteredToken.set($event)" />
                <button type="button" class="btn-verify-token" (click)="verifyToken()">
                  Verify
                </button>
              </div>
              @if (tokenError()) {
                <span class="token-error-text">{{ tokenError() }}</span>
              }
            }
          </div>

          <!-- 2. Staff Internal Notes -->
          <div class="detail-card internal-notes-card">
            <h2 class="card-heading">Kitchen & Staff Notes</h2>
            <p class="notes-hint">Private notes visible only to your shop staff.</p>

            <div class="notes-bubbles-list">
              @for (note of staffNotes(); track note) {
                <div class="note-bubble">
                  <span>📌 {{ note }}</span>
                </div>
              }
            </div>

            <div class="add-note-row">
              <input 
                type="text" 
                class="note-input" 
                placeholder="Add private note..." 
                [ngModel]="newNote()"
                (ngModelChange)="newNote.set($event)"
                (keyup.enter)="addStaffNote()" />
              <button type="button" class="btn-add-note" (click)="addStaffNote()">Add</button>
            </div>
          </div>

          <!-- 3. Audit Timeline -->
          <div class="detail-card timeline-card">
            <h2 class="card-heading">Order Timeline</h2>

            <div class="audit-timeline">
              <div class="timeline-step done">
                <div class="timeline-dot">✓</div>
                <div class="timeline-content">
                  <strong>Order Received</strong>
                  <span class="time-stamp">10:24 AM • Customer placed order</span>
                </div>
              </div>

              <div class="timeline-step" [class.done]="currentOrder().status !== 'New'">
                <div class="timeline-dot">
                  @if (currentOrder().status !== 'New') { ✓ } @else { 2 }
                </div>
                <div class="timeline-content">
                  <strong>Accepted & Kitchen Prep</strong>
                  <span class="time-stamp">
                    {{ currentOrder().status !== 'New' ? '10:26 AM • In kitchen preparation' : 'Waiting for shop acceptance' }}
                  </span>
                </div>
              </div>

              <div class="timeline-step" [class.done]="currentOrder().status === 'Ready' || currentOrder().status === 'Completed'">
                <div class="timeline-dot">
                  @if (currentOrder().status === 'Ready' || currentOrder().status === 'Completed') { ✓ } @else { 3 }
                </div>
                <div class="timeline-content">
                  <strong>Packed & Ready</strong>
                  <span class="time-stamp">Ready at pickup station</span>
                </div>
              </div>

              <div class="timeline-step" [class.done]="currentOrder().status === 'Completed'">
                <div class="timeline-dot">
                  @if (currentOrder().status === 'Completed') { ✓ } @else { 4 }
                </div>
                <div class="timeline-content">
                  <strong>Completed / Handed Over</strong>
                  <span class="time-stamp">Delivered to customer</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Sticky Primary Action Bar -->
          <div class="detail-card action-cta-card">
            @if (currentOrder().status === 'New') {
              <button type="button" class="btn-action-primary emerald" (click)="updateStatus('Preparing')">
                <svg viewBox="0 0 24 24" class="btn-svg" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Accept Order (Start Prep)
              </button>
              <button type="button" class="btn-action-secondary red" (click)="updateStatus('Cancelled')">
                Reject Order
              </button>
            } @else if (currentOrder().status === 'Preparing') {
              <button type="button" class="btn-action-primary purple" (click)="updateStatus('Ready')">
                Mark Order Ready for Pickup
              </button>
            } @else if (currentOrder().status === 'Ready') {
              <button type="button" class="btn-action-primary emerald" (click)="updateStatus('Completed')">
                Complete Handover
              </button>
            } @else {
              <div class="order-finished-badge">
                <span>✓ Order {{ currentOrder().status }}</span>
              </div>
            }
          </div>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .order-detail-viewport {
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 2.5vw, 24px);
      width: 100%;
    }

    /* Top Nav */
    .detail-top-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: #6D28D9;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      padding: 0;

      &:hover {
        color: #4C1D95;
      }
    }

    .back-svg {
      width: 18px;
      height: 18px;
    }

    .btn-print {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #FFFFFF;
      border: 1.5px solid #CBD5E1;
      padding: 8px 14px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      color: #334155;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #F8FAFC;
        border-color: #94A3B8;
      }
    }

    .btn-svg {
      width: 16px;
      height: 16px;
    }

    /* Order Header Banner */
    .order-header-banner {
      background: #FFFFFF;
      border: 1.5px solid #EDE9FE;
      border-radius: 16px;
      padding: clamp(16px, 2.5vw, 24px);
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: 0 2px 8px rgba(109, 40, 217, 0.04);

      @media (min-width: 600px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .header-title-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .order-title {
      font-size: clamp(20px, 3vw, 26px);
      font-weight: 800;
      color: #1E1B4B;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .status-pill {
      font-size: 12px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 999px;
      text-transform: uppercase;

      &.new { background: #FFEDD5; color: #EA580C; }
      &.preparing { background: #EDE9FE; color: #6D28D9; }
      &.ready { background: #E0F2FE; color: #0284C7; }
      &.completed { background: #ECFDF5; color: #10B981; }
      &.cancelled { background: #FEF2F2; color: #DC2626; }
    }

    .order-placed-time {
      font-size: 13px;
      color: #64748B;
      margin: 4px 0 0;
    }

    .header-right {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      @media (min-width: 600px) {
        align-items: flex-end;
      }
    }

    .grand-total-highlight {
      font-size: clamp(22px, 3.5vw, 28px);
      font-weight: 800;
      color: #1E1B4B;
    }

    .payment-confirmed-tag {
      font-size: 12px;
      font-weight: 700;
      color: #10B981;
    }

    /* Grid Layout */
    .order-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: clamp(16px, 2.5vw, 24px);

      @media (min-width: 992px) {
        grid-template-columns: 1fr 380px;
      }
    }

    .grid-main-col,
    .grid-side-col {
      display: flex;
      flex-direction: column;
      gap: clamp(16px, 2.5vw, 20px);
    }

    /* Detail Card */
    .detail-card {
      background: #FFFFFF;
      border: 1.5px solid #EDE9FE;
      border-radius: 16px;
      padding: clamp(16px, 2vw, 20px);
      box-shadow: 0 1px 4px rgba(109, 40, 217, 0.03);
    }

    .card-heading {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      font-weight: 800;
      color: #1E1B4B;
      margin: 0 0 16px;
    }

    .heading-svg {
      width: 18px;
      height: 18px;
      color: #6D28D9;
    }

    .card-heading-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;

      .card-heading {
        margin: 0;
      }
    }

    .items-total-pill {
      font-size: 12px;
      font-weight: 700;
      background: #EDE9FE;
      color: #6D28D9;
      padding: 3px 8px;
      border-radius: 6px;
    }

    /* Customer Profile */
    .customer-profile-box {
      display: flex;
      flex-direction: column;
      gap: 14px;

      @media (min-width: 480px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .customer-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .cust-avatar-large {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #6D28D9;
      color: #FFFFFF;
      font-size: 18px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .cust-details {
      display: flex;
      flex-direction: column;
    }

    .cust-name-lg {
      font-size: 15px;
      color: #1E1B4B;
    }

    .cust-phone-lg {
      font-size: 13px;
      color: #64748B;
    }

    .customer-contact-actions {
      display: flex;
      gap: 8px;
    }

    .btn-contact-call,
    .btn-contact-chat {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      text-decoration: none;
      transition: all 0.2s;
    }

    .btn-contact-call {
      background: #ECFDF5;
      color: #059669;
      border: 1px solid #A7F3D0;

      &:hover {
        background: #D1FAE5;
      }
    }

    .btn-contact-chat {
      background: #EDE9FE;
      color: #6D28D9;
      border: 1px solid #DDD6FE;

      &:hover {
        background: #DDD6FE;
      }
    }

    .contact-svg {
      width: 15px;
      height: 15px;
    }

    /* Delivery Box */
    .delivery-details-box {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .delivery-mode-pill {
      align-self: flex-start;
      font-size: 12px;
      font-weight: 700;
      background: #E0F2FE;
      color: #0284C7;
      padding: 3px 8px;
      border-radius: 6px;

      &.pickup {
        background: #F3E8FF;
        color: #7E22CE;
      }
    }

    .address-text {
      font-size: 14px;
      color: #334155;
      line-height: 1.5;
      margin: 0;
    }

    .distance-est-row {
      display: flex;
      gap: 12px;
      margin-top: 6px;
    }

    .dist-tag,
    .est-tag {
      font-size: 12px;
      font-weight: 600;
      color: #64748B;
      background: #F1F5F9;
      padding: 2px 8px;
      border-radius: 6px;
    }

    .btn-maps-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      color: #6D28D9;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      padding: 0;
      margin-top: 4px;

      &:hover {
        text-decoration: underline;
      }
    }

    .pickup-notice {
      font-size: 13px;
      color: #64748B;
      margin: 0;
    }

    /* Items Table */
    .items-table {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .order-item-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding-bottom: 12px;
      border-bottom: 1px solid #F1F5F9;

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    .item-emoji-box {
      font-size: 24px;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      background: #F8FAFC;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .item-name {
      font-size: 14px;
      color: #1E1B4B;
    }

    .item-variant {
      font-size: 12px;
      color: #64748B;
    }

    .item-note-callout {
      font-size: 11px;
      font-style: italic;
      color: #B45309;
      background: #FEF3C7;
      padding: 2px 6px;
      border-radius: 4px;
      margin-top: 4px;
    }

    .item-qty-total {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
    }

    .qty-pill {
      font-size: 11px;
      font-weight: 700;
      background: #FF5A1F;
      color: #FFFFFF;
      padding: 1px 6px;
      border-radius: 4px;
    }

    .item-line-price {
      font-size: 14px;
      color: #1E1B4B;
    }

    .special-instructions-banner {
      display: flex;
      gap: 10px;
      background: #FFFBEB;
      border-left: 3px solid #F59E0B;
      padding: 12px;
      border-radius: 8px;
      margin-top: 16px;
    }

    .note-svg {
      width: 18px;
      height: 18px;
      color: #D97706;
      flex-shrink: 0;
      margin-top: 2px;
    }

    .note-content {
      font-size: 13px;
      color: #78350F;

      p {
        margin: 2px 0 0;
      }
    }

    /* Bill Breakdown */
    .bill-breakdown-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-bottom: 12px;
      border-bottom: 1px solid #F1F5F9;
    }

    .bill-line {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #475569;

      &.discount {
        color: #10B981;
        font-weight: 600;
      }

      &.total {
        font-size: 16px;
        color: #1E1B4B;
        border-top: 1.5px dashed #E2E8F0;
        padding-top: 8px;
        margin-top: 4px;
      }
    }

    .payment-confirmed-footer {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 12px;
      font-size: 12px;
      font-weight: 600;
      color: #10B981;
    }

    .check-verified-svg {
      width: 16px;
      height: 16px;
    }

    /* Token Card */
    .token-verify-card {
      background: #FAF5FF;
      border-color: #DDD6FE;
    }

    .token-helper-text {
      font-size: 13px;
      color: #64748B;
      margin: 0 0 12px;
    }

    .token-input-group {
      display: flex;
      gap: 8px;
    }

    .token-pin-input {
      flex: 1;
      padding: 10px;
      border: 2px solid #CBD5E1;
      border-radius: 10px;
      font-size: 18px;
      font-weight: 800;
      text-align: center;
      letter-spacing: 4px;
      outline: none;

      &:focus {
        border-color: #6D28D9;
      }
    }

    .btn-verify-token {
      padding: 10px 18px;
      background: #6D28D9;
      color: #FFFFFF;
      border: none;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background: #5B21B6;
      }
    }

    .token-error-text {
      font-size: 12px;
      color: #DC2626;
      margin-top: 6px;
      display: block;
    }

    .token-verified-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 14px;
      background: #ECFDF5;
      border-radius: 10px;
      color: #065F46;

      strong {
        font-size: 14px;
        margin-top: 6px;
      }

      p {
        font-size: 12px;
        margin: 2px 0 0;
      }
    }

    .token-check-svg {
      width: 28px;
      height: 28px;
      color: #10B981;
    }

    /* Internal Notes */
    .notes-hint {
      font-size: 12px;
      color: #94A3B8;
      margin: 0 0 10px;
    }

    .notes-bubbles-list {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 12px;
    }

    .note-bubble {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      padding: 6px 10px;
      border-radius: 8px;
      font-size: 12px;
      color: #334155;
    }

    .add-note-row {
      display: flex;
      gap: 8px;
    }

    .note-input {
      flex: 1;
      padding: 8px 12px;
      border: 1.5px solid #E2E8F0;
      border-radius: 8px;
      font-size: 13px;
      outline: none;

      &:focus {
        border-color: #6D28D9;
      }
    }

    .btn-add-note {
      padding: 8px 14px;
      background: #EDE9FE;
      color: #6D28D9;
      border: none;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background: #DDD6FE;
      }
    }

    /* Timeline */
    .audit-timeline {
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
    }

    .timeline-step {
      display: flex;
      gap: 12px;
      align-items: flex-start;
    }

    .timeline-dot {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: #E2E8F0;
      color: #64748B;
      font-size: 11px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 1px;
    }

    .timeline-step.done {
      .timeline-dot {
        background: #10B981;
        color: #FFFFFF;
      }
      .timeline-content strong {
        color: #1E1B4B;
      }
    }

    .timeline-content {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 13px;
        color: #94A3B8;
      }

      .time-stamp {
        font-size: 11px;
        color: #94A3B8;
      }
    }

    /* Action CTA Card */
    .action-cta-card {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .btn-action-primary {
      width: 100%;
      padding: 12px;
      border-radius: 12px;
      border: none;
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: opacity 0.2s;

      &.emerald { background: #10B981; &:hover { background: #059669; } }
      &.purple { background: #6D28D9; &:hover { background: #5B21B6; } }
    }

    .btn-action-secondary {
      width: 100%;
      padding: 10px;
      border-radius: 12px;
      border: 1.5px solid #FCA5A5;
      background: #FEF2F2;
      color: #DC2626;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background: #FEE2E2;
      }
    }

    .order-finished-badge {
      text-align: center;
      padding: 12px;
      background: #ECFDF5;
      color: #059669;
      font-size: 14px;
      font-weight: 700;
      border-radius: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderDetailPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly orderId = signal<string>(this.route.snapshot.paramMap.get('id') || 'ORD78291');

  readonly currentOrder = signal<DetailedOrder>({
    id: 'ord-101',
    orderNumber: '#ORD78291',
    receivedTime: 'Today, 10:24 AM',
    status: 'New',
    customerName: 'Rahul Deshmukh',
    customerPhone: '+91 98765 43210',
    fulfillmentType: 'Home Delivery',
    deliveryAddress: 'Flat 402, Green Glen Layout, Outer Ring Road, Bellandur, Bengaluru - 560103',
    distance: '3.2 km',
    estimatedTime: '25 mins',
    paymentMode: 'UPI (GPay)',
    paymentRef: 'UPI-983749281744',
    token: '7829',
    customerNote: 'Please ensure milk pouch is refrigerated and ring the bell twice.',
    itemTotal: 490,
    deliveryFee: 30,
    packagingFee: 15,
    tax: 25,
    discount: 20,
    grandTotal: 540,
    items: [
      { id: '1', name: 'Fresh Farm Cow Milk', emoji: '🥛', variant: '1 Litre Pouch', quantity: 2, unitPrice: 65, totalPrice: 130 },
      { id: '2', name: 'Organic Alphonso Mangoes', emoji: '🥭', variant: '1 kg Box', quantity: 1, unitPrice: 220, totalPrice: 220, instructions: 'Ensure fully ripe' },
      { id: '3', name: 'Whole Wheat Brown Bread', emoji: '🍞', variant: '400g Pack', quantity: 1, unitPrice: 50, totalPrice: 50 },
      { id: '4', name: 'Fresh Coriander Bunch', emoji: '🌿', variant: '100g', quantity: 2, unitPrice: 20, totalPrice: 40 },
      { id: '5', name: 'Brown Eggs (Pack of 6)', emoji: '🥚', variant: '6 pcs tray', quantity: 1, unitPrice: 50, totalPrice: 50 }
    ]
  });

  readonly enteredToken = signal<string>('');
  readonly isTokenVerified = signal<boolean>(false);
  readonly tokenError = signal<string | null>(null);

  readonly staffNotes = signal<string[]>([
    'Customer requested chilled milk from the back cooler.'
  ]);
  readonly newNote = signal<string>('');

  verifyToken() {
    if (this.enteredToken().trim() === this.currentOrder().token) {
      this.isTokenVerified.set(true);
      this.tokenError.set(null);
    } else {
      this.tokenError.set('Invalid 4-digit token. Expected: ' + this.currentOrder().token);
    }
  }

  addStaffNote() {
    const n = this.newNote().trim();
    if (n) {
      this.staffNotes.update(list => [...list, n]);
      this.newNote.set('');
    }
  }

  updateStatus(newStatus: 'New' | 'Preparing' | 'Ready' | 'Completed' | 'Cancelled') {
    this.currentOrder.update(o => ({ ...o, status: newStatus }));
  }

  printKOT() {
    window.print();
  }

  openMaps() {
    window.open('https://maps.google.com/?q=Bellandur+Bengaluru', '_blank');
  }

  openChat() {
    window.open('https://wa.me/919876543210', '_blank');
  }

  goBack() {
    this.router.navigate(['/order-inbox']);
  }
}
