import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QrOrderingStore } from '../state/qr-ordering.store';
import { QrStandeeViewModel, QrStandeeType } from '../models/qr-ordering-view.model';
import { ButtonComponent, DialogComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-qr-ordering-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, DialogComponent],
  templateUrl: './qr-ordering-list.page.html',
  styleUrls: ['./qr-ordering-list.page.scss'],
  providers: [QrOrderingStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrOrderingListPageComponent {
  readonly store = inject(QrOrderingStore);
  private sanitizer = inject(DomSanitizer);

  showBatchModal = false;
  showCreateModal = false;
  startTable = 3;
  endTable = 10;

  newLabel = '';
  newType: QrStandeeType = 'COUNTER';

  sanitizeSvg(svg: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  openBatchModal(): void {
    this.startTable = 3;
    this.endTable = 10;
    this.showBatchModal = true;
  }

  generateBatch(): void {
    if (this.startTable > 0 && this.endTable >= this.startTable) {
      this.store.addTableBatch(this.startTable, this.endTable);
    }
    this.showBatchModal = false;
  }

  openCreateModal(): void {
    this.newLabel = '';
    this.newType = 'COUNTER';
    this.showCreateModal = true;
  }

  createSingle(): void {
    if (!this.newLabel.trim()) return;
    this.store.addStandee(this.newLabel.trim(), this.newType);
    this.showCreateModal = false;
  }

  openPrintPreview(standee: QrStandeeViewModel): void {
    this.store.setPrintModal(standee);
  }

  closePrintPreview(): void {
    this.store.setPrintModal(null);
  }

  printStandee(): void {
    window.print();
  }
}
