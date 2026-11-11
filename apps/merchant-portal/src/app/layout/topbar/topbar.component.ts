import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletSwitcherStore, ShopLiveStatus } from '../../core/outlet-context/outlet-switcher.store';
import { TenantStore } from '../../core/tenant-context/tenant.store';
import { DialogComponent, ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-topbar',
  standalone: true,
  imports: [CommonModule, DialogComponent, ButtonComponent],
  template: `
    <header class="topbar">
      <div class="left-section">
        <div class="tenant-branding">
          <strong class="tenant-name">{{ tenantStore.tenantName() }}</strong>
          <span class="locality-tag">{{ outletStore.activeOutlet().locality }}, Nagpur</span>
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
                @case ('OPEN') { Store Open }
                @case ('PAUSED') { Busy (Paused {{ outletStore.activeOutlet().pauseRemainingMinutes || 45 }}m) }
                @case ('CLOSED') { Store Closed }
              }
            </span>
            <span class="caret">▼</span>
          </button>
        </div>

        <!-- Outlet Switcher Dropdown -->
        <div class="outlet-switcher">
          <label for="outlet-select" class="visually-hidden">Select Outlet</label>
          <select id="outlet-select" [value]="outletStore.activeOutletId()" (change)="onOutletChange($event)">
            @for (outlet of outletStore.outlets(); track outlet.id) {
              <option [value]="outlet.id">{{ outlet.name }}</option>
            }
          </select>
        </div>
      </div>
    </header>

    <!-- Shop Status Dialog -->
    <ui-dialog
      [isOpen]="isStatusModalOpen()"
      title="Store Operational Status"
      (close)="isStatusModalOpen.set(false)">
      <div class="status-dialog-body">
        <p class="dialog-desc">Change the live order status for <strong>{{ outletStore.activeOutlet().name }}</strong>.</p>

        <div class="status-options">
          <button
            type="button"
            class="status-opt-card"
            [class.selected]="outletStore.currentStatus() === 'OPEN'"
            (click)="changeStatus('OPEN')">
            <span class="icon">🟢</span>
            <div class="text">
              <strong>Open & Accepting Orders</strong>
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
              <p>Temporary kitchen rush throttle. Existing orders continue.</p>
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
              <strong>Closed for the Day</strong>
              <p>Store appears closed on the marketplace until next scheduled opening.</p>
            </div>
          </button>
        </div>
      </div>
    </ui-dialog>
  `,
  styles: [`
    .topbar {
      height: 64px;
      background: #ffffff;
      border-bottom: 1px solid #e2e8f0;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 80;
    }
    .left-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .tenant-branding {
      display: flex;
      flex-direction: column;
    }
    .tenant-name {
      font-size: 15px;
      color: #0f172a;
    }
    .locality-tag {
      font-size: 11px;
      color: #64748b;
    }
    .right-section {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 150ms ease;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    .caret {
      font-size: 9px;
      opacity: 0.7;
    }
    .status-pill--open {
      background: #ecfdf5;
      color: #065f46;
      border-color: #a7f3d0;
    }
    .status-pill--open .status-dot {
      background: #10b981;
    }
    .status-pill--paused {
      background: #fffbeb;
      color: #92400e;
      border-color: #fde68a;
    }
    .status-pill--paused .status-dot {
      background: #f59e0b;
    }
    .status-pill--closed {
      background: #f1f5f9;
      color: #475569;
      border-color: #cbd5e1;
    }
    .status-pill--closed .status-dot {
      background: #94a3b8;
    }
    .outlet-switcher select {
      padding: 7px 12px;
      border-radius: 8px;
      border: 1px solid #cbd5e1;
      font-size: 13px;
      color: #0f172a;
      background: #ffffff;
      outline: none;
    }
    .visually-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
    }
    .dialog-desc {
      font-size: 14px;
      color: #64748b;
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
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      background: #ffffff;
      cursor: pointer;
      text-align: left;
      transition: all 150ms ease;
    }
    .status-opt-card:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
    }
    .status-opt-card.selected {
      border-color: #f97316;
      background: #fffaf5;
    }
    .status-opt-card .icon {
      font-size: 20px;
    }
    .status-opt-card .text strong {
      display: block;
      font-size: 14px;
      color: #0f172a;
    }
    .status-opt-card .text p {
      font-size: 12px;
      color: #64748b;
      margin: 2px 0 0;
    }
    .pause-presets {
      background: #fffbeb;
      border: 1px solid #fde68a;
      border-radius: 8px;
      padding: 12px;
      margin-left: 32px;
    }
    .preset-label {
      font-size: 12px;
      font-weight: 600;
      color: #92400e;
      display: block;
      margin-bottom: 8px;
    }
    .preset-btns {
      display: flex;
      gap: 8px;
    }
    .preset-btns button {
      padding: 6px 12px;
      background: #ffffff;
      border: 1px solid #f59e0b;
      color: #92400e;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      cursor: pointer;
    }
    .preset-btns button:hover {
      background: #f59e0b;
      color: #ffffff;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent {
  tenantStore = inject(TenantStore);
  outletStore = inject(OutletSwitcherStore);

  isStatusModalOpen = signal<boolean>(false);
  showPausePresets = signal<boolean>(false);

  onOutletChange(event: Event) {
    const val = (event.target as HTMLSelectElement).value;
    this.outletStore.selectOutlet(val);
  }

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
