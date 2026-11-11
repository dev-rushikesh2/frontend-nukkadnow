import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

export interface PackOption {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
  savingsBadge?: string;
}

@Component({
  selector: 'app-product-details-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-details-list.page.html',
  styleUrls: ['./product-details-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsListPageComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  readonly isFavorite = signal<boolean>(false);
  readonly quantity = signal<number>(1);
  readonly activeTab = signal<'info' | 'reviews' | 'similar'>('info');

  readonly product = signal({
    id: 'fresh-tomatoes',
    name: 'Fresh Tomatoes',
    subtitle: 'Farm Fresh • Premium Quality',
    shopId: 'shree-fresh-mart',
    shopName: 'Shree Fresh Mart',
    rating: 4.7,
    reviewsCount: 328,
    inStock: true,
    discountPercent: '10% OFF',
    description: 'Farm fresh, juicy and naturally ripened tomatoes. Ideal for daily cooking – curries, salads, sauces and more.',
    type: 'Fresh Vegetable',
    netWeight: '1 kg',
    origin: 'Local Farms (Amravati)',
    harvest: 'Same Day Procurement',
    images: [
      'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546470427-0d4db154ceb7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80'
    ]
  });

  readonly packSizes = signal<PackOption[]>([
    { id: '1kg', label: '1 kg', price: 28, originalPrice: 32 },
    { id: '500g', label: '500 g', price: 15 },
    { id: '2kg', label: '2 kg', price: 55, savingsBadge: 'Save ₹9' }
  ]);

  readonly selectedPackId = signal<string>('1kg');

  readonly currentPrice = computed(() => {
    const selected = this.packSizes().find(p => p.id === this.selectedPackId());
    return selected ? selected.price : 28;
  });

  readonly currentOriginalPrice = computed(() => {
    const selected = this.packSizes().find(p => p.id === this.selectedPackId());
    return selected?.originalPrice;
  });

  readonly currentTotal = computed(() => {
    return this.currentPrice() * this.quantity();
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  toggleFavorite() {
    this.isFavorite.update(v => !v);
  }

  selectPack(packId: string) {
    this.selectedPackId.set(packId);
  }

  incrementQuantity() {
    this.quantity.update(q => q + 1);
  }

  decrementQuantity() {
    this.quantity.update(q => (q > 1 ? q - 1 : 1));
  }

  selectTab(tab: 'info' | 'reviews' | 'similar') {
    this.activeTab.set(tab);
  }

  goToShop() {
    this.router.navigate(['/merchant', this.product().shopId]);
  }

  addToCart() {
    this.router.navigate(['/cart']);
  }

  buyNow() {
    this.router.navigate(['/checkout']);
  }
}
