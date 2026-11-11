import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationStore } from '../state/authentication.store';
import { AuthenticationCardComponent } from '../components/authentication-card.component';

@Component({
  selector: 'app-authentication-list-page',
  standalone: true,
  imports: [CommonModule, AuthenticationCardComponent],
  templateUrl: './authentication-list.page.html',
  styleUrls: ['./authentication-list.page.scss'],
  providers: [AuthenticationStore],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationListPageComponent {
  store = inject(AuthenticationStore);
}
