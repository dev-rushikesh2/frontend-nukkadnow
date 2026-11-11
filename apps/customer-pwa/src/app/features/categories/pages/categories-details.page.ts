import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="categories-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesDetailsPageComponent {
  id = input.required<string>();
}
