import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pickup-token-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="pickup-token-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickupTokenDetailsPageComponent {
  id = input.required<string>();
}
