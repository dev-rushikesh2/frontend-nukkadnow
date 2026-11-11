import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { BottomNavigationComponent } from '../bottom-navigation/bottom-nav.component';

@Component({
  selector: 'app-customer-shell',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent, BottomNavigationComponent],
  template: `
    <div class="customer-shell-container">
      @if (showHeader()) {
        <app-page-header
          [title]="title()"
          [subtitle]="subtitle()"
          [showBack]="showBack()"
          [showSearch]="showSearch()"
          [showNotifications]="showNotifications()"
          [showProfile]="showProfile()">
        </app-page-header>
      }

      <main class="shell-main" [class.no-nav]="!showNav()">
        <ng-content></ng-content>
      </main>

      @if (showNav()) {
        <app-bottom-navigation></app-bottom-navigation>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      min-height: 100vh;
      background-color: #f1f5f9;
    }

    .customer-shell-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 100%;
      max-width: 480px;
      margin: 0 auto;
      background: var(--nn-bg-app);
      position: relative;
      box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
    }

    .shell-main {
      flex: 1;
      padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
      overflow-y: auto;
      overflow-x: hidden;
    }

    .shell-main.no-nav {
      padding-bottom: env(safe-area-inset-bottom, 0px);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerShellComponent {
  showHeader = input<boolean>(true);
  showNav = input<boolean>(true);
  title = input<string>('');
  subtitle = input<string>('Your Neighbourhood Marketplace');
  showBack = input<boolean>(false);
  showSearch = input<boolean>(false);
  showNotifications = input<boolean>(true);
  showProfile = input<boolean>(true);
}
