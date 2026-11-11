import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';

export type SearchTab = 'ALL' | 'PRODUCTS' | 'SHOPS' | 'CATEGORIES';

export interface SearchProduct {
  id: string;
  name: string;
  unit: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  isFavourite: boolean;
  quantityInCart: number;
}

export interface SearchShop {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  isOpen: boolean;
  categories: string[];
  image: string;
}

@Component({
  selector: 'app-discovery-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomerShellComponent],
  templateUrl: './discovery-list.page.html',
  styleUrls: ['./discovery-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoveryListPageComponent {
  private router = inject(Router);

  readonly searchQuery = signal<string>('fresh vegetables');
  readonly activeTab = signal<SearchTab>('ALL');
  readonly offersOnly = signal<boolean>(false);
  readonly openNowOnly = signal<boolean>(true);
  readonly selectedDistance = signal<string>('3 km');

  readonly recentSearches = signal<string[]>(['fresh vegetables', 'milk', 'bread']);
  readonly trendingSearches = signal<string[]>(['fresh fruits', 'groceries', 'bakery']);

  readonly products = signal<SearchProduct[]>([
    {
      id: 'fresh-tomatoes',
      name: 'Fresh Tomatoes',
      unit: '1 kg',
      price: 28,
      originalPrice: 32,
      discountBadge: '10% OFF',
      image: '🍅',
      isFavourite: false,
      quantityInCart: 0
    },
    {
      id: 'onion',
      name: 'Onion',
      unit: '1 kg',
      price: 24,
      image: '🧅',
      isFavourite: false,
      quantityInCart: 0
    },
    {
      id: 'potato',
      name: 'Potato',
      unit: '1 kg',
      price: 26,
      image: '🥔',
      isFavourite: false,
      quantityInCart: 0
    },
    {
      id: 'green-chilli',
      name: 'Green Chilli',
      unit: '250 g',
      price: 18,
      originalPrice: 21,
      discountBadge: '15% OFF',
      image: '🌶️',
      isFavourite: false,
      quantityInCart: 0
    }
  ]);

  readonly shops = signal<SearchShop[]>([
    {
      id: 'shree-fresh-mart',
      name: 'Shree Fresh Mart',
      rating: 4.7,
      reviewsCount: 328,
      distance: '0.8 km',
      isOpen: true,
      categories: ['Fruits', 'Vegetables', 'Groceries'],
      image: '🏪'
    },
    {
      id: 'amravati-veggie-point',
      name: 'Amravati Veggie Point',
      rating: 4.6,
      reviewsCount: 189,
      distance: '1.2 km',
      isOpen: true,
      categories: ['Fresh Vegetables', 'Fruits', 'Daily Needs'],
      image: '🥕'
    }
  ]);

  setTab(tab: SearchTab) {
    this.activeTab.set(tab);
  }

  clearSearch() {
    this.searchQuery.set('');
  }

  setSearchTerm(term: string) {
    this.searchQuery.set(term);
  }

  clearRecentSearches() {
    this.recentSearches.set([]);
  }

  toggleProductFav(productId: string, event: Event) {
    event.stopPropagation();
    this.products.update(items =>
      items.map(p => p.id === productId ? { ...p, isFavourite: !p.isFavourite } : p)
    );
  }

  addToCart(productId: string, event: Event) {
    event.stopPropagation();
    this.products.update(items =>
      items.map(p => p.id === productId ? { ...p, quantityInCart: p.quantityInCart + 1 } : p)
    );
  }

  viewProduct(productId: string) {
    this.router.navigate(['/product-details', productId]);
  }

  viewShop(shopId: string) {
    this.router.navigate(['/merchant', shopId]);
  }
}
