import { Component, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

export interface PosProduct {
  id: string;
  name: string;
  emoji: string;
  category: 'Beverages' | 'Snacks' | 'Dairy' | 'Bakery' | 'Groceries';
  price: number;
  inStock: boolean;
}

export interface CartLine {
  product: PosProduct;
  quantity: number;
}

export interface CompletedWalkinReceipt {
  token: string;
  orderId: string;
  customerName: string;
  customerPhone?: string;
  items: CartLine[];
  subtotal: number;
  discount: number;
  tax: number;
  grandTotal: number;
  paymentMode: string;
  timestamp: string;
}

@Component({
  selector: 'merchant-walkin-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './walkin-orders-list.page.html',
  styleUrls: ['./walkin-orders-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalkinOrdersPageComponent {
  // Search & Category
  readonly searchQuery = signal<string>('');
  readonly activeCategory = signal<string>('All');

  // Customer selection
  readonly isGuest = signal<boolean>(true);
  readonly custName = signal<string>('');
  readonly custPhone = signal<string>('');

  // Payment Mode
  readonly paymentMode = signal<'Cash' | 'UPI' | 'Card' | 'Udhaar'>('UPI');

  // Discount %
  readonly discountPercent = signal<number>(0);

  // Products Catalog
  readonly products = signal<PosProduct[]>([
    { id: 'p1', name: 'Special Masala Chai', emoji: '☕', category: 'Beverages', price: 20, inStock: true },
    { id: 'p2', name: 'Filter Coffee', emoji: '☕', category: 'Beverages', price: 30, inStock: true },
    { id: 'p3', name: 'Crispy Punjabi Samosa', emoji: '🥟', category: 'Snacks', price: 25, inStock: true },
    { id: 'p4', name: 'Bun Maska', emoji: '🍞', category: 'Bakery', price: 35, inStock: true },
    { id: 'p5', name: 'Amul Taaza Milk 500ml', emoji: '🥛', category: 'Dairy', price: 27, inStock: true },
    { id: 'p6', name: 'Amul Butter 100g', emoji: '🧈', category: 'Dairy', price: 58, inStock: true },
    { id: 'p7', name: 'Whole Wheat Bread 400g', emoji: '🍞', category: 'Bakery', price: 45, inStock: true },
    { id: 'p8', name: 'Thums Up Cold Drink 250ml', emoji: '🥤', category: 'Beverages', price: 20, inStock: true },
    { id: 'p9', name: 'Aloo Tikki Burger', emoji: '🍔', category: 'Snacks', price: 70, inStock: true },
    { id: 'p10', name: 'Paneer Roll', emoji: '🌯', category: 'Snacks', price: 90, inStock: true },
    { id: 'p11', name: 'Tata Tea Gold 250g', emoji: '🍃', category: 'Groceries', price: 140, inStock: true },
    { id: 'p12', name: 'Fortune Sunflower Oil 1L', emoji: '🌻', category: 'Groceries', price: 135, inStock: true }
  ]);

  // Cart Lines
  readonly cart = signal<CartLine[]>([
    {
      product: { id: 'p1', name: 'Special Masala Chai', emoji: '☕', category: 'Beverages', price: 20, inStock: true },
      quantity: 2
    },
    {
      product: { id: 'p4', name: 'Bun Maska', emoji: '🍞', category: 'Bakery', price: 35, inStock: true },
      quantity: 1
    }
  ]);

  // Modal receipt
  readonly receiptModal = signal<CompletedWalkinReceipt | null>(null);

  // Toast
  readonly posToast = signal<string | null>(null);

  // Filtered Products
  readonly filteredProducts = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    const cat = this.activeCategory();
    let list = this.products();

    if (cat !== 'All') {
      list = list.filter(p => p.category === cat);
    }
    if (q) {
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    return list;
  });

  // Totals calculations
  readonly subtotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly discountAmount = computed(() =>
    Math.round((this.subtotal() * this.discountPercent()) / 100)
  );

  readonly taxAmount = computed(() =>
    Math.round(((this.subtotal() - this.discountAmount()) * 5) / 100) // 5% GST
  );

  readonly grandTotal = computed(() =>
    this.subtotal() - this.discountAmount() + this.taxAmount()
  );

  addToCart(prod: PosProduct) {
    this.cart.update(lines => {
      const idx = lines.findIndex(l => l.product.id === prod.id);
      if (idx >= 0) {
        return lines.map((l, i) => i === idx ? { ...l, quantity: l.quantity + 1 } : l);
      }
      return [...lines, { product: prod, quantity: 1 }];
    });
  }

  increaseQty(prodId: string) {
    this.cart.update(lines =>
      lines.map(l => l.product.id === prodId ? { ...l, quantity: l.quantity + 1 } : l)
    );
  }

  decreaseQty(prodId: string) {
    this.cart.update(lines =>
      lines
        .map(l => l.product.id === prodId ? { ...l, quantity: l.quantity - 1 } : l)
        .filter(l => l.quantity > 0)
    );
  }

  removeFromCart(prodId: string) {
    this.cart.update(lines => lines.filter(l => l.product.id !== prodId));
  }

  clearCart() {
    this.cart.set([]);
  }

  simulateBarcodeScan() {
    // Pick random product
    const randomProd = this.products()[Math.floor(Math.random() * this.products().length)];
    this.addToCart(randomProd);
    this.showToast(`🔍 Barcode scanned: Added "${randomProd.name}"`);
  }

  setDiscount(pct: number) {
    this.discountPercent.set(pct);
  }

  completeWalkinOrder() {
    if (this.cart().length === 0) {
      this.showToast('Please add items to ticket first!');
      return;
    }

    const nextTokenNum = Math.floor(Math.random() * 50) + 20;
    const receipt: CompletedWalkinReceipt = {
      token: `Q-${nextTokenNum}`,
      orderId: `#WALK-${Date.now().toString().slice(-4)}`,
      customerName: this.isGuest() ? 'Walk-in Guest' : (this.custName() || 'Walk-in Customer'),
      customerPhone: this.isGuest() ? undefined : this.custPhone(),
      items: [...this.cart()],
      subtotal: this.subtotal(),
      discount: this.discountAmount(),
      tax: this.taxAmount(),
      grandTotal: this.grandTotal(),
      paymentMode: this.paymentMode(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.receiptModal.set(receipt);
    this.clearCart();
  }

  closeReceipt() {
    this.receiptModal.set(null);
  }

  printReceipt() {
    window.print();
  }

  private showToast(msg: string) {
    this.posToast.set(msg);
    setTimeout(() => this.posToast.set(null), 2500);
  }
}
