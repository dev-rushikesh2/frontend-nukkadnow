import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, PriceDisplayComponent, DialogComponent } from '@nukkadnow/ui';

interface QuickProduct {
  id: string;
  title: string;
  pricePaise: number;
}

interface CartItem {
  product: QuickProduct;
  quantity: number;
}

@Component({
  selector: 'merchant-walkin-orders-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, PriceDisplayComponent, DialogComponent],
  template: `
    <div class="pos-container">
      <div class="pos-header">
        <h2>Counter Billing & Walk-In POS</h2>
        <span class="pos-locality">Nagpur Central Register</span>
      </div>

      <div class="pos-grid">
        <!-- Left: Quick-Tap Products -->
        <div class="products-panel">
          <h3>Quick-Tap Items</h3>
          <div class="tiles-grid">
            @for (p of quickProducts; track p.id) {
              <button type="button" class="product-tile" (click)="addToCart(p)">
                <span class="tile-title">{{ p.title }}</span>
                <span class="tile-price">â‚¹{{ (p.pricePaise / 100) }}</span>
              </button>
            }
          </div>
        </div>

        <!-- Right: Fast Cart -->
        <div class="cart-panel">
          <h3>Current Ticket</h3>

          <div class="cart-items-list">
            @for (item of cart(); track item.product.id) {
              <div class="cart-item-row">
                <div class="cart-item-info">
                  <strong>{{ item.product.title }}</strong>
                  <span>â‚¹{{ (item.product.pricePaise / 100) }} each</span>
                </div>

                <div class="qty-control">
                  <button type="button" (click)="decreaseQty(item.product.id)">-</button>
                  <span>{{ item.quantity }}</span>
                  <button type="button" (click)="increaseQty(item.product.id)">+</button>
                </div>
              </div>
            } @empty {
              <div class="empty-cart-msg">Tap products on the left to add to order.</div>
            }
          </div>

          <!-- Total & Actions -->
          <div class="cart-footer">
            <div class="total-row">
              <span>Total Payable:</span>
              <ui-price-display [amountPaise]="totalPaise()"></ui-price-display>
            </div>

            <div class="payment-method-selector">
              <label class="pay-opt">
                <input type="radio" name="pay" [checked]="paymentMode() === 'CASH'" (change)="paymentMode.set('CASH')" />
                <span>ðŸ’µ Cash</span>
              </label>
              <label class="pay-opt">
                <input type="radio" name="pay" [checked]="paymentMode() === 'UPI'" (change)="paymentMode.set('UPI')" />
                <span>ðŸ“± Counter UPI QR</span>
              </label>
            </div>

            <ui-button
              variant="primary"
              size="lg"
              [fullWidth]="true"
              [disabled]="cart().length === 0"
              (clicked)="generateBillAndToken()">
              Bill & Generate Token
            </ui-button>
          </div>
        </div>
      </div>

      <!-- Generated Token Success Modal -->
      <ui-dialog
        [isOpen]="isTokenSuccessOpen()"
        title="Walk-In Token Generated"
        (close)="isTokenSuccessOpen.set(false)">
        <div class="receipt-preview">
          <span class="ticket-header">NUKKADNOW COUNTER RECEIPT</span>
          <div class="huge-token">{{ lastIssuedToken() }}</div>
          <p>Please announce or display token for customer.</p>

          <div class="dialog-receipt-actions">
            <ui-button variant="outline" (clicked)="printReceipt()">ðŸ–¨ï¸ Print Receipt</ui-button>
            <ui-button variant="primary" (clicked)="isTokenSuccessOpen.set(false)">Next Customer</ui-button>
          </div>
        </div>
      </ui-dialog>
    </div>
  `,
  styles: [`
    .pos-container { display: flex; flex-direction: column; gap: 16px; }
    .pos-header { display: flex; justify-content: space-between; align-items: center; }
    h2 { font-size: 24px; color: #0f172a; margin: 0; }
    .pos-locality { font-size: 13px; color: #64748b; font-weight: 500; }
    .pos-grid { display: grid; grid-template-columns: 1fr 380px; gap: 20px; }
    @media (max-width: 900px) { .pos-grid { grid-template-columns: 1fr; } }
    .products-panel { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 20px; }
    .products-panel h3, .cart-panel h3 { font-size: 16px; color: #0f172a; margin: 0 0 16px; }
    .tiles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 12px; }
    .product-tile { background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 16px 12px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 6px; cursor: pointer; transition: all 150ms ease; }
    .product-tile:hover { border-color: #f97316; background: #fffaf5; transform: translateY(-2px); }
    .tile-title { font-size: 14px; font-weight: 700; color: #0f172a; }
    .tile-price { font-size: 13px; font-weight: 600; color: #f97316; }
    .cart-panel { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 20px; display: flex; flex-direction: column; }
    .cart-items-list { flex: 1; min-height: 250px; display: flex; flex-direction: column; gap: 10px; }
    .cart-item-row { display: flex; justify-content: space-between; align-items: center; padding: 10px; background: #f8fafc; border-radius: 8px; }
    .cart-item-info strong { display: block; font-size: 13px; color: #0f172a; }
    .cart-item-info span { font-size: 12px; color: #64748b; }
    .qty-control { display: flex; align-items: center; gap: 8px; }
    .qty-control button { width: 28px; height: 28px; border-radius: 6px; border: 1px solid #cbd5e1; background: #ffffff; font-weight: 700; cursor: pointer; }
    .qty-control span { font-size: 14px; font-weight: 700; width: 20px; text-align: center; }
    .empty-cart-msg { text-align: center; color: #94a3b8; padding: 48px 16px; font-size: 13px; }
    .cart-footer { border-top: 1.5px solid #f1f5f9; padding-top: 16px; display: flex; flex-direction: column; gap: 14px; }
    .total-row { display: flex; justify-content: space-between; align-items: center; font-size: 16px; font-weight: 700; color: #0f172a; }
    .payment-method-selector { display: flex; gap: 16px; }
    .pay-opt { display: flex; align-items: center; gap: 6px; font-size: 13px; cursor: pointer; }
    .receipt-preview { text-align: center; padding: 20px; }
    .ticket-header { font-size: 11px; font-weight: 700; letter-spacing: 1px; color: #64748b; }
    .huge-token { font-size: 54px; font-weight: 900; color: #f97316; margin: 12px 0; }
    .dialog-receipt-actions { display: flex; justify-content: center; gap: 12px; margin-top: 20px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalkinOrdersPageComponent {
  quickProducts: QuickProduct[] = [
    { id: 'qp-1', title: 'Nagpur Samosa', pricePaise: 2500 },
    { id: 'qp-2', title: 'Tarri Poha', pricePaise: 4000 },
    { id: 'qp-3', title: 'Orange Barfi (250g)', pricePaise: 16000 },
    { id: 'qp-4', title: 'Masala Chai', pricePaise: 1500 },
    { id: 'qp-5', title: 'Kachori Plate', pricePaise: 3000 },
    { id: 'qp-6', title: 'Cold Coffee', pricePaise: 5000 }
  ];

  cart = signal<CartItem[]>([]);
  paymentMode = signal<'CASH' | 'UPI'>('CASH');
  lastIssuedToken = signal<string>('#NK-501');
  isTokenSuccessOpen = signal<boolean>(false);

  totalPaise = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.product.pricePaise * item.quantity, 0);
  });

  addToCart(product: QuickProduct) {
    this.cart.update((list) => {
      const idx = list.findIndex((i) => i.product.id === product.id);
      if (idx > -1) {
        list[idx].quantity += 1;
        return [...list];
      }
      return [...list, { product, quantity: 1 }];
    });
  }

  increaseQty(productId: string) {
    this.cart.update((list) =>
      list.map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }

  decreaseQty(productId: string) {
    this.cart.update((list) => {
      return list
        .map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0);
    });
  }

  generateBillAndToken() {
    const nextTokenNum = Math.floor(100 + Math.random() * 900);
    this.lastIssuedToken.set('#NK-' + nextTokenNum);
    this.isTokenSuccessOpen.set(true);
    this.cart.set([]);
  }

  printReceipt() {
    window.print();
  }
}
