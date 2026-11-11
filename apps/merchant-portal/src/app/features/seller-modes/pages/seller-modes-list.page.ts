import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerModesStore } from '../state/seller-modes.store';
import { SellerModesCardComponent } from '../components/seller-modes-card.component';

@Component({
  selector: 'merchant-seller-modes-list-page',
  standalone: true,
  imports: [CommonModule, SellerModesCardComponent],
  templateUrl: './seller-modes-list.page.html',
  styleUrls: ['./seller-modes-list.page.scss'],
  providers: [SellerModesStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SellerModesListPageComponent {
  store = inject(SellerModesStore);
}
