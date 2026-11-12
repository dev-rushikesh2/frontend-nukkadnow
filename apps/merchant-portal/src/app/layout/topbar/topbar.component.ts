import { Component, inject, signal, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OutletSwitcherStore, ShopLiveStatus } from '../../core/outlet-context/outlet-switcher.store';
import { TenantStore } from '../../core/tenant-context/tenant.store';
import { DialogComponent, ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-topbar',
  standalone: true,
  imports: [CommonModule, RouterLink, DialogComponent, ButtonComponent],
  template: `
    <header class="topbar">
      <div class="left-section">
        <!-- Mobile Hamburger Toggle -->
        <button 
          type="button" 
          class="mobile-hamburger-btn" 
          (click)="toggleMenu.emit()" 
          aria-label="Toggle navigation menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <!-- Mobile Brand Logo -->
        <a routerLink="/dashboard" class="mobile-brand-link">
          <div class="brand-logo-mark">
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
              <path d="M14 16V12C14 8.686 16.686 6 20 6C23.314 6 26 8.686 26 12V16" stroke="#FF5A1F" stroke-width="3" stroke-linecap="round"/>
              <path d="M8 16H32L34 23H6L8 16Z" fill="#FF5A1F"/>
              <rect x="7" y="22" width="26" height="15" rx="5" fill="#2E1065"/>
              <path d="M20 25C18.343 25 17 26.343 17 28C17 30.5 20 33 20 33C20 33 23 30.5 23 28C23 26.343 21.657 25 20 25Z" fill="#FF5A1F"/>
              <circle cx="20" cy="28" r="1.5" fill="#FFFFFF"/>
            </svg>
          </div>
          <div class="brand-text-col">
            <span class="brand-title">
              <span class="brand-nukkad">Nukkad</span><span class="brand-now">Now</span>
            </span>
            <span class="brand-badge">Merchant</span>
          </div>
        </a>

        <!-- Desktop Tenant Branding -->
        <div class="desktop-tenant-branding">
          <strong class="tenant-name">{{ tenantStore.tenantName() || 'Shree Fresh Mart' }}</strong>
          <span class="locality-tag">{{ outletStore.activeOutlet().locality || 'Civil Lines' }}, Amravati</span>
        </div>
      </div>

      <div class="right-section">
        <!-- Live Shop Status Control -->
        <div class="status-control">
          <button
            type="button"
            class="status-pill"
            [class.status-pill--open]="outletStore.currentStatus() === 'OPEN'"
            [class.status-pill--paused]="outletStore.currentStatus() === 'PAUSED'"
            [class.status-pill--closed]="outletStore.currentStatus() === 'CLOSED'"
            (click)="isStatusModalOpen.set(true)">
            <span class="status-dot"></span>
            <span class="status-label">
              @switch (outletStore.currentStatus()) {
                @case ('OPEN') { Shop Live }
                @case ('PAUSED') { Busy ({{ outletStore.activeOutlet().pauseRemainingMinutes || 45 }}m) }
                @case ('CLOSED') { Offline }
              }
            </span>
            <svg viewBox="0 0 24 24" class="caret-svg" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>
        </div>

        <!-- Notification Bell with red dot -->
        <a routerLink="/notifications" class="icon-action-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span class="notification-red-dot"></span>
        </a>

        <!-- Store Avatar / Profile link -->
        <a routerLink="/business-profile" class="store-avatar-link" aria-label="Shop Profile">
          <div class="store-avatar-circle">
            <span class="store-icon">🏪</span>
          </div>
        </a>
      </div>
    </header>

    <!-- Shop Status Dialog -->
    <ui-dialog
      [isOpen]="isStatusModalOpen()"
      title="Store Operational Status"
      (close)="isStatusModalOpen.set(false)">
      <div class="status-dialog-body">
        <p class="dialog-desc">Change the live order status for <strong>{{ outletStore.activeOutlet().name || 'Shree Fresh Mart' }}</strong>.</p>

        <div class="status-options">
          <button
            type="button"
            class="status-opt-card"
            [class.selected]="outletStore.currentStatus() === 'OPEN'"
            (click)="changeStatus('OPEN')">
            <span class="icon">🟢</span>
            <div class="text">
              <strong>Shop Live &amp; Accepting Orders</strong>
              <p>Customers can place pickup and delivery orders normally.</p>
            </div>
          </button>

          <button
            type="button"
            class="status-opt-card"
            [class.selected]="outletStore.currentStatus() === 'PAUSED'"
            (click)="showPausePresets.set(true)">
            <span class="icon">🟡</span>
            <div class="text">
              <strong>Busy (Pause New Orders)</strong>
              <p>Temporary shop rush throttle. Existing orders continue.</p>
            </div>
          </button>

          @if (showPausePresets()) {
            <div class="pause-presets">
              <span class="preset-label">Select Pause Duration:</span>
              <div class="preset-btns">
                <button type="button" (click)="pauseFor(30)">30 Mins</button>
                <button type="button" (click)="pauseFor(60)">1 Hour</button>
                <button type="button" (click)="pauseFor(120)">2 Hours</button>
                <button type="button" (click)="pauseFor(480)">Rest of Day</button>
              </div>
            </div>
          }

          <button
            type="button"
            class="status-opt-card"
            [class.selected]="outletStore.currentStatus() === 'CLOSED'"
            (click)="changeStatus('CLOSED')">
            <span class="icon">🔴</span>
            <div class="text">
              <strong>Offline / Closed for the Day</strong>
              <p>Store appears closed on the marketplace until next scheduled opening.</p>
            </div>
          </button>
        </div>
      </div>
    </ui-dialog>
  `,
  styles: [`
    .topbar {
      height: var(--topbar-height, 64px);
      background: #FFFFFF;
      border-bottom: 1px solid var(--color-border-purple, #EDE9FE);
      padding: 0 clamp(12px, 2.5vw, 24px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 80;
      backdrop-filter: blur(8px);
    }

    .left-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .mobile-hamburger-btn {
      display: none;
      background: none;
      border: none;
      color: var(--nn-purple-950, #1E1B4B);
      cursor: pointer;
      padding: 4px;
      border-radius: 6px;

      @media (max-width: 767px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .mobile-brand-link {
      display: none;
      align-items: center;
      gap: 8px;
      text-decoration: none;

      @media (max-width: 767px) {
        display: flex;
      }

      .brand-title {
        font-size: 1.05rem;
        font-weight: 800;
        letter-spacing: -0.02em;

        .brand-nukkad {
          color: var(--nn-purple-800, #2E1065);
        }

        .brand-now {
          color: var(--nn-orange-500, #FF5A1F);
        }
      }

      .brand-badge {
        background: var(--nn-purple-600, #6D28D9);
        color: #FFFFFF;
        font-size: 0.65rem;
        font-weight: 700;
        padding: 2px 6px;
        border-radius: 9999px;
        margin-left: 4px;
      }
    }

    .desktop-tenant-branding {
      display: flex;
      flex-direction: column;

      @media (max-width: 767px) {
        display: none;
      }

      .tenant-name {
        font-size: 15px;
        font-weight: 700;
        color: var(--nn-purple-950, #1E1B4B);
      }

      .locality-tag {
        font-size: 11px;
        color: #64748B;
      }
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 12px;
      border-radius: 9999px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      border: 1.5px solid transparent;
      transition: all 150ms ease;
    }

    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }

    .caret-svg {
      width: 14px;
      height: 14px;
      opacity: 0.7;
    }

    .status-pill--open {
      background: #ECFDF5;
      color: #065F46;
      border-color: #A7F3D0;

      .status-dot {
        background: #10B981;
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
      }
    }

    .status-pill--paused {
      background: #FFFBEB;
      color: #92400E;
      border-color: #FDE68A;

      .status-dot {
        background: #F59E0B;
      }
    }

    .status-pill--closed {
      background: #F1F5F9;
      color: #475569;
      border-color: #CBD5E1;

      .status-dot {
        background: #94A3B8;
      }
    }

    .icon-action-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #475569;
      text-decoration: none;
      position: relative;
      transition: background 0.15s ease;

      &:hover {
        background: #F1F5F9;
        color: var(--nn-purple-600, #6D28D9);
      }

      .notification-red-dot {
        position: absolute;
        top: 6px;
        right: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #EF4444;
        border: 1.5px solid #FFFFFF;
      }
    }

    .store-avatar-link {
      text-decoration: none;

      .store-avatar-circle {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #FAF5FF;
        border: 1.5px solid var(--nn-purple-200, #DDD6FE);
        display: flex;
        align-items: center;
        justify-content: center;

        .store-icon {
          font-size: 1.1rem;
        }
      }
    }

    /* Status Dialog */
    .dialog-desc {
      font-size: 14px;
      color: #64748B;
      margin: 0 0 16px;
    }

    .status-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .status-opt-card {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 14px;
      border: 1.5px solid #E2E8F0;
      border-radius: 12px;
      background: #FFFFFF;
      cursor: pointer;
      text-align: left;
      transition: all 150ms ease;

      &:hover {
        border-color: #DDD6FE;
        background: #FAF5FF;
      }

      &.selected {
        border-color: var(--nn-purple-600, #6D28D9);
        background: #FAF5FF;
      }

      .icon {
        font-size: 20px;
      }

      .text strong {
        display: block;
        font-size: 14px;
        color: #1E1B4B;
      }

      .text p {
        font-size: 12px;
        color: #64748B;
        margin: 2px 0 0;
      }
    }

    .pause-presets {
      background: #FFFBEB;
      border: 1px solid #FDE68A;
      border-radius: 8px;
      padding: 12px;
      margin-left: 32px;

      .preset-label {
        font-size: 12px;
        font-weight: 600;
        color: #92400E;
        display: block;
        margin-bottom: 8px;
      }

      .preset-btns {
        display: flex;
        gap: 8px;

        button {
          padding: 6px 12px;
          background: #FFFFFF;
          border: 1px solid #F59E0B;
          color: #92400E;
          font-size: 12px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;

          &:hover {
            background: #F59E0B;
            color: #FFFFFF;
          }
        }
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  tenantStore = inject(TenantStore);
  outletStore = inject(OutletSwitcherStore);

  toggleMenu = output<void>();

  isStatusModalOpen = signal<boolean>(false);
  showPausePresets = signal<boolean>(false);

  changeStatus(status: ShopLiveStatus) {
    this.outletStore.setShopStatus(status);
    this.isStatusModalOpen.set(false);
    this.showPausePresets.set(false);
  }

  pauseFor(minutes: number) {
    this.outletStore.setShopStatus('PAUSED', minutes);
    this.isStatusModalOpen.set(false);
    this.showPausePresets.set(false);
  }
}
