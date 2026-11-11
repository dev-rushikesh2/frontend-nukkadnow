import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-merchant-profile-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="merchant-profile-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantProfileDetailsPageComponent {
  id = input.required<string>();
}
