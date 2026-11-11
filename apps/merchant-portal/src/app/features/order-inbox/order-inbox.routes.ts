import { Routes } from '@angular/router';
import { OrderInboxPageComponent } from './pages/order-inbox-list.page';
import { OrderDetailPageComponent } from './pages/order-inbox-details.page';

export const ORDER_INBOX_ROUTES: Routes = [
  { path: '', component: OrderInboxPageComponent },
  { path: ':id', component: OrderDetailPageComponent }
];
