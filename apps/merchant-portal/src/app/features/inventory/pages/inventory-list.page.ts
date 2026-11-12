import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InventoryStore } from '../state/inventory.store';
import { InventoryItem, StockAdjustmentReason } from '../models/inventory-view.model';

@Component({
  selector: 'merchant-inventory-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inventory-list.page.html',
  styleUrls: ['./inventory-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryPageComponent {
  store = inject(InventoryStore);

  // Sub-tabs: 'STOCK' | 'MOVEMENTS'
  readonly activeTab = signal<'STOCK' | 'MOVEMENTS'>('STOCK');

  // Search
  readonly searchInput = signal<string>('');

  // Selected Stock Filter: 'ALL' | 'LOW_STOCK' | 'OUT_OF_STOCK'
  readonly stockFilter = signal<'ALL' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');

  // Modal / Drawer state for Screen 22
  readonly isAdjustModalOpen = signal<boolean>(false);
  readonly selectedItem = signal<InventoryItem | null>(null);

  // Adjustment Mode: 'ADD' | 'REDUCE' | 'SET'
  readonly adjustMode = signal<'ADD' | 'REDUCE' | 'SET'>('ADD');
  readonly adjustQuantity = signal<number>(10);
  readonly adjustReason = signal<StockAdjustmentReason>('RESTOCK');
  readonly adjustNote = signal<string>('');
  readonly invoiceRef = signal<string>('');

  // Toast
  readonly toastMessage = signal<string | null>(null);

  // Valuation
  readonly totalInventoryValuation = computed(() => {
    // approx 85 rupees avg unit cost * total stock
    const totalUnits = this.store.items().reduce((sum, item) => sum + item.currentStock, 0);
    return totalUnits * 85;
  });

  // Filtered Items for Display
  readonly displayedItems = computed(() => {
    const q = this.searchInput().toLowerCase().trim();
    const filter = this.stockFilter();
    let list = this.store.items();

    if (filter === 'LOW_STOCK') {
      list = list.filter(i => i.isLowStock && i.inStock);
    } else if (filter === 'OUT_OF_STOCK') {
      list = list.filter(i => !i.inStock || i.currentStock === 0);
    }

    if (q) {
      list = list.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
      );
    }
    return list;
  });

  // Projected New Stock preview in Modal
  readonly projectedStock = computed(() => {
    const item = this.selectedItem();
    if (!item) return 0;
    const mode = this.adjustMode();
    const qty = this.adjustQuantity();

    if (mode === 'ADD') return item.currentStock + qty;
    if (mode === 'REDUCE') return Math.max(0, item.currentStock - qty);
    return Math.max(0, qty); // SET mode
  });

  onSearch(val: string) {
    this.searchInput.set(val);
  }

  setFilterMode(mode: 'ALL' | 'LOW_STOCK' | 'OUT_OF_STOCK') {
    this.stockFilter.set(mode);
  }

  quickAdd(item: InventoryItem, event: Event) {
    event.stopPropagation();
    this.store.quickAdjust(item.id, +1);
    this.showToast(`+1 added to "${item.title}".`);
  }

  quickSubtract(item: InventoryItem, event: Event) {
    event.stopPropagation();
    if (item.currentStock > 0) {
      this.store.quickAdjust(item.id, -1);
      this.showToast(`-1 removed from "${item.title}".`);
    }
  }

  openAdjustDialog(item: InventoryItem) {
    this.selectedItem.set(item);
    this.adjustMode.set('ADD');
    this.adjustQuantity.set(10);
    this.adjustReason.set('RESTOCK');
    this.adjustNote.set('');
    this.invoiceRef.set('');
    this.isAdjustModalOpen.set(true);
  }

  setQuickQty(amt: number) {
    this.adjustQuantity.set(amt);
  }

  submitAdjustment() {
    const item = this.selectedItem();
    if (!item) return;

    let delta = this.adjustQuantity();
    const mode = this.adjustMode();

    if (mode === 'REDUCE') {
      delta = -delta;
    } else if (mode === 'SET') {
      delta = this.adjustQuantity() - item.currentStock;
    }

    const note = (this.invoiceRef() ? `[Inv: ${this.invoiceRef()}] ` : '') + this.adjustNote().trim();

    this.store.detailedAdjust(
      item.id,
      delta,
      this.adjustReason(),
      note || 'Manual Stock Adjustment'
    );

    this.isAdjustModalOpen.set(false);
    this.showToast(`Stock updated for "${item.title}". New stock: ${this.projectedStock()}`);
  }

  private showToast(msg: string) {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 2800);
  }
}

export { InventoryPageComponent as InventoryListPageComponent };
