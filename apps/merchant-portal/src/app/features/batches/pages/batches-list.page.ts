import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BatchesStore } from '../state/batches.store';
import { ButtonComponent, DialogComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-batches-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, DialogComponent],
  templateUrl: './batches-list.page.html',
  styleUrls: ['./batches-list.page.scss'],
  providers: [BatchesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BatchesListPageComponent {
  readonly store = inject(BatchesStore);

  showCreateModal = false;
  newBatchName = '';
  newProductName = '';
  newDate = '2026-11-12';
  newReadyTime = '17:00';
  newCutoffTime = '15:30';
  newCapacity = 50;
  newPriceRupees = 120;
  newInstructions = '';

  openCreateModal(): void {
    this.newBatchName = '';
    this.newProductName = '';
    this.newDate = '2026-11-12';
    this.newReadyTime = '17:00';
    this.newCutoffTime = '15:30';
    this.newCapacity = 50;
    this.newPriceRupees = 120;
    this.newInstructions = '';
    this.showCreateModal = true;
  }

  createBatch(): void {
    if (!this.newBatchName.trim() || !this.newProductName.trim()) return;

    this.store.addBatch({
      batchName: this.newBatchName.trim(),
      productName: this.newProductName.trim(),
      productId: `prod-${Date.now()}`,
      productionDate: this.newDate,
      readyTime: this.newReadyTime,
      cutoffTime: this.newCutoffTime,
      totalCapacityUnits: this.newCapacity,
      unitPricePaise: Math.round(this.newPriceRupees * 100),
      instructions: this.newInstructions.trim()
    });

    this.showCreateModal = false;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'OPEN_FOR_ORDERS': return 'status-open';
      case 'CUTOFF_REACHED': return 'status-cutoff';
      case 'PREPARING': return 'status-prep';
      case 'READY_FOR_PICKUP': return 'status-ready';
      case 'COMPLETED': return 'status-completed';
      default: return 'status-scheduled';
    }
  }

  getNextActionLabel(status: string): string {
    switch (status) {
      case 'SCHEDULED': return 'Open for Orders';
      case 'OPEN_FOR_ORDERS': return 'Start Kitchen Prep';
      case 'CUTOFF_REACHED': return 'Start Kitchen Prep';
      case 'PREPARING': return 'Mark Ready for Pickup';
      case 'READY_FOR_PICKUP': return 'Complete Batch';
      default: return 'Completed';
    }
  }

  formatPrice(paise: number): string {
    return '₹' + (paise / 100).toFixed(0);
  }
}
