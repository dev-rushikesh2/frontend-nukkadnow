import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeliverySettingsStore } from '../state/delivery-settings.store';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-delivery-settings-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './delivery-settings-list.page.html',
  styleUrls: ['./delivery-settings-list.page.scss'],
  providers: [DeliverySettingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeliverySettingsListPageComponent {
  readonly store = inject(DeliverySettingsStore);

  newPincodeInput = '';

  onRadiusChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setRadius(val);
  }

  onMinOrderChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setMinOrder(val);
  }

  onBaseFeeChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setBaseFee(val);
  }

  onFreeThresholdChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setFreeThreshold(val);
  }

  onDeliveryMinsChange(event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.store.setEstimatedMinutes(val);
  }

  addPincode(): void {
    if (this.newPincodeInput.trim()) {
      this.store.addPincode(this.newPincodeInput.trim());
      this.newPincodeInput = '';
    }
  }

  formatPrice(paise: number): string {
    return '₹' + (paise / 100).toFixed(0);
  }
}
