import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpSupportStore } from '../state/help-support.store';
import { HelpSupportCardComponent } from '../components/help-support-card.component';

@Component({
  selector: 'app-help-support-list-page',
  standalone: true,
  imports: [CommonModule, HelpSupportCardComponent],
  templateUrl: './help-support-list.page.html',
  styleUrls: ['./help-support-list.page.scss'],
  providers: [HelpSupportStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpSupportListPageComponent {
  store = inject(HelpSupportStore);
}
