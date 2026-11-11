import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-selector-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="location-selector-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocationSelectorDetailsPageComponent {
  id = input.required<string>();
}
