import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

export interface CartItem {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  quantity: number;
  checked: boolean;
}

export interface ShopCartGroup {
  shopId: string;
  shopName: string;
  verified: boolean;
  categories: string;
  slaBadge: string;
  slaType: 'delivery' | 'pickup';
  shopOffer?: string;
  checked: boolean;
  items: CartItem[];
}

@Component({
  selector: 'app-cart-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart-list.page.html',
  styleUrls: ['./cart-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListPageComponent {
  private router = inject(Router);

  readonly shopGroups = signal<ShopCartGroup[]>([
    {
      shopId: 'shree-fresh-mart',
      shopName: 'Shree Fresh Mart',
      verified: true,
      categories: 'Fruits • Vegetables • Groceries',
      slaBadge: 'Delivery in 30–45 min',
      slaType: 'delivery',
      shopOffer: 'Shop Offer: 10% OFF on tomatoes ✓ Applied',
      checked: true,
      items: [
        {
          id: 'fresh-tomatoes',
          name: 'Fresh Tomatoes',
          weight: '1 kg',
          price: 28,
          originalPrice: 32,
          discountBadge: '10% OFF',
          image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80',
          quantity: 1,
          checked: true
        },
        {
          id: 'fresh-potato',
          name: 'Potato',
          weight: '1 kg',
          price: 26,
          image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=200&q=80',
          quantity: 1,
          checked: true
        }
      ]
    },
    {
      shopId: 'city-bakery',
      shopName: 'City Bakery',
      verified: true,
      categories: 'Bakery • Snacks • Cakes',
      slaBadge: 'Pickup in 10–15 min',
      slaType: 'pickup',
      checked: true,
      items: [
        {
          id: 'brown-bread',
          name: 'Brown Bread',
          weight: '400 g',
          price: 48,
          image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&q=80',
          quantity: 1,
          checked: true
        }
      ]
    }
  ]);

  readonly deliveryAddress = signal<string>('Civil Lines, Amravati – 444601');
  readonly deliveryTime = signal<string>('Est. 30 – 45 min');
  readonly couponApplied = signal<boolean>(false);
  readonly couponCode = signal<string>('NUKKADNEW');
  readonly deliveryFee = signal<number>(20);
  readonly shopDiscount = signal<number>(4);

  readonly totalItemsCount = computed(() => {
    return this.shopGroups().reduce((acc, g) => {
      return acc + g.items.filter(i => i.checked).reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  });

  readonly rawItemTotal = computed(() => {
    return this.shopGroups().reduce((acc, g) => {
      return acc + g.items.filter(i => i.checked).reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, 0);
  });

  readonly totalPayable = computed(() => {
    const raw = this.rawItemTotal();
    if (raw === 0) return 0;
    return raw - this.shopDiscount() + this.deliveryFee();
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  toggleShopCheck(group: ShopCartGroup) {
    const newChecked = !group.checked;
    this.shopGroups.update(groups =>
      groups.map(g => {
        if (g.shopId === group.shopId) {
          return {
            ...g,
            checked: newChecked,
            items: g.items.map(item => ({ ...item, checked: newChecked }))
          };
        }
        return g;
      })
    );
  }

  toggleItemCheck(group: ShopCartGroup, item: CartItem) {
    this.shopGroups.update(groups =>
      groups.map(g => {
        if (g.shopId === group.shopId) {
          const updatedItems = g.items.map(i =>
            i.id === item.id ? { ...i, checked: !i.checked } : i
          );
          const allChecked = updatedItems.every(i => i.checked);
          return { ...g, checked: allChecked, items: updatedItems };
        }
        return g;
      })
    );
  }

  incrementItem(group: ShopCartGroup, item: CartItem) {
    this.shopGroups.update(groups =>
      groups.map(g => {
        if (g.shopId === group.shopId) {
          return {
            ...g,
            items: g.items.map(i =>
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          };
        }
        return g;
      })
    );
  }

  decrementItem(group: ShopCartGroup, item: CartItem) {
    this.shopGroups.update(groups =>
      groups.map(g => {
        if (g.shopId === group.shopId) {
          return {
            ...g,
            items: g.items.map(i =>
              i.id === item.id ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
            )
          };
        }
        return g;
      })
    );
  }

  removeItem(group: ShopCartGroup, item: CartItem) {
    this.shopGroups.update(groups =>
      groups
        .map(g => {
          if (g.shopId === group.shopId) {
            return {
              ...g,
              items: g.items.filter(i => i.id !== item.id)
            };
          }
          return g;
        })
        .filter(g => g.items.length > 0)
    );
  }

  addMoreFromShops() {
    this.router.navigate(['/discovery']);
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
