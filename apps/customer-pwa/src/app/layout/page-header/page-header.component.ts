import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { LocationStore } from '../../core/location/location.store';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <header class="page-header">
      <div class="locality-selector">
        <span class="pin-icon">ðŸ“</span>
        <div class="locality-text">
          <span class="locality-label">Deliver / Pickup from</span>
          <strong class="locality-name">{{ locationStore.selectedLocality().name }}</strong>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .page-header {
      padding: 12px 16px;
      background: #ffffff;
      border-bottom: 1px solid #f1f5f9;
      position: sticky;
      top: 0;
      z-index: 90;
    }
    .locality-selector {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .pin-icon { font-size: 20px; }
    .locality-text { display: flex; flex-direction: column; }
    .locality-label { font-size: 11px; color: #64748b; }
    .locality-name { font-size: 14px; color: #0f172a; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
  locationStore = inject(LocationStore);
}
