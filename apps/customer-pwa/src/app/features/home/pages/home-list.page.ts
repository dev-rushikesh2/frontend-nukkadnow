import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';
import { LocationStore } from '../../../core/location/location.store';

export type FulfilmentMode = 'PICKUP' | 'DELIVERY';

export interface ShopCardItem {
  id: string;
  name: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  isOpen: boolean;
  tags: string[];
  image: string;
  isFavourite: boolean;
}

export interface PromoOffer {
  id: string;
  title: string;
  discount: string;
  bgGradient: string;
  icon: string;
}

@Component({
  selector: 'app-home-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CustomerShellComponent],
  templateUrl: './home-list.page.html',
  styleUrls: ['./home-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeListPageComponent {
  private router = inject(Router);
  locationStore = inject(LocationStore);

  readonly selectedMode = signal<FulfilmentMode>('PICKUP');
  readonly currentLocality = signal<string>('Civil Lines, Amravati');

  readonly categories = signal([
    { id: 'all', name: 'All Shops', icon: '🛍️', bg: '#F5F3FF', color: '#6D28D9' },
    { id: 'fruits-veg', name: 'Fruits & Vegetables', icon: '🥗', bg: '#ECFDF5', color: '#059669' },
    { id: 'groceries', name: 'Groceries', icon: '📦', bg: '#FFF7ED', color: '#EA580C' },
    { id: 'food-snacks', name: 'Food & Snacks', icon: '🍴', bg: '#FDF2F8', color: '#DB2777' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊', bg: '#EFF6FF', color: '#2563EB' },
    { id: 'more', name: 'More', icon: '▦', bg: '#F5F3FF', color: '#7C3AED' }
  ]);

  readonly nearbyShops = signal<ShopCardItem[]>([
    {
      id: 'shree-fresh-mart',
      name: 'Shree Fresh Mart',
      rating: 4.7,
      reviewsCount: 328,
      distance: '0.8 km',
      isOpen: true,
      tags: ['Groceries', 'Fruits', 'Veg'],
      image: '🍅',
      isFavourite: false
    },
    {
      id: 'city-bakery',
      name: 'City Bakery',
      rating: 4.6,
      reviewsCount: 512,
      distance: '1.2 km',
      isOpen: true,
      tags: ['Bakery', 'Snacks', 'Cakes'],
      image: '🍞',
      isFavourite: false
    },
    {
      id: 'aarogyam-pharma',
      name: 'Aarogyam Pharma',
      rating: 4.8,
      reviewsCount: 189,
      distance: '1.5 km',
      isOpen: true,
      tags: ['Medicines', 'Health'],
      image: '💊',
      isFavourite: false
    }
  ]);

  readonly localOffers = signal<PromoOffer[]>([
    {
      id: 'offer-1',
      title: 'Fresh Vegetables',
      discount: 'Up to 30% OFF',
      bgGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
      icon: '🥦'
    },
    {
      id: 'offer-2',
      title: 'Bakery Delights',
      discount: 'Flat 20% OFF',
      bgGradient: 'linear-gradient(135deg, #EDE9FE 0%, #DDD6FE 100%)',
      icon: '🥐'
    },
    {
      id: 'offer-3',
      title: 'Health & Wellness',
      discount: 'Up to 15% OFF',
      bgGradient: 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
      icon: '💊'
    }
  ]);

  setMode(mode: FulfilmentMode) {
    this.selectedMode.set(mode);
  }

  toggleFavourite(shopId: string, event: Event) {
    event.stopPropagation();
    this.nearbyShops.update(shops =>
      shops.map(s => s.id === shopId ? { ...s, isFavourite: !s.isFavourite } : s)
    );
  }

  openShop(shopId: string) {
    this.router.navigate(['/merchant', shopId]);
  }

  navigateToSearch() {
    this.router.navigate(['/discovery']);
  }
}
