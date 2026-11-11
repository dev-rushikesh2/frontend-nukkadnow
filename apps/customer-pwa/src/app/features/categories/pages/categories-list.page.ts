import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';

export interface CategoryGridItem {
  id: string;
  name: string;
  shopsCount: number;
  emoji: string;
  bgColor: string;
  isMore?: boolean;
}

@Component({
  selector: 'app-categories-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, CustomerShellComponent],
  templateUrl: './categories-list.page.html',
  styleUrls: ['./categories-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesListPageComponent {
  private router = inject(Router);

  readonly searchQuery = signal<string>('');

  readonly categories = signal<CategoryGridItem[]>([
    {
      id: 'fruits-veg',
      name: 'Fruits & Vegetables',
      shopsCount: 128,
      emoji: '🥗',
      bgColor: '#F0FDF4'
    },
    {
      id: 'groceries-staples',
      name: 'Groceries & Staples',
      shopsCount: 156,
      emoji: '🥫',
      bgColor: '#FEF3C7'
    },
    {
      id: 'food-snacks',
      name: 'Food & Snacks',
      shopsCount: 94,
      emoji: '🍟',
      bgColor: '#FFEDD5'
    },
    {
      id: 'bakery-sweets',
      name: 'Bakery & Sweets',
      shopsCount: 62,
      emoji: '🥐',
      bgColor: '#FCE7F3'
    },
    {
      id: 'dairy-beverages',
      name: 'Dairy & Beverages',
      shopsCount: 88,
      emoji: '🥛',
      bgColor: '#EFF6FF'
    },
    {
      id: 'pharmacy-health',
      name: 'Pharmacy & Health',
      shopsCount: 47,
      emoji: '💊',
      bgColor: '#F0FDFA'
    },
    {
      id: 'personal-care',
      name: 'Personal Care & Beauty',
      shopsCount: 71,
      emoji: '🧴',
      bgColor: '#FAF5FF'
    },
    {
      id: 'home-cleaning',
      name: 'Home & Cleaning',
      shopsCount: 65,
      emoji: '🧹',
      bgColor: '#ECFEFF'
    },
    {
      id: 'pet-care',
      name: 'Pet Care',
      shopsCount: 28,
      emoji: '🐕',
      bgColor: '#FFF7ED'
    },
    {
      id: 'electronics',
      name: 'Electronics & Accessories',
      shopsCount: 40,
      emoji: '🎧',
      bgColor: '#F5F3FF'
    },
    {
      id: 'home-kitchen',
      name: 'Home & Kitchen',
      shopsCount: 53,
      emoji: '🍳',
      bgColor: '#F8FAFC'
    },
    {
      id: 'more-categories',
      name: 'More Categories',
      shopsCount: 0,
      emoji: '❖',
      bgColor: '#FAF5FF',
      isMore: true
    }
  ]);

  readonly filteredCategories = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.categories();
    return this.categories().filter(c =>
      c.name.toLowerCase().includes(q)
    );
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  openCategory(cat: CategoryGridItem) {
    if (cat.isMore) {
      this.router.navigate(['/discovery']);
      return;
    }
    this.router.navigate(['/discovery'], { queryParams: { category: cat.id } });
  }

  viewAllShops() {
    this.router.navigate(['/discovery']);
  }

  openNotifications() {
    this.router.navigate(['/notifications']);
  }

  openAccount() {
    this.router.navigate(['/account']);
  }
}
