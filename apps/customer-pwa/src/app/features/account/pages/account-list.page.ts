import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CustomerShellComponent } from '../../../layout/customer-shell/customer-shell.component';

@Component({
  selector: 'app-account-list-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CustomerShellComponent],
  templateUrl: './account-list.page.html',
  styleUrls: ['./account-list.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListPageComponent {
  private router = inject(Router);

  readonly user = signal({
    name: 'Ajay Patil',
    phone: '+91 98765 43210',
    email: 'ajay.patil@example.com',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    totalOrders: 12,
    favouritesCount: 8,
    followedShopsCount: 4,
    totalSavings: 320
  });

  goBack() {
    this.router.navigate(['/home']);
  }

  editProfile() {
    // Edit profile dialog or modal
  }

  openOrders() {
    this.router.navigate(['/orders']);
  }

  openAddresses() {
    this.router.navigate(['/account/addresses']);
  }

  openFavourites() {
    this.router.navigate(['/favourites']);
  }

  openNotifications() {
    this.router.navigate(['/notifications']);
  }

  openHelp() {
    this.router.navigate(['/help-support']);
  }

  openPrivacy() {
    this.router.navigate(['/help-support'], { queryParams: { tab: 'privacy' } });
  }

  logout() {
    this.router.navigate(['/onboarding']);
  }
}
