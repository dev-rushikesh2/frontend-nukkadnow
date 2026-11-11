import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-checkout-status-chip',
  standalone: true,
  template: `<span class="chip">{{ status() }}</span>`,
  styles: [`
.chip {
      padding: 2px 8px;
      border-radius: 9999px;
      background: #e2e8f0;
      font-size: 11px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckoutStatusChipComponent {
  status = input.required<string>();
}
