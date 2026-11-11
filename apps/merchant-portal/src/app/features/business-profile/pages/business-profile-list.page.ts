import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessProfileStore } from '../state/business-profile.store';
import { BusinessProfileCardComponent } from '../components/business-profile-card.component';

@Component({
  selector: 'merchant-business-profile-list-page',
  standalone: true,
  imports: [CommonModule, BusinessProfileCardComponent],
  templateUrl: './business-profile-list.page.html',
  styleUrls: ['./business-profile-list.page.scss'],
  providers: [BusinessProfileStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessProfileListPageComponent {
  store = inject(BusinessProfileStore);
}
