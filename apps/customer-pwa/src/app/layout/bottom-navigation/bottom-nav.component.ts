import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav class="bottom-nav">
      <a routerLink="/home" routerLinkActive="active" class="nav-item">
        <span class="icon">ðŸ </span>
        <span class="label">Home</span>
      </a>
      <a routerLink="/discovery" routerLinkActive="active" class="nav-item">
        <span class="icon">ðŸ”</span>
        <span class="label">Explore</span>
      </a>
      <a routerLink="/cart" routerLinkActive="active" class="nav-item">
        <span class="icon">ðŸ›’</span>
        <span class="label">Cart</span>
      </a>
      <a routerLink="/orders" routerLinkActive="active" class="nav-item">
        <span class="icon">ðŸ“œ</span>
        <span class="label">Orders</span>
      </a>
      <a routerLink="/account" routerLinkActive="active" class="nav-item">
        <span class="icon">ðŸ‘¤</span>
        <span class="label">Account</span>
      </a>
    </nav>
  `,
  styles: [`
    .bottom-nav {
      position: fixed;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
      max-width: 480px;
      height: 64px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 100;
    }
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: #64748b;
      font-size: 11px;
    }
    .nav-item.active {
      color: #f97316;
      font-weight: 600;
    }
    .icon { font-size: 20px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BottomNavigationComponent {}
