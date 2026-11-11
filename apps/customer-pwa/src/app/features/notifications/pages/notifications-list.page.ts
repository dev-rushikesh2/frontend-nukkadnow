import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsStore } from '../state/notifications.store';
import { NotificationsCardComponent } from '../components/notifications-card.component';

@Component({
  selector: 'app-notifications-list-page',
  standalone: true,
  imports: [CommonModule, NotificationsCardComponent],
  templateUrl: './notifications-list.page.html',
  styleUrls: ['./notifications-list.page.scss'],
  providers: [NotificationsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsListPageComponent {
  store = inject(NotificationsStore);
}
