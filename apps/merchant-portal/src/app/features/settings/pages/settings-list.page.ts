import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsStore } from '../state/settings.store';
import { SettingsCardComponent } from '../components/settings-card.component';

@Component({
  selector: 'merchant-settings-list-page',
  standalone: true,
  imports: [CommonModule, SettingsCardComponent],
  templateUrl: './settings-list.page.html',
  styleUrls: ['./settings-list.page.scss'],
  providers: [SettingsStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsListPageComponent {
  store = inject(SettingsStore);
}
