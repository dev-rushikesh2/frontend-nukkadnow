import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'merchant-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="merchant-bottom-nav" aria-label="Merchant bottom navigation">
      <!-- 1: Dashboard -->
      <a routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-item">
        <div class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" class="nav-svg" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 10.5L12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9z"/>
            <path d="M9 21v-7h6v7"/>
          </svg>
        </div>
        <span class="nav-label">Dashboard</span>
      </a>

      <!-- 2: Orders -->
      <a routerLink="/order-inbox" routerLinkActive="active" class="nav-item">
        <div class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" class="nav-svg" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
          </svg>
        </div>
        <span class="nav-label">Orders</span>
      </a>

      <!-- 3: Products -->
      <a routerLink="/catalogue" routerLinkActive="active" class="nav-item">
        <div class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" class="nav-svg" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
            <line x1="12" y1="22.08" x2="12" y2="12"/>
          </svg>
        </div>
        <span class="nav-label">Products</span>
      </a>

      <!-- 4: Inventory -->
      <a routerLink="/inventory" routerLinkActive="active" class="nav-item">
        <div class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" class="nav-svg" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
        </div>
        <span class="nav-label">Inventory</span>
      </a>

      <!-- 5: More -->
      <a routerLink="/settings" routerLinkActive="active" class="nav-item">
        <div class="nav-icon-wrap">
          <svg viewBox="0 0 24 24" class="nav-svg" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="14" y="14" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
        <span class="nav-label">More</span>
      </a>
    </nav>
  `,
  styles: [`
    .merchant-bottom-nav {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--bottom-nav-height, 64px);
      background: #FFFFFF;
      border-top: 1px solid var(--color-border-purple, #EDE9FE);
      display: flex;
      align-items: center;
      justify-content: space-around;
      z-index: 1000;
      box-shadow: 0 -2px 12px rgba(109, 40, 217, 0.05);
      padding-bottom: env(safe-area-inset-bottom, 0);

      @media (min-width: 768px) {
        display: none !important;
      }
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      flex: 1;
      height: 100%;
      text-decoration: none;
      color: #64748B;
      transition: color 0.15s ease;
      cursor: pointer;

      .nav-icon-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;

        .nav-svg {
          width: 22px;
          height: 22px;
          transition: transform 0.15s ease;
        }
      }

      .nav-label {
        font-size: 0.675rem;
        font-weight: 600;
        letter-spacing: -0.01em;
      }

      &.active {
        color: var(--nn-purple-600, #6D28D9);

        .nav-svg {
          transform: translateY(-1px);
        }

        .nav-label {
          font-weight: 700;
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantBottomNavComponent {}
