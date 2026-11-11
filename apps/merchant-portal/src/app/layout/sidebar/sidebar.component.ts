import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'merchant-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="brand">
        <h2>NukkadNow</h2>
        <span class="badge">Merchant</span>
      </div>
      <nav class="nav-menu">
        <div class="nav-section">Operations</div>
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-link">📊 Dashboard</a>
        <a routerLink="/order-inbox" routerLinkActive="active" class="nav-link">🔔 Order Inbox</a>
        <a routerLink="/walkin-orders" routerLinkActive="active" class="nav-link">🧾 Counter Billing</a>
        <a routerLink="/queue-board" routerLinkActive="active" class="nav-link">📋 Kitchen Display</a>
        
        <div class="nav-section">Catalogue & Stock</div>
        <a routerLink="/catalogue" routerLinkActive="active" class="nav-link">📦 Products</a>
        <a routerLink="/inventory" routerLinkActive="active" class="nav-link">📉 Inventory</a>
        <a routerLink="/preorders" routerLinkActive="active" class="nav-link">📅 Pre-orders</a>
        <a routerLink="/batches" routerLinkActive="active" class="nav-link">🥖 Fresh Batches</a>

        <div class="nav-section">Fulfillment & Growth</div>
        <a routerLink="/capacity-settings" routerLinkActive="active" class="nav-link">⚙️ Capacity Rules</a>
        <a routerLink="/pickup-slots" routerLinkActive="active" class="nav-link">⏱️ Pickup Slots</a>
        <a routerLink="/qr-ordering" routerLinkActive="active" class="nav-link">📱 Store Standee QR</a>
        <a routerLink="/delivery-settings" routerLinkActive="active" class="nav-link">🛵 Self-Delivery</a>

        <div class="nav-section">Store Management</div>
        <a routerLink="/staff-access" routerLinkActive="active" class="nav-link">👥 Staff & PINs</a>
        <a routerLink="/analytics" routerLinkActive="active" class="nav-link">📈 Analytics</a>
        <a routerLink="/subscriptions" routerLinkActive="active" class="nav-link">⭐ Plans & Quotas</a>
        <a routerLink="/billing" routerLinkActive="active" class="nav-link">💳 Invoices & Payouts</a>
        <a routerLink="/notifications" routerLinkActive="active" class="nav-link">🔔 Notifications & UAT</a>
      </nav>
    </aside>
  `,
  styles: [`
    .sidebar {
      height: 100vh;
      width: 240px;
      background: #0f172a;
      color: #e2e8f0;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      overflow-y: auto;
      flex-shrink: 0;
    }
    .brand {
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid #1e293b;
    }
    .brand h2 { margin: 0; font-size: 18px; color: #ffffff; font-weight: 800; }
    .badge { background: #f97316; font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 700; color: #ffffff; }
    .nav-menu { padding: 12px 8px 32px 8px; display: flex; flex-direction: column; gap: 2px; }
    .nav-section { font-size: 11px; text-transform: uppercase; color: #94a3b8; font-weight: 700; padding: 14px 12px 4px; letter-spacing: 0.5px; }
    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 9px 12px;
      border-radius: 6px;
      color: #cbd5e1;
      text-decoration: none;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.15s;
    }
    .nav-link:hover { background: #1e293b; color: #ffffff; }
    .nav-link.active { background: #f97316; color: #ffffff; font-weight: 700; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {}
