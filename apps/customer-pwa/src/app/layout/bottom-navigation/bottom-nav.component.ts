import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav-bar" aria-label="Main Navigation">
      <div class="nav-content">
        <!-- 1. Home Tab -->
        <a routerLink="/discovery" routerLinkActive="active" [routerLinkActiveOptions]="{exact: false}" class="nav-tab">
          <div class="icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <span class="tab-label">Home</span>
        </a>

        <!-- 2. Explore / Categories Tab -->
        <a routerLink="/categories" routerLinkActive="active" class="nav-tab">
          <div class="icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/>
            </svg>
          </div>
          <span class="tab-label">Explore</span>
        </a>

        <!-- 3. Floating Center Cart FAB -->
        <div class="fab-slot">
          <a routerLink="/cart" routerLinkActive="fab-active" class="cart-fab" aria-label="Shopping Cart">
            <div class="fab-icon-wrap">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              @if (cartCount() > 0) {
                <span class="fab-badge" aria-label="Cart items count">{{ cartCount() }}</span>
              }
            </div>
          </a>
        </div>

        <!-- 4. Orders Tab -->
        <a routerLink="/orders" routerLinkActive="active" class="nav-tab">
          <div class="icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <span class="tab-label">Orders</span>
        </a>

        <!-- 5. Account Tab -->
        <a routerLink="/account" routerLinkActive="active" class="nav-tab">
          <div class="icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span class="tab-label">Account</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .bottom-nav-bar {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 480px;
      height: calc(64px + env(safe-area-inset-bottom, 0px));
      padding-bottom: env(safe-area-inset-bottom, 0px);
      background: #ffffff;
      border-top: 1px solid var(--nn-border-light);
      box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.04);
      z-index: 100;
      user-select: none;
    }

    .nav-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 64px;
      padding: 0 12px;
      position: relative;
    }

    .nav-tab {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      height: 100%;
      text-decoration: none;
      color: var(--nn-text-secondary);
      transition: all 120ms ease;
      min-width: 54px;
    }

    .icon-wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 3px;
      transition: transform 120ms ease;
    }

    .tab-label {
      font-size: 11px;
      font-weight: 500;
      letter-spacing: -0.1px;
    }

    .nav-tab.active {
      color: var(--nn-purple-600);
    }

    .nav-tab.active .tab-label {
      font-weight: 700;
    }

    .nav-tab.active .icon-wrap {
      transform: translateY(-1px);
    }

    /* Floating Center Cart FAB */
    .fab-slot {
      position: relative;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .cart-fab {
      position: absolute;
      top: -22px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--nn-purple-gradient);
      box-shadow: var(--nn-shadow-fab);
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: transform 150ms cubic-bezier(0.34, 1.56, 0.64, 1);
      border: 3.5px solid #ffffff;
    }

    .cart-fab:active {
      transform: scale(0.92);
    }

    .fab-icon-wrap {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .fab-badge {
      position: absolute;
      top: -10px;
      right: -10px;
      min-width: 18px;
      height: 18px;
      padding: 0 4px;
      border-radius: 9px;
      background: #ef4444;
      color: #ffffff;
      font-size: 10.5px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavigationComponent {
  cartCount = input<number>(3);
}
