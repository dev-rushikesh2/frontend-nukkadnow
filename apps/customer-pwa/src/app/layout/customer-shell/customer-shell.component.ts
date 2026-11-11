import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { BottomNavigationComponent } from '../bottom-navigation/bottom-nav.component';

@Component({
  selector: 'app-customer-shell',
  standalone: true,
  imports: [PageHeaderComponent, BottomNavigationComponent],
  template: `
    <div class="customer-shell">
      <app-page-header></app-page-header>
      <main class="content-container">
        <ng-content></ng-content>
      </main>
      <app-bottom-navigation></app-bottom-navigation>
    </div>
  `,
  styles: [`
    .customer-shell {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 480px;
      margin: 0 auto;
      background: #FAFAF9;
      position: relative;
    }
    .content-container {
      flex: 1;
      padding-bottom: 72px;
      overflow-y: auto;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerShellComponent {}
