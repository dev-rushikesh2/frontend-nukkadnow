import { Component, ChangeDetectionStrategy, input, inject } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="app-header">
      <div class="header-left">
        @if (showBack()) {
          <button type="button" class="icon-btn back-btn" (click)="goBack()" aria-label="Go back">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
        }

        @if (!title()) {
          <!-- Brand Logo & Wordmark -->
          <a routerLink="/discovery" class="brand-link">
            <div class="brand-logo-mark">
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <!-- Shopping bag handle -->
                <path d="M14 16V12C14 8.686 16.686 6 20 6C23.314 6 26 8.686 26 12V16" stroke="#FF5A1F" stroke-width="3" stroke-linecap="round"/>
                <!-- Awning bag top -->
                <path d="M8 16H32L34 23H6L8 16Z" fill="#FF5A1F"/>
                <!-- Bag lower container -->
                <rect x="7" y="22" width="26" height="15" rx="5" fill="#2E1065"/>
                <!-- Pin marker cut-out -->
                <path d="M20 25C18.343 25 17 26.343 17 28C17 30.5 20 33 20 33C20 33 23 30.5 23 28C23 26.343 21.657 25 20 25Z" fill="#FF5A1F"/>
                <circle cx="20" cy="28" r="1.5" fill="#FFFFFF"/>
              </svg>
            </div>
            <div class="brand-text-block">
              <span class="brand-title">
                <span class="brand-nukkad">Nukkad</span><span class="brand-now">Now</span>
              </span>
              <span class="brand-subtitle">{{ subtitle() }}</span>
            </div>
          </a>
        } @else {
          <div class="header-title-block">
            <h1 class="header-page-title">{{ title() }}</h1>
            @if (subtitle()) {
              <p class="header-page-sub">{{ subtitle() }}</p>
            }
          </div>
        }
      </div>

      <div class="header-right">
        @if (showSearch()) {
          <a routerLink="/discovery" class="icon-btn" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </a>
        }

        @if (showNotifications()) {
          <a routerLink="/notifications" class="icon-btn notif-btn" aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            @if (unreadNotificationsCount() > 0) {
              <span class="unread-dot"></span>
            }
          </a>
        }

        @if (showProfile()) {
          <a routerLink="/account" class="icon-btn avatar-btn" aria-label="My Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </a>
        }
      </div>
    </header>
  `,
  styles: [`
    .app-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: clamp(8px, 1.5vh, 12px) 16px;
      background: #ffffff;
      border-bottom: 1px solid var(--nn-border-light);
      position: sticky;
      top: 0;
      z-index: 100;
      backdrop-filter: blur(8px);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      flex: 1;
    }

    .brand-link {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
    }

    .brand-logo-mark {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .brand-text-block {
      display: flex;
      flex-direction: column;
      line-height: 1.15;
    }

    .brand-title {
      font-size: clamp(18px, 4vw, 21px);
      font-weight: 800;
      letter-spacing: -0.4px;
    }

    .brand-nukkad {
      color: var(--nn-purple-800);
    }

    .brand-now {
      color: var(--nn-orange-500);
      margin-left: 1px;
    }

    .brand-subtitle {
      font-size: 11px;
      font-weight: 500;
      color: var(--nn-text-secondary);
      letter-spacing: -0.1px;
    }

    .header-title-block {
      display: flex;
      flex-direction: column;
    }

    .header-page-title {
      font-size: clamp(17px, 3.8vw, 19px);
      font-weight: 700;
      color: var(--nn-text-primary);
      margin: 0;
      line-height: 1.2;
    }

    .header-page-sub {
      font-size: 12px;
      color: var(--nn-text-secondary);
      margin: 2px 0 0 0;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .icon-btn {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--nn-purple-50);
      color: var(--nn-purple-700);
      border: 1px solid var(--nn-purple-100);
      text-decoration: none;
      position: relative;
      transition: all 150ms ease;
    }

    .icon-btn:hover {
      background: var(--nn-purple-100);
      color: var(--nn-purple-800);
    }

    .back-btn {
      background: transparent;
      border-color: transparent;
      color: var(--nn-text-primary);
      width: 36px;
      height: 36px;
      margin-left: -6px;
    }

    .notif-btn {
      position: relative;
    }

    .unread-dot {
      position: absolute;
      top: 7px;
      right: 7px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ef4444;
      border: 1.5px solid #ffffff;
    }

    .avatar-btn {
      background: #f1f5f9;
      color: #475569;
      border-color: #e2e8f0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
  private location = inject(Location);

  title = input<string>('');
  subtitle = input<string>('Your Neighbourhood Marketplace');
  showBack = input<boolean>(false);
  showSearch = input<boolean>(false);
  showNotifications = input<boolean>(true);
  showProfile = input<boolean>(true);
  unreadNotificationsCount = input<number>(2);

  goBack() {
    this.location.back();
  }
}
