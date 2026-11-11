import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help-support-details-page',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="help-support-details">
      <h3>Detail for ID: {{ id() }}</h3>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpSupportDetailsPageComponent {
  id = input.required<string>();
}
