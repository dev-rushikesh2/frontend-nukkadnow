import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authentication-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="authentication-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationDetailsPageComponent {
  id = input.required<string>();
}
