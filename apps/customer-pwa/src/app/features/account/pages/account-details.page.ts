import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="account-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsPageComponent {
  id = input.required<string>();
}
