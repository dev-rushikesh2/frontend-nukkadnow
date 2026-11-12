import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CatalogueStore } from '../state/catalogue.store';
import { ProductItem } from '../models/catalogue-view.model';

export interface CategoryInfo {
  id: string;
  name: string;
  emoji: string;
  itemCount: number;
  isActive: boolean;
}

@Component({
  selector: 'merchant-catalogue-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './catalogue-list.page.html',
  styleUrls: ['./catalogue-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogueListPageComponent {
  readonly Math = Math;
  store = inject(CatalogueStore);
  router = inject(Router);

  // Active sub-tab: 'products' | 'categories' | 'low-stock'
  readonly activeSubTab = signal<'products' | 'categories' | 'low-stock'>('products');

  // Search
  readonly searchInput = signal<string>('');

  // Categories list
  readonly categoriesList = signal<CategoryInfo[]>([
    { id: 'cat-1', name: 'Sweets & Snacks', emoji: '🥟', itemCount: 18, isActive: true },
    { id: 'cat-2', name: 'Fresh Meals & Tiffin', emoji: '🍱', itemCount: 12, isActive: true },
    { id: 'cat-3', name: 'Bakery & Cakes', emoji: '🍞', itemCount: 15, isActive: true },
    { id: 'cat-4', name: 'Dairy & Milk', emoji: '🥛', itemCount: 9, isActive: true },
    { id: 'cat-5', name: 'Grocery & Kirana', emoji: '🍃', itemCount: 34, isActive: true },
    { id: 'cat-6', name: 'Beverages & Chai', emoji: '☕', itemCount: 14, isActive: true }
  ]);

  // Add Category modal state
  readonly showAddCategoryModal = signal<boolean>(false);
  readonly newCategoryName = signal<string>('');
  readonly newCategoryEmoji = signal<string>('🏷️');

  // Toast
  readonly toast = signal<string | null>(null);

  // Low Stock Items (< 10)
  readonly lowStockProducts = computed(() =>
    this.store.products().filter(p => p.stockCount <= 10)
  );

  // Filtered Products for current sub-tab
  readonly displayedProducts = computed(() => {
    const sub = this.activeSubTab();
    const query = this.searchInput().toLowerCase().trim();
    let list = sub === 'low-stock' ? this.lowStockProducts() : this.store.filteredProducts();

    if (query) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }
    return list;
  });

  setSubTab(tab: 'products' | 'categories' | 'low-stock') {
    this.activeSubTab.set(tab);
  }

  selectCategory(cat: string) {
    this.store.setCategory(cat);
  }

  toggleStock(productId: string) {
    this.store.toggleAvailability(productId);
    const prod = this.store.products().find(p => p.id === productId);
    this.showToast(`Updated "${prod?.title}" availability to ${prod?.inStock ? 'In Stock' : 'Out of Stock'}.`);
  }

  editProduct(p: ProductItem) {
    this.router.navigate(['/catalogue', p.id, 'edit']);
  }

  createProduct() {
    this.router.navigate(['/catalogue/new']);
  }

  duplicateProduct(p: ProductItem) {
    const copy: ProductItem = {
      ...p,
      id: `prod-${Date.now()}`,
      title: `${p.title} (Copy)`,
      stockCount: 10
    };
    this.store.saveProduct(copy);
    this.showToast(`Duplicated "${p.title}" successfully.`);
  }

  deleteProduct(id: string, name: string) {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      this.store.deleteProduct(id);
      this.showToast(`Product "${name}" deleted.`);
    }
  }

  toggleCategory(id: string) {
    this.categoriesList.update(list =>
      list.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c)
    );
  }

  addCategory() {
    const name = this.newCategoryName().trim();
    if (!name) return;

    const newCat: CategoryInfo = {
      id: `cat-${Date.now()}`,
      name,
      emoji: this.newCategoryEmoji() || '🏷️',
      itemCount: 0,
      isActive: true
    };

    this.categoriesList.update(list => [...list, newCat]);
    this.showAddCategoryModal.set(false);
    this.newCategoryName.set('');
    this.showToast(`Category "${name}" created successfully!`);
  }

  private showToast(msg: string) {
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2800);
  }
}
