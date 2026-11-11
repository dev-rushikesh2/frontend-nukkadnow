import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discovery-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="discovery-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DiscoveryDetailsPageComponent {
  id = input.required<string>();
}
