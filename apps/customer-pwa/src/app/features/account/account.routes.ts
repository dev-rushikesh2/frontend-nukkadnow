import { Routes } from '@angular/router';
import { AccountListPageComponent } from './pages/account-list.page';

export const ACCOUNT_ROUTES: Routes = [
  {
    path: '',
    component: AccountListPageComponent
  },
  {
    path: 'addresses',
    loadComponent: () => import('./pages/addresses.page').then(m => m.AddressesPageComponent)
  }
];

