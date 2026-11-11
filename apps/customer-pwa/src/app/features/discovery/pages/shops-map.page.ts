import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';

export interface MapShop {
  id: string;
  name: string;
  category: string;
  categoryType: 'groceries' | 'food' | 'fruits-veg' | 'pharma' | 'bakery';
  distance: string;
  rating: number;
  reviewsCount: number;
  isOpen: boolean;
  tags: string[];
  image: string;
  latOffset: number; // percentage from top
  lngOffset: number; // percentage from left
  isFavorite: boolean;
}

@Component({
  selector: 'app-shops-map-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomerShellComponent],
  templateUrl: './shops-map.page.html',
  styleUrls: ['./shops-map.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopsMapPageComponent {
  private router = inject(Router);

  readonly searchQuery = signal<string>('');
  readonly selectedCategory = signal<string>('all');
  readonly selectedRadius = signal<string>('3 km');
  readonly selectedShop = signal<MapShop | null>(null);

  readonly filterCategories = [
    { id: 'all', label: 'All', icon: 'grid' },
    { id: 'groceries', label: 'Groceries', icon: 'cart' },
    { id: 'fruits-veg', label: 'Fruits & Veg', icon: 'apple' },
    { id: 'food', label: 'Food', icon: 'utensils' },
    { id: 'more', label: 'More', icon: 'dots' }
  ];

  readonly shops = signal<MapShop[]>([
    {
      id: 'shree-fresh-mart',
      name: 'Shree Fresh Mart',
      category: 'Groceries',
      categoryType: 'groceries',
      distance: '0.8 km',
      rating: 4.7,
      reviewsCount: 328,
      isOpen: true,
      tags: ['Groceries', 'Fruits', 'Vegetables'],
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80',
      latOffset: 45,
      lngOffset: 25,
      isFavorite: false
    },
    {
      id: 'city-bakery',
      name: 'City Bakery',
      category: 'Bakery',
      categoryType: 'bakery',
      distance: '1.2 km',
      rating: 4.6,
      reviewsCount: 512,
      isOpen: true,
      tags: ['Bakery', 'Snacks', 'Cakes'],
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
      latOffset: 28,
      lngOffset: 40,
      isFavorite: false
    },
    {
      id: 'amravati-veggie-point',
      name: 'Amravati Veggie Point',
      category: 'Fruits & Veg',
      categoryType: 'fruits-veg',
      distance: '1.2 km',
      rating: 4.8,
      reviewsCount: 240,
      isOpen: true,
      tags: ['Vegetables', 'Fruits', 'Organic'],
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
      latOffset: 48,
      lngOffset: 65,
      isFavorite: false
    },
    {
      id: 'aarogyam-pharma',
      name: 'Aarogyam Pharma',
      category: 'Pharma',
      categoryType: 'pharma',
      distance: '1.5 km',
      rating: 4.8,
      reviewsCount: 189,
      isOpen: true,
      tags: ['Medicines', 'Health', 'Wellness'],
      image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=400&q=80',
      latOffset: 32,
      lngOffset: 72,
      isFavorite: false
    }
  ]);

  readonly filteredShops = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    const cat = this.selectedCategory();

    return this.shops().filter(s => {
      const matchesQuery = !q || s.name.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q));
      const matchesCat = cat === 'all' || cat === 'more' || s.categoryType === cat;
      return matchesQuery && matchesCat;
    });
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  selectCategory(id: string) {
    this.selectedCategory.set(id);
  }

  toggleFavorite(shop: MapShop, event: MouseEvent) {
    event.stopPropagation();
    this.shops.update(list =>
      list.map(s => s.id === shop.id ? { ...s, isFavorite: !s.isFavorite } : s)
    );
  }

  openShopDetails(shopId: string) {
    this.router.navigate(['/merchant', shopId]);
  }

  navigateShop(shop: MapShop, event: MouseEvent) {
    event.stopPropagation();
    // Open in native map navigation or simulated route
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shop.name + ' Nagpur')}`, '_blank');
  }

  recenterMap() {
    this.selectedShop.set(null);
  }

  zoomIn() {}
  zoomOut() {}
}
