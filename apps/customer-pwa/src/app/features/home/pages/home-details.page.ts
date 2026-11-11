import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="home-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDetailsPageComponent {
  id = input.required<string>();
}
