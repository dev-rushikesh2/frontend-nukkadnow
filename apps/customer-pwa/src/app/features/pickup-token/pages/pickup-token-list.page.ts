import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickupTokenStore } from '../state/pickup-token.store';
import { PickupTokenCardComponent } from '../components/pickup-token-card.component';

@Component({
  selector: 'app-pickup-token-list-page',
  standalone: true,
  imports: [CommonModule, PickupTokenCardComponent],
  templateUrl: './pickup-token-list.page.html',
  styleUrls: ['./pickup-token-list.page.scss'],
  providers: [PickupTokenStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickupTokenListPageComponent {
  store = inject(PickupTokenStore);
}
