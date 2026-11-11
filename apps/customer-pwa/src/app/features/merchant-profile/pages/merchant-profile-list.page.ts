import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantProfileStore } from '../state/merchant-profile.store';
import { MerchantProfileCardComponent } from '../components/merchant-profile-card.component';

@Component({
  selector: 'app-merchant-profile-list-page',
  standalone: true,
  imports: [CommonModule, MerchantProfileCardComponent],
  templateUrl: './merchant-profile-list.page.html',
  styleUrls: ['./merchant-profile-list.page.scss'],
  providers: [MerchantProfileStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MerchantProfileListPageComponent {
  store = inject(MerchantProfileStore);
}
