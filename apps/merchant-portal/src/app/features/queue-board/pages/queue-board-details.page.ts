import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'merchant-queue-board-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="details-panel">
      <h3>QueueBoard Detail #{{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueBoardDetailsPageComponent {
  id = input.required<string>();
}
