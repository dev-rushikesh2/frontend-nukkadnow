import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favourites-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="favourites-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouritesDetailsPageComponent {
  id = input.required<string>();
}
