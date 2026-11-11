import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'merchant-batches-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="details-panel">
      <h3>Batches Detail #{{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BatchesDetailsPageComponent {
  id = input.required<string>();
}
