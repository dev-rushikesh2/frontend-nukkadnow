import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { OutletSwitcherStore, OutletRecord } from '../../../core/outlet-context/outlet-switcher.store';
import { ButtonComponent, BadgeComponent } from '@nukkadnow/ui';

@Component({
  selector: 'merchant-outlets-list-page',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BadgeComponent],
  templateUrl: './outlets-list.page.html',
  styleUrls: ['./outlets-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OutletsListPageComponent {
  store = inject(OutletSwitcherStore);
  router = inject(Router);

  openSchedule(outlet: OutletRecord) {
    this.router.navigate(['/outlets', outlet.id, 'schedule']);
  }
}
