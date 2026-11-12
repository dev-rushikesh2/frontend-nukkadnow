import { Component, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { MerchantBottomNavComponent } from '../bottom-nav/merchant-bottom-nav.component';

@Component({
  selector: 'merchant-shell',
  standalone: true,
  imports: [CommonModule, SidebarComponent, TopbarComponent, MerchantBottomNavComponent],
  template: `
    @if (isAuthOrOnboarding()) {
      <ng-content></ng-content>
    } @else {
      <div class="merchant-layout">
        <!-- Desktop Sidebar -->
        <merchant-sidebar class="layout-sidebar"></merchant-sidebar>

        <!-- Mobile Drawer Backdrop & Drawer -->
        @if (isMobileMenuOpen()) {
          <div class="mobile-drawer-backdrop" (click)="closeMobileMenu()">
            <merchant-sidebar 
              class="mobile-drawer-sidebar" 
              (close)="closeMobileMenu()" 
              (click)="$event.stopPropagation()">
            </merchant-sidebar>
          </div>
        }

        <div class="layout-main">
          <merchant-topbar (toggleMenu)="toggleMobileMenu()"></merchant-topbar>
          <main class="layout-content">
            <div class="content-wrapper">
              <ng-content></ng-content>
            </div>
          </main>
        </div>

        <!-- Mobile Bottom Navigation -->
        <merchant-bottom-nav></merchant-bottom-nav>
      </div>
    }
  `,
  styles: [`
    .merchant-layout {
      display: flex;
      min-height: 100vh;
      background: var(--color-background, #F8FAFC);
      position: relative;
    }

    .layout-sidebar {
      width: var(--sidebar-width, 260px);
      flex-shrink: 0;

      @media (max-width: 767px) {
        display: none !important;
      }
    }

    .layout-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow-x: hidden;
      padding-bottom: var(--bottom-nav-height, 64px);

      @media (min-width: 768px) {
        padding-bottom: 0;
      }
    }

    .layout-content {
      flex: 1;
      overflow-y: auto;
      padding: clamp(12px, 2.5vw, 24px);
    }

    .content-wrapper {
      max-width: var(--content-max-width, 1400px);
      margin: 0 auto;
      width: 100%;
    }

    /* Mobile Drawer */
    .mobile-drawer-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 2000;
      display: flex;
    }

    .mobile-drawer-sidebar {
      width: min(80vw, 280px);
      height: 100vh;
      animation: slideInLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes slideInLeft {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantShellComponent {
  private router = inject(Router);
  readonly currentUrl = signal<string>(this.router.url || '');
  readonly isMobileMenuOpen = signal<boolean>(false);

  constructor() {
    this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe((e) => {
      this.currentUrl.set(e.urlAfterRedirects || e.url);
      this.isMobileMenuOpen.set(false);
    });
  }

  readonly isAuthOrOnboarding = computed(() => {
    const url = this.currentUrl();
    return url.startsWith('/auth') || url.startsWith('/onboarding');
  });

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
