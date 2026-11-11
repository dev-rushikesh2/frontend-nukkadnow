import { Component, input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'merchant-catalogue-card',
  standalone: true,
  template: `
<div class="panel-card">
      <h4>{{ item().title }}</h4>
      <p class="subtitle">{{ item().subtitle }}</p>
    </div>
  `,
  styles: [`
.panel-card {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.04);
    }
    h4 { margin: 0 0 6px; font-size: 15px; color: #0f172a; }
    .subtitle { margin: 0; font-size: 13px; color: #64748b; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CatalogueCardComponent {
  item = input<any>();
}
