import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OutletSwitcherStore, OutletScheduleDay } from '../../../core/outlet-context/outlet-switcher.store';
import { ButtonComponent, ToggleComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-outlet-schedule-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ToggleComponent],
  template: `
    <div class="schedule-page">
      <div class="header-nav">
        <button type="button" class="back-btn" (click)="goBack()">â† Back to Outlets</button>
        <h2>Weekly Operating Hours</h2>
        <p class="desc">Configure standard order acceptance times for <strong>{{ outletName() }}</strong>.</p>
      </div>

      <div class="schedule-card">
        <div class="days-table">
          @for (d of scheduleDays(); track d.day; let i = $index) {
            <div class="day-row" [class.day-closed]="!d.isOpen">
              <div class="day-name">
                <strong>{{ formatDayName(d.day) }}</strong>
              </div>

              <div class="day-toggle">
                <ui-toggle [checked]="d.isOpen" (toggled)="toggleDay(i, $event)"></ui-toggle>
                <span>{{ d.isOpen ? 'Open' : 'Closed' }}</span>
              </div>

              @if (d.isOpen) {
                <div class="time-inputs">
                  <div class="time-field">
                    <label>Opens:</label>
                    <input type="time" [value]="d.openTime" (change)="updateTime(i, 'openTime', $any($event.target).value)" />
                  </div>
                  <span class="to-text">to</span>
                  <div class="time-field">
                    <label>Closes:</label>
                    <input type="time" [value]="d.closeTime" (change)="updateTime(i, 'closeTime', $any($event.target).value)" />
                  </div>
                </div>
              } @else {
                <span class="closed-notice">Not accepting orders on this day</span>
              }
            </div>
          }
        </div>

        <div class="actions-row">
          <ui-button variant="primary" (clicked)="saveSchedule()">Save Operating Hours</ui-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .schedule-page { max-width: 720px; display: flex; flex-direction: column; gap: 20px; }
    .back-btn { background: none; border: none; color: #64748b; font-size: 13px; font-weight: 600; cursor: pointer; padding: 0; margin-bottom: 8px; }
    h2 { font-size: 24px; color: #0f172a; margin: 0 0 4px; }
    .desc { font-size: 14px; color: #64748b; margin: 0; }
    .schedule-card { background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    .days-table { display: flex; flex-direction: column; gap: 12px; }
    .day-row { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid #f1f5f9; border-radius: 8px; }
    .day-closed { background: #f8fafc; opacity: 0.75; }
    .day-name { width: 100px; font-size: 14px; color: #0f172a; }
    .day-toggle { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 500; width: 120px; }
    .time-inputs { display: flex; align-items: center; gap: 12px; }
    .time-field { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; }
    .time-field input { border: 1px solid #cbd5e1; border-radius: 6px; padding: 6px 8px; font-size: 13px; outline: none; }
    .to-text { font-size: 12px; color: #94a3b8; }
    .closed-notice { font-size: 13px; color: #94a3b8; font-style: italic; }
    .actions-row { margin-top: 24px; padding-top: 16px; border-top: 1px solid #f1f5f9; display: flex; justify-content: flex-end; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutletSchedulePageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private store = inject(OutletSwitcherStore);

  outletId = signal<string>(this.route.snapshot.paramMap.get('id') || 'outlet-dharampeth-1');
  outletName = signal<string>('');
  scheduleDays = signal<OutletScheduleDay[]>([]);

  constructor() {
    const o = this.store.outlets().find((x) => x.id === this.outletId()) || this.store.activeOutlet();
    this.outletName.set(o.name);
    this.scheduleDays.set(JSON.parse(JSON.stringify(o.weeklySchedule)));
  }

  formatDayName(code: string): string {
    const names: Record<string, string> = {
      MON: 'Monday', TUE: 'Tuesday', WED: 'Wednesday', THU: 'Thursday', FRI: 'Friday', SAT: 'Saturday', SUN: 'Sunday'
    };
    return names[code] || code;
  }

  toggleDay(index: number, isOpen: boolean) {
    this.scheduleDays.update((days) => {
      days[index].isOpen = isOpen;
      return [...days];
    });
  }

  updateTime(index: number, field: 'openTime' | 'closeTime', val: string) {
    this.scheduleDays.update((days) => {
      days[index][field] = val;
      return [...days];
    });
  }

  saveSchedule() {
    this.store.updateSchedule(this.outletId(), this.scheduleDays());
    this.goBack();
  }

  goBack() {
    this.router.navigate(['/outlets']);
  }
}
