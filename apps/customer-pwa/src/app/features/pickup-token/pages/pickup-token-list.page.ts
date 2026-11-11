import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export type QrViewMode = 'scan' | 'order' | 'checkout';

export interface QrProductItem {
  id: string;
  name: string;
  unit: string;
  price: number;
  rating: number;
  reviewsCount: number;
  category: 'fruits' | 'vegetables' | 'dairy' | 'groceries';
  image: string;
  quantity: number;
}

@Component({
  selector: 'app-pickup-token-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pickup-token-list.page.html',
  styleUrls: ['./pickup-token-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickupTokenListPageComponent {
  private router = inject(Router);

  readonly currentMode = signal<QrViewMode>('scan');
  readonly flashEnabled = signal<boolean>(false);
  readonly activeScanTab = signal<'scan' | 'my-qr' | 'how-it-works'>('scan');
  readonly selectedCategory = signal<string>('all');

  readonly shopInfo = signal({
    id: 'shree-fresh-mart',
    name: 'Shree Fresh Mart',
    verified: true,
    locality: 'Civil Lines, Amravati',
    status: 'Open • Closes at 9:00 PM',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80'
  });

  readonly products = signal<QrProductItem[]>([
    {
      id: 'fresh-tomatoes',
      name: 'Fresh Tomatoes',
      unit: 'kg',
      price: 28,
      rating: 4.7,
      reviewsCount: 328,
      category: 'vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80',
      quantity: 1
    },
    {
      id: 'fresh-potato',
      name: 'Potato',
      unit: 'kg',
      price: 26,
      rating: 4.7,
      reviewsCount: 198,
      category: 'vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=200&q=80',
      quantity: 1
    },
    {
      id: 'fresh-banana',
      name: 'Banana (Robusta)',
      unit: 'dozen',
      price: 42,
      rating: 4.5,
      reviewsCount: 280,
      category: 'fruits',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=200&q=80',
      quantity: 0
    },
    {
      id: 'full-cream-milk',
      name: 'Milk (Full Cream)',
      unit: '1 L',
      price: 62,
      rating: 4.8,
      reviewsCount: 560,
      category: 'dairy',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80',
      quantity: 1
    }
  ]);

  readonly filteredProducts = computed(() => {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.products();
    return this.products().filter(p => p.category === cat);
  });

  readonly cartItems = computed(() => {
    return this.products().filter(p => p.quantity > 0);
  });

  readonly cartCount = computed(() => {
    return this.products().reduce((sum, p) => sum + p.quantity, 0);
  });

  readonly itemsTotal = computed(() => {
    return this.products().reduce((sum, p) => sum + (p.price * p.quantity), 0);
  });

  readonly deliveryFee = signal<number>(20);
  readonly shopDiscount = signal<number>(10);

  readonly totalPayable = computed(() => {
    return this.itemsTotal() + this.deliveryFee() - this.shopDiscount();
  });

  setMode(mode: QrViewMode) {
    this.currentMode.set(mode);
  }

  toggleFlash() {
    this.flashEnabled.update(f => !f);
  }

  simulateScan() {
    this.currentMode.set('order');
  }

  goBack() {
    if (this.currentMode() === 'checkout') {
      this.currentMode.set('order');
    } else if (this.currentMode() === 'order') {
      this.currentMode.set('scan');
    } else {
      this.router.navigate(['/home']);
    }
  }

  viewShop() {
    this.router.navigate(['/merchant', this.shopInfo().id]);
  }

  selectCategory(cat: string) {
    this.selectedCategory.set(cat);
  }

  incrementItem(productId: string) {
    this.products.update(list =>
      list.map(p => p.id === productId ? { ...p, quantity: p.quantity + 1 } : p)
    );
  }

  decrementItem(productId: string) {
    this.products.update(list =>
      list.map(p => p.id === productId ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p)
    );
  }

  removeItem(productId: string) {
    this.products.update(list =>
      list.map(p => p.id === productId ? { ...p, quantity: 0 } : p)
    );
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
