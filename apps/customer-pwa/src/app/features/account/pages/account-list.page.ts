import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountStore } from '../state/account.store';
import { AccountCardComponent } from '../components/account-card.component';

@Component({
  selector: 'app-account-list-page',
  standalone: true,
  imports: [CommonModule, AccountCardComponent],
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
  providers: [AccountStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListPageComponent {
  store = inject(AccountStore);
}
