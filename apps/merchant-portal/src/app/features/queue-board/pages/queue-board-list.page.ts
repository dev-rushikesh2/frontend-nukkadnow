import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderInboxStore } from '../../order-inbox/state/order-inbox.store';
import { ButtonComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-queue-board-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="kds-container">
      <header class="kds-header">
        <div class="kds-titles">
          <h2>Kitchen Display & Queue Board</h2>
          <span class="live-pulse">â— Live Order Queue</span>
        </div>
        <div class="kds-actions">
          <ui-button variant="outline" size="sm" (clicked)="toggleFullscreen()">
            {{ isFullscreen() ? 'Exit Fullscreen' : 'â›¶ Fullscreen KDS' }}
          </ui-button>
        </div>
      </header>

      <div class="kds-board">
        <!-- Column 1: Now Preparing -->
        <div class="kds-column kds-column--preparing">
          <div class="column-header">
            <h3>â³ NOW PREPARING ({{ store.preparingCount() }})</h3>
          </div>

          <div class="token-cards-list">
            @for (ord of store.orders(); track ord.id) {
              @if (ord.status === 'PREPARING') {
                <div class="kds-card kds-card--prep">
                  <div class="kds-card-top">
                    <span class="kds-token-num">{{ ord.orderNumber }}</span>
                    <span class="kds-timer">â±ï¸ {{ ord.countdownMinutes }}m remaining</span>
                  </div>
                  <div class="kds-items">
                    <p>{{ ord.itemsSummary }}</p>
                  </div>
                  <button type="button" class="kds-ready-btn" (click)="store.markReady(ord.id)">
                    Mark Ready âœ“
                  </button>
                </div>
              }
            } @empty {
              <div class="kds-empty">No orders currently preparing.</div>
            }
          </div>
        </div>

        <!-- Column 2: Ready for Pickup -->
        <div class="kds-column kds-column--ready">
          <div class="column-header">
            <h3>âœ… READY FOR PICKUP ({{ store.readyCount() }})</h3>
          </div>

          <div class="token-cards-list">
            @for (ord of store.orders(); track ord.id) {
              @if (ord.status === 'READY') {
                <div class="kds-card kds-card--ready">
                  <div class="kds-card-top">
                    <div class="ready-token-circle">{{ ord.orderNumber }}</div>
                    <span class="customer-tag">{{ ord.customerName }}</span>
                  </div>
                  <div class="kds-items">
                    <p>{{ ord.itemsSummary }}</p>
                  </div>
                  <button type="button" class="kds-handover-btn" (click)="store.completeOrder(ord.id)">
                    Handover & Clear
                  </button>
                </div>
              }
            } @empty {
              <div class="kds-empty">No orders waiting for pickup.</div>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kds-container { display: flex; flex-direction: column; gap: 20px; }
    .kds-header { display: flex; justify-content: space-between; align-items: center; }
    .kds-titles { display: flex; align-items: center; gap: 12px; }
    h2 { font-size: 24px; color: #0f172a; margin: 0; }
    .live-pulse { color: #16a34a; font-size: 13px; font-weight: 700; animation: pulse 1.5s infinite; }
    .kds-board { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; min-height: 600px; }
    @media (max-width: 800px) { .kds-board { grid-template-columns: 1fr; } }
    .kds-column { border-radius: 12px; padding: 20px; display: flex; flex-direction: column; gap: 16px; }
    .kds-column--preparing { background: #fffdfb; border: 2px solid #fed7aa; }
    .kds-column--ready { background: #f0fdf4; border: 2px solid #bbf7d0; }
    .column-header h3 { font-size: 16px; font-weight: 700; margin: 0; }
    .token-cards-list { display: flex; flex-direction: column; gap: 12px; }
    .kds-card { background: #ffffff; border-radius: 10px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 10px; }
    .kds-card-top { display: flex; justify-content: space-between; align-items: center; }
    .kds-token-num { font-size: 22px; font-weight: 800; color: #0f172a; }
    .kds-timer { background: #fff7ed; color: #ea580c; font-weight: 700; font-size: 13px; padding: 4px 8px; border-radius: 6px; }
    .kds-items p { margin: 0; font-size: 14px; color: #334155; font-weight: 500; }
    .kds-ready-btn { width: 100%; padding: 10px; background: #16a34a; color: #ffffff; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; }
    .kds-ready-btn:hover { background: #15803d; }
    .ready-token-circle { font-size: 22px; font-weight: 800; color: #16a34a; }
    .customer-tag { font-size: 13px; font-weight: 600; color: #475569; }
    .kds-handover-btn { width: 100%; padding: 10px; background: #0f172a; color: #ffffff; font-weight: 700; border: none; border-radius: 6px; cursor: pointer; }
    .kds-empty { text-align: center; color: #94a3b8; padding: 48px 16px; font-size: 14px; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueueBoardPageComponent {
  store = inject(OrderInboxStore);
  isFullscreen = signal<boolean>(false);

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.isFullscreen.set(true);
    } else {
      document.exitFullscreen();
      this.isFullscreen.set(false);
    }
  }
}

export { QueueBoardPageComponent as QueueBoardListPageComponent };
