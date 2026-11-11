import { Injectable, signal, computed } from '@angular/core';
import { InventoryItem, StockMovementRecord, StockAdjustmentReason, INITIAL_INVENTORY, INITIAL_MOVEMENTS } from '../models/inventory-view.model';

@Injectable({ providedIn: 'root' })
export class InventoryStore {
  readonly items = signal<InventoryItem[]>(INITIAL_INVENTORY);
  readonly movements = signal<StockMovementRecord[]>(INITIAL_MOVEMENTS);
  readonly filterMode = signal<'ALL' | 'LOW_STOCK' | 'OUT_OF_STOCK'>('ALL');
  readonly searchQuery = signal<string>('');

  readonly filteredItems = computed(() => {
    const mode = this.filterMode();
    const query = this.searchQuery().trim().toLowerCase();

    return this.items().filter((item) => {
      const matchQuery = !query || item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      if (!matchQuery) return false;

      if (mode === 'LOW_STOCK') return item.isLowStock && item.inStock;
      if (mode === 'OUT_OF_STOCK') return !item.inStock || item.currentStock === 0;
      return true;
    });
  });

  readonly totalItemsCount = computed(() => this.items().length);
  readonly lowStockCount = computed(() => this.items().filter((i) => i.isLowStock && i.inStock).length);
  readonly outOfStockCount = computed(() => this.items().filter((i) => !i.inStock || i.currentStock === 0).length);

  setFilter(mode: 'ALL' | 'LOW_STOCK' | 'OUT_OF_STOCK') {
    this.filterMode.set(mode);
  }

  setSearch(q: string) {
    this.searchQuery.set(q);
  }

  quickAdjust(id: string, delta: number) {
    this.items.update((list) =>
      list.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.currentStock + delta);
          const isLow = newStock <= item.lowStockThreshold;
          const inStock = newStock > 0;

          this.recordMovement(item, delta, 'RESTOCK', 'Quick Counter Adjustment');

          return {
            ...item,
            currentStock: newStock,
            isLowStock: isLow,
            inStock: inStock,
            lastUpdated: 'Just now'
          };
        }
        return item;
      })
    );
  }

  detailedAdjust(id: string, delta: number, reason: StockAdjustmentReason, note: string) {
    this.items.update((list) =>
      list.map((item) => {
        if (item.id === id) {
          const newStock = Math.max(0, item.currentStock + delta);
          const isLow = newStock <= item.lowStockThreshold;
          const inStock = newStock > 0;

          this.recordMovement(item, delta, reason, note);

          return {
            ...item,
            currentStock: newStock,
            isLowStock: isLow,
            inStock: inStock,
            lastUpdated: 'Just now'
          };
        }
        return item;
      })
    );
  }

  toggleAvailability(id: string) {
    this.items.update((list) =>
      list.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
  }

  private recordMovement(item: InventoryItem, delta: number, reason: StockAdjustmentReason, note: string) {
    const record: StockMovementRecord = {
      id: 'mov-' + Date.now(),
      productId: item.productId,
      productTitle: item.title,
      delta,
      previousStock: item.currentStock,
      newStock: Math.max(0, item.currentStock + delta),
      reason,
      note,
      actorName: 'Staff (Register)',
      timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.movements.update((list) => [record, ...list]);
  }
}
