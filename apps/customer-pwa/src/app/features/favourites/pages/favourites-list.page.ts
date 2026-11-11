import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface FavProductItem {
  id: string;
  name: string;
  shopName: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  price: number;
  originalPrice: number;
  discountPercent: string;
  unit: string;
  image: string;
}

export interface FavShopItem {
  id: string;
  name: string;
  categories: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  image: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-favourites-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './favourites-list.page.html',
  styleUrls: ['./favourites-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesListPageComponent {
  private router = inject(Router);

  readonly activeTab = signal<'products' | 'shops'>('products');

  readonly products = signal<FavProductItem[]>([
    {
      id: 'fresh-tomatoes',
      name: 'Fresh Tomatoes',
      shopName: 'Shree Fresh Mart',
      rating: 4.7,
      reviewsCount: 328,
      distance: '2.4 km',
      price: 28,
      originalPrice: 32,
      discountPercent: '12% OFF',
      unit: '1 kg',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'potato',
      name: 'Potato',
      shopName: 'Shree Fresh Mart',
      rating: 4.7,
      reviewsCount: 328,
      distance: '2.4 km',
      price: 26,
      originalPrice: 30,
      discountPercent: '13% OFF',
      unit: '1 kg',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'brown-bread',
      name: 'Brown Bread',
      shopName: 'Daily Essentials',
      rating: 4.6,
      reviewsCount: 412,
      distance: '3.1 km',
      price: 48,
      originalPrice: 55,
      discountPercent: '13% OFF',
      unit: '400 g',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'banana',
      name: 'Banana (Robusta)',
      shopName: 'Green Veggies',
      rating: 4.5,
      reviewsCount: 280,
      distance: '2.1 km',
      price: 42,
      originalPrice: 48,
      discountPercent: '12% OFF',
      unit: '1 dozen',
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'milk-full-cream',
      name: 'Milk (Full Cream)',
      shopName: 'Amruta Dairy',
      rating: 4.8,
      reviewsCount: 560,
      distance: '3.5 km',
      price: 62,
      originalPrice: 66,
      discountPercent: '6% OFF',
      unit: '1 L',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'eggs-white',
      name: 'Eggs (White)',
      shopName: 'Daily Essentials',
      rating: 4.6,
      reviewsCount: 399,
      distance: '3.0 km',
      price: 78,
      originalPrice: 84,
      discountPercent: '7% OFF',
      unit: '12 pcs',
      image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=300&q=80'
    }
  ]);

  readonly shops = signal<FavShopItem[]>([
    {
      id: 'shree-fresh-mart',
      name: 'Shree Fresh Mart',
      categories: 'Fruits • Vegetables • Groceries',
      rating: 4.7,
      reviewsCount: 328,
      distance: '0.8 km',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'city-bakery',
      name: 'City Bakery',
      categories: 'Bakery • Snacks • Cakes',
      rating: 4.6,
      reviewsCount: 512,
      distance: '1.2 km',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'amravati-veggie-point',
      name: 'Amravati Veggie Point',
      categories: 'Vegetables • Fruits • Organic',
      rating: 4.8,
      reviewsCount: 240,
      distance: '1.2 km',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'aarogyam-pharma',
      name: 'Aarogyam Pharma',
      categories: 'Medicines • Health • Wellness',
      rating: 4.8,
      reviewsCount: 189,
      distance: '1.5 km',
      isOpen: true,
      image: 'https://images.unsplash.com/photo-1586015555751-63bb77f4322a?auto=format&fit=crop&w=300&q=80'
    }
  ]);

  goBack() {
    this.router.navigate(['/home']);
  }

  setTab(tab: 'products' | 'shops') {
    this.activeTab.set(tab);
  }

  removeProductFav(id: string, event: MouseEvent) {
    event.stopPropagation();
    this.products.update(list => list.filter(p => p.id !== id));
  }

  addToCart(product: FavProductItem, event: MouseEvent) {
    event.stopPropagation();
    this.router.navigate(['/cart']);
  }

  viewProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  viewShop(shopId: string) {
    this.router.navigate(['/merchant', shopId]);
  }
}
