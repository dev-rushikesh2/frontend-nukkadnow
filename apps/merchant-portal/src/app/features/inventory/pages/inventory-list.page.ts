import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryStore } from '../state/inventory.store';
import { InventoryItem, StockAdjustmentReason } from '../models/inventory-view.model';
import { ButtonComponent, InputComponent, ToggleComponent, DialogComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-inventory-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, InputComponent, ToggleComponent, DialogComponent],
  templateUrl: './inventory-list.page.html',
  styleUrls: ['./inventory-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InventoryPageComponent {
  store = inject(InventoryStore);

  activeTab = signal<'STOCK' | 'MOVEMENTS'>('STOCK');
  isAdjustModalOpen = signal<boolean>(false);
  selectedItem = signal<InventoryItem | null>(null);

  adjustDelta = signal<number>(10);
  adjustReason = signal<StockAdjustmentReason>('RESTOCK');
  adjustNote = signal<string>('');

  openAdjustDialog(item: InventoryItem) {
    this.selectedItem.set(item);
    this.adjustDelta.set(10);
    this.adjustReason.set('RESTOCK');
    this.adjustNote.set('');
    this.isAdjustModalOpen.set(true);
  }

  submitAdjustment() {
    const item = this.selectedItem();
    if (!item) return;

    this.store.detailedAdjust(
      item.id,
      this.adjustDelta(),
      this.adjustReason(),
      this.adjustNote().trim()
    );
    this.isAdjustModalOpen.set(false);
  }
}

export { InventoryPageComponent as InventoryListPageComponent };
