import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'merchant-analytics-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="details-panel">
      <h3>Analytics Detail #{{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalyticsDetailsPageComponent {
  id = input.required<string>();
}
