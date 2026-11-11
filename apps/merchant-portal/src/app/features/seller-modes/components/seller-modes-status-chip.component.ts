import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'merchant-seller-modes-status-chip',
  standalone: true,
  template: `<span class="status-chip">{{ status() }}</span>`,
  styles: [`
.status-chip {
      padding: 2px 10px;
      border-radius: 9999px;
      background: #f1f5f9;
      font-size: 12px;
      font-weight: 500;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SellerModesStatusChipComponent {
  status = input.required<string>();
}
