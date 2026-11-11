import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'merchant-shell',
  standalone: true,
  imports: [SidebarComponent, TopbarComponent],
  template: `
    <div class="merchant-layout">
      <merchant-sidebar class="layout-sidebar"></merchant-sidebar>
      <div class="layout-main">
        <merchant-topbar></merchant-topbar>
        <main class="layout-content">
          <ng-content></ng-content>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .merchant-layout {
      display: flex;
      min-height: 100vh;
      background: var(--color-background);
    }
    .layout-sidebar {
      width: var(--sidebar-width);
      flex-shrink: 0;
    }
    .layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-x: hidden;
    }
    .layout-content {
      flex: 1;
      padding: 24px;
      overflow-y: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantShellComponent {}
