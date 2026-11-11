import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

export interface ShopProduct {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  quantityInCart: number;
  isFavorite: boolean;
}

export interface ShopCategory {
  id: string;
  name: string;
  emoji: string;
  count?: number;
  isAll?: boolean;
}

@Component({
  selector: 'app-merchant-profile-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './merchant-profile-list.page.html',
  styleUrls: ['./merchant-profile-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantProfileListPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly isFavorite = signal<boolean>(false);
  readonly activeTab = signal<'shop' | 'products' | 'offers' | 'reviews' | 'info'>('shop');
  readonly selectedCategory = signal<string>('all');

  readonly shopInfo = signal({
    id: 'shree-fresh-mart',
    name: 'Shree Fresh Mart',
    verified: true,
    categories: 'Fruits • Vegetables • Groceries',
    rating: 4.7,
    reviewsCount: 328,
    distance: '0.8 km',
    isOpen: true,
    closingTime: '10:00 PM',
    address: 'Civil Lines, Amravati',
    timing: '6:00 AM – 10:00 PM',
    phone: '+919876543210',
    about: 'Your neighbourhood store for fresh fruits, vegetables and daily groceries. Quality produce, fair prices and reliable service.',
    bannerDiscount: 'Flat 10% OFF on Fruits & Vegetables',
    coverImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    logoImage: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80'
  });

  readonly categories = signal<ShopCategory[]>([
    { id: 'fruits-veg', name: 'Fruits & Vegetables', emoji: '🥗' },
    { id: 'groceries-staples', name: 'Groceries & Staples', emoji: '🥫' },
    { id: 'dairy-beverages', name: 'Dairy & Beverages', emoji: '🥛' },
    { id: 'spices', name: 'Spices & Condiments', emoji: '🧂' },
    { id: 'all', name: 'All Products', emoji: '⊞', count: 256, isAll: true }
  ]);

  readonly products = signal<ShopProduct[]>([
    {
      id: 'fresh-tomatoes',
      name: 'Fresh Tomatoes',
      weight: '1 kg',
      price: 28,
      originalPrice: 32,
      discountBadge: '10% OFF',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=400&q=80',
      quantityInCart: 1,
      isFavorite: false
    },
    {
      id: 'fresh-onion',
      name: 'Onion',
      weight: '1 kg',
      price: 24,
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
      quantityInCart: 1,
      isFavorite: false
    },
    {
      id: 'fresh-potato',
      name: 'Potato',
      weight: '1 kg',
      price: 26,
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
      quantityInCart: 1,
      isFavorite: false
    },
    {
      id: 'green-chilli',
      name: 'Green Chilli',
      weight: '250 g',
      price: 18,
      originalPrice: 21,
      discountBadge: '15% OFF',
      image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=400&q=80',
      quantityInCart: 0,
      isFavorite: false
    }
  ]);

  readonly cartTotal = computed(() => {
    return this.products().reduce((sum, p) => sum + (p.price * p.quantityInCart), 0) + 24; // with initial mock items = 102
  });

  readonly cartCount = computed(() => {
    return this.products().reduce((count, p) => count + p.quantityInCart, 0);
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  toggleFavorite() {
    this.isFavorite.update(v => !v);
  }

  shareShop() {
    if (navigator.share) {
      navigator.share({
        title: this.shopInfo().name,
        text: `Order fresh produce & groceries from ${this.shopInfo().name} on NukkadNow!`,
        url: window.location.href
      }).catch(() => {});
    }
  }

  callShop() {
    window.location.href = `tel:${this.shopInfo().phone}`;
  }

  selectTab(tab: 'shop' | 'products' | 'offers' | 'reviews' | 'info') {
    this.activeTab.set(tab);
  }

  selectCategory(catId: string) {
    this.selectedCategory.set(catId);
  }

  toggleProductFav(product: ShopProduct, event: MouseEvent) {
    event.stopPropagation();
    this.products.update(list =>
      list.map(p => p.id === product.id ? { ...p, isFavorite: !p.isFavorite } : p)
    );
  }

  addProduct(product: ShopProduct, event: MouseEvent) {
    event.stopPropagation();
    this.products.update(list =>
      list.map(p => p.id === product.id ? { ...p, quantityInCart: p.quantityInCart + 1 } : p)
    );
  }

  openProductDetails(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
